import type { ReactNode } from "react";

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
};

export function PolicyDocument({
	eyebrow,
	title,
	effectiveDate,
	intro,
	sections,
}: PolicyDocumentProps) {
	return (
		<article className="bg-[#050505] text-white">
			<div className="pad-x mx-auto max-w-[800px] py-28 md:py-36">
				<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
					{eyebrow}
				</p>
				<h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
				<p className="mt-3 text-sm text-white/40">Effective {effectiveDate}</p>
				<p className="mt-8 text-base leading-relaxed text-white/65">{intro}</p>
				<div className="mt-14 space-y-12">
					{sections.map((section) => (
						<section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
							<h2
								id={`${section.id}-heading`}
								className="text-xl font-semibold tracking-tight text-white"
							>
								{section.heading}
							</h2>
							<div className="mt-4 space-y-3 text-sm leading-relaxed text-white/60 [&_a]:text-orange-500 [&_a]:underline-offset-2 hover:[&_a]:underline">
								{section.body}
							</div>
						</section>
					))}
				</div>
			</div>
		</article>
	);
}
