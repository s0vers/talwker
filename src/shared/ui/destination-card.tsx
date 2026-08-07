"use client";

import Image from "next/image";
import Link from "next/link";
import { LuStar, LuClock } from "react-icons/lu";
import type { Destination } from "@/shared/types/domain";
import { cn } from "@/lib/utils";

export type DestinationCardProps = {
	destination: Destination;
	/** Shown above the price (e.g. "From"). */
	fromLabel?: string;
	/** Primary action label on the card. */
	exploreButtonLabel?: string;
	/**
	 * `carousel` — horizontal track with min-widths (home section).
	 * `grid` — full width of cell, no min-width (responsive grid).
	 */
	layout?: "carousel" | "grid";
	href?: string;
	className?: string;
};

const DEFAULT_FROM = "From";
const DEFAULT_EXPLORE = "Explore";

const carouselShell =
	"relative isolate h-[460px] min-w-[80vw] cursor-pointer overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#050505] sm:min-w-[65vw] md:h-[500px] lg:min-w-[380px] xl:min-w-[400px]";
const gridShell =
	"relative isolate h-[460px] w-full min-w-0 cursor-pointer overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#050505] md:h-[500px]";

export function DestinationCard({
	destination: dest,
	fromLabel = DEFAULT_FROM,
	exploreButtonLabel = DEFAULT_EXPLORE,
	layout = "carousel",
	href,
	className,
}: DestinationCardProps) {
	const imageSizes =
		layout === "grid"
			? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
			: "(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 33vw";

	const shell = (
		<div
			data-destination-card
			data-layout={layout}
			className={cn(layout === "grid" ? gridShell : carouselShell, className)}
		>
			<div className="absolute inset-0 overflow-hidden rounded-[1.9rem]">
				<Image
					src={dest.image}
					alt={dest.name}
					fill
					sizes={imageSizes}
					data-destination-image
					className="object-cover"
				/>
			</div>
			<div className="absolute inset-0 rounded-[1.9rem] bg-linear-to-t from-black/85 via-black/35 to-transparent" />

			{dest.tag && (
				<span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur-md">
					{dest.tag}
				</span>
			)}

			<div className="absolute inset-x-5 bottom-5 flex flex-col gap-4">
				<div>
					<h3 className="text-[1.7rem] font-semibold tracking-tight text-white md:text-[1.9rem]">
						{dest.name}
					</h3>
					<p className="mt-1 text-sm text-white/70">{dest.country}</p>
				</div>

				<div className="flex items-center justify-between text-xs text-white/70">
					<div className="flex items-center gap-2">
						<LuClock className="h-4 w-4 text-orange-500" />
						<span>{dest.duration}</span>
					</div>
					<div className="flex items-center gap-1 rounded-full bg-black/55 px-3 py-1.5 text-[11px] backdrop-blur">
						<LuStar className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
						<span className="font-semibold text-white">{dest.rating}</span>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="text-xs text-white/70">
						<p className="uppercase tracking-[0.18em] text-white/40">{fromLabel}</p>
						<p className="mt-1 text-base font-semibold tracking-tight text-orange-500">
							${dest.price.toLocaleString()}
						</p>
					</div>
					<span className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#050505] shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
						{exploreButtonLabel}
					</span>
				</div>
			</div>
		</div>
	);

	if (href) {
		return (
			<Link href={href} aria-label={`${exploreButtonLabel} ${dest.name}`} className="block">
				{shell}
			</Link>
		);
	}

	return shell;
}
