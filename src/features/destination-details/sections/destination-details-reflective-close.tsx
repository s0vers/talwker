import Image from "next/image";
import {
	destinationDetailsBodyOnImageClass,
	destinationDetailsCloseHeadingClass,
	destinationDetailsKickerOnImageClass,
} from "@/features/destination-details/lib/destination-details-ui-classes";
import type { DestinationNarrativeSectionProps } from "@/features/destination-details/lib/destination-details-types";

/** Closing chapter: full-bleed image, title + body overlay. */
export function DestinationDetailsReflectiveClose({ model }: DestinationNarrativeSectionProps) {
	return (
		<section className="relative pb-20 pt-14 pad-x md:pb-28 md:pt-24" data-story-scene="close">
			<div className="mx-auto max-w-[1600px] border-t border-orange-500/20 pt-8 md:pt-10">
				<div className="relative flex min-h-[40svh] flex-col justify-end overflow-hidden rounded-[1.6rem] border border-white/12 md:min-h-[48svh]" data-story-reveal data-story-media>
					<Image
						src={model.reflectiveClose.closingImage.src}
						alt={model.reflectiveClose.closingImage.alt}
						fill
						sizes="(min-width: 1600px) 1408px, 100vw"
						className="object-cover"
					/>
					<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
					<div className="relative p-5 pt-20 md:p-8 md:pt-24">
						<p className={destinationDetailsKickerOnImageClass}>{model.reflectiveClose.kicker}</p>
						<h2 className={"mt-3 max-w-3xl " + destinationDetailsCloseHeadingClass}>
							{model.reflectiveClose.title}
						</h2>
						<p className={"mt-3 max-w-2xl " + destinationDetailsBodyOnImageClass}>
							{model.reflectiveClose.body}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
