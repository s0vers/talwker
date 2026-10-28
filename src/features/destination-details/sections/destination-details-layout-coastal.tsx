import type { DestinationNarrativeSectionProps } from "@/features/destination-details/lib/destination-details-types";
import { DestinationDetailsAtmosphere } from "@/features/destination-details/sections/destination-details-atmosphere";
import { DestinationDetailsCulturePulse } from "@/features/destination-details/sections/destination-details-culture-pulse";
import { DestinationDetailsLivingGeography } from "@/features/destination-details/sections/destination-details-living-geography";
import { DestinationDetailsMotifLayer } from "@/features/destination-details/sections/destination-details-motif-layer";
import { DestinationDetailsPeoplePortrait } from "@/features/destination-details/sections/destination-details-people-portrait";
import { DestinationDetailsReflectiveClose } from "@/features/destination-details/sections/destination-details-reflective-close";
import { DestinationDetailsSensoryImmersion } from "@/features/destination-details/sections/destination-details-sensory-immersion";

/**
 * Coastal narrative variant: relaxed vertical rhythm, default motif density.
 * Chapter order: atmosphere → geography → people → culture → sensory → close.
 */
export function DestinationDetailsCoastalLayout({ model }: DestinationNarrativeSectionProps) {
	return (
		<div className="relative mx-auto max-w-[1600px]">
			<div className="relative space-y-6 md:space-y-10">
				<DestinationDetailsAtmosphere model={model} />
				<div className="relative">
					<DestinationDetailsMotifLayer label={model.motifLabel} />
					<div className="relative space-y-6 md:space-y-10">
						<DestinationDetailsLivingGeography model={model} />
						<DestinationDetailsPeoplePortrait model={model} />
						<DestinationDetailsCulturePulse model={model} />
						<DestinationDetailsSensoryImmersion model={model} />
					</div>
				</div>
				<DestinationDetailsReflectiveClose model={model} />
			</div>
		</div>
	);
}
