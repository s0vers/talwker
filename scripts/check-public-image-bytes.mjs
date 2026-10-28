import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const MAX_BYTES = 400 * 1024;
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function walk(dir, out = []) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walk(full, out);
		else out.push(full);
	}
	return out;
}

if (!fs.existsSync(PUBLIC_DIR)) {
	console.log("No public directory found. Skipping public image byte check.");
	process.exit(0);
}

const failures = [];

for (const filePath of walk(PUBLIC_DIR)) {
	const ext = path.extname(filePath).toLowerCase();
	if (!EXTENSIONS.has(ext)) continue;
	const size = fs.statSync(filePath).size;
	if (size <= MAX_BYTES) continue;
	failures.push({
		path: path.relative(ROOT, filePath),
		kb: Math.round(size / 1024),
	});
}

if (failures.length) {
	console.error(
		`Public image byte check failed (max ${MAX_BYTES / 1024} KB per file):`,
	);
	for (const failure of failures) {
		console.error(`- ${failure.path}: ${failure.kb} KB`);
	}
	console.error("Run: node scripts/compress-public-images.mjs");
	process.exit(1);
}

console.log("Public image byte check passed.");
