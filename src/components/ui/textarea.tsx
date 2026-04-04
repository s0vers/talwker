import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
	HTMLTextAreaElement,
	React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
	<textarea
		ref={ref}
		data-slot="textarea"
		className={cn(
			"flex min-h-36 w-full min-w-0 rounded-2xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm transition-[color,box-shadow]",
			"placeholder:text-muted-foreground",
			"focus-visible:border-orange-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/25",
			"disabled:cursor-not-allowed disabled:opacity-50",
			"resize-y",
			className,
		)}
		{...props}
	/>
));
Textarea.displayName = "Textarea";

export { Textarea };
