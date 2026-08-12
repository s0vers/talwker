import type { ReactNode } from "react";

export function FieldLabel({
	htmlFor,
	children,
}: {
	htmlFor: string;
	children: ReactNode;
}) {
	return (
		<label
			htmlFor={htmlFor}
			className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50"
		>
			{children}
		</label>
	);
}
