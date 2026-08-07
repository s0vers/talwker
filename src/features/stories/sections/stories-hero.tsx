"use client";

import { useRef } from "react";
import { STORIES_PAGE_HERO } from "@/features/stories/content/stories-page-copy";
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
			className="relative overflow-hidden bg-[#050505] text-white"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_85%_-10%,rgba(249,115,22,0.1),transparent_55%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage:
						"linear-gradient(to bottom, rgba(255,255,255,0.9) 1px, transparent 1px)",
					backgroundSize: "100% 48px",
				}}
				aria-hidden
			/>

			<div className="relative z-10 mx-auto max-w-[1600px] pad-x pb-16 pt-28 md:pb-24 md:pt-36">
				<div data-st-hero className="flex items-center gap-4 md:gap-6">
					<p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
						{STORIES_PAGE_HERO.kicker}
					</p>
					<span className="h-px flex-1 bg-white/10" aria-hidden />
				</div>

				<h1
					id="stories-page-title"
					className="mt-8 m-0 text-[clamp(2.75rem,10vw,6.5rem)] font-bold leading-[0.88] tracking-tighter md:mt-12"
				>
					<span data-st-hero className="block text-white">
						{STORIES_PAGE_HERO.titleLine1}
					</span>
					<span
						data-st-hero
						className="mt-1 block font-light italic text-orange-500"
					>
						{STORIES_PAGE_HERO.titleAccent}
					</span>
				</h1>

				<div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end md:gap-12">
					<p
						data-st-hero
						className="max-w-xl text-sm leading-relaxed text-white/55 md:col-span-7 md:text-base"
					>
						{STORIES_PAGE_HERO.description}
					</p>
					<div
						data-st-hero
						className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/25 md:col-span-5 md:justify-end"
					>
						<span
							className="h-10 w-px bg-linear-to-b from-orange-500/45 to-transparent md:hidden"
							aria-hidden
						/>
						<span>{STORIES_PAGE_HERO.scrollCue}</span>
					</div>
				</div>
			</div>
		</section>
	);
}
