"use client";

import {
	StoriesCTA,
	StoriesHero,
	StoriesIssueGrid,
} from "@/features/stories/sections";
import type { Story } from "@/shared/types/domain";

export type StoriesPageProps = {
	stories: Story[];
};

export default function StoriesPage({ stories }: StoriesPageProps) {

	return (
		<>
			<StoriesHero runEntrance={true} />
			<StoriesIssueGrid stories={stories} />
			<StoriesCTA />
		</>
	);
}
