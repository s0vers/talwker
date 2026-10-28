#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

console.log("🩺 Running /impeccable doctor diagnostics...\n");

let passed = 0;
let failed = 0;

function check(name, fn) {
	try {
		const result = fn();
		if (result === true || result === undefined) {
			console.log(`✅ [PASS] ${name}`);
			passed++;
		} else {
			console.log(`❌ [FAIL] ${name}: ${result}`);
			failed++;
		}
	} catch (err) {
		console.log(`❌ [FAIL] ${name}: ${err.message}`);
		failed++;
	}
}

// 1. Context files
check("Design context (PRODUCT.md)", () => {
	const p = path.join(rootDir, "PRODUCT.md");
	if (!fs.existsSync(p)) return "PRODUCT.md is missing";
	const content = fs.readFileSync(p, "utf-8");
	if (!content.includes("Creative North Star") && !content.includes("Product Purpose")) {
		return "PRODUCT.md missing key sections";
	}
});

check("Design context (DESIGN.md)", () => {
	const p = path.join(rootDir, "DESIGN.md");
	if (!fs.existsSync(p)) return "DESIGN.md is missing";
	const content = fs.readFileSync(p, "utf-8");
	if (!content.includes("Colors") || !content.includes("Typography")) {
		return "DESIGN.md missing Colors or Typography sections";
	}
});

// 2. Config & Tokens
check("Impeccable configuration (.impeccable/config.json)", () => {
	const p = path.join(rootDir, ".impeccable/config.json");
	if (!fs.existsSync(p)) return "config.json is missing";
	const cfg = JSON.parse(fs.readFileSync(p, "utf-8"));
	if (!cfg.project || !cfg.live) return "Invalid config structure";
});

check("Design system tokens (.impeccable/design.json)", () => {
	const p = path.join(rootDir, ".impeccable/design.json");
	if (!fs.existsSync(p)) return "design.json is missing";
	const d = JSON.parse(fs.readFileSync(p, "utf-8"));
	if (!d.colors || !d.typography) return "Tokens missing colors/typography";
});

// 3. Surfaces mapping
check("Surface inventory (.impeccable/surfaces/surfaces.json)", () => {
	const p = path.join(rootDir, ".impeccable/surfaces/surfaces.json");
	if (!fs.existsSync(p)) return "surfaces.json is missing";
	const data = JSON.parse(fs.readFileSync(p, "utf-8"));
	if (!Array.isArray(data.surfaces) || data.surfaces.length === 0) {
		return "No surfaces listed in inventory";
	}
});

// 4. i18n dictionaries
check("Localization dictionaries (en.json, es.json, ja.json)", () => {
	const enP = path.join(rootDir, "dictionary/en.json");
	const esP = path.join(rootDir, "dictionary/es.json");
	const jaP = path.join(rootDir, "dictionary/ja.json");
	if (!fs.existsSync(enP) || !fs.existsSync(esP) || !fs.existsSync(jaP)) {
		return "One or more translation dictionaries missing";
	}
	const en = JSON.parse(fs.readFileSync(enP, "utf-8"));
	const es = JSON.parse(fs.readFileSync(esP, "utf-8"));
	const ja = JSON.parse(fs.readFileSync(jaP, "utf-8"));
	const enKeys = Object.keys(en).sort();
	const esKeys = Object.keys(es).sort();
	const jaKeys = Object.keys(ja).sort();
	if (JSON.stringify(enKeys) !== JSON.stringify(esKeys) || JSON.stringify(enKeys) !== JSON.stringify(jaKeys)) {
		return "Dictionary top-level keys do not match across locales";
	}
});

// 5. Verification check
check("Core verify scripts (check-kebab-case, check-image-sizes)", () => {
	if (!fs.existsSync(path.join(rootDir, "scripts/check-kebab-case.mjs"))) return "check-kebab-case missing";
	if (!fs.existsSync(path.join(rootDir, "scripts/check-image-sizes.mjs"))) return "check-image-sizes missing";
});

console.log("\n-------------------------------------------------------");
console.log(`Doctor diagnostics result: ${passed} passed, ${failed} failed.`);

if (failed > 0) {
	console.error("❌ Doctor found issues in the system.");
	process.exit(1);
} else {
	console.log("🎉 System is fully healthy and synchronized.");
	process.exit(0);
}
