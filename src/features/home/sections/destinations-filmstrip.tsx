"use client";

import Image from "next/image";
import { LuStar } from "react-icons/lu";
import type { Destination } from "@/shared/types/domain";
import { DESTINATIONS_SECTION } from "@/features/home/content/section-copy";
import { cn } from "@/lib/utils";

export type DestinationsFilmstripProps = {
	destinations: readonly Destination[];
	activeIndex: number;
	progress: number;
	showProgress: boolean;
	onSelect: (index: number) => void;
	className?: string;
};

export function DestinationsFilmstrip({
	destinations,
	activeIndex,
	progress,
	showProgress,
	onSelect,
	className,
}: DestinationsFilmstripProps) {
	return (
		<div
			role="group"
			aria-label={DESTINATIONS_SECTION.filmstripLabel}
			data-scrollbar-none
			style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
			className={cn(
				"flex flex-nowrap gap-3 overflow-x-auto pb-3 pt-1 scrollbar-none sm:gap-3.5 lg:flex-col lg:overflow-x-visible lg:pb-0 lg:pt-0",
				className,
			)}
		>
			{destinations.map((dest, index) => {
				const active = index === activeIndex;
				return (
					<button
						key={dest.id}
						type="button"
						aria-label={`${dest.name}, ${dest.country}`}
						aria-current={active ? "true" : undefined}
						onClick={() => onSelect(index)}
						className={cn(
							"group relative flex shrink-0 w-[240px] sm:w-[270px] lg:w-full items-center gap-3.5 rounded-2xl border p-2.5 sm:p-3 text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
							active
								? "border-orange-500/80 bg-orange-500/[0.08] shadow-[0_0_25px_rgba(249,115,22,0.18)]"
								: "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]",
						)}
					>
						<div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-[#0a0a0a] sm:h-20 sm:w-24">
							<Image
								src={dest.image}
								alt=""
								fill
								sizes="(max-width: 768px) 100px, 120px"
								className={cn(
									"object-cover transition-transform duration-500 group-hover:scale-105",
									active ? "scale-105" : "scale-100",
								)}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
							<span className="absolute left-1.5 top-1.5 rounded-md bg-black/75 px-1.5 py-0.5 text-[10px] font-mono font-bold tracking-wider text-white backdrop-blur-md">
								0{index + 1}
							</span>
						</div>

						<div className="min-w-0 flex-1">
							<div className="flex items-center justify-between gap-1">
								<span className="truncate text-[10px] font-semibold uppercase tracking-wider text-orange-400">
									{dest.tag ? dest.tag : dest.country}
								</span>
								<span className="flex items-center gap-0.5 text-[11px] font-semibold text-white/80">
									<LuStar className="h-3 w-3 fill-orange-500 text-orange-500" />
									{dest.rating}
								</span>
							</div>

							<h4 className="mt-0.5 truncate text-sm sm:text-base font-bold tracking-tight text-white transition-colors group-hover:text-orange-400">
								{dest.name}
							</h4>

							<div className="mt-1 flex items-center justify-between text-xs text-white/50">
								<span>{dest.duration}</span>
								<span className="font-semibold text-white/90">
									${dest.price.toLocaleString()}
								</span>
							</div>
						</div>

						{active && showProgress ? (
							<span
								aria-hidden
								className="absolute inset-x-3 bottom-0 h-0.5 overflow-hidden rounded-full bg-white/10"
							>
								<span
									className={cn(
										"block h-full origin-left bg-orange-500",
										progress > 0 ? "transition-transform duration-75" : "transition-none",
									)}
									style={{
										transform: `scaleX(${progress})`,
									}}
								/>
							</span>
						) : null}
					</button>
				);
			})}
		</div>
	);
}

