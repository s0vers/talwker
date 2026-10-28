import { CONTACT_CHANNELS_COPY } from "@/features/contact/content/contact-page-copy";

const { channels } = CONTACT_CHANNELS_COPY;

export function inboxForFormTopic(topic: string): { email: string; subject: string } {
	switch (topic) {
		case "editorial":
			return { email: channels[0].email, subject: channels[0].mailtoSubject };
		case "partnerships":
			return { email: channels[1].email, subject: channels[1].mailtoSubject };
		case "support":
			return { email: channels[2].email, subject: channels[2].mailtoSubject };
		default:
			return { email: channels[2].email, subject: "Talkwer — general inquiry" };
	}
}

export function buildContactMailtoHref(input: {
	to: string;
	subject: string;
	name: string;
	fromEmail: string;
	topicLabel: string;
	message: string;
}): string {
	const body = [
		input.message.trim(),
		"",
		"—",
		`Name: ${input.name.trim()}`,
		`Email: ${input.fromEmail.trim()}`,
		`Topic: ${input.topicLabel}`,
	].join("\n");

	const subject = encodeURIComponent(input.subject);
	const bodyEnc = encodeURIComponent(body);
	return `mailto:${input.to}?subject=${subject}&body=${bodyEnc}`;
}
