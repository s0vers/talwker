"use client";

import {
	AtelierArchetypes,
	AtelierCTA,
	AtelierDepartures,
	AtelierDispatch,
	AtelierDossiers,
	AtelierHero,
	AtelierManifesto,
	AtelierTelemetry,
} from "@/features/home-2/sections";
import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";

export default function Home2Page() {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<AtelierHero />
			<AtelierTelemetry />
			<AtelierDossiers />
			<AtelierArchetypes />
			<AtelierDispatch />
			<AtelierDepartures />
			<AtelierManifesto />
			<AtelierCTA />
		</>
	);
}
