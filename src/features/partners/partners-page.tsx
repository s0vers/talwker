"use client";

import { PartnersHero, PartnersTiers, PartnersBenefits, PartnersBody, PartnersCTA } from "./sections";

export default function PartnersPage() {
	return (
		<main className="min-h-screen bg-[#050505]">
			<PartnersHero />
			<PartnersTiers />
			<PartnersBenefits />
			<PartnersBody />
			<PartnersCTA />
		</main>
	);
}
