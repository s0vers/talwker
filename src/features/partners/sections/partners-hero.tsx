"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { PARTNERS_HERO } from "../content/partners-copy";

export function PartnersHero() {
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
			className="relative min-h-[50vh] flex items-center bg-[#050505] text-white pt-28 pb-16 pad-x overflow-hidden border-b border-white/6"
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
					{PARTNERS_HERO.eyebrow}
				</p>
				<h1 className="mt-4 max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-white">
					{PARTNERS_HERO.title}
				</h1>
				<p className="mt-6 max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed">
					{PARTNERS_HERO.description}
				</p>

				{/* Partner Network Stats */}
				<div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 pt-8 border-t border-white/10">
					{PARTNERS_HERO.stats.map((stat, idx) => (
						<div
							key={idx}
							className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 text-center sm:text-left hover:border-orange-500/30 transition-colors"
						>
							<p className="text-3xl font-extrabold text-orange-500">{stat.value}</p>
							<p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/60">
								{stat.label}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
