import React from "react";

const partners = [
	"Airbnb",
	"Booking.com",
	"Expedia",
	"Tripadvisor",
	"Skyscanner",
    "Kayak",
    "Agoda"
];

export const PartnersSection = () => {
	return (
		<section className="bg-white py-10 border-b border-gray-50 dark:bg-black dark:border-gray-900 overflow-hidden">
			<div className="container mx-auto px-4 md:px-6">
				<p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
					Trusted by industry leaders
				</p>
				<div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-20">
                    {partners.map((partner) => (
                        <div key={partner} className="group cursor-default">
                             <span className="text-xl md:text-2xl font-bold text-gray-300 transition-colors duration-300 group-hover:text-gray-800 dark:text-gray-700 dark:group-hover:text-gray-200">
                                {partner}
                             </span>
                        </div>
                    ))}
				</div>
			</div>
		</section>
	);
};
