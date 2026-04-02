"use client";

import { useEffect, useState } from "react";
import { getDestinationDetailsTourCta } from "@/features/destination-details/content/destination-details-cta-copy";
import { getDestinationDetailsViewModel } from "@/features/destination-details/lib/destination-details-view-model";
import {
	DestinationDetailsCoastalLayout,
	DestinationDetailsMountainLayout,
	DestinationDetailsSectionsMotion,
} from "@/features/destination-details/sections";
import { InitialLoader } from "@/features/home/sections";
import type { Destination } from "@/shared/types/domain";
import { EditorialCtaBand } from "@/shared/ui";

export type DestinationDetailsPageProps = {
	destination: Destination;
};

export default function DestinationDetailsPage({ destination }: DestinationDetailsPageProps) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const mountedAt = Date.now();
		const MIN_LOADER_MS = 200;

		const clearLoading = () => {
			setIsLoading(false);
			document.body.style.overflow = originalOverflow;
		};

		const onReady = () => {
			const elapsed = Date.now() - mountedAt;
			const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
			if (remaining === 0) {
				clearLoading();
				return;
			}
			window.setTimeout(clearLoading, remaining);
		};

		if (document.readyState === "complete") {
			const timeout = setTimeout(onReady, 0);
			return () => clearTimeout(timeout);
		}

		const handleLoad = () => onReady();
		window.addEventListener("load", handleLoad);
		const timeout = setTimeout(onReady, 1200);

		return () => {
			window.removeEventListener("load", handleLoad);
			clearTimeout(timeout);
			document.body.style.overflow = originalOverflow;
		};
	}, []);

	const model = getDestinationDetailsViewModel(destination);
	const tourCta = getDestinationDetailsTourCta(destination);
	const NarrativeLayout =
		model.variant === "mountain" ? DestinationDetailsMountainLayout : DestinationDetailsCoastalLayout;

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<div className="relative min-h-screen overflow-hidden">
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
