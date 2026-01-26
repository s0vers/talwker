import React from "react";
import { LuQuote } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Travel Enthusiast",
    image: "/author.jpg",
    content: "The best travel agency I've ever used. The booking process was seamless and the customer support was top-notch. Highly recommended!",
    location: "New York, USA",
  },
  {
    name: "Michael Chen",
    role: "Adventure Seeker",
    image: "/writer.avif",
    content: "I booked my trip to the Swiss Alps through Talkwer and it was an unforgettable experience. Everything was perfectly organized.",
    location: "Sydney, Australia",
  },
  {
    name: "Emily Davis",
    role: "Digital Nomad",
    image: "/author.jpg",
    content: "Great deals on flights and hotels. I managed to save a lot of money on my trip to Japan thanks to their exclusive offers.",
    location: "London, UK",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="bg-gray-50 py-24 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white md:text-4xl mb-6">
                Loved by Travelers
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
                See what our community has to say about their journeys.
            </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6">
                    <div className="mb-6 relative">
                        <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                            <AvatarImage src={t.image} alt={t.name} />
                            <AvatarFallback>{t.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 bg-[var(--secondary)] rounded-full p-2 text-white">
                            <LuQuote className="h-3 w-3" />
                        </div>
                    </div>
                    
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                        &quot;{t.content}&quot;
                    </p>

                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                        <p className="text-sm text-gray-500 uppercase tracking-wider text-xs mt-1">{t.location}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};
