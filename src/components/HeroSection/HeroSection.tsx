"use client";

import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
} from "../ui/carousel";
import {
	LuMapPin,
	LuCalendar,
	LuUsers,
	LuSearch,
	LuPlay,
} from "react-icons/lu";

const HERO_SLIDES = [
	{
		image: "/image.jpg",
		title: "Discover Your Next Adventure",
		subtitle: "Explore breathtaking destinations across the globe",
		location: "Bali, Indonesia",
	},
	{
		image: "/image.jpg",
		title: "Wander Beyond Boundaries",
		subtitle: "Curated journeys for the modern explorer",
		location: "Santorini, Greece",
	},
	{
		image: "/image.jpg",
		title: "Travel. Experience. Remember.",
		subtitle: "Life is short — make every trip count",
		location: "Patagonia, Chile",
	},
];

const STATS: Stat[] = [
	{ value: "500+", label: "Destinations" },
	{ value: "50K+", label: "Happy Travelers" },
	{ value: "4.9", label: "Average Rating" },
	{ value: "12+", label: "Years Experience" },
];

const HeroSection: React.FC = () => {
	const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: false }));
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (!api) return;
		setCurrent(api.selectedScrollSnap());
		const handleSelect = () => setCurrent(api.selectedScrollSnap());
		api.on("select", handleSelect);
		return () => {
			api.off("select", handleSelect);
		};
	}, [api]);

	return (
		<section className="relative">
			<Carousel
				setApi={setApi}
				opts={{ align: "center", loop: true }}
				plugins={[plugin.current]}
			>
				<CarouselContent>
					{HERO_SLIDES.map((slide, index) => (
						<CarouselItem key={index} className="relative">
							<div className="relative h-screen w-full">
								<Image
									src={slide.image}
									alt={slide.title}
									fill
									className="object-cover"
									priority={index === 0}
								/>
								<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

								<div className="absolute inset-0 flex items-center">
									<div className="mx-auto w-full max-w-7xl px-4 md:px-6">
										<div className="max-w-2xl">
											<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm">
												<LuMapPin className="h-4 w-4 text-yellow-400" />
												<span className="text-sm font-medium text-white">
													{slide.location}
												</span>
											</div>
											<h1 className="mb-4 text-5xl font-bold leading-tight text-white md:text-7xl">
												{slide.title}
											</h1>
											<p className="mb-8 max-w-lg text-lg text-white/80">
												{slide.subtitle}
											</p>
											<div className="flex flex-wrap gap-4">
												<a
													href="#destinations"
													className="rounded-full bg-sky-500 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/25"
												>
													Explore Destinations
												</a>
												<button className="group flex items-center gap-3 rounded-full bg-white/15 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/25">
													<span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sky-500 transition-transform group-hover:scale-110">
														<LuPlay className="ml-0.5 h-3.5 w-3.5" />
													</span>
													Watch Video
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			{/* Slide indicators */}
			<div className="absolute bottom-44 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-36">
				{HERO_SLIDES.map((_, i) => (
					<button
						key={i}
						onClick={() => api?.scrollTo(i)}
						className={`h-2 rounded-full transition-all ${
							current === i ? "w-8 bg-sky-500" : "w-2 bg-white/50"
						}`}
						aria-label={`Go to slide ${i + 1}`}
					/>
				))}
			</div>

			{/* Search bar overlay */}
			<div className="absolute bottom-0 left-0 right-0 translate-y-1/2">
				<div className="mx-auto max-w-5xl px-4">
					<div className="rounded-2xl bg-white p-4 shadow-2xl shadow-black/10 md:p-6">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
							<div className="flex items-center gap-3 rounded-xl bg-gray-100 p-3">
								<LuMapPin className="h-5 w-5 shrink-0 text-sky-500" />
								<div>
									<p className="text-xs font-medium text-gray-500">
										Where to?
									</p>
									<p className="text-sm font-semibold text-gray-900">
										Bali, Indonesia
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3 rounded-xl bg-gray-100 p-3">
								<LuCalendar className="h-5 w-5 shrink-0 text-sky-500" />
								<div>
									<p className="text-xs font-medium text-gray-500">
										When?
									</p>
									<p className="text-sm font-semibold text-gray-900">
										Mar 15 – Mar 22
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3 rounded-xl bg-gray-100 p-3">
								<LuUsers className="h-5 w-5 shrink-0 text-sky-500" />
								<div>
									<p className="text-xs font-medium text-gray-500">
										Guests
									</p>
									<p className="text-sm font-semibold text-gray-900">
										2 Adults, 1 Child
									</p>
								</div>
							</div>
							<button className="flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-600">
								<LuSearch className="h-4 w-4" />
								Search
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Stats bar */}
			<div className="bg-slate-900 pb-8 pt-24 md:pt-20">
				<div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
					{STATS.map((stat, i) => (
						<div key={i} className="text-center">
							<p className="text-3xl font-bold text-white">{stat.value}</p>
							<p className="mt-1 text-sm text-slate-400">{stat.label}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
