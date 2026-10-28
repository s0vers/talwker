"use client";

import { useState } from "react";
import { FaqHero, FaqAccordion, FaqCTA } from "./sections";

export default function FaqPage() {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<>
			<div className="relative min-h-screen overflow-x-clip bg-[#050505]">
				<FaqHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
				<FaqAccordion
					searchQuery={searchQuery}
					onClearSearch={() => setSearchQuery("")}
				/>
				<FaqCTA />
			</div>
		</>
	);
}
