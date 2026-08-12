import type { CalendarDate } from "@internationalized/date";
import { buildSlotIso } from "@/features/booking/lib/build-slot-iso";

/** Parse slot labels like `09:00am` / `13:00` into hours + minutes. */
export function parseAvailableTimeLabel(
	time: string,
): { hours: number; minutes: number } | null {
	const timeValue = time.split(":").join(" ");
	const match = timeValue.match(/^(\d{1,2}) (\d{2})([ap]m)?$/i);
	if (!match) return null;

	let hours = Number.parseInt(match[1], 10);
	const minutes = Number.parseInt(match[2], 10);
	const meridiem = match[3]?.toLowerCase();

	if (meridiem) {
		if (hours < 1 || hours > 12) return null;
		if (meridiem === "pm" && hours !== 12) hours += 12;
		if (meridiem === "am" && hours === 12) hours = 0;
	} else if (hours < 0 || hours > 23) {
		return null;
	}

	if (minutes < 0 || minutes > 59) return null;
	return { hours, minutes };
}

export function slotIsoFromAvailableTime(
	date: CalendarDate,
	timeLabel: string,
	timeZone: string,
): string | null {
	const parsed = parseAvailableTimeLabel(timeLabel);
	if (!parsed) return null;
	return buildSlotIso(date, parsed.hours, parsed.minutes, timeZone);
}
