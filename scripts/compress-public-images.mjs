import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 78;
const TARGET_MAX_BYTES = 350 * 1024;
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function walk(dir, out = []) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walk(full, out);
		else out.push(full);
	}
	return out;
}

async function compressFile(filePath) {
	const ext = path.extname(filePath).toLowerCase();
	if (!EXTENSIONS.has(ext)) return null;

	const before = fs.statSync(filePath).size;
	if (before <= TARGET_MAX_BYTES) {
		return { filePath, before, after: before, skipped: true };
	}

	const input = fs.readFileSync(filePath);
	const image = sharp(input, { failOn: "none" }).rotate();
	const meta = await image.metadata();

	let quality = JPEG_QUALITY;
	let width = Math.min(meta.width || MAX_WIDTH, MAX_WIDTH);
	let output = input;

	while (quality >= 55) {
		let pipeline = sharp(input, { failOn: "none" }).rotate();
		if (width < (meta.width || width)) {
			pipeline = pipeline.resize({ width, withoutEnlargement: true });
		} else if ((meta.width || 0) > MAX_WIDTH) {
			pipeline = pipeline.resize({
				width: MAX_WIDTH,
				withoutEnlargement: true,
			});
		}

		if (ext === ".png") {
			output = await pipeline.png({ compressionLevel: 9 }).toBuffer();
		} else if (ext === ".webp") {
			output = await pipeline.webp({ quality: Math.max(quality - 2, 50) }).toBuffer();
		} else {
			output = await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();
		}

		if (output.length <= TARGET_MAX_BYTES) break;
		quality -= 4;
		if (quality < 55 && width > 1280) {
			width = 1280;
			quality = 70;
		} else if (quality < 55) {
			break;
		}
	}

	if (output.length >= before) {
		return { filePath, before, after: before, skipped: true, reason: "no-gain" };
	}

	fs.writeFileSync(filePath, output);

	return {
		filePath,
		before,
		after: output.length,
	};
}

const files = walk(PUBLIC_DIR);
const results = [];

for (const file of files) {
	const result = await compressFile(file);
	if (result) results.push(result);
}

const changed = results.filter((r) => !r.skipped);
const saved = changed.reduce((sum, r) => sum + (r.before - r.after), 0);

for (const r of results) {
	const rel = path.relative(ROOT, r.filePath);
	const beforeMb = (r.before / (1024 * 1024)).toFixed(2);
	const afterMb = (r.after / (1024 * 1024)).toFixed(2);
	if (r.skipped) {
		console.log(`skip  ${rel} (${beforeMb} MB)`);
	} else {
		console.log(`ok    ${rel}: ${beforeMb} → ${afterMb} MB`);
	}
}

console.log(
	`\nCompressed ${changed.length} file(s). Saved ${(saved / (1024 * 1024)).toFixed(1)} MB.`,
);
