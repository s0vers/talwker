import Image from "next/image";
import {
	destinationDetails3BodyClass,
	destinationDetails3IndexClass,
	destinationDetails3KickerClass,
	destinationDetails3RuleClass,
	destinationDetails3SectionHeadingClass,
} from "@/features/destination-details-3/lib/destination-details-3-ui-classes";
import type { DestinationDetails3ViewModel } from "@/features/destination-details-3/lib/details-3-types";
import { cn } from "@/lib/utils";

export function DestinationDetails3Places({ model }: { model: DestinationDetails3ViewModel }) {
	const { places } = model;

	return (
		<section
			className="border-b border-white/10 bg-[#050505] py-16 md:py-24"
			aria-labelledby="destination-details-3-places-title"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<header className="mb-14 max-w-2xl" data-d3-reveal="down">
					<div className={destinationDetails3RuleClass} aria-hidden />
					<p className={"mt-6 " + destinationDetails3KickerClass}>Named coordinates</p>
					<h2 id="destination-details-3-places-title" className={destinationDetails3SectionHeadingClass}>
						Places worth understanding slowly
					</h2>
					<p className={"mt-4 " + destinationDetails3BodyClass}>
						Short dossiers — neighborhoods, edges, and thresholds locals use to read the map.
					</p>
				</header>

				<ul className="flex flex-col gap-16 md:gap-20" role="list">
					{places.map((place, i) => (
						<li
							key={`${place.index}-${place.name}`}
							className="grid items-center gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12 lg:gap-16"
						>
							<div className="flex min-w-20 flex-col gap-2 md:w-28" data-d3-reveal="zoom">
								<span className={destinationDetails3IndexClass} aria-hidden>
									{place.index}
								</span>
								<span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">coordinate</span>
							</div>
							<div
								className={cn(
									"grid gap-6 md:grid-cols-2 md:gap-8",
									i % 2 === 1 && "[&>*:first-child]:md:order-2 [&>*:last-child]:md:order-1",
								)}
								data-d3-stagger={i % 2 === 0 ? "split" : "split-reverse"}
							>
								<div className="relative aspect-4/3 overflow-hidden rounded-sm border border-white/10" data-d3-item>
									<div className="absolute inset-0" data-d3-media>
										<Image
											src={place.imageSrc}
											alt={place.imageAlt}
											fill
											className="object-cover scale-[1.05]"
											sizes="(max-width: 768px) 100vw, 40vw"
										/>
									</div>
								</div>
								<div data-d3-item>
									<h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{place.name}</h3>
									<p className={"mt-4 " + destinationDetails3BodyClass}>{place.narrative}</p>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
