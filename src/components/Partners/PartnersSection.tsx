import React from "react";
import Image from "next/image";

// Placeholder logos - in a real app these would be SVGs or images
const partners = [
	{ name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
	{ name: "Booking.com", logo: "https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg" },
	{ name: "Expedia", logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/Expedia_2012_logo.svg" },
	{ name: "Tripadvisor", logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/TripAdvisor_Logo.svg" },
	{ name: "Skyscanner", logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Skyscanner_Logo_Lockup_Horizontal_White_RGB.svg" },
];

export const PartnersSection = () => {
	return (
		<section className="bg-white py-12 border-b border-gray-100 dark:bg-black dark:border-gray-800">
			<div className="container mx-auto px-4 md:px-6">
				<p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-gray-400">
					Trusted by 10,000+ Travelers & Partners
				</p>
				<div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100">
                    {/* Using simple text placeholders for reliability if images fail, but structure suggests images */}
                    {partners.map((partner) => (
                        <div key={partner.name} className="flex items-center justify-center">
                             <span className="text-xl font-bold text-gray-500 dark:text-gray-400">{partner.name}</span>
                        </div>
                    ))}
				</div>
			</div>
		</section>
	);
};
