"use client";

import { useState } from "react";
import { FaqHero, FaqAccordion, FaqCTA } from "./sections";

export default function FaqPage() {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<main className="min-h-screen bg-[#050505]">
			<FaqHero
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
			/>
			<FaqAccordion
				searchQuery={searchQuery}
				onClearSearch={() => setSearchQuery("")}
			/>
			<FaqCTA />
		</main>
	);
}
