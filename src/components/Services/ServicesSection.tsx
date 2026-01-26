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
		<section className="bg-[var(--muted)] py-20 dark:bg-black">
			<div className="container mx-auto px-4 md:px-6">
				<div className="mb-16 text-center">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
						Why Choose Us?
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
						We offer a wide range of services to make your travel experience
						unforgettable.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{services.map((service, index) => (
						<div
							key={index}
							className="group rounded-3xl bg-white p-8 shadow-sm transition-all hover:scale-105 hover:shadow-xl dark:bg-gray-900"
						>
							<div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--muted)] transition-colors group-hover:bg-orange-100">
								{service.icon}
							</div>
							<h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
								{service.title}
							</h3>
							<p className="text-gray-600 dark:text-gray-400">
								{service.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
