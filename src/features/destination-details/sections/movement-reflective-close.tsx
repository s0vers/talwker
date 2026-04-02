import Image from "next/image";
import { storyKickerOnImageClass } from "@/features/destination-details/lib/story-ui-classes";
import type { DestinationNarrativeViewModel } from "@/features/destination-details/lib/story-types";

type Props = {
	model: DestinationNarrativeViewModel;
};

export function MovementReflectiveClose({ model }: Props) {
	return (
		<section className="relative pb-20 pt-14 pad-x md:pb-28 md:pt-24" data-story-scene="close">
			<div className="mx-auto max-w-[1600px] border-t border-orange-500/20 pt-8 md:pt-10">
				<div className="relative overflow-hidden ring-1 ring-inset ring-orange-500/10" data-story-reveal data-story-media>
					<Image
						src={model.reflectiveClose.closingImage.src}
						alt={model.reflectiveClose.closingImage.alt}
						width={2200}
						height={1100}
						className="h-[40svh] w-full object-cover md:h-[48svh]"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/45 to-transparent" />
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_12%_100%,rgba(249,115,22,0.12)_0%,transparent_50%)]" />
					<div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
						<p className={storyKickerOnImageClass}>{model.reflectiveClose.kicker}</p>
						<h2 className="mt-3 max-w-3xl text-2xl font-semibold leading-tight md:text-4xl">
							{model.reflectiveClose.title}
						</h2>
						<p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
							{model.reflectiveClose.body}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
