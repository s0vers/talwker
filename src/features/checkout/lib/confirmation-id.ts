import type { BookingHandoff } from "@/features/booking/lib/booking-handoff";
import { isBookingHandoff } from "@/features/booking/lib/booking-handoff";

export const BOOKING_CONFIRMATION_KEY = "talkwer.booking.confirmation.v1";

export type BookingConfirmation = BookingHandoff & {
	id: string;
};

export function createConfirmationId(): string {
	return `TW-${Date.now().toString(36).toUpperCase()}`;
}

export function parseBookingConfirmation(
	raw: string
): BookingConfirmation | null {
	try {
		const parsed: unknown = JSON.parse(raw);
		if (
			!isBookingHandoff(parsed) ||
			!("id" in parsed) ||
			typeof parsed.id !== "string" ||
			!parsed.id
		)
			return null;
		return { ...parsed, id: parsed.id };
	} catch {
		return null;
	}
}

export function writeBookingConfirmation(payload: BookingConfirmation): void {
	sessionStorage.setItem(BOOKING_CONFIRMATION_KEY, JSON.stringify(payload));
}
