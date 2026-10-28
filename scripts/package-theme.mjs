import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const root = process.cwd();
const assets = JSON.parse(
	fs.readFileSync("docs/marketplace/assets.json", "utf8")
);
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const output = path.join(root, "release", `talkwer-${stamp}`, "talkwer");
fs.mkdirSync(output, { recursive: true });

const entries = [
	"src",
	"dictionary",
	"documentation",
	"Licensing",
	"README.md",
	"LICENSE",
	"CONTRIBUTING.md",
	"SECURITY.md",
	"docs",
	"CHANGELOG.md",
	".env.example",
	".gitignore",
	".prettierrc",
	"components.json",
	"global.d.ts",
	"next.config.mjs",
	"postcss.config.mjs",
	"tsconfig.json",
	"eslint.config.mjs",
	"pnpm-lock.yaml",
	"pnpm-workspace.yaml"
];
for (const entry of entries) {
	fs.cpSync(path.join(root, entry), path.join(output, entry), {
		recursive: true
	});
}
const buyerPackage = JSON.parse(fs.readFileSync("package.json", "utf8"));
const buyerReadme =
	fs
		.readFileSync("README.md", "utf8")
		.replace(/!\[Talkwer homepage and travel layouts\]\([^\n]+\)\n/, "") +
	"\n> This optional legacy package uses dimension-labelled image placeholders instead of the repository demo images.\n";
fs.writeFileSync(path.join(output, "README.md"), buyerReadme);
for (const name of Object.keys(buyerPackage.scripts)) {
	if (
		/^(detect|doctor|hooks|impeccable:|package:|check:marketplace|audit:preview-links)/.test(
			name
		)
	)
		delete buyerPackage.scripts[name];
}
fs.writeFileSync(
	path.join(output, "package.json"),
	JSON.stringify(buyerPackage, null, 2) + "\n"
);
fs.mkdirSync(path.join(output, "scripts"));
for (const name of [
	"check-kebab-case.mjs",
	"check-image-sizes.mjs",
	"check-public-image-bytes.mjs",
	"compress-public-images.mjs",
	"subset-inter.py",
	"audit-mobile-lcp.mjs"
]) {
	fs.copyFileSync(
		path.join(root, "scripts", name),
		path.join(output, "scripts", name)
	);
}

function hash(file) {
	return crypto
		.createHash("sha256")
		.update(fs.readFileSync(file))
		.digest("hex");
}
function walk(folder) {
	return fs.readdirSync(folder, { withFileTypes: true }).flatMap(entry => {
		const full = path.join(folder, entry.name);
		if (entry.isSymbolicLink()) throw new Error(`Unexpected symlink: ${full}`);
		return entry.isDirectory() ? walk(full) : [full];
	});
}

const distributionAssets = [];
for (const file of walk(path.join(root, "public"))) {
	const relative = path.relative(root, file).replaceAll("\\", "/");
	// Marketplace description images are served by the live preview only.
	if (relative.startsWith("public/envato/")) continue;
	const target = path.join(output, relative);
	fs.mkdirSync(path.dirname(target), { recursive: true });
	if (/\.(jpg|jpeg|png|webp|avif|svg)$/i.test(file)) {
		const record = assets.find(item => item.path === relative);
		if (!record || record.sha256 !== hash(file))
			throw new Error(`Asset inventory missing or stale: ${relative}`);
		const { width, height } = await sharp(file).metadata();
		if (!width || !height)
			throw new Error(`Cannot determine image dimensions: ${relative}`);
		const size = Math.max(
			12,
			Math.round(Math.min(width / 12, height / 8, 100))
		);
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#181818"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="${size}" fill="#b5b5b5">${width} × ${height}</text></svg>`;
		if (relative.endsWith(".svg")) fs.writeFileSync(target, svg);
		else await sharp(Buffer.from(svg)).toFile(target);
		distributionAssets.push({
			file: relative,
			width,
			height,
			type: "dimension placeholder"
		});
	} else if (
		relative === "public/fonts/inter-variable.woff2" ||
		relative === "public/fonts/inter-latin-core.woff2" ||
		relative === "public/fonts/inter-variable-latin.woff2" ||
		relative === "public/fonts/OFL.txt"
	) {
		fs.copyFileSync(file, target);
	} else if (relative === "public/ServiceWorker.js") {
		fs.copyFileSync(file, target);
	} else {
		throw new Error(`Public file has no distribution policy: ${relative}`);
	}
}

