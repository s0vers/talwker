"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { LuArrowDown, LuExternalLink, LuMoon, LuOrbit } from "react-icons/lu";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { CELESTIAL_WAYPOINTS } from "../content/celestial-data";
import { OBSERVATORY_COPY } from "../content/observatory-copy";

export function ObservatoryHero() {
	const sectionRef = useRef<HTMLElement>(null);
	const titleBlockRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<HTMLDivElement>(null);

	const [activeWaypointIndex, setActiveWaypointIndex] = useState(0);
	const activeWaypoint = CELESTIAL_WAYPOINTS[activeWaypointIndex];

	// Custom Optical Aperture Entrance
	useGsapContext(sectionRef, () => {
		if (prefersReducedMotion()) return;

		const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

		// The headline comes into focus while the field guide opens like an aperture.
		tl.fromTo(
			".hero-eyebrow-tag",
			{ opacity: 0, y: -10 },
			{ opacity: 1, y: 0, duration: 0.65, delay: 0.1 }
		)
			.fromTo(
				".hero-headline-word",
				{
					opacity: 0,
					scale: 1.035,
					filter: "blur(8px)"
				},
				{
					opacity: 1,
					scale: 1,
					filter: "blur(0px)",
					duration: 0.95,
					stagger: 0.13,
					ease: "power3.out",
					clearProps: "filter,transform,opacity"
				},
				"-=0.42"
			)
			.fromTo(
				".hero-lead-text",
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.8 },
				"-=0.6"
			)
			.fromTo(
				stageRef.current,
				{ opacity: 0, clipPath: "circle(14% at 50% 42%)", scale: 0.97 },
				{
					opacity: 1,
					clipPath: "circle(75% at 50% 50%)",
					scale: 1,
					duration: 1.05,
					ease: "power3.inOut",
					clearProps: "clipPath,transform,opacity"
				},
				"-=0.78"
			);
	}, []);

	const scrollToWaypoints = () => {
		const target = document.getElementById("nocturnal-waypoints");
		if (target) {
			target.scrollIntoView({
				behavior: prefersReducedMotion() ? "auto" : "smooth"
			});
		}
	};

	const scrollToChronometer = () => {
		const target = document.getElementById("twilight-chronometer");
		if (target) {
			target.scrollIntoView({
				behavior: prefersReducedMotion() ? "auto" : "smooth"
			});
		}
	};

	return (
		<section
			ref={sectionRef}
			className="pad-x relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#040404] pt-32 pb-12 text-white"
		>
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-gradient-to-b from-[#111] via-[#070707] to-[#040404]" />
			</div>

			{/* Main Hero Staging (Direct, uncluttered, beautifully integrated) */}
			<div className="relative z-10 my-auto grid grid-cols-1 items-center gap-8 py-6 lg:grid-cols-12 lg:gap-14">
				{/* Left Column: Headlines & Editorial Lead */}
				<div ref={titleBlockRef} className="flex flex-col lg:col-span-7">
					{/* Editorial Eyebrow Tag */}
					<div className="hero-eyebrow-tag mb-5 flex items-center gap-3">
						<span className="font-mono text-[11px] tracking-widest text-orange-400 uppercase">
							THE NOCTURNAL OBSERVATORY
						</span>
						<span className="hidden font-mono text-[11px] text-white/60 sm:inline">
							{OBSERVATORY_COPY.hero.coordinates}
						</span>
					</div>

					{/* Signature Aperture Focus Headline */}
					<h1 className="text-4xl leading-[0.96] font-light text-white sm:text-6xl md:text-7xl xl:text-[5.4rem]">
						<span className="hero-headline-word block font-normal tracking-tight">
							VOYAGES THROUGH
						</span>
						<span className="hero-headline-word mt-1.5 block font-serif text-orange-400 italic">
							THE UNLIGHTED EARTH
						</span>
					</h1>

					{/* Lead Copy & Interactive Launchers */}
					<div className="hero-lead-text mt-6 max-w-xl">
						<p className="text-base leading-relaxed font-light text-white/70 sm:text-lg">
							{OBSERVATORY_COPY.hero.lead}
						</p>

						<div className="mt-8 flex flex-wrap items-center gap-4">
							<button
								type="button"
								onClick={scrollToWaypoints}
								className="group inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-3.5 text-xs font-semibold tracking-[0.15em] text-black uppercase transition-colors duration-200 hover:bg-orange-600 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none"
							>
								<span>{OBSERVATORY_COPY.hero.ctaExplore}</span>
								<LuArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
							</button>

							<button
								type="button"
								onClick={scrollToChronometer}
								className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-medium tracking-[0.15em] text-white/90 uppercase backdrop-blur-sm transition-all hover:border-orange-500/50 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
							>
								<LuOrbit className="h-4 w-4 text-orange-400" />
								<span>{OBSERVATORY_COPY.hero.ctaChronometer}</span>
							</button>
						</div>
					</div>
				</div>

				{/* Right Column: Telescopic Lens Simulation Stage */}
				<div ref={stageRef} className="flex flex-col lg:col-span-5">
					<div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a] transition-colors duration-200 hover:border-white/30">
						<div className="border-b border-white/10 bg-[#0a0a0a] px-5 py-3 font-mono text-[11px] tracking-widest text-white/55 uppercase">
							Night-sky field guide / 0{activeWaypointIndex + 1}
						</div>

						{/* Photographic Viewport with Simulated Astrophotography Overlay */}
						<div className="relative aspect-[4/3] w-full overflow-hidden bg-black sm:aspect-[16/11]">
							<Image
								src={activeWaypoint.image}
								alt={activeWaypoint.title}
								fill
								priority
								sizes="(max-width: 1024px) 100vw, 45vw"
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30" />

							{/* Badges on Viewport */}
							<div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-md">
								<LuMoon className="h-3.5 w-3.5 text-orange-400" />
								<span>BORTLE {activeWaypoint.bortleClass}</span>
							</div>
						</div>

						{/* Station Dossier Summary */}
						<div className="bg-[#0a0a0a] p-6">
							<div className="mb-2 flex items-start justify-between gap-3">
								<div>
									<h2 className="text-xl font-medium tracking-tight text-white">
										{activeWaypoint.title}
									</h2>
									<p className="mt-0.5 font-mono text-xs text-white/50">
										{activeWaypoint.region}, {activeWaypoint.country}
									</p>
								</div>
								<Link
									href={`/destinations/${activeWaypoint.slug}`}
									className="group/link inline-flex items-center gap-1.5 pt-1 font-mono text-xs text-orange-400 transition-colors hover:text-orange-300"
								>
									<span>VIEW DOSSIER</span>
									<LuExternalLink className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
								</Link>
							</div>

							<p className="mt-2 line-clamp-2 text-xs leading-relaxed font-light text-white/70">
								{activeWaypoint.description}
							</p>

							{/* Live Optical Telemetry Grid */}
							<div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-3 font-mono text-[11px]">
								<div>
									<span className="block text-[10px] text-white/60">
										SKY BRIGHTNESS
									</span>
									<span className="text-white/90">
										{activeWaypoint.focalSpecs.skyBrightness}
									</span>
								</div>
								<div>
									<span className="block text-[10px] text-white/60">
										OPTIMAL WINDOW
									</span>
									<span className="text-white/90">
										{activeWaypoint.optimalWindow.split("//")[0]}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom 4-Station Switcher Track */}
			<div className="relative z-10 border-t border-white/[0.08] pt-4">
				<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
					<div className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-white/60 uppercase">
						<span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
						ACTIVE SANCTUARY STATIONS (4 CELESTIAL ZONES):
					</div>
					<div
						role="group"
						aria-label="Sanctuary stations"
						className="grid w-full grid-cols-2 items-center gap-2 sm:flex sm:w-auto"
					>
						{CELESTIAL_WAYPOINTS.map((wp, idx) => (
							<button
								key={wp.id}
								type="button"
								onClick={() => setActiveWaypointIndex(idx)}
								aria-pressed={activeWaypointIndex === idx}
								className={cn(
									"min-h-11 rounded-xl border px-4 py-2 text-left font-mono text-xs transition-all sm:text-center",
									activeWaypointIndex === idx
										? "border-orange-500/60 bg-orange-500/15 font-semibold text-orange-300"
										: "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/25 hover:text-white/80"
								)}
							>
								<span className="block text-[10px] text-white/60">
									ZONE 0{idx + 1}
								</span>
								<span className="truncate">{wp.title.split(" ")[0]}</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
