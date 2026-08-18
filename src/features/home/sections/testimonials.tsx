"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { LuStar, LuQuote, LuCheck } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { gsap, prefersReducedMotion, useGsapContext } from "@/lib/useGsap";
import { TESTIMONIALS } from "@/features/home/content/testimonials";
import { SectionHeading } from "@/shared/ui";

const CARD_MIN_HEIGHT = "min-h-[380px]";

export default function Testimonials() {
	const t = useTranslations("Home.testimonials");
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const carouselRef = useRef<HTMLDivElement>(null);
	const autoplayPlugin = useRef(
		Autoplay({ delay: 4500, stopOnInteraction: false })
	);

	useGsapContext(
		sectionRef,
		() => {
			if (prefersReducedMotion()) return;
			const heading = headingRef.current;
			const carousel = carouselRef.current;

			if (heading) {
				gsap.from(heading, {
					y: 36,
					opacity: 0,
					duration: 0.9,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				});
			}

			if (carousel) {
				gsap.from(carousel, {
					y: 48,
					opacity: 0,
					duration: 1,
					ease: "power3.out",
					delay: 0.1,
					scrollTrigger: {
						trigger: carousel,
						start: "top 82%",
						toggleActions: "play none none none",
					},
				});
			}
		},
		[],
	);

	return (
		<section
			ref={sectionRef}
			id="testimonials"
			aria-labelledby="testimonials-title"
			className="relative overflow-hidden bg-[#060606] py-28 md:py-36"
		>
			{/* Ambient atmospheric backlight glow */}
			<div className="pointer-events-none absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-orange-500/5 blur-[130px]" />

			<div className="relative mx-auto max-w-[1600px] pad-x">
				<div ref={headingRef} className="mb-14 text-center md:mb-18">
					<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-orange-400">
						<span className="relative flex h-2 w-2">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
							<span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
						</span>
						Verified Traveler Reviews
					</div>

					<SectionHeading
						label={t("label")}
						labelId="testimonials-label"
						title={t("title")}
						titleId="testimonials-title"
						description={t("description")}
						descriptionId="testimonials-description"
						descriptionClassName="mx-auto max-w-2xl"
					/>
				</div>

				<div ref={carouselRef}>
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
							{TESTIMONIALS.map((item) => (
								<CarouselItem
									key={item.id}
									className="pl-4 md:basis-1/3 md:pl-6"
								>
									<div
										className={`group relative flex flex-col rounded-[2rem] border border-white/10 bg-[#0d0d0d] p-7 sm:p-8 transition-all duration-300 hover:border-orange-500/40 hover:shadow-[0_15px_35px_rgba(249,115,22,0.12)] ${CARD_MIN_HEIGHT}`}
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

										<p className="mb-7 flex-1 text-sm sm:text-base leading-relaxed text-white/75 line-clamp-4 font-normal">
											&ldquo;{item.text}&rdquo;
										</p>

										<div className="mt-auto">
											<div className="flex items-center justify-between border-t border-white/10 pt-5">
												<div className="flex items-center gap-3">
													<Avatar className="h-11 w-11 ring-2 ring-orange-500/30">
														<AvatarImage src={item.avatar} alt={item.name} />
														<AvatarFallback className="bg-white/10 text-white font-bold">
															{item.name
																.split(" ")
																.map((n) => n[0])
																.join("")}
														</AvatarFallback>
													</Avatar>
													<div className="min-w-0">
														<p className="truncate text-sm font-bold text-white flex items-center gap-1.5">
															{item.name}
															<LuCheck className="h-3.5 w-3.5 text-orange-400 shrink-0" />
														</p>
														<p className="truncate text-xs text-white/45">{item.location}</p>
													</div>
												</div>
											</div>

											<div className="mt-4 flex items-center justify-between">
												<span className="inline-block rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">
													{item.trip}
												</span>
											</div>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="-left-4 border-white/20 bg-[#0d0d0d] text-white transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-black md:-left-12" />
						<CarouselNext className="-right-4 border-white/20 bg-[#0d0d0d] text-white transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-black md:-right-12" />
					</Carousel>
				</div>
			</div>
		</section>
	);
}

