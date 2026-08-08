"use client";

import { PressHero, PressCoverage, PressKits, PressBody, PressCTA } from "./sections";

export default function PressPage() {
	return (
		<main className="min-h-screen bg-[#050505]">
			<PressHero />
			<PressCoverage />
			<PressKits />
			<PressBody />
			<PressCTA />
		</main>
	);
}
