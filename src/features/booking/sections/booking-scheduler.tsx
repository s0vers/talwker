"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { slotIsoFromAvailableTime } from "@/features/booking/lib/parse-available-time";
import { Calendar } from "@/features/booking/sections/calendar";
import type { Tour } from "@/shared/types/domain";
import {
	type CalendarDate,
	getLocalTimeZone,
	getWeeksInMonth,
	parseDate,
	today,
} from "@internationalized/date";
import type { DateValue } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { FormPanel } from "./form-panel";
import { LeftPanel } from "./left-panel";
import { RightPanel } from "./right-panel";

export type BookingSchedulerProps = {
	tour: Tour;
};

function pushSearch(router: ReturnType<typeof useRouter>, url: URL) {
	router.push(`${url.pathname}${url.search}`);
}

export function BookingScheduler({ tour }: BookingSchedulerProps) {
	const router = useRouter();
	const { locale } = useLocale();
	const searchParams = useSearchParams();

	const dateParam = searchParams.get("date");
	const slotParam = searchParams.get("slot");

	const initialDate = React.useMemo(() => {
		if (dateParam) {
			try {
				return parseDate(dateParam);
			} catch {
				return today(getLocalTimeZone());
			}
		}
		return today(getLocalTimeZone());
	}, [dateParam]);

	const [timeZone, setTimeZone] = React.useState("America/New_York");
	const [date, setDate] = React.useState<CalendarDate>(initialDate);
	const [focusedDate, setFocusedDate] = React.useState<CalendarDate | null>(
		initialDate,
	);

	React.useEffect(() => {
		setDate(initialDate);
		setFocusedDate(initialDate);
	}, [initialDate]);

	const weeksInMonth = getWeeksInMonth(focusedDate as DateValue, locale);

	const handleChangeDate = (next: DateValue) => {
		setDate(next as CalendarDate);
		const url = new URL(window.location.href);
		url.searchParams.set("date", next.toString());
		url.searchParams.delete("slot");
		pushSearch(router, url);
	};

	const handleChangeAvailableTime = (time: string) => {
		const slotIso = slotIsoFromAvailableTime(date, time, timeZone);
		if (!slotIso) return;

		const url = new URL(window.location.href);
		if (!url.searchParams.get("date")) {
			url.searchParams.set("date", date.toString());
		}
		url.searchParams.set("slot", slotIso);
		pushSearch(router, url);
	};

	const handleBack = () => {
		const url = new URL(window.location.href);
		url.searchParams.delete("slot");
		pushSearch(router, url);
	};

	const showForm = !!dateParam && !!slotParam;

	return (
		<TooltipProvider delayDuration={200}>
			<div className="mx-auto w-full max-w-max rounded-md border border-white/[0.06] bg-[#0a0a0a] px-8 py-6 text-white">
				<div className="flex gap-6">
					<LeftPanel
						showForm={showForm}
						timeZone={timeZone}
						setTimeZone={setTimeZone}
						tour={tour}
					/>
					{!showForm ? (
						<>
							<Calendar
								minValue={today(getLocalTimeZone())}
								defaultValue={today(getLocalTimeZone())}
								value={date}
								onChange={handleChangeDate}
								onFocusChange={(focused) => setFocusedDate(focused)}
							/>
							<RightPanel
								date={date}
								timeZone={timeZone}
								weeksInMonth={weeksInMonth}
								handleChangeAvailableTime={handleChangeAvailableTime}
							/>
						</>
					) : (
						<FormPanel tour={tour} timeZone={timeZone} onBack={handleBack} />
					)}
				</div>
			</div>
		</TooltipProvider>
	);
}
