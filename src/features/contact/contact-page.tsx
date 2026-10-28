"use client";

import {
	ContactChannels,
	ContactForm,
	ContactHero
} from "@/features/contact/sections";
import type { ContactFormTopicValue } from "@/features/contact/content/contact-page-copy";

export default function ContactPage({
	initialMessage = "",
	initialTopic = "editorial"
}: {
	initialMessage?: string;
	initialTopic?: ContactFormTopicValue;
}) {
	return (
		<>
			<ContactHero runEntrance={true} />
			<ContactForm
				key={`${initialTopic}:${initialMessage}`}
				initialMessage={initialMessage}
				initialTopic={initialTopic}
			/>
			<ContactChannels />
		</>
	);
}
