#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const srcDir = path.join(rootDir, "src");

// Patterns to detect
const rules = {
	noLightPageBackgrounds: {
		regex: /<(section|main|div)[^>]*className=["'][^"']*\b(bg-gray-100|bg-zinc-100|bg-slate-100|bg-neutral-100|bg-stone-100|bg-white\/100)\b/g,
		message: "Light section/page background detected on dark canvas system. All page surfaces must use dark tokens (#050505, #0a0a0a, etc.)",
		severity: "error"
	},
	noPurpleAIGradients: {
		regex: /\b(from-purple-|to-purple-|from-violet-|to-violet-|from-indigo-|to-indigo-|from-fuchsia-|to-fuchsia-)\b/g,
		message: "Generic AI purple/violet/indigo gradient detected. Use brand-locked palette (orange-500, neutrals).",
		severity: "error"
	},
	noArbitraryActionColors: {
		regex: /\b(bg-blue-600|bg-red-600|bg-emerald-600|bg-pink-600|bg-cyan-600)\b/g,
		message: "Arbitrary action color detected. Brand action color is orange-500.",
		severity: "warn"
	},
	noUncheckedMotion: {
		checkFile: (content, relPath) => {
			if (!content.includes("gsap.") && !content.includes("useGsap")) {
				return null;
			}
			if (
				content.includes("prefersReducedMotion") ||
				content.includes("prefers-reduced-motion") ||
				relPath.includes("useGsap")
			) {
				return null;
			}
			return "GSAP animation detected without prefersReducedMotion() guard.";
		},
		severity: "warn"
	}
};

let errorCount = 0;
let warnCount = 0;

function scanDir(dir) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			scanDir(fullPath);
		} else if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts"))) {
			checkFile(fullPath);
		}
	}
}

function checkFile(filePath) {
	const content = fs.readFileSync(filePath, "utf-8");
	const relPath = path.relative(rootDir, filePath).replace(/\\/g, "/");
	const lines = content.split("\n");

	for (const rule of Object.values(rules)) {
		if (rule.regex) {
			lines.forEach((line, idx) => {
				const matches = line.match(rule.regex);
				if (matches) {
					const prefix = rule.severity === "error" ? "❌ [ERROR]" : "⚠️  [WARN]";
					console.log(`${prefix} ${relPath}:${idx + 1} - ${rule.message} (matched: ${matches.join(", ")})`);
					if (rule.severity === "error") errorCount++;
					else warnCount++;
				}
			});
		}

		if (rule.checkFile) {
			const issue = rule.checkFile(content, relPath);
			if (issue) {
				const prefix = rule.severity === "error" ? "❌ [ERROR]" : "⚠️  [WARN]";
				console.log(`${prefix} ${relPath} - ${issue}`);
				if (rule.severity === "error") errorCount++;
				else warnCount++;
			}
		}
	}
}

console.log("🔍 Running Impeccable Design System Detector CLI...");
scanDir(srcDir);

console.log("\n-------------------------------------------------------");
console.log(`Detector finished: ${errorCount} error(s), ${warnCount} warning(s).`);

if (errorCount > 0) {
	console.error("❌ Impeccable detector checks failed.");
	process.exit(1);
} else {
	console.log("✅ All Impeccable detector checks passed successfully.");
	process.exit(0);
}
