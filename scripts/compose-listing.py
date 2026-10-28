"""Key real production captures into generated scenes; never synthesize product UI.

Requires Pillow and NumPy. Run from the repository root after capture/type rendering.
"""
import hashlib
import json
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageOps, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "incoming-artwork"
OUTPUT = ROOT / "docs/marketplace/listing"
PUBLIC = ROOT / "public/envato"


def regions(mask):
    remaining = mask.copy()
    found = []
    height, width = mask.shape
    for y, x in zip(*np.where(mask)):
        if not remaining[y, x]:
            continue
        queue = deque([(int(x), int(y))])
        remaining[y, x] = False
        points = []
        while queue:
            px, py = queue.popleft()
            points.append((px, py))
            for nx, ny in ((px-1, py), (px+1, py), (px, py-1), (px, py+1)):
                if 0 <= nx < width and 0 <= ny < height and remaining[ny, nx]:
                    remaining[ny, nx] = False
                    queue.append((nx, ny))
        if len(points) > 1500:
            found.append(np.asarray(points))
    return sorted(found, key=lambda p: float(p[:, 0].mean()))


def cross(a, b, c):
    return (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0])


def corners(points):
    # Convex hull removes raster stair steps; low-area vertices remove rounded corners.
    ys = np.unique(points[:, 1])
    boundary = []
    for y in ys:
        xs = points[points[:, 1] == y, 0]
        boundary.extend([(int(xs.min()), int(y)), (int(xs.max()), int(y))])
    ordered = sorted(set(boundary))
    lower, upper = [], []
    for p in ordered:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    for p in reversed(ordered):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    hull = lower[:-1] + upper[:-1]
    while len(hull) > 4:
        costs = [abs(cross(hull[i-1], hull[i], hull[(i+1) % len(hull)])) for i in range(len(hull))]
        hull.pop(int(np.argmin(costs)))
    start = min(range(4), key=lambda i: hull[i][0] + hull[i][1])
    return np.asarray(hull[start:] + hull[:start], dtype=float)


def warp(capture, quad, size):
    width = int(max(np.linalg.norm(quad[1]-quad[0]), np.linalg.norm(quad[2]-quad[3])))
    height = int(max(np.linalg.norm(quad[3]-quad[0]), np.linalg.norm(quad[2]-quad[1])))
    screen = ImageOps.fit(capture, (width, height), method=Image.Resampling.LANCZOS, centering=(0.5, 0))
    target = [(0, 0), (width, 0), (width, height), (0, height)]
    matrix, values = [], []
    for (x, y), (u, v) in zip(quad, target):
        matrix.extend([[x, y, 1, 0, 0, 0, -u*x, -u*y], [0, 0, 0, x, y, 1, -v*x, -v*y]])
        values.extend([u, v])
    coeff = np.linalg.solve(np.asarray(matrix), np.asarray(values))
    return screen.transform(size, Image.Transform.PERSPECTIVE, coeff, Image.Resampling.BICUBIC)


