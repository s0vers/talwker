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
				"group relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d0d] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-orange-500/50 hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] transform-gpu",
				className,
			)}
		>
			<div className="relative h-64 overflow-hidden rounded-t-[2rem] isolate" data-tour-card-image>
				<Image
					src={tour.image}
					alt={tour.title}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
					className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 transform-gpu"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/30 to-transparent" />
				{tour.originalPrice && (
					<span className="absolute right-4 top-4 rounded-full border border-orange-500/30 bg-black/60 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-400 backdrop-blur-md shadow-lg">
						{savePrefix}
						{(tour.originalPrice - tour.price).toLocaleString()}
					</span>
				)}
				<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
					<div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3.5 py-1.5 backdrop-blur-md shadow-md">
						<LuMapPin className="h-3.5 w-3.5 text-orange-500" />
						<span className="text-xs font-semibold text-white/90">
							{tour.destination}
						</span>
					</div>
					<div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 backdrop-blur-md shadow-md">
						<LuStar className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
						<span className="text-xs font-bold text-white">{tour.rating}</span>
						{tour.reviews != null && (
							<span className="text-xs text-white/50">({tour.reviews})</span>
						)}
					</div>
				</div>
			</div>

			<div className="flex flex-1 flex-col justify-between p-6 pt-5">
				<div>
					<h3 className="mb-3 text-2xl font-extrabold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-orange-400">
						{tour.title}
					</h3>

					<div className="mb-5 flex flex-wrap gap-2">
						{tour.highlights.map((hl) => (
							<PillBadge key={hl} className="border-white/10 bg-white/[0.04] text-white/70">
								{hl}
							</PillBadge>
						))}
					</div>
				</div>

				<div>
					<div className="mb-5 grid grid-cols-2 gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-white/60">
						<span className="flex items-center gap-2 font-medium">
							<LuClock className="h-4 w-4 text-orange-500" />
							{tour.duration}
						</span>
						<span className="flex items-center gap-2 font-medium">
							<LuUsers className="h-4 w-4 text-orange-500" />
							{tour.groupSize}
						</span>
					</div>

					<div className="flex items-end justify-between border-t border-white/10 pt-4">
						<div>
							<span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 block">
								{startingAt}
							</span>
							{tour.originalPrice && (
								<span className="text-xs text-white/40 line-through">
									${tour.originalPrice.toLocaleString()}
								</span>
							)}
						</div>
						<div className="text-right">
							<span className="text-2xl font-extrabold tracking-tight text-orange-500">
								${tour.price.toLocaleString()}
							</span>
						</div>
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
