import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TARGET = path.join(ROOT, "src");
const CHECK_EXT = new Set([".tsx"]);
const IMAGE_TAG_RE = /<Image\b[\s\S]*?\/>/g;

function walk(dir, out = []) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			walk(fullPath, out);
		} else {
			out.push(fullPath);
		}
	}
	return out;
}

if (!fs.existsSync(TARGET)) {
	console.log("No src directory found. Skipping image sizes check.");
	process.exit(0);
}

const failures = [];

for (const filePath of walk(TARGET)) {
	const ext = path.extname(filePath);
	if (!CHECK_EXT.has(ext)) continue;

	const source = fs.readFileSync(filePath, "utf8");
	const matches = source.matchAll(IMAGE_TAG_RE);

	for (const match of matches) {
		const tag = match[0];
		const hasFill = /\bfill\b/.test(tag);
		const hasSizes = /\bsizes=/.test(tag);
		if (!hasFill || hasSizes) continue;

		const beforeTag = source.slice(0, match.index ?? 0);
		const line = beforeTag.split("\n").length;
		failures.push(`${path.relative(ROOT, filePath)}:${line}`);
	}
}

if (failures.length) {
	console.error("Image sizes check failed (fill requires sizes):");
	for (const failure of failures) {
		console.error(`- ${failure}`);
	}
	process.exit(1);
}

console.log("Image sizes check passed.");
