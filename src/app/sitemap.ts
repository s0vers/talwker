import type { MetadataRoute } from "next";
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
		{
			url: resolveCanonicalUrl("/stories"),
			changeFrequency: "weekly",
			priority: 0.75,
		},
	];
}
