"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Destination } from "@/shared/types/domain";
import { cn } from "@/lib/utils";

export type Destinations2CardProps = {
	destination: Destination;
	href: string;
};

export function Destinations2Card({ destination, href }: Destinations2CardProps) {
	const { name, country, image, price, duration, tag, rating } = destination;

	return (
		<Link
			href={href}
			className={cn(
				"group relative flex min-h-[320px] flex-col overflow-hidden rounded-sm border border-white/12 bg-[#0a0a0a]",
				"transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-orange-500/35 hover:shadow-[0_28px_80px_rgba(0,0,0,0.55)]",
			)}
		>
			<div className="relative aspect-4/3 w-full overflow-hidden">
				<Image
					src={image}
					alt={`${name}, ${country}`}
					fill
					className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
				/>
				<div
					className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent"
					aria-hidden
				/>
				{tag ? (
					<span className="absolute left-3 top-3 rounded border border-white/20 bg-black/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-500">
						{tag}
					</span>
				) : null}
				<span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] tabular-nums text-white/85">
					{rating.toFixed(1)} ★
				</span>
			</div>

			<div className="flex flex-1 flex-col gap-2 p-5">
				<div>
					<p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">{country}</p>
					<h3 className="mt-1 text-2xl font-semibold leading-tight tracking-tight text-white">{name}</h3>
				</div>
				<div className="mt-auto flex items-end justify-between gap-3 border-t border-white/10 pt-4 text-xs text-white/55">
					<span>{duration}</span>
					<span className="font-semibold tabular-nums text-orange-500">${price.toLocaleString()}</span>
				</div>
			</div>
		</Link>
	);
}
