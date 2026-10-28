import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

// Keep browser tooling outside the buyer's runtime dependencies.
if (!process.env.ARTWORK_NODE_MODULES)
	throw new Error(
		"Set ARTWORK_NODE_MODULES to the external Playwright node_modules directory."
	);
const require = createRequire(
	path.resolve(process.env.ARTWORK_NODE_MODULES, "package.json")
);
const { chromium } = require("playwright");
const base = process.env.ARTWORK_BASE_URL || "http://localhost:3000";
const output = "incoming-artwork/captures";
const pages = [
	["home-1", "/"],
	["home-2", "/home-2"],
	["home-3", "/home-3"],
	["destinations", "/destinations"],
	["destination", "/destinations/bali-indonesia"],
	["tour", "/tours/bali-cultural-immersion"],
	["story", "/stories/temple-smoke-and-terrace-light"],
	["about", "/about"],
	["login", "/login"],
	["admin", "/dashboard"],
	["customer", "/dashboard/customer"],
	["booking", "/booking?tour=bali-cultural-immersion"]
];
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chrome" });
try {
	for (const [name, route] of pages) {
		for (const mobile of [false, true]) {
			const filename = `${output}/${name}${mobile ? "-mobile" : ""}.png`;
			if (
				await fs.access(filename).then(
					() => true,
					() => false
				)
			)
				continue;
			const context = await browser.newContext({
				viewport: mobile
					? { width: 390, height: 844 }
					: { width: 1440, height: 900 },
				deviceScaleFactor: 2,
				reducedMotion: "reduce",
				isMobile: mobile,
				hasTouch: mobile
			});
			const page = await context.newPage();
			await page.addInitScript(() =>
				localStorage.setItem("talkwer-cookie-consent", "accepted")
			);
			const response = await page.goto(`${base}${route}`, {
				waitUntil: "networkidle"
			});
			if (!response?.ok()) throw new Error(`${route}: ${response?.status()}`);
			await page.evaluate(() => document.fonts.ready);
			await page.waitForTimeout(2200);
			await page.screenshot({ path: filename });
			await context.close();
			console.log(`Captured ${name}${mobile ? " mobile" : ""}`);
		}
	}
} finally {
	await browser.close();
}
