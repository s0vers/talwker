"use client";

import { useMemo, useState } from "react";
import {
	LuActivity,
	LuCircleCheck,
	LuCompass,
	LuMountain,
	LuPackage,
	LuSparkles,
} from "react-icons/lu";
import { ButtonWithIcon } from "@/shared/ui";
import { cn } from "@/lib/utils";

interface ArchetypeConfig {
	id: string;
	name: string;
	region: string;
	coordinates: string;
	elevationRange: string;
	elevationData: number[];
	gear: string[];
	highlights: string[];
	slug: string;
}

const ARCHETYPE_CONFIGS: ArchetypeConfig[] = [
	{
		id: "alpine",
		name: "High Alpine Traverse",
		region: "Patagonia & Andes Ridge",
		coordinates: "51.2532° S, 72.8814° W",
		elevationRange: "600m → 3,250m",
		elevationData: [600, 1200, 2400, 3250, 2800, 1900, 800],
		gear: ["Thermal Bivouac Shell", "Carbon Ice Axes", "Altimeter Chronograph"],
		highlights: ["Glacial moraine crossing", "High-altitude bivouac stargazing", "Granite spire photography"],
		slug: "patagonia",
	},
	{
		id: "archipelago",
		name: "Maritime Fjord Archipelago",
		region: "Lofoten & Nordic Coast",
		coordinates: "68.2355° N, 14.5682° E",
		elevationRange: "0m → 840m",
		elevationData: [0, 200, 650, 840, 420, 100, 0],
		gear: ["Gore-Tex Ocean Anorak", "Drybag Optics Kit", "Thermal Sea Boots"],
		highlights: ["Nocturnal fjord kayaking", "Red rorbu architectural stays", "Midnight sun long exposures"],
		slug: "iceland",
	},
	{
		id: "oasis",
		name: "Silk Oasis & Sandstone",
		region: "Sahara & Arabian Plateaus",
		coordinates: "26.6917° N, 37.9189° E",
		elevationRange: "300m → 1,100m",
		elevationData: [300, 550, 900, 1100, 750, 480, 300],
		gear: ["Fine Linen Keffiyeh", "Sand-Proof Optics Glass", "Handmade Leather Journal"],
		highlights: ["Carved monolith stargazing", "Bedouin tea ceremony", "Dune sea navigation"],
		slug: "amalfi-coast",
	},
	{
		id: "aurora",
		name: "Polar Aurora Wilderness",
		region: "Tromsø & Arctic Basin",
		coordinates: "69.6492° N, 18.9553° E",
		elevationRange: "100m → 1,400m",
		elevationData: [100, 400, 950, 1400, 1100, 600, 150],
		gear: ["-30°C Expedition Parka", "Sub-Zero Tripod Mitts", "Merino Wool Thermal Layers"],
		highlights: ["KP5 Aurora tracking", "Frozen lake snowshoe trek", "Geothermal hot spring reset"],
		slug: "iceland",
	},
];

const PACING_OPTIONS = [
	{ id: "contemplative", label: "Contemplative", days: 6, desc: "Deliberate pacing with dedicated photography half-days" },
	{ id: "dynamic", label: "Dynamic Traverse", days: 9, desc: "Active ridge trekking across multiple wilderness biomes" },
	{ id: "extended", label: "High Expedition", days: 12, desc: "Full immersion traverse with remote high camp overnights" },
];

