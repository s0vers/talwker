"use client";

import { InitialLoader } from "@/features/home/sections";
import {
	StoriesCTA,
	StoriesHero,
	StoriesIssueGrid,
} from "@/features/stories/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
import type { Story } from "@/shared/types/domain";

export type StoriesPageProps = {
	stories: Story[];
};

export default function StoriesPage({ stories }: StoriesPageProps) {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<StoriesHero runEntrance={!isLoading} />
			<StoriesIssueGrid stories={stories} />
			<StoriesCTA />
		</>
	);
}
