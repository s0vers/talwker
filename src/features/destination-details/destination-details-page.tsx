import { getDestinationDetailsTourCta } from "@/features/destination-details/content/destination-details-cta-copy";
import { getDestinationStoryViewModel } from "@/features/destination-details/lib/story-view-model";
import {
	EditorialCompositionCoastal,
	EditorialCompositionMountain,
	StorySectionsMotion,
} from "@/features/destination-details/sections";
import type { Destination } from "@/shared/types/domain";
import { EditorialCtaBand } from "@/shared/ui";

export type DestinationDetailsPageProps = {
	destination: Destination;
};

export default function DestinationDetailsPage({ destination }: DestinationDetailsPageProps) {
	const model = getDestinationStoryViewModel(destination);
	const tourCta = getDestinationDetailsTourCta(destination);
	const StoryComposition =
		model.variant === "mountain" ? EditorialCompositionMountain : EditorialCompositionCoastal;

	return (
		<div className="relative min-h-screen overflow-hidden">
			<StorySectionsMotion>
				<StoryComposition model={model} />
			</StorySectionsMotion>
			<EditorialCtaBand
				showTopFrame
				headingId={`destination-tour-cta-${tourCta.slug}`}
				label={tourCta.label}
				titleLead={tourCta.titleLead}
				titleAccent={tourCta.titleAccent}
				description={tourCta.description}
				primary={{
					label: tourCta.primaryAction,
					href: tourCta.primaryHref,
				}}
			/>
		</div>
	);
}
