"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
	LuArrowDown,
	LuCamera,
	LuCompass,
	LuLayers,
	LuMountain,
	LuVolume2,
	LuVolumeX,
} from "react-icons/lu";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { HERO_SLIDES, type HeroSlide } from "@/features/home-2/content/atelier-copy";
import { ButtonWithIcon } from "@/shared/ui";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function AtelierHero() {
	const sectionRef = useRef<HTMLElement>(null);
	const [activeSlideIndex, setActiveSlideIndex] = useState(0);
	const [audioActive, setAudioActive] = useState(false);
	const [currentTime, setCurrentTime] = useState("");

	const activeSlide: HeroSlide = HERO_SLIDES[activeSlideIndex];

	// Real-time time display
	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			setCurrentTime(
				now.toLocaleTimeString("en-US", {
					hour12: false,
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
					timeZone: "UTC",
				}) + " UTC",
			);
		};
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, []);

	// GSAP animations for slide transition
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLDivElement>(null);
	const tagRef = useRef<HTMLSpanElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;

			gsap.fromTo(
				titleRef.current,
				{ y: 60, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
			);
			gsap.fromTo(
				subtitleRef.current,
				{ y: 30, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.7, delay: 0.1, ease: "power2.out" },
			);
		},
		[activeSlideIndex],
	);

	return (
		<section
			ref={sectionRef}
			id="atelier-hero"
			aria-labelledby="hero-display-title"
			className="relative min-h-svh w-full overflow-hidden bg-[#050505] text-white flex flex-col justify-between pt-24 pb-8"
		>
			{/* Multi-Layer Cinematic Background Crossfade */}
			{HERO_SLIDES.map((slide, idx) => (
				<div
					key={slide.id}
					className={cn(
						"absolute inset-0 transition-opacity duration-1000 ease-out",
						idx === activeSlideIndex ? "opacity-100 z-0 pointer-events-auto" : "opacity-0 z-0 pointer-events-none",
					)}
				>
					<Image
						src={slide.image}
						alt={slide.title}
						fill
						priority={idx === 0}
						sizes="100vw"
						className={cn(
							"object-cover transition-transform duration-[4000ms] ease-out",
							idx === activeSlideIndex ? "scale-105 brightness-75" : "scale-100 brightness-50",
						)}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/35 backdrop-blur-[0.5px]" />
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_30%,rgba(249,115,22,0.15),transparent_70%)]" />
				</div>
			))}

			{/* Left Vertical Architectural Spine (Hidden on Mobile) */}
			<div className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-8 text-white/30 pointer-events-none">
				<div className="h-16 w-px bg-gradient-to-b from-transparent via-orange-500/50 to-transparent" />
				<span className="rotate-180 [writing-mode:vertical-rl] font-mono text-[9px] uppercase tracking-[0.35em] text-white/40">
					TALKWER ATELIER // NOCTURNAL EXPEDITIONS
				</span>
				<div className="h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
			</div>

			{/* Top Telemetry & Spatial HUD */}
			<header className="relative z-10 w-full max-w-[1600px] mx-auto pad-x">
				<div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 text-xs font-mono text-white/60 backdrop-blur-md">
					<div className="flex items-center gap-4">
						<span
							ref={tagRef}
							className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-3.5 py-1 text-[10px] font-semibold tracking-widest text-orange-400"
						>
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
								<span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
							</span>
							{activeSlide.tag}
						</span>

						<div className="flex items-center gap-2 text-white/50 text-[11px]">
							<LuCompass className="h-3.5 w-3.5 text-orange-400" />
							<span>{activeSlide.coordinates}</span>
						</div>
					</div>

					<div className="flex items-center gap-6 text-[11px]">
						<div className="hidden sm:flex items-center gap-2 text-white/50">
							<LuMountain className="h-3.5 w-3.5 text-orange-400" />
							<span>{activeSlide.elevation}</span>
						</div>

						<div className="hidden sm:flex items-center gap-2 text-white/50">
							<LuCamera className="h-3.5 w-3.5 text-orange-400" />
							<span>{activeSlide.cameraMeta}</span>
						</div>

						{/* Audio Field Soundscape Trigger */}
						<button
							type="button"
							onClick={() => setAudioActive((prev) => !prev)}
							className={cn(
								"flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-wider transition-all duration-300",
								audioActive
									? "border-orange-500 bg-orange-500/20 text-orange-300 shadow-md shadow-orange-500/20"
									: "border-white/15 bg-white/5 text-white/50 hover:border-white/30 hover:text-white",
							)}
							aria-label="Toggle field soundscape"
						>
							{audioActive ? (
								<>
									<LuVolume2 className="h-3 w-3 text-orange-400 animate-pulse" />
									<span className="flex gap-0.5 items-end h-2.5">
										<span className="w-0.5 h-1 bg-orange-400 animate-bounce" />
										<span className="w-0.5 h-2.5 bg-orange-400 animate-bounce delay-75" />
										<span className="w-0.5 h-1.5 bg-orange-400 animate-bounce delay-150" />
									</span>
									<span className="hidden lg:inline">AUDIO SIM</span>
								</>
							) : (
								<>
									<LuVolumeX className="h-3 w-3" />
									<span className="hidden lg:inline">SOUNDSCAPE</span>
								</>
							)}
						</button>

						<div className="font-mono text-[10px] text-white/40">
							{currentTime || "00:00:00 UTC"}
						</div>
					</div>
				</div>
			</header>

			{/* Main Asymmetric Stage Content */}
			<div className="relative z-10 w-full max-w-[1600px] mx-auto pad-x my-auto py-8 lg:py-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
					{/* Left Giant Monolithic Typography */}
					<div className="lg:col-span-7 xl:col-span-8 space-y-6">
						<div className="space-y-2">
							<div className="overflow-hidden">
								<p className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-orange-400 font-semibold">
									{activeSlide.subtitle} {"//"} {activeSlide.region}
								</p>
							</div>

							<div className="overflow-hidden">
								<h1
									id="hero-display-title"
									ref={titleRef}
									className="text-[clamp(2.75rem,9.5vw,8.5rem)] font-extrabold tracking-tighter leading-[0.88] text-white select-none"
								>
									{activeSlide.title}
								</h1>
							</div>
						</div>

						<div ref={subtitleRef} className="max-w-xl space-y-6">
							<p className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-white/80">
								An avant-garde exploration of the earth&apos;s most secluded horizons. Engineered for contemplative nomads seeking raw geographic truth over transient luxury.
							</p>

							{/* Call to Actions */}
							<div className="flex flex-wrap items-center gap-4 pt-2">
								<ButtonWithIcon
									href={`/destinations/${activeSlide.destinationSlug}`}
									variant="orange"
									size="lg"
									className="shadow-2xl shadow-orange-500/30 text-xs uppercase tracking-widest font-semibold"
								>
									Explore {activeSlide.title} Dossier
								</ButtonWithIcon>

								<Link
									href="#map-atlas"
									className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-md transition-all hover:border-orange-500/50 hover:bg-white/[0.08] hover:text-white"
								>
									<LuCompass className="h-4 w-4 text-orange-400" />
									<span>Cartographic Atlas</span>
								</Link>
							</div>
						</div>
					</div>

					{/* Right Interactive Spatial Slide Stack */}
					<div className="lg:col-span-5 xl:col-span-4 flex flex-col items-start lg:items-end gap-4">
						<div className="w-full max-w-sm rounded-3xl border border-white/15 bg-[#0c0c0c]/85 p-4 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-orange-500/40">
							<div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] font-mono text-white/40 uppercase tracking-widest">
								<span>EXPEDITION DECK</span>
								<span className="text-orange-400 font-semibold">0{activeSlideIndex + 1} / 0{HERO_SLIDES.length}</span>
							</div>

							{/* Slide Thumbnails Switcher */}
							<div className="grid grid-cols-4 gap-2 pt-3">
								{HERO_SLIDES.map((slide, idx) => {
									const isCurrent = idx === activeSlideIndex;
									return (
										<button
											key={slide.id}
											type="button"
											onClick={() => setActiveSlideIndex(idx)}
											className={cn(
												"relative aspect-square overflow-hidden rounded-xl border transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 group",
												isCurrent
													? "border-orange-500 scale-105 shadow-md shadow-orange-500/30 ring-1 ring-orange-500"
													: "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30",
											)}
											aria-label={`Select ${slide.title}`}
										>
											<Image
												src={slide.image}
												alt={slide.title}
												fill
												sizes="100px"
												className="object-cover"
											/>
											<div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
											<span className="absolute bottom-1 right-1 font-mono text-[9px] font-bold text-white bg-black/70 px-1 rounded">
												0{idx + 1}
											</span>
										</button>
									);
								})}
							</div>

							{/* Active Slide Snapshot Meta */}
							<div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
								<div>
									<p className="font-semibold text-white">{activeSlide.title} Monograph</p>
									<p className="text-[10px] font-mono text-white/40">{activeSlide.season} · {activeSlide.elevation}</p>
								</div>

								<Link
									href={`/destinations/${activeSlide.destinationSlug}`}
									className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-orange-400 transition-colors hover:bg-orange-500 hover:text-white"
									aria-label={`Go to ${activeSlide.title}`}
								>
									<LuArrowDown className="h-3.5 w-3.5 -rotate-45" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Base Slide Track Selector */}
			<div className="relative z-10 w-full max-w-[1600px] mx-auto pad-x">
				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
					<div className="flex items-center gap-3">
						<LuLayers className="h-4 w-4 text-orange-400" />
						<span className="font-mono text-xs uppercase tracking-wider text-white/40">
							EXPEDITION HORIZONS:
						</span>
					</div>

					<div className="flex items-center gap-2">
						{HERO_SLIDES.map((slide, idx) => (
							<button
								key={slide.id}
								type="button"
								onClick={() => setActiveSlideIndex(idx)}
								className={cn(
									"flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono transition-all duration-300 border outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
									idx === activeSlideIndex
										? "border-orange-500 bg-orange-500/20 text-orange-400 font-semibold"
										: "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white",
								)}
							>
								<span>0{idx + 1}</span>
								<span className="hidden sm:inline">{slide.title}</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
