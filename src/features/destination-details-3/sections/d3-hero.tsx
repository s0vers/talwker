import Image from "next/image";
import { d3BodyClass, d3KickerClass } from "@/features/destination-details-3/lib/d3-ui-classes";
import type { DestinationDetails3ViewModel } from "@/features/destination-details-3/lib/details-3-types";

export function D3Hero({ model }: { model: DestinationDetails3ViewModel }) {
	const { hero, destinationLabel } = model;

	return (
		<section className="relative border-b border-white/10 bg-[#030303] text-white" aria-labelledby="d3-hero-heading">
			<div className="mx-auto max-w-[1600px]">
				<div className="relative min-h-[48vh] overflow-hidden md:min-h-[56vh]">
					<div className="absolute inset-0" data-d3-hero-media-root>
						<div className="absolute inset-0" data-d3-media>
							<Image
								src={hero.imageSrc}
								alt={hero.imageAlt}
								fill
								className="object-cover [transform:translateZ(0)] scale-[1.06]"
								priority
								sizes="100vw"
							/>
						</div>
					</div>
					<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/88 via-black/35 to-black/20" />
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_0%_100%,rgba(249,115,22,0.07),transparent_55%)]" />
					<p
						className="absolute left-4 top-4 z-10 rounded-sm border border-white/12 bg-black/50 px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-orange-200/95 backdrop-blur-sm md:left-8 md:top-8"
						data-d3-hero-badge
					>
						{destinationLabel}
					</p>
					<p className="absolute bottom-6 left-4 font-mono text-[10px] uppercase tracking-[0.4em] text-white/35 md:bottom-10 md:left-8">
						v3 · field guide
					</p>
				</div>

				<div className="pad-x pb-14 pt-10 md:pb-20 md:pt-14" data-d3-hero-pane>
					<div className="mx-auto max-w-3xl">
						{hero.kicker ? <p className={d3KickerClass}>{hero.kicker}</p> : null}
						<h1
							id="d3-hero-heading"
							className="mt-5 text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl"
							data-d3-line
						>
							{hero.title}
						</h1>
						<p className={"mt-8 max-w-2xl " + d3BodyClass} data-d3-line>
							{hero.dek}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
