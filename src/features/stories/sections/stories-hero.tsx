"use client";

import { useRef } from "react";
import { STORIES_PAGE_COPY } from "@/features/stories/content/stories-page-copy";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";

export default function StoriesHero() {
	const sectionRef = useRef<HTMLElement>(null);

	useGsapContext(sectionRef, () => {
		if (prefersReducedMotion()) return;
		const nodes = sectionRef.current?.querySelectorAll("[data-st-hero]");
		if (!nodes?.length) return;
		gsap.from(nodes, {
			y: 28,
			opacity: 0,
			duration: 0.85,
			stagger: 0.08,
			ease: "power3.out",
		});
	}, []);

	return (
		<section
			ref={sectionRef}
			aria-labelledby="stories-page-title"
			className="relative overflow-hidden border-t border-white/10 bg-[#050505] text-white"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_85%_-15%,rgba(249,115,22,0.09),transparent_55%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.035]"
				style={{
					backgroundImage:
						"linear-gradient(to right, rgba(255,255,255,0.9) 1px, transparent 1px)",
					backgroundSize: "72px 100%",
				}}
				aria-hidden
			/>

			<div className="relative mx-auto max-w-[1600px] pad-x pb-14 pt-28 md:pb-20 md:pt-36">
				<p
					data-st-hero
					className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500"
				>
					{STORIES_PAGE_COPY.kicker}
				</p>
				<h1
					data-st-hero
					id="stories-page-title"
					className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl"
				>
					{STORIES_PAGE_COPY.title}
				</h1>
				<p
					data-st-hero
					className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg"
				>
					{STORIES_PAGE_COPY.description}
				</p>
			</div>
		</section>
	);
}
