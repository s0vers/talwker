import HeroSection from "@/components/HeroSection/HeroSection";
import { DestinationsGrid } from "@/components/Destinations/DestinationsGrid";
import { ServicesSection } from "@/components/Services/ServicesSection";
import { PartnersSection } from "@/components/Partners/PartnersSection";
import { CategoriesSection } from "@/components/Categories/CategoriesSection";
import { TestimonialsSection } from "@/components/Testimonials/TestimonialsSection";
import { Footer } from "@/components/Footer/Footer";

const dummyBanners: Banner[] = [
	{
		id: "1",
		location: "Maldives",
		title: "Experience the Tropical Paradise",
		description:
			"Immerse yourself in the crystal-clear waters and pristine white sands of the Maldives. A perfect getaway for relaxation.",
		price: "$2,499",
		rating: 4.9,
		image: "/image.jpg",
		category: "Beach",
	},
	{
		id: "2",
		location: "Swiss Alps, Switzerland",
		title: "Conquer the Majestic Peaks",
		description:
			"Embark on a thrilling adventure through the snow-capped mountains of Switzerland. Skiing, hiking, and breathtaking views await.",
		price: "$1,899",
		rating: 4.8,
		image: "/image.jpg", // Using same placeholder
		category: "Adventure",
	},
	{
		id: "3",
		location: "Kyoto, Japan",
		title: "Discover Ancient Traditions",
		description:
			"Step back in time and explore the historic temples, shrines, and beautiful cherry blossoms of Kyoto.",
		price: "$1,599",
		rating: 4.7,
		image: "/image.jpg",
		category: "Culture",
	},
];

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen bg-white dark:bg-black font-sans">
			<HeroSection banners={dummyBanners} />
            <PartnersSection />
			<CategoriesSection />
            <DestinationsGrid />
			<ServicesSection />
            <TestimonialsSection />
            <Footer />
		</div>
	);
}
