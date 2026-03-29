import type { Testimonial } from "@/shared/types/domain";
import { defineTestimonials } from "@/lib/content-guards";

export const TESTIMONIALS: Testimonial[] = defineTestimonials([
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
]);

