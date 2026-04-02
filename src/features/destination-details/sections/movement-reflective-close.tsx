import Image from "next/image";
import type { DestinationNarrativeViewModel } from "@/features/destination-details/lib/story-types";

type Props = {
	model: DestinationNarrativeViewModel;
};

export function MovementReflectiveClose({ model }: Props) {
	return (
		<section className="relative pb-20 pt-14 pad-x md:pb-28 md:pt-24" data-story-scene="close">
			<div className="mx-auto max-w-[1600px] border-t border-white/10 pt-8 md:pt-10">
				<div className="relative overflow-hidden" data-story-reveal data-story-media>
					<Image
						src={model.reflectiveClose.closingImage.src}
						alt={model.reflectiveClose.closingImage.alt}
						width={2200}
						height={1100}
						className="h-[40svh] w-full object-cover md:h-[48svh]"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
					<div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
						<p className="text-xs uppercase tracking-[0.3em] text-white/65">{model.reflectiveClose.kicker}</p>
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
