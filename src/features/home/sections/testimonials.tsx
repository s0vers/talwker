import Image from "next/image";
import type { HomeClientCopy } from "@/features/home/lib/home-client-copy";
import { LuStar, LuQuote, LuCheck } from "react-icons/lu";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { TESTIMONIALS } from "@/features/home/content/testimonials";
import { SectionHeading } from "@/shared/ui";
import { TestimonialsFrame } from "./testimonials-frame";

const CARD_MIN_HEIGHT = "min-h-[380px]";

export default function Testimonials({
	copy
}: {
	copy: HomeClientCopy["testimonials"];
}) {
	return (
		<TestimonialsFrame
			heading={
				<SectionHeading
					label={copy.label}
					labelId="testimonials-label"
					title={copy.title}
					titleId="testimonials-title"
					description={copy.description}
					descriptionId="testimonials-description"
					descriptionClassName="mx-auto max-w-2xl"
				/>
			}
		>
			<CarouselContent className="-ml-4 md:-ml-6">
				{TESTIMONIALS.map(item => (
					<CarouselItem key={item.id} className="pl-4 md:basis-1/3 md:pl-6">
						<div
							className={`group relative flex flex-col rounded-[2rem] border border-white/10 bg-[#0d0d0d] p-7 transition-[border-color,box-shadow] duration-300 hover:border-orange-500/40 hover:shadow-[0_15px_35px_rgba(249,115,22,0.12)] sm:p-8 ${CARD_MIN_HEIGHT}`}
						>
							<div className="mb-5 flex items-center justify-between">
								<LuQuote className="h-8 w-8 text-orange-500/70 transition-transform duration-300 group-hover:scale-110" />
								<div className="flex gap-1 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
									{Array.from({ length: item.rating }).map((_, i) => (
										<LuStar
											key={i}
											className="h-3.5 w-3.5 fill-orange-500 text-orange-500"
										/>
									))}
								</div>
							</div>

							<p className="mb-7 line-clamp-4 flex-1 text-sm leading-relaxed font-normal text-white/75 sm:text-base">
								&ldquo;{item.text}&rdquo;
							</p>

							<div className="mt-auto">
								<div className="flex items-center justify-between border-t border-white/10 pt-5">
									<div className="flex items-center gap-3">
										<span className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-orange-500/30">
											<Image
												src={item.avatar}
												alt={item.name}
												width={44}
												height={44}
												className="h-full w-full object-cover"
											/>
										</span>
										<div className="min-w-0">
											<p className="flex items-center gap-1.5 truncate text-sm font-bold text-white">
												{item.name}
												<LuCheck className="h-3.5 w-3.5 shrink-0 text-orange-400" />
											</p>
											<p className="truncate text-xs text-white/45">
												{item.location}
											</p>
										</div>
									</div>
								</div>

								<div className="mt-4 flex items-center justify-between">
									<span className="inline-block rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-white/60 uppercase">
										{item.trip}
									</span>
								</div>
							</div>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</TestimonialsFrame>
	);
}
