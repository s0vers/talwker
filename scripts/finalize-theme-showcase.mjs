import fs from "node:fs/promises";
import crypto from "node:crypto";
const rows = JSON.parse(
	await fs.readFile("scripts/theme-showcase.json", "utf8")
);
const evidence = JSON.parse(
	await fs.readFile(
		"docs/marketplace/listing/v2/composition-evidence.json",
		"utf8"
	)
);
const generation = JSON.parse(
	await fs.readFile("incoming-artwork/v2/generation-manifest.json", "utf8")
);
if (
	evidence.length !== rows.length ||
	rows.filter(row => row.gallery).length !== 15
)
	throw new Error(
		"Expected 17 complete compositions and exactly 15 gallery images."
	);
const inventory = [];
for (const row of rows) {
	const record = evidence.find(item => item.name === row.name);
	if (record.surfaces.length !== row.surfaces.length)
		throw new Error(`${row.name}: insert count mismatch`);
	const file = `public/envato/${row.name}.jpg`;
	const bytes = await fs.readFile(file);
	if (bytes.length > 400 * 1024)
		throw new Error(`${file}: public image byte budget exceeded`);
	const source = generation.find(item => item.name === row.source);
	inventory.push({
		path: file,
		sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
		series: "B",
		gallery: row.gallery,
		generator: source.generator,
		generatedAt: "2026-10-06",
		scenePrompt: source.prompt,
		finalToolPrompt: source.finalToolPrompt,
		screenshotCaptures: row.surfaces.map(surface => surface.capture),
		sourceSha256: record.sourceSha256,
		previewOnly: true,
		buyerZipExcluded: true
	});
}
const archive = "docs/marketplace/artwork-assets-a-series.json";
if (
	!(await fs.access(archive).then(
		() => true,
		() => false
	))
)
	await fs.copyFile("docs/marketplace/artwork-assets.json", archive);
await fs.writeFile(
	"docs/marketplace/artwork-assets.json",
	`${JSON.stringify(inventory, null, 2)}\n`
);
let listing = await fs.readFile("docs/marketplace/LISTING.md", "utf8");
const gallery = rows.filter(row => row.gallery);
const table = gallery
	.map(row => `| ${row.name}.jpg | ${row.headline.join(" ")} | 1536×1024 |`)
	.join("\n");
listing = listing.replace(
	/## Listing artwork\n[\s\S]*?(?=## Key features)/,
	`## Listing artwork\n\nThe active listing set is the B-series theme showcase, composed locally on October 6, 2026: premium studio renders with real Talkwer viewport captures, full-length homepages, and real component crops. All inserts use surface-specific perspective transforms. The A-series lifestyle scenes and their composed files are preserved for future marketing and are not selected for the listing.\n\nSee [ARTWORK.md](ARTWORK.md) for commands and provenance. Upload files are in the local gitignored \`docs/marketplace/listing/v2/\` folder: \`cover-1536x1024.jpg\`, \`main-preview-590x300.jpg\`, \`thumbnail-80x80.png\`, and these **15 gallery images**. \`b01-cover-isometric-wall.jpg\` is the cover composition and leads the description; \`b15-long-scroll-tilt.jpg\` is held back until it is regenerated. No source scene was upscaled.\n\n| Gallery file | Subject | Dimensions |\n|---|---|---|\n${table}\n\nPublishing and live URL verification remain pending; \`listingArtworkReviewedAt\` is unset.\n\n`
);
// B15 is held back until it is regenerated with the page's top nearest the viewer
// (see incoming-artwork/BRIEF-2-THEME-SHOWCASE.md); the cover leads the description.
const ordered = rows.filter(row => !row.name.startsWith("b15-"));
const html = ordered
	.map(
		row =>
			`<p><img src="https://talwker.vercel.app/envato/${row.name}.jpg" alt="Talkwer — ${row.headline.join(" ")}" width="1180" height="787" /></p>`
	)
	.join("\n");
listing = listing.replace(
	/## Description images\n[\s\S]*?(?=## Presentation research)/,
	`## Description images\n\nSixteen B-series 1180×787 JPEGs are linked below (B15 is held back); all are prepared in \`public/envato/\` and excluded from the buyer ZIP. The HTML below selects only this new set. Use it after deploying and verifying the new URLs. Account, dashboard, calendar, and booking surfaces show frontend demonstrations.\n\n\`\`\`html\n${html}\n\`\`\`\n\n`
);
await fs.writeFile("docs/marketplace/LISTING.md", listing);
console.log(
	"Finalized 15 gallery images, cover, main preview, description header, and 17 description assets. Publication review remains pending."
);
