"""Perspective-key the B-series with real UI, preserving source PNGs and A-series."""
import importlib.util
import hashlib
import json
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/"incoming-artwork/v2"
OUTPUT=ROOT/"docs/marketplace/listing/v2"
PUBLIC=ROOT/"public/envato"
spec=importlib.util.spec_from_file_location("chroma",ROOT/"scripts/compose-listing.py")
chroma=importlib.util.module_from_spec(spec)
spec.loader.exec_module(chroma)


def polygon(quad,size):
    mask=Image.new("L",size)
    ImageDraw.Draw(mask).polygon([tuple(p) for p in quad],fill=255)
    return np.asarray(mask)>0


def refine_quad(points,quad):
    # Fit the straight boundaries rather than treating rounded raster corners as vertices.
    boundary=[]
    for axis in [0,1]:
        for value in np.unique(points[:,axis]):
            group=points[points[:,axis]==value]
            other=1-axis
            boundary.extend([group[np.argmin(group[:,other])],group[np.argmax(group[:,other])]])
    boundary=np.asarray(boundary,dtype=float)
    lines=[]
    for a,b in zip(quad,np.roll(quad,-1,axis=0)):
        direction=b-a
        t=((boundary-a)@direction)/(direction@direction)
        delta=boundary-a
        distance=np.abs(direction[0]*delta[:,1]-direction[1]*delta[:,0])/np.linalg.norm(direction)
        selected=boundary[(distance<20)&(t>.05)&(t<.95)]
        if len(selected)<12:
            lines.append((a,direction));continue
        center=selected.mean(axis=0)
        _,_,v=np.linalg.svd(selected-center,full_matrices=False)
        lines.append((center,v[0]))
    corners=[]
    for i in range(4):
        a,u=lines[i-1];b,v=lines[i]
        try:
            t=np.linalg.solve(np.column_stack([u,-v]),b-a)[0]
            p=a+t*u
            corners.append(p if np.linalg.norm(p-quad[i])<95 else quad[i])
        except np.linalg.LinAlgError:
            corners.append(quad[i])
    return np.asarray(corners)


