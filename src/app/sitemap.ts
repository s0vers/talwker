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
	];
}
