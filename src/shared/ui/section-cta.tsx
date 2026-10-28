import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

const ctaClassName =
	"group inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70 transition-all duration-500 hover:border-orange-500 hover:bg-orange-500 hover:text-[#050505]";

type SectionCtaProps = {
	children: ReactNode;
	icon?: ReactNode;
	href: string;
};

export function SectionCta({ children, icon, href }: SectionCtaProps) {
	return (
		<Link href={href} className={ctaClassName}>
			{children}
			{icon}
		</Link>
	);
}
