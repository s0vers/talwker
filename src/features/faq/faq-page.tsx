"use client";

import { FaqHero, FaqAccordion } from "./sections";

export default function FaqPage() {
	return (
		<main className="min-h-screen bg-[#050505]">
			<FaqHero />
			<FaqAccordion />
		</main>
	);
}
