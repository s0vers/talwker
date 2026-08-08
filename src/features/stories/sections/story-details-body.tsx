"use client";

import { useRef } from "react";
import { StoryBodyBlock } from "@/features/stories/sections/story-details-body-blocks";
import {
	createStaggerReveal,
	prefersReducedMotion,
	useGsapContext,
} from "@/lib/useGsap";
import type { Story } from "@/shared/types/domain";

type StoryDetailsBodyProps = {
	story: Story;
};

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
					<StoryBodyBlock key={`${block.type}-${index}`} block={block} />
				))}
			</div>
		</section>
	);
}
