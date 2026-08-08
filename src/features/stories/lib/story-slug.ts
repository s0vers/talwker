import type { Story } from "@/shared/types/domain";

export function getStorySlug(story: Story): string {
	return story.slug;
}

export function findStoryBySlug(
	stories: Story[],
	slug: string,
): Story | undefined {
	const normalized = slug.trim().toLowerCase();
	return stories.find((story) => story.slug.toLowerCase() === normalized);
}
