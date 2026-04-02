import Image from "next/image";
import {
	storyFrameRingClass,
	storyKickerClass,
	storyMediaBorderClass,
	storyMicroRailClass,
	storyStatBorderClass,
} from "@/features/destination-details/lib/story-ui-classes";
import type { DestinationNarrativeViewModel } from "@/features/destination-details/lib/story-types";

type Props = {
	model: DestinationNarrativeViewModel;
};

export function MovementLivingGeography({ model }: Props) {
	return (
		<section className="py-14 pad-x md:py-20" data-story-scene="geography">
			<div className="mx-auto grid max-w-[1600px] gap-8 md:grid-cols-[1.08fr_0.92fr] md:gap-12">
				<div className="space-y-5">
					<p className={storyKickerClass} data-story-item>
						{model.livingGeography.kicker}
					</p>
					<h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-5xl" data-story-line>
						{model.livingGeography.title}
					</h2>
					<p className="max-w-xl text-sm leading-relaxed text-white/80 md:text-base" data-story-line>
						{model.livingGeography.body}
					</p>
					<div className="mt-8 grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.22em] text-white/55">
						<span className={storyStatBorderClass}>Slope</span>
						<span className={storyStatBorderClass}>Weather</span>
						<span className={storyStatBorderClass}>Distance</span>
						<span className={storyStatBorderClass}>Routine</span>
					</div>
				</div>
				<div className="relative">
					<div
						className={`relative overflow-hidden rounded-[1.6rem] border border-white/12 ${storyFrameRingClass}`}
						data-story-reveal
						data-story-media
					>
						<Image
							src={model.livingGeography.context.src}
							alt={model.livingGeography.context.alt}
							width={1200}
							height={900}
							className="h-full w-full object-cover"
						/>
					</div>
					<div
						className={`absolute -bottom-8 -left-4 w-[62%] overflow-hidden rounded-[1.1rem] shadow-2xl md:-left-8 ${storyMediaBorderClass}`}
					>
						<Image
							src={model.livingGeography.documentary.src}
							alt={model.livingGeography.documentary.alt}
							width={800}
							height={1000}
							className="h-full w-full object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
