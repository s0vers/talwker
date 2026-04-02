import { d3BodyClass, d3KickerClass, d3RuleClass } from "@/features/destination-details-3/lib/d3-ui-classes";
import type { DestinationDetails3ViewModel } from "@/features/destination-details-3/lib/details-3-types";

export function D3FieldNotes({ model }: { model: DestinationDetails3ViewModel }) {
	const { fieldNotes } = model;
	if (!fieldNotes || fieldNotes.length === 0) return null;

	return (
		<section className="border-b border-white/10 bg-[#030303] py-14 md:py-20" aria-labelledby="d3-field-heading">
			<div className="mx-auto max-w-[1600px] pad-x">
				<header className="mb-10" data-d3-reveal>
					<div className={d3RuleClass} aria-hidden />
					<p className={"mt-6 " + d3KickerClass}>Field notes</p>
					<h2 id="d3-field-heading" className="mt-3 text-xl font-semibold text-white md:text-2xl">
						Context, not checkout
					</h2>
				</header>
				<dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" data-d3-stagger>
					{fieldNotes.map((note) => (
						<div key={note.label} className="border-l border-orange-500/20 pl-5" data-d3-item>
							<dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-400/85">
								{note.label}
							</dt>
							<dd className={"mt-2 " + d3BodyClass}>{note.value}</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
