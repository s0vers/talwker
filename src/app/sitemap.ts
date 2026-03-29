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
	];
}
