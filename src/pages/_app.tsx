import type { AppProps } from "next/app";
import { NextIntlClientProvider } from "next-intl";
import { useEffect } from "react";
import type { HomePageProps } from "@/features/home/home-page";
import { routing } from "@/i18n/routing";
import "@/app/shell.css";

export default function App({ Component, pageProps }: AppProps<HomePageProps>) {
	const locale = pageProps.locale ?? routing.defaultLocale;
	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);
	return (
		<NextIntlClientProvider locale={locale} messages={null}>
			<Component {...pageProps} />
		</NextIntlClientProvider>
	);
}
