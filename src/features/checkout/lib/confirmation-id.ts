import type { BookingHandoff } from "@/features/booking/lib/booking-handoff";

export const BOOKING_CONFIRMATION_KEY = "talkwer.booking.confirmation.v1";

export type BookingConfirmation = BookingHandoff & {
	id: string;
};

export function createConfirmationId(): string {
	return `TW-${Date.now().toString(36).toUpperCase()}`;
}

export function parseBookingConfirmation(
	raw: string,
): BookingConfirmation | null {
	try {
		const parsed = JSON.parse(raw) as BookingConfirmation;
		if (!parsed.id || !parsed.tourSlug || !parsed.slotIso || !parsed.guestEmail) {
			return null;
		}
		return parsed;
	} catch {
		return null;
	}
}

export function writeBookingConfirmation(payload: BookingConfirmation): void {
	sessionStorage.setItem(BOOKING_CONFIRMATION_KEY, JSON.stringify(payload));
}

export function readBookingConfirmation(): BookingConfirmation | null {
	if (typeof window === "undefined") return null;
	const raw = sessionStorage.getItem(BOOKING_CONFIRMATION_KEY);
	if (!raw) return null;
	return parseBookingConfirmation(raw);
}

export function clearBookingConfirmation(): void {
	sessionStorage.removeItem(BOOKING_CONFIRMATION_KEY);
}
