import type { MetadataRoute } from "next";
import { SEO_DEFAULTS } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: `${SEO_DEFAULTS.siteUrl}/sitemap.xml`,
		host: SEO_DEFAULTS.siteUrl,
	};
}
