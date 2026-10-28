import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const target = new URL(process.argv[2] ?? "http://localhost:3000");
const runs = Number(process.argv[3] ?? 5);
if (
	!["http:", "https:"].includes(target.protocol) ||
	target.username ||
	target.password
) {
	throw new Error("Supply an HTTP(S) preview URL without credentials.");
}
if (!Number.isInteger(runs) || runs < 1 || runs > 10) {
	throw new Error("Run count must be an integer from 1 to 10.");
}

const output = path.resolve(".reports/mobile-lcp");
mkdirSync(output, { recursive: true });
const cli = require.resolve("lighthouse/cli/index.js");
const results = [];
let profile;

for (let run = 1; run <= runs; run++) {
	const reportPath = path.join(output, `run-${run}.json`);
	const child = spawnSync(
		process.execPath,
		[
			cli,
			target.href,
			"--output=json",
			`--output-path=${reportPath}`,
			"--chrome-flags=--headless --disable-gpu",
			"--only-categories=performance,accessibility",
			"--quiet"
		],
		{ stdio: "inherit" }
	);
	if (child.error) throw child.error;
	if (child.status !== 0)
		throw new Error(`Lighthouse run ${run} failed (${child.status}).`);
	const report = JSON.parse(readFileSync(reportPath, "utf8"));
	if (report.runtimeError) throw new Error(report.runtimeError.message);
	const audits = report.audits;
	const lcpMs = audits["largest-contentful-paint"].numericValue;
	if (!Number.isFinite(lcpMs))
		throw new Error(`Run ${run} returned no LCP measurement.`);
	profile ??= {
		lighthouseVersion: report.lighthouseVersion,
		userAgent: report.userAgent,
		throttlingMethod: report.configSettings.throttlingMethod,
		throttling: report.configSettings.throttling,
		screenEmulation: report.configSettings.screenEmulation,
		chromeFlags: "--headless --disable-gpu"
	};
	const requests = audits["network-requests"].details.items;
	const result = {
		run,
		fetchTime: report.fetchTime,
		lcpMs,
		fcpMs: audits["first-contentful-paint"].numericValue,
		performance: report.categories.performance.score,
		accessibility: report.categories.accessibility.score,
		cls: audits["cumulative-layout-shift"].numericValue,
		tbtMs: audits["total-blocking-time"].numericValue,
		transferBytes: audits["total-byte-weight"].numericValue,
		scriptTransferBytes: requests
			.filter(request => request.resourceType === "Script")
			.reduce((sum, request) => sum + request.transferSize, 0),
		protocols: [...new Set(requests.map(request => request.protocol))],
		passed: lcpMs < 2500
	};
	results.push(result);
	console.log(
		`Run ${run}/${runs}: LCP ${(lcpMs / 1000).toFixed(3)}s (${result.passed ? "PASS" : "FAIL"})`
	);
}

const passed = results.every(result => result.passed);
writeFileSync(
	path.join(output, "summary.json"),
	JSON.stringify(
		{
			url: target.href,
			lcpBudgetMs: 2500,
			passed,
			profile,
			runs: results
		},
		null,
		2
	) + "\n"
);
console.log(
	`${passed ? "PASS" : "FAIL"}: all ${runs} runs must be under 2.5s. Reports: ${output}`
);
process.exitCode = passed ? 0 : 1;
