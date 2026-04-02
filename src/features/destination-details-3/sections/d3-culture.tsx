import { d3BodyClass, d3KickerClass, d3RuleClass } from "@/features/destination-details-3/lib/d3-ui-classes";
import type { DestinationDetails3ViewModel } from "@/features/destination-details-3/lib/details-3-types";

export function D3Culture({ model }: { model: DestinationDetails3ViewModel }) {
	const { culture } = model;

	return (
		<section className="border-b border-white/10 bg-[#040404] py-16 md:py-24" aria-labelledby="d3-culture-heading">
			<div className="mx-auto max-w-[1600px] pad-x">
				<header className="mb-12 max-w-xl" data-d3-reveal>
					<div className={d3RuleClass} aria-hidden />
					<p className={"mt-6 " + d3KickerClass}>Culture</p>
					<h2 id="d3-culture-heading" className="mt-4 text-2xl font-semibold md:text-3xl">
						What gets repeated without an audience
					</h2>
					<p className={"mt-4 " + d3BodyClass}>
						Threads of public life — not attractions, not packages. Editorial context only.
					</p>
				</header>

				<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3" data-d3-stagger>
					{culture.map((item) => (
						<article
							key={item.title}
							className="border-l border-white/10 pl-6"
							data-d3-item
						>
							<h3 className="text-lg font-semibold text-white">{item.title}</h3>
							<p className={"mt-3 " + d3BodyClass}>{item.body}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
