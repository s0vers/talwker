"use client";

import { PartnersHero, PartnersTiers, PartnersBenefits, PartnersBody, PartnersCTA } from "./sections";

export default function PartnersPage() {

	return (
		<>
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
