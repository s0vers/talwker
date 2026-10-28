import Image from "next/image";
import {
	destinationDetailsFrameRingClass,
	destinationDetailsKickerOnImageClass,
} from "@/features/destination-details/lib/destination-details-ui-classes";
import type { DestinationNarrativeSectionProps } from "@/features/destination-details/lib/destination-details-types";

/** Opening chapter: hero image, destination label, title + lede. */
export function DestinationDetailsAtmosphere({ model }: DestinationNarrativeSectionProps) {
	return (
		<section className="relative min-h-[94svh] pb-16 pt-14 pad-x md:pb-20 md:pt-20" data-story-scene="atmosphere">
			<div className="mx-auto max-w-[1600px]">
				<div
					className={`relative flex min-h-[74svh] flex-col justify-end overflow-hidden rounded-4xl ${destinationDetailsFrameRingClass}`}
					data-story-reveal
					data-story-media
				>
					<Image
						src={model.atmosphere.hero.src}
						alt={model.atmosphere.hero.alt}
						fill
						sizes="(min-width: 1600px) 1408px, 100vw"
						className="object-cover"
						priority
					/>
					<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
					<div className="absolute right-5 top-5 hidden rounded-full border border-orange-500/30 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-orange-500/95 md:block">
						{model.destinationLabel}
					</div>
					<div className="relative p-6 pt-24 md:p-10 md:pt-28">
						<p className={`mb-4 md:mb-6 ${destinationDetailsKickerOnImageClass}`}>{model.atmosphere.kicker}</p>
						<div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
							<h1
								className="max-w-5xl text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-balance lg:col-span-8 lg:max-w-none"
								data-story-line
							>
								{model.atmosphere.title}
							</h1>
							<p
								className="max-w-2xl text-sm leading-relaxed text-white/80 md:text-base md:leading-relaxed lg:col-span-4 lg:max-w-none lg:border-l lg:border-orange-500/35 lg:pl-6"
								data-story-line
							>
								{model.atmosphere.body}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
