export const PRIVACY_COPY = {
	eyebrow: "Legal",
	title: "Privacy Policy",
	effectiveDate: "August 8, 2026",
	intro:
		"Talkwer respects the information you share when you browse this magazine or reach out through Contact. This page describes what we collect, why we use it, and how cookies fit in. It is brand guidance for our static site, not formal legal advice.",
	sections: [
		{
			id: "collect",
			heading: "What we collect",
			body: "When you use the Contact form, we receive the fields you submit — typically your name, email address, and message. We may also receive technical data such as browser type and approximate location inferred from network requests as the site is served. We do not ask for payment card numbers on this static magazine site.",
		},
		{
			id: "use",
			heading: "How we use information",
			body: "Contact submissions are used to reply to your questions about trips, partnerships, press, or editorial feedback. Technical logs help us keep the site reliable and understand which pages readers visit. We do not sell personal information to third parties.",
		},
		{
			id: "cookies",
			heading: "Cookies and similar tech",
			body: "Talkwer uses essential cookies to run the site and preference cookies to remember choices such as cookie consent. For a fuller breakdown of cookie types and how to withdraw preference storage, see our Cookies page at /cookies. Declining non-essential preferences does not block reading the magazine.",
		},
		{
			id: "retention",
			heading: "Retention and access",
			body: "We keep contact messages only as long as needed to respond and follow up on the conversation you started. You may email hello@talkwer.example to ask what contact data we hold about you or to request that we delete a message thread where practical. Some technical logs may age out automatically with hosting provider retention windows.",
		},
		{
			id: "contact",
			heading: "Privacy questions",
			body: "Questions about this policy or your data can go to hello@talkwer.example or the Contact page. We aim to reply within a few business days. If your request involves a third-party hosting or analytics vendor, we will say so and point you to the right channel when we can.",
		},
	],
} as const;
