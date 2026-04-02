import Image from "next/image";
import {
	storyKickerClass,
	storyMediaBorderClass,
	storyQuoteBorderClass,
} from "@/features/destination-details/lib/story-ui-classes";
import type { DestinationNarrativeSectionProps } from "@/features/destination-details/lib/story-types";

export function MovementPeoplePortrait({ model }: DestinationNarrativeSectionProps) {
	return (
		<section className="px-4 py-14 md:px-8 md:py-20" data-story-scene="people">
			<div className="mb-8 max-w-2xl">
				<p className={storyKickerClass}>{model.peoplePortrait.kicker}</p>
				<h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">{model.peoplePortrait.title}</h2>
				<p className="mt-4 text-sm leading-relaxed text-white/80 md:text-base">{model.peoplePortrait.body}</p>
			</div>
			<div className="grid gap-4 md:grid-cols-3">
				{model.peoplePortrait.portraits.map((portrait, index) => (
					<article
						key={`${portrait.src}-${index}`}
						className={`overflow-hidden rounded-[1.25rem] bg-white/2 ${storyMediaBorderClass}`}
						data-story-reveal
						data-story-media
					>
						<Image
							src={portrait.src}
							alt={portrait.alt}
							width={900}
							height={1200}
							className="h-72 w-full object-cover md:h-80"
						/>
					</article>
				))}
			</div>
			{model.peoplePortrait.pullQuote ? (
				<blockquote
					className={`mx-auto mt-8 max-w-3xl pl-5 text-lg italic leading-relaxed text-white/90 md:text-2xl ${storyQuoteBorderClass}`}
				>
					{model.peoplePortrait.pullQuote}
				</blockquote>
			) : null}
		</section>
	);
}
