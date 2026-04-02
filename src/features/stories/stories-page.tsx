"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { InitialLoader } from "@/features/home/sections";
import { STORIES_PAGE_COPY } from "@/features/stories/content/stories-page-copy";

export default function StoriesPage() {
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
		<>
			<InitialLoader isLoading={isLoading} />
			<section
				aria-labelledby="stories-page-title"
				className="border-t border-white/10 bg-[#070707] pad-x py-28 md:py-36"
			>
				<div className="mx-auto max-w-[1600px]">
					<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500">
						{STORIES_PAGE_COPY.kicker}
					</p>
					<h1
						id="stories-page-title"
						className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl"
					>
						{STORIES_PAGE_COPY.title}
					</h1>
					<p className="mt-6 max-w-2xl text-base text-white/55 md:text-lg">
						{STORIES_PAGE_COPY.description}
					</p>
					<Link
						href={STORIES_PAGE_COPY.homeAnchorHref}
						className="mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-400 transition-colors hover:text-orange-300"
					>
						{STORIES_PAGE_COPY.homeAnchorLabel}
						<span aria-hidden>→</span>
					</Link>
				</div>
			</section>
		</>
	);
}
