"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { CAREERS_HERO } from "../content/careers-copy";

export function CareersHero() {
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
			className="relative min-h-[50vh] flex items-center bg-[#050505] text-white overflow-hidden border-b border-white/6"
		>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
					backgroundSize: "30px 30px",
				}}
			/>
			<div ref={contentRef} className="relative z-10 mx-auto max-w-[1600px] pad-x pt-28 pb-16 md:pt-36 md:pb-20 w-full">
				<p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
					{CAREERS_HERO.eyebrow}
				</p>
				<h1 className="mt-4 text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-white">
					{CAREERS_HERO.title}
				</h1>
				<p className="mt-6 text-base sm:text-lg text-white/60 leading-relaxed">
					{CAREERS_HERO.description}
				</p>

				{/* Culture Metrics Strip */}
				<div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 pt-8 border-t border-white/10">
					{CAREERS_HERO.metrics.map((metric, idx) => (
						<div
							key={idx}
							className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 text-center sm:text-left hover:border-orange-500/30 transition-colors"
						>
							<p className="text-3xl font-extrabold text-orange-500">{metric.value}</p>
							<p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/60">
								{metric.label}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
