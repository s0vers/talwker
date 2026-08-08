"use client";

import { useRef } from "react";
import { Sparkles, Mail, Download, Newspaper, ShieldCheck, ArrowRight } from "lucide-react";
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

	return (
		<section
			ref={containerRef}
			aria-labelledby="press-hero-title"
			className="relative min-h-[55vh] flex items-center bg-[#050505] text-white overflow-hidden border-b border-white/6"
		>
			{/* Newsroom Editorial Lines Overlay */}
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(249,115,22,0.1),transparent_65%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.9) 1px, transparent 1px)",
					backgroundSize: "80px 100%",
				}}
				aria-hidden
			/>

			{/* Background Masthead Watermark */}
			<div
				className="pointer-events-none absolute left-0 bottom-4 hidden select-none font-mono text-[11vw] font-black uppercase tracking-tighter text-white/[0.012] lg:block"
				aria-hidden
			>
				NEWSROOM
			</div>

			<div ref={contentRef} className="relative z-10 mx-auto max-w-[1600px] pad-x pt-28 pb-16 md:pt-36 md:pb-20 w-full space-y-8">
				{/* Top Masthead Meta Strip */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
					<div className="flex items-center gap-3">
						<span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-400">
							<Sparkles className="h-3 w-3 text-orange-500" />
							03 // Press & Media
						</span>
						<span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
							Editorial Press Center
						</span>
					</div>

					<div className="flex items-center gap-4 text-xs text-white/50 font-mono">
						<span>DESK: STOCKHOLM & TOKYO</span>
						<span>·</span>
						<span className="text-emerald-400 font-semibold">● 24/7 PRESS INQUIRIES</span>
					</div>
				</div>

				{/* Headline & Description */}
				<div className="max-w-4xl space-y-5">
					<h1
						id="press-hero-title"
						className="text-[clamp(2.75rem,6.5vw,5.5rem)] font-bold leading-[0.92] tracking-tight text-white"
					>
						Official Media Center{" "}
						<span className="font-serif italic font-normal text-orange-500 block sm:inline">
							for Stories & Releases.
						</span>
					</h1>

					<p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl">
						{PRESS_HERO.description}
					</p>
				</div>

				{/* Newsroom 3-Column Fast-Access Bar */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-6">
					<div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 space-y-2 hover:border-orange-500/40 transition-colors">
						<div className="flex items-center justify-between text-orange-500">
							<Mail className="h-5 w-5" />
							<span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">&lt; 4h SLA</span>
						</div>
						<p className="text-xs font-semibold uppercase tracking-wider text-white/40">Direct Press Line</p>
						<a href={`mailto:${PRESS_HERO.pressEmail}`} className="block font-mono text-sm font-bold text-white hover:text-orange-400 transition-colors">
							{PRESS_HERO.pressEmail}
						</a>
					</div>

					<div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 space-y-2 hover:border-orange-500/40 transition-colors">
						<div className="flex items-center justify-between text-orange-500">
							<Download className="h-5 w-5" />
							<span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">2026 KIT</span>
						</div>
						<p className="text-xs font-semibold uppercase tracking-wider text-white/40">Media Asset Vault</p>
						<a href="#press-kits" className="inline-flex items-center gap-1.5 font-mono text-sm font-bold text-white hover:text-orange-400 transition-colors">
							Download Assets <ArrowRight className="h-3.5 w-3.5" />
						</a>
					</div>

					<div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 space-y-2 hover:border-orange-500/40 transition-colors">
						<div className="flex items-center justify-between text-orange-500">
							<Newspaper className="h-5 w-5" />
							<ShieldCheck className="h-4 w-4 text-emerald-400" />
						</div>
						<p className="text-xs font-semibold uppercase tracking-wider text-white/40">Featured Mentions</p>
						<p className="font-mono text-sm font-bold text-white">Vogue · NYT · Wallpaper*</p>
					</div>
				</div>
			</div>
		</section>
	);
}
