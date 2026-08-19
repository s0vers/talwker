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
import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";

export default function Home2Page() {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
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
