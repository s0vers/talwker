import React from "react";
import Image from "next/image";
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
    <section className="bg-white py-24 dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
             <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-bold mb-4">
                Testimonials
            </span>
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white md:text-5xl">
                What Our Travelers Say
            </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
                <div key={i} className="relative rounded-[2.5rem] bg-[var(--muted)] p-8 dark:bg-gray-900">
                    <LuQuote className="absolute top-8 right-8 h-12 w-12 text-gray-300 dark:text-gray-700" />
                    
                    <div className="mb-6 flex items-center gap-4">
                        <Avatar className="h-14 w-14 border-2 border-white shadow-md">
                            <AvatarImage src={t.image} alt={t.name} />
                            <AvatarFallback>{t.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                            <p className="text-sm text-gray-500">{t.location}</p>
                        </div>
                    </div>

                    <p className="relative z-10 text-lg italic text-gray-600 dark:text-gray-300 leading-relaxed">
                        &quot;{t.content}&quot;
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};
