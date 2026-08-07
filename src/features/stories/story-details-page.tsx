"use client";

import { useEffect, useState } from "react";
import { InitialLoader } from "@/features/home/sections";
import {
	StoryDetailsBody,
	StoryDetailsHero,
	StoryDetailsRelated,
} from "@/features/stories/sections";
import type { Destination, Story, Tour } from "@/shared/types/domain";

export type StoryDetailsPageProps = {
	story: Story;
	destination?: Destination;
	destinationSlug?: string;
	tour?: Tour;
	tourSlug?: string;
};

export default function StoryDetailsPage({
	story,
	destination,
	destinationSlug,
	tour,
	tourSlug,
}: StoryDetailsPageProps) {
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
			<div className="relative min-h-screen overflow-hidden bg-[#050505]">
				<StoryDetailsHero story={story} />
				<StoryDetailsBody story={story} />
				<StoryDetailsRelated
					story={story}
					destination={destination}
					destinationSlug={destinationSlug}
					tour={tour}
					tourSlug={tourSlug}
				/>
			</div>
		</>
	);
}
