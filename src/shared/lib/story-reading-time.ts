import type { StoryBodyBlock } from "@/shared/types/domain";

/** Approximate reading pace: 200 words/minute, or 500 Japanese characters/minute. */
export function getStoryReadMinutes(
	body: readonly StoryBodyBlock[],
	locale = "en"
): number {
	const text = body
		.flatMap(block => (block.type === "image" ? [] : [block.text]))
		.join(" ");
	if (locale.startsWith("ja")) {
		return Math.max(1, Math.ceil(text.replace(/\s/g, "").length / 500));
	}
	const words = Array.from(
		new Intl.Segmenter(locale, { granularity: "word" }).segment(text)
	).filter(segment => segment.isWordLike).length;
	return Math.max(1, Math.ceil(words / 200));
}
