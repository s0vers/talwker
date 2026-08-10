"use client";

import { useState } from "react";
import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
import {
	CareersHero,
	CareersValues,
	CareersPerks,
	CareersBody,
	CareersCTA,
	ApplicationModal,
} from "./sections";
import type { JobPosition } from "./content/careers-copy";

export default function CareersPage() {
	const isLoading = useInitialPageLoader();
	const [selectedPosition, setSelectedPosition] = useState<JobPosition | null>(null);

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<div className="relative min-h-screen overflow-x-clip bg-[#050505]">
				<CareersHero />
				<CareersValues />
				<CareersPerks />
				<CareersBody onApply={setSelectedPosition} />
				<CareersCTA />
				<ApplicationModal
					position={selectedPosition}
					onClose={() => setSelectedPosition(null)}
				/>
			</div>
		</>
	);
}
