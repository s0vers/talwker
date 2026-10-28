import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
	SiNextdotjs,
	SiReact,
	SiTypescript,
	SiTailwindcss
} from "react-icons/si";
if (!process.env.ARTWORK_NODE_MODULES)
	throw new Error(
		"Set ARTWORK_NODE_MODULES to the external Playwright node_modules directory."
	);
const base = process.env.ARTWORK_BASE_URL || "http://localhost:3000";
const require = createRequire(
	path.resolve(process.env.ARTWORK_NODE_MODULES, "package.json")
);
const { chromium } = require("playwright");
const rows = JSON.parse(
	await fs.readFile(
		process.env.ARTWORK_MANIFEST || "scripts/listing-artwork.json",
		"utf8"
	)
);
const technologyMarks = [
	[SiNextdotjs, "#ffffff"],
	[SiReact, "#61dafb"],
	[SiTypescript, "#3178c6"],
	[SiTailwindcss, "#38bdf8"]
]
	.map(([icon, color]) => renderToStaticMarkup(createElement(icon, { color })))
	.join("");
const output = process.env.ARTWORK_TYPE_DIR || "incoming-artwork/type";
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chrome" });
try {
	const page = await browser.newPage({
		viewport: { width: 1536, height: 1024 }
	});
	await page.goto(base, { waitUntil: "networkidle" });
	for (const row of rows) {
		const top = row.top;
		await page.setContent(`<style>
      @font-face{font-family:Inter;src:url(${base}/fonts/inter-variable.woff2)}
      *{box-sizing:border-box}body{margin:0;background:transparent;color:white;font-family:Inter}
      main{position:absolute;left:64px;top:${top ? 56 : 130}px;width:${top ? 1408 : row.headlineWidth || 510}px;text-align:${top ? "center" : "left"}}
      .brand{font-size:34px;font-weight:750;letter-spacing:-1.5px;margin-bottom:40px}
      .dot,em{color:#f97316}h1{margin:0;font-size:${row.headlineSize || (top ? 68 : 70)}px;line-height:1.08;letter-spacing:-3px;font-weight:750}
      em{font-style:italic}h1{text-shadow:0 2px 18px #0008}p{font-size:20px;line-height:1.5;color:#ddd;max-width:470px;margin:${top ? "20px auto" : "26px 0"}}
      .stack{display:flex;gap:18px;margin-top:32px;align-items:center}.stack svg{width:40px;height:40px}.stack span{font-size:16px;font-weight:650}
      </style><main>${top ? "" : '<div class="brand">talkwer<span class="dot">.</span></div>'}
      <h1>${row.headline[0]}${top ? " " : "<br>"}<em>${row.headline[1]}</em></h1><p>${row.subtitle}</p>
      ${row.tech || ["a01-hero-window-desk", "a15-topographic-texture"].includes(row.name) ? `<div class="stack">${technologyMarks}</div>` : ""}</main>
      ${row.features ? `<style>
      .features{position:absolute;left:600px;right:64px;top:150px;bottom:150px;display:grid;grid-template-columns:repeat(2,1fr);grid-auto-rows:1fr;gap:20px}
      .card{border:1px solid #ffffff1f;background:#0a0a0acc;border-radius:22px;padding:28px 30px;display:flex;flex-direction:column;justify-content:center;box-shadow:0 20px 50px #0009}
      .card b{font-size:27px;letter-spacing:-.8px;font-weight:750}.card b i{font-style:normal;color:#f97316;margin-right:8px}
      .card span{font-size:18px;line-height:1.45;color:#c9c9c9;margin-top:10px}
      </style><section class="features">${row.features.map(([title, text]) => `<div class="card"><b><i>/</i>${title}</b><span>${text}</span></div>`).join("")}</section>` : ""}`);
		await page.evaluate(() => document.fonts.ready);
		await page.screenshot({
			path: `${output}/${row.name}.png`,
			omitBackground: true
		});
	}
} finally {
	await browser.close();
}
