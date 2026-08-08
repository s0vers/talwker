"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Sparkles, Layers, Compass, ArrowRight } from "lucide-react";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { EXPERIENCES_HERO, EXPERIENCE_CATEGORIES, EXPERIENCES_CATALOG, type ExperienceCategory } from "../content/experiences-page-copy";
import { cn } from "@/lib/utils";

export type ExperiencesHeroProps = {
	activeCategory: ExperienceCategory;
	onCategoryChange: (category: ExperienceCategory) => void;
};

export function ExperiencesHero({ activeCategory, onCategoryChange }: ExperiencesHeroProps) {
	const containerRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const cardsStackRef = useRef<HTMLDivElement>(null);

	useGsapContext(
		containerRef,
		() => {
			if (prefersReducedMotion()) return;
			const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

			if (contentRef.current) {
				tl.from(contentRef.current.children, {
					y: 35,
					opacity: 0,
					duration: 0.8,
					stagger: 0.1,
					clearProps: "all",
				});
			}

			if (cardsStackRef.current) {
				tl.from(
					cardsStackRef.current.children,
					{
						scale: 0.9,
						y: 30,
						opacity: 0,
						duration: 0.8,
						stagger: 0.15,
						clearProps: "all", // Prevents cards from disappearing or sticking at opacity 0!
					},
					"-=0.5",
				);
			}
		},
		[],
	);

	// Top 3 featured experience cards for the visual stack
	const featuredStack = EXPERIENCES_CATALOG.slice(0, 3);

	return (
		<section
			ref={containerRef}
			aria-labelledby="experiences-hero-title"
			className="relative min-h-[60vh] flex items-center bg-[#050505] text-white pt-28 pb-16 pad-x overflow-hidden border-b border-white/6"
		>
			{/* Bespoke Ambient Glow & Mesh Overlay */}
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_-5%,rgba(249,115,22,0.11),transparent_60%)]"
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

			<div className="relative z-10 mx-auto max-w-[1600px] w-full">
				<div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
					{/* Left Column: Unique Editorial Title & Copy */}
					<div ref={contentRef} className="lg:col-span-7 space-y-6">
						<div className="flex items-center gap-3">
							<span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-400">
								<Sparkles className="h-3 w-3 text-orange-500" />
								01 // Discovery
							</span>
							<span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
								Catalog 2026
							</span>
						</div>

						<h1
							id="experiences-hero-title"
							className="text-[clamp(2.75rem,6.5vw,5.25rem)] font-bold leading-[0.93] tracking-tight text-white"
						>
							The Art of{" "}
							<span className="font-serif italic font-normal text-orange-500 block sm:inline">
								Unrushed Travel.
							</span>
						</h1>

						<p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl">
							{EXPERIENCES_HERO.description}
						</p>

						{/* Feature Pills */}
						<div className="flex flex-wrap gap-4 pt-2 text-xs text-white/70">
							<span className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2">
								<Layers className="h-4 w-4 text-orange-500" /> 6 Signature Formats
							</span>
							<span className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2">
								<Compass className="h-4 w-4 text-orange-500" /> Max 8–16 Guests
							</span>
						</div>

						<div className="pt-4 flex flex-wrap gap-4 items-center">
							<Link
								href={EXPERIENCES_HERO.primaryHref}
								className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/20"
							>
								{EXPERIENCES_HERO.primaryAction} <ArrowRight className="h-4 w-4" />
							</Link>
							<Link
								href={EXPERIENCES_HERO.secondaryHref}
								className="inline-flex items-center rounded-full border border-white/15 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white/70 transition-all hover:border-white/40 hover:text-white"
							>
								{EXPERIENCES_HERO.secondaryAction}
							</Link>
						</div>
					</div>

					{/* Right Column: Layered Floating Cards Stack */}
					<div className="lg:col-span-5 relative py-6 lg:py-0">
						<div ref={cardsStackRef} className="relative aspect-4/3 w-full max-w-md mx-auto min-h-[300px]">
							{featuredStack.map((item, index) => {
								const rotationClass =
									index === 0
										? "rotate-3 translate-x-2 -translate-y-2 z-30 hover:rotate-0"
										: index === 1
											? "-rotate-2 -translate-x-3 translate-y-3 z-20 hover:rotate-0"
											: "rotate-6 translate-x-4 translate-y-6 z-10 opacity-70 hover:rotate-0";

								return (
									<div
										key={item.id}
										className={cn(
											"absolute inset-0 overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a] shadow-2xl transition-all duration-500 ease-out cursor-pointer",
											rotationClass,
										)}
									>
										<Image
											src={item.image}
											alt={item.imageAlt}
											fill
											sizes="(max-width: 1024px) 100vw, 400px"
											className="object-cover"
										/>
										<div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-90" />
										
										<div className="absolute bottom-4 left-4 right-4">
											<span className="rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
												{item.categoryLabel}
											</span>
											<h3 className="mt-1 text-base font-bold text-white truncate">
												{item.title}
											</h3>
											<p className="text-xs text-white/60">{item.duration} · {item.price}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				{/* Category Filter Bar */}
				<div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div>
						<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
							Select Experience Format
						</p>
					</div>

					<div className="flex flex-wrap gap-2">
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
