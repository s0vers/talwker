"use client";
import React, { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem
} from "../ui/carousel";
import CarouselBanner from "./subSection/CarouselContent";
import { Button } from "@/components/ui/button";
import { LuSearch, LuCalendar, LuMapPin, LuUsers } from "react-icons/lu";

const HeroSection: React.FC<BannerProps> = ({ banners }) => {
	const plugin = useRef(Autoplay({ delay: 8000, stopOnInteraction: true }));
	const [count, setCount] = useState(0);
	const [current, setCurrent] = useState(0);
	const [api, setApi] = useState<CarouselApi>();

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(banners?.length);
		setCurrent(api.selectedScrollSnap() + 1);

		const handleSelect = () => {
			setCurrent(api.selectedScrollSnap() + 1);
		};

		api.on("select", handleSelect);

		return () => {
			api.off("select", handleSelect);
		};
	}, [api, banners?.length]);

	return (
		<div className="relative h-screen w-full">
			<Carousel
				setApi={setApi}
				opts={{ align: "center", loop: true }}
				plugins={[plugin.current]}
				className="h-full w-full"
			>
				<CarouselContent className="h-full">
					{banners &&
						banners.length > 0 &&
						banners.map((item, index) => (
							<CarouselItem key={index} className="relative h-full p-0">
								<CarouselBanner item={item} />
							</CarouselItem>
						))}
				</CarouselContent>
			</Carousel>

			{/* Search Widget Overlay */}
			<div className="absolute bottom-[10%] left-1/2 z-20 w-[90%] -translate-x-1/2 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl shadow-2xl lg:w-auto">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-2">
					{/* Destination Input */}
					<div className="relative flex-1 rounded-xl bg-white px-4 py-3 lg:w-64">
						<div className="flex items-center gap-3">
							<LuMapPin className="h-5 w-5 text-gray-400" />
							<div className="flex flex-col">
								<span className="text-xs font-semibold text-gray-500">Destination</span>
								<input 
									type="text" 
									placeholder="Where to?" 
									className="w-full bg-transparent text-sm font-medium text-gray-900 focus:outline-none"
								/>
							</div>
						</div>
					</div>

					{/* Date Input */}
					<div className="relative flex-1 rounded-xl bg-white px-4 py-3 lg:w-48">
						<div className="flex items-center gap-3">
							<LuCalendar className="h-5 w-5 text-gray-400" />
							<div className="flex flex-col">
								<span className="text-xs font-semibold text-gray-500">Date</span>
								<input 
									type="text" 
									placeholder="Add dates" 
									className="w-full bg-transparent text-sm font-medium text-gray-900 focus:outline-none"
								/>
							</div>
						</div>
					</div>

					{/* Travelers Input */}
					<div className="relative flex-1 rounded-xl bg-white px-4 py-3 lg:w-48">
						<div className="flex items-center gap-3">
							<LuUsers className="h-5 w-5 text-gray-400" />
							<div className="flex flex-col">
								<span className="text-xs font-semibold text-gray-500">Guests</span>
								<input 
									type="text" 
									placeholder="Add guests" 
									className="w-full bg-transparent text-sm font-medium text-gray-900 focus:outline-none"
								/>
							</div>
						</div>
					</div>

					{/* Search Button */}
					<Button className="h-14 w-full rounded-xl bg-[var(--secondary)] px-8 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-orange-500 lg:w-auto">
						<LuSearch className="mr-2 h-5 w-5" />
						Search
					</Button>
				</div>
			</div>

			{/* Pagination Dots */}
			<div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-3">
				{Array.from({ length: count }).map((_, i) => (
					<button
						key={i}
						onClick={() => api?.scrollTo(i)}
						className={`h-2 rounded-full transition-all duration-300 ${
							current === i + 1 ? "w-8 bg-[var(--secondary)]" : "w-2 bg-white/50 hover:bg-white"
						}`}
						aria-label={`Go to slide ${i + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

export default HeroSection;
