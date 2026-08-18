"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LuArrowRight, LuCircleHelp } from "react-icons/lu";
import { FAQ_GROUPS } from "../content/faq-copy";

export type FaqAccordionProps = {
	searchQuery: string;
	onClearSearch: () => void;
};

export function FaqAccordion({ searchQuery, onClearSearch }: FaqAccordionProps) {
	const t = useTranslations("FAQ");
	const [activeTab, setActiveTab] = useState<string>("all");

	const categories = [
		{ id: "all", label: t("tabAll") },
		{ id: "booking", label: t("tabBooking") },
		{ id: "travel", label: t("tabTravel") },
		{ id: "safety", label: t("tabSafety") },
		{ id: "custom", label: t("tabCustom") },
	];

	const query = searchQuery.trim().toLowerCase();

	// Filter groups and items with localized content
	const filteredGroups = FAQ_GROUPS.map((group) => {
		if (activeTab !== "all" && group.id !== activeTab) return null;

		const translatedGroupTitle = t.has(`groups.${group.id}`) ? t(`groups.${group.id}`) : group.title;

		const localizedItems = group.items.map((item) => {
			const question = t.has(`items.${item.id}.question`) ? t(`items.${item.id}.question`) : item.question;
			const answer = t.has(`items.${item.id}.answer`) ? t(`items.${item.id}.answer`) : item.answer;
			const linkLabel = item.linkLabel && t.has(`items.${item.id}.linkLabel`) ? t(`items.${item.id}.linkLabel`) : item.linkLabel;

			return {
				...item,
				question,
				answer,
				linkLabel,
			};
		});

		const matchingItems = localizedItems.filter((item) => {
			if (!query) return true;
			const haystack = [item.question, item.answer, ...item.keywords].join(" ").toLowerCase();
			return haystack.includes(query);
		});

		if (matchingItems.length === 0) return null;

		return {
			...group,
			title: translatedGroupTitle,
			items: matchingItems,
		};
	}).filter(Boolean);

	return (
		<section className="bg-[#050505] text-white py-16 md:py-24">
			<div className="pad-x mx-auto max-w-[1600px] space-y-12">
				{/* Category Filter Tabs */}
				<div className="flex flex-wrap gap-2.5 border-b border-white/10 pb-6">
					{categories.map((cat) => {
						const isActive = activeTab === cat.id;
						return (
							<button
								key={cat.id}
								type="button"
								onClick={() => setActiveTab(cat.id)}
								className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
									isActive
										? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
										: "border border-white/10 bg-[#0a0a0a] text-white/60 hover:border-white/25 hover:text-white"
								}`}
							>
								{cat.label}
							</button>
						);
					})}
				</div>

				{/* Accordion Groups */}
				{filteredGroups.length === 0 ? (
					<div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-12 text-center space-y-4">
						<LuCircleHelp className="mx-auto h-12 w-12 text-white/30" />
						<h3 className="text-lg font-bold text-white">{t("noResultsTitle")}</h3>
						<p className="text-xs text-white/60 max-w-sm mx-auto">
							{t("noResultsDesc")}
						</p>
						<button
							type="button"
							onClick={onClearSearch}
							className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-orange-500 hover:border-orange-500"
						>
							{t("clearFilter")}
						</button>
					</div>
				) : (
					filteredGroups.map((group) => (
						<div key={group!.id} className="space-y-6">
							<h2 className="text-xl font-bold tracking-tight text-white border-b border-white/10 pb-3 flex items-center gap-2">
								<span className="h-2 w-2 rounded-full bg-orange-500" />
								{group!.title}
							</h2>
							<Accordion type="single" collapsible className="w-full space-y-3">
								{group!.items.map((item) => (
									<AccordionItem
										key={item.id}
										value={item.id}
										className="rounded-2xl border border-white/10 bg-[#0a0a0a] transition-colors hover:border-white/20 overflow-hidden"
									>
										<AccordionTrigger className="text-white text-base md:text-lg hover:no-underline font-semibold px-6 py-5 w-full">
											<span className="pr-4">{item.question}</span>
										</AccordionTrigger>
										<AccordionContent className="space-y-4 px-6 pt-1 pb-6">
											<p className="text-white/70 leading-relaxed text-sm">{item.answer}</p>
											{item.linkHref && item.linkLabel ? (
												<div>
													<Link
														href={item.linkHref}
														className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-orange-500 hover:text-orange-400"
													>
														{item.linkLabel} <LuArrowRight className="h-3.5 w-3.5" />
													</Link>
												</div>
											) : null}
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
					))
				)}
			</div>
		</section>
	);
}
