"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { EXPERIENCES_HERO, EXPERIENCE_CATEGORIES, type ExperienceCategory } from "../content/experiences-page-copy";
import { cn } from "@/lib/utils";

export type ExperiencesHeroProps = {
	activeCategory: ExperienceCategory;
	onCategoryChange: (category: ExperienceCategory) => void;
};

export function ExperiencesHero({ activeCategory, onCategoryChange }: ExperiencesHeroProps) {
	const containerRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		containerRef,
		() => {
			if (prefersReducedMotion() || !contentRef.current) return;
			gsap.from(contentRef.current.children, {
				y: 40,
				opacity: 0,
				duration: 0.9,
				stagger: 0.12,
				ease: "power3.out",
			});
		},
		[],
	);

	return (
		<section
			ref={containerRef}
			className="relative min-h-[55vh] flex items-center bg-[#050505] text-white pt-28 pb-16 pad-x overflow-hidden border-b border-white/6"
		>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
					backgroundSize: "30px 30px",
				}}
			/>
			<div ref={contentRef} className="relative mx-auto max-w-[1600px] w-full">
				<p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
					{EXPERIENCES_HERO.eyebrow}
				</p>
				<h1 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-white">
					{EXPERIENCES_HERO.title}
				</h1>
				<p className="mt-6 text-base sm:text-lg text-white/60 leading-relaxed">
					{EXPERIENCES_HERO.description}
				</p>
				<div className="mt-8 flex flex-wrap gap-4 items-center">
					<Link
						href={EXPERIENCES_HERO.primaryHref}
						className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/20"
					>
						{EXPERIENCES_HERO.primaryAction} →
					</Link>
					<Link
						href={EXPERIENCES_HERO.secondaryHref}
						className="inline-flex items-center rounded-full border border-white/15 px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white/70 transition-all hover:border-white/40 hover:text-white"
					>
						{EXPERIENCES_HERO.secondaryAction}
					</Link>
				</div>

				{/* Category Filter Bar */}
				<div className="mt-12 pt-8 border-t border-white/10">
					<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">Filter by Experience Type</p>
					<div className="flex flex-wrap gap-2.5">
						{EXPERIENCE_CATEGORIES.map((cat) => {
							const isActive = activeCategory === cat.id;
							return (
								<button
									key={cat.id}
									type="button"
									onClick={() => onCategoryChange(cat.id)}
									className={cn(
										"rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300",
										isActive
											? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
											: "border border-white/10 bg-[#0a0a0a] text-white/60 hover:border-white/25 hover:text-white",
									)}
								>
									{cat.label}
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
