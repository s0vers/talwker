"use client";

import Image from "next/image";
import { useState } from "react";
import {
	LuActivity,
	LuMapPin,
	LuMountain,
	LuRadio,
	LuThermometer,
} from "react-icons/lu";
import { DottedMap } from "@/components/ui/dotted-map";
import { MAP_WAYPOINTS, type MapWaypoint } from "@/features/home-2/content/atelier-copy";
import { ButtonWithIcon } from "@/shared/ui";
import { cn } from "@/lib/utils";

const ATELIER_MAP_HUB_SPOKES = {
	count: 38,
	seed: 0x7c44e912,
	minDistanceFromHub: 32,
};

export function AtelierMapAtlas() {
	const [selectedWaypoint, setSelectedWaypoint] = useState<MapWaypoint>(MAP_WAYPOINTS[0]);

	return (
		<section
			id="map-atlas"
			aria-labelledby="map-atlas-title"
			className="relative bg-[#070707] py-20 md:py-36 border-t border-white/10 overflow-hidden"
		>
			{/* Ambient Gradient Flares */}
			<div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

			<div className="mx-auto max-w-[1600px] pad-x space-y-12">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
					<div className="space-y-3">
						<div className="inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase text-orange-400">
							<LuRadio className="h-3.5 w-3.5 animate-pulse" />
							<span>CARTOGRAPHIC RADAR // ACTIVE SENSORS</span>
						</div>
						<h2
							id="map-atlas-title"
							className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
						>
							The Nocturnal Cartographic Atlas
						</h2>
						<p className="max-w-xl text-sm sm:text-base text-white/60 leading-relaxed">
							Real-time telemetry and geodesic traverse routes connecting our planetary field camps, alpine weather stations, and secluded sanctuaries.
						</p>
					</div>

					{/* Active Beacon Status */}
					<div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 font-mono text-xs text-white/70 backdrop-blur-md">
						<span className="relative flex h-2.5 w-2.5">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
							<span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
						</span>
						<div>
							<p className="font-semibold text-white">6 GLOBAL WAYPOINTS ONLINE</p>
							<p className="text-[10px] text-white/40">GEODESIC SATELLITE TELEMETRY ACTIVE</p>
						</div>
					</div>
				</div>

				{/* Map & Telemetry Dashboard Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
					{/* Left Dotted World Map Viewport */}
					<div className="lg:col-span-7 xl:col-span-8 rounded-3xl border border-white/10 bg-[#090909] p-4 sm:p-6 shadow-2xl relative">
						<div className="flex items-center justify-between pb-4 border-b border-white/[0.06] text-xs font-mono text-white/40">
							<span>CELESTIAL MERCATOR PROJECTION</span>
							<span className="text-orange-400">1:40,000,000 SCALE</span>
						</div>

						<div className="relative aspect-2/1 w-full min-h-[300px] md:min-h-[420px] pt-4">
							<DottedMap
								width={1000}
								height={500}
								mapSamples={5800}
								destinationDots={360}
								destinationDotsSeed={0x9a22cc8}
								dotSizeSpread={0.32}
								dotSizeSeed={0x5f11}
								gridStep={60}
								gridColor="rgba(255,255,255,0.045)"
								hubLandSpokes={ATELIER_MAP_HUB_SPOKES}
								connectionColor="rgba(249, 115, 22, 0.55)"
								connectionCurve={20}
								markers={MAP_WAYPOINTS.map((m) => ({
									lat: m.lat,
									lng: m.lng,
									pulse: true,
								}))}
								dotColor="rgba(249, 115, 22, 0.45)"
								markerColor="#ffffff"
								pulse
								className="block h-full w-full max-h-none"
								aria-label="Interactive world map showing global expedition waypoints"
								role="img"
							/>
						</div>

						{/* Interactive Waypoint Button Ticker */}
						<div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
							{MAP_WAYPOINTS.map((wp) => {
								const isSelected = wp.id === selectedWaypoint.id;
								return (
									<button
										key={wp.id}
										type="button"
										onClick={() => setSelectedWaypoint(wp)}
										className={cn(
											"flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono transition-all duration-300 shrink-0 border outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
											isSelected
												? "border-orange-500 bg-orange-500/20 text-orange-300 font-semibold shadow-md shadow-orange-500/20"
												: "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white",
										)}
									>
										<LuMapPin className={cn("h-3 w-3", isSelected ? "text-orange-400" : "text-white/30")} />
										<span>{wp.name}</span>
									</button>
								);
							})}
						</div>
					</div>

					{/* Right Live Waypoint Telemetry Dossier */}
					<div className="lg:col-span-5 xl:col-span-4 rounded-3xl border border-white/10 bg-[#0c0c0c] p-6 shadow-2xl space-y-6 transition-all duration-500">
						<div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
							<div className="flex items-center gap-2 text-orange-400">
								<LuActivity className="h-4 w-4" />
								<span>FIELD STATION SENSOR</span>
							</div>
							<span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/80">
								{selectedWaypoint.status}
							</span>
						</div>

						{/* Waypoint Thumbnail Preview */}
						<div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 group">
							<Image
								src={selectedWaypoint.image}
								alt={selectedWaypoint.name}
								fill
								sizes="(max-width: 768px) 100vw, 400px"
								className="object-cover transition-transform duration-700 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
							<div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white/90">
								<span className="font-bold">{selectedWaypoint.name}</span>
								<span className="text-white/60">{selectedWaypoint.country}</span>
							</div>
						</div>

						{/* Telemetry Sensor Grid */}
						<div className="grid grid-cols-2 gap-3">
							<div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
								<div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-white/40">
									<LuMountain className="h-3 w-3 text-orange-400" />
									<span>Elevation</span>
								</div>
								<p className="text-sm font-semibold text-white font-mono">{selectedWaypoint.elevation}</p>
							</div>

							<div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
								<div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-white/40">
									<LuThermometer className="h-3 w-3 text-orange-400" />
									<span>Temperature</span>
								</div>
								<p className="text-sm font-semibold text-white font-mono">{selectedWaypoint.tempCelsius}°C</p>
							</div>
						</div>

						{/* Coordinates & Condition */}
						<div className="space-y-3 font-mono text-xs text-white/60">
							<div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
								<span className="text-white/40">COORDINATES</span>
								<span className="text-white font-semibold">{selectedWaypoint.lat.toFixed(4)}°, {selectedWaypoint.lng.toFixed(4)}°</span>
							</div>
							<div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
								<span className="text-white/40">ATMOSPHERE</span>
								<span className="text-orange-400 font-semibold">{selectedWaypoint.condition}</span>
							</div>
						</div>

						{/* Field Note Dispatch Excerpt */}
						<div className="rounded-xl border border-white/[0.08] bg-[#080808] p-4 space-y-2">
							<p className="text-[10px] font-mono uppercase text-orange-400 tracking-wider">LATEST FIELD DISPATCH // LOG</p>
							<p className="text-xs italic leading-relaxed text-white/80">
								&ldquo;{selectedWaypoint.activeDispatch}&rdquo;
							</p>
						</div>

						{/* Direct Action Link */}
						<div className="pt-2">
							<ButtonWithIcon
								href={`/destinations/${selectedWaypoint.slug}`}
								variant="orange"
								size="default"
								className="w-full justify-center text-xs uppercase tracking-widest font-semibold"
							>
								Inspect Full {selectedWaypoint.name} Dossier
							</ButtonWithIcon>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
