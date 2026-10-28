"use client";

import type { AriaButtonProps } from "@react-aria/button";
import { useDateFormatter } from "@react-aria/i18n";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import type { CalendarState } from "@react-stately/calendar";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { DOMAttributes } from "react";
import { Button } from "./calendar-button";

export function CalendarHeader({
	state,
	calendarProps,
	prevButtonProps,
	nextButtonProps,
}: {
	state: CalendarState;
	calendarProps: DOMAttributes<HTMLElement> & { "aria-label"?: string };
	prevButtonProps: AriaButtonProps<"button">;
	nextButtonProps: AriaButtonProps<"button">;
}) {
	const monthDateFormatter = useDateFormatter({
		month: "long",
		year: "numeric",
		timeZone: state.timeZone,
	});

	const monthLabel = monthDateFormatter.format(
		state.visibleRange.start.toDate(state.timeZone),
	);

	return (
		<div className="flex items-center pb-4">
			<VisuallyHidden>
				<h2>{calendarProps["aria-label"]}</h2>
			</VisuallyHidden>
			<h2
				aria-hidden
				className="align-center flex-1 text-md font-bold text-white"
			>
				{monthLabel}
			</h2>
			<Button {...prevButtonProps}>
				<ChevronLeftIcon className="size-4" />
			</Button>
			<Button {...nextButtonProps}>
				<ChevronRightIcon className="size-4" />
			</Button>
		</div>
	);
}
