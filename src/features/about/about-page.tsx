"use client";

import {
	AboutHero,
	AboutStory,
	AboutGlobalReach,
	AboutPhilosophy,
	AboutValues,
	AboutJourney,
	AboutTeam,
	AboutCTA,
} from "@/features/about/sections";

export default function AboutPage() {

	return (
		<>
			<div className="relative min-h-screen overflow-x-clip bg-[#050505]">
				<AboutHero />
				<AboutStory />
				<AboutGlobalReach />
				<AboutPhilosophy />
				<AboutValues />
				<AboutJourney />
				<AboutTeam />
				<AboutCTA />
			</div>
		</>
	);
}
