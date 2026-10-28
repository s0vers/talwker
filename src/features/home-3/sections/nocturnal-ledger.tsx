"use client";

import { useState } from "react";
import {
	LuArrowRight,
	LuMoon,
	LuOrbit,
	LuSparkles,
	LuUsers
} from "react-icons/lu";
import { Link } from "@/i18n/navigation";
import { NOCTURNAL_DEPARTURES } from "../content/celestial-data";
import { OBSERVATORY_COPY } from "../content/observatory-copy";
import { cn } from "@/lib/utils";

export function NocturnalLedger() {
	const [activeDepartureIndex, setActiveDepartureIndex] = useState(0);
	const activeDeparture = NOCTURNAL_DEPARTURES[activeDepartureIndex];

	return (
		<section
			id="nocturnal-ledger"
			className="pad-x relative w-full overflow-hidden border-b border-white/[0.08] bg-[#040404] py-28 text-white"
		>
			{/* Ambient Cosmic Background */}
			<div className="pointer-events-none absolute top-1/2 right-10 h-[600px] w-[600px] rounded-full bg-orange-500/10 blur-[140px]" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:24px_24px]" />

			{/* Section Header */}
			<div className="mb-14 max-w-3xl">
				<div className="mb-3 inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-orange-400 uppercase">
					<LuSparkles className="h-3.5 w-3.5 text-orange-500" />
					<span>{OBSERVATORY_COPY.ledger.badge}</span>
				</div>
				<h2 className="text-3xl leading-tight font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
					{OBSERVATORY_COPY.ledger.title}
				</h2>
				<p className="mt-4 text-base leading-relaxed font-light text-white/60 sm:text-lg">
					{OBSERVATORY_COPY.ledger.subtitle}
				</p>
			</div>

			{/* ========================================================= */}
			{/* THE ASTRONOMICAL ORRERY & LUNAR EPHEMERIS MATRIX */}
			{/* ========================================================= */}
			<div className="overflow-hidden rounded-3xl border border-white/15 bg-[#080808] p-6 shadow-[0_0_60px_rgba(0,0,0,0.8)] sm:p-10">
				<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
					{/* Left: Interactive Celestial Orrery Dial & Event Selector */}
					<div className="space-y-6 lg:col-span-5">
						<div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-white/60">
							<span className="flex items-center gap-2 text-orange-400">
								<LuOrbit className="h-4 w-4" />
								LUNAR ORBITAL ALIGNMENTS
							</span>
							<span>4 EXPEDITIONS</span>
						</div>

						{/* Departure Phase List */}
						<div className="space-y-3">
							{NOCTURNAL_DEPARTURES.map((dep, idx) => (
								<button
									key={dep.id}
									type="button"
									onClick={() => setActiveDepartureIndex(idx)}
									aria-pressed={activeDepartureIndex === idx}
									className={cn(
										"flex w-full items-center justify-between gap-4 rounded-2xl border p-4.5 text-left transition-all duration-300",
										activeDepartureIndex === idx
											? "border-orange-500/80 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
											: "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
									)}
								>
									<div className="space-y-1">
										<div className="flex items-center gap-2 font-mono text-[11px]">
											<span className="font-semibold text-orange-400">
												EVENT 0{idx + 1}
											</span>
											<span className="text-white/60">•</span>
											<span className="text-white/60">
												{dep.dates.split(",")[0]}
											</span>
										</div>
										<div className="text-base font-medium tracking-tight text-white">
											{dep.title}
										</div>
										<div className="font-mono text-xs text-white/60">
											{dep.astronomicalEvent}
										</div>
									</div>

									{/* Moon Phase Graphical Icon */}
									<div className="flex shrink-0 flex-col items-center gap-1">
										<div
											className={cn(
												"flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
												activeDepartureIndex === idx
													? "border-orange-500 bg-orange-500/20 text-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.4)]"
													: "border-white/20 bg-white/5 text-white/60"
											)}
										>
											<LuMoon className="h-4 w-4" />
										</div>
										<span className="font-mono text-[9px] text-white/60">
											{dep.remainingBerths} BERTHS
										</span>
									</div>
								</button>
							))}
						</div>
					</div>

					{/* Right: Detailed Ephemeris Terminal & Live Berth Reservation Console */}
					<div className="space-y-6 rounded-2xl border border-white/10 bg-black/60 p-6 sm:p-8 lg:col-span-7">
						{/* Active Event Masthead */}
						<div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
							<div>
								<div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 font-mono text-[11px] text-orange-300">
									<LuSparkles className="h-3 w-3 text-orange-400" />
									<span>{activeDeparture.astronomicalEvent}</span>
								</div>
								<h3 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
									{activeDeparture.title}
								</h3>
								<p className="mt-1 font-mono text-xs text-white/50">
									{activeDeparture.location} • {activeDeparture.duration}
								</p>
							</div>

							<div className="text-right">
								<div className="font-mono text-3xl font-bold text-white">
									{activeDeparture.price}
								</div>
								<span className="font-mono text-[10px] text-white/60 uppercase">
									PER VOYAGER
								</span>
							</div>
						</div>

						{/* Ephemeris Scientific Data Grid */}
						<div className="grid grid-cols-2 gap-4 font-mono text-xs sm:grid-cols-3">
							<div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5">
								<span className="block text-[10px] text-white/60 uppercase">
									LUNAR ILLUMINATION
								</span>
								<span className="text-sm font-semibold text-orange-300">
									{activeDeparture.lunarPhase}
								</span>
							</div>
							<div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5">
								<span className="block text-[10px] text-white/60 uppercase">
									EXPEDITION WINDOW
								</span>
								<span className="text-sm font-semibold text-white">
									{activeDeparture.dates}
								</span>
							</div>
							<div className="col-span-2 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 sm:col-span-1">
								<span className="block text-[10px] text-white/60 uppercase">
									EXPEDITION LEADER
								</span>
								<span className="block truncate text-xs font-medium text-white">
									{activeDeparture.leadGuide}
								</span>
							</div>
						</div>

						{/* Interactive Berth Status & Reservation Matrix */}
						<div className="space-y-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
							<div className="flex items-center justify-between font-mono text-xs">
								<span className="flex items-center gap-2 text-white/60">
									<LuUsers className="h-3.5 w-3.5 text-orange-400" />
									BERTH CAPACITY ({activeDeparture.totalBerths} TOTAL EXPEDITION
									SLOTS):
								</span>
								<span className="font-semibold text-orange-400">
									{activeDeparture.remainingBerths} BERTHS REMAINING
								</span>
							</div>

							{/* Visual Berth Dots Indicator */}
							<div className="flex items-center gap-2">
								{Array.from({ length: activeDeparture.totalBerths }).map(
									(_, slotIdx) => {
										const isReserved =
											slotIdx <
											activeDeparture.totalBerths -
												activeDeparture.remainingBerths;
										return (
											<div
												// biome-ignore lint/suspicious/noArrayIndexKey: visual indicator dots
												key={slotIdx}
												className={cn(
													"h-3 flex-1 rounded-full transition-all",
													isReserved
														? "bg-white/20"
														: "animate-pulse bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
												)}
												title={
													isReserved ? "Reserved Berth" : "Available Open Berth"
												}
											/>
										);
									}
								)}
							</div>
						</div>

						{/* Booking Dispatch Action Bar */}
						<div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
							<div className="font-mono text-xs text-white/60">
								<span>
									ALL EXPEDITIONS INCLUDE 8&Prime; CASSEGRAIN TELESCOPE &amp;
									GEAR
								</span>
							</div>

							<Link
								href={`/contact?departure=${activeDeparture.id}`}
								className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-orange-500 px-8 py-3.5 text-xs font-semibold tracking-[0.15em] text-black uppercase shadow-[0_0_25px_rgba(249,115,22,0.4)] transition-all duration-300 hover:bg-orange-600 sm:w-auto"
							>
								<span>REQUEST EXPEDITION DETAILS</span>
								<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
