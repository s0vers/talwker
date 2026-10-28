import fs from "node:fs";
import crypto from "node:crypto";

const submission = JSON.parse(
	fs.readFileSync("docs/marketplace/submission.json", "utf8")
);
const assets = JSON.parse(
	fs.readFileSync("docs/marketplace/assets.json", "utf8")
);
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const failures = [];
for (const field of [
	"supportUrl",
	"previewVerifiedAt",
	"assetRightsReviewedAt",
	"originalityReviewedAt",
	"crossBrowserReviewedAt",
	"performanceReviewedAt",
	"listingArtworkReviewedAt"
]) {
	if (!submission[field])
		failures.push(`Submission evidence missing: ${field}`);
}
if (submission.nextVersion !== pkg.dependencies.next)
	failures.push(
		"Next.js submission version differs from installed declaration."
	);
const ageDays =
	(Date.now() - Date.parse(submission.latestNextMinorVerifiedAt)) / 86400000;
if (!Number.isFinite(ageDays) || ageDays > 7)
	failures.push(
		"Recheck the latest public Next.js minor/security release before submitting."
	);
for (const asset of assets) {
	const hash = crypto
		.createHash("sha256")
		.update(fs.readFileSync(asset.path))
		.digest("hex");
	if (hash !== asset.sha256)
		failures.push(`Asset inventory is stale: ${asset.path}`);
	if (
		asset.previewUsed &&
		(!asset.previewApproved ||
			!(asset.sourceUrl || asset.generator) ||
			!asset.license)
	)
		failures.push(`Preview rights unverified: ${asset.path}`);
}
for (const file of [
	"documentation/index.html",
	"README.md",
	"CHANGELOG.md",
	"public/fonts/OFL.txt",
	"Licensing/magic-ui-MIT.txt",
	"Licensing/shadcn-ui-MIT.txt"
]) {
	if (!fs.existsSync(file))
		failures.push(`Required documentation/notice missing: ${file}`);
}
if (!fs.existsSync("docs/marketplace/artwork-assets.json")) {
	failures.push("Listing artwork inventory missing.");
} else {
	const artwork = JSON.parse(
		fs.readFileSync("docs/marketplace/artwork-assets.json", "utf8")
	);
	if (
		artwork.length !== 17 ||
		artwork.filter(asset => asset.gallery).length !== 15
	)
		failures.push(
			"Expected 17 B-series description images and exactly 15 gallery images."
		);
	for (const asset of artwork) {
		if (!fs.existsSync(asset.path)) {
			failures.push(`Listing image missing: ${asset.path}`);
			continue;
		}
		const hash = crypto
			.createHash("sha256")
			.update(fs.readFileSync(asset.path))
			.digest("hex");
		if (hash !== asset.sha256)
			failures.push(`Listing artwork inventory is stale: ${asset.path}`);
		if (
			!asset.generator ||
			!asset.scenePrompt ||
			!asset.previewOnly ||
			!asset.buyerZipExcluded
		)
			failures.push(`Listing artwork provenance incomplete: ${asset.path}`);
	}
}
if (failures.length) {
	console.error(
		`Submission gate: NOT READY (${failures.length} unresolved items)\n${failures.map(failure => `- ${failure}`).join("\n")}`
	);
	process.exitCode = 1;
} else
	console.log(
		"Submission evidence gate passed. Envato approval remains a separate editorial decision."
	);