def project(capture,quad,size,fit,aspect=None):
    width=1000
    if aspect is None:
        # Device/component captures retain their authentic aspect; regular browsers use 16:10.
        aspect=capture.width/capture.height
    height=round(width/aspect)
    if fit=="contain":
        image=Image.new("RGB",(width,height),"#050505")
        insert=ImageOps.contain(capture,(width,height),Image.Resampling.LANCZOS)
        image.paste(insert,((width-insert.width)//2,(height-insert.height)//2))
    else:
        image=ImageOps.fit(capture,(width,height),Image.Resampling.LANCZOS,centering=(.5,0))
    target=[(0,0),(width,0),(width,height),(0,height)]
    matrix=[];values=[]
    for (x,y),(u,v) in zip(quad,target):
        matrix.extend([[x,y,1,0,0,0,-u*x,-u*y],[0,0,0,x,y,1,-v*x,-v*y]])
        values.extend([u,v])
    coeff=np.linalg.solve(np.asarray(matrix),np.asarray(values))
    return image.transform(size,Image.Transform.PERSPECTIVE,coeff,Image.Resampling.BICUBIC)


def compose(row):
    source=SOURCE/f"{row['source']}.png"
    scene=Image.open(source).convert("RGB")
    if scene.size!=(1536,1024):raise ValueError(f"Wrong source size: {source}")
    rgb=np.asarray(scene).astype(float)
    strong=(rgb[:,:,1]>170)&(rgb[:,:,1]>rgb[:,:,0]*2+30)&(rgb[:,:,1]>rgb[:,:,2]*2+30)
    broad=(rgb[:,:,1]>40)&(rgb[:,:,1]>rgb[:,:,0]*1.4+22)&(rgb[:,:,1]>rgb[:,:,2]*1.4+22)
    groups=chroma.regions(strong)
    labels=np.zeros(strong.shape,dtype=np.int16)
    for i,points in enumerate(groups):labels[points[:,1],points[:,0]]=i+1
    # Neutralize chroma spill and green floor light; real page reflections are added below.
    cleaned=rgb.copy()
    spill=(rgb[:,:,1]>rgb[:,:,0]*1.05+3)&(rgb[:,:,1]>rgb[:,:,2]*1.05+3)
    cleaned[:,:,1][spill]=(rgb[:,:,0][spill]+rgb[:,:,2][spill])/2
    scene=Image.fromarray(cleaned.astype(np.uint8))
    used=set();evidence=[]
    for surface in row["surfaces"]:
        seed=np.asarray(surface["quad"],dtype=float)
        anchor=seed[0]*.8+seed[1]*.1+seed[3]*.1
        candidates=[]
        for i,points in enumerate(groups):
            if i in used:continue
            distance=np.min(np.sum((points-anchor)**2,axis=1))
            candidates.append((distance,i))
        if not candidates:raise ValueError(f"Missing green surface in {row['name']}")
        _,index=min(candidates)
        used.add(index);points=groups[index]
        quad=refine_quad(points,seed) if surface.get("refine",True) else seed
        inside=polygon(quad,scene.size)
        # Restrict to this connected screen, retaining intentional foreground occlusion.
        label_mask=Image.fromarray(((labels==index+1)*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))
        alpha=(np.asarray(label_mask)>0)&inside&broad
        capture_path=SOURCE/"captures"/f"{surface['capture']}.png"
        capture=Image.open(capture_path).convert("RGB")
        replacement=project(capture,quad,scene.size,surface.get("fit","cover"),surface.get("aspect"))
        sheen=np.asarray(replacement).astype(float)*.99+np.array([255,236,216])*.01
        replacement=Image.fromarray(np.clip(sheen,0,255).astype(np.uint8))
        scene.paste(replacement,(0,0),Image.fromarray((alpha*255).astype(np.uint8)))
        if row.get("reflections",True) and quad[3,1]>quad[0,1]:
            reflected=quad.copy()
            reflected[0]=[quad[0,0],quad[3,1]+(quad[3,1]-quad[0,1])*.32]
            reflected[1]=[quad[1,0],quad[2,1]+(quad[2,1]-quad[1,1])*.32]
            reflected[2,1]+=4;reflected[3,1]+=4
            reflection=project(capture,reflected,scene.size,surface.get("fit","cover"),surface.get("aspect")).filter(ImageFilter.GaussianBlur(2))
            reflection_mask=polygon(reflected,scene.size)&broad&~inside
            fade=np.clip(1-(np.arange(scene.height)[:,None]-min(quad[2,1],quad[3,1]))/200,0,1)
            scene.paste(reflection,(0,0),Image.fromarray((reflection_mask*fade*18).astype(np.uint8)))
        evidence.append({"capture":surface["capture"],"captureSha256":hashlib.sha256(capture_path.read_bytes()).hexdigest(),"corners":quad.tolist(),"fit":surface.get("fit","cover"),"keyedPixels":int(alpha.sum())})
    scene=scene.convert("RGBA")
    scene.alpha_composite(Image.open(SOURCE/"type"/f"{row['name']}.png").convert("RGBA"))
    scene=scene.convert("RGB")
    scene.save(OUTPUT/f"{row['name']}.jpg",quality=95,subsampling=0)
    scene.resize((1180,787),Image.Resampling.LANCZOS).save(PUBLIC/f"{row['name']}.jpg",quality=90)
    return scene,{"name":row["name"],"source":row["source"],"sourceSha256":hashlib.sha256(source.read_bytes()).hexdigest(),"surfaces":evidence}


def main():
    OUTPUT.mkdir(parents=True,exist_ok=True);PUBLIC.mkdir(parents=True,exist_ok=True)
    rows=json.loads((ROOT/"scripts/theme-showcase.json").read_text())
    evidence=[];thumbs=[]
    for row in rows:
        if not all((SOURCE/"captures"/f"{s['capture']}.png").exists() for s in row["surfaces"]):
            print(f"Pending captures: {row['name']}");continue
        scene,record=compose(row);evidence.append(record)
        thumbs.append((row["name"],scene.resize((384,256),Image.Resampling.LANCZOS)))
        if row["name"].startswith("b01-"):
            scene.save(OUTPUT/"cover-1536x1024.jpg",quality=95,subsampling=0)
            scene.crop((0,122,1536,903)).resize((590,300),Image.Resampling.LANCZOS).save(OUTPUT/"main-preview-590x300.jpg",quality=95,subsampling=0)
        print(f"Composed {row['name']}: {len(record['surfaces'])} perspective inserts")
    sheet=Image.new("RGB",(1152,((len(thumbs)+2)//3)*286),"#111")
    draw=ImageDraw.Draw(sheet)
    for i,(name,thumb) in enumerate(thumbs):
        x,y=(i%3)*384,(i//3)*286;sheet.paste(thumb,(x,y));draw.text((x+8,y+261),name,fill="white")
    if thumbs:sheet.save(OUTPUT/"contact-sheet.jpg",quality=92)
    (OUTPUT/"composition-evidence.json").write_text(json.dumps(evidence,indent=2))


if __name__=="__main__":main()
