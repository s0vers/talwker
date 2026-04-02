import Image from "next/image";
import type { DestinationNarrativeViewModel } from "@/features/destination-details/lib/story-types";

type Props = {
	model: DestinationNarrativeViewModel;
};

export function MovementPeoplePortrait({ model }: Props) {
	return (
		<section className="px-4 py-14 md:px-8 md:py-20" data-story-scene="people">
			<div className="mb-8 max-w-2xl">
				<p className="text-xs uppercase tracking-[0.3em] text-white/60">{model.peoplePortrait.kicker}</p>
				<h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">{model.peoplePortrait.title}</h2>
				<p className="mt-4 text-sm leading-relaxed text-white/80 md:text-base">{model.peoplePortrait.body}</p>
			</div>
			<div className="grid gap-4 md:grid-cols-3">
				{model.peoplePortrait.portraits.map((portrait, index) => (
					<article
						key={`${portrait.src}-${index}`}
						className="overflow-hidden rounded-[1.25rem] border border-white/15 bg-white/[0.02]"
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
				<blockquote className="mx-auto mt-8 max-w-3xl border-l border-white/35 pl-5 text-lg italic leading-relaxed text-white/90 md:text-2xl">
					{model.peoplePortrait.pullQuote}
				</blockquote>
			) : null}
		</section>
	);
}
