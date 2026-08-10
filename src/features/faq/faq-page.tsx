"use client";

import { useState } from "react";
import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
import { FaqHero, FaqAccordion, FaqCTA } from "./sections";

export default function FaqPage() {
	const isLoading = useInitialPageLoader();
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<>
			<InitialLoader isLoading={isLoading} />
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
