import React from "react";
import { LuPlane, LuHotel, LuMap } from "react-icons/lu";

const services = [
	{
		title: "Seamless Flights",
		description: "Best prices on flights to over 5,000 destinations worldwide.",
		icon: <LuPlane className="h-8 w-8" />
	},
	{
		title: "Luxury Stays",
		description: "Hand-picked hotels and villas for the ultimate comfort.",
		icon: <LuHotel className="h-8 w-8" />
	},
	{
		title: "Curated Tours",
		description: "Expert-led experiences that take you off the beaten path.",
		icon: <LuMap className="h-8 w-8" />
	}
];

export const ServicesSection = () => {
	return (
		<section className="py-24 bg-white dark:bg-black">
			<div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-800">
					{services.map((service, index) => (
						<div
							key={index}
							className="flex flex-col items-start px-4 md:px-8 py-8 md:py-0"
						>
							<div className="mb-6 text-[var(--secondary)]">
								{service.icon}
							</div>
							<h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
								{service.title}
							</h3>
							<p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
								{service.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
