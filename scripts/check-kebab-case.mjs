import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TARGET = path.join(ROOT, "src", "features");
const CHECK_EXT = new Set([".ts", ".tsx"]);
const FILE_NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ALLOWED_BASENAMES = new Set(["index", "page", "layout", "loading", "not-found", "error", "global-error", "route", "template", "default"]);

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
	console.log("No src/features directory found. Skipping kebab-case check.");
	process.exit(0);
}

const invalid = [];
for (const filePath of walk(TARGET)) {
	const ext = path.extname(filePath);
	if (!CHECK_EXT.has(ext)) continue;

	const base = path.basename(filePath, ext);
	if (ALLOWED_BASENAMES.has(base)) continue;
	if (!FILE_NAME_RE.test(base)) {
		invalid.push(path.relative(ROOT, filePath));
	}
}

if (invalid.length) {
	console.error("Kebab-case filename check failed for:");
	for (const file of invalid) {
		console.error(`- ${file}`);
	}
	process.exit(1);
}

console.log("Kebab-case filename check passed.");

