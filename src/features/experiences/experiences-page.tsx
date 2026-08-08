"use client";

import { ExperiencesHero, ExperiencesStyles, ExperiencesThemes, ExperiencesCTA } from "./sections";

export default function ExperiencesPage() {
	return (
		<main className="min-h-screen bg-[#050505]">
			<ExperiencesHero />
			<ExperiencesStyles />
			<ExperiencesThemes />
			<ExperiencesCTA />
		</main>
	);
}
