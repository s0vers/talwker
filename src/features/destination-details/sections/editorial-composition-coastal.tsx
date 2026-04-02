import type { DestinationNarrativeSectionProps } from "@/features/destination-details/lib/story-types";
import { EditorialMotifLayer } from "@/features/destination-details/sections/editorial-motif-layer";
import { MovementAtmosphere } from "@/features/destination-details/sections/movement-atmosphere";
import { MovementCulturePulse } from "@/features/destination-details/sections/movement-culture-pulse";
import { MovementLivingGeography } from "@/features/destination-details/sections/movement-living-geography";
import { MovementPeoplePortrait } from "@/features/destination-details/sections/movement-people-portrait";
import { MovementReflectiveClose } from "@/features/destination-details/sections/movement-reflective-close";
import { MovementSensoryImmersion } from "@/features/destination-details/sections/movement-sensory-immersion";

export function EditorialCompositionCoastal({ model }: DestinationNarrativeSectionProps) {
	return (
		<div className="relative mx-auto max-w-[1600px]">
			<EditorialMotifLayer label={model.motifLabel} />
			<div className="relative space-y-6 md:space-y-10">
				<MovementAtmosphere model={model} />
				<MovementLivingGeography model={model} />
				<MovementPeoplePortrait model={model} />
				<MovementCulturePulse model={model} />
				<MovementSensoryImmersion model={model} />
				<MovementReflectiveClose model={model} />
			</div>
		</div>
	);
}
