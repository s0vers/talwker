import type { Locale } from "./routing";

export const REGIONAL_CONFIG: Record<
	Locale,
	{ currency: string; timeZone: string }
> = {
	en: {
		currency: "USD",
		timeZone: "America/New_York",
	},
	es: {
		currency: "EUR",
		timeZone: "Europe/Madrid",
	},
	ja: {
		currency: "JPY",
		timeZone: "Asia/Tokyo",
	},
};

export function resolveCurrency(locale: string): string {
	return REGIONAL_CONFIG[locale as Locale]?.currency ?? "USD";
}

export function resolveTimeZone(locale: string): string {
	return REGIONAL_CONFIG[locale as Locale]?.timeZone ?? "America/New_York";
}
