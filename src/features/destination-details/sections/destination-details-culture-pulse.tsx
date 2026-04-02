import Image from "next/image";
import {
	destinationDetailsBodyClass,
	destinationDetailsKickerClass,
	destinationDetailsMediaBorderClass,
	destinationDetailsSectionHeadingClass,
} from "@/features/destination-details/lib/destination-details-ui-classes";
import type { DestinationNarrativeSectionProps } from "@/features/destination-details/lib/destination-details-types";

/** Overlap collage: back → mid → front (z-index). Positions tuned so layers read as one cluster, not random stacks. */
const COLLAGE_LAYERS = [
	"left-0 bottom-0 z-[1] h-[86%] w-[64%] max-w-none",
	"right-0 bottom-[2%] z-[2] h-[70%] w-[52%] max-w-none",
	"left-[6%] top-0 z-[3] h-[44%] w-[38%] max-w-none shadow-[0_24px_60px_-12px_rgba(0,0,0,0.65)]",
] as const;

/** Chapter: culture copy + image collage or single anchor. */
export function DestinationDetailsCulturePulse({ model }: DestinationNarrativeSectionProps) {
	const images = model.culturePulse.cultureImages.filter(Boolean);

	return (
		<section className="relative py-14 pad-x md:py-20" data-story-scene="culture">
			<div className="mx-auto max-w-[1600px]">
				<div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:items-end">
					<div className="lg:order-2 lg:col-span-5 lg:flex lg:flex-col lg:justify-end lg:pl-4 xl:pl-10">
						<p className={destinationDetailsKickerClass}>{model.culturePulse.kicker}</p>
						<h2 className={"mt-3 " + destinationDetailsSectionHeadingClass}>{model.culturePulse.title}</h2>
						<p className={"mt-4 max-w-lg " + destinationDetailsBodyClass}>{model.culturePulse.body}</p>
					</div>

					<div className="relative min-h-0 lg:order-1 lg:col-span-7">
						{images.length === 1 ? (
							<div className={`overflow-hidden rounded-[1.2rem] ${destinationDetailsMediaBorderClass}`} data-story-item>
								<Image
									src={images[0].src}
									alt={images[0].alt}
									width={1400}
									height={900}
									className="aspect-16/10 w-full object-cover"
									sizes="(min-width: 1024px) 50vw, 90vw"
								/>
							</div>
						) : (
							<div className="relative min-h-88 sm:min-h-104 lg:min-h-120">
								{images.map((image, idx) => (
									<div
										key={`${image.src}-${idx}`}
										className={`absolute overflow-hidden rounded-[1.2rem] ${destinationDetailsMediaBorderClass} ${COLLAGE_LAYERS[idx] ?? COLLAGE_LAYERS[COLLAGE_LAYERS.length - 1]}`}
										data-story-item
										data-story-media
									>
										<Image
											src={image.src}
											alt={image.alt}
											width={1200}
											height={900}
											className="h-full w-full object-cover"
											sizes="(min-width: 1024px) 40vw, 90vw"
										/>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
