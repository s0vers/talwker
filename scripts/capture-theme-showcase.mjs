import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
if (!process.env.ARTWORK_NODE_MODULES)
	throw new Error(
		"Set ARTWORK_NODE_MODULES to external Playwright node_modules."
	);
const require = createRequire(
	path.resolve(process.env.ARTWORK_NODE_MODULES, "package.json")
);
const { chromium } = require("playwright");
const base = process.env.ARTWORK_BASE_URL || "http://localhost:3000";
const output = "incoming-artwork/v2/captures";
const routes = {
	"home-1": "/",
	"home-2": "/home-2",
	"home-3": "/home-3",
	destinations: "/destinations",
	"destinations-2": "/destinations-2",
	"destinations-3": "/destinations-3",
	destination: "/destinations/bali-indonesia",
	"destination-2": "/destinations/santorini-greece",
	tours: "/tours",
	tour: "/tours/bali-cultural-immersion",
	stories: "/stories",
	story: "/stories/temple-smoke-and-terrace-light",
	about: "/about",
	experiences: "/experiences",
	contact: "/contact",
	faq: "/faq",
	careers: "/careers",
	press: "/press",
	partners: "/partners",
	privacy: "/privacy",
	register: "/register",
	login: "/login",
	"login-2": "/login-2",
	"login-3": "/login-3",
	admin: "/dashboard",
	customer: "/dashboard/customer",
	booking: "/booking?tour=bali-cultural-immersion"
};
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const evidence = [];
try {
	for (const [name, route] of Object.entries(routes)) {
		for (const mode of [
			"desktop",
			"mobile",
			...(["home-1", "home-2", "home-3"].includes(name) ? ["full"] : []),
			...(name === "home-1" ? ["tablet"] : [])
		]) {
			const filename = `${output}/${name}-${mode}.png`;
			const viewport =
				mode === "mobile"
					? { width: 390, height: 844 }
					: mode === "tablet"
						? { width: 820, height: 1180 }
						: { width: 1440, height: 900 };
			const exists = await fs.access(filename).then(
				() => true,
				() => false
			);
			if (exists && mode !== "desktop") continue;
			const context = await browser.newContext({
				viewport,
				deviceScaleFactor: 2,
				reducedMotion: "reduce",
				isMobile: mode === "mobile",
				hasTouch: ["mobile", "tablet"].includes(mode)
			});
			const page = await context.newPage();
			await page.addInitScript(() =>
				localStorage.setItem("talkwer_cookie_consent", "accepted")
			);
			const response = await page.goto(`${base}${route}`, {
				waitUntil: "networkidle"
			});
			if (!response?.ok()) throw new Error(`${route}: ${response?.status()}`);
			await page.evaluate(() => document.fonts.ready);
			await page.waitForTimeout(1600);
			if (mode === "full") {
				const height = await page.evaluate(
					() => document.documentElement.scrollHeight
				);
				for (let y = 0; y < height; y += 700) {
					await page.evaluate(y => scrollTo(0, y), y);
					await page.waitForTimeout(100);
				}
				await page.evaluate(() => scrollTo(0, 0));
				await page.waitForTimeout(500);
			}
			if (!exists)
				await page.screenshot({ path: filename, fullPage: mode === "full" });
			evidence.push({
				name,
				mode,
				route,
				viewport,
				status: response.status(),
				height: await page.evaluate(() => document.documentElement.scrollHeight)
			});
			const crops =
				name === "home-1" && mode === "desktop"
					? [
							["testimonial", "#testimonials .group"],
							["newsletter", "#newsletter > div > div"],
							["navigation", "nav"],
							["tour-card", "[data-tour-card]"]
						]
					: name === "destinations" && mode === "desktop"
						? [["destination-card", "[data-destination-card]"]]
						: name === "booking" && mode === "desktop"
							? [["calendar", "div.inline-block:has(table)"]]
							: name === "customer" && mode === "desktop"
								? [
										["customer-trip", ".tw-booking-card"],
										["customer-consult", ".tw-consult-card"]
									]
								: [];
			for (const [crop, selector] of crops) {
				const locator = page.locator(selector).first();
				if ((await locator.count()) !== 1)
					throw new Error(`Missing component ${crop}: ${selector}`);
				await locator.scrollIntoViewIfNeeded();
				await page.waitForTimeout(250);
				await locator.screenshot({ path: `${output}/component-${crop}.png` });
			}
			await context.close();
			console.log(`Captured ${name} ${mode}`);
		}
	}
	await fs.writeFile(
		`${output}/capture-evidence.json`,
		JSON.stringify(evidence, null, 2)
	);
} finally {
	await browser.close();
}
