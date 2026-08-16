import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import HomePage from "@/features/home/home-page";
import { createPageMetadata } from "@/lib/seo";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	return createPageMetadata({
		title: "Talkwer — Wander. Discover. Share.",
		description:
			"A modern travel platform for the curious soul. Discover destinations, curated tours, and stories from fellow wanderers.",
		path: "/",
		absoluteTitle: true,
		locale,
	});
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	return <HomePage />;
}
