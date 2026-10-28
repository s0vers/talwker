"use client";

import Image from "next/image";
import { useState } from "react";
import {
	LuArrowUpRight,
	LuCompass,
	LuCrosshair,
	LuMapPin,
	LuMoon,
	LuSparkles
} from "react-icons/lu";
import { Link } from "@/i18n/navigation";
import { CELESTIAL_WAYPOINTS } from "../content/celestial-data";
import { OBSERVATORY_COPY } from "../content/observatory-copy";
import { cn } from "@/lib/utils";

export function NocturnalWaypoints() {
	const [activeStationIndex, setActiveStationIndex] = useState(0);
	const [activeFilter, setActiveFilter] = useState<
		"optical" | "infrared" | "constellation"
	>("optical");
	const activeStation = CELESTIAL_WAYPOINTS[activeStationIndex];

	return (
		<section
			id="nocturnal-waypoints"
			className="pad-x relative w-full overflow-hidden border-b border-white/[0.08] bg-[#050505] py-24 text-white"
		>
			{/* Section Header */}
			<div className="mb-14 max-w-3xl">
				<div className="mb-3 inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-orange-400 uppercase">
					<LuSparkles className="h-3.5 w-3.5 text-orange-500" />
					<span>{OBSERVATORY_COPY.waypoints.badge}</span>
				</div>
				<h2 className="text-3xl leading-tight font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
					{OBSERVATORY_COPY.waypoints.title}
				</h2>
				<p className="mt-4 text-base leading-relaxed font-light text-white/60 sm:text-lg">
					{OBSERVATORY_COPY.waypoints.subtitle}
				</p>
				<p className="mt-3 text-sm leading-relaxed text-white/70">
					Bortle measures sky darkness: lower numbers mean darker skies.
				</p>
			</div>

			{/* ========================================================= */}
			{/* 1. INTERACTIVE PLANETARY OBSERVATORY CONSOLE (Main Stage) */}
			{/* ========================================================= */}
			<div className="mb-20 overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a]">
				{/* Top Console Bar */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-black/80 p-4 sm:p-5">
					<div className="flex items-center gap-3">
						<span className="relative flex h-2 w-2">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75 motion-reduce:animate-none" />
							<span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
						</span>
						<span className="font-mono text-xs font-medium tracking-wider text-white/90 uppercase">
							SANCTUARY CONSOLE // ACTIVE STATION: {activeStation.title}
						</span>
					</div>

					{/* Optical Filter Mode Switcher */}
					<div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-1 font-mono text-xs">
						<span className="hidden px-2 text-white/60 sm:inline">
							VIEWPORT MODE:
						</span>
						<button
							type="button"
							onClick={() => setActiveFilter("optical")}
							aria-pressed={activeFilter === "optical"}
							className={cn(
								"min-h-11 rounded-lg px-3 py-1 transition-[background-color,color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
								activeFilter === "optical"
									? "bg-orange-500 font-semibold text-black shadow-[0_0_10px_rgba(249,115,22,0.4)]"
									: "text-white/50 hover:text-white"
							)}
						>
							NATURAL SKY
						</button>
						<button
							type="button"
							onClick={() => setActiveFilter("infrared")}
							aria-pressed={activeFilter === "infrared"}
							className={cn(
								"min-h-11 rounded-lg px-3 py-1 transition-[background-color,color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
								activeFilter === "infrared"
									? "bg-orange-500/90 font-semibold text-black shadow-[0_0_10px_rgba(249,115,22,0.4)]"
									: "text-white/50 hover:text-white"
							)}
						>
							INFRARED DUST
						</button>
						<button
							type="button"
							onClick={() => setActiveFilter("constellation")}
							aria-pressed={activeFilter === "constellation"}
							className={cn(
								"min-h-11 rounded-lg px-3 py-1 transition-[background-color,color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
								activeFilter === "constellation"
									? "bg-orange-500 font-semibold text-black shadow-[0_0_10px_rgba(249,115,22,0.4)]"
									: "text-white/50 hover:text-white"
							)}
						>
							ASTRAL GRID
						</button>
					</div>
				</div>

				{/* Main Stage Grid: Left Selector Tabs + Center Telescope Viewport + Right Telemetry */}
				<div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
					{/* Left: Station Quick Select List */}
					<div className="flex flex-col justify-between space-y-4 border-b border-white/10 bg-black/40 p-6 sm:p-8 lg:col-span-4 lg:border-r lg:border-b-0">
						<div className="space-y-3">
							<div className="mb-2 font-mono text-[11px] tracking-widest text-white/60 uppercase">
								SELECT OBSERVATORY STATION:
							</div>
							{CELESTIAL_WAYPOINTS.map((wp, idx) => (
								<button
									key={wp.id}
									type="button"
									onClick={() => setActiveStationIndex(idx)}
									aria-pressed={activeStationIndex === idx}
									className={cn(
										"w-full rounded-xl border p-4 text-left transition-all duration-300",
										activeStationIndex === idx
											? "border-orange-500/70 bg-orange-500/10"
											: "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
									)}
								>
									<div className="mb-1 flex items-center justify-between font-mono text-xs">
										<span className="font-semibold text-orange-400">
											STATION 0{idx + 1}
										</span>
										<span className="text-white/60">{wp.elevation}</span>
									</div>
									<div className="text-base font-medium text-white">
										{wp.title}
									</div>
									<div className="mt-0.5 font-mono text-xs text-white/50">
										{wp.country}
									</div>

									{/* Bortle Meter */}
									<div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-white/60">
										<span>BORTLE {wp.bortleClass}</span>
										<div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
											<div
												className="h-full rounded-full bg-orange-500"
												style={{ width: `${(4 - wp.bortleClass) * 33 + 33}%` }}
											/>
										</div>
										<span className="text-orange-400">99.8% CLEAR</span>
									</div>
								</button>
							))}
						</div>

						<div className="flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-xs text-white/60">
							<span>4 GLOBAL SANCTUARIES</span>
							<span className="text-orange-400">ZERO CONTAMINATION</span>
						</div>
					</div>

					{/* Center & Right: High-Res Interactive Viewport */}
					<div className="relative flex flex-col justify-between bg-black lg:col-span-8">
						{/* Photographic Stage with Simulated Mode Shifting */}
						<div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]">
							<Image
								src={activeStation.image}
								alt={activeStation.title}
								fill
								sizes="(max-width: 1024px) 100vw, 65vw"
								className={cn(
									"object-cover transition-[filter] duration-[360ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
									activeFilter === "infrared" &&
										"contrast-150 hue-rotate-[320deg] saturate-200",
									activeFilter === "constellation" &&
										"brightness-90 contrast-125"
								)}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/40" />

							{/* Constellation Overlay Grid when active */}
							<div
								className={cn(
									"pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-[360ms] motion-reduce:transition-none",
									activeFilter === "constellation" ? "opacity-100" : "opacity-0"
								)}
								aria-hidden="true"
							>
								<svg
									viewBox="0 0 500 300"
									className="h-full w-full fill-none stroke-current text-indigo-400/80"
								>
									<line
										x1="80"
										y1="60"
										x2="140"
										y2="120"
										strokeWidth="1"
										strokeDasharray="3 3"
									/>
									<line x1="140" y1="120" x2="220" y2="90" strokeWidth="1.5" />
									<line x1="220" y1="90" x2="310" y2="160" strokeWidth="1" />
									<line
										x1="310"
										y1="160"
										x2="420"
										y2="100"
										strokeWidth="1.5"
										strokeDasharray="4 4"
									/>
									<circle
										cx="80"
										cy="60"
										r="4"
										fill="white"
										className="animate-pulse motion-reduce:animate-none"
									/>
									<circle cx="140" cy="120" r="5" fill="#f97316" />
									<circle cx="220" cy="90" r="6" fill="white" />
									<circle cx="310" cy="160" r="5" fill="#818cf8" />
									<circle cx="420" cy="100" r="4" fill="white" />
									<text
										x="230"
										y="85"
										fill="#f97316"
										fontSize="10"
										fontFamily="monospace"
									>
										CRUX MAJOR // ZENITH
									</text>
									<text
										x="320"
										y="175"
										fill="#818cf8"
										fontSize="10"
										fontFamily="monospace"
									>
										CARINA NEBULA RIFT
									</text>
								</svg>
							</div>

							{/* Infrared Dust Cloud Overlay when active */}
							<div
								className={cn(
									"pointer-events-none absolute inset-0 bg-gradient-to-r from-orange-600/30 via-amber-500/30 to-orange-500/15 mix-blend-screen transition-opacity duration-[360ms] motion-reduce:transition-none",
									activeFilter === "infrared" ? "opacity-100" : "opacity-0"
								)}
								aria-hidden="true"
							/>

							{/* Viewport Floating Badges */}
							<div className="absolute top-6 left-6 flex flex-wrap items-center gap-2">
								<span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/80 px-3.5 py-1 font-mono text-xs text-white backdrop-blur-md">
									<LuCrosshair className="h-3.5 w-3.5 text-orange-400" />
									<span>{activeStation.coordinates}</span>
								</span>
								<span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/80 px-3 py-1 font-mono text-xs text-orange-300 backdrop-blur-md">
									<LuMoon className="h-3.5 w-3.5" />
									<span>BORTLE {activeStation.bortleClass}</span>
								</span>
							</div>

							<div className="absolute right-6 bottom-6 left-6 flex items-end justify-between gap-4">
								<div className="max-w-lg">
									<h3 className="text-2xl font-medium text-white drop-shadow-md sm:text-3xl">
										{activeStation.title}
									</h3>
									<p className="mt-1 line-clamp-2 text-xs font-light text-white/80 drop-shadow">
										{activeStation.description}
									</p>
								</div>

								<Link
									href={`/destinations/${activeStation.slug}`}
									className="group/link inline-flex shrink-0 items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 font-mono text-xs tracking-wider text-black uppercase transition-colors hover:bg-orange-600"
								>
									<span>EXPEDITION DOSSIER</span>
									<LuArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
								</Link>
							</div>
						</div>

						{/* Telemetry Footer Bar */}
						<div className="grid grid-cols-2 gap-4 border-t border-white/10 bg-[#0c0c0c] p-6 font-mono text-xs sm:grid-cols-3">
							<div>
								<span className="block text-[10px] text-white/60 uppercase">
									SKY BRIGHTNESS
								</span>
								<span className="font-medium text-white">
									{activeStation.focalSpecs.skyBrightness}
								</span>
							</div>
							<div>
								<span className="block text-[10px] text-white/60 uppercase">
									OBSERVATION WINDOW
								</span>
								<span className="font-medium text-white">
									{activeStation.optimalWindow.split("//")[0]}
								</span>
							</div>
							<div className="col-span-2 sm:col-span-1">
								<span className="block text-[10px] text-white/60 uppercase">
									RECOMMENDED OPTICS
								</span>
								<span className="font-medium text-orange-400">
									{activeStation.focalSpecs.aperture}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* ========================================================= */}
			{/* 2. COMPREHENSIVE 4-SANCTUARY FIELD CARDS GRID */}
			{/* ========================================================= */}
			<div className="mt-8">
				<div className="mb-8 flex items-center justify-between border-b border-white/[0.08] pb-4">
					<h3 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
						All Planetary Dark-Sky Stations
					</h3>
					<span className="font-mono text-xs text-orange-400">
						4 EXPEDITIONS AVAILABLE
					</span>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					{CELESTIAL_WAYPOINTS.map((waypoint, index) => (
						<article
							key={waypoint.id}
							className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] transition-colors duration-200 hover:border-orange-500/50"
						>
							{/* Image Container */}
							<div className="relative aspect-[16/10] w-full overflow-hidden">
								<Image
									src={waypoint.image}
									alt={waypoint.title}
									fill
									sizes="(max-width: 768px) 100vw, 50vw"
									className="object-cover transition-transform duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />

								{/* Top Badges */}
								<div className="absolute top-4 right-4 left-4 flex flex-wrap items-center gap-2">
									<span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/80 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-md">
										<LuMoon className="h-3.5 w-3.5 text-orange-400" />
										<span>BORTLE {waypoint.bortleClass}</span>
									</span>
									<span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/80 px-2.5 py-1 font-mono text-[11px] text-white/80 backdrop-blur-md">
										<LuCompass className="h-3 w-3 text-orange-400" />
										<span>{waypoint.elevation}</span>
									</span>
									<span className="rounded-full border border-white/10 bg-black/80 px-3 py-1 font-mono text-[11px] text-white/70 backdrop-blur-md">
										{waypoint.coordinates}
									</span>
								</div>
							</div>

							{/* Card Body */}
							<div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
								<div>
									<div className="mb-1 flex items-center gap-2 font-mono text-xs text-white/60">
										<LuMapPin className="h-3 w-3 text-orange-500" />
										<span>
											{waypoint.region}, {waypoint.country}
										</span>
										<span className="text-white/20">•</span>
										<span className="font-medium text-orange-400">
											STATION 0{index + 1}
										</span>
									</div>

									<h4 className="text-2xl font-medium tracking-tight text-white transition-colors group-hover:text-orange-400">
										{waypoint.title}
									</h4>

									<p className="mt-3 text-sm leading-relaxed font-light text-white/70">
										{waypoint.description}
									</p>

									{/* Highlight Chips */}
									<div className="mt-5 flex flex-wrap gap-2">
										{waypoint.focalHighlights.map(highlight => (
											<span
												key={highlight}
												className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-white/80"
											>
												<span className="h-1 w-1 rounded-full bg-orange-400" />
												{highlight}
											</span>
										))}
									</div>
								</div>

								{/* Card Footer Link */}
								<div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-5 sm:flex-row sm:items-center">
									<div className="font-mono text-[11px] text-white/50">
										<span className="block text-white/60">
											OBSERVATION WINDOW
										</span>
										<span className="text-white/90">
											{waypoint.optimalWindow}
										</span>
									</div>

									<Link
										href={`/destinations/${waypoint.slug}`}
										className="group/link inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs tracking-wider text-white uppercase transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-black"
									>
										<span>EXPLORE DOSSIER</span>
										<LuArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
									</Link>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
