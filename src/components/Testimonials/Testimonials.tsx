"use client";

import { LuStar, LuQuote } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const TESTIMONIALS: Testimonial[] = [
	{
		id: 1,
		name: "Sarah Mitchell",
		avatar: "/writer.avif",
		location: "New York, USA",
		rating: 5,
		text: "Voyager made our honeymoon absolutely magical. The attention to detail, the hidden gems they included in our itinerary, and the seamless transfers — everything was perfect.",
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
];

export default function Testimonials() {
	return (
		<section id="testimonials" className="bg-gray-50 py-24">
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<div className="mb-14 text-center">
					<p className="mb-3 text-sm font-semibold uppercase tracking-widest text-sky-500">
						Traveler Stories
					</p>
					<h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
						What Our Travelers Say
					</h2>
					<p className="mx-auto max-w-2xl text-gray-500">
						Real stories from real adventurers who trusted Voyager to craft
						their perfect getaway.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{TESTIMONIALS.map((t) => (
						<div
							key={t.id}
							className="relative rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg"
						>
							<LuQuote className="mb-4 h-8 w-8 text-sky-200" />

							<div className="mb-4 flex gap-1">
								{Array.from({ length: t.rating }).map((_, i) => (
									<LuStar
										key={i}
										className="h-4 w-4 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>

							<p className="mb-6 text-sm leading-relaxed text-gray-600">
								&ldquo;{t.text}&rdquo;
							</p>

							<div className="flex items-center gap-3 border-t border-gray-200 pt-5">
								<Avatar className="h-11 w-11">
									<AvatarImage src={t.avatar} alt={t.name} />
									<AvatarFallback>
										{t.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm font-semibold text-gray-900">
										{t.name}
									</p>
									<p className="text-xs text-gray-500">{t.location}</p>
								</div>
							</div>

							<p className="mt-3 inline-block rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-600">
								{t.trip}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
