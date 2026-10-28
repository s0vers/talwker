import Document, { Html, Head, Main, NextScript } from "next/document";
import { routing } from "@/i18n/routing";

export default class HomeDocument extends Document {
	render() {
		const candidate: unknown = this.props.__NEXT_DATA__.props.pageProps?.locale;
		const locale =
			typeof candidate === "string" &&
			routing.locales.some(value => value === candidate)
				? candidate
				: routing.defaultLocale;
		return (
			<Html lang={locale} dir="ltr" data-scroll-behavior="smooth">
				<Head>
					<link
						rel="preload"
						href="/fonts/inter-latin-core.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
