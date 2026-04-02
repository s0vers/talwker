import Image from "next/image";
import { storyKickerClass, storyMediaBorderClass } from "@/features/destination-details/lib/story-ui-classes";
import type { DestinationNarrativeViewModel } from "@/features/destination-details/lib/story-types";

type Props = {
	model: DestinationNarrativeViewModel;
};

export function MovementSensoryImmersion({ model }: Props) {
	return (
		<section className="px-4 py-14 md:px-8 md:py-20" data-story-scene="sensory">
			<div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
				<div className="space-y-5">
					<p className={storyKickerClass}>{model.sensoryImmersion.kicker}</p>
					<h2 className="text-3xl font-semibold leading-tight md:text-5xl">{model.sensoryImmersion.title}</h2>
					<p className="max-w-md text-sm leading-relaxed text-white/80 md:text-base">{model.sensoryImmersion.body}</p>
				</div>
				<div className="grid grid-cols-2 gap-3">
					{model.sensoryImmersion.textures.map((texture, idx) => (
						<div
							key={`${texture.src}-${idx}`}
							className={`overflow-hidden rounded-2xl ${storyMediaBorderClass}`}
							data-story-card
							data-story-media
						>
							<Image
								src={texture.src}
								alt={texture.alt}
								width={1000}
								height={1000}
								className="h-56 w-full object-cover md:h-72"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
