"use client";

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

	return (
		<>
			<div className="relative min-h-screen overflow-hidden bg-[#050505]">
				<StoryDetailsHero story={story} runEntrance={true} />
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
