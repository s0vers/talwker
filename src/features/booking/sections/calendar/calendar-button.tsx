"use client";

import { cn } from "@/lib/utils";
import { type AriaButtonProps, useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import type { CalendarState } from "@react-stately/calendar";
import { useRef } from "react";

export function Button(
	props: AriaButtonProps<"button"> & {
		state?: CalendarState;
		side?: "left" | "right";
	},
) {
	const ref = useRef<HTMLButtonElement>(null);
	const { buttonProps } = useButton(props, ref);
	const { focusProps, isFocusVisible } = useFocusRing();
	return (
		<button
			{...mergeProps(buttonProps, focusProps)}
			ref={ref}
			className={cn(
				"flex size-11 shrink-0 items-center justify-center rounded-lg text-white/90 outline-none",
				props.isDisabled
					? "text-white/30"
					: "hover:bg-white/10 active:bg-white/15",
				isFocusVisible && "ring-2 ring-white/80 ring-offset-2 ring-offset-[#0a0a0a]",
			)}
		>
			{props.children}
		</button>
	);
}
