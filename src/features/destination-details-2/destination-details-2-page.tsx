"use client";

import { getDestinationDetailsTourCta } from "@/features/destination-details/content/destination-details-cta-copy";
import { getDestinationDetailsViewModel } from "@/features/destination-details/lib/destination-details-view-model";
import {
	DestinationDetails2Corridor,
	DestinationDetails2Finale,
	DestinationDetails2Hero,
	DestinationDetails2MotionRoot,
	DestinationDetails2Spectrum,
} from "@/features/destination-details-2/sections";
import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
import type { Destination } from "@/shared/types/domain";
import { EditorialCtaBand } from "@/shared/ui";

export type DestinationDetails2PageProps = {
	destination: Destination;
};

export default function DestinationDetails2Page({ destination }: DestinationDetails2PageProps) {
	const isLoading = useInitialPageLoader();

	const model = getDestinationDetailsViewModel(destination);
	const tourCta = getDestinationDetailsTourCta(destination);

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<div className="relative min-h-screen overflow-x-clip bg-[#020202]">
				<DestinationDetails2MotionRoot>
					<DestinationDetails2Hero model={model} />
					<DestinationDetails2Corridor model={model} />
					<DestinationDetails2Spectrum model={model} />
					<DestinationDetails2Finale model={model} />
				</DestinationDetails2MotionRoot>
				<EditorialCtaBand
					showTopFrame
					headingId={`destination-2-tour-cta-${tourCta.slug}`}
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
