import Image from "next/image";
import {
	destinationDetails2BodyClass,
	destinationDetails2KickerClass,
} from "@/features/destination-details-2/lib/destination-details-2-ui-classes";
import type { DestinationNarrativeViewModel } from "@/features/destination-details/lib/destination-details-types";

export function DestinationDetails2Finale({ model }: { model: DestinationNarrativeViewModel }) {
	const { reflectiveClose } = model;

	return (
		<section
			className="bg-[#040404] py-16 text-white md:py-24"
			aria-labelledby="destination-details-2-finale-title"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
					<div className="relative aspect-[16/11] overflow-hidden rounded-sm border border-white/10" data-d2-reveal>
						<div className="absolute inset-0" data-d2-media>
							<Image
								src={reflectiveClose.closingImage.src}
								alt={reflectiveClose.closingImage.alt}
								fill
								className="object-cover scale-[1.06]"
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>
						</div>
					</div>
					<div data-d2-line>
						{reflectiveClose.kicker ? (
							<p className={destinationDetails2KickerClass}>{reflectiveClose.kicker}</p>
						) : null}
						<h2
							id="destination-details-2-finale-title"
							className={
								(reflectiveClose.kicker ? "mt-5 " : "mt-6 ") +
								"text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
							}
						>
							{reflectiveClose.title}
						</h2>
						<p className={"mt-6 " + destinationDetails2BodyClass}>{reflectiveClose.body}</p>
					</div>
				</div>
			</div>
		</section>
	);
}
