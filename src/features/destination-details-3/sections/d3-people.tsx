import { d3BodyClass, d3KickerClass, d3RuleClass } from "@/features/destination-details-3/lib/d3-ui-classes";
import type { DestinationDetails3ViewModel } from "@/features/destination-details-3/lib/details-3-types";

export function D3People({ model }: { model: DestinationDetails3ViewModel }) {
	const { people } = model;

	return (
		<section className="border-b border-white/10 bg-[#050505] py-16 text-white md:py-24" aria-labelledby="d3-people-heading">
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-20">
					<div data-d3-reveal>
						<div className={d3RuleClass} aria-hidden />
						{people.kicker ? <p className={"mt-6 " + d3KickerClass}>{people.kicker}</p> : null}
						<h2 id="d3-people-heading" className="mt-4 text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
							{people.title}
						</h2>
						<p className={"mt-6 max-w-2xl " + d3BodyClass}>{people.body}</p>
					</div>
					{people.pullQuote ? (
						<blockquote
							className="border-l-2 border-orange-500/45 pl-6 text-lg italic leading-relaxed text-white/88 md:text-xl"
							data-d3-reveal
						>
							{people.pullQuote}
						</blockquote>
					) : null}
				</div>
			</div>
		</section>
	);
}
