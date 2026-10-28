"use client";

import {
	AstralVoices,
	FieldCartography,
	NocturnalLedger,
	NocturnalWaypoints,
	ObservatoryHero,
	ObservatoryInvitation,
	ObservatoryTelemetry,
	TwilightChronometer,
} from "@/features/home-3/sections";

export default function Home3Page() {

	return (
		<>
			<ObservatoryHero />
			<ObservatoryTelemetry />
			<NocturnalWaypoints />
			<TwilightChronometer />
			<FieldCartography />
			<NocturnalLedger />
			<AstralVoices />
			<ObservatoryInvitation />
		</>
	);
}
