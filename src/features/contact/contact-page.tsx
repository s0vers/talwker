"use client";

import { InitialLoader } from "@/features/home/sections";
import { useInitialPageLoader } from "@/lib/use-initial-page-loader";
import { ContactChannels, ContactForm, ContactHero } from "@/features/contact/sections";

export default function ContactPage() {
	const isLoading = useInitialPageLoader();

	return (
		<>
			<InitialLoader isLoading={isLoading} />
			<ContactHero runEntrance={!isLoading} />
			<ContactForm />
			<ContactChannels />
		</>
	);
}
