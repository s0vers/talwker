import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PillBadgeProps = {
	children: ReactNode;
	className?: string;
};

export function PillBadge({ children, className }: PillBadgeProps) {
	return (
		<span
			className={cn(
				"rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/55",
				className,
			)}
		>
			{children}
		</span>
	);
}

