"use client";

import { cn } from "@/lib/utils";
import {
	type CalendarDate,
	getLocalTimeZone,
	isSameMonth,
	isToday,
} from "@internationalized/date";
import { useCalendarCell } from "@react-aria/calendar";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import type { CalendarState } from "@react-stately/calendar";
import { useRef } from "react";

export function CalendarCell({
	state,
	date,
	currentMonth,
}: {
	state: CalendarState;
	date: CalendarDate;
	currentMonth: CalendarDate;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
		useCalendarCell({ date }, state, ref);

	const isOutsideMonth = !isSameMonth(currentMonth, date);
	const isDateToday = isToday(date, getLocalTimeZone());
	const { focusProps, isFocusVisible } = useFocusRing();

	return (
		<td
			{...cellProps}
			className={cn("relative px-0.5 py-0.5", isFocusVisible ? "z-10" : "z-0")}
		>
			<div
				{...mergeProps(buttonProps, focusProps)}
				ref={ref}
				hidden={isOutsideMonth}
				className="group size-14 rounded-md outline-none"
			>
				<div
					className={cn(
						"flex size-full items-center justify-center rounded-md",
						"text-sm font-semibold text-white/90",
						isDisabled
							? isDateToday
								? "cursor-default"
								: "cursor-default text-white/30"
							: "cursor-pointer bg-white/10",
						isFocusVisible &&
							"ring-1 ring-white/80 ring-offset-1 ring-offset-[#0a0a0a] group-focus:z-[2]",
						isSelected && "bg-orange-500 text-white",
						!isSelected && !isDisabled && "hover:ring-2 hover:ring-orange-500/70",
					)}
				>
					{formattedDate}
					{isDateToday && (
						<div
							className={cn(
								"absolute bottom-4 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-orange-500",
								isSelected && "bg-white",
							)}
						/>
					)}
				</div>
			</div>
		</td>
	);
}
