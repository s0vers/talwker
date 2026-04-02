import { d3BodyClass, d3KickerClass, d3RuleClass } from "@/features/destination-details-3/lib/d3-ui-classes";
import type { DestinationDetails3ViewModel } from "@/features/destination-details-3/lib/details-3-types";

export function D3Ledger({ model }: { model: DestinationDetails3ViewModel }) {
	const { ledger } = model;
	if (!ledger.length) return null;

	return (
		<section className="border-b border-white/10 bg-[#040404] py-16 md:py-24" aria-labelledby="d3-ledger-heading">
			<div className="mx-auto max-w-[1600px] pad-x">
				<header className="mb-10 max-w-2xl md:mb-14" data-d3-reveal>
					<div className={d3RuleClass} aria-hidden />
					<p className={"mt-6 " + d3KickerClass}>Margin notes</p>
					<h2 id="d3-ledger-heading" className="mt-4 text-2xl font-semibold text-white md:text-3xl">
						Reading the room
					</h2>
					<p className={"mt-4 " + d3BodyClass}>
						Small etiquettes and social reads — editorial context, not a checklist for spending money.
					</p>
				</header>

				<ul
					className="list-none divide-y divide-white/10 border border-white/10 rounded-sm bg-black/25"
					data-d3-stagger
				>
					{ledger.map((row) => (
						<li
							key={row.label}
							className="grid gap-3 px-5 py-5 sm:grid-cols-[minmax(0,140px)_1fr] sm:gap-8 sm:px-6 sm:py-6"
							data-d3-item
						>
							<span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-400/90">
								{row.label}
							</span>
							<p className={d3BodyClass}>{row.note}</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
