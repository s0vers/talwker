import {
	CONTACT_FORM_TOPIC_ITEMS,
	type ContactFormTopicValue
} from "@/features/contact/content/contact-page-copy";

export function parseContactDraft(
	params: Record<string, string | string[] | undefined>
): {
	message: string;
	topic: ContactFormTopicValue;
} {
	return {
		message:
			typeof params.message === "string" ? params.message.slice(0, 4000) : "",
		topic:
			CONTACT_FORM_TOPIC_ITEMS.find(item => item.value === params.topic)
				?.value ?? "editorial"
	};
}
