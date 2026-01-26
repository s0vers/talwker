import React from "react";
import { LuPlane, LuHotel, LuMap } from "react-icons/lu";

const services = [
	{
		title: "Flight Booking",
		description:
			"We provide the best flight booking experience with affordable prices.",
		icon: <LuPlane className="h-10 w-10 text-[var(--secondary)]" />
	},
	{
		title: "Hotel Booking",
		description:
			"Stay in the best hotels across the world with our exclusive deals.",
		icon: <LuHotel className="h-10 w-10 text-[var(--secondary)]" />
	},
	{
		title: "Tour Packages",
		description:
			"Explore the world with our curated tour packages designed for you.",
		icon: <LuMap className="h-10 w-10 text-[var(--secondary)]" />
	}
];

export const ServicesSection = () => {
	return (
		<section className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-[var(--muted)] dark:from-black dark:to-gray-900">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-[var(--secondary)] opacity-5 rounded-full blur-3xl" />
                <div className="absolute top-40 right-0 w-72 h-72 bg-blue-500 opacity-5 rounded-full blur-3xl" />
            </div>

			<div className="container relative mx-auto px-4 md:px-6">
				<div className="mb-16 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-bold mb-4">
                        Our Services
                    </span>
					<h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white md:text-5xl">
						Why Choose Us?
					</h2>
					<p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
						We offer a wide range of services to make your travel experience
						unforgettable.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{services.map((service, index) => (
						<div
							key={index}
							className="group relative overflow-hidden rounded-[2.5rem] bg-white p-10 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-800/50 dark:backdrop-blur-sm border border-gray-100 dark:border-gray-700"
						>
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-orange-900/20" />
                            
							<div className="relative z-10 mb-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-[var(--muted)] shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 dark:bg-gray-800">
								{service.icon}
							</div>
							<h3 className="relative z-10 mb-4 text-2xl font-bold text-gray-900 dark:text-white">
								{service.title}
							</h3>
							<p className="relative z-10 text-gray-600 dark:text-gray-400 leading-relaxed">
								{service.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
