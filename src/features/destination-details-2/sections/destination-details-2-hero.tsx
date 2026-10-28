import Image from "next/image";
import {
	destinationDetails2BodyClass,
	destinationDetails2KickerClass,
} from "@/features/destination-details-2/lib/destination-details-2-ui-classes";
import type { DestinationNarrativeViewModel } from "@/features/destination-details/lib/destination-details-types";

export function DestinationDetails2Hero({ model }: { model: DestinationNarrativeViewModel }) {
	const { atmosphere, destinationLabel } = model;

	return (
		<section
			className="relative border-b border-white/10 bg-[#020202] text-white"
			aria-labelledby="destination-details-2-hero-title"
		>
			<div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-[1.05fr_0.95fr]">
				<div className="relative min-h-[52vh] overflow-hidden lg:min-h-[min(88vh,920px)]">
					<div className="absolute inset-0" data-d2-hero-media-root>
						<div className="absolute inset-0" data-d2-media>
							<Image
								src={atmosphere.hero.src}
								alt={atmosphere.hero.alt}
								fill
								className="object-cover transform-[translateZ(0)] scale-[1.08]"
								priority
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>
						</div>
					</div>
					<div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/80 via-black/25 to-transparent lg:bg-linear-to-t lg:from-black/75 lg:via-transparent lg:to-transparent" />
					<p
						className="absolute bottom-6 left-6 z-10 rounded border border-white/15 bg-black/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/85 backdrop-blur-sm md:bottom-8 md:left-8"
						data-d2-hero-badge
					>
						{destinationLabel}
					</p>
				</div>

				<div
					className="flex flex-col justify-end gap-6 pad-x py-12 lg:py-16 lg:pl-12 lg:pr-10"
					data-d2-hero-pane
				>
					<div>
						{atmosphere.kicker ? <p className={destinationDetails2KickerClass}>{atmosphere.kicker}</p> : null}
						<h1
							id="destination-details-2-hero-title"
							className={
								(atmosphere.kicker ? "mt-5 " : "mt-6 ") +
								"text-[clamp(2.25rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-balance"
							}
						>
							{atmosphere.title}
						</h1>
					</div>
					<div className={destinationDetails2BodyClass}>
						<p>{atmosphere.body}</p>
					</div>
				</div>
			</div>
		</section>
	);
}
