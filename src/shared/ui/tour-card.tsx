"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { LuStar, LuClock, LuUsers, LuMapPin } from "react-icons/lu";
import type { Tour } from "@/shared/types/domain";
import { cn } from "@/lib/utils";
import { PillBadge } from "./pill-badge";

export type TourCardProps = {
	tour: Tour;
	/** Prefix for the savings badge (e.g. "Save $"). */
	savePrefix?: string;
	/** Label above the price column (e.g. "Starting at"). */
	startingAt?: string;
	/** When set, the whole card navigates to this href. */
	href?: string;
	className?: string;
};

const DEFAULT_SAVE_PREFIX = "Save $";
const DEFAULT_STARTING_AT = "Starting at";

export function TourCard({
	tour,
	savePrefix = DEFAULT_SAVE_PREFIX,
	startingAt = DEFAULT_STARTING_AT,
	href,
	className,
}: TourCardProps) {
	const shell = (
		<div
			data-tour-card
			className={cn(
				"group relative isolate h-full overflow-hidden rounded-3xl border border-white/10 bg-[#101010] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] transform-gpu",
				className,
			)}
		>
			<div className="relative h-64 overflow-hidden rounded-t-3xl isolate" data-tour-card-image>
				<Image
					src={tour.image}
					alt={tour.title}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
					className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
				{tour.originalPrice && (
					<span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85 backdrop-blur-md">
						{savePrefix}
						{(tour.originalPrice - tour.price).toLocaleString()}
					</span>
				)}
				<div className="absolute bottom-5 left-4 right-4 flex items-center justify-between gap-3">
					<div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 backdrop-blur-md">
						<LuMapPin className="h-3.5 w-3.5 text-orange-500" />
						<span className="text-xs font-medium text-white/85">
							{tour.destination}
						</span>
					</div>
					<div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 backdrop-blur-md">
						<LuStar className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
						<span className="text-xs font-semibold text-white">{tour.rating}</span>
						{tour.reviews != null && (
							<span className="text-xs text-white/50">({tour.reviews})</span>
						)}
					</div>
				</div>
			</div>

			<div className="p-6">
				<h3 className="mb-3 text-2xl font-semibold leading-tight tracking-tight text-white transition-colors duration-200 group-hover:text-orange-400">
					{tour.title}
				</h3>

				<div className="mb-5 flex flex-wrap gap-2">
					{tour.highlights.map((hl) => (
						<PillBadge key={hl}>{hl}</PillBadge>
					))}
				</div>

				<div className="mb-5 grid grid-cols-2 gap-4 text-xs text-white/55">
					<span className="flex items-center gap-1.5">
						<LuClock className="h-3.5 w-3.5 text-orange-500" />
						{tour.duration}
					</span>
					<span className="flex items-center gap-1.5">
						<LuUsers className="h-3.5 w-3.5 text-orange-500" />
						{tour.groupSize}
					</span>
				</div>

				<div className="flex items-end justify-between border-t border-white/10 pt-5">
					<div className="text-[11px] uppercase tracking-[0.14em] text-white/55">
						{startingAt}
					</div>
					<div className="text-right">
						{tour.originalPrice && (
							<p className="text-xs text-white/55 line-through">
								${tour.originalPrice.toLocaleString()}
							</p>
						)}
						<p className="text-2xl font-semibold tracking-tight text-orange-500">
							${tour.price.toLocaleString()}
						</p>
					</div>
				</div>
			</div>
		</div>
	);

	if (href) {
		return (
			<Link href={href} aria-label={tour.title} className="block h-full">
				{shell}
			</Link>
		);
	}

	return shell;
}
