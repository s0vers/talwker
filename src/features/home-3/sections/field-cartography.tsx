"use client";

import { useState } from "react";
import {
	LuActivity,
	LuCompass,
	LuMapPin,
	LuMountain,
	LuSparkles,
	LuTent
} from "react-icons/lu";
import {
	CARTOGRAPHY_ROUTES,
	type CartographyWaypointNode
} from "../content/celestial-data";
import { OBSERVATORY_COPY } from "../content/observatory-copy";
import { cn } from "@/lib/utils";

export function FieldCartography() {
	const [activeRouteIndex, setActiveRouteIndex] = useState(0);
	const activeRoute = CARTOGRAPHY_ROUTES[activeRouteIndex];
	const [selectedWaypoint, setSelectedWaypoint] =
		useState<CartographyWaypointNode>(activeRoute.waypoints[0]);

	const handleRouteChange = (idx: number) => {
		setActiveRouteIndex(idx);
		setSelectedWaypoint(CARTOGRAPHY_ROUTES[idx].waypoints[0]);
	};

	return (
		<section
			id="field-cartography"
			className="pad-x relative w-full overflow-hidden border-b border-white/[0.08] bg-[#050505] py-24 text-white"
		>
			{/* Subtle Cartographic Contour Background Effect */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />

			{/* Section Header */}
			<div className="mb-12 max-w-3xl">
				<div className="mb-3 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-orange-500 uppercase">
					<LuSparkles className="h-3.5 w-3.5" />
					<span>{OBSERVATORY_COPY.cartography.badge}</span>
				</div>
				<h2 className="text-3xl leading-tight font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
					{OBSERVATORY_COPY.cartography.title}
				</h2>
				<p className="mt-4 text-base leading-relaxed font-light text-white/60 sm:text-lg">
					{OBSERVATORY_COPY.cartography.subtitle}
				</p>
			</div>

			{/* Route Selection Tabs */}
			<div className="mb-10 flex flex-wrap items-center gap-3">
				{CARTOGRAPHY_ROUTES.map((route, idx) => (
					<button
						key={route.id}
						type="button"
						onClick={() => handleRouteChange(idx)}
						aria-pressed={activeRouteIndex === idx}
						className={cn(
							"flex min-h-11 items-center gap-3 rounded-xl border px-5 py-3 font-mono text-xs transition-all",
							activeRouteIndex === idx
								? "border-orange-500/60 bg-orange-500/10 text-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
								: "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white"
						)}
					>
						<span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
						<span className="font-semibold uppercase">{route.title}</span>
						<span className="hidden text-white/60 sm:inline">
							[{route.country}]
						</span>
					</button>
				))}
			</div>

			{/* Cartographic Main Container */}
			<div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl sm:p-10">
				{/* Top Metrics Row */}
				<div className="grid grid-cols-2 gap-4 border-b border-white/[0.08] pb-8 font-mono text-xs sm:grid-cols-4">
					<div>
						<span className="block text-[10px] text-white/60 uppercase">
							TOTAL DISTANCE
						</span>
						<span className="text-xl font-medium text-white sm:text-2xl">
							{activeRoute.distanceKm} KM
						</span>
					</div>
					<div>
						<span className="block text-[10px] text-white/60 uppercase">
							ELEVATION GAIN
						</span>
						<span className="text-xl font-medium text-orange-400 sm:text-2xl">
							+{activeRoute.elevationGainM} M
						</span>
					</div>
					<div>
						<span className="block text-[10px] text-white/60 uppercase">
							PEAK ALTITUDE
						</span>
						<span className="text-xl font-medium text-white sm:text-2xl">
							{activeRoute.peakAltitudeM} M
						</span>
					</div>
					<div>
						<span className="block text-[10px] text-white/60 uppercase">
							DURATION
						</span>
						<span className="text-xl font-medium text-white/90 sm:text-2xl">
							{activeRoute.durationDays}
						</span>
					</div>
				</div>

				{/* Interactive Elevation Profile & Waypoint Track */}
				<div className="mt-8">
					<div className="mb-4 flex items-center justify-between font-mono text-xs text-white/50">
						<span className="flex items-center gap-2">
							<LuActivity className="h-3.5 w-3.5 text-orange-500" />
							TOPOGRAPHIC PROFILE & BIVOUAC CHECKPOINTS
						</span>
						<span>SELECT WAYPOINT FOR FIELD SPECS</span>
					</div>

					{/* Visual Elevation Stepper Track */}
					<div className="grid grid-cols-1 gap-3 md:grid-cols-5">
						{activeRoute.waypoints.map(wp => {
							const isSelected = selectedWaypoint.name === wp.name;
							return (
								<button
									key={wp.name}
									type="button"
									onClick={() => setSelectedWaypoint(wp)}
									aria-pressed={isSelected}
									className={cn(
										"group relative overflow-hidden rounded-xl border p-4 text-left transition-all",
										isSelected
											? "border-orange-500/70 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
											: "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
									)}
								>
									<div className="mb-2 flex items-center justify-between font-mono text-[11px] text-white/60">
										<span>KM {wp.km.toFixed(1)}</span>
										<span
											className={cn(
												"rounded-full p-1",
												isSelected
													? "bg-orange-500 text-black"
													: "bg-white/10 text-white/60"
											)}
										>
											{wp.type === "camp" && <LuTent className="h-3 w-3" />}
											{wp.type === "pass" && <LuCompass className="h-3 w-3" />}
											{wp.type === "observatory" && (
												<LuSparkles className="h-3 w-3" />
											)}
											{wp.type === "summit" && (
												<LuMountain className="h-3 w-3" />
											)}
										</span>
									</div>

									<div className="truncate text-sm font-medium text-white">
										{wp.name}
									</div>

									<div className="mt-1 font-mono text-xs text-orange-400">
										{wp.altM} M ALT
									</div>
								</button>
							);
						})}
					</div>
				</div>

				{/* Active Waypoint Detail Card */}
				<div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 md:flex-row md:items-center">
					<div className="max-w-2xl">
						<div className="mb-1 inline-flex items-center gap-2 font-mono text-xs text-orange-400">
							<LuMapPin className="h-3.5 w-3.5" />
							<span>
								CHECKPOINT SPECIFICATION //{" "}
								{selectedWaypoint.type.toUpperCase()}
							</span>
						</div>
						<h3 className="text-xl font-medium text-white">
							{selectedWaypoint.name} ({selectedWaypoint.altM}m)
						</h3>
						<p className="mt-1 text-xs font-light text-white/70 sm:text-sm">
							{selectedWaypoint.notes}
						</p>
					</div>

					<div className="max-w-sm shrink-0 rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-xs text-white/60">
						<span className="mb-1 block font-semibold text-orange-400">
							ASTRAL ORIENTATION NOTE:
						</span>
						<span className="font-sans font-light text-white/80">
							{activeRoute.starlightGuidance}
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
