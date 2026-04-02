"use client";

import { useEffect, useState } from "react";
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
import type { Destination } from "@/shared/types/domain";
import { EditorialCtaBand } from "@/shared/ui";

export type DestinationDetails2PageProps = {
	destination: Destination;
};

export default function DestinationDetails2Page({ destination }: DestinationDetails2PageProps) {
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

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<div className="relative min-h-screen overflow-hidden bg-[#020202]">
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
