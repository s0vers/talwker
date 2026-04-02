"use client";

import { useEffect, useState } from "react";
import { getDestinationDetails3TourCta } from "@/features/destination-details-3/content/destination-details-3-cta-copy";
import { getDestinationDetails3ViewModel } from "@/features/destination-details-3/lib/details-3-view-model";
import {
	D3Cadence,
	D3Close,
	D3Counterpoint,
	D3Culture,
	D3Hero,
	D3Ledger,
	D3MotionRoot,
	D3People,
	D3Places,
} from "@/features/destination-details-3/sections";
import { InitialLoader } from "@/features/home/sections";
import type { Destination } from "@/shared/types/domain";
import { EditorialCtaBand } from "@/shared/ui";

export type DestinationDetails3PageProps = {
	destination: Destination;
};

export default function DestinationDetails3Page({ destination }: DestinationDetails3PageProps) {
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

	const model = getDestinationDetails3ViewModel(destination);
	const tourCta = getDestinationDetails3TourCta(destination);

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<div className="relative min-h-screen overflow-hidden bg-[#020202]">
				<D3MotionRoot>
					<D3Hero model={model} />
					<D3People model={model} />
					<D3Culture model={model} />
					<D3Cadence model={model} />
					<D3Places model={model} />
					<D3Counterpoint model={model} />
					<D3Ledger model={model} />
					<D3Close model={model} />
				</D3MotionRoot>
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
