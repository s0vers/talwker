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
    size: "large", // spans 2 cols
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    image: "/image.jpg",
    price: "$1,500",
    size: "small",
  },
  {
    id: 3,
    name: "Machu Picchu, Peru",
    image: "/image.jpg",
    price: "$1,800",
    size: "small",
  },
  {
    id: 4,
    name: "Paris, France",
    image: "/image.jpg",
    price: "$1,100",
    size: "medium", // taller
  },
];

export const DestinationsGrid = () => {
  return (
    <section className="bg-white py-24 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex items-end justify-between">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">
                    Popular Destinations
                </h2>
                <p className="mt-4 max-w-lg text-gray-600 dark:text-gray-400">
                    Explore our most visited locations and find your perfect getaway spot for the upcoming season.
                </p>
            </div>
            <button className="hidden items-center gap-2 text-lg font-medium text-[var(--secondary)] transition-colors hover:text-orange-600 md:flex">
                View All Destinations <LuArrowUpRight />
            </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2 h-[800px]">
            {/* Item 1 - Large (2x2) */}
            <div className="group relative col-span-1 md:col-span-2 md:row-span-2 overflow-hidden rounded-3xl cursor-pointer">
                <Image
                    src={destinations[0].image}
                    alt={destinations[0].name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-sm font-semibold uppercase tracking-wider text-[var(--secondary)]">Trending</p>
                    <h3 className="text-3xl font-bold">{destinations[0].name}</h3>
                    <p className="mt-2 text-lg font-medium opacity-90">From {destinations[0].price}</p>
                </div>
            </div>

             {/* Item 2 - Small (1x1) */}
             <div className="group relative col-span-1 md:col-span-1 md:row-span-1 overflow-hidden rounded-3xl cursor-pointer">
                <Image
                    src={destinations[1].image}
                    alt={destinations[1].name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold">{destinations[1].name}</h3>
                    <p className="mt-1 text-sm font-medium opacity-90">From {destinations[1].price}</p>
                </div>
            </div>

            {/* Item 3 - Small (1x1) */}
             <div className="group relative col-span-1 md:col-span-1 md:row-span-1 overflow-hidden rounded-3xl cursor-pointer">
                <Image
                    src={destinations[2].image}
                    alt={destinations[2].name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold">{destinations[2].name}</h3>
                    <p className="mt-1 text-sm font-medium opacity-90">From {destinations[2].price}</p>
                </div>
            </div>

            {/* Item 4 - Medium (2x1 wide) */}
            <div className="group relative col-span-1 md:col-span-2 md:row-span-1 overflow-hidden rounded-3xl cursor-pointer">
                <Image
                    src={destinations[3].image}
                    alt={destinations[3].name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold">{destinations[3].name}</h3>
                    <p className="mt-1 text-base font-medium opacity-90">From {destinations[3].price}</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
