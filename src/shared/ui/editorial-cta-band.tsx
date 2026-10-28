import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { ButtonWithIcon } from "./button-with-icon";
import { EditorialCtaFrame } from "./editorial-cta-frame";

const secondaryClassName =
	"rounded-full border border-white/10 px-10 py-4 text-[13px] font-semibold uppercase tracking-widest text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white";

export type EditorialCtaBandAction = {
	label: string;
	href?: string;
	onClick?: () => void;
};

export type EditorialCtaBandProps = {
	label: string;
	titleLead: string;
	titleAccent: string;
	description: string;
	primary: EditorialCtaBandAction;
	secondary?: EditorialCtaBandAction;
	/** Section `id` (e.g. `contact` for in-page anchors). */
	id?: string;
	/** Sets `aria-labelledby` on the section and `id` on the `<h2>`. */
	headingId?: string;
	/** Top rule + orange hairline (destinations, about, destination details). */
	showTopFrame?: boolean;
};

function CtaControl({
	action,
	variant
}: {
	action: EditorialCtaBandAction;
	variant: "primary" | "secondary";
}) {
	if (variant === "primary") {
		return (
			<ButtonWithIcon
				href={action.href}
				onClick={action.onClick}
				variant="orange"
				size="lg"
				className="shadow-2xl shadow-orange-500/25"
			>
				{action.label}
			</ButtonWithIcon>
		);
	}

	if (action.href) {
		return (
			<Link
				href={action.href}
				className={secondaryClassName}
				onClick={action.onClick}
			>
				{action.label}
			</Link>
		);
	}

	return (
		<button
			type="button"
			className={secondaryClassName}
			onClick={action.onClick}
		>
			{action.label}
		</button>
	);
}

export function EditorialCtaBand({
	label,
	titleLead,
	titleAccent,
	description,
	primary,
	secondary,
	id,
	headingId,
	showTopFrame = false
}: EditorialCtaBandProps) {
	return (
		<EditorialCtaFrame
			id={id}
			headingId={headingId}
			className={cn(
				"relative overflow-hidden bg-[#060606] py-32 md:py-44",
				showTopFrame && "border-t border-white/6"
			)}
		>
			{/* Ambient atmosphere glow */}
			<div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[140px]" />

			<div
				className="absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
					backgroundSize: "30px 30px"
				}}
			/>
			{showTopFrame ? (
				<div
					className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-orange-500/25 to-transparent"
					aria-hidden
				/>
			) : null}

			<div
				data-editorial-cta-head
				className="pad-x relative mx-auto max-w-[1600px] text-center"
			>
				<span className="mb-6 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-xs font-semibold tracking-[0.25em] text-orange-400 uppercase">
					{label}
				</span>
				<h2
					{...(headingId ? { id: headingId } : {})}
					className="mx-auto max-w-4xl text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] font-extrabold tracking-tight text-white"
				>
					{titleLead}{" "}
					<span className="font-light text-orange-500 italic">
						{titleAccent}
					</span>
				</h2>
				<p className="mx-auto mt-8 max-w-lg text-base text-white/50">
					{description}
				</p>
				<div
					className={cn(
						"mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center",
						!secondary && "sm:flex-col"
					)}
				>
					<CtaControl action={primary} variant="primary" />
					{secondary ? (
						<CtaControl action={secondary} variant="secondary" />
					) : null}
				</div>
			</div>
		</EditorialCtaFrame>
	);
}
