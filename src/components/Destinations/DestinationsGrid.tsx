"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";

const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    image: "/image.jpg",
    price: "$1,200",
    description: "White domes & blue sea",
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    image: "/image.jpg",
    price: "$1,500",
    description: "Ancient temples",
  },
  {
    id: 3,
    name: "Machu Picchu",
    image: "/image.jpg",
    price: "$1,800",
    description: "Inca citadel",
  },
  {
    id: 4,
    name: "Paris, France",
    image: "/image.jpg",
    price: "$1,100",
    description: "City of lights",
  },
];

export const DestinationsGrid = () => {
  return (
    <section className="bg-white py-24 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
                <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-4">
                    Top Destinations
                </span>
                <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white md:text-6xl">
                    Explore Popular <span className="text-[var(--secondary)]">Spots</span>
                </h2>
                <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    From the beaches of Bali to the mountains of the Swiss Alps, discover the world&apos;s most breathtaking locations.
                </p>
            </div>
            <button className="group flex items-center gap-2 rounded-full bg-gray-100 px-6 py-3 text-lg font-medium text-gray-900 transition-all hover:bg-[var(--secondary)] hover:text-white">
                View All <LuArrowUpRight className="transition-transform group-hover:rotate-45" />
            </button>
        </div>

        {/* Masonry-style Bento Grid with Soft Shapes */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-2 h-auto md:h-[800px]">
            {/* Item 1 - Large (6 cols) */}
            <div className="group relative col-span-1 md:col-span-6 md:row-span-2 overflow-hidden rounded-[3rem] cursor-pointer">
                <Image
                    src={destinations[0].image}
                    alt={destinations[0].name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                        <div className="mb-2 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur-md">
                            Best Seller
                        </div>
                        <h3 className="text-4xl font-bold text-white md:text-5xl">{destinations[0].name}</h3>
                        <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            <p className="text-lg text-gray-200">{destinations[0].description}</p>
                            <p className="text-2xl font-bold text-[var(--secondary)]">{destinations[0].price}</p>
                        </div>
                    </div>
                </div>
            </div>

             {/* Item 2 - Medium (3 cols) */}
             <div className="group relative col-span-1 md:col-span-3 md:row-span-1 overflow-hidden rounded-[2.5rem] cursor-pointer">
                <Image
                    src={destinations[1].image}
                    alt={destinations[1].name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-2xl font-bold text-white">{destinations[1].name}</h3>
                    <p className="text-sm font-medium text-[var(--secondary)]">{destinations[1].price}</p>
                </div>
            </div>

            {/* Item 3 - Medium (3 cols) */}
             <div className="group relative col-span-1 md:col-span-3 md:row-span-1 overflow-hidden rounded-[2.5rem] cursor-pointer">
                <Image
                    src={destinations[2].image}
                    alt={destinations[2].name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-2xl font-bold text-white">{destinations[2].name}</h3>
                    <p className="text-sm font-medium text-[var(--secondary)]">{destinations[2].price}</p>
                </div>
            </div>

            {/* Item 4 - Wide (6 cols) */}
            <div className="group relative col-span-1 md:col-span-6 md:row-span-1 overflow-hidden rounded-[2.5rem] cursor-pointer">
                <Image
                    src={destinations[3].image}
                    alt={destinations[3].name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 p-8 w-full flex items-end justify-between">
                    <div>
                        <h3 className="text-3xl font-bold text-white">{destinations[3].name}</h3>
                        <p className="text-gray-300">{destinations[3].description}</p>
                    </div>
                    <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm transition-colors group-hover:bg-[var(--secondary)]">
                        <LuArrowUpRight className="h-6 w-6 text-white" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
