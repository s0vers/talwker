"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	LuArrowRight,
	LuChevronLeft,
	LuChevronRight,
	LuClock,
	LuMapPin,
	LuPause,
	LuPlay,
	LuStar,
} from "react-icons/lu";
import type { Destination } from "@/shared/types/domain";
import { destinationToSlug } from "@/features/destinations/lib/destination-slug";
import { DESTINATIONS_SECTION } from "@/features/home/content/section-copy";
import { DestinationsFilmstrip } from "@/features/home/sections/destinations-filmstrip";
import { cn } from "@/lib/utils";

export type DestinationsStageProps = {
	destinations: readonly Destination[];
	activeIndex: number;
	progress: number;
	showProgress: boolean;
	onSelect: (index: number) => void;
	onPauseChange: (paused: boolean) => void;
	isPaused?: boolean;
	className?: string;
};

const SWIPE_THRESHOLD_PX = 48;

export function DestinationsStage({
	destinations,
	activeIndex,
	progress,
	showProgress,
	onSelect,
	onPauseChange,
	isPaused = false,
	className,
}: DestinationsStageProps) {
	const dest = destinations[activeIndex] ?? destinations[0]!;
	const href = `/destinations/${destinationToSlug(dest)}`;
	const pointerStartX = useRef<number | null>(null);
	const didSwipe = useRef(false);
	const hoverPaused = useRef(false);
	const focusPaused = useRef(false);

	const syncPause = () => {
		onPauseChange(hoverPaused.current || focusPaused.current);
	};

	const go = (next: number) => {
		const len = destinations.length;
		onSelect(((next % len) + len) % len);
	};

	return (
		<div
			className={cn(
				"relative isolate rounded-[2.5rem] border border-white/10 bg-[#080808] p-4 sm:p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)]",
				className,
			)}
			onPointerEnter={(e) => {
				if (e.pointerType !== "mouse") return;
				hoverPaused.current = true;
				syncPause();
			}}
			onPointerLeave={(e) => {
				if (e.pointerType !== "mouse") return;
				hoverPaused.current = false;
				syncPause();
			}}
			onFocusCapture={() => {
				focusPaused.current = true;
				syncPause();
			}}
			onBlurCapture={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
					focusPaused.current = false;
					syncPause();
				}
			}}
		>
			{/* Ambient atmospheric backlight glow */}
			<div className="pointer-events-none absolute -left-16 -top-16 h-80 w-80 rounded-full bg-orange-500/10 blur-[100px]" />
			<div className="pointer-events-none absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-orange-500/5 blur-[120px]" />

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-stretch">
				{/* Main Spotlight Canvas (Left) */}
				<div
					role="region"
					aria-roledescription="carousel"
					aria-label={DESTINATIONS_SECTION.stageRegionLabel}
					tabIndex={0}
					className="relative min-h-[460px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#050505] outline-none focus-visible:ring-2 focus-visible:ring-orange-500 md:min-h-[540px] xl:min-h-[580px] lg:col-span-7 xl:col-span-8 flex flex-col justify-between"
					onKeyDown={(e) => {
						if (e.key === "ArrowRight") {
							e.preventDefault();
							go(activeIndex + 1);
						} else if (e.key === "ArrowLeft") {
							e.preventDefault();
							go(activeIndex - 1);
						}
					}}
					onPointerDown={(e) => {
						pointerStartX.current = e.clientX;
						didSwipe.current = false;
					}}
					onPointerUp={(e) => {
						const start = pointerStartX.current;
						pointerStartX.current = null;
						if (start == null) return;
						const delta = e.clientX - start;
						if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
						didSwipe.current = true;
						go(delta < 0 ? activeIndex + 1 : activeIndex - 1);
					}}
					onPointerCancel={() => {
						pointerStartX.current = null;
						didSwipe.current = false;
					}}
					onClickCapture={(e) => {
						if (!didSwipe.current) return;
						didSwipe.current = false;
						e.preventDefault();
						e.stopPropagation();
					}}
				>
					{/* Cross-fading background images */}
					{destinations.map((item, index) => (
						<div
							key={item.id}
							aria-hidden={index !== activeIndex}
							className={cn(
								"absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:duration-0",
								index === activeIndex ? "opacity-100 z-0" : "opacity-0 -z-10",
							)}
						>
							<Image
								src={item.image}
								alt=""
								fill
								priority={index === 0}
								sizes="(max-width: 1024px) 100vw, 65vw"
								className={cn(
									"object-cover transition-transform duration-1000 ease-out",
									index === activeIndex ? "scale-105" : "scale-100",
								)}
							/>
						</div>
					))}

					{/* Dramatic dark gradients */}
					<div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
					<div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />

					{/* Top Frosted Bar */}
					<div className="relative z-10 flex flex-wrap items-center justify-between gap-3 p-5 sm:p-7">
						<span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md shadow-lg">
							<LuMapPin className="h-3.5 w-3.5 text-orange-500" />
							{dest.country}
							{dest.tag ? ` · ${dest.tag}` : null}
						</span>

						<div className="flex items-center gap-2">
							<span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
								<LuStar className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
								{dest.rating}
							</span>
							<span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
								<LuClock className="h-3.5 w-3.5 text-orange-400" />
								{dest.duration}
							</span>
						</div>
					</div>

					{/* Bottom Content Overlay */}
					<div className="relative z-10 flex flex-col justify-end p-5 pb-7 sm:p-8 sm:pb-9 lg:p-10">
						<div aria-live="polite" aria-atomic="true">
							<div className="flex items-center gap-3">
								<span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-orange-400">
									0{activeIndex + 1} / 0{destinations.length}
								</span>
								<span className="h-px w-8 bg-orange-500/40" />
								<span className="text-xs font-semibold uppercase tracking-widest text-white/60">
									{DESTINATIONS_SECTION.fromLabel} ${dest.price.toLocaleString()}
								</span>
							</div>

							<h3 className="mt-2 text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold tracking-tight text-white leading-[1.05]">
								{dest.name}
							</h3>
						</div>

						{/* Action Controls Row */}
						<div className="mt-6 flex flex-wrap items-center justify-between gap-4">
							<Link
								href={href}
								className="group inline-flex items-center gap-2.5 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-orange-400 shadow-[0_10px_25px_rgba(249,115,22,0.35)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.5)]"
							>
								{DESTINATIONS_SECTION.exploreButtonLabel}
								<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>

							{/* Manual Navigation & Pause Controls */}
							<div className="flex items-center gap-2">
								<button
									type="button"
									aria-label={
										isPaused
											? DESTINATIONS_SECTION.playAutoplayLabel
											: DESTINATIONS_SECTION.pauseAutoplayLabel
									}
									onClick={() => onPauseChange(!isPaused)}
									className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-black"
								>
									{isPaused ? (
										<LuPlay className="h-4 w-4 translate-x-0.5" />
									) : (
										<LuPause className="h-4 w-4" />
									)}
								</button>
								<button
									type="button"
									aria-label={DESTINATIONS_SECTION.prevSlideLabel}
									onClick={() => go(activeIndex - 1)}
									className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-black"
								>
									<LuChevronLeft className="h-5 w-5" />
								</button>
								<button
									type="button"
									aria-label={DESTINATIONS_SECTION.nextSlideLabel}
									onClick={() => go(activeIndex + 1)}
									className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-black"
								>
									<LuChevronRight className="h-5 w-5" />
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Spotlight Card Deck (Right Column on desktop) */}
				<div className="flex flex-col justify-center lg:col-span-5 xl:col-span-4">
					<DestinationsFilmstrip
						destinations={destinations}
						activeIndex={activeIndex}
						progress={progress}
						showProgress={showProgress}
						onSelect={onSelect}
					/>
				</div>
			</div>
		</div>
	);
}

