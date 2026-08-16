import { getRequestConfig } from "next-intl/server";
import { resolveTimeZone } from "./regional";
import { type Locale, routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale;

	if (!locale || !routing.locales.includes(locale as Locale)) {
		locale = routing.defaultLocale;
	}

	return {
		locale,
		timeZone: resolveTimeZone(locale),
		now: new Date(),
		messages: (await import(`../../dictionary/${locale}.json`)).default,
	};
});
