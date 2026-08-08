"use client";

import { useRef } from "react";
import { Sparkles, Briefcase, Globe, Heart, ArrowDown } from "lucide-react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { CAREERS_HERO } from "../content/careers-copy";

export function CareersHero() {
	const containerRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const manifestoRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		containerRef,
		() => {
			if (prefersReducedMotion()) return;
			const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

			if (contentRef.current) {
				tl.from(contentRef.current.children, {
					y: 30,
					opacity: 0,
					duration: 0.85,
					stagger: 0.1,
					clearProps: "all",
				});
			}

			if (manifestoRef.current) {
				tl.from(
					manifestoRef.current,
					{
						y: 35,
						opacity: 0,
						duration: 0.95,
						clearProps: "all",
					},
					"-=0.5",
				);
			}
		},
		[],
	);

	const scrollToRoles = () => {
		const rolesEl = document.getElementById("open-positions");
		if (rolesEl) {
			rolesEl.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section
			ref={containerRef}
			aria-labelledby="careers-hero-title"
			className="relative min-h-[60vh] flex items-center bg-[#050505] text-white overflow-hidden border-b border-white/6"
		>
			{/* Dual-Hue Ambient Glow (Orange + Emerald) */}
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_15%_-10%,rgba(249,115,22,0.13),transparent_60%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_85%_95%,rgba(16,185,129,0.09),transparent_60%)]"
				aria-hidden
			/>

			{/* Architectural Vertical Grid Lines Overlay */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.035]"
				style={{
					backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.9) 1px, transparent 1px)",
					backgroundSize: "120px 100%",
				}}
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.02]"
				style={{
					backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.85) 1px, transparent 1px)",
					backgroundSize: "100% 64px",
				}}
				aria-hidden
			/>

			{/* Studio Watermark */}
			<div
				className="pointer-events-none absolute right-4 top-12 hidden select-none font-mono text-[9vw] font-black uppercase tracking-tighter text-white/[0.015] lg:block"
				aria-hidden
			>
				CAREERS
			</div>

			<div className="relative z-10 mx-auto max-w-[1600px] pad-x pt-28 pb-16 md:pt-36 md:pb-20 w-full">
				<div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
					{/* Left Column: Editorial Headline & Copy */}
					<div ref={contentRef} className="lg:col-span-7 space-y-6">
						<div className="flex flex-wrap items-center gap-3">
							<span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-400">
								<Sparkles className="h-3 w-3 text-orange-500" />
								02 // Careers
							</span>
							<span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
								<span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
								4 Open Positions
							</span>
						</div>

						<h1
							id="careers-hero-title"
							className="text-[clamp(2.75rem,6.5vw,5.25rem)] font-bold leading-[0.93] tracking-tight text-white"
						>
							Shape the future of{" "}
							<span className="font-serif italic font-normal text-orange-500 block sm:inline">
								slow editorial travel.
							</span>
						</h1>

						<p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl">
							{CAREERS_HERO.description}
						</p>

						<div className="pt-2 flex flex-wrap gap-4 items-center">
							<button
								type="button"
								onClick={scrollToRoles}
								className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/20"
							>
								Explore Open Roles <ArrowDown className="h-4 w-4" />
							</button>
						</div>
					</div>

					{/* Right Column: Studio Manifesto Card */}
					<div className="lg:col-span-5 relative">
						<div
							ref={manifestoRef}
							className="relative rounded-2xl border border-white/12 bg-[#0a0a0a]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md overflow-hidden group hover:border-orange-500/40 transition-colors duration-300"
						>
							{/* Corner Accents */}
							<div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/40 rounded-tr-2xl" />
							<div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-500/30 rounded-bl-2xl" />

							<div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
								<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 flex items-center gap-1.5">
									<Briefcase className="h-3.5 w-3.5" /> Talkwer Culture Manifesto
								</span>
								<span className="text-[10px] text-white/40 font-mono">EST. 2026</span>
							</div>

							<div className="space-y-4 text-xs text-white/75">
								<div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/8">
									<Globe className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
									<div>
										<p className="font-semibold text-white">100% Asynchronous & Remote</p>
										<p className="text-white/50 text-[11px]">Work from anywhere across 28 countries.</p>
									</div>
								</div>

								<div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/8">
									<Sparkles className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
									<div>
										<p className="font-semibold text-white">$3,500/yr Field Travel Grant</p>
										<p className="text-white/50 text-[11px]">Annual budget to experience Talkwer tours firsthand.</p>
									</div>
								</div>

								<div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/8">
									<Heart className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
									<div>
										<p className="font-semibold text-white">Unlimited Field Leave</p>
										<p className="text-white/50 text-[11px]">Rest and recharge whenever you need unhurried time.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Culture Metrics Strip */}
				<div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 pt-8 border-t border-white/10">
					{CAREERS_HERO.metrics.map((metric, idx) => (
						<div
							key={idx}
							className="group rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 text-center sm:text-left hover:border-orange-500/40 hover:bg-[#0e0e0e] transition-all duration-300"
						>
							<p className="text-3xl sm:text-4xl font-extrabold text-orange-500 group-hover:scale-105 transition-transform origin-left">
								{metric.value}
							</p>
							<p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/60">
								{metric.label}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