def compose(row):
    source = SOURCE / f"{row['name']}.png"
    scene = Image.open(source).convert("RGB")
    if scene.size != (1536, 1024):
        raise ValueError(f"{source}: expected native 1536x1024, got {scene.size}; do not upscale")
    rgb = np.asarray(scene).astype(int)
    green = (rgb[:, :, 1] > 140) & (rgb[:, :, 1] > rgb[:, :, 0] * 1.7 + 35) & (rgb[:, :, 1] > rgb[:, :, 2] * 1.7 + 35)
    if not row["captures"] and int(green.sum()) > 1500:
        raise ValueError(f"{row['name']}: texture-only scene contains unexpected green screens")
    screens = regions(green) if row["captures"] else []
    if len(screens) != len(row["captures"]):
        raise ValueError(f"{row['name']}: detected {len(screens)} screens, expected {len(row['captures'])}")
    evidence = []
    for points, name in zip(screens, row["captures"]):
        quad = corners(points)
        # Green display light can tint the generated keyboard/deck. Neutralize only
        # the device footprint immediately below the screen, preserving scenery.
        spill_area = Image.new("L", scene.size)
        spill_draw = ImageDraw.Draw(spill_area)
        bottom_left, bottom_right = quad[3], quad[2]
        spill_draw.polygon([tuple(bottom_left), tuple(bottom_right),
                            (bottom_right[0]+45, bottom_right[1]+90),
                            (bottom_left[0]-15, bottom_left[1]+90)], fill=255)
        pixels = np.asarray(scene).copy()
        values = pixels.astype(float)
        spill = (np.asarray(spill_area) > 0) & ~green & (values[:, :, 1] > values[:, :, 0]*1.1) & (values[:, :, 1] > values[:, :, 2]*1.1)
        pixels[:, :, 1][spill] = ((values[:, :, 0][spill]+values[:, :, 2][spill])/2).astype(np.uint8)
        scene = Image.fromarray(pixels)
        capture_path = SOURCE / "captures" / f"{name}.png"
        capture = Image.open(capture_path).convert("RGB")
        replacement = warp(capture, quad, scene.size)
        glass = np.asarray(replacement).astype(float)
        sheen = np.linspace(0.018, 0, scene.height)[:, None, None]
        glass = glass * (1-sheen) + np.array([255, 236, 216]) * sheen
        replacement = Image.fromarray(np.clip(glass, 0, 255).astype(np.uint8))
        mask = Image.new("L", scene.size)
        # The chroma mask retains each display's actual rounded corners.
        mask_array = np.asarray(mask).copy()
        mask_array[points[:, 1], points[:, 0]] = 255
        mask = Image.fromarray(mask_array).filter(ImageFilter.MaxFilter(3))
        scene.paste(replacement, (0, 0), mask)
        evidence.append({"capture": name, "corners": quad.tolist(), "pixels": len(points)})
    scene = scene.convert("RGBA")
    scene.alpha_composite(Image.open(SOURCE / "type" / f"{row['name']}.png").convert("RGBA"))
    scene = scene.convert("RGB")
    final = OUTPUT / f"{row['name']}.jpg"
    scene.save(final, quality=95, subsampling=0)
    scene.resize((1180, 787), Image.Resampling.LANCZOS).save(PUBLIC / f"{row['name']}.jpg", quality=90)
    return scene, {"name": row["name"], "sourceSha256": hashlib.sha256(source.read_bytes()).hexdigest(), "screens": evidence}


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    rows = json.loads((ROOT / "scripts/listing-artwork.json").read_text())
    evidence, thumbnails = [], []
    for row in rows:
        if not (SOURCE / f"{row['name']}.png").exists():
            print(f"Pending: {row['name']}")
            continue
        scene, record = compose(row)
        if row["name"] == "a01-hero-window-desk":
            scene.save(OUTPUT / "cover-1536x1024.jpg", quality=95, subsampling=0)
            # Crop empty foreground, preserving the headline and complete devices.
            scene.crop((0, 50, 1536, 831)).resize((590, 300), Image.Resampling.LANCZOS).save(OUTPUT / "main-preview-590x300.jpg", quality=95, subsampling=0)
        thumbnails.append((row["name"], scene.resize((384, 256), Image.Resampling.LANCZOS)))
        evidence.append(record)
        print(f"Composed {row['name']}: {len(record['screens'])} screens")
    sheet = Image.new("RGB", (1152, ((len(thumbnails)+2)//3)*286), "#111111")
    draw = ImageDraw.Draw(sheet)
    for i, (name, thumb) in enumerate(thumbnails):
        x, y = (i % 3)*384, (i//3)*286
        sheet.paste(thumb, (x, y))
        draw.text((x+8, y+261), name, fill="white")
    if thumbnails:
        sheet.save(OUTPUT / "contact-sheet.jpg", quality=90)
    (OUTPUT / "composition-evidence.json").write_text(json.dumps(evidence, indent=2))


if __name__ == "__main__":
    main()
