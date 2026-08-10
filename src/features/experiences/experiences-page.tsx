"use client";

import { useState } from "react";
import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
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
	const isLoading = useInitialPageLoader();
	const [activeCategory, setActiveCategory] = useState<ExperienceCategory>("all");
	const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<div className="relative min-h-screen overflow-x-clip bg-[#050505]">
				<ExperiencesHero />
				<ExperiencesThemes
					activeCategory={activeCategory}
					onCategoryChange={setActiveCategory}
					onSelectExperience={setSelectedExperience}
				/>
				<ExperiencesStyles />
				<ExperiencesSpotlight />
				<ExperiencesCTA />
				<ExperienceModal
					experience={selectedExperience}
					onClose={() => setSelectedExperience(null)}
				/>
			</div>
		</>
	);
}
