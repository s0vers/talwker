"use client";

import { useRef } from "react";
import { LuRadio } from "react-icons/lu";
import { TELEMETRY_METRICS } from "../content/observatory-copy";
import { cn } from "@/lib/utils";

export function ObservatoryTelemetry() {
	const tickerRef = useRef<HTMLDivElement>(null);

	// Duplicate for smooth seamless horizontal ticker scroll
	const doubledMetrics = [...TELEMETRY_METRICS, ...TELEMETRY_METRICS, ...TELEMETRY_METRICS];

	return (
		<div className="relative w-full border-y border-white/[0.08] bg-[#070707] py-3.5 overflow-hidden select-none">
			{/* Static Lead-in Badge (Desktop) */}
			<div className="absolute left-0 top-0 bottom-0 z-20 hidden md:flex items-center gap-2 bg-[#070707] pr-6 pl-8 border-r border-white/[0.08] text-[11px] font-mono tracking-widest text-orange-400">
				<LuRadio className="h-3.5 w-3.5 animate-pulse text-orange-500" />
				<span className="font-semibold">LIVE TELEMETRY:</span>
			</div>

			{/* Left & Right Fade Gradients */}
			<div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#070707] to-transparent z-10 pointer-events-none md:left-44" />
			<div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#070707] to-transparent z-10 pointer-events-none" />

			{/* Infinite Telemetry Marquee Track */}
			<div
				ref={tickerRef}
				className="flex items-center gap-8 whitespace-nowrap motion-safe:animate-marquee pl-4 md:pl-48"
				style={{ animationDuration: "35s" }}
			>
				{doubledMetrics.map((metric, index) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: duplicated ticker items
						key={`${metric.id}-${index}`}
						className="inline-flex items-center gap-3 text-xs font-mono"
					>
						<span
							className={cn(
								"h-1.5 w-1.5 rounded-full",
								metric.status === "optimal"
									? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
									: metric.status === "active"
										? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
										: "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]",
							)}
						/>
						<span className="text-white/60 uppercase tracking-wider text-[10px]">
							{metric.label}
						</span>
						<span className="text-white font-medium text-[11px]">
							{metric.value}
						</span>
						<span className="text-white/60 text-[10px]">
							[{metric.unit}]
						</span>
						<span className="text-white/10 ml-4 font-sans text-xs">/</span>
					</div>
				))}
			</div>
		</div>
	);
}
