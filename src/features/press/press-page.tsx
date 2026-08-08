"use client";

import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
import { PressHero, PressCoverage, PressKits, PressBody, PressCTA } from "./sections";

export default function PressPage() {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<div className="relative min-h-screen overflow-x-clip bg-[#050505]">
				<PressHero />
				<PressCoverage />
				<PressKits />
				<PressBody />
				<PressCTA />
			</div>
		</>
	);
}
