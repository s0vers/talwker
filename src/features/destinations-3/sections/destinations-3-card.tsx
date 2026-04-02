"use client";

import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/shared/types/domain";
import { cn } from "@/lib/utils";

export type Destinations3CardProps = {
	destination: Destination;
	href: string;
};

export function Destinations3Card({ destination, href }: Destinations3CardProps) {
	const { name, country, image, duration, tag } = destination;

	return (
		<Link
			href={href}
			className={cn(
				"group relative flex min-h-[300px] flex-col overflow-hidden rounded-sm bg-[#080808] ring-1 ring-inset ring-white/10",
				"transition-[transform,ring-color] duration-300 hover:-translate-y-0.5 hover:ring-orange-500/25",
			)}
		>
			<div className="relative flex aspect-16/10 w-full overflow-hidden">
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
				{tag ? (
					<span className="absolute bottom-3 right-3 rounded-sm bg-black/55 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-orange-200/90">
						{tag}
					</span>
				) : null}
			</div>

			<div className="flex flex-1 flex-col gap-2 p-5">
				<div>
					<p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">{country}</p>
					<h3 className="mt-1 text-xl font-semibold tracking-tight text-white md:text-2xl">{name}</h3>
				</div>
				<p className="mt-auto pt-3 text-xs text-white/48">{duration}</p>
			</div>
		</Link>
	);
}
