import Image from "next/image";
import { d3KickerClass } from "@/features/destination-details-3/lib/d3-ui-classes";
import type { DestinationDetails3ViewModel } from "@/features/destination-details-3/lib/details-3-types";

export function D3Hero({ model }: { model: DestinationDetails3ViewModel }) {
	const { hero, destinationLabel } = model;

	return (
		<section
			className="relative overflow-hidden border-b border-white/10 pt-14 md:pt-20"
			aria-labelledby="d3-hero-heading"
		>
			<div className="mx-auto max-w-[1600px]">
				<div
					className="grid min-h-[min(88svh,900px)] lg:grid-cols-[minmax(280px,38%)_minmax(0,1fr)]"
					data-d3-reveal
				>
					<div className="order-2 flex min-h-0 flex-col justify-between gap-10 border-t border-white/10 bg-[#060606] px-6 py-12 sm:px-8 lg:order-1 lg:border-t-0 lg:border-r lg:border-white/10 lg:px-10 lg:py-14 xl:py-16">
						<div className="hidden lg:block">
							<p className={d3KickerClass}>Field guide</p>
							<p className="mt-3 max-w-[18ch] text-sm leading-snug text-white/50">{destinationLabel}</p>
						</div>

						<div className="lg:mt-auto" data-d3-hero-pane>
							<div className="border-l-2 border-orange-500/40 pl-5 sm:pl-6">
								{hero.kicker ? <p className={d3KickerClass}>{hero.kicker}</p> : null}
								<h1
									id="d3-hero-heading"
									className="mt-5 text-3xl font-semibold leading-[1.06] tracking-tight text-white sm:text-4xl lg:text-[2.75rem] xl:text-5xl xl:leading-[1.05]"
								>
									{hero.title}
								</h1>
								<p className="mt-6 max-w-xl text-sm leading-[1.75] text-white/72 md:text-base">
									{hero.dek}
								</p>
								<p className="mt-8 text-xs text-white/45 lg:hidden">{destinationLabel}</p>
							</div>
						</div>
					</div>

					<div className="relative order-1 min-h-[48vh] w-full overflow-hidden lg:order-2 lg:min-h-full">
						<div className="absolute inset-0 overflow-hidden" data-d3-hero-media-root>
							<div className="absolute inset-0" data-d3-media>
								<Image
									src={hero.imageSrc}
									alt={hero.imageAlt}
									fill
									className="object-cover transform-[translateZ(0)] scale-[1.02]"
									priority
									sizes="(max-width: 1024px) 100vw, 62vw"
								/>
							</div>
						</div>
						<div
							className="pointer-events-none absolute inset-x-0 top-0 h-[min(38%,280px)] bg-linear-to-b from-black/80 via-black/30 to-transparent lg:h-[min(32%,240px)]"
							aria-hidden
						/>
						<div
							className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent lg:from-black/45"
							aria-hidden
						/>
						<div
							className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_45%_at_100%_85%,rgba(249,115,22,0.09),transparent_55%)]"
							aria-hidden
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
