"use client";

import Image from "next/image";
import { LuArrowRight, LuCompass } from "react-icons/lu";
import { Link } from "@/i18n/navigation";

const MOOD_COLLECTIONS = [
	{
		id: "alpine",
		title: "Alpine Solitude",
		subtitle: "Glacial lakes, monolithic granite ridges, and unhurried mountain traverses.",
		image: "/laguna-del-inca-lake-surrounded-by-high-mountains-covered-snow-chile.jpg",
		count: "4 Destinations",
		href: "/destinations",
	},
	{
		id: "island",
		title: "Island Contemplation",
		subtitle: "Sun-bleached whitewashed calderas, cobalt sea breezes, and private overwater escapes.",
		image: "/vertical-high-angle-shot-white-buildings-santorini-greece.jpg",
		count: "6 Destinations",
		href: "/destinations",
	},
	{
		id: "heritage",
		title: "Sacred Heritage",
		subtitle: "Centuries of moss-covered shrine paths, morning tea rituals, and sacred bamboo groves.",
		image: "/cherry-blossoms-spring-chureito-pagoda-fuji-mountain-japan.jpg",
		count: "5 Destinations",
		href: "/destinations",
	},
	{
		id: "coastal",
		title: "Coastal Rhythms",
		subtitle: "Dramatic cliffside terraces, ancient maritime villages, and secluded coves.",
		image: "/low-angle-shot-buildings-houses-amalfi-coast-captured-italy.jpg",
		count: "3 Destinations",
		href: "/destinations",
	},
];

export function AtelierCollections() {
	return (
		<section
			id="curated-collections"
			aria-labelledby="collections-title"
			className="relative bg-[#070707] py-20 md:py-36 border-t border-white/10 overflow-hidden"
		>
			<div className="mx-auto max-w-[1600px] pad-x space-y-12">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
					<div className="space-y-3">
						<span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
							CURATED HORIZONS
						</span>
						<h2
							id="collections-title"
							className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
						>
							Journeys by Landscape & Mood
						</h2>
						<p className="max-w-xl text-sm sm:text-base text-white/60 leading-relaxed">
							Every expedition is organized around an atmospheric terrain, allowing you to choose the sensory rhythm that matches your intention.
						</p>
					</div>

					<div className="font-mono text-xs text-white/40 uppercase tracking-widest flex items-center gap-2">
						<LuCompass className="h-4 w-4 text-orange-400" />
						<span>FOUR DISTINCT BIOMES</span>
					</div>
				</div>

				{/* Asymmetric 2x2 Mood Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{MOOD_COLLECTIONS.map((mood) => (
						<Link
							key={mood.id}
							href={mood.href}
							className="group relative flex flex-col justify-end min-h-[360px] sm:min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c] p-6 sm:p-8 transition-all duration-700 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10"
						>
							{/* Background Image with Zoom */}
							<Image
								src={mood.image}
								alt={mood.title}
								fill
								sizes="(max-width: 768px) 100vw, 800px"
								className="object-cover transition-transform duration-1000 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

							{/* Top Pill */}
							<div className="absolute top-6 left-6 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-md">
								<span>{mood.count}</span>
							</div>

							{/* Bottom Content */}
							<div className="relative z-10 space-y-2">
								<h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">
									{mood.title}
								</h3>
								<p className="text-sm text-white/70 leading-relaxed max-w-md">
									{mood.subtitle}
								</p>

								<div className="pt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-400">
									<span>Explore Collection</span>
									<LuArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
