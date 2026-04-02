import Image from "next/image";
import {
	storyFrameRingClass,
	storyKickerOnImageClass,
} from "@/features/destination-details/lib/story-ui-classes";
import type { DestinationNarrativeViewModel } from "@/features/destination-details/lib/story-types";

type Props = {
	model: DestinationNarrativeViewModel;
};

export function MovementAtmosphere({ model }: Props) {
	return (
		<section className="relative min-h-[94svh] pb-16 pt-14 pad-x md:pb-20 md:pt-20" data-story-scene="atmosphere">
			<div className="mx-auto max-w-[1600px]">
				<div
					className={`relative overflow-hidden rounded-4xl border border-white/12 ${storyFrameRingClass}`}
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
					<div className="absolute right-5 top-5 hidden rounded-full border border-orange-500/30 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-orange-100/90 md:block">
						{model.destinationLabel}
					</div>
					<div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
						<p className={`mb-3 ${storyKickerOnImageClass}`}>{model.atmosphere.kicker}</p>
						<h1 className="max-w-5xl text-4xl font-semibold leading-[1.03] md:text-7xl" data-story-line>
							{model.atmosphere.title}
						</h1>
						<p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base" data-story-line>
							{model.atmosphere.body}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
