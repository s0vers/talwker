"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Destinations from "@/components/Destinations/Destinations";
import About from "@/components/About";
import FeaturedTours from "@/components/FeaturedTours/FeaturedTours";
import Testimonials from "@/components/Testimonials/Testimonials";
import Newsletter from "@/components/Newsletter/Newsletter";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import InitialLoader from "@/components/InitialLoader";

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Lock scroll while initial loader is visible
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const onReady = () => {
			setIsLoading(false);
			document.body.style.overflow = originalOverflow;
		};

		// Prefer the real load event, but also add a timeout fallback
		if (document.readyState === "complete") {
			const timeout = setTimeout(onReady, 600);
			return () => clearTimeout(timeout);
		}

		const handleLoad = () => onReady();
		window.addEventListener("load", handleLoad);

		const timeout = setTimeout(onReady, 2000);

		return () => {
			window.removeEventListener("load", handleLoad);
			clearTimeout(timeout);
			document.body.style.overflow = originalOverflow;
		};
	}, []);

	return (
		<div className="relative bg-[#050505] text-white">
			{/* Initial loader to avoid double-loading feel and let GSAP settle */}
			<InitialLoader isLoading={isLoading} />

			<Navbar />
			<Hero />
			<Marquee />
			<Destinations />
			<About />
			<FeaturedTours />
			<Testimonials />
			<Newsletter />
			<CTA />
			<Footer />
		</div>
	);
}
