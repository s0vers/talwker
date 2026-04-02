import { d3BodyClass, d3KickerClass, d3RuleClass } from "@/features/destination-details-3/lib/d3-ui-classes";
import type { DestinationDetails3ViewModel } from "@/features/destination-details-3/lib/details-3-types";

export function D3FieldNotes({ model }: { model: DestinationDetails3ViewModel }) {
	const { fieldNotes } = model;
	if (!fieldNotes || fieldNotes.length === 0) return null;

	return (
		<section className="border-b border-white/10 bg-[#030303] py-16 md:py-24" aria-labelledby="d3-field-heading">
			<div className="mx-auto max-w-[1600px] pad-x">
				<header className="mb-12 max-w-2xl md:mb-14" data-d3-reveal>
					<div className={d3RuleClass} aria-hidden />
					<p className={"mt-6 " + d3KickerClass}>Field notes</p>
					<h2 id="d3-field-heading" className="mt-4 text-2xl font-semibold text-white md:text-3xl lg:text-4xl">
						Context, not checkout
					</h2>
				</header>

				<dl className="max-w-3xl space-y-10 md:space-y-12" data-d3-stagger>
					{fieldNotes.map((note) => (
						<div key={note.label} className="grid gap-3 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-x-10 sm:gap-y-0" data-d3-item>
							<dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-400/90 sm:pt-1">
								{note.label}
							</dt>
							<dd className={"m-0 min-w-0 " + d3BodyClass}>{note.value}</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
