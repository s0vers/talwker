"use client";

import Image from "next/image";
import type { StoryBodyBlock } from "@/shared/types/domain";

export function StoryBodyBlock({ block }: { block: StoryBodyBlock }) {
	if (block.type === "paragraph") {
		return (
			<p
				data-st-line
				className="text-base leading-[1.85] text-white/70 md:text-lg md:leading-[1.85]"
			>
				{block.text}
			</p>
		);
	}

	if (block.type === "pullquote") {
		return (
			<blockquote
				data-st-line
				className="border-l-2 border-orange-500/80 pl-6 md:pl-8"
			>
				<p className="text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl md:leading-snug">
					{block.text}
				</p>
			</blockquote>
		);
	}

	return (
		<figure data-st-line className="my-2">
			<div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
				<Image
					src={block.src}
					alt={block.alt}
					fill
					sizes="(max-width: 768px) 100vw, 960px"
					className="object-cover"
				/>
			</div>
			<figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
				{block.alt}
			</figcaption>
		</figure>
	);
}
