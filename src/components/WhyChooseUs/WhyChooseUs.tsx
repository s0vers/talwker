"use client";

import { motion } from "framer-motion";
import {
	LuShield,
	LuHeadphones,
	LuHeart,
	LuBadgeDollarSign,
	LuGlobe,
	LuSparkles,
} from "react-icons/lu";

const FEATURES = [
	{
		icon: LuShield,
		title: "Secure Booking",
		description:
			"Your payments and personal data are protected with industry-leading encryption.",
		color: "bg-blue-50 text-blue-600",
	},
	{
		icon: LuHeadphones,
		title: "24/7 Support",
		description:
			"Our travel experts are available around the clock to assist you during your trip.",
		color: "bg-emerald-50 text-emerald-600",
	},
	{
		icon: LuBadgeDollarSign,
		title: "Best Price Guarantee",
		description:
			"Find a lower price elsewhere? We'll match it and give you an extra 10% off.",
		color: "bg-amber-50 text-amber-600",
	},
	{
		icon: LuGlobe,
		title: "Expert Local Guides",
		description:
			"Experienced local guides who know every hidden gem and secret spot.",
		color: "bg-purple-50 text-purple-600",
	},
	{
		icon: LuHeart,
		title: "Curated Experiences",
		description:
			"Every itinerary is thoughtfully crafted to create lasting memories.",
		color: "bg-rose-50 text-rose-600",
	},
	{
		icon: LuSparkles,
		title: "Flexible Cancellation",
		description:
			"Plans change — cancel up to 48 hours before departure for a full refund.",
		color: "bg-cyan-50 text-cyan-600",
	},
];

const container = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyChooseUs() {
	return (
		<section id="about" className="bg-muted/50 py-24">
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<div className="mb-14 text-center">
					<p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
						Why Voyager
					</p>
					<h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
						Travel with Confidence
					</h2>
					<p className="mx-auto max-w-2xl text-muted-foreground">
						We go above and beyond to make sure your adventure is seamless,
						safe, and unforgettable.
					</p>
				</div>

				<motion.div
					variants={container}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.2 }}
					className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
				>
					{FEATURES.map((feature, i) => (
						<motion.div
							key={i}
							variants={item}
							className="group rounded-2xl bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
						>
							<div
								className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}
							>
								<feature.icon className="h-6 w-6" />
							</div>
							<h3 className="mb-2 text-lg font-bold text-foreground">
								{feature.title}
							</h3>
							<p className="text-sm leading-relaxed text-muted-foreground">
								{feature.description}
							</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
