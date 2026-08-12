import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
	({ className, type, ...props }, ref) => (
		<input
			ref={ref}
			type={type}
			data-slot="input"
			className={cn(
				"flex h-12 w-full min-w-0 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white shadow-sm transition-[color,box-shadow,background-color]",
				"placeholder:text-white/35",
				"focus-visible:border-orange-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/25",
				"disabled:cursor-not-allowed disabled:opacity-50",
				"file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
				className,
			)}
			{...props}
		/>
	),
);
Input.displayName = "Input";

export { Input };
