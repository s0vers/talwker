"use client";

import {
	AtelierCollections,
	AtelierGallery,
	AtelierHero,
	AtelierInvitation,
	AtelierMonograph,
	AtelierPhilosophy,
	AtelierTours,
} from "@/features/home-2/sections";

export default function Home2Page() {

	return (
		<>
			<AtelierHero />
			<AtelierGallery />
			<AtelierMonograph />
			<AtelierCollections />
			<AtelierTours />
			<AtelierPhilosophy />
			<AtelierInvitation />
		</>
	);
}
