"use client";

import { useRef } from "react";
import { ArrowDown, Building2, Compass, Utensils, Award } from "lucide-react";
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
			className="relative min-h-[62vh] flex items-center bg-[#050505] text-white overflow-hidden border-b border-white/6"
		>
			{/* Fluid Organic Light Waves (NO BOX GRIDS!) */}
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(249,115,22,0.22),transparent_55%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(217,119,6,0.14),transparent_50%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(16,185,129,0.1),transparent_50%)]"
				aria-hidden
			/>

			{/* Soft Luminous Horizontal Horizon Glow Line */}
			<div
				className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-linear-to-r from-transparent via-orange-500/20 to-transparent"
				aria-hidden
			/>

			{/* Delicate Rotating Orbital Constellation Rings (NO BOX GRIDS!) */}
			<svg
				className="pointer-events-none absolute left-1/2 top-1/2 h-[min(90vw,600px)] w-[min(90vw,600px)] -translate-x-1/2 -translate-y-1/2 text-orange-500/20 opacity-60"
				viewBox="0 0 200 200"
				aria-hidden
			>
				<circle
					cx="100"
					cy="100"
					r="88"
					fill="none"
					stroke="currentColor"
					strokeWidth="0.4"
					strokeDasharray="2 12"
					className="origin-center motion-reduce:animate-none motion-safe:animate-[spin_140s_linear_infinite]"
				/>
				<circle
					cx="100"
					cy="100"
					r="68"
					fill="none"
					stroke="rgba(255,255,255,0.1)"
					strokeWidth="0.3"
					strokeDasharray="4 8"
					className="origin-center motion-reduce:animate-none motion-safe:animate-[spin_100s_linear_infinite_reverse]"
				/>
				{/* Glowing Constellation Node Dots */}
				<circle cx="100" cy="12" r="2" fill="rgb(249 115 22)" />
				<circle cx="188" cy="100" r="2" fill="rgb(249 115 22)" />
				<circle cx="100" cy="188" r="2" fill="rgb(249 115 22)" />
				<circle cx="12" cy="100" r="2" fill="rgb(249 115 22)" />
			</svg>

			{/* Background Typography Watermark */}
			<div
				className="pointer-events-none absolute left-1/2 -bottom-4 -translate-x-1/2 hidden select-none font-mono text-[12vw] font-black uppercase tracking-tighter text-white/[0.015] lg:block"
				aria-hidden
			>
				ALLIANCE
			</div>

			<div ref={contentRef} className="relative z-10 mx-auto max-w-[1600px] pad-x pt-28 pb-16 md:pt-36 md:pb-20 w-full space-y-10 text-center">
				{/* Top Alliance Badge */}
				<div className="flex flex-wrap items-center justify-center gap-3">
					<span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-400 backdrop-blur-md shadow-lg shadow-orange-500/10">
						<Award className="h-3.5 w-3.5 text-orange-500" />
						04 // Global Luxury Guild Alliance
					</span>
					<span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 backdrop-blur-md">
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
							className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-9 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-105"
						>
							Apply for Partnership <ArrowDown className="h-4 w-4" />
						</button>
					</div>
				</div>

				{/* 3-Pillar Glassmorphic Guild Sector Grid */}
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-3 pt-6 text-left">
					<div className="group rounded-3xl border border-white/12 bg-white/[0.03] backdrop-blur-xl p-8 space-y-3.5 hover:border-orange-500/50 hover:bg-white/[0.06] transition-all duration-300 shadow-2xl">
						<div className="flex items-center justify-between text-orange-500">
							<Building2 className="h-6 w-6 group-hover:scale-110 transition-transform" />
							<span className="text-[10px] font-semibold uppercase tracking-wider text-orange-400 rounded-full bg-orange-500/10 px-3 py-1 border border-orange-500/20">Lodging</span>
						</div>
						<h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">Boutique Lodging & Ryokans</h3>
						<p className="text-xs text-white/60 leading-relaxed">
							Independent luxury properties under 40 rooms offering authentic local hospitality.
						</p>
					</div>

					<div className="group rounded-3xl border border-white/12 bg-white/[0.03] backdrop-blur-xl p-8 space-y-3.5 hover:border-orange-500/50 hover:bg-white/[0.06] transition-all duration-300 shadow-2xl">
						<div className="flex items-center justify-between text-orange-500">
							<Compass className="h-6 w-6 group-hover:scale-110 transition-transform" />
							<span className="text-[10px] font-semibold uppercase tracking-wider text-orange-400 rounded-full bg-orange-500/10 px-3 py-1 border border-orange-500/20">Guiding</span>
						</div>
						<h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">Certified Field Guides</h3>
						<p className="text-xs text-white/60 leading-relaxed">
							Mountaineering and cultural leads delivering safe, unhurried expedition pacing.
						</p>
					</div>

					<div className="group rounded-3xl border border-white/12 bg-white/[0.03] backdrop-blur-xl p-8 space-y-3.5 hover:border-orange-500/50 hover:bg-white/[0.06] transition-all duration-300 shadow-2xl">
						<div className="flex items-center justify-between text-orange-500">
							<Utensils className="h-6 w-6 group-hover:scale-110 transition-transform" />
							<span className="text-[10px] font-semibold uppercase tracking-wider text-orange-400 rounded-full bg-orange-500/10 px-3 py-1 border border-orange-500/20">Culture</span>
						</div>
						<h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">Culinary & Craft Ateliers</h3>
						<p className="text-xs text-white/60 leading-relaxed">
							Private dining hosts, winemakers, and traditional artisans opening exclusive doors.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
