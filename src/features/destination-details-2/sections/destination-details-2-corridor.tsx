import Image from "next/image";
import {
	destinationDetails2BodyClass,
	destinationDetails2KickerClass,
	destinationDetails2RuleClass,
} from "@/features/destination-details-2/lib/destination-details-2-ui-classes";
import type { DestinationNarrativeViewModel } from "@/features/destination-details/lib/destination-details-types";

export function DestinationDetails2Corridor({ model }: { model: DestinationNarrativeViewModel }) {
	const { livingGeography, peoplePortrait } = model;

	return (
		<section
			className="border-b border-white/10 bg-[#050505] py-16 text-white md:py-24"
			aria-labelledby="destination-details-2-corridor-title"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
					<div>
						<div data-d2-reveal>
							<div className={destinationDetails2RuleClass} aria-hidden />
							{livingGeography.kicker ? (
								<p className={"mt-6 " + destinationDetails2KickerClass}>{livingGeography.kicker}</p>
							) : null}
							<h2
								id="destination-details-2-corridor-title"
								className={
									(livingGeography.kicker ? "mt-4 " : "mt-6 ") +
									"text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
								}
							>
								{livingGeography.title}
							</h2>
							<p className={"mt-6 " + destinationDetails2BodyClass}>{livingGeography.body}</p>
						</div>
						<div className="mt-10 grid gap-4 sm:grid-cols-2" data-d2-stagger>
							<div className="relative aspect-4/5 overflow-hidden rounded-sm border border-white/10" data-d2-item>
								<div className="absolute inset-0" data-d2-media>
									<Image
										src={livingGeography.context.src}
										alt={livingGeography.context.alt}
										fill
										className="object-cover scale-[1.06]"
										sizes="(max-width: 640px) 100vw, 25vw"
									/>
								</div>
							</div>
							<div className="relative aspect-4/5 overflow-hidden rounded-sm border border-white/10" data-d2-item>
								<div className="absolute inset-0" data-d2-media>
									<Image
										src={livingGeography.documentary.src}
										alt={livingGeography.documentary.alt}
										fill
										className="object-cover scale-[1.06]"
										sizes="(max-width: 640px) 100vw, 25vw"
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col justify-center border-l border-white/10 pl-0 lg:pl-12">
						<div data-d2-reveal>
							{peoplePortrait.kicker ? (
								<p className={destinationDetails2KickerClass}>{peoplePortrait.kicker}</p>
							) : null}
							<h3
								className={
									(peoplePortrait.kicker ? "mt-4 " : "mt-6 ") +
									"text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
								}
							>
								{peoplePortrait.title}
							</h3>
							{peoplePortrait.pullQuote ? (
								<blockquote className="mt-8 border-l-2 border-orange-500/50 pl-6 text-xl font-medium italic leading-snug text-white/85 md:text-2xl">
									{peoplePortrait.pullQuote}
								</blockquote>
							) : null}
							<p className={"mt-8 " + destinationDetails2BodyClass}>{peoplePortrait.body}</p>
						</div>
						{peoplePortrait.portraits.length > 0 ? (
							<ul
								className={
									peoplePortrait.portraits.length === 1
										? "mt-10 grid w-full grid-cols-1 gap-3 md:gap-4"
										: "mt-10 grid w-full grid-cols-2 gap-3 md:gap-4"
								}
								data-d2-stagger
								role="list"
							>
								{peoplePortrait.portraits.map((p) => (
									<li
										key={p.src}
										className="relative h-48 min-h-48 w-full min-w-0 overflow-hidden rounded-sm border border-white/12 md:h-52"
										data-d2-item
									>
										<div className="absolute inset-0" data-d2-media>
											<Image
												src={p.src}
												alt={p.alt}
												fill
												className="object-cover scale-[1.06]"
												sizes="(max-width: 1024px) 50vw, 25vw"
											/>
										</div>
									</li>
								))}
							</ul>
						) : null}
					</div>
				</div>
			</div>
		</section>
	);
}
