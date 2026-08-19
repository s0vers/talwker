"use client";

import Image from "next/image";
import {
	LuArrowRight,
	LuPlane,
	LuTicket,
	LuUsers,
} from "react-icons/lu";
import { EXPEDITION_PASSES } from "@/features/home-2/content/atelier-copy";
import { Link } from "@/i18n/navigation";
import { SectionCta } from "@/shared/ui";

export function AtelierBoardingPasses() {

	return (
		<section
			id="boarding-passes"
			aria-labelledby="boarding-passes-title"
			className="relative bg-[#050505] py-20 md:py-36 border-t border-white/10 overflow-hidden"
		>
			<div className="mx-auto max-w-[1600px] pad-x space-y-12">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
					<div className="space-y-3">
						<div className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase text-orange-400">
							<LuTicket className="h-3.5 w-3.5" />
							<span>CURATED SEASONAL BOARDING PASSES</span>
						</div>
						<h2
							id="boarding-passes-title"
							className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
						>
							Micro-Group Seasonal Departures
						</h2>
						<p className="max-w-xl text-sm sm:text-base text-white/60 leading-relaxed">
							Intimate small-group traverses capped strictly at 6 travelers, led by resident expedition authors and master naturalists.
						</p>
					</div>

					<div className="flex items-center gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/10 px-5 py-3 font-mono text-xs text-orange-400">
						<LuUsers className="h-4 w-4" />
						<span>MAXIMUM 6 EXPLORERS PER EXPEDITION</span>
					</div>
				</div>

				{/* Boarding Passes Stack */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{EXPEDITION_PASSES.map((pass) => (
						<article
							key={pass.id}
							className="group relative flex flex-col justify-between rounded-3xl border border-white/12 bg-[#0a0a0a] overflow-hidden shadow-2xl transition-all duration-500 hover:border-orange-500/50 hover:shadow-orange-500/10 hover:-translate-y-1"
						>
							{/* Top Photographic Header with Flight Badge */}
							<div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
								<Image
									src={pass.image}
									alt={pass.title}
									fill
									sizes="(max-width: 1024px) 100vw, 500px"
									className="object-cover transition-transform duration-700 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/30 to-transparent" />

								{/* Gate Tag */}
								<div className="absolute top-3 left-3 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3 py-1 font-mono text-[10px] text-white/90 backdrop-blur-md">
									<LuPlane className="h-3 w-3 text-orange-400" />
									<span>{pass.routeCode}</span>
								</div>

								{/* Remaining Seats Chip */}
								<div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-orange-500/40 bg-orange-500/20 px-3 py-1 font-mono text-[10px] font-semibold text-orange-300 backdrop-blur-md">
									<span className="relative flex h-1.5 w-1.5">
										<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
										<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
									</span>
									<span>ONLY {pass.spotsRemaining} SPOTS LEFT</span>
								</div>
							</div>

							{/* Main Boarding Pass Body */}
							<div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
								<div className="space-y-3">
									<div className="flex items-center justify-between text-xs font-mono text-white/40">
										<span>BOARDING PASS #{pass.passNumber}</span>
										<span className="text-orange-400 font-semibold">{pass.flightGate}</span>
									</div>

									<h3 className="text-xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">
										{pass.title}
									</h3>
									<p className="text-xs font-mono uppercase tracking-wider text-white/50">
										{pass.destination}
									</p>
								</div>

								{/* Pass Meta Grid */}
								<div className="grid grid-cols-2 gap-3 font-mono text-xs border-y border-white/[0.08] py-4">
									<div>
										<p className="text-[10px] text-white/40 uppercase">DATES</p>
										<p className="font-semibold text-white mt-0.5">{pass.departureDates}</p>
									</div>
									<div>
										<p className="text-[10px] text-white/40 uppercase">LEAD NATURALIST</p>
										<p className="font-semibold text-orange-400 mt-0.5">{pass.naturalistGuide}</p>
									</div>
								</div>

								{/* Perforated Stub Line */}
								<div className="relative flex items-center justify-between border-t border-dashed border-white/20 pt-4">
									<div>
										<p className="text-[10px] font-mono uppercase text-white/40">ALL-INCLUSIVE RATE</p>
										<p className="text-lg font-bold font-mono text-white">${pass.priceUSD.toLocaleString()} USD</p>
									</div>

									<Link
										href={`/booking?tour=${pass.tourSlug}`}
										className="inline-flex items-center gap-2 rounded-full border border-orange-500 bg-orange-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 hover:shadow-orange-500/40"
									>
										<span>Issue Ticket</span>
										<LuArrowRight className="h-3.5 w-3.5" />
									</Link>
								</div>
							</div>
						</article>
					))}
				</div>

				{/* Footer CTA */}
				<div className="text-center pt-8">
					<SectionCta href="/tours" icon={<LuArrowRight className="h-4 w-4" />}>
						View All Scheduled Expeditions
					</SectionCta>
				</div>
			</div>
		</section>
	);
}
