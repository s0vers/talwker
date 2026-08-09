"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
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
	className,
}: DestinationsStageProps) {
	const dest = destinations[activeIndex]!;
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
			className={cn("relative", className)}
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
			<div
				role="region"
				aria-roledescription="carousel"
				aria-label={DESTINATIONS_SECTION.stageRegionLabel}
				tabIndex={0}
				className="relative min-h-[420px] overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#050505] outline-none focus-visible:ring-2 focus-visible:ring-orange-500 md:min-h-[520px]"
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
				{/* Crossfade: stack images; only active is opaque */}
				{destinations.map((item, index) => (
					<div
						key={item.id}
						aria-hidden={index !== activeIndex}
						className={cn(
							"absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:duration-0",
							index === activeIndex ? "opacity-100" : "opacity-0",
						)}
					>
						<Image
							src={item.image}
							alt=""
							fill
							priority={index === 0}
							sizes="(max-width: 768px) 100vw, min(1600px, 100vw)"
							className="object-cover"
						/>
					</div>
				))}
				<div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

				<div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-5 p-5 md:p-8 md:pb-28">
					<div aria-live="polite" aria-atomic="true">
						<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
							{dest.country}
							{dest.tag ? ` · ${dest.tag}` : null}
						</p>
						<h3 className="mt-2 text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-tighter text-white">
							{dest.name}
						</h3>
						<p className="mt-2 text-sm text-white/55">
							{dest.duration} · {DESTINATIONS_SECTION.fromLabel} $
							{dest.price.toLocaleString()}
						</p>
					</div>
					<Link
						href={href}
						className="group inline-flex w-fit items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-orange-400"
					>
						{DESTINATIONS_SECTION.exploreButtonLabel} {dest.name}
						<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Link>
				</div>

				{/* Desktop overlay filmstrip */}
				<div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden p-5 md:block md:p-6">
					<div className="pointer-events-auto">
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

			{/* Mobile filmstrip below stage */}
			<div className="mt-4 md:hidden">
				<DestinationsFilmstrip
					destinations={destinations}
					activeIndex={activeIndex}
					progress={progress}
					showProgress={showProgress}
					onSelect={onSelect}
				/>
			</div>
		</div>
	);
}
