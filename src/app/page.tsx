import HeroSection from "@/components/HeroSection/HeroSection";
import Destinations from "@/components/Destinations/Destinations";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import FeaturedTours from "@/components/FeaturedTours/FeaturedTours";
import Testimonials from "@/components/Testimonials/Testimonials";
import Newsletter from "@/components/Newsletter/Newsletter";

export default function Home() {
	return (
		<>
			<HeroSection />
			<Destinations />
			<FeaturedTours />
			<WhyChooseUs />
			<Testimonials />
			<Newsletter />
		</>
	);
}
