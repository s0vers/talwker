import Image from "next/image";
import {
	destinationDetails3BodyClass,
	destinationDetails3KickerClass,
	destinationDetails3RuleClass,
	destinationDetails3SectionHeadingClass,
} from "@/features/destination-details-3/lib/destination-details-3-ui-classes";
import type { DestinationDetails3ViewModel } from "@/features/destination-details-3/lib/details-3-types";

export function DestinationDetails3Cadence({ model }: { model: DestinationDetails3ViewModel }) {
	const { cadence, cadenceAside } = model;
	if (!cadence.length) return null;

	return (
		<section
			className="border-b border-white/10 bg-[#030303] py-16 md:py-24"
			aria-labelledby="destination-details-3-cadence-title"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,38%)] lg:items-stretch lg:gap-12 xl:gap-16">
					<div className="flex min-h-0 flex-col gap-10 lg:gap-12">
						<header className="max-w-2xl" data-d3-reveal="fade">
							<div className={destinationDetails3RuleClass} aria-hidden />
							<p className={"mt-6 " + destinationDetails3KickerClass}>Daily cadence</p>
							<h2 id="destination-details-3-cadence-title" className={destinationDetails3SectionHeadingClass}>
								When the place changes its mind
							</h2>
							<p className={"mt-4 max-w-xl " + destinationDetails3BodyClass}>
								Public life has hinges — not “best times to visit,” but how the same pavement holds different
								social contracts.
							</p>
						</header>

						<ol className="relative space-y-0 border-l border-orange-500/20 pl-8 md:pl-10" role="list">
							{cadence.map((item, i) => (
								<li
									key={item.phase}
									className="relative pb-14 last:pb-0 md:pb-16"
									data-d3-reveal={i % 2 === 0 ? "left" : "right"}
								>
									<span
										className="absolute -left-8 top-1.5 flex h-3 w-3 -translate-x-[calc(50%-0.5px)] rounded-full border-2 border-orange-500/60 bg-[#030303] md:-left-10"
										aria-hidden
									/>
									<p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-orange-500">
										{i + 1 < 10 ? `0${i + 1}` : i + 1} · {item.phase}
									</p>
									<p className={"mt-4 max-w-3xl lg:max-w-2xl " + destinationDetails3BodyClass}>{item.text}</p>
								</li>
							))}
						</ol>
					</div>

					<aside
						className="relative aspect-4/5 w-full min-h-0 overflow-hidden rounded-sm border border-white/10 lg:sticky lg:top-28 lg:aspect-auto lg:h-fit"
						aria-label="Cadence visual"
						data-d3-reveal="zoom"
					>
						<div className="absolute inset-0" data-d3-media>
							<Image
								src={cadenceAside.src}
								alt={cadenceAside.alt}
								fill
								className="object-cover transform-[translateZ(0)] scale-[1.03]"
								sizes="(max-width: 1024px) 100vw, 38vw"
							/>
						</div>
						<div
							className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/25"
							aria-hidden
						/>
						<p className="absolute bottom-4 left-4 right-4 text-[9px] font-medium uppercase tracking-[0.2em] text-white/50">
							Through the day
						</p>
					</aside>
				</div>
			</div>
		</section>
	);
}
