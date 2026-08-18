"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LuMapPin, LuBriefcase, LuCircleCheck } from "react-icons/lu";
import { OPEN_POSITIONS, type JobPosition } from "../content/careers-copy";

export type CareersBodyProps = {
	onApply: (position: JobPosition) => void;
};

export function CareersBody({ onApply }: CareersBodyProps) {
	const t = useTranslations("Careers");
	const [selectedDept, setSelectedDept] = useState<string>("All");

	const departments = ["All", "Editorial", "Operations", "Design & Product", "Engineering"];

	const deptLabels: Record<string, string> = {
		All: t("filterAll"),
		Editorial: t("filterEditorial"),
		Operations: t("filterOperations"),
		"Design & Product": t("filterDesign"),
		Engineering: t("filterProduct"),
	};

	const filteredPositions =
		selectedDept === "All"
			? OPEN_POSITIONS
			: OPEN_POSITIONS.filter((pos) => pos.department === selectedDept);

	return (
		<section id="open-positions" className="bg-[#050505] text-white py-16 md:py-24 border-t border-white/6 scroll-mt-20">
			<div className="pad-x mx-auto max-w-[1600px]">
				<div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
					<div>
						<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
							{t("positionsLabel")}
						</p>
						<h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
							{t("positionsTitleLead")} <span className="text-orange-500">{t("positionsTitleAccent")}</span> ({filteredPositions.length})
						</h2>
					</div>

					{/* Department filter tabs */}
					<div className="flex flex-wrap gap-2">
						{departments.map((dept) => (
							<button
								key={dept}
								type="button"
								onClick={() => setSelectedDept(dept)}
								className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
									selectedDept === dept
										? "bg-orange-500 text-white"
										: "border border-white/10 bg-[#0a0a0a] text-white/60 hover:text-white"
								}`}
							>
								{deptLabels[dept] ?? dept}
							</button>
						))}
					</div>
				</div>

				<div className="space-y-4">
					<Accordion type="single" collapsible className="w-full space-y-4">
						{filteredPositions.map((pos) => {
							const title = t.has(`positions.${pos.id}.title`) ? t(`positions.${pos.id}.title`) : pos.title;
							const location = t.has(`positions.${pos.id}.location`) ? t(`positions.${pos.id}.location`) : pos.location;
							const type = t.has(`positions.${pos.id}.type`) ? t(`positions.${pos.id}.type`) : pos.type;
							const summary = t.has(`positions.${pos.id}.summary`) ? t(`positions.${pos.id}.summary`) : pos.summary;
							const dept = t.has(`positions.${pos.id}.department`) ? t(`positions.${pos.id}.department`) : pos.department;

							return (
								<AccordionItem
									key={pos.id}
									value={pos.id}
									className="rounded-2xl border border-white/10 bg-[#0a0a0a] transition-all hover:border-white/20 overflow-hidden"
								>
									<AccordionTrigger className="hover:no-underline px-6 py-5 w-full">
										<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left w-full pr-4">
											<div>
												<span className="text-[10px] font-semibold uppercase tracking-wider text-orange-400">
													{dept}
												</span>
												<span className="block text-lg font-bold text-white">{title}</span>
											</div>
											<div className="flex items-center gap-4 text-xs text-white/50">
												<span className="flex items-center gap-1">
													<LuMapPin className="h-3.5 w-3.5 text-orange-500" />
													{location}
												</span>
												<span className="flex items-center gap-1">
													<LuBriefcase className="h-3.5 w-3.5 text-orange-500" />
													{type}
												</span>
											</div>
										</div>
									</AccordionTrigger>

									<AccordionContent className="px-6 pt-2 pb-6 space-y-6">
										<p className="text-sm text-white/70 leading-relaxed">{summary}</p>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
											<div className="space-y-2">
												<h4 className="text-xs font-semibold uppercase tracking-wider text-orange-500">
													{t("responsibilitiesHeading")}
												</h4>
												<ul className="space-y-2 text-xs text-white/70">
													{pos.responsibilities.map((item, idx) => (
														<li key={idx} className="flex items-start gap-2">
															<LuCircleCheck className="h-3.5 w-3.5 text-orange-500 shrink-0 mt-0.5" />
															<span>{item}</span>
														</li>
													))}
												</ul>
											</div>

											<div className="space-y-2">
												<h4 className="text-xs font-semibold uppercase tracking-wider text-orange-500">
													{t("requirementsHeading")}
												</h4>
												<ul className="space-y-2 text-xs text-white/70">
													{pos.requirements.map((item, idx) => (
														<li key={idx} className="flex items-start gap-2">
															<LuCircleCheck className="h-3.5 w-3.5 text-orange-500 shrink-0 mt-0.5" />
															<span>{item}</span>
														</li>
													))}
												</ul>
											</div>
										</div>

										<div className="pt-4">
											<button
												type="button"
												onClick={() => onApply({ ...pos, title })}
												className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-orange-600 transition-colors"
											>
												{t("applyRole")} →
											</button>
										</div>
									</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				</div>
			</div>
		</section>
	);
}