fs.writeFileSync(
	path.join(output, "Licensing/distribution-assets.json"),
	JSON.stringify(distributionAssets, null, 2) + "\n"
);
fs.copyFileSync(
	"docs/THIRD_PARTY_LICENSES.md",
	path.join(output, "Licensing/THIRD_PARTY_LICENSES.md")
);

const licenses = [];
function locateDependency(name, from) {
	let directory = from;
	while (true) {
		const candidate = path.join(directory, "node_modules", name);
		if (fs.existsSync(path.join(candidate, "package.json")))
			return fs.realpathSync(candidate);
		const parent = path.dirname(directory);
		if (parent === directory) return null;
		directory = parent;
	}
}
const queue = Object.keys({
	...buyerPackage.dependencies,
	...buyerPackage.devDependencies
}).map(name => {
	const folder = locateDependency(name, root);
	if (!folder)
		throw new Error("Install dependencies before packaging: " + name);
	return folder;
});
const visited = new Set();
while (queue.length) {
	const folder = queue.shift();
	if (visited.has(folder)) continue;
	visited.add(folder);
	const pkg = JSON.parse(
		fs.readFileSync(path.join(folder, "package.json"), "utf8")
	);
	for (const name of Object.keys({
		...pkg.dependencies,
		...pkg.optionalDependencies,
		...pkg.peerDependencies
	})) {
		const dependency = locateDependency(name, folder);
		if (dependency) queue.push(dependency);
	}
	if (
		licenses.some(
			entry => entry.name === pkg.name && entry.version === pkg.version
		)
	)
		continue;
	const licenseFiles = fs
		.readdirSync(folder)
		.filter(
			name =>
				/^(licen[cs]e|copying|notice)(\.|$)/i.test(name) &&
				fs.statSync(path.join(folder, name)).isFile()
		);
	const destination = path.join(
		output,
		"Licensing/dependencies",
		pkg.name.replaceAll("/", "_") + "@" + pkg.version
	);
	fs.mkdirSync(destination, { recursive: true });
	for (const file of licenseFiles)
		fs.copyFileSync(path.join(folder, file), path.join(destination, file));
	licenses.push({
		name: pkg.name,
		version: pkg.version,
		license: pkg.license ?? "unspecified",
		homepage: pkg.homepage ?? pkg.repository?.url ?? null,
		licenseFiles
	});
}
fs.writeFileSync(
	path.join(output, "Licensing/dependencies.json"),
	JSON.stringify(
		licenses.sort((a, b) => a.name.localeCompare(b.name)),
		null,
		2
	) + "\n"
);
const files = walk(output).map(file => ({
	file: path.relative(output, file).replaceAll("\\", "/"),
	sha256: hash(file)
}));
fs.writeFileSync(
	path.join(output, "distribution-manifest.json"),
	JSON.stringify(
		{
			version: buyerPackage.version,
			builtAt: new Date().toISOString(),
			status:
				"preparation candidate; see author readiness report before submission",
			files
		},
		null,
		2
	) + "\n"
);
console.log(`Clean buyer source: ${output}`);
console.log(
	`${distributionAssets.length} preview images replaced; ${licenses.length} dependency records collected.`
);
const archive = `${path.dirname(output)}.zip`;
if (process.platform === "win32") {
	execFileSync(
		"powershell.exe",
		[
			"-NoProfile",
			"-NonInteractive",
			"-Command",
			"$ErrorActionPreference = 'Stop'; Add-Type -AssemblyName System.IO.Compression; Add-Type -AssemblyName System.IO.Compression.FileSystem; $taskRoot = $env:TALKWER_PACKAGE_DIR; $taskArchive = [System.IO.Compression.ZipFile]::Open($env:TALKWER_PACKAGE_ZIP, [System.IO.Compression.ZipArchiveMode]::Create); try { Get-ChildItem -LiteralPath $taskRoot -Recurse -File -Force | ForEach-Object { $taskEntry = $_.FullName.Substring($taskRoot.Length + 1).Replace([char]92, [char]47); [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($taskArchive, $_.FullName, $taskEntry) | Out-Null } } finally { $taskArchive.Dispose() }"
		],
		{
			env: {
				...process.env,
				TALKWER_PACKAGE_DIR: path.dirname(output),
				TALKWER_PACKAGE_ZIP: archive
			}
		}
	);
} else {
	execFileSync("zip", ["-qr", archive, "talkwer"], {
		cwd: path.dirname(output)
	});
}
console.log(`Buyer ZIP: ${archive}`);
console.log(
	"This package does not establish preview asset rights or marketplace approval."
);
