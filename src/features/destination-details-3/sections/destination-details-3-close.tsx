import {
	destinationDetails3BodyClass,
	destinationDetails3KickerClass,
	destinationDetails3RuleClass,
} from "@/features/destination-details-3/lib/destination-details-3-ui-classes";
import type { DestinationDetails3ViewModel } from "@/features/destination-details-3/lib/details-3-types";

export function DestinationDetails3Close({ model }: { model: DestinationDetails3ViewModel }) {
	const { close } = model;

	return (
		<section
			className="bg-[#040404] py-16 text-white md:py-24"
			aria-labelledby="destination-details-3-close-title"
		>
			<div className="mx-auto max-w-[1600px] pad-x">
				<div className="mx-auto max-w-2xl text-center" data-d3-reveal="rise">
					<div className={destinationDetails3RuleClass + " mx-auto"} aria-hidden />
					{close.kicker ? (
						<p className={"mt-8 " + destinationDetails3KickerClass}>{close.kicker}</p>
					) : null}
					<h2
						id="destination-details-3-close-title"
						className={
							(close.kicker ? "mt-4 " : "mt-6 ") +
							"text-2xl font-semibold tracking-tight text-white md:text-3xl lg:text-4xl"
						}
					>
						{close.title}
					</h2>
					<p className={"mt-6 " + destinationDetails3BodyClass}>{close.body}</p>
				</div>
			</div>
		</section>
	);
}
