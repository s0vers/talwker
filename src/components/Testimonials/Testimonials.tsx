"use client";

import { useRef } from "react";
import { LuStar, LuQuote } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type Testimonial = {
	id: number;
	name: string;
	avatar: string;
	location: string;
	rating: number;
	text: string;
	trip: string;
};

const TESTIMONIALS: Testimonial[] = [
	{
		id: 1,
		name: "Sarah Mitchell",
		avatar: "/writer.avif",
		location: "New York, USA",
		rating: 5,
		text: "Talkwer made our honeymoon absolutely magical. The attention to detail, the hidden gems they included in our itinerary, and the seamless transfers — everything was perfect.",
		trip: "Bali Cultural Immersion",
	},
	{
		id: 2,
		name: "James Chen",
		avatar: "/author.jpg",
		location: "Toronto, Canada",
		rating: 5,
		text: "As a solo traveler, I was nervous about group tours. But the small group size and incredible guide made it the best trip of my life. Already planning my next adventure!",
		trip: "Japan Heritage Trail",
	},
	{
		id: 3,
		name: "Elena Rodriguez",
		avatar: "/writer.avif",
		location: "Madrid, Spain",
		rating: 5,
		text: "The Patagonia expedition exceeded every expectation. Waking up to glaciers, trekking through pristine landscapes — it was a once-in-a-lifetime experience.",
		trip: "Patagonia Expedition",
	},
	{
		id: 4,
		name: "Marcus Webb",
		avatar: "/author.jpg",
		location: "London, UK",
		rating: 5,
		text: "From booking to touchdown, Talkwer handled everything. The Iceland Northern Lights tour was breathtaking — our guide knew every secret spot.",
		trip: "Iceland Northern Lights",
	},
	{
		id: 5,
		name: "Priya Sharma",
		avatar: "/writer.avif",
		location: "Mumbai, India",
		rating: 5,
		text: "We did the Morocco desert safari with our family. Camels, stargazing, and the most welcoming hosts. The kids still talk about it every day.",
		trip: "Morocco Desert Safari",
	},
	{
		id: 6,
		name: "David Okonkwo",
		avatar: "/author.jpg",
		location: "Lagos, Nigeria",
		rating: 5,
		text: "Safari in Tanzania was on my bucket list for years. Talkwer made it seamless — we saw the Big Five and stayed in incredible lodges.",
		trip: "Tanzania Safari",
	},
];

const CARD_MIN_HEIGHT = "min-h-[380px]";

export default function Testimonials() {
	const autoplayPlugin = useRef(
		Autoplay({ delay: 4000, stopOnInteraction: false })
	);

	return (
		<section id="testimonials" className="bg-[#0b0b0b] py-28 md:py-36">
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="mb-16 text-center md:mb-20">
					<p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
						Traveler Stories
					</p>
					<h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-tighter text-white">
						What Our Travelers Say
						<span className="font-light italic text-orange-500">.</span>
					</h2>
					<p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/35 md:text-base">
						Real stories from real adventurers who trusted Talkwer to craft
						their perfect getaway.
					</p>
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

									<p className="mb-7 min-h-[4.5rem] flex-1 text-sm leading-relaxed text-white/65 line-clamp-4">
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

									<p className="mt-4 shrink-0 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/60">
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
