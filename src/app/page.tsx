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
import { BlogCarousel } from "@/components/Blog/BlogCarousel";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

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
			<div
				className={`pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-[#050505] transition-opacity duration-700 ${
					isLoading ? "opacity-100" : "opacity-0"
				} ${isLoading ? "" : "delay-200"}`}
				aria-hidden={!isLoading}
			>
				<div className="pointer-events-auto flex flex-col items-center gap-6">
					<div className="flex items-center gap-2">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500">
							<span className="text-lg font-bold text-white">t</span>
						</div>
						<span className="text-2xl font-semibold tracking-tight text-white">
							talkwer<span className="text-orange-500">.</span>
						</span>
					</div>
					<div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
						<span className="h-px w-10 bg-white/10" />
						<span>Crafting journeys</span>
						<span className="h-px w-10 bg-white/10" />
					</div>
					<div className="relative h-1 w-40 overflow-hidden rounded-full bg-white/10">
						<div className="absolute inset-y-0 left-0 w-1/2 animate-[loaderBar_1.4s_ease-in-out_infinite] rounded-full bg-orange-500" />
					</div>
				</div>
			</div>

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
