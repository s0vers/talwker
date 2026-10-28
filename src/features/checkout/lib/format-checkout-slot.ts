export function formatCheckoutSlot(
	slotIso: string,
	timeZone: string,
): { date: string; time: string } {
	const date = new Date(slotIso);
	if (Number.isNaN(date.getTime())) {
		return { date: slotIso, time: "" };
	}

	const options: Intl.DateTimeFormatOptions = timeZone
		? { timeZone }
		: {};

	return {
		date: date.toLocaleString(undefined, {
			...options,
			dateStyle: "full",
		}),
		time: date.toLocaleString(undefined, {
			...options,
			timeStyle: "short",
		}),
	};
}
