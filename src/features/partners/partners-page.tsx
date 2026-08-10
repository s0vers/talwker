"use client";

import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
import { PartnersHero, PartnersTiers, PartnersBenefits, PartnersBody, PartnersCTA } from "./sections";

export default function PartnersPage() {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<div className="relative min-h-screen overflow-x-clip bg-[#050505]">
				<PartnersHero />
				<PartnersTiers />
				<PartnersBenefits />
				<PartnersBody />
				<PartnersCTA />
			</div>
		</>
	);
}
