"use client";

import Image from "next/image";
import { useState } from "react";
import { LuCamera, LuClock, LuSparkles, LuSun } from "react-icons/lu";
import { TWILIGHT_PHASES } from "../content/celestial-data";
import { OBSERVATORY_COPY } from "../content/observatory-copy";
import { cn } from "@/lib/utils";

export function TwilightChronometer() {
	const [activePhaseIndex, setActivePhaseIndex] = useState(3); // Default to Astronomical Midnight
	const activePhase = TWILIGHT_PHASES[activePhaseIndex];

	return (
		<section
			id="twilight-chronometer"
			className="pad-x relative w-full overflow-hidden border-b border-white/[0.08] bg-[#050505] py-24 text-white transition-colors duration-700"
		>
			{/* Dynamic Phase Ambient Light Background */}
			<div
				className={cn(
					"pointer-events-none absolute top-1/2 left-1/2 h-[650px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] transition-all duration-700",
					activePhaseIndex === 0 && "bg-amber-500/25",
					activePhaseIndex === 1 && "bg-white/10",
					activePhaseIndex === 2 && "bg-orange-500/15",
					activePhaseIndex === 3 && "bg-orange-500/20"
				)}
			/>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

			{/* Section Header */}
			<div className="mb-12 max-w-3xl">
				<div className="mb-3 inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-orange-400 uppercase">
					<LuSparkles className="h-3.5 w-3.5 text-orange-500" />
					<span>{OBSERVATORY_COPY.chronometer.badge}</span>
				</div>
				<h2 className="text-3xl leading-tight font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
					{OBSERVATORY_COPY.chronometer.title}
				</h2>
				<p className="mt-4 text-base leading-relaxed font-light text-white/60 sm:text-lg">
					{OBSERVATORY_COPY.chronometer.subtitle}
				</p>
			</div>

			{/* 4-Phase Solar Horizon Scrubber Tabs */}
			<div className="mb-10 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
				{TWILIGHT_PHASES.map((phase, idx) => (
					<button
						key={phase.id}
						type="button"
						onClick={() => setActivePhaseIndex(idx)}
						aria-pressed={activePhaseIndex === idx}
						className={cn(
							"group relative rounded-xl border p-4 text-left transition-all duration-300 sm:p-5",
							activePhaseIndex === idx
								? "border-orange-500/80 bg-white/[0.07] shadow-[0_0_25px_rgba(249,115,22,0.2)]"
								: "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
						)}
					>
						<div className="mb-2 flex items-center justify-between gap-2">
							<span
								className={cn(
									"font-mono text-[10px] font-semibold tracking-widest uppercase",
									activePhaseIndex === idx ? "text-orange-400" : "text-white/60"
								)}
							>
								{phase.phaseNumber}
							</span>
							<span
								className={cn(
									"h-2 w-2 rounded-full transition-all",
									activePhaseIndex === idx
										? "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
										: "bg-white/20"
								)}
							/>
						</div>

						<div className="truncate text-sm font-medium text-white sm:text-base">
							{phase.name.split("//")[0]}
						</div>

						<div className="mt-2 flex items-center justify-between border-t border-white/[0.06] pt-2 font-mono text-xs text-white/50">
							<span>ANGLE {phase.solarAngle}</span>
							<span
								className={activePhaseIndex === idx ? "text-orange-400" : ""}
							>
								{idx === 0
									? "2800K"
									: idx === 1
										? "5400K"
										: idx === 2
											? "8200K"
											: "VOID"}
							</span>
						</div>
					</button>
				))}
			</div>

			{/* Interactive Atmospheric Spectrum Stage */}
			<div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a] shadow-2xl">
				<div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
					{/* Left Visual Plate: Full Photographic Spectrum Viewport */}
					<div className="relative min-h-[380px] w-full overflow-hidden bg-black sm:min-h-[460px] lg:col-span-7 lg:min-h-[540px]">
						<Image
							src={activePhase.image}
							alt={activePhase.name}
							fill
							sizes="(max-width: 1024px) 100vw, 58vw"
							className="object-cover transition-all duration-700"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/40" />
						<div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-[#0a0a0a] lg:block" />

						{/* Top Solar Angle HUD Stamp */}
						<div className="absolute top-6 left-6 flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-3.5 py-1.5 font-mono text-xs text-white backdrop-blur-md">
							<LuSun className="h-4 w-4 text-orange-400" />
							<span>SOLAR DEPRESSION: {activePhase.solarAngle}</span>
						</div>

						{/* Bottom Starlight Density Badge */}
						<div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-3.5 py-1.5 font-mono text-xs text-white/90 backdrop-blur-md">
							<LuSparkles className="h-4 w-4 text-amber-400" />
							<span>STAR DENSITY: {activePhase.starCount}</span>
						</div>
					</div>

					{/* Right Column: Optics, Spectrum & Protocol Guides */}
					<div className="flex flex-col justify-between bg-[#0a0a0a] p-8 sm:p-10 lg:col-span-5">
						<div>
							<div className="mb-2 inline-flex items-center gap-2 font-mono text-xs tracking-widest text-orange-400 uppercase">
								<LuClock className="h-3.5 w-3.5" />
								<span>{activePhase.phaseNumber} PROTOCOL</span>
							</div>

							<h3 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
								{activePhase.name}
							</h3>
							<p className="mt-1 font-mono text-xs text-white/50">
								{activePhase.subTitle}
							</p>

							{/* Optical Parameters Box */}
							<div className="mt-6 space-y-3.5">
								<div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
									<div className="mb-1 font-mono text-[10px] tracking-wider text-white/60 uppercase">
										VISUAL HORIZON CONDITION
									</div>
									<p className="text-xs leading-relaxed font-light text-white/80">
										{activePhase.visualAtmosphere}
									</p>
								</div>

								<div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
									<div className="mb-1 font-mono text-[10px] tracking-wider text-white/60 uppercase">
										ASTRONOMICAL VISIBILITY INDEX
									</div>
									<p className="text-xs leading-relaxed font-light text-white/80">
										{activePhase.navigationalVisibility}
									</p>
								</div>
							</div>
						</div>

						{/* Expedition Field Advice Callout */}
						<div className="mt-6 border-t border-white/[0.08] pt-6">
							<div className="flex items-start gap-3 rounded-xl border border-orange-500/20 bg-orange-500/10 p-4 font-mono text-xs text-orange-300">
								<LuCamera className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
								<div>
									<span className="mb-0.5 block text-[11px] font-semibold tracking-wider text-orange-300 uppercase">
										PHOTOGRAPHIC & NAVIGATION PROTOCOL:
									</span>
									<span className="font-sans font-light text-white/80">
										{activePhase.expeditionAdvice}
									</span>
								</div>
							</div>

							<div className="mt-4 flex items-center justify-between font-mono text-[11px] text-white/60">
								<span>SPECTRUM TEMP: {activePhase.colorTemperature}</span>
								<span className="text-orange-400">OPTIMAL ADAPTATION</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
