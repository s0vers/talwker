"use client";

import { useState } from "react";
import {
	LuArrowRight,
	LuCheck,
	LuCompass,
	LuOrbit,
	LuSparkles
} from "react-icons/lu";
import { Link } from "@/i18n/navigation";
import { OBSERVATORY_COPY } from "../content/observatory-copy";
import { cn } from "@/lib/utils";

const TARGET_PHENOMENA = [
	{
		id: "galactic",
		name: "Galactic Core Zenith",
		zone: "Atacama / Chile",
		nights: "7 Nights"
	},
	{
		id: "aurora",
		name: "Geomagnetic Aurora Borealis",
		zone: "Tromsø / Norway",
		nights: "6 Nights"
	},
	{
		id: "meteor",
		name: "Perseid Meteor Stream Peak",
		zone: "Fuji / Japan",
		nights: "5 Nights"
	},
	{
		id: "zodiacal",
		name: "Zodiacal Light Cone",
		zone: "Santorini / Greece",
		nights: "6 Nights"
	}
];

const BASECAMP_TIERS = [
	{
		id: "bivouac",
		name: "High-Altitude Puna Bivouac",
		altitude: "5,050m",
		rating: "Extreme Rugged"
	},
	{
		id: "dome",
		name: "Geothermal Glass Igloo",
		altitude: "1,200m",
		rating: "Alpine Luxury"
	},
	{
		id: "villa",
		name: "Astronomical Research Suite",
		altitude: "2,400m",
		rating: "Private Reserve"
	}
];

const OPTICAL_RIGS = [
	{ id: "cassegrain", name: "8″ Schmidt-Cassegrain Astrograph" },
	{ id: "cmos", name: "Full-Frame Cooled CMOS Sensor Rig" },
	{ id: "binoculars", name: "Image-Stabilized Starlight Binos" }
];

