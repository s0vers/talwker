import Image from "next/image";
import {
	destinationDetailsBodyClass,
	destinationDetailsKickerClass,
	destinationDetailsMediaBorderClass,
	destinationDetailsQuoteBorderClass,
	destinationDetailsSectionHeadingClass,
} from "@/features/destination-details/lib/destination-details-ui-classes";
import type { DestinationNarrativeSectionProps } from "@/features/destination-details/lib/destination-details-types";

/** Chapter: residents, portraits, optional pull quote. */
export function DestinationDetailsPeoplePortrait({ model }: DestinationNarrativeSectionProps) {
	const portraitColumnsClass =
		model.peoplePortrait.portraits.length >= 3
			? "md:grid-cols-3"
			: model.peoplePortrait.portraits.length === 2
				? "md:grid-cols-2"
				: "";

	return (
		<section className="mx-auto max-w-[1600px] py-14 pad-x md:py-20" data-story-scene="people">
			<div className="mb-8 max-w-2xl">
				<p className={destinationDetailsKickerClass}>{model.peoplePortrait.kicker}</p>
				<h2 className={"mt-3 " + destinationDetailsSectionHeadingClass}>{model.peoplePortrait.title}</h2>
				<p className={"mt-4 " + destinationDetailsBodyClass}>{model.peoplePortrait.body}</p>
			</div>
			<div className={`grid gap-4 ${portraitColumnsClass}`}>
				{model.peoplePortrait.portraits.map((portrait, index) => (
					<article
						key={`${portrait.src}-${index}`}
						className={`overflow-hidden rounded-[1.25rem] bg-white/2 ${destinationDetailsMediaBorderClass}`}
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
					className={`mx-auto mt-8 max-w-3xl pl-5 text-lg italic leading-relaxed text-white/85 md:text-2xl ${destinationDetailsQuoteBorderClass}`}
				>
					{model.peoplePortrait.pullQuote}
				</blockquote>
			) : null}
		</section>
	);
}
