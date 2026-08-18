import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { findDestinationBySlug } from "@/features/destinations/lib/destination-slug";
import { DESTINATIONS } from "@/features/home/content/destinations";
import { TOURS } from "@/features/home/content/tours";
import { STORIES } from "@/features/stories/content/stories";
import { findStoryBySlug, getStorySlug } from "@/features/stories/lib/story-slug";
import { getLocalizedStory } from "@/features/stories/lib/localized-stories";
import StoryDetailsPage from "@/features/stories/story-details-page";
import { getTourSlug } from "@/features/tours/lib/tour-slug";
import {
	createPageMetadata,
	getArticleJsonLd,
	getBreadcrumbJsonLd,
} from "@/lib/seo";

type PageProps = {
	params: Promise<{ locale: string; slug: string }>;
};

function toImagePath(path: string): `/${string}` {
	return (path.startsWith("/") ? path : `/${path}`) as `/${string}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { locale, slug } = await params;
	const rawStory = findStoryBySlug(STORIES, slug);

	if (!rawStory) {
		const notFoundTitles: Record<string, string> = {
			en: "Story not found",
			es: "Historia no encontrada",
			ja: "記事が見つかりません",
		};
		return createPageMetadata({
			title: notFoundTitles[locale] ?? notFoundTitles.en,
			description: "The story you requested could not be found.",
			path: `/stories/${slug}`,
			locale,
		});
	}

	const story = getLocalizedStory(rawStory, locale);

	return createPageMetadata({
		title: story.title,
		description: story.dek,
		path: `/stories/${getStorySlug(story)}`,
		locale,
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
	return routing.locales.flatMap((locale) =>
		STORIES.map((story) => ({
			locale,
			slug: getStorySlug(story),
		})),
	);
}

export default async function Page({ params }: PageProps) {
	const { locale, slug } = await params;
	setRequestLocale(locale);

	const rawStory = findStoryBySlug(STORIES, slug);
	if (!rawStory) {
		notFound();
	}

	const story = getLocalizedStory(rawStory, locale);
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
