"use client";

import { useRef } from "react";
import { STORIES_PAGE_HERO } from "@/features/stories/content/stories-page-copy";
import { useStoriesHeroEntrance } from "./stories-hero-gsap";

type StoriesHeroProps = {
	runEntrance?: boolean;
};

export default function StoriesHero({ runEntrance = true }: StoriesHeroProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const glowRef = useRef<HTMLDivElement>(null);
	const kickerRef = useRef<HTMLParagraphElement>(null);
	const ruleRef = useRef<HTMLSpanElement>(null);
	const title1Ref = useRef<HTMLDivElement>(null);
	const title2Ref = useRef<HTMLDivElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);

	useStoriesHeroEntrance(
		{
			section: sectionRef,
			glowRef,
			kickerRef,
			ruleRef,
			title1Ref,
			title2Ref,
			descRef,
		},
		runEntrance,
	);

	return (
		<section
			ref={sectionRef}
			aria-labelledby="stories-page-title"
			className="relative overflow-hidden bg-[#050505] text-white"
		>
			<div
				ref={glowRef}
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
				<div className="flex items-center gap-4 md:gap-6">
					<p
						ref={kickerRef}
						className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500"
					>
						{STORIES_PAGE_HERO.kicker}
					</p>
					<span
						ref={ruleRef}
						className="h-px flex-1 origin-left bg-white/10"
						aria-hidden
					/>
				</div>

				<h1
					id="stories-page-title"
					className="mt-8 m-0 text-[clamp(2.75rem,10vw,6.5rem)] font-bold leading-[0.88] tracking-tighter md:mt-12"
				>
					<span className="block overflow-hidden">
						<span
							ref={title1Ref}
							className="block text-white"
						>
							{STORIES_PAGE_HERO.titleLine1}
						</span>
					</span>
					<span className="mt-1 block overflow-hidden">
						<span
							ref={title2Ref}
							className="block font-light italic text-orange-500"
						>
							{STORIES_PAGE_HERO.titleAccent}
						</span>
					</span>
				</h1>

				<p
					ref={descRef}
					className="mt-10 max-w-xl text-sm leading-relaxed text-white/55 md:mt-14 md:text-base"
				>
					{STORIES_PAGE_HERO.description}
				</p>
			</div>
		</section>
	);
}
