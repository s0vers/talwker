"use client";

import { Search, X } from "lucide-react";
import { FAQ_HERO } from "../content/faq-copy";

export type FaqHeroProps = {
	searchQuery: string;
	onSearchChange: (query: string) => void;
};

export function FaqHero({ searchQuery, onSearchChange }: FaqHeroProps) {
	return (
		<section className="bg-[#050505] text-white pt-28 pb-14 md:pt-36 md:pb-16 border-b border-white/6">
			<div className="pad-x mx-auto max-w-[1600px]">
				<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
					{FAQ_HERO.eyebrow}
				</p>
				<h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
					{FAQ_HERO.title}
				</h1>
				<p className="mt-4 text-base text-white/60 leading-relaxed">
					{FAQ_HERO.description}
				</p>

				{/* Search Bar Input */}
				<div className="mt-8 relative w-full">
					<div className="relative flex items-center">
						<Search className="absolute left-4 h-5 w-5 text-white/40 pointer-events-none" />
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => onSearchChange(e.target.value)}
							placeholder={FAQ_HERO.searchPlaceholder}
							className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] py-4 pl-12 pr-12 text-sm text-white placeholder:text-white/35 focus:border-orange-500 focus:outline-none shadow-xl transition-all"
						/>
						{searchQuery ? (
							<button
								type="button"
								onClick={() => onSearchChange("")}
								aria-label="Clear search"
								className="absolute right-4 p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
							>
								<X className="h-4 w-4" />
							</button>
						) : null}
					</div>
				</div>
			</div>
		</section>
	);
}
