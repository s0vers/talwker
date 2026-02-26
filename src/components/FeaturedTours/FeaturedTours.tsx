"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "../ui/carousel";
import { LuStar, LuClock, LuUsers, LuMapPin } from "react-icons/lu";

const TOURS: Tour[] = [
	{
		id: 1,
		title: "Bali Cultural Immersion",
		destination: "Bali, Indonesia",
		image: "/image.jpg",
		price: 1299,
		originalPrice: 1599,
		duration: "7 Days / 6 Nights",
		groupSize: "Max 12",
		rating: 4.9,
		reviews: 234,
		highlights: ["Temple Tours", "Rice Terraces", "Cooking Class"],
	},
	{
		id: 2,
		title: "Greek Island Odyssey",
		destination: "Santorini & Mykonos",
		image: "/image.jpg",
		price: 2199,
		originalPrice: 2799,
		duration: "10 Days / 9 Nights",
		groupSize: "Max 16",
		rating: 4.8,
		reviews: 189,
		highlights: ["Sunset Cruise", "Wine Tasting", "Beach Hopping"],
	},
	{
		id: 3,
		title: "Patagonia Expedition",
		destination: "Torres del Paine, Chile",
		image: "/image.jpg",
		price: 3499,
		duration: "12 Days / 11 Nights",
		groupSize: "Max 8",
		rating: 5.0,
		reviews: 97,
		highlights: ["Glacier Trek", "Wildlife Safari", "Camping"],
	},
	{
		id: 4,
		title: "Japan Heritage Trail",
		destination: "Tokyo to Kyoto",
		image: "/image.jpg",
		price: 2899,
		originalPrice: 3299,
		duration: "9 Days / 8 Nights",
		groupSize: "Max 14",
		rating: 4.9,
		reviews: 312,
		highlights: ["Tea Ceremony", "Mt. Fuji", "Bamboo Forest"],
	},
];

export default function FeaturedTours() {
	const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

	return (
		<section id="tours" className="bg-background py-24">
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
					<div>
						<p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
							Curated For You
						</p>
						<h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
							Featured Tours
						</h2>
						<p className="max-w-xl text-muted-foreground">
							Our most popular tour packages, designed for extraordinary
							experiences at unbeatable value.
						</p>
					</div>
					<a
						href="#"
						className="shrink-0 rounded-full border-2 border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
					>
						View All Tours
					</a>
				</div>

				<Carousel
					opts={{ align: "start", loop: true }}
					plugins={[plugin.current]}
					className="w-full"
				>
					<CarouselContent className="-ml-4">
						{TOURS.map((tour) => (
							<CarouselItem
								key={tour.id}
								className="pl-4 md:basis-1/2 lg:basis-1/3"
							>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5 }}
									className="group h-full overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300 hover:shadow-xl"
								>
									<div className="relative h-56 overflow-hidden">
										<Image
											src={tour.image}
											alt={tour.title}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-110"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
										{tour.originalPrice && (
											<span className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
												Save $
												{(tour.originalPrice - tour.price).toLocaleString()}
											</span>
										)}
										<div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
											<LuMapPin className="h-3.5 w-3.5 text-white" />
											<span className="text-xs font-medium text-white">
												{tour.destination}
											</span>
										</div>
									</div>

									<div className="p-5">
										<h3 className="mb-3 text-lg font-bold text-foreground">
											{tour.title}
										</h3>

										<div className="mb-4 flex flex-wrap gap-2">
											{tour.highlights.map((hl) => (
												<span
													key={hl}
													className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
												>
													{hl}
												</span>
											))}
										</div>

										<div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
											<span className="flex items-center gap-1">
												<LuClock className="h-3.5 w-3.5" />
												{tour.duration}
											</span>
											<span className="flex items-center gap-1">
												<LuUsers className="h-3.5 w-3.5" />
												{tour.groupSize}
											</span>
										</div>

										<div className="flex items-center justify-between border-t border-border pt-4">
											<div className="flex items-center gap-1">
												<LuStar className="h-4 w-4 fill-secondary text-secondary" />
												<span className="text-sm font-bold">{tour.rating}</span>
												<span className="text-xs text-muted-foreground">
													({tour.reviews})
												</span>
											</div>
											<div className="text-right">
												{tour.originalPrice && (
													<p className="text-xs text-muted-foreground line-through">
														${tour.originalPrice.toLocaleString()}
													</p>
												)}
												<p className="text-xl font-bold text-primary">
													${tour.price.toLocaleString()}
												</p>
											</div>
										</div>
									</div>
								</motion.div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</section>
	);
}
