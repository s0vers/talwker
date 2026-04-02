import { d3BodyClass, d3KickerClass, d3RuleClass } from "@/features/destination-details-3/lib/d3-ui-classes";
import type { DestinationDetails3ViewModel } from "@/features/destination-details-3/lib/details-3-types";

export function D3Close({ model }: { model: DestinationDetails3ViewModel }) {
	const { close } = model;

	return (
		<section className="bg-[#040404] py-16 text-white md:py-24" aria-labelledby="d3-close-heading">
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="mx-auto max-w-2xl text-center" data-d3-reveal>
					<div className={d3RuleClass + " mx-auto"} aria-hidden />
					{close.kicker ? <p className={"mt-8 " + d3KickerClass}>{close.kicker}</p> : null}
					<h2 id="d3-close-heading" className="mt-4 text-2xl font-semibold md:text-3xl">
						{close.title}
					</h2>
					<p className={"mt-6 " + d3BodyClass}>{close.body}</p>
				</div>
			</div>
		</section>
	);
}
