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

export function isBookingHandoff(value: unknown): value is BookingHandoff {
	if (!value || typeof value !== "object") return false;
	// JSON properties remain unknown until validated below.
	const record = value as Record<string, unknown>;
	if (typeof record.slotIso !== "string" || typeof record.timeZone !== "string")
		return false;
	const fields = [
		"tourSlug",
		"tourTitle",
		"guestName",
		"guestEmail",
		"guestPhone",
		"notes"
	];
	if (!fields.every(field => typeof record[field] === "string")) return false;
	if (!record.tourSlug || !record.tourTitle || !record.guestEmail) return false;
	if (
		!Array.isArray(record.guestEmails) ||
		!record.guestEmails.every(email => typeof email === "string")
	)
		return false;
	if (Number.isNaN(Date.parse(record.slotIso))) return false;
	try {
		new Intl.DateTimeFormat("en", { timeZone: record.timeZone });
		return true;
	} catch {
		return false;
	}
}

export function parseBookingHandoff(raw: string): BookingHandoff | null {
	try {
		const parsed: unknown = JSON.parse(raw);
		return isBookingHandoff(parsed) ? parsed : null;
	} catch {
		return null;
	}
}

export function writeBookingHandoff(payload: BookingHandoff): void {
	sessionStorage.setItem(BOOKING_HANDOFF_KEY, JSON.stringify(payload));
}

export function readBookingHandoff(): BookingHandoff | null {
	if (typeof window === "undefined") return null;
	try {
		const raw = sessionStorage.getItem(BOOKING_HANDOFF_KEY);
		return raw ? parseBookingHandoff(raw) : null;
	} catch {
		return null;
	}
}

export function clearBookingHandoff(): void {
	sessionStorage.removeItem(BOOKING_HANDOFF_KEY);
}
