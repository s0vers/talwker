import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findDestinationBySlug } from "@/features/destinations/lib/destination-slug";
import { DESTINATIONS } from "@/features/home/content/destinations";
import { TOURS } from "@/features/home/content/tours";
import { STORIES } from "@/features/stories/content/stories";
import { findStoryBySlug, getStorySlug } from "@/features/stories/lib/story-slug";
import StoryDetailsPage from "@/features/stories/story-details-page";
import { getTourSlug } from "@/features/tours/lib/tour-slug";
import {
	createPageMetadata,
	getArticleJsonLd,
	getBreadcrumbJsonLd,
} from "@/lib/seo";

type PageProps = {
	params: Promise<{ slug: string }>;
};

function toImagePath(path: string): `/${string}` {
	return (path.startsWith("/") ? path : `/${path}`) as `/${string}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const story = findStoryBySlug(STORIES, slug);

	if (!story) {
		return createPageMetadata({
			title: "Story not found",
			description: "The story you requested could not be found.",
			path: `/stories/${slug}`,
		});
	}

	return createPageMetadata({
		title: story.title,
		description: story.dek,
		path: `/stories/${getStorySlug(story)}`,
		imagePath: toImagePath(story.heroImage),
		type: "article",
		keywords: [
			story.title,
			story.location,
			story.author,
			"Talkwer stories",
			"travel essay",
		],
	});
}

export function generateStaticParams() {
	return STORIES.map((story) => ({
		slug: getStorySlug(story),
	}));
}

export default async function Page({ params }: PageProps) {
	const { slug } = await params;
	const story = findStoryBySlug(STORIES, slug);

	if (!story) {
		notFound();
	}

	const storySlug = getStorySlug(story);
	const destination = story.relatedDestinationSlug
		? findDestinationBySlug(DESTINATIONS, story.relatedDestinationSlug)
		: undefined;
	const tour = story.relatedTourId
		? TOURS.find((entry) => entry.id === story.relatedTourId)
		: undefined;
	const tourSlug = tour ? getTourSlug(tour) : undefined;

	const breadcrumbJsonLd = getBreadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: "Stories", path: "/stories" },
		{ name: story.title, path: `/stories/${storySlug}` },
	]);

	const articleJsonLd = getArticleJsonLd({
		headline: story.title,
		description: story.dek,
		path: `/stories/${storySlug}`,
		imagePath: toImagePath(story.heroImage),
		datePublished: "2026-04-01",
		authorName: story.author,
	});

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
			/>
			<StoryDetailsPage
				story={story}
				destination={destination}
				destinationSlug={story.relatedDestinationSlug}
				tour={tour}
				tourSlug={tourSlug}
			/>
		</>
	);
}
