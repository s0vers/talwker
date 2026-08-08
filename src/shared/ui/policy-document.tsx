"use client";

import Link from "next/link";
import { type ReactNode, useState, useEffect } from "react";
import { Printer, Link2, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type PolicySection = {
	id: string;
	heading: string;
	body: ReactNode;
};

export type PolicyDocumentProps = {
	eyebrow: string;
	title: string;
	effectiveDate: string;
	intro: string;
	sections: PolicySection[];
	keyTakeaways?: string[];
};

const OTHER_POLICIES = [
	{ name: "Booking Policy", href: "/booking-policy" },
	{ name: "Cancellation Policy", href: "/cancellation" },
	{ name: "Privacy Policy", href: "/privacy" },
	{ name: "Terms of Service", href: "/terms" },
	{ name: "Cookie Policy", href: "/cookies" },
];

export function PolicyDocument({
	eyebrow,
	title,
	effectiveDate,
	intro,
	sections,
	keyTakeaways = [
		"Written confirmations lock your dates, rates, and inclusions.",
		"Transparent refund and credit windows apply per cancellation terms.",
		"Your privacy is protected with zero sale or monetization of guest data.",
	],
}: PolicyDocumentProps) {
	const [activeSectionId, setActiveSectionId] = useState<string>(sections[0]?.id ?? "");
	const [copied, setCopied] = useState<boolean>(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.find((entry) => entry.isIntersecting);
				if (visible) {
					setActiveSectionId(visible.target.id);
				}
			},
			{ rootMargin: "-20% 0px -60% 0px" },
		);

		for (const sec of sections) {
			const el = document.getElementById(sec.id);
			if (el) observer.observe(el);
		}

		return () => observer.disconnect();
	}, [sections]);

	const handlePrint = () => {
		window.print();
	};

	const handleCopyLink = () => {
		try {
			navigator.clipboard.writeText(window.location.href);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {}
	};

	return (
		<article className="bg-[#050505] text-white pt-28 pb-24 md:pt-36 md:pb-32">
			<div className="pad-x mx-auto max-w-[1600px]">
				{/* Top Header */}
				<div className="pb-12 border-b border-white/10">
					<div className="flex items-center gap-3">
						<p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
							{eyebrow}
						</p>
						<span className="rounded-full bg-white/5 border border-white/10 px-3 py-0.5 text-[10px] text-white/50">
							Official Document
						</span>
					</div>

					<h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
						{title}
					</h1>
					<p className="mt-3 text-xs sm:text-sm text-white/40">
						Effective Date: <span className="text-white/70">{effectiveDate}</span> · Last Verified: August 2026
					</p>
					<p className="mt-6 text-base sm:text-lg leading-relaxed text-white/70">
						{intro}
					</p>

					{/* Action Buttons */}
					<div className="mt-8 flex flex-wrap items-center gap-3">
						<button
							type="button"
							onClick={handlePrint}
							className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0a0a0a] px-4 py-2 text-xs font-semibold text-white/80 hover:border-white/40 hover:text-white transition-colors"
						>
							<Printer className="h-3.5 w-3.5 text-orange-500" /> Print Document
						</button>
						<button
							type="button"
							onClick={handleCopyLink}
							className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0a0a0a] px-4 py-2 text-xs font-semibold text-white/80 hover:border-white/40 hover:text-white transition-colors"
						>
							<Link2 className="h-3.5 w-3.5 text-orange-500" />
							{copied ? "Link Copied!" : "Share Link"}
						</button>
					</div>
				</div>

				{/* Key Takeaways Callout Box */}
				<div className="my-10 rounded-2xl border border-orange-500/30 bg-orange-500/5 p-6 sm:p-8">
					<div className="flex items-center gap-2 text-orange-500 mb-3">
						<ShieldCheck className="h-5 w-5 shrink-0" />
						<h2 className="text-xs font-semibold uppercase tracking-wider text-orange-400">Key Document Takeaways</h2>
					</div>
					<ul className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
						{keyTakeaways.map((takeaway, idx) => (
							<li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
								<CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
								<span>{takeaway}</span>
							</li>
						))}
					</ul>
				</div>

				{/* Main 2-Column Section (Sticky TOC + Content) */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
					{/* Left Column: Sticky Sidebar Table of Contents */}
					<aside className="lg:col-span-4 hidden lg:block sticky top-28 h-fit">
						<div className="space-y-6 rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-xl">
							<p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
								Table of Contents
							</p>
							<nav className="space-y-1">
								{sections.map((section) => {
									const isActive = activeSectionId === section.id;
									return (
										<a
											key={section.id}
											href={`#${section.id}`}
											className={cn(
												"block rounded-xl px-3.5 py-2 text-xs font-medium transition-all duration-200",
												isActive
													? "bg-orange-500/15 text-orange-400 font-semibold border-l-2 border-orange-500 pl-3"
													: "text-white/50 hover:bg-white/5 hover:text-white",
											)}
										>
											{section.heading}
										</a>
									);
								})}
							</nav>

							<div className="pt-4 border-t border-white/10">
								<p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-2">Need Guidance?</p>
								<Link
									href="/contact"
									className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-500 hover:text-orange-400"
								>
									Contact Legal & Support <ArrowRight className="h-3.5 w-3.5" />
								</Link>
							</div>
						</div>
					</aside>

					{/* Right Column: Policy Content */}
					<div className="lg:col-span-8 space-y-12">
						{sections.map((section) => (
							<section
								key={section.id}
								id={section.id}
								aria-labelledby={`${section.id}-heading`}
								className="scroll-mt-32 rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 sm:p-8 transition-colors hover:border-white/15"
							>
								<h2
									id={`${section.id}-heading`}
									className="text-xl font-bold tracking-tight text-white border-b border-white/10 pb-3"
								>
									{section.heading}
								</h2>
								<div className="mt-4 space-y-4 text-sm leading-relaxed text-white/70 [&_a]:text-orange-500 [&_a]:underline-offset-2 hover:[&_a]:underline">
									{section.body}
								</div>
							</section>
						))}

						{/* Related Policies Footer Strip */}
						<div className="pt-8 border-t border-white/10 space-y-4">
							<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Other Policy Documents</p>
							<div className="flex flex-wrap gap-2.5">
								{OTHER_POLICIES.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className="rounded-full border border-white/10 bg-[#0a0a0a] px-4 py-2 text-xs font-semibold text-white/60 hover:border-orange-500/40 hover:text-white transition-colors"
									>
										{item.name} →
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}
