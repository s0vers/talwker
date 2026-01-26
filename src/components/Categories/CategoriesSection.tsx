import React from "react";
import { LuMountain, LuWaves, LuBuilding2, LuTent, LuShip, LuSunset, LuArrowRight } from "react-icons/lu";

const categories = [
    { name: "Beaches", icon: <LuWaves className="h-8 w-8" />, count: "120 Spots" },
    { name: "Mountains", icon: <LuMountain className="h-8 w-8" />, count: "85 Trails" },
    { name: "Cities", icon: <LuBuilding2 className="h-8 w-8" />, count: "200 Cities" },
    { name: "Camping", icon: <LuTent className="h-8 w-8" />, count: "50 Camps" },
];

export const CategoriesSection = () => {
  return (
    <section className="bg-white py-24 dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white md:text-4xl tracking-tight">
                    Find Your Vibe
                </h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Select a category to start exploring.
                </p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-[var(--secondary)] transition-colors">
                View All Categories <LuArrowRight />
            </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, index) => (
                <button 
                    key={index}
                    className="group relative flex flex-col justify-between h-64 p-8 rounded-[2rem] bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 transition-all duration-300 overflow-hidden text-left"
                >
                    <div className="relative z-10 text-gray-400 group-hover:text-[var(--secondary)] transition-colors duration-300">
                        {cat.icon}
                    </div>
                    
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{cat.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{cat.count}</p>
                    </div>

                    {/* Subtle decorative circle */}
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[var(--secondary)]/5 rounded-full blur-2xl group-hover:bg-[var(--secondary)]/10 transition-colors duration-300" />
                </button>
            ))}
        </div>
      </div>
    </section>
  );
};
