import Image from "next/image";
import { d2BodyClass, d2KickerClass } from "@/features/destination-details-2/lib/d2-ui-classes";
import type { DestinationNarrativeViewModel } from "@/features/destination-details/lib/story-types";

export function D2Spectrum({ model }: { model: DestinationNarrativeViewModel }) {
	const { culturePulse, sensoryImmersion } = model;
	const cultureSides = culturePulse.cultureImages.slice(0, 2);

	return (
		<section className="bg-[#030303] py-16 text-white md:py-24" aria-labelledby="d2-spectrum-title">
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="mb-10 max-w-2xl md:mb-8" data-d2-line>
					{culturePulse.kicker ? <p className={d2KickerClass}>{culturePulse.kicker}</p> : null}
					<h2 id="d2-spectrum-title" className="mt-4 font-serif text-3xl font-medium md:text-4xl">
						{culturePulse.title}
					</h2>
					<p className={"mt-6 " + d2BodyClass}>{culturePulse.body}</p>
				</div>

				<div
					className="grid grid-cols-1 gap-3 md:grid-cols-3 md:items-stretch md:gap-3 md:h-[min(52vh,36rem)] md:min-h-[20rem] lg:min-h-[22rem]"
					data-d2-stagger
				>
					<div
						className="relative aspect-[4/3] min-h-0 w-full overflow-hidden rounded-sm border border-white/10 md:col-span-2 md:aspect-auto md:h-full"
						data-d2-item
					>
						<div className="absolute inset-0" data-d2-media>
							<Image
								src={culturePulse.anchor.src}
								alt={culturePulse.anchor.alt}
								fill
								className="object-cover scale-[1.06]"
								sizes="(max-width: 768px) 100vw, 66vw"
							/>
						</div>
					</div>
					{/* Right rail: two images stacked, each ½ of the column height (matches wireframe). */}
					<div
						className="grid min-h-[300px] grid-rows-2 gap-3 md:h-full md:min-h-0 md:grid-rows-[1fr_1fr]"
						data-d2-item
					>
						{cultureSides.map((img) => (
							<div
								key={img.src}
								className="relative h-full min-h-32 overflow-hidden rounded-sm border border-white/10 md:min-h-0"
							>
								<div className="absolute inset-0" data-d2-media>
									<Image
										src={img.src}
										alt={img.alt}
										fill
										className="object-cover scale-[1.06]"
										sizes="(max-width: 768px) 100vw, 34vw"
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="mt-16 grid gap-10 border-t border-white/10 pt-16 lg:grid-cols-2 lg:items-stretch lg:gap-10 xl:gap-14">
					<div className="flex max-w-xl flex-col justify-center lg:max-w-none" data-d2-reveal>
						{sensoryImmersion.kicker ? <p className={d2KickerClass}>{sensoryImmersion.kicker}</p> : null}
						<h3 className="mt-3 font-serif text-2xl font-medium md:text-3xl lg:text-4xl">{sensoryImmersion.title}</h3>
						<p className={"mt-6 " + d2BodyClass}>{sensoryImmersion.body}</p>
					</div>
					<div
						className="grid min-h-[min(52vh,28rem)] grid-cols-2 gap-3 sm:gap-4 md:min-h-[min(56vh,32rem)] lg:min-h-[min(60vh,36rem)]"
						data-d2-stagger
					>
						{sensoryImmersion.textures.map((t) => (
							<div
								key={t.src}
								className="relative min-h-0 overflow-hidden rounded-sm border border-white/10"
								data-d2-item
							>
								<div className="absolute inset-0" data-d2-media>
									<Image
										src={t.src}
										alt={t.alt}
										fill
										className="object-cover scale-[1.06]"
										sizes="(max-width: 1024px) 46vw, 42vw"
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
