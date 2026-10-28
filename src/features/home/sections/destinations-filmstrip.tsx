"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { LuStar } from "react-icons/lu";
import type { DestinationSummary } from "@/features/home/lib/destination-summary";
import { DESTINATIONS_SECTION } from "@/features/home/content/section-copy";
import { cn } from "@/lib/utils";

export type DestinationsFilmstripProps = {
	destinations: readonly DestinationSummary[];
	activeIndex: number;
	cycle: number;
	showProgress: boolean;
	imagesReady: boolean;
	onSelect: (index: number) => void;
	className?: string;
};

export function DestinationsFilmstrip({
	destinations,
	activeIndex,
	cycle,
	showProgress,
	imagesReady,
	onSelect,
	className
}: DestinationsFilmstripProps) {
	const locale = useLocale();
	return (
		<div
			role="group"
			aria-label={DESTINATIONS_SECTION.filmstripLabel}
			data-scrollbar-none
			style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
			className={cn(
				"scrollbar-none flex flex-nowrap gap-3 overflow-x-auto pt-1 pb-3 sm:gap-3.5 lg:flex-col lg:overflow-x-visible lg:pt-0 lg:pb-0",
				className
			)}
		>
			{destinations.map((dest, index) => {
				const active = index === activeIndex;
				const image = (
					<Image
						src={dest.image}
						alt=""
						width={120}
						height={100}
						className={cn(
							"h-full w-full transform-gpu object-cover transition-transform duration-500 ease-out group-hover:scale-105",
							active ? "scale-105" : "scale-100"
						)}
					/>
				);
				return (
					<button
						key={dest.id}
						type="button"
						aria-label={`${dest.name}, ${dest.country}`}
						aria-current={active ? "true" : undefined}
						onClick={() => onSelect(index)}
						className={cn(
							"group relative flex w-[240px] shrink-0 transform-gpu items-center gap-3.5 rounded-2xl border p-2.5 text-left transition-[border-color,background-color,box-shadow,transform] duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-orange-500 sm:w-[270px] sm:p-3 lg:w-full",
							active
								? "border-orange-500/80 bg-orange-500/[0.08] shadow-[0_0_25px_rgba(249,115,22,0.18)]"
								: "border-white/10 bg-white/[0.02] hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.05]"
						)}
					>
						<div className="relative isolate h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-[#0a0a0a] sm:h-20 sm:w-24">
							{imagesReady ? image : <noscript>{image}</noscript>}
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
							<span className="absolute top-1.5 left-1.5 rounded-md bg-black/75 px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-white backdrop-blur-md">
								0{index + 1}
							</span>
						</div>

						<div className="min-w-0 flex-1">
							<div className="flex items-center justify-between gap-1">
								<span className="truncate text-[10px] font-semibold tracking-wider text-orange-400 uppercase">
									{dest.tag ? dest.tag : dest.country}
								</span>
								<span className="flex items-center gap-0.5 text-[11px] font-semibold text-white/80">
									<LuStar className="h-3 w-3 fill-orange-500 text-orange-500" />
									{dest.rating}
								</span>
							</div>

							<h4 className="mt-0.5 truncate text-sm font-bold tracking-tight text-white transition-colors group-hover:text-orange-400 sm:text-base">
								{dest.name}
							</h4>

							<div className="mt-1 flex items-center justify-between text-xs text-white/50">
								<span>{dest.duration}</span>
								<span className="font-semibold text-white/90">
									${dest.price.toLocaleString(locale)}
								</span>
							</div>
						</div>

						{active && showProgress ? (
							<span
								key={`${activeIndex}-${cycle}`}
								aria-hidden
								className="absolute inset-x-3 bottom-0 h-0.5 overflow-hidden rounded-full bg-white/10"
							>
								<span
									className="block h-full origin-left bg-orange-500 motion-reduce:animate-none"
									style={{ animation: "spotlightProgress 5s linear forwards" }}
								/>
							</span>
						) : null}
					</button>
				);
			})}
		</div>
	);
}
