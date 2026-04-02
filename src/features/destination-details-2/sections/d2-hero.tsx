import Image from "next/image";
import { d2BodyClass, d2KickerClass } from "@/features/destination-details-2/lib/d2-ui-classes";
import type { DestinationNarrativeViewModel } from "@/features/destination-details/lib/story-types";

export function D2Hero({ model }: { model: DestinationNarrativeViewModel }) {
	const { atmosphere, destinationLabel } = model;

	return (
		<section className="relative border-b border-white/10 bg-[#020202] text-white" aria-labelledby="d2-hero-heading">
			<div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-[1.05fr_0.95fr]">
				<div className="relative min-h-[52vh] lg:min-h-[min(88vh,920px)]">
					<Image
						src={atmosphere.hero.src}
						alt={atmosphere.hero.alt}
						fill
						className="object-cover"
						priority
						sizes="(max-width: 1024px) 100vw, 50vw"
					/>
					<div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/25 to-transparent lg:bg-linear-to-t lg:from-black/75 lg:via-transparent lg:to-transparent" />
					{/* Bottom-left: avoids fixed header (h-20) + logo overlap in the top-left */}
					<p className="absolute bottom-6 left-6 z-10 rounded border border-white/15 bg-black/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/85 backdrop-blur-sm md:bottom-8 md:left-8">
						{destinationLabel}
					</p>
				</div>

				<div className="flex flex-col justify-end gap-6 pad-x py-12 lg:py-16 lg:pl-12 lg:pr-10">
					<div data-d2-line>
						{atmosphere.kicker ? <p className={d2KickerClass}>{atmosphere.kicker}</p> : null}
						<h1 id="d2-hero-heading" className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
							{atmosphere.title}
						</h1>
					</div>
					<div className={d2BodyClass} data-d2-reveal>
						<p>{atmosphere.body}</p>
					</div>
				</div>
			</div>
		</section>
	);
}
