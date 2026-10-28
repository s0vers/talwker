import type { DestinationNarrativeSectionProps } from "@/features/destination-details/lib/destination-details-types";
import { DestinationDetailsAtmosphere } from "@/features/destination-details/sections/destination-details-atmosphere";
import { DestinationDetailsCulturePulse } from "@/features/destination-details/sections/destination-details-culture-pulse";
import { DestinationDetailsLivingGeography } from "@/features/destination-details/sections/destination-details-living-geography";
import { DestinationDetailsMotifLayer } from "@/features/destination-details/sections/destination-details-motif-layer";
import { DestinationDetailsPeoplePortrait } from "@/features/destination-details/sections/destination-details-people-portrait";
import { DestinationDetailsReflectiveClose } from "@/features/destination-details/sections/destination-details-reflective-close";
import { DestinationDetailsSensoryImmersion } from "@/features/destination-details/sections/destination-details-sensory-immersion";

/**
 * Mountain narrative variant: tighter vertical overlap, stronger motif stroke.
 * Chapter order: atmosphere → people → geography → culture → sensory → close.
 */
export function DestinationDetailsMountainLayout({ model }: DestinationNarrativeSectionProps) {
	return (
		<div className="relative mx-auto max-w-[1600px]">
			<div className="relative -space-y-2 md:-space-y-4">
				<DestinationDetailsAtmosphere model={model} />
				<div className="relative">
					<DestinationDetailsMotifLayer label={model.motifLabel} dense />
					<div className="relative -space-y-2 md:-space-y-4">
						<DestinationDetailsPeoplePortrait model={model} />
						<DestinationDetailsLivingGeography model={model} />
						<DestinationDetailsCulturePulse model={model} />
						<DestinationDetailsSensoryImmersion model={model} />
					</div>
				</div>
				<DestinationDetailsReflectiveClose model={model} />
			</div>
		</div>
	);
}