export function AtelierJourneyWeaver() {
	const [selectedArchetypeId, setSelectedArchetypeId] = useState("alpine");
	const [selectedPacingId, setSelectedPacingId] = useState("dynamic");

	const activeArchetype = useMemo(
		() => ARCHETYPE_CONFIGS.find((a) => a.id === selectedArchetypeId) ?? ARCHETYPE_CONFIGS[0],
		[selectedArchetypeId],
	);

	const activePacing = useMemo(
		() => PACING_OPTIONS.find((p) => p.id === selectedPacingId) ?? PACING_OPTIONS[1],
		[selectedPacingId],
	);

	// Generate SVG path for dynamic elevation chart
	const svgPath = useMemo(() => {
		const data = activeArchetype.elevationData;
		const width = 500;
		const height = 140;
		const maxElev = 3500;
		const points = data.map((elev, i) => {
			const x = (i / (data.length - 1)) * width;
			const y = height - (elev / maxElev) * (height - 30) - 15;
			return `${x},${y}`;
		});
		return `M 0,${height} L ${points.join(" L ")} L ${width},${height} Z`;
	}, [activeArchetype]);

	const strokePath = useMemo(() => {
		const data = activeArchetype.elevationData;
		const width = 500;
		const height = 140;
		const maxElev = 3500;
		const points = data.map((elev, i) => {
			const x = (i / (data.length - 1)) * width;
			const y = height - (elev / maxElev) * (height - 30) - 15;
			return `${x},${y}`;
		});
		return `M ${points.join(" L ")}`;
	}, [activeArchetype]);

	return (
		<section
			id="journey-weaver"
			aria-labelledby="journey-weaver-title"
			className="relative bg-[#080808] py-20 md:py-36 border-t border-white/10 overflow-hidden"
		>
			<div className="mx-auto max-w-[1600px] pad-x space-y-12">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
					<div className="space-y-3">
						<div className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase text-orange-400">
							<LuSparkles className="h-3.5 w-3.5" />
							<span>INTERACTIVE EXPEDITION WEAVER</span>
						</div>
						<h2
							id="journey-weaver-title"
							className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
						>
							Engineer Your Travel Ethos
						</h2>
						<p className="max-w-xl text-sm sm:text-base text-white/60 leading-relaxed">
							Configure your preferred geographic terrain and expedition intensity to generate a tailored itinerary blueprint in real time.
						</p>
					</div>

					<div className="font-mono text-xs text-white/40 uppercase tracking-widest flex items-center gap-2">
						<LuCompass className="h-4 w-4 text-orange-400" />
						<span>CUSTOM ITINERARY MATRIX</span>
					</div>
				</div>

				{/* 2-Column Weaver Studio */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
					{/* Left Configuration Controls */}
					<div className="lg:col-span-6 space-y-8">
						{/* Step 1: Terrain Archetype */}
						<div className="space-y-4">
							<p className="font-mono text-xs uppercase tracking-widest text-orange-400 font-semibold">
								01 // SELECT TERRAIN ARCHETYPE
							</p>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								{ARCHETYPE_CONFIGS.map((arch) => {
									const isSelected = arch.id === selectedArchetypeId;
									return (
										<button
											key={arch.id}
											type="button"
											onClick={() => setSelectedArchetypeId(arch.id)}
											className={cn(
												"flex flex-col items-start p-4 rounded-2xl border text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
												isSelected
													? "border-orange-500 bg-[#121212] shadow-xl shadow-orange-500/10 ring-1 ring-orange-500"
													: "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]",
											)}
										>
											<div className="flex items-center justify-between w-full mb-2">
												<span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">{arch.region}</span>
												<span className={cn("h-2 w-2 rounded-full", isSelected ? "bg-orange-500" : "bg-white/20")} />
											</div>
											<p className="font-semibold text-white text-sm">{arch.name}</p>
											<p className="font-mono text-[11px] text-orange-400/90 mt-1">{arch.elevationRange}</p>
										</button>
									);
								})}
							</div>
						</div>

						{/* Step 2: Pacing & Duration */}
						<div className="space-y-4">
							<p className="font-mono text-xs uppercase tracking-widest text-orange-400 font-semibold">
								02 // EXPEDITION PACING & DURATION
							</p>

							<div className="space-y-2.5">
								{PACING_OPTIONS.map((pacing) => {
									const isSelected = pacing.id === selectedPacingId;
									return (
										<button
											key={pacing.id}
											type="button"
											onClick={() => setSelectedPacingId(pacing.id)}
											className={cn(
												"flex items-center justify-between w-full p-4 rounded-2xl border text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
												isSelected
													? "border-orange-500 bg-[#121212] ring-1 ring-orange-500"
													: "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]",
											)}
										>
											<div>
												<p className="font-semibold text-white text-sm">{pacing.label}</p>
												<p className="text-xs text-white/50">{pacing.desc}</p>
											</div>

											<div className="font-mono text-xs font-bold text-orange-400 shrink-0 pl-4">
												{pacing.days} DAYS
											</div>
										</button>
									);
								})}
							</div>
						</div>
					</div>

					{/* Right Real-Time Generated Manifest Card */}
					<div className="lg:col-span-6 rounded-3xl border border-white/12 bg-[#0c0c0c] p-6 sm:p-8 shadow-2xl space-y-6">
						<div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
							<div className="flex items-center gap-2 text-orange-400">
								<LuActivity className="h-4 w-4" />
								<span>GENERATED MANIFEST BLUEPRINT</span>
							</div>
							<span className="text-white/40">{activeArchetype.coordinates}</span>
						</div>

						{/* Manifest Title */}
						<div className="space-y-1">
							<p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
								CUSTOM {activePacing.days}-DAY BLUEPRINT
							</p>
							<h3 className="text-2xl font-bold tracking-tight text-white">
								{activeArchetype.name} · {activePacing.label}
							</h3>
						</div>

						{/* Dynamic Topography Elevation Profile Chart */}
						<div className="rounded-2xl border border-white/10 bg-black/60 p-4 space-y-2">
							<div className="flex items-center justify-between font-mono text-[10px] text-white/50">
								<span className="flex items-center gap-1">
									<LuMountain className="h-3 w-3 text-orange-400" />
									<span>ELEVATION PROFILE</span>
								</span>
								<span>MAX {activeArchetype.elevationRange.split("→")[1]}</span>
							</div>

							<div className="relative h-28 w-full">
								<svg
									viewBox="0 0 500 140"
									className="h-full w-full overflow-visible"
									preserveAspectRatio="none"
								>
									<defs>
										<linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
											<stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
										</linearGradient>
									</defs>
									<path d={svgPath} fill="url(#elevationGrad)" className="transition-all duration-700" />
									<path d={strokePath} fill="none" stroke="#f97316" strokeWidth="2.5" className="transition-all duration-700" />
								</svg>
							</div>
						</div>

						{/* Gear Manifest Chips */}
						<div className="space-y-2 font-mono text-xs">
							<p className="text-white/45 uppercase tracking-wider flex items-center gap-1.5">
								<LuPackage className="h-3.5 w-3.5 text-orange-400" />
								<span>MANDATORY FIELD LOADOUT:</span>
							</p>
							<div className="flex flex-wrap gap-2">
								{activeArchetype.gear.map((item) => (
									<span
										key={item}
										className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/80 text-[11px]"
									>
										<span className="h-1 w-1 rounded-full bg-orange-400" />
										{item}
									</span>
								))}
							</div>
						</div>

						{/* Highlights */}
						<div className="space-y-2 pt-2 border-t border-white/10">
							{activeArchetype.highlights.map((h, idx) => (
								<div key={idx} className="flex items-center gap-2 text-xs text-white/75">
									<LuCircleCheck className="h-3.5 w-3.5 text-orange-400 shrink-0" />
									<span>{h}</span>
								</div>
							))}
						</div>

						{/* Action */}
						<div className="pt-4 border-t border-white/10">
							<ButtonWithIcon
								href={`/destinations/${activeArchetype.slug}`}
								variant="orange"
								size="default"
								className="w-full justify-center text-xs uppercase tracking-widest font-semibold"
							>
								Proceed with {activeArchetype.name}
							</ButtonWithIcon>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
