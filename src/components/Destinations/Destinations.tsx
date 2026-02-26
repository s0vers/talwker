"use client";

import Image from "next/image";
import { LuStar, LuClock, LuArrowRight } from "react-icons/lu";

const DESTINATIONS: Destination[] = [
	{
		id: 1,
		name: "Bali",
		country: "Indonesia",
		image: "/image.jpg",
		price: 1299,
		rating: 4.9,
		duration: "7 Days",
		tag: "Popular",
	},
	{
		id: 2,
		name: "Santorini",
		country: "Greece",
		image: "/image.jpg",
		price: 1899,
		rating: 4.8,
		duration: "5 Days",
		tag: "Trending",
	},
	{
		id: 3,
		name: "Patagonia",
		country: "Chile",
		image: "/image.jpg",
		price: 2499,
		rating: 4.9,
		duration: "10 Days",
	},
	{
		id: 4,
		name: "Kyoto",
		country: "Japan",
		image: "/image.jpg",
		price: 1599,
		rating: 4.7,
		duration: "6 Days",
		tag: "New",
	},
	{
		id: 5,
		name: "Amalfi Coast",
		country: "Italy",
		image: "/image.jpg",
		price: 2199,
		rating: 4.8,
		duration: "8 Days",
	},
	{
		id: 6,
		name: "Maldives",
		country: "Indian Ocean",
		image: "/image.jpg",
		price: 3199,
		rating: 5.0,
		duration: "5 Days",
		tag: "Luxury",
	},
];

export default function Destinations() {
	return (
		<section id="destinations" className="bg-white py-24">
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<div className="mb-14 text-center">
					<p className="mb-3 text-sm font-semibold uppercase tracking-widest text-sky-500">
						Explore the World
					</p>
					<h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
						Popular Destinations
					</h2>
					<p className="mx-auto max-w-2xl text-gray-500">
						Handpicked destinations loved by thousands of travelers. Your next
						unforgettable adventure starts here.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{DESTINATIONS.map((dest) => (
						<div
							key={dest.id}
							className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
						>
							<div className="relative h-64 overflow-hidden">
								<Image
									src={dest.image}
									alt={dest.name}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

								{dest.tag && (
									<span className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-gray-900">
										{dest.tag}
									</span>
								)}

								<div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
									<div>
										<h3 className="text-2xl font-bold text-white">
											{dest.name}
										</h3>
										<p className="text-sm text-white/80">{dest.country}</p>
									</div>
									<div className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
										<LuStar className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
										<span className="text-sm font-semibold text-white">
											{dest.rating}
										</span>
									</div>
								</div>
							</div>

							<div className="flex items-center justify-between p-5">
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-1.5 text-gray-500">
										<LuClock className="h-4 w-4" />
										<span className="text-sm">{dest.duration}</span>
									</div>
								</div>
								<div className="text-right">
									<p className="text-xs text-gray-500">From</p>
									<p className="text-xl font-bold text-sky-500">
										${dest.price.toLocaleString()}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 text-center">
					<a
						href="#"
						className="group inline-flex items-center gap-2 rounded-full border-2 border-sky-500 px-8 py-3 text-sm font-semibold text-sky-500 transition-all hover:bg-sky-500 hover:text-white"
					>
						View All Destinations
						<LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</a>
				</div>
			</div>
		</section>
	);
}
