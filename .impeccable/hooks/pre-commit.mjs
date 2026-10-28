#!/usr/bin/env node
import { execSync } from "node:child_process";

console.log("⚓ Running /impeccable pre-commit design hooks...");

try {
	console.log("1. Running Impeccable Detector...");
	execSync("node scripts/impeccable-detect.mjs", { stdio: "inherit" });

	console.log("\n2. Running Impeccable Doctor...");
	execSync("node scripts/impeccable-doctor.mjs", { stdio: "inherit" });

	console.log("\n✅ All Impeccable hooks passed cleanly.");
	process.exit(0);
} catch {
	console.error("\n❌ Impeccable pre-commit hook failed.");
	process.exit(1);
}
