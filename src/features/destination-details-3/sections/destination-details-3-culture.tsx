import {
	destinationDetails3BodyClass,
	destinationDetails3KickerClass,
	destinationDetails3RuleClass,
	destinationDetails3SectionHeadingClass,
} from "@/features/destination-details-3/lib/destination-details-3-ui-classes";
import type { DestinationDetails3ViewModel } from "@/features/destination-details-3/lib/details-3-types";

export function DestinationDetails3Culture({ model }: { model: DestinationDetails3ViewModel }) {
	const { culture } = model;

	return (
		<section
			className="border-b border-white/10 bg-[#040404] py-16 md:py-24"
			aria-labelledby="destination-details-3-culture-title"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<header className="mb-12 max-w-xl" data-d3-reveal="fade">
					<div className={destinationDetails3RuleClass} aria-hidden />
					<p className={"mt-6 " + destinationDetails3KickerClass}>Culture</p>
					<h2 id="destination-details-3-culture-title" className={destinationDetails3SectionHeadingClass}>
						What gets repeated without an audience
					</h2>
					<p className={"mt-4 " + destinationDetails3BodyClass}>
						Threads of public life — not attractions, not packages. Editorial context only.
					</p>
				</header>

				<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3" data-d3-stagger="drift">
					{culture.map((item) => (
						<article key={item.title} className="border-l border-white/10 pl-6" data-d3-item>
							<h3 className="text-lg font-semibold tracking-tight text-white">{item.title}</h3>
							<p className={"mt-3 " + destinationDetails3BodyClass}>{item.body}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
