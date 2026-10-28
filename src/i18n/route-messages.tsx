import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

type RouteMessagesProps = {
	children: ReactNode;
	namespaces?: readonly string[];
};

export async function RouteMessages({
	children,
	namespaces
}: RouteMessagesProps) {
	const messages = await getMessages();
	let routeMessages = messages;

	if (namespaces) {
		routeMessages = {};
		for (const namespace of new Set(["Common", ...namespaces])) {
			if (!Object.hasOwn(messages, namespace)) {
				throw new Error(`Missing route translation namespace: ${namespace}`);
			}
			routeMessages[namespace] = messages[namespace];
		}
	}

	return (
		<NextIntlClientProvider messages={routeMessages}>
			{children}
		</NextIntlClientProvider>
	);
}
