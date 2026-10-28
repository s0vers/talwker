import { cn } from "@/lib/utils";

type SectionHeadingProps = {
	label: string;
	title: string;
	description?: string;
	labelId?: string;
	titleId?: string;
	descriptionId?: string;
	labelClassName?: string;
	descriptionClassName?: string;
	containerClassName?: string;
};

export function SectionHeading({
	label,
	title,
	description,
	labelId,
	titleId,
	descriptionId,
	labelClassName,
	descriptionClassName,
	containerClassName,
}: SectionHeadingProps) {
	return (
		<div className={containerClassName}>
			<p
				id={labelId}
				className={cn(
					"mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500",
					labelClassName,
				)}
			>
				{label}
			</p>
			<h2
				id={titleId}
				className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-tighter text-white"
			>
				{title}
				<span className="font-light italic text-orange-500">.</span>
			</h2>
			{description ? (
				<p
					id={descriptionId}
					className={cn(
						"mt-6 max-w-xl text-sm leading-relaxed text-white/55 md:text-base",
						descriptionClassName,
					)}
				>
					{description}
				</p>
			) : null}
		</div>
	);
}

