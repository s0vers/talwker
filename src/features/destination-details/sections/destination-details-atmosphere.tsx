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
					className={`relative overflow-hidden rounded-4xl border border-white/12 ${destinationDetailsFrameRingClass}`}
					data-story-reveal
					data-story-media
				>
					<Image
						src={model.atmosphere.hero.src}
						alt={model.atmosphere.hero.alt}
						width={2200}
						height={1300}
						className="h-[74svh] w-full object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_12%_90%,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.48)_45%,rgba(0,0,0,0.12)_100%)]" />
					<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_55%_at_0%_100%,rgba(249,115,22,0.08)_0%,transparent_55%)]" />
					<div className="absolute right-5 top-5 hidden rounded-full border border-orange-500/30 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-orange-500/95 md:block">
						{model.destinationLabel}
					</div>
					<div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
						<p className={`mb-4 md:mb-6 ${destinationDetailsKickerOnImageClass}`}>{model.atmosphere.kicker}</p>
						<div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
							<h1
								className="max-w-5xl text-4xl font-semibold leading-[1.03] tracking-tight md:col-span-7 md:max-w-none md:text-6xl lg:text-7xl"
								data-story-line
							>
								{model.atmosphere.title}
							</h1>
							<p
								className="max-w-2xl text-sm leading-relaxed text-white/72 md:col-span-5 md:max-w-none md:border-l md:border-orange-500/35 md:pl-6 md:text-base md:leading-relaxed"
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
