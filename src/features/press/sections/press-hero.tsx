"use client";

import { useRef } from "react";
import { Mail, Download } from "lucide-react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { PRESS_HERO } from "../content/press-copy";

export function PressHero() {
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
			className="relative min-h-[48vh] flex items-center bg-[#050505] text-white pt-28 pb-16 pad-x overflow-hidden border-b border-white/6"
		>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
					backgroundSize: "30px 30px",
				}}
			/>
			<div ref={contentRef} className="relative mx-auto max-w-[1600px] w-full">
				<div className="flex items-center gap-3">
					<p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
						{PRESS_HERO.eyebrow}
					</p>
					<span className="rounded-full bg-white/10 px-3 py-0.5 text-[10px] text-white/60">
						2026 Press Kit
					</span>
				</div>
				<h1 className="mt-4 max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-white">
					{PRESS_HERO.title}
				</h1>
				<p className="mt-6 max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed">
					{PRESS_HERO.description}
				</p>

				<div className="mt-10 flex flex-wrap gap-4 items-center">
					<a
						href={`mailto:${PRESS_HERO.pressEmail}`}
						className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/20"
					>
						<Mail className="h-4 w-4" /> {PRESS_HERO.pressEmail}
					</a>
					<a
						href="#press-kits"
						className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white/70 transition-all hover:border-white/40 hover:text-white"
					>
						<Download className="h-4 w-4 text-orange-500" /> Download Media Kit
					</a>
				</div>
			</div>
		</section>
	);
}
