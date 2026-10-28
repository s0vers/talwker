"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { slotIsoFromAvailableTime } from "@/features/booking/lib/parse-available-time";
import { Calendar } from "@/features/booking/sections/calendar";
import type { Tour } from "@/shared/types/domain";
import { getWeeksInMonth, parseDate, today } from "@internationalized/date";
import type { DateValue } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { timeZones } from "@/features/booking/content/time-zones";
import * as React from "react";
import { FormPanel } from "./form-panel";
import { LeftPanel } from "./left-panel";
import { RightPanel } from "./right-panel";

export type BookingSchedulerProps = {
	tour: Tour;
};

export function BookingScheduler({ tour }: BookingSchedulerProps) {
	const router = useRouter();
	const pathname = usePathname();
	const { locale } = useLocale();
	const searchParams = useSearchParams();

	const dateParam = searchParams?.get("date") ?? null;
	const slotParam = searchParams?.get("slot") ?? null;
	const zoneParam = searchParams?.get("timeZone") ?? null;
	const timeZone =
		timeZones.find(zone => zone.tzCode === zoneParam)?.tzCode ??
		"America/New_York";
	const slotIso =
		slotParam && Number.isFinite(Date.parse(slotParam))
			? new Date(slotParam).toISOString()
			: null;

	const initialDate = React.useMemo(() => {
		if (dateParam) {
			try {
				return parseDate(dateParam);
			} catch {
				return today(timeZone);
			}
		}
		return today(timeZone);
	}, [dateParam, timeZone]);

	const date = initialDate;
	const [focus, setFocus] = React.useState({
		selectedDate: date.toString(),
		date
	});
	const focusedDate =
		focus.selectedDate === date.toString() ? focus.date : date;
	const weeksInMonth = getWeeksInMonth(focusedDate, locale);

	const pushSearch = (url: URL) => {
		router.push(`${pathname}${url.search}`);
	};

	const handleChangeTimeZone = (nextTimeZone: string) => {
		const url = new URL(window.location.href);
		url.searchParams.set("timeZone", nextTimeZone);
		pushSearch(url);
	};

	const handleChangeDate = (next: DateValue) => {
		const url = new URL(window.location.href);
		url.searchParams.set("date", next.toString());
		url.searchParams.delete("slot");
		pushSearch(url);
	};

	const handleChangeAvailableTime = (time: string) => {
		const slotIso = slotIsoFromAvailableTime(date, time, timeZone);
		if (!slotIso) return;

		const url = new URL(window.location.href);
		if (!url.searchParams.get("date")) {
			url.searchParams.set("date", date.toString());
		}
		url.searchParams.set("slot", slotIso);
		url.searchParams.set("timeZone", timeZone);
		pushSearch(url);
	};

	const handleBack = () => {
		const url = new URL(window.location.href);
		url.searchParams.delete("slot");
		pushSearch(url);
	};

	const showForm = !!dateParam && slotIso !== null;

	return (
		<TooltipProvider delayDuration={200}>
			<div className="relative mx-auto w-full max-w-max px-0 py-8 text-white sm:px-8">
				<div
					className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-orange-500/5 blur-[120px]"
					aria-hidden="true"
				/>
				<div className="flex min-w-0 flex-col gap-6 xl:flex-row">
					<LeftPanel
						showForm={showForm}
						slotIso={slotIso}
						timeZone={timeZone}
						setTimeZone={handleChangeTimeZone}
						tour={tour}
					/>
					{!showForm ? (
						<>
							<Calendar
								minValue={today(timeZone)}
								value={date}
								onChange={handleChangeDate}
								onFocusChange={focused =>
									setFocus({ selectedDate: date.toString(), date: focused })
								}
							/>
							<RightPanel
								date={date}
								timeZone={timeZone}
								weeksInMonth={weeksInMonth}
								handleChangeAvailableTime={handleChangeAvailableTime}
							/>
						</>
					) : (
						<FormPanel
							tour={tour}
							slotIso={slotIso}
							timeZone={timeZone}
							onBack={handleBack}
						/>
					)}
				</div>
			</div>
		</TooltipProvider>
	);
}
