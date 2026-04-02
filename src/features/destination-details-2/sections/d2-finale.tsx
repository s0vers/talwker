import Image from "next/image";
import { d2BodyClass, d2KickerClass } from "@/features/destination-details-2/lib/d2-ui-classes";
import type { DestinationNarrativeViewModel } from "@/features/destination-details/lib/story-types";

export function D2Finale({ model }: { model: DestinationNarrativeViewModel }) {
	const { reflectiveClose } = model;

	return (
		<section className="bg-[#040404] py-16 text-white md:py-24" aria-labelledby="d2-finale-title">
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
					<div className="relative aspect-[16/11] overflow-hidden rounded-sm border border-white/10" data-d2-reveal>
						<Image
							src={reflectiveClose.closingImage.src}
							alt={reflectiveClose.closingImage.alt}
							fill
							className="object-cover"
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
					</div>
					<div data-d2-line>
						{reflectiveClose.kicker ? <p className={d2KickerClass}>{reflectiveClose.kicker}</p> : null}
						<h2 id="d2-finale-title" className="mt-5 font-serif text-3xl font-medium md:text-4xl">
							{reflectiveClose.title}
						</h2>
						<p className={"mt-6 " + d2BodyClass}>{reflectiveClose.body}</p>
					</div>
				</div>
			</div>
		</section>
	);
}
