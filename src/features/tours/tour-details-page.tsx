"use client";

import { useEffect, useState } from "react";
import { InitialLoader } from "@/features/home/sections";
import {
	TourDetailsHero,
	TourDetailsIncludes,
	TourDetailsItinerary,
	TourDetailsMotionRoot,
	TourDetailsRail,
} from "@/features/tours/sections";
import type { Tour } from "@/shared/types/domain";

export type TourDetailsPageProps = {
	tour: Tour;
};

export default function TourDetailsPage({ tour }: TourDetailsPageProps) {
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

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<div className="relative min-h-screen overflow-x-hidden bg-[#050505]">
				<TourDetailsMotionRoot tourSlug={tour.slug}>
					<TourDetailsHero tour={tour} />
					<div className="relative lg:grid lg:grid-cols-[12rem_minmax(0,1fr)]">
						<TourDetailsRail tour={tour} />
						<div>
							<TourDetailsItinerary tour={tour} />
							<TourDetailsIncludes tour={tour} />
						</div>
					</div>
				</TourDetailsMotionRoot>
			</div>
		</>
	);
}
