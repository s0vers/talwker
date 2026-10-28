export function getBookingHref(tourSlug: string): string {
	return `/booking?tour=${encodeURIComponent(tourSlug)}`;
}
