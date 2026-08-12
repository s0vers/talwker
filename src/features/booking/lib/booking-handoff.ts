export const BOOKING_HANDOFF_KEY = "talkwer.booking.handoff.v1";

export type BookingHandoff = {
	tourSlug: string;
	tourTitle: string;
	slotIso: string;
	timeZone: string;
	guestName: string;
	guestEmail: string;
	guestPhone: string;
	notes: string;
	guestEmails: string[];
};

export function parseBookingHandoff(raw: string): BookingHandoff | null {
	try {
		const parsed = JSON.parse(raw) as BookingHandoff;
		if (!parsed.tourSlug || !parsed.slotIso || !parsed.guestEmail) return null;
		return parsed;
	} catch {
		return null;
	}
}

export function writeBookingHandoff(payload: BookingHandoff): void {
	sessionStorage.setItem(BOOKING_HANDOFF_KEY, JSON.stringify(payload));
}

export function readBookingHandoff(): BookingHandoff | null {
	if (typeof window === "undefined") return null;
	const raw = sessionStorage.getItem(BOOKING_HANDOFF_KEY);
	if (!raw) return null;
	return parseBookingHandoff(raw);
}

export function clearBookingHandoff(): void {
	sessionStorage.removeItem(BOOKING_HANDOFF_KEY);
}
