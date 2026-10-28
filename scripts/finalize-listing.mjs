import fs from "node:fs/promises";
import crypto from "node:crypto";
const rows = JSON.parse(
	await fs.readFile("scripts/listing-artwork.json", "utf8")
);
const evidence = JSON.parse(
	await fs.readFile(
		"docs/marketplace/listing/composition-evidence.json",
		"utf8"
	)
);
if (evidence.length !== rows.length)
	throw new Error("All 15 scenes must be composed before finalization.");
const inventory = [];
for (const row of rows) {
	const file = `public/envato/${row.name}.jpg`;
	const bytes = await fs.readFile(file);
	if (bytes.length > 400 * 1024)
		throw new Error(`${file}: exceeds the public image byte budget`);
	inventory.push({
		path: file,
		sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
		generator: "OpenAI built-in image generation",
		generatedAt: "2026-10-06",
		scenePrompt: row.scene,
		promptAnchor: "docs/marketplace/ARTWORK.md",
		screenshotCaptures: row.captures,
		sourceSha256: evidence.find(item => item.name === row.name).sourceSha256,
		previewOnly: true,
		buyerZipExcluded: true
	});
}
await fs.writeFile(
	"docs/marketplace/artwork-assets.json",
	`${JSON.stringify(inventory, null, 2)}\n`
);
let listing = await fs.readFile("docs/marketplace/LISTING.md", "utf8");
const table = rows
	.map(row => `| ${row.name}.jpg | ${row.headline.join(" ")} | 1536×1024 |`)
	.join("\n");
listing = listing.replace(
	/## Listing artwork\n[\s\S]*?(?=## Key features)/,
	`## Listing artwork\n\nGenerated and composed locally on October 6, 2026. Cinematic scenes contain real Talkwer production screenshots with code-rendered Inter headlines. See [ARTWORK.md](ARTWORK.md) for prompts, reproducible commands, provenance, and review steps.\n\nUpload files are in the local gitignored \`docs/marketplace/listing/\` folder: \`main-preview-590x300.jpg\`, \`cover-1536x1024.jpg\`, the preserved \`thumbnail-80x80.png\`, and these 15 gallery images. No upscaling was used.\n\n| Gallery file | Subject | Dimensions |\n|---|---|---|\n${table}\n\nLocal artwork review does not verify deployment. Publishing and live URL verification are pending; \`listingArtworkReviewedAt\` remains unset.\n\n`
);
const html = rows
	.map(
		row =>
			`<p><img src="https://talwker.vercel.app/envato/${row.name}.jpg" alt="Talkwer — ${row.headline.join(" ")}" width="1180" height="787" /></p>`
	)
	.join("\n");
listing = listing.replace(
	/## Description images\n[\s\S]*?(?=## Presentation research)/,
	`## Description images\n\nFifteen 1180×787 JPEGs are prepared in \`public/envato/\`, excluded from the buyer ZIP. The following HTML is ready for use after the new files are deployed and their URLs verified. Account, dashboard, and booking images show frontend UI demonstrations.\n\n\`\`\`html\n${html}\n\`\`\`\n\n`
);
await fs.writeFile("docs/marketplace/LISTING.md", listing);
console.log(
	`Finalized ${inventory.length} description assets and listing HTML; deployment review remains pending.`
);
