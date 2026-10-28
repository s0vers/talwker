"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { StoryBodyBlock } from "@/shared/types/domain";

export function StoryBodyBlock({
	block,
	lead = false
}: {
	block: StoryBodyBlock;
	lead?: boolean;
}) {
	if (block.type === "paragraph") {
		return (
			<p
				data-st-line
				className={cn(
					"text-base leading-[1.75] text-white/75 md:text-lg",
					lead && "text-lg text-white/90 md:text-xl"
				)}
			>
				{block.text}
			</p>
		);
	}

	if (block.type === "pullquote") {
		return (
			<blockquote
				data-st-line
				className="border-l-2 border-orange-500/80 py-4 pl-6 md:py-6 md:pl-8"
			>
				<p className="text-xl leading-snug font-semibold tracking-tight text-white md:text-2xl md:leading-snug">
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
					sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1024px) calc(100vw - 80px), 68ch"
					className="object-cover"
				/>
			</div>
			<figcaption className="mt-3 text-xs leading-relaxed text-white/65">
				{block.alt}
			</figcaption>
		</figure>
	);
}
