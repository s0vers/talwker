import type { MetadataRoute } from "next";
import { DESTINATIONS } from "@/features/home/content/destinations";
import { TOURS } from "@/features/home/content/tours";
import { STORIES } from "@/features/stories/content/stories";
import { destinationToSlug } from "@/features/destinations/lib/destination-slug";
import { getStorySlug } from "@/features/stories/lib/story-slug";
import { getTourSlug } from "@/features/tours/lib/tour-slug";
import { resolveCanonicalUrl } from "@/lib/seo";

function createEntry(
	path: string,
	changeFrequency: "weekly" | "monthly" | "yearly",
	priority: number,
): MetadataRoute.Sitemap[number] {
	const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
	return {
		url: resolveCanonicalUrl(path),
		changeFrequency,
		priority,
		alternates: {
			languages: {
				en: resolveCanonicalUrl(clean || "/"),
				es: resolveCanonicalUrl(`/es${clean}`),
				ja: resolveCanonicalUrl(`/ja${clean}`),
			},
		},
	};
}

export default function sitemap(): MetadataRoute.Sitemap {
	const staticRoutes: Array<{ path: string; freq: "weekly" | "monthly" | "yearly"; prio: number }> = [
		{ path: "/", freq: "weekly", prio: 1.0 },
		{ path: "/home-2", freq: "weekly", prio: 0.95 },
		{ path: "/home-3", freq: "weekly", prio: 0.95 },
		{ path: "/about", freq: "monthly", prio: 0.8 },
		{ path: "/contact", freq: "yearly", prio: 0.55 },
		{ path: "/destinations", freq: "weekly", prio: 0.85 },
		{ path: "/destinations-2", freq: "weekly", prio: 0.75 },
		{ path: "/destinations-3", freq: "weekly", prio: 0.72 },
		{ path: "/tours", freq: "weekly", prio: 0.8 },
		{ path: "/stories", freq: "weekly", prio: 0.75 },
		{ path: "/experiences", freq: "weekly", prio: 0.78 },
		{ path: "/careers", freq: "monthly", prio: 0.5 },
		{ path: "/press", freq: "monthly", prio: 0.5 },
		{ path: "/partners", freq: "monthly", prio: 0.5 },
		{ path: "/faq", freq: "monthly", prio: 0.55 },
		{ path: "/booking-policy", freq: "yearly", prio: 0.4 },
		{ path: "/cancellation", freq: "yearly", prio: 0.4 },
		{ path: "/privacy", freq: "yearly", prio: 0.4 },
		{ path: "/terms", freq: "yearly", prio: 0.4 },
		{ path: "/cookies", freq: "yearly", prio: 0.4 },
	];

	return [
		...staticRoutes.map((r) => createEntry(r.path, r.freq, r.prio)),
		...DESTINATIONS.map((d) =>
			createEntry(`/destinations/${destinationToSlug(d)}`, "weekly", 0.75),
		),
		...TOURS.map((t) =>
			createEntry(`/tours/${getTourSlug(t)}`, "monthly", 0.7),
		),
		...STORIES.map((s) =>
			createEntry(`/stories/${getStorySlug(s)}`, "monthly", 0.65),
		),
	];
}
