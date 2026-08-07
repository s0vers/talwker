"use client";

import { InitialLoader } from "@/features/home/sections";
import {
	StoryDetailsBody,
	StoryDetailsHero,
	StoryDetailsRelated,
} from "@/features/stories/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
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
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<div className="relative min-h-screen overflow-hidden bg-[#050505]">
				<StoryDetailsHero story={story} runEntrance={!isLoading} />
				<StoryDetailsBody story={story} />
				<StoryDetailsRelated
					destination={destination}
					destinationSlug={destinationSlug}
					tour={tour}
					tourSlug={tourSlug}
				/>
			</div>
		</>
	);
}
