"use client";

import { useRef } from "react";
import { StoryBodyBlock } from "@/features/stories/sections/story-details-body-blocks";
import {
	createStaggerReveal,
	prefersReducedMotion,
	useGsapContext
} from "@/lib/useGsap";
import type { Story } from "@/shared/types/domain";

type StoryDetailsBodyProps = {
	story: Story;
};

export default function StoryDetailsBody({ story }: StoryDetailsBodyProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const leadIndex = story.body.findIndex(block => block.type === "paragraph");

	useGsapContext(sectionRef, () => {
		if (prefersReducedMotion()) return;
		const lines = sectionRef.current?.querySelectorAll("[data-st-line]");
		if (!lines?.length) return;
		createStaggerReveal(lines, sectionRef.current, {
			y: 24,
			duration: 0.7,
			stagger: 0.06,
			start: "top 88%"
		});
	}, [story.slug]);

	return (
		<section
			ref={sectionRef}
			aria-label="Story body"
			className="border-b border-white/10 bg-[#0a0a0a] text-white"
		>
			<div className="pad-x py-16 md:py-24">
				<div className="mx-auto max-w-[68ch] space-y-8 md:space-y-10">
					{story.body.map((block, index) => (
						<StoryBodyBlock
							key={`${block.type}-${index}`}
							block={block}
							lead={index === leadIndex}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