export function ObservatoryInvitation() {
	const [selectedTarget, setSelectedTarget] = useState(0);
	const [selectedTier, setSelectedTier] = useState(0);
	const [selectedRig, setSelectedRig] = useState(0);

	const target = TARGET_PHENOMENA[selectedTarget];
	const tier = BASECAMP_TIERS[selectedTier];
	const rig = OPTICAL_RIGS[selectedRig];
	const inquiryParams = new URLSearchParams({
		topic: "other",
		message: `I'd like to discuss a night-sky journey.\n\nDestination: ${target.name} (${target.zone})\nStay: ${tier.name}\nViewing gear: ${rig.name}\n\nPreferred dates and questions: `
	});
	const inquiryHref = `/contact?${inquiryParams.toString()}#contact-form`;

	return (
		<section
			id="observatory-invitation"
			className="pad-x relative w-full overflow-hidden bg-[#040404] py-28 text-white"
		>
			<div className="relative z-10 mx-auto max-w-5xl space-y-12">
				{/* Masthead Header */}
				<div className="mx-auto max-w-3xl space-y-4 text-center">
					<div className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 font-mono text-xs tracking-widest text-orange-400 uppercase">
						<LuOrbit className="h-3.5 w-3.5" />
						<span>{OBSERVATORY_COPY.invitation.badge}</span>
					</div>

					<h2 className="text-4xl leading-[1.04] font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
						{OBSERVATORY_COPY.invitation.title}
					</h2>

					<p className="text-base leading-relaxed font-light text-white/70 sm:text-lg">
						{OBSERVATORY_COPY.invitation.lead}
					</p>
				</div>

				{/* ========================================================= */}
				{/* INTERACTIVE EXPEDITION ARCHITECTURE BUILDER */}
				{/* ========================================================= */}
				<div className="space-y-8 rounded-3xl border border-white/15 bg-[#080808] p-6 sm:p-10">
					<div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 font-mono text-xs text-white/60">
						<span className="flex items-center gap-2 text-orange-400">
							<LuSparkles className="h-4 w-4" />
							BUILD YOUR NIGHT-SKY JOURNEY
						</span>
						<span>3 CHOICES</span>
					</div>

					{/* Step 1: Target Phenomenon */}
					<fieldset className="space-y-3">
						<legend className="block font-mono text-xs tracking-wider text-white/60 uppercase">
							1. What would you like to see?
						</legend>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
							{TARGET_PHENOMENA.map((p, idx) => (
								<button
									key={p.id}
									type="button"
									aria-pressed={selectedTarget === idx}
									onClick={() => setSelectedTarget(idx)}
									className={cn(
										"rounded-xl border p-4 text-left transition-all",
										selectedTarget === idx
											? "border-orange-500/80 bg-orange-500/15 text-white"
											: "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white"
									)}
								>
									<div className="mb-1 font-mono text-xs text-orange-400">
										{p.zone}
									</div>
									<div className="text-sm leading-snug font-medium text-white">
										{p.name}
									</div>
									<div className="mt-1 font-mono text-[11px] text-white/60">
										{p.nights}
									</div>
								</button>
							))}
						</div>
					</fieldset>

					{/* Step 2: Basecamp & Altitude Tier */}
					<fieldset className="space-y-3">
						<legend className="block font-mono text-xs tracking-wider text-white/60 uppercase">
							2. Where would you like to stay?
						</legend>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
							{BASECAMP_TIERS.map((b, idx) => (
								<button
									key={b.id}
									type="button"
									aria-pressed={selectedTier === idx}
									onClick={() => setSelectedTier(idx)}
									className={cn(
										"rounded-xl border p-4 text-left transition-all",
										selectedTier === idx
											? "border-orange-500/80 bg-orange-500/15 text-white"
											: "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white"
									)}
								>
									<div className="mb-1 font-mono text-xs text-orange-400">
										{b.altitude} ALT
									</div>
									<div className="text-sm leading-snug font-medium text-white">
										{b.name}
									</div>
									<div className="mt-1 font-mono text-[11px] text-white/60">
										{b.rating}
									</div>
								</button>
							))}
						</div>
					</fieldset>

					{/* Step 3: Optical Instrumentation Rig */}
					<fieldset className="space-y-3">
						<legend className="block font-mono text-xs tracking-wider text-white/60 uppercase">
							3. Choose your viewing gear
						</legend>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
							{OPTICAL_RIGS.map((r, idx) => (
								<button
									key={r.id}
									type="button"
									aria-pressed={selectedRig === idx}
									onClick={() => setSelectedRig(idx)}
									className={cn(
										"rounded-xl border p-4 text-left transition-all",
										selectedRig === idx
											? "border-orange-500/80 bg-orange-500/15 text-white"
											: "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white"
									)}
								>
									<div className="mb-1 font-mono text-xs text-orange-400">
										OPTIC RIG 0{idx + 1}
									</div>
									<div className="text-xs font-medium text-white sm:text-sm">
										{r.name}
									</div>
								</button>
							))}
						</div>
					</fieldset>

					{/* Dynamic Custom Expedition Manifest Summary */}
					<div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-black/60 p-6 lg:flex-row lg:items-center">
						<div className="space-y-1">
							<div className="flex items-center gap-2 font-mono text-xs text-orange-400">
								<LuCheck className="h-4 w-4" />
								<span>YOUR INQUIRY SUMMARY</span>
							</div>
							<div className="text-lg font-medium text-white sm:text-xl">
								{target.name} ({target.zone})
							</div>
							<div className="font-mono text-xs text-white/50">
								{tier.name} • {rig.name}
							</div>
						</div>

						{/* Action Triggers */}
						<div className="flex w-full flex-wrap items-center gap-3 lg:w-auto">
							<Link
								href={inquiryHref}
								className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-xs font-semibold tracking-[0.15em] text-[#050505] uppercase transition-colors duration-200 hover:bg-orange-600 sm:w-auto"
							>
								<span>DISPATCH EXPEDITION INQUIRY</span>
								<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>

							<Link
								href={inquiryHref}
								className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-xs font-medium tracking-[0.15em] text-white uppercase transition-colors hover:border-white/40 hover:bg-white/10 sm:w-auto"
							>
								<LuCompass className="h-4 w-4 text-orange-400" />
								<span>CONCIERGE</span>
							</Link>
						</div>
					</div>
				</div>

				{/* Footnote Seal */}
				<div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-6 font-mono text-xs text-white/60 sm:flex-row">
					<span>TALKWER NOCTURNAL OBSERVATORY</span>
					<span className="text-orange-400/80">
						COSMIC EXPLORATION DIVISION // 2026
					</span>
					<span>SAMPLE EXPEDITION CONFIGURATOR</span>
				</div>
			</div>
		</section>
	);
}
