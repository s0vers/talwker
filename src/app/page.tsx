import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Destinations from "@/components/Destinations/Destinations";
import About from "@/components/About";
import FeaturedTours from "@/components/FeaturedTours/FeaturedTours";
import Testimonials from "@/components/Testimonials/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<>
			<Navbar />
			<Hero />
			<Marquee />
			<Destinations />
			<About />
			<FeaturedTours />
			<Testimonials />
			<CTA />
			<Footer />
		</>
	);
}
