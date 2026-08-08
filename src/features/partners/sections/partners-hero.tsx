"use client";

import { useRef } from "react";
import { Sparkles, ArrowDown, Building2, Compass, Utensils } from "lucide-react";
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
				y: 28,
				opacity: 0,
				duration: 0.85,
				stagger: 0.1,
				ease: "power2.out",
				clearProps: "all",
			});
		},
		[],
	);

	const scrollToForm = () => {
		const formEl = document.getElementById("partner-form");
		if (formEl) {
			formEl.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section
			ref={containerRef}
			aria-labelledby="partners-hero-title"
			className="relative min-h-[58vh] flex items-center bg-[#050505] text-white overflow-hidden border-b border-white/6"
		>
			{/* Guild Radial Lighting Overlay */}
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(249,115,22,0.11),transparent_65%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.035]"
				style={{
					backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
					backgroundSize: "40px 40px",
				}}
				aria-hidden
			/>

			{/* Background Watermark */}
			<div
				className="pointer-events-none absolute left-0 bottom-4 hidden select-none font-mono text-[10vw] font-black uppercase tracking-tighter text-white/[0.012] lg:block"
				aria-hidden
			>
				GUILD ALLIANCE
			</div>

			<div ref={contentRef} className="relative z-10 mx-auto max-w-[1600px] pad-x pt-28 pb-16 md:pt-36 md:pb-20 w-full space-y-10 text-center">
				{/* Top Alliance Badge */}
				<div className="flex flex-wrap items-center justify-center gap-3">
					<span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-400">
						<Sparkles className="h-3 w-3 text-orange-500" />
						04 // Global Partner Network
					</span>
					<span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
						<span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
						Accepting Applications 2026
					</span>
				</div>

				{/* Center Headline & Intro */}
				<div className="max-w-4xl mx-auto space-y-5">
					<h1
						id="partners-hero-title"
						className="text-[clamp(2.75rem,6.5vw,5.5rem)] font-bold leading-[0.92] tracking-tight text-white"
					>
						Uniting the world’s finest{" "}
						<span className="font-serif italic font-normal text-orange-500 block sm:inline">
							boutique hosts & guides.
						</span>
					</h1>

					<p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
						{PARTNERS_HERO.description}
					</p>

					<div className="pt-2 flex justify-center">
						<button
							type="button"
							onClick={scrollToForm}
							className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/20"
						>
							Apply for Partnership <ArrowDown className="h-4 w-4" />
						</button>
					</div>
				</div>

				{/* 3-Pillar Guild Alliance Grid */}
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-3 pt-6 text-left">
					<div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-7 space-y-3 hover:border-orange-500/40 transition-colors">
						<div className="flex items-center justify-between text-orange-500">
							<Building2 className="h-6 w-6" />
							<span className="text-[10px] font-semibold uppercase tracking-wider text-orange-400">Lodging</span>
						</div>
						<h3 className="text-lg font-bold text-white">Boutique Lodging & Ryokans</h3>
						<p className="text-xs text-white/60 leading-relaxed">
							Independent luxury properties under 40 rooms offering authentic local hospitality.
						</p>
					</div>

					<div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-7 space-y-3 hover:border-orange-500/40 transition-colors">
						<div className="flex items-center justify-between text-orange-500">
							<Compass className="h-6 w-6" />
							<span className="text-[10px] font-semibold uppercase tracking-wider text-orange-400">Guiding</span>
						</div>
						<h3 className="text-lg font-bold text-white">Certified Field Guides</h3>
						<p className="text-xs text-white/60 leading-relaxed">
							Mountaineering and cultural leads delivering safe, unhurried expedition pacing.
						</p>
					</div>

					<div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-7 space-y-3 hover:border-orange-500/40 transition-colors">
						<div className="flex items-center justify-between text-orange-500">
							<Utensils className="h-6 w-6" />
							<span className="text-[10px] font-semibold uppercase tracking-wider text-orange-400">Culture</span>
						</div>
						<h3 className="text-lg font-bold text-white">Culinary & Craft Ateliers</h3>
						<p className="text-xs text-white/60 leading-relaxed">
							Private dining hosts, winemakers, and traditional artisans opening exclusive doors.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
