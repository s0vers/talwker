import type { Metadata } from "next";
import HomePage from "@/features/home/home-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Talkwer — Wander. Discover. Share.",
	description:
		"A modern travel platform for the curious soul. Discover destinations, curated tours, and stories from fellow wanderers.",
	path: "/",
	absoluteTitle: true,
});

export default function Page() {
	return <HomePage />;
}