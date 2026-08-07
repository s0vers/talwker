"use client";

import { useRef } from "react";
import { TOURS_PAGE_HERO } from "@/features/tours/content/tours-page-copy";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";

type ToursHeroProps = {
	destinationFilter?: string;
};

export default function ToursHero({ destinationFilter }: ToursHeroProps) {
	const sectionRef = useRef<HTMLElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const nodes = sectionRef.current?.querySelectorAll("[data-hero-item]");
			if (!nodes?.length) return;
			gsap.from(nodes, {
				y: 28,
				opacity: 0,
				duration: 0.85,
				stagger: 0.08,
				ease: "power3.out",
			});
		},
		[destinationFilter],
	);

	return (
		<section
			ref={sectionRef}
			aria-labelledby="tours-page-title"
			className="relative overflow-hidden border-t border-white/10 bg-[#050505] text-white"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_15%_-10%,rgba(249,115,22,0.08),transparent_55%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage:
						"linear-gradient(to right, rgba(255,255,255,0.9) 1px, transparent 1px)",
					backgroundSize: "80px 100%",
				}}
				aria-hidden
			/>

			<div className="relative mx-auto max-w-[1600px] pad-x pb-16 pt-28 md:pb-24 md:pt-36">
				<p
					data-hero-item
					className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500"
				>
					{TOURS_PAGE_HERO.kicker}
				</p>
				<h1
					data-hero-item
					id="tours-page-title"
					className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl"
				>
					{TOURS_PAGE_HERO.title}
				</h1>
				<p
					data-hero-item
					className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg"
				>
					{TOURS_PAGE_HERO.description}
				</p>

				{destinationFilter ? (
					<div
						data-hero-item
						className="mt-10 inline-flex flex-col gap-2 border border-white/15 bg-[#0a0a0a] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70"
					>
						<span className="text-orange-500/90">{TOURS_PAGE_HERO.filterStampLabel}</span>
						<span className="text-white/85">{destinationFilter}</span>
					</div>
				) : null}
			</div>
		</section>
	);
}
