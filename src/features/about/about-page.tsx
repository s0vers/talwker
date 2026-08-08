"use client";

import { AboutHero, AboutPhilosophy, AboutStory, AboutValues } from "@/features/about/sections";
import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
import { EditorialCtaBand } from "@/shared/ui";

export default function AboutPage() {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<div className="relative min-h-screen overflow-x-clip bg-[#050505]">
				<AboutHero />
				<AboutStory />
				<AboutPhilosophy />
				<AboutValues />
				<EditorialCtaBand
					showTopFrame
					headingId="about-footer-cta"
					label="Join the Journey"
					titleLead="Ready to Experience"
					titleAccent="Unrushed Travel?"
					description="Explore signature group itineraries or custom private journeys designed with local depth."
					primary={{
						label: "Browse Destinations",
						href: "/destinations",
					}}
					secondary={{
						label: "Read Stories",
						href: "/stories",
					}}
				/>
			</div>
		</>
	);
}
