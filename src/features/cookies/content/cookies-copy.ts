export const COOKIES_COPY = {
	eyebrow: "Legal",
	title: "Cookie Policy",
	effectiveDate: "August 8, 2026",
	intro:
		"Talkwer uses a small set of cookies and similar storage so the magazine loads correctly and so we can remember your cookie preference. This page explains what that means and how to change your mind. It is brand guidance for our static site, not formal legal advice.",
	sections: [
		{
			id: "essential",
			heading: "Essential cookies",
			body: "Essential cookies help the site function — for example keeping session or security-related state that the browser needs to load pages reliably. These are not used to build advertising profiles. Without them, parts of the experience may break or reset unexpectedly.",
		},
		{
			id: "preference",
			heading: "Preference cookies",
			body: "Preference cookies remember choices such as whether you accepted or declined non-essential cookies in our consent banner. Storing that preference means we do not ask on every visit. Preference data stays local to your browser unless you clear site data.",
		},
		{
			id: "consent-banner",
			heading: "Consent banner",
			body: "When you first visit, Talkwer may show a cookie consent banner with Accept, Decline, and a Learn more link to this page. Accepting stores your preference for non-essential cookies where the banner applies. Declining keeps the magazine readable while skipping preference storage beyond what is needed to remember the decline itself.",
		},
		{
			id: "withdraw",
			heading: "How to withdraw",
			body: "To change or clear a stored cookie preference, clear site data for Talkwer in your browser settings, or remove the preference key the consent component uses. After clearing, the banner can appear again so you can Accept or Decline anew. Browser controls also let you block cookies globally if you prefer.",
		},
		{
			id: "more",
			heading: "Related policies",
			body: "For how contact form data and other personal information are handled, read our Privacy Policy at /privacy. Questions about cookies or consent can go to hello@talkwer.example or the Contact page. We will explain which storage applies to your request when we can.",
		},
	],
} as const;
