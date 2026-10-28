import fs from "node:fs";

const origin = new URL(process.argv[2] ?? "http://localhost:3561");
if (!['localhost', '127.0.0.1'].includes(origin.hostname)) {
	throw new Error('Use a local production server for this crawl.');
}
const pending = new Set(['/', '/home-2', '/home-3']);
const visited = new Set();
const results = [];
while (pending.size) {
	const route = pending.values().next().value;
	pending.delete(route);
	if (visited.has(route)) continue;
	visited.add(route);
	if (visited.size > 500) throw new Error('Unexpected crawl size; inspect route generation.');
	const response = await fetch(new URL(route, origin));
	const html = await response.text();
	results.push({ route, status: response.status });
	if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) continue;
	for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
		const href = match[1].replaceAll('&amp;', '&');
		const url = new URL(href, origin);
		if (url.origin !== origin.origin || /\.(?:png|jpg|webp|svg|ico|pdf)$/.test(url.pathname)) continue;
		if (/^\/(?:es|ja)(?:\/|$)/.test(url.pathname)) continue;
		const target = url.pathname;
		if (!visited.has(target)) pending.add(target);
	}
}
const failures = results.filter(item => item.status >= 400);
const report = { checkedAt: new Date().toISOString(), origin: origin.origin, scope: 'English server-rendered anchor destinations; no JavaScript-only links, forms, query behavior or external links', checked: results.length, failures, results };
fs.writeFileSync('docs/marketplace/preview-links.json', JSON.stringify(report, null, 2) + '\n');
console.log(`${results.length} routes checked; ${failures.length} failures.`);
for (const failure of failures) console.log(`${failure.status} ${failure.route}`);
if (failures.length) process.exitCode = 1;
