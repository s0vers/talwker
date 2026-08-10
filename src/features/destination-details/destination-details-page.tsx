"use client";

import { getDestinationDetailsTourCta } from "@/features/destination-details/content/destination-details-cta-copy";
import { getDestinationDetailsViewModel } from "@/features/destination-details/lib/destination-details-view-model";
import {
	DestinationDetailsCoastalLayout,
	DestinationDetailsMountainLayout,
	DestinationDetailsSectionsMotion,
} from "@/features/destination-details/sections";
import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
import type { Destination } from "@/shared/types/domain";
import { EditorialCtaBand } from "@/shared/ui";

export type DestinationDetailsPageProps = {
	destination: Destination;
};

export default function DestinationDetailsPage({ destination }: DestinationDetailsPageProps) {
	const isLoading = useInitialPageLoader();

	const model = getDestinationDetailsViewModel(destination);
	const tourCta = getDestinationDetailsTourCta(destination);
	const NarrativeLayout =
		model.variant === "mountain" ? DestinationDetailsMountainLayout : DestinationDetailsCoastalLayout;

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<div className="relative min-h-screen overflow-x-clip bg-[#050505]">
				<DestinationDetailsSectionsMotion>
					<NarrativeLayout model={model} />
				</DestinationDetailsSectionsMotion>
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
		</>
	);
}
