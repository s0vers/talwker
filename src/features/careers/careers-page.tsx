"use client";

import { useState } from "react";
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
	const [selectedPosition, setSelectedPosition] = useState<JobPosition | null>(null);

	return (
		<>
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
