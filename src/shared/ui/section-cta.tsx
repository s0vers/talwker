import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const ctaClassName =
	"group inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70 transition-all duration-500 hover:border-orange-500 hover:bg-orange-500 hover:text-white";

type SectionCtaProps = {
	children: ReactNode;
	icon?: ReactNode;
	className?: string;
	href?: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
};

export function SectionCta({
	children,
	icon,
	className,
	href,
	onClick,
	type = "button",
}: SectionCtaProps) {
	if (href) {
		return (
			<Link href={href} className={cn(ctaClassName, className)}>
				{children}
				{icon}
			</Link>
		);
	}

	return (
		<button
			type={type}
			onClick={onClick}
			className={cn(ctaClassName, className)}
		>
			{children}
			{icon}
		</button>
	);
}

