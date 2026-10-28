export const CANCELLATION_COPY = {
	eyebrow: "Support",
	title: "Cancellation Policy",
	effectiveDate: "August 8, 2026",
	intro:
		"Plans shift. This page outlines how Talkwer handles cancellations, refund windows, travel credits, and rare force majeure events. It is brand guidance for our static site, not formal legal advice.",
	sections: [
		{
			id: "windows",
			heading: "Refund windows",
			body: "Refund eligibility depends on how far out you cancel and the supplier rules on your confirmation. Early cancellations typically retain a larger refundable portion of the deposit and balance. Closer to departure, non-refundable supplier costs often apply and may reduce or eliminate a cash refund.",
		},
		{
			id: "credits",
			heading: "Travel credits",
			body: "When a cash refund is not available, Talkwer may offer a travel credit toward a future journey of equal or greater value. Credits usually carry an expiration date and cannot be transferred for cash. We will confirm credit amount, expiry, and any blackout dates in writing when a credit is issued.",
		},
		{
			id: "how-to-cancel",
			heading: "How to cancel",
			body: "Send a written cancellation request from the email on your booking, or use the Contact page with your confirmation number and travel dates. Verbal or social-message cancellations are not binding until we acknowledge them in writing. Processing times vary with supplier response windows.",
		},
		{
			id: "force-majeure",
			heading: "Force majeure",
			body: "Events beyond reasonable control — severe weather, strikes, government closures, or public health emergencies — may force itinerary changes or cancellations. In those cases we work with partners to rebook, credit, or refund according to what suppliers allow. Talkwer cannot guarantee outcomes that depend on third-party policies or local regulations.",
		},
		{
			id: "contact",
			heading: "Questions",
			body: "If you are unsure which window applies to your trip, reach out before you cancel. Email hello@s0vers.com or use Contact with your confirmation details. We will walk through options so you can choose refund, credit, or date change with clear expectations.",
		},
	],
} as const;
