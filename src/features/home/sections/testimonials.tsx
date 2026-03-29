"use client";

import { useRef } from "react";
import { LuStar, LuQuote } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { TESTIMONIALS } from "@/features/home/content/testimonials";
import { SectionHeading } from "@/shared/ui";

const CARD_MIN_HEIGHT = "min-h-[380px]";

export default function Testimonials() {
	const autoplayPlugin = useRef(
		Autoplay({ delay: 4000, stopOnInteraction: false })
	);

	return (
		<section
			id="testimonials"
			aria-labelledby="testimonials-title"
			className="bg-[#0b0b0b] py-28 md:py-36"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="mb-16 text-center md:mb-20">
					<SectionHeading
						label="Traveler Stories"
						labelId="testimonials-label"
						title="What Our Travelers Say"
						titleId="testimonials-title"
						description="Real stories from real adventurers who trusted Talkwer to craft their perfect getaway."
						descriptionId="testimonials-description"
						descriptionClassName="mx-auto max-w-2xl"
					/>
				</div>

				<Carousel
					opts={{
						align: "start",
						loop: true,
						slidesToScroll: 1,
					}}
					plugins={[autoplayPlugin.current]}
					className="relative"
				>
					<CarouselContent className="-ml-4 md:-ml-6">
						{TESTIMONIALS.map((t) => (
							<CarouselItem
								key={t.id}
								className="pl-4 md:basis-1/3 md:pl-6"
							>
								<div
									className={`relative flex flex-col rounded-3xl border border-white/10 bg-[#101010] p-7 ${CARD_MIN_HEIGHT}`}
								>
									<LuQuote className="mb-4 h-8 w-8 shrink-0 text-orange-500/60" />

									<div className="mb-4 flex shrink-0 gap-1">
										{Array.from({ length: t.rating }).map((_, i) => (
											<LuStar
												key={i}
												className="h-4 w-4 fill-orange-500 text-orange-500"
											/>
										))}
									</div>

									<p className="mb-7 min-h-18 flex-1 text-sm leading-relaxed text-white/65 line-clamp-4">
										&ldquo;{t.text}&rdquo;
									</p>

									<div className="flex shrink-0 items-center gap-3 border-t border-white/10 pt-5">
										<Avatar className="h-11 w-11">
											<AvatarImage src={t.avatar} alt={t.name} />
											<AvatarFallback className="bg-white/10 text-white">
												{t.name
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<div className="min-w-0">
											<p className="truncate text-sm font-semibold text-white">
												{t.name}
											</p>
											<p className="truncate text-xs text-white/45">{t.location}</p>
										</div>
									</div>

									<p className="mt-4 inline-block shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/60">
										{t.trip}
									</p>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="-left-4 border-white/20 bg-[#101010] text-white hover:bg-white/10 hover:text-white md:-left-12" />
					<CarouselNext className="-right-4 border-white/20 bg-[#101010] text-white hover:bg-white/10 hover:text-white md:-right-12" />
				</Carousel>
			</div>
		</section>
	);
}

