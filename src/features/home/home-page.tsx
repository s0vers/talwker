"use client";

import {
	About,
	CTA,
	Destinations,
	FeaturedTours,
	Hero,
	InitialLoader,
	Marquee,
	Newsletter,
	Testimonials,
} from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";

export default function HomePage() {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<Hero />
			<Marquee />
			<Destinations />
			<About />
			<FeaturedTours />
			<Testimonials />
			<Newsletter />
			<CTA />
		</>
	);
}
