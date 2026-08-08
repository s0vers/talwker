"use client";

import { useRef } from "react";
import { Search, X, HelpCircle, ArrowUpRight, BookOpen } from "lucide-react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { FAQ_HERO } from "../content/faq-copy";

export type FaqHeroProps = {
	searchQuery: string;
	onSearchChange: (query: string) => void;
};

export function FaqHero({ searchQuery, onSearchChange }: FaqHeroProps) {
	const containerRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const topicsCardRef = useRef<HTMLDivElement>(null);

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

			if (topicsCardRef.current) {
				tl.from(
					topicsCardRef.current,
					{
						y: 32,
						opacity: 0,
						duration: 0.9,
						clearProps: "all",
					},
					"-=0.5",
				);
			}
		},
		[],
	);

	const quickTopics = [
		{ label: "Bookings & Group Size", count: "3 Questions", query: "booking" },
		{ label: "Experiences & Pacing", count: "3 Questions", query: "experience" },
		{ label: "Payments & Currency", count: "3 Questions", query: "payment" },
		{ label: "Cancellation Policies", count: "3 Questions", query: "cancellation" },
	];

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
				className="pointer-events-none absolute right-4 top-12 hidden select-none font-mono text-[9vw] font-black uppercase tracking-tighter text-white/[0.015] lg:block"
				aria-hidden
			>
				KNOWLEDGE
			</div>

			<div className="relative z-10 mx-auto max-w-[1600px] pad-x">
				<div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
					{/* Left Column: Search Command Center */}
					<div ref={contentRef} className="lg:col-span-7 space-y-6">
						<div className="flex items-center gap-3">
							<span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-400">
								<HelpCircle className="h-3 w-3 text-orange-500" />
								05 // Help Center
							</span>
							<span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
								Live Search Desk
							</span>
						</div>

						<h1
							id="faq-hero-title"
							className="text-[clamp(2.75rem,6.5vw,5.25rem)] font-bold leading-[0.93] tracking-tight text-white"
						>
							Help & Knowledge{" "}
							<span className="font-serif italic font-normal text-orange-500 block sm:inline">
								Base.
							</span>
						</h1>

						<p className="text-base sm:text-lg text-white/65 leading-relaxed max-w-xl">
							{FAQ_HERO.description}
						</p>

						{/* Search Input Bar */}
						<div className="pt-2">
							<div className="relative flex items-center group">
								<Search className="absolute left-4 h-5 w-5 text-white/40 group-focus-within:text-orange-400 transition-colors pointer-events-none" />
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => onSearchChange(e.target.value)}
									placeholder={FAQ_HERO.searchPlaceholder}
									className="w-full rounded-2xl border border-white/15 bg-[#0a0a0a] py-4 pl-12 pr-12 text-sm text-white placeholder:text-white/35 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none shadow-2xl transition-all"
								/>
								{searchQuery ? (
									<button
										type="button"
										onClick={() => onSearchChange("")}
										aria-label="Clear search"
										className="absolute right-4 p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
									>
										<X className="h-4 w-4" />
									</button>
								) : null}
							</div>
						</div>
					</div>

					{/* Right Column: Support Topics Quick Access Card */}
					<div className="lg:col-span-5 relative">
						<div
							ref={topicsCardRef}
							className="rounded-2xl border border-white/12 bg-[#0a0a0a]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-4 group hover:border-orange-500/40 transition-colors duration-300"
						>
							<div className="flex items-center justify-between border-b border-white/10 pb-4">
								<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 flex items-center gap-1.5">
									<BookOpen className="h-3.5 w-3.5" /> Popular Support Topics
								</span>
								<span className="text-[10px] text-white/40 font-mono">12 ARTICLES</span>
							</div>

							<div className="space-y-2.5">
								{quickTopics.map((topic, idx) => (
									<button
										key={idx}
										type="button"
										onClick={() => onSearchChange(topic.query)}
										className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/8 hover:border-orange-500/40 hover:bg-white/10 transition-all text-left group"
									>
										<div>
											<p className="text-xs font-semibold text-white group-hover:text-orange-400 transition-colors">
												{topic.label}
											</p>
											<p className="text-[10px] text-white/40">{topic.count}</p>
										</div>
										<ArrowUpRight className="h-3.5 w-3.5 text-white/40 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
