import { getRequestConfig } from "next-intl/server";
import { resolveCurrency, resolveTimeZone } from "./regional";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale;

	if (!locale || !routing.locales.includes(locale as any)) {
		locale = routing.defaultLocale;
	}

	return {
		locale,
		timeZone: resolveTimeZone(locale),
		now: new Date(),
		messages: (await import(`../../dictionary/${locale}.json`)).default,
	};
});
