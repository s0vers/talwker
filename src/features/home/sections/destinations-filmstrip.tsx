"use client";

import Image from "next/image";
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
			className={cn("grid grid-cols-4 gap-2 md:gap-3", className)}
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
							"relative h-16 rounded-xl p-px transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] sm:h-20 md:h-24",
							active ? "bg-orange-500" : "bg-white/15 hover:bg-white/35",
						)}
					>
						<span className="relative block h-full overflow-hidden rounded-[0.7rem] bg-[#050505]">
							<Image
								src={dest.image}
								alt=""
								fill
								sizes="(max-width: 768px) 25vw, 160px"
								className="object-cover"
							/>
							<span className="absolute inset-0 bg-black/35" />
							<span className="absolute bottom-1.5 left-2 right-2 truncate text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:text-[11px]">
								{dest.name}
							</span>
							{active && showProgress ? (
								<span
									aria-hidden
									className="absolute inset-x-0 bottom-0 h-0.5 bg-white/20"
								>
									<span
										className="block h-full origin-left bg-orange-500"
										style={{
											transform: `scaleX(${Math.min(1, Math.max(0, progress))})`,
										}}
									/>
								</span>
							) : null}
						</span>
					</button>
				);
			})}
		</div>
	);
}
