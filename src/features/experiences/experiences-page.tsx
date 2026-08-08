"use client";

import { useState } from "react";
import {
	ExperiencesHero,
	ExperiencesStyles,
	ExperiencesThemes,
	ExperiencesSpotlight,
	ExperiencesCTA,
	ExperienceModal,
} from "./sections";
import type { ExperienceCategory, ExperienceItem } from "./content/experiences-page-copy";

export default function ExperiencesPage() {
	const [activeCategory, setActiveCategory] = useState<ExperienceCategory>("all");
	const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);

	return (
		<main className="min-h-screen bg-[#050505]">
			<ExperiencesHero
				activeCategory={activeCategory}
				onCategoryChange={setActiveCategory}
			/>
			<ExperiencesThemes
				activeCategory={activeCategory}
				onSelectExperience={setSelectedExperience}
			/>
			<ExperiencesStyles />
			<ExperiencesSpotlight />
			<ExperiencesCTA />

			{/* Interactive Quick View Modal */}
			<ExperienceModal
				experience={selectedExperience}
				onClose={() => setSelectedExperience(null)}
			/>
		</main>
	);
}
