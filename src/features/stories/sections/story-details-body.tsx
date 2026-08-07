"use client";

import Image from "next/image";
import { useRef } from "react";
import {
	createStaggerReveal,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import type { Story, StoryBodyBlock } from "@/shared/types/domain";

type StoryDetailsBodyProps = {
	story: Story;
};

function BodyBlock({ block }: { block: StoryBodyBlock }) {
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

export default function StoryDetailsBody({ story }: StoryDetailsBodyProps) {
	const sectionRef = useRef<HTMLElement>(null);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const lines = sectionRef.current?.querySelectorAll("[data-st-line]");
			if (!lines?.length) return;
			createStaggerReveal(lines, sectionRef.current, {
				y: 24,
				duration: 0.7,
				stagger: 0.06,
				start: "top 88%",
			});
		},
		[story.slug],
	);

	return (
		<section
			ref={sectionRef}
			aria-label="Story body"
			className="border-b border-white/10 bg-[#0a0a0a] text-white"
		>
			<div className="mx-auto max-w-[960px] space-y-10 pad-x py-16 md:space-y-12 md:py-24">
				{story.body.map((block, index) => (
					<BodyBlock key={`${block.type}-${index}`} block={block} />
				))}
			</div>
		</section>
	);
}
