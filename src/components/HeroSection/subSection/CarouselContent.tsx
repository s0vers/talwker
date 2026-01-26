import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LuMapPin, LuStar } from "react-icons/lu";

export default function CarouselBanner({ item }: { item: Banner }) {
	return (
		<div className="relative h-screen w-full overflow-hidden">
			{/* Image with Gradient Overlay */}
			<div className="absolute inset-0 z-0">
				<Image
					src={item.image}
					alt={item.title}
					fill
					className="object-cover transition-transform duration-700 hover:scale-105"
					priority
					placeholder="blur"
					blurDataURL={item.image} // Ideally use a real blur data url
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
			</div>

			{/* Content */}
			<div className="relative z-10 flex h-full flex-col justify-end pb-32 px-6 md:px-12 lg:px-24">
				<div className="max-w-4xl space-y-6">
					{/* Location Tag */}
					{item.location && (
						<div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md border border-white/20">
							<LuMapPin className="h-4 w-4 text-[var(--secondary)]" />
							<span>{item.location}</span>
						</div>
					)}

					{/* Title */}
					<h1 className="font-heading text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl">
						{item.title}
					</h1>

					{/* Description */}
					<p className="max-w-2xl text-lg text-gray-200 md:text-xl">
						{item.description}
					</p>

					{/* Price & Rating Row */}
					<div className="flex items-center gap-6 text-white">
						{item.price && (
							<div>
								<p className="text-sm text-gray-400">Starting from</p>
								<p className="text-3xl font-bold text-[var(--secondary)]">{item.price}</p>
							</div>
						)}
						{item.rating && (
							<div className="flex items-center gap-2">
								<LuStar className="h-6 w-6 fill-[var(--secondary)] text-[var(--secondary)]" />
								<span className="text-2xl font-bold">{item.rating}</span>
								<span className="text-sm text-gray-400">/ 5.0</span>
							</div>
						)}
					</div>

					{/* CTAs */}
					<div className="flex flex-wrap gap-4 pt-4">
						<Button size="lg" className="h-14 rounded-full bg-[var(--secondary)] px-8 text-lg font-semibold text-white hover:bg-orange-500">
							Explore Now
						</Button>
						<Button size="lg" variant="outline" className="h-14 rounded-full border-white/30 bg-white/5 px-8 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:text-white">
							View Itinerary
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
