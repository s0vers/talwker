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
		<main className="min-h-screen bg-[#050505]">
			<CareersHero />
			<CareersValues />
			<CareersPerks />
			<CareersBody onApply={setSelectedPosition} />
			<CareersCTA />

			{/* Application Modal */}
			<ApplicationModal
				position={selectedPosition}
				onClose={() => setSelectedPosition(null)}
			/>
		</main>
	);
}
