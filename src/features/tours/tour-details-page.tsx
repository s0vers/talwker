"use client";

import { useEffect, useState } from "react";
import { InitialLoader } from "@/features/home/sections";
import {
	TourDetailsDays,
	TourDetailsHero,
	TourDetailsMobileBar,
	TourDetailsSheet,
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
			<div className="relative min-h-screen bg-[#050505] pb-24 lg:pb-0">
				<TourDetailsHero tour={tour} />
				<div className="mx-auto grid max-w-[1600px] gap-10 pad-x py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-12 xl:grid-cols-[minmax(0,1fr)_22rem]">
					<TourDetailsDays tour={tour} />
					<TourDetailsSheet tour={tour} />
				</div>
				<TourDetailsMobileBar tour={tour} />
			</div>
		</>
	);
}
