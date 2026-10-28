"use client";

import { PressHero, PressCoverage, PressKits, PressBody, PressCTA } from "./sections";

export default function PressPage() {

	return (
		<>
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
