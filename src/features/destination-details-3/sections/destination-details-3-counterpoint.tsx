import {
	destinationDetails3BodyClass,
	destinationDetails3KickerClass,
	destinationDetails3RuleClass,
	destinationDetails3SectionHeadingClass,
} from "@/features/destination-details-3/lib/destination-details-3-ui-classes";
import type { DestinationDetails3ViewModel } from "@/features/destination-details-3/lib/details-3-types";

export function DestinationDetails3Counterpoint({ model }: { model: DestinationDetails3ViewModel }) {
	const { counterpoint } = model;

	return (
		<section
			className="border-b border-white/10 bg-[#050505] py-16 md:py-24"
			aria-labelledby="destination-details-3-counterpoint-title"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<header className="mb-12 max-w-3xl md:mb-16" data-d3-reveal="fade">
					<div className={destinationDetails3RuleClass} aria-hidden />
					<p className={"mt-6 " + destinationDetails3KickerClass}>{counterpoint.kicker}</p>
					<h2 id="destination-details-3-counterpoint-title" className={destinationDetails3SectionHeadingClass}>
						{counterpoint.headline}
					</h2>
				</header>

				<div className="grid gap-12 md:gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20" data-d3-stagger="split">
					<article className="border-l-2 border-orange-500/40 pl-8 md:pl-10" data-d3-item>
						<h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{counterpoint.sideA.title}</h3>
						<p className={"mt-5 max-w-prose " + destinationDetails3BodyClass}>{counterpoint.sideA.body}</p>
					</article>
					<article className="border-l border-white/12 pl-8 md:pl-10" data-d3-item>
						<h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{counterpoint.sideB.title}</h3>
						<p className={"mt-5 max-w-prose " + destinationDetails3BodyClass}>{counterpoint.sideB.body}</p>
					</article>
				</div>
			</div>
		</section>
	);
}
