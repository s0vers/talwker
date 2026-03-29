import type { MetadataRoute } from "next";
import { resolveCanonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: resolveCanonicalUrl("/"),
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: resolveCanonicalUrl("/about"),
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
	];
}
