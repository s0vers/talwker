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
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_10%_-5%,rgba(249,115,22,0.07),transparent_55%)]"
				aria-hidden
			/>

			<div className="relative mx-auto max-w-[1600px] pad-x pb-14 pt-28 md:pb-20 md:pt-36">
				<p
					data-hero-item
					className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-500"
				>
					{TOURS_PAGE_HERO.kicker}
				</p>
				<h1
					data-hero-item
					id="tours-page-title"
					className="mt-5 max-w-3xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold tracking-tight text-white"
				>
					{TOURS_PAGE_HERO.title}
				</h1>
				<p
					data-hero-item
					className="mt-5 max-w-xl text-base leading-relaxed text-white/55 md:text-lg"
				>
					{TOURS_PAGE_HERO.description}
				</p>

				{destinationFilter ? (
					<p
						data-hero-item
						className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45"
					>
						<span className="text-white/30">{TOURS_PAGE_HERO.filterLabel}</span>{" "}
						<span className="text-white/80">{destinationFilter}</span>
					</p>
				) : null}
			</div>
		</section>
	);
}
