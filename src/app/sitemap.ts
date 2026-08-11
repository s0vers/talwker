import type { MetadataRoute } from "next";
import { TOURS } from "@/features/home/content/tours";
import { STORIES } from "@/features/stories/content/stories";
import { resolveCanonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: resolveCanonicalUrl("/"),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: resolveCanonicalUrl("/about"),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: resolveCanonicalUrl("/contact"),
			changeFrequency: "yearly",
			priority: 0.55,
		},
		{
			url: resolveCanonicalUrl("/destinations"),
			changeFrequency: "weekly",
			priority: 0.85,
		},
		{
			url: resolveCanonicalUrl("/destinations-2"),
			changeFrequency: "weekly",
			priority: 0.75,
		},
		{
			url: resolveCanonicalUrl("/destinations-3"),
			changeFrequency: "weekly",
			priority: 0.72,
		},
		{
			url: resolveCanonicalUrl("/tours"),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		...TOURS.map((tour) => ({
			url: resolveCanonicalUrl(`/tours/${tour.slug}`),
			changeFrequency: "monthly" as const,
			priority: 0.7,
		})),
		{
			url: resolveCanonicalUrl("/booking"),
			changeFrequency: "monthly",
			priority: 0.55,
		},
		{
			url: resolveCanonicalUrl("/checkout"),
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: resolveCanonicalUrl("/checkout/success"),
			changeFrequency: "yearly",
			priority: 0.2,
		},
		{
			url: resolveCanonicalUrl("/login"),
			changeFrequency: "yearly",
			priority: 0.4,
		},
		{
			url: resolveCanonicalUrl("/register"),
			changeFrequency: "yearly",
			priority: 0.4,
		},
		{
			url: resolveCanonicalUrl("/stories"),
			changeFrequency: "weekly",
			priority: 0.75,
		},
		...STORIES.map((story) => ({
			url: resolveCanonicalUrl(`/stories/${story.slug}`),
			changeFrequency: "monthly" as const,
			priority: 0.65,
		})),
		{
			url: resolveCanonicalUrl("/experiences"),
			changeFrequency: "weekly",
			priority: 0.78,
		},
		{
			url: resolveCanonicalUrl("/careers"),
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: resolveCanonicalUrl("/press"),
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: resolveCanonicalUrl("/partners"),
			changeFrequency: "monthly",
			priority: 0.5,
		},
		{
			url: resolveCanonicalUrl("/faq"),
			changeFrequency: "monthly",
			priority: 0.55,
		},
		{
			url: resolveCanonicalUrl("/booking-policy"),
			changeFrequency: "yearly",
			priority: 0.4,
		},
		{
			url: resolveCanonicalUrl("/cancellation"),
			changeFrequency: "yearly",
			priority: 0.4,
		},
		{
			url: resolveCanonicalUrl("/privacy"),
			changeFrequency: "yearly",
			priority: 0.4,
		},
		{
			url: resolveCanonicalUrl("/terms"),
			changeFrequency: "yearly",
			priority: 0.4,
		},
		{
			url: resolveCanonicalUrl("/cookies"),
			changeFrequency: "yearly",
			priority: 0.4,
		},
	];
}

