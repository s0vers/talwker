"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import type { Story } from "@/shared/types/domain";

type StoryDetailsHeroProps = {
	story: Story;
	runEntrance?: boolean;
};

export default function StoryDetailsHero({
	story,
	runEntrance = true,
}: StoryDetailsHeroProps) {
	const t = useTranslations("StoryDetails");
	const sectionRef = useRef<HTMLElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (!runEntrance) return;
			if (prefersReducedMotion()) return;
			const root = sectionRef.current;
			if (!root) return;

			const nodes = root.querySelectorAll("[data-st-opener]");
			if (!nodes.length) return;

			gsap.from(nodes, {
				y: 36,
				opacity: 0,
				duration: 0.95,
				stagger: 0.09,
				ease: "power3.out",
				delay: 0.08,
			});
		},
		[runEntrance, story.slug],
	);

	return (
		<section
			ref={sectionRef}
			aria-labelledby="story-details-title"
			className="relative min-h-[78svh] overflow-hidden border-b border-white/10 bg-[#050505] text-white"
		>
			<div className="absolute inset-0">
				<Image
					src={story.heroImage}
					alt={story.title}
					fill
					priority
					sizes="100vw"
					className="object-cover"
				/>
				<div
					className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/30"
					aria-hidden
				/>
				<div
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_40%_at_15%_100%,rgba(249,115,22,0.12),transparent_55%)]"
					aria-hidden
				/>
			</div>

			<div className="relative mx-auto flex min-h-[78svh] max-w-[1600px] flex-col justify-end pad-x pb-14 pt-32 md:pb-20 md:pt-40">
				<Link
					data-st-opener
					href="/stories"
					className="inline-flex w-fit items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-orange-400"
				>
					<span aria-hidden>←</span>
					{t("backToIndex")}
				</Link>

				<p
					data-st-opener
					className="mt-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500"
				>
					{story.location}
				</p>

				<h1
					data-st-opener
					id="story-details-title"
					className="mt-4 max-w-4xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-white"
				>
					{story.title}
				</h1>

				<p
					data-st-opener
					className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg"
				>
					{story.dek}
				</p>

				<p
					data-st-opener
					className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 md:text-xs"
				>
					<span>
						{t("bylinePrefix")} {story.author}
					</span>
					<span className="text-white/20" aria-hidden>
						|
					</span>
					<span>
						{story.readMinutes} {t("minutesSuffix")}
					</span>
				</p>
			</div>
		</section>
	);
}
