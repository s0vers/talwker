/** Currency display for tour catalog + trip sheet surfaces. */
export function formatTourPrice(price: number): string {
	return `$${price.toLocaleString("en-US")}`;
}
