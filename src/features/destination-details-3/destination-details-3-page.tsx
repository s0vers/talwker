"use client";

import { getDestinationDetails3TourCta } from "@/features/destination-details-3/content/destination-details-3-cta-copy";
import { getDestinationDetails3ViewModel } from "@/features/destination-details-3/lib/details-3-view-model";
import {
	DestinationDetails3Cadence,
	DestinationDetails3Close,
	DestinationDetails3Counterpoint,
	DestinationDetails3Culture,
	DestinationDetails3Hero,
	DestinationDetails3Ledger,
	DestinationDetails3MotionRoot,
	DestinationDetails3People,
	DestinationDetails3Places,
} from "@/features/destination-details-3/sections";
import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
import type { Destination } from "@/shared/types/domain";
import { EditorialCtaBand } from "@/shared/ui";

export type DestinationDetails3PageProps = {
	destination: Destination;
};

export default function DestinationDetails3Page({ destination }: DestinationDetails3PageProps) {
	const isLoading = useInitialPageLoader();

	const model = getDestinationDetails3ViewModel(destination);
	const tourCta = getDestinationDetails3TourCta(destination);

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<div className="relative min-h-screen overflow-x-clip bg-[#020202]">
				<DestinationDetails3MotionRoot>
					<DestinationDetails3Hero model={model} />
					<DestinationDetails3People model={model} />
					<DestinationDetails3Culture model={model} />
					<DestinationDetails3Cadence model={model} />
					<DestinationDetails3Places model={model} />
					<DestinationDetails3Counterpoint model={model} />
					<DestinationDetails3Ledger model={model} />
					<DestinationDetails3Close model={model} />
				</DestinationDetails3MotionRoot>
				<EditorialCtaBand
					showTopFrame
					headingId={`destination-3-tour-cta-${tourCta.slug}`}
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
