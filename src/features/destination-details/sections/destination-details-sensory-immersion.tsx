import Image from "next/image";
import {
	destinationDetailsBodyClass,
	destinationDetailsKickerClass,
	destinationDetailsMediaBorderClass,
	destinationDetailsSectionHeadingClass,
} from "@/features/destination-details/lib/destination-details-ui-classes";
import type { DestinationNarrativeSectionProps } from "@/features/destination-details/lib/destination-details-types";

/** Chapter: centered sensory copy + texture grid. */
export function DestinationDetailsSensoryImmersion({ model }: DestinationNarrativeSectionProps) {
	return (
		<section className="py-14 pad-x md:py-20" data-story-scene="sensory">
			<div className="mx-auto max-w-[1600px]">
				<div className="mx-auto max-w-2xl space-y-5 text-center md:space-y-6">
					<p className={destinationDetailsKickerClass}>{model.sensoryImmersion.kicker}</p>
					<h2 className={destinationDetailsSectionHeadingClass}>{model.sensoryImmersion.title}</h2>
					<p className={destinationDetailsBodyClass}>{model.sensoryImmersion.body}</p>
				</div>
				<div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:gap-4">
					{model.sensoryImmersion.textures.map((texture, idx) => (
						<div
							key={`${texture.src}-${idx}`}
							className={`overflow-hidden rounded-2xl ${destinationDetailsMediaBorderClass}`}
							data-story-card
							data-story-media
						>
							<Image
								src={texture.src}
								alt={texture.alt}
								width={1000}
								height={1000}
								className="aspect-4/3 w-full object-cover md:aspect-16/10 md:h-80 md:max-h-88"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
