"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { HomeClientCopy } from "@/features/home/lib/home-client-copy";
import {
	LuArrowRight,
	LuChevronLeft,
	LuChevronRight,
	LuClock,
	LuMapPin,
	LuPause,
	LuPlay,
	LuStar
} from "react-icons/lu";
import type { DestinationSummary } from "@/features/home/lib/destination-summary";
import { destinationToSlug } from "@/features/destinations/lib/destination-slug";
import { DestinationsFilmstrip } from "@/features/home/sections/destinations-filmstrip";
import { cn } from "@/lib/utils";

export type DestinationsStageProps = {
	destinations: readonly DestinationSummary[];
	copy: HomeClientCopy["destinations"];
	activeIndex: number;
	cycle: number;
	showProgress: boolean;
	preloadNext: boolean;
	imagesReady: boolean;
	onSelect: (index: number) => void;
	onPauseChange: (paused: boolean) => void;
	onInteractionChange: (paused: boolean) => void;
	isPaused?: boolean;
	className?: string;
};

const SWIPE_THRESHOLD_PX = 48;
export function DestinationsStage({
	copy,
	destinations,
	activeIndex,
	cycle,
	showProgress,
	preloadNext,
	imagesReady,
	onSelect,
	onPauseChange,
	onInteractionChange,
	isPaused = false,
	className
}: DestinationsStageProps) {
	const locale = useLocale();
	const dest = destinations[activeIndex] ?? destinations[0]!;
	const href = `/destinations/${destinationToSlug(dest)}`;
	const pointerStartX = useRef<number | null>(null);
	const pointerInside = useRef(false);
	const didSwipe = useRef(false);
	// Mount only the slide fading out, the active slide, and the next one, so
	// the stacked layers don't all download with the hero on first paint.
	const [slides, setSlides] = useState({
		active: activeIndex,
		previous: activeIndex
	});
	if (slides.active !== activeIndex) {
		setSlides({ active: activeIndex, previous: slides.active });
	}
	const nextIndex = (activeIndex + 1) % destinations.length;
	const isMounted = (index: number) =>
		index === activeIndex ||
		(preloadNext && index === nextIndex) ||
		index === slides.previous;

	const go = (next: number) => {
		const len = destinations.length;
		onSelect((next + len) % len);
	};

	return (
		<div
			className={cn(
				"relative isolate rounded-[1.75rem] border border-white/10 bg-[#080808] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.8)] sm:rounded-[2.5rem] sm:p-6 lg:p-8",
				className
			)}
			onPointerEnter={e => {
				if (e.pointerType === "mouse") {
					pointerInside.current = true;
					onInteractionChange(true);
				}
			}}
			onPointerLeave={e => {
				if (e.pointerType === "mouse") {
					pointerInside.current = false;
					onInteractionChange(e.currentTarget.contains(document.activeElement));
				}
			}}
			onFocusCapture={() => onInteractionChange(true)}
			onBlurCapture={e => {
				if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
					onInteractionChange(pointerInside.current);
				}
			}}
		>
			<div className="pointer-events-none absolute -top-16 -left-16 h-80 w-80 rounded-full bg-orange-500/10 blur-[100px]" />
			<div className="pointer-events-none absolute -right-16 -bottom-16 h-80 w-80 rounded-full bg-orange-500/5 blur-[120px]" />

			<div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12 lg:gap-8">
				<div
					role="region"
					aria-roledescription="carousel"
					aria-label={copy.spotlightBadge}
					tabIndex={0}
					className="relative flex min-h-[480px] touch-pan-y flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-[520px] sm:rounded-[2rem] md:min-h-[540px] lg:col-span-7 xl:col-span-8 xl:min-h-[580px]"
					onKeyDown={e => {
						if (e.key === "ArrowRight") {
							e.preventDefault();
							go(activeIndex + 1);
						} else if (e.key === "ArrowLeft") {
							e.preventDefault();
							go(activeIndex - 1);
						}
					}}
					onPointerDown={e => {
						pointerStartX.current = e.clientX;
						didSwipe.current = false;
					}}
					onPointerUp={e => {
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
					onClickCapture={e => {
						if (!didSwipe.current) return;
						didSwipe.current = false;
						e.preventDefault();
						e.stopPropagation();
					}}
				>
					{destinations.map((item, index) => (
						<div
							key={item.id}
							aria-hidden={index !== activeIndex}
							className={cn(
								"absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:duration-0",
								index === activeIndex ? "z-0 opacity-100" : "-z-10 opacity-0"
							)}
						>
							{imagesReady && isMounted(index) && (
								<Image
									src={item.image}
									alt=""
									fill
									sizes="(max-width: 1024px) 100vw, 65vw"
									className="object-cover"
								/>
							)}
							{index === activeIndex && !imagesReady && (
								<noscript>
									<Image
										src={item.image}
										alt=""
										fill
										sizes="(max-width: 1024px) 100vw, 65vw"
										className="object-cover"
									/>
								</noscript>
							)}
						</div>
					))}

					<div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
					<div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />

					<div className="relative z-10 flex items-center justify-between gap-2 p-3.5 sm:p-7">
						<span className="inline-flex max-w-[55%] items-center gap-1.5 truncate rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-white/90 uppercase shadow-lg backdrop-blur-md sm:px-3.5 sm:py-1.5 sm:text-xs">
							<LuMapPin className="h-3.5 w-3.5 shrink-0 text-orange-500" />
							<span className="truncate">
								{dest.country}
								{dest.tag ? ` · ${dest.tag}` : null}
							</span>
						</span>

						<div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
							<span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-xs">
								<LuStar className="h-3 w-3 shrink-0 fill-orange-500 text-orange-500 sm:h-3.5 sm:w-3.5" />
								{dest.rating}
							</span>
							<span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2 py-1 text-[11px] font-medium text-white/80 backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-xs">
								<LuClock className="h-3 w-3 shrink-0 text-orange-400 sm:h-3.5 sm:w-3.5" />
								{dest.duration}
							</span>
						</div>
					</div>

					<div className="relative z-10 flex flex-col justify-end p-4 pb-5 sm:p-8 sm:pb-9 lg:p-10">
						<div aria-live="polite" aria-atomic="true">
							<div className="flex items-center gap-2.5">
								<span className="font-mono text-xs font-bold tracking-[0.2em] text-orange-400 uppercase">
									0{activeIndex + 1} / 0{destinations.length}
								</span>
								<span className="h-px w-6 bg-orange-500/40 sm:w-8" />
								<span className="text-[11px] font-semibold tracking-widest text-white/60 uppercase sm:text-xs">
									{copy.fromLabel} ${dest.price.toLocaleString(locale)}
								</span>
							</div>

							<h3 className="mt-2 text-3xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
								{dest.name}
							</h3>
						</div>

						<div className="mt-5 flex items-center justify-between gap-2.5">
							<Link
								href={href}
								className="group inline-flex min-h-11 flex-1 items-center justify-center gap-2 truncate rounded-full bg-orange-500 px-4 py-2.5 text-center text-xs font-semibold text-[#050505] shadow-[0_10px_25px_rgba(249,115,22,0.35)] transition-all duration-300 hover:bg-orange-400 hover:shadow-[0_12px_30px_rgba(249,115,22,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-6 sm:py-3 sm:text-sm"
							>
								<span className="truncate">{copy.exploreButtonLabel}</span>
								<LuArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
							</Link>

							<div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
								<button
									type="button"
									aria-label={isPaused ? copy.playAutoplay : copy.pauseAutoplay}
									onClick={() => onPauseChange(!isPaused)}
									className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-[#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
								>
									{isPaused ? (
										<LuPlay className="h-3.5 w-3.5 translate-x-0.5 sm:h-4 sm:w-4" />
									) : (
										<LuPause className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
									)}
								</button>
								<button
									type="button"
									aria-label={copy.prevSlide}
									onClick={() => go(activeIndex - 1)}
									className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-[#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
								>
									<LuChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
								</button>
								<button
									type="button"
									aria-label={copy.nextSlide}
									onClick={() => go(activeIndex + 1)}
									className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-[#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
								>
									<LuChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col justify-center lg:col-span-5 xl:col-span-4">
					<DestinationsFilmstrip
						imagesReady={imagesReady}
						destinations={destinations}
						activeIndex={activeIndex}
						cycle={cycle}
						showProgress={showProgress}
						onSelect={onSelect}
					/>
				</div>
			</div>
		</div>
	);
}
