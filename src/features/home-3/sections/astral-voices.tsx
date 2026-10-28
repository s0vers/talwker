"use client";

import { useState } from "react";
import {
	LuActivity,
	LuCompass,
	LuPause,
	LuPlay,
	LuRadio,
	LuSparkles
} from "react-icons/lu";
import { ASTRAL_VOICES } from "../content/celestial-data";
import { OBSERVATORY_COPY } from "../content/observatory-copy";
import { cn } from "@/lib/utils";

const RADIO_FREQUENCIES = [
	{
		id: "f1",
		freq: "1420.405 MHz",
		band: "HYDROGEN LINE",
		target: "PARANAL COSMIC MERIDIAN",
		snr: "+28.4 dB"
	},
	{
		id: "f2",
		freq: "22.235 GHz",
		band: "WATER VAPOR MASER",
		target: "TROMSØ ARCTIC OVAL",
		snr: "+34.1 dB"
	},
	{
		id: "f3",
		freq: "4.830 GHz",
		band: "INTERSTELLAR DUST",
		target: "PACIFIC HORIZON WAYFINDING",
		snr: "+21.9 dB"
	}
];

export function AstralVoices() {
	const [activeVoiceIndex, setActiveVoiceIndex] = useState(0);
	const [isSignalAnimating, setIsSignalAnimating] = useState(true);
	const activeVoice = ASTRAL_VOICES[activeVoiceIndex];
	const activeFreq = RADIO_FREQUENCIES[activeVoiceIndex];

	return (
		<section
			id="astral-voices"
			className="pad-x relative w-full overflow-hidden border-b border-white/[0.08] bg-[#040404] py-28 text-white"
		>
			{/* Ambient Cosmic Gradient */}
			<div className="pointer-events-none absolute top-1/2 left-1/2 h-[550px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[150px]" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

			{/* Section Header */}
			<div className="mb-14 max-w-3xl">
				<div className="mb-3 inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-orange-400 uppercase">
					<LuSparkles className="h-3.5 w-3.5 text-orange-500" />
					<span>{OBSERVATORY_COPY.voices.badge}</span>
				</div>
				<h2 className="text-3xl leading-tight font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
					{OBSERVATORY_COPY.voices.title}
				</h2>
				<p className="mt-4 text-base leading-relaxed font-light text-white/60 sm:text-lg">
					{OBSERVATORY_COPY.voices.subtitle}
				</p>
			</div>

			{/* ========================================================= */}
			{/* DEEP-SPACE RADIO OBSERVATORY FREQUENCY RECEIVER TERMINAL */}
			{/* ========================================================= */}
			<div className="overflow-hidden rounded-3xl border border-white/15 bg-[#080808] shadow-[0_0_60px_rgba(0,0,0,0.8)]">
				{/* Top Radio Frequency Tuner Rack */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-black/80 p-4 sm:p-6">
					<div className="flex items-center gap-3">
						<LuRadio className="h-4 w-4 text-orange-500 motion-safe:animate-pulse" />
						<span className="font-mono text-xs font-semibold tracking-widest text-white/90 uppercase">
							RADIO ASTRONOMY DECODER // INTERCEPT LOG
						</span>
					</div>

					{/* Frequency Selector Buttons */}
					<div
						role="group"
						aria-label="Illustrative radio frequencies"
						className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1 font-mono text-xs"
					>
						{RADIO_FREQUENCIES.map((f, idx) => (
							<button
								key={f.id}
								type="button"
								onClick={() => setActiveVoiceIndex(idx)}
								aria-pressed={activeVoiceIndex === idx}
								className={cn(
									"flex min-h-11 items-center gap-2 rounded-lg px-3 py-1.5 transition-all",
									activeVoiceIndex === idx
										? "bg-orange-500 font-semibold text-black shadow-[0_0_12px_rgba(249,115,22,0.4)]"
										: "text-white/50 hover:text-white"
								)}
							>
								<span className="h-1.5 w-1.5 rounded-full bg-current" />
								<span>{f.freq}</span>
							</button>
						))}
					</div>
				</div>

				{/* Main Receiver Content Box */}
				<div className="grid grid-cols-1 items-center gap-8 p-6 sm:p-10 lg:grid-cols-12">
					{/* Left: Oscilloscope Frequency Waveform Display */}
					<div className="space-y-6 rounded-2xl border border-white/10 bg-black/90 p-6 lg:col-span-4">
						<div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[11px] text-white/60">
							<span className="flex items-center gap-1.5 text-orange-400">
								<LuActivity className="h-3.5 w-3.5" />
								SIGNAL STRENGTH
							</span>
							<span>SNR: {activeFreq.snr}</span>
						</div>

						{/* Animated Oscilloscope Display */}
						<div className="relative flex h-28 w-full flex-col justify-between overflow-hidden rounded-xl border border-orange-500/30 bg-orange-500/5 p-3">
							<div className="absolute inset-0 bg-[radial-gradient(#f9731615_1px,transparent_1px)] [background-size:8px_8px]" />

							{/* Illustrative Signal Bars */}
							<div className="relative z-10 flex h-full items-end justify-between gap-1 pt-4">
								{[
									30, 60, 45, 85, 95, 40, 70, 100, 65, 80, 50, 90, 75, 45, 85,
									60
								].map((barH, barIdx) => (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: animated bars
										key={barIdx}
										className={cn(
											"flex-1 rounded-full bg-gradient-to-t from-orange-600 to-amber-300 transition-all duration-200 motion-reduce:animate-none!",
											isSignalAnimating ? "opacity-100" : "opacity-30"
										)}
										style={{
											height: isSignalAnimating ? `${barH}%` : "15%",
											animation: isSignalAnimating
												? `pulse 1.2s infinite ease-in-out ${barIdx * 0.06}s`
												: "none"
										}}
									/>
								))}
							</div>

							<div className="relative z-10 flex items-center justify-between font-mono text-[9px] text-orange-400/80">
								<span>CARRIER: {activeFreq.band}</span>
								<span>LOCK: 100%</span>
							</div>
						</div>

						{/* Visualization Control Bar */}
						<div className="flex items-center justify-between pt-2">
							<button
								type="button"
								onClick={() => setIsSignalAnimating(prev => !prev)}
								aria-pressed={isSignalAnimating}
								className="inline-flex min-h-11 items-center gap-2 rounded-full border border-orange-500/50 bg-orange-500/10 px-4 py-2 font-mono text-xs text-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all hover:bg-orange-500 hover:text-black"
							>
								{isSignalAnimating ? (
									<>
										<LuPause className="h-3.5 w-3.5" />
										<span>PAUSE VISUALIZATION</span>
									</>
								) : (
									<>
										<LuPlay className="h-3.5 w-3.5" />
										<span>RESUME VISUALIZATION</span>
									</>
								)}
							</button>

							<span className="flex items-center gap-1 font-mono text-[11px] text-white/60">
								VISUAL SIGNAL SIMULATION
							</span>
						</div>
					</div>

					{/* Right: Field Transcript & Astronomer Voice Reflection */}
					<div className="flex flex-col justify-between space-y-6 lg:col-span-8">
						<div className="space-y-4">
							<div className="flex items-center gap-3 font-mono text-xs text-white/60">
								<span className="font-semibold text-orange-400">
									{activeVoice.year}
								</span>
								<span>•</span>
								<span className="flex items-center gap-1">
									<LuCompass className="h-3 w-3 text-orange-500" />
									{activeVoice.coordinates}
								</span>
								<span>•</span>
								<span className="text-white/60">{activeFreq.target}</span>
							</div>

							{/* Quote */}
							<blockquote className="text-xl leading-relaxed font-light tracking-tight text-white sm:text-2xl lg:text-3xl">
								&ldquo;{activeVoice.quote}&rdquo;
							</blockquote>
						</div>

						{/* Author Footnote */}
						<div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
							<div>
								<div className="text-lg font-medium text-white">
									{activeVoice.author}
								</div>
								<div className="mt-0.5 font-mono text-xs text-orange-400">
									{activeVoice.role}
								</div>
								<div className="font-mono text-xs text-white/60">
									{activeVoice.observatory}
								</div>
							</div>

							<div className="rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2 font-mono text-xs text-white/60">
								OBSERVATORY ARCHIVE RECORD Nº 0{activeVoiceIndex + 1}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
