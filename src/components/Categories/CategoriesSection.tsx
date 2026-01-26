import React from "react";
import { LuMountain, LuWaves, LuBuilding2, LuTent, LuShip, LuSunset } from "react-icons/lu";

const categories = [
    { name: "Beaches", icon: <LuWaves className="h-6 w-6" />, count: "120+ Spots" },
    { name: "Mountains", icon: <LuMountain className="h-6 w-6" />, count: "85+ Trails" },
    { name: "Cities", icon: <LuBuilding2 className="h-6 w-6" />, count: "200+ Cities" },
    { name: "Camping", icon: <LuTent className="h-6 w-6" />, count: "50+ Camps" },
    { name: "Cruises", icon: <LuShip className="h-6 w-6" />, count: "25+ Routes" },
    { name: "Romance", icon: <LuSunset className="h-6 w-6" />, count: "40+ Getaways" },
];

export const CategoriesSection = () => {
  return (
    <section className="bg-[var(--muted)] py-20 dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white md:text-4xl">
                Browse by Category
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
                Find the perfect trip based on your interests.
            </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
            {categories.map((cat, index) => (
                <button 
                    key={index}
                    className="group flex min-w-[160px] flex-col items-center justify-center gap-4 rounded-[2rem] bg-white p-6 shadow-sm transition-all hover:bg-[var(--secondary)] hover:text-white hover:shadow-lg dark:bg-gray-900"
                >
                    <div className="rounded-full bg-gray-100 p-4 text-gray-600 transition-colors group-hover:bg-white/20 group-hover:text-white dark:bg-gray-800 dark:text-gray-300">
                        {cat.icon}
                    </div>
                    <div className="text-center">
                        <h3 className="font-bold">{cat.name}</h3>
                        <p className="text-xs text-gray-500 group-hover:text-white/80 dark:text-gray-400">{cat.count}</p>
                    </div>
                </button>
            ))}
        </div>
      </div>
    </section>
  );
};
