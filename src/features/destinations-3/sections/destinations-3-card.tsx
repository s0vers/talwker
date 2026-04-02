"use client";

import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/shared/types/domain";
import { cn } from "@/lib/utils";

export type Destinations3CardProps = {
	destination: Destination;
	href: string;
	indexLabel: string;
};

export function Destinations3Card({ destination, href, indexLabel }: Destinations3CardProps) {
	const { name, country, image, duration, tag } = destination;

	return (
		<Link
			href={href}
			className={cn(
				"group relative flex min-h-[300px] flex-col overflow-hidden rounded-sm border border-white/10 bg-[#080808]",
				"transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-orange-500/30",
			)}
		>
			<div className="relative flex aspect-[16/10] w-full overflow-hidden">
				<span
					className="absolute left-0 top-0 z-10 flex h-full w-11 items-center justify-center border-r border-white/10 bg-black/70 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-400/95"
					aria-hidden
				>
					{indexLabel}
				</span>
				<div className="relative min-h-0 flex-1">
					<Image
						src={image}
						alt={`${name}, ${country}`}
						fill
						className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
					/>
					<div
						className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent"
						aria-hidden
					/>
				</div>
				{tag ? (
					<span className="absolute bottom-3 right-3 rounded-sm border border-white/15 bg-black/60 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-orange-200/90">
						{tag}
					</span>
				) : null}
			</div>

			<div className="flex flex-1 flex-col gap-2 border-t border-white/8 p-5 pl-6">
				<div>
					<p className="font-mono text-[9px] font-medium uppercase tracking-[0.24em] text-white/38">{country}</p>
					<h3 className="mt-1 text-xl font-semibold tracking-tight text-white md:text-2xl">{name}</h3>
				</div>
				<p className="mt-auto border-t border-white/8 pt-3 text-xs text-white/48">{duration} · field guide</p>
			</div>
		</Link>
	);
}
