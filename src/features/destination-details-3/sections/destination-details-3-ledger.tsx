import {
	destinationDetails3BodyClass,
	destinationDetails3KickerClass,
	destinationDetails3RuleClass,
	destinationDetails3SectionHeadingClass,
} from "@/features/destination-details-3/lib/destination-details-3-ui-classes";
import type { DestinationDetails3ViewModel } from "@/features/destination-details-3/lib/details-3-types";

export function DestinationDetails3Ledger({ model }: { model: DestinationDetails3ViewModel }) {
	const { ledger } = model;
	if (!ledger.length) return null;

	return (
		<section
			className="border-b border-white/10 bg-[#040404] py-16 md:py-24"
			aria-labelledby="destination-details-3-ledger-title"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<header className="mb-10 max-w-2xl md:mb-14" data-d3-reveal="left">
					<div className={destinationDetails3RuleClass} aria-hidden />
					<p className={"mt-6 " + destinationDetails3KickerClass}>Margin notes</p>
					<h2 id="destination-details-3-ledger-title" className={destinationDetails3SectionHeadingClass}>
						Reading the room
					</h2>
					<p className={"mt-4 " + destinationDetails3BodyClass}>
						Small etiquettes and social reads — editorial context, not a checklist for spending money.
					</p>
				</header>

				<ul
					className="list-none divide-y divide-white/10 rounded-sm border border-white/10 bg-black/25"
					data-d3-stagger="snap"
				>
					{ledger.map((row) => (
						<li
							key={row.label}
							className="grid gap-3 px-5 py-5 sm:grid-cols-[minmax(0,140px)_1fr] sm:gap-8 sm:px-6 sm:py-6"
							data-d3-item
						>
							<span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-500">
								{row.label}
							</span>
							<p className={destinationDetails3BodyClass}>{row.note}</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
