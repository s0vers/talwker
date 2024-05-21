"use client";
import Image from "next/image";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem
} from "../ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CarouselBanner from "./subSection/CarouselContent";

const HeroSection: React.FC<BannerProps> = ({ banners }) => {
	const plugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));
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
		<div className="relative">
			<Carousel
				setApi={setApi}
				opts={{ align: "center", loop: true }}
				plugins={[plugin.current]}
			>
				<CarouselContent>
					{banners &&
						banners.length > 0 &&
						banners.map((item, index) => (
							<CarouselItem key={index} className="relative">
								<CarouselBanner item={item} />
							</CarouselItem>
						))}
				</CarouselContent>
			</Carousel>
			<div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform justify-center space-x-2">
				{Array.from({ length: count }).map((_, i) => (
					<div
						onClick={() => api?.scrollTo(i)}
						key={i}
						className={`h-3 w-3 rounded-full ${
							current === i + 1 ? "bg-primary" : "bg-yellow-600 dark:bg-white"
						}`}
					/>
				))}
			</div>
		</div>
	);
};

export default HeroSection;
