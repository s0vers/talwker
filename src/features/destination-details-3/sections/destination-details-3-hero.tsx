import Image from "next/image";
import { destinationDetails3KickerClass } from "@/features/destination-details-3/lib/destination-details-3-ui-classes";
import type { DestinationDetails3ViewModel } from "@/features/destination-details-3/lib/details-3-types";

export function DestinationDetails3Hero({ model }: { model: DestinationDetails3ViewModel }) {
	const { hero, destinationLabel } = model;

	return (
		<section
			className="relative overflow-hidden border-b border-white/10 bg-[#030303]"
			aria-labelledby="destination-details-3-hero-title"
		>
			<div className="relative mx-auto">
				<div className="relative aspect-21/9 min-h-[220px] w-full sm:aspect-2/1 sm:min-h-[280px] lg:aspect-21/8 lg:min-h-[320px]">
					<div className="absolute inset-0 overflow-hidden" data-d3-hero-media-root>
						<div className="absolute inset-0" data-d3-media>
							<Image
								src={hero.imageSrc}
								alt={hero.imageAlt}
								fill
								className="object-cover transform-[translateZ(0)] scale-[1.02]"
								priority
								sizes="100vw"
							/>
						</div>
					</div>
					<div
						className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/45 to-black/65"
						aria-hidden
					/>
					<div
						className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(249,115,22,0.12),transparent_60%)]"
						aria-hidden
					/>

					<div className="absolute inset-x-0 bottom-2 mx-auto flex max-w-[1600px] items-start justify-between gap-4 pad-x pt-6 md:pt-8">
						<p className={destinationDetails3KickerClass}>Field guide</p>
						<p className="max-w-56 text-right text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55 md:text-xs">
							{destinationLabel}
						</p>
					</div>
				</div>

				<div
					className="border-t border-white/10 bg-[#060606] px-6 py-12 sm:px-8 md:py-14 lg:px-12 lg:py-16 xl:px-16"
					data-d3-hero-pane
				>
					<div className="mx-auto max-w-4xl">
						{hero.kicker ? <p className={destinationDetails3KickerClass}>{hero.kicker}</p> : null}
						<h1
							id="destination-details-3-hero-title"
							className={
								(hero.kicker ? "mt-5 " : "mt-6 ") +
								"text-[clamp(2rem,5.2vw,3.5rem)] font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.06]"
							}
						>
							{hero.title}
						</h1>
						<p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 md:mt-8 md:text-lg md:leading-relaxed">
							{hero.dek}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
