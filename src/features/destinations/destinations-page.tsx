"use client";

import { useEffect, useState } from "react";
import { Navbar, Footer, InitialLoader } from "@/features/home/sections";
import { SKIP_TO_MAIN_LABEL } from "@/features/home/content/section-copy";
import { DestinationsGrid, DestinationsHero } from "@/features/destinations/sections";

export default function DestinationsPage() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const mountedAt = Date.now();
		const MIN_LOADER_MS = 200;

		const clearLoading = () => {
			setIsLoading(false);
			document.body.style.overflow = originalOverflow;
		};

		const onReady = () => {
			const elapsed = Date.now() - mountedAt;
			const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
			if (remaining === 0) {
				clearLoading();
				return;
			}
			window.setTimeout(clearLoading, remaining);
		};

		if (document.readyState === "complete") {
			const timeout = setTimeout(onReady, 0);
			return () => clearTimeout(timeout);
		}

		const handleLoad = () => onReady();
		window.addEventListener("load", handleLoad);
		const timeout = setTimeout(onReady, 1200);

		return () => {
			window.removeEventListener("load", handleLoad);
			clearTimeout(timeout);
			document.body.style.overflow = originalOverflow;
		};
	}, []);

	return (
		<div className="relative bg-[#050505] text-white">
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:rounded-md focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
			>
				{SKIP_TO_MAIN_LABEL}
			</a>

			<InitialLoader isLoading={isLoading} />

			<Navbar />
			<main id="main-content">
				<DestinationsHero />
				<DestinationsGrid />
			</main>
			<Footer />
		</div>
	);
}
