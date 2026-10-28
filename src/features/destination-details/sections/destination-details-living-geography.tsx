import Image from "next/image";
import {
	destinationDetailsFrameRingClass,
	destinationDetailsKickerClass,
	destinationDetailsMediaBorderClass,
	destinationDetailsStatBorderClass,
	destinationDetailsStatLabelClass,
} from "@/features/destination-details/lib/destination-details-ui-classes";
import type { DestinationNarrativeSectionProps } from "@/features/destination-details/lib/destination-details-types";

/** Chapter: terrain, routines, context + documentary images. */
export function DestinationDetailsLivingGeography({ model }: DestinationNarrativeSectionProps) {
	return (
		<section className="py-14 pad-x md:py-20" data-story-scene="geography">
			<div className="mx-auto grid max-w-[1600px] gap-8 md:grid-cols-[1.08fr_0.92fr] md:gap-12">
				<div className="space-y-5">
					<p className={destinationDetailsKickerClass} data-story-item>
						{model.livingGeography.kicker}
					</p>
					<h2
						className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl"
						data-story-line
					>
						{model.livingGeography.title}
					</h2>
					<p
						className="max-w-xl text-sm leading-relaxed text-white/55 md:text-base md:leading-relaxed"
						data-story-line
					>
						{model.livingGeography.body}
					</p>
					<div className="mt-8 grid grid-cols-2 gap-3">
						<span className={destinationDetailsStatLabelClass + " " + destinationDetailsStatBorderClass}>
							Slope
						</span>
						<span className={destinationDetailsStatLabelClass + " " + destinationDetailsStatBorderClass}>
							Weather
						</span>
						<span className={destinationDetailsStatLabelClass + " " + destinationDetailsStatBorderClass}>
							Distance
						</span>
						<span className={destinationDetailsStatLabelClass + " " + destinationDetailsStatBorderClass}>
							Routine
						</span>
					</div>
				</div>
				<div className="relative min-h-80">
					<div
						className={`absolute inset-0 overflow-hidden rounded-[1.6rem] ${destinationDetailsFrameRingClass}`}
						data-story-reveal
						data-story-media
					>
						<Image
							src={model.livingGeography.context.src}
							alt={model.livingGeography.context.alt}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</div>
					<div
						className={`absolute -bottom-8 -left-4 w-[62%] overflow-hidden rounded-[1.1rem] shadow-2xl md:-left-8 ${destinationDetailsMediaBorderClass}`}
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
