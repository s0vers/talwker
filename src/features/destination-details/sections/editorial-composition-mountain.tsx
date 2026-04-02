import type { DestinationNarrativeViewModel } from "@/features/destination-details/lib/story-types";
import { EditorialMotifLayer } from "@/features/destination-details/sections/editorial-motif-layer";
import { MovementAtmosphere } from "@/features/destination-details/sections/movement-atmosphere";
import { MovementCulturePulse } from "@/features/destination-details/sections/movement-culture-pulse";
import { MovementLivingGeography } from "@/features/destination-details/sections/movement-living-geography";
import { MovementPeoplePortrait } from "@/features/destination-details/sections/movement-people-portrait";
import { MovementReflectiveClose } from "@/features/destination-details/sections/movement-reflective-close";
import { MovementSensoryImmersion } from "@/features/destination-details/sections/movement-sensory-immersion";

type Props = {
	model: DestinationNarrativeViewModel;
};

export function EditorialCompositionMountain({ model }: Props) {
	return (
		<div className="relative mx-auto max-w-[1600px]">
			<EditorialMotifLayer label={model.motifLabel} dense />
			<div className="relative -space-y-2 md:-space-y-4">
				<MovementAtmosphere model={model} />
				<MovementPeoplePortrait model={model} />
				<MovementLivingGeography model={model} />
				<MovementCulturePulse model={model} />
				<MovementSensoryImmersion model={model} />
				<MovementReflectiveClose model={model} />
			</div>
		</div>
	);
}
