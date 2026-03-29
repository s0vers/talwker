import type { Destination } from "@/shared/types/domain";
import { defineDestinations } from "@/lib/content-guards";

export const DESTINATIONS: Destination[] = defineDestinations([
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
]);

