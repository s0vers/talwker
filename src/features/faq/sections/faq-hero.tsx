"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { LuSearch, LuX, LuCircleHelp } from "react-icons/lu";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";

export type FaqHeroProps = {
	searchQuery: string;
	onSearchChange: (query: string) => void;
};

export function FaqHero({ searchQuery, onSearchChange }: FaqHeroProps) {
	const t = useTranslations("FAQ");
	const containerRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		containerRef,
		() => {
			if (prefersReducedMotion()) return;
			const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

			if (contentRef.current) {
				tl.from(contentRef.current.children, {
					y: 28,
					opacity: 0,
					duration: 0.85,
					stagger: 0.1,
					clearProps: "all",
				});
			}
		},
		[],
	);

	return (
		<section
			ref={containerRef}
			aria-labelledby="faq-hero-title"
			className="relative bg-[#050505] text-white pt-28 pb-16 md:pt-36 md:pb-20 border-b border-white/6 overflow-hidden"
		>
			{/* Dual-Temperature Luminous Ambient Glow (Orange + Slate Cyan) */}
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_15%_-10%,rgba(249,115,22,0.13),transparent_60%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_85%_90%,rgba(56,189,248,0.06),transparent_60%)]"
				aria-hidden
			/>

			{/* Search Radar Arcs SVG Overlay */}
			<svg
				className="pointer-events-none absolute left-[-100px] top-[-50px] h-[500px] w-[500px] text-orange-500/10 opacity-40"
				viewBox="0 0 200 200"
				aria-hidden
			>
				<circle
					cx="100"
					cy="100"
					r="80"
					fill="none"
					stroke="currentColor"
					strokeWidth="0.4"
					strokeDasharray="4 8"
					className="origin-center motion-reduce:animate-none motion-safe:animate-[spin_120s_linear_infinite]"
				/>
				<circle
					cx="100"
					cy="100"
					r="55"
					fill="none"
					stroke="currentColor"
					strokeWidth="0.25"
					opacity="0.6"
				/>
			</svg>

			{/* Background Watermark */}
			<div
				className="pointer-events-none absolute right-4 top-12 hidden select-none text-[9vw] font-black uppercase tracking-tighter text-white/[0.015] lg:block"
				aria-hidden
			>
				KNOWLEDGE
			</div>

			<div className="relative z-10 mx-auto max-w-[1600px] pad-x">
				<div ref={contentRef} className="max-w-3xl space-y-6">
					<div className="flex items-center gap-3">
						<span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-400">
							<LuCircleHelp className="h-3 w-3 text-orange-500" />
							{t("hero.badge")}
						</span>
						<span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
							{t("hero.deskLabel")}
						</span>
					</div>

					<h1
						id="faq-hero-title"
						className="text-[clamp(2.75rem,6.5vw,5.25rem)] font-bold leading-[0.93] tracking-tight text-white"
					>
						{t("hero.titleLead")}{" "}
						<span className="font-light italic text-orange-500 block sm:inline">
							{t("hero.titleAccent")}
						</span>
					</h1>

					<p className="text-base sm:text-lg text-white/65 leading-relaxed max-w-xl">
						{t("hero.description")}
					</p>

					{/* Search Input Bar */}
					<div className="pt-2 max-w-2xl">
						<div className="relative flex items-center group">
							<LuSearch className="absolute left-4 h-5 w-5 text-white/40 group-focus-within:text-orange-400 transition-colors pointer-events-none" />
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => onSearchChange(e.target.value)}
								placeholder={t("hero.searchPlaceholder")}
								className="w-full rounded-2xl border border-white/15 bg-[#0a0a0a] py-4 pl-12 pr-12 text-sm text-white placeholder:text-white/35 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none shadow-2xl transition-all"
							/>
							{searchQuery ? (
								<button
									type="button"
									onClick={() => onSearchChange("")}
									aria-label="Clear search"
									className="absolute right-4 p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
								>
									<LuX className="h-4 w-4" />
								</button>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
