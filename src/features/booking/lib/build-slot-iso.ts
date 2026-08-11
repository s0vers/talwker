import {
	type CalendarDate,
	Time,
	toCalendarDateTime,
	toZoned,
} from "@internationalized/date";

/** Wall-clock hours/minutes in `timeZone` → UTC ISO for the `slot` query. */
export function buildSlotIso(
	date: CalendarDate,
	hours: number,
	minutes: number,
	timeZone: string,
): string {
	const dateTime = toCalendarDateTime(date, new Time(hours, minutes));
	return toZoned(dateTime, timeZone).toAbsoluteString();
}
