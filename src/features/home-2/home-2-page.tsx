"use client";

import {
	AtelierBoardingPasses,
	AtelierConciergeVault,
	AtelierDarkroom,
	AtelierHero,
	AtelierJourneyWeaver,
	AtelierMapAtlas,
	AtelierSplitDispatch,
} from "@/features/home-2/sections";
import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";

export default function Home2Page() {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<AtelierHero />
			<AtelierMapAtlas />
			<AtelierDarkroom />
			<AtelierJourneyWeaver />
			<AtelierBoardingPasses />
			<AtelierSplitDispatch />
			<AtelierConciergeVault />
		</>
	);
}
