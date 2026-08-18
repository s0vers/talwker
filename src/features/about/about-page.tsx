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
import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";

export default function AboutPage() {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
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
