"use client";

import { useTranslations } from "next-intl";
import { LuActivity, LuRadio } from "react-icons/lu";
import { TELEMETRY_FEEDS } from "@/features/home-2/content/atelier-copy";

export function AtelierTelemetry() {
	const t = useTranslations("Home2.telemetry");

	// Repeat array to ensure seamless continuous scroll
	const doubledFeeds = [...TELEMETRY_FEEDS, ...TELEMETRY_FEEDS];

	return (
		<section
			aria-label={t("label")}
			className="relative z-20 border-y border-white/[0.08] bg-[#070707] py-3.5 overflow-hidden select-none"
		>
			<div className="flex items-center">
				{/* Fixed Left Header Chip */}
				<div className="hidden lg:flex shrink-0 items-center gap-2 border-r border-white/10 bg-[#070707] px-6 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-orange-400 z-10">
					<LuRadio className="h-3.5 w-3.5 animate-pulse" />
					<span>{t("beaconActive")}</span>
				</div>

				{/* Continuous Scrolling Strip */}
				<div className="group flex w-full overflow-hidden">
					<div className="flex shrink-0 items-center gap-8 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
						{doubledFeeds.map((feed, idx) => (
							<div
								key={`${feed.id}-${idx}`}
								className="flex items-center gap-4 text-xs tracking-wider"
							>
								<div className="flex items-center gap-2 font-mono">
									<span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
									<span className="font-semibold text-white">
										{t(feed.locationKey as Parameters<typeof t>[0])}
									</span>
									<span className="text-white/40">[{feed.coordinates}]</span>
								</div>

								<span className="text-white/20">•</span>

								<div className="flex items-center gap-3 text-white/60 font-mono text-[11px]">
									<span className="text-orange-400/90">{feed.elevation}</span>
									<span className="text-white/30">/</span>
									<span>{feed.tempCelsius}°C</span>
									<span className="text-white/30">/</span>
									<span className="text-white/50">
										{t(feed.conditionKey as Parameters<typeof t>[0])}
									</span>
								</div>

								<span className="text-white/20">•</span>

								<div className="inline-flex items-center gap-1 rounded bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-white/50 border border-white/[0.06]">
									<LuActivity className="h-2.5 w-2.5 text-orange-400" />
									<span>{t(feed.statusKey as Parameters<typeof t>[0])}</span>
								</div>

								<span className="mx-2 text-white/15">{"///"}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
