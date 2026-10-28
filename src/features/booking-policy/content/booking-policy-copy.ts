export const BOOKING_POLICY_COPY = {
	eyebrow: "Support",
	title: "Booking Policy",
	effectiveDate: "August 8, 2026",
	intro:
		"This policy explains how Talkwer reservations work — deposits, confirmations, traveler responsibilities, and what happens when plans change. It is brand guidance for our static site, not formal legal advice.",
	sections: [
		{
			id: "confirmation",
			heading: "Confirmations",
			body: "A booking is confirmed once you receive written confirmation from Talkwer with dates, travelers, and inclusions. Hold requests are not guarantees. Until confirmation arrives, inventory may still be released to other guests. Double-check every detail on the confirmation and reply promptly if anything looks incorrect.",
		},
		{
			id: "deposits",
			heading: "Deposits and balance",
			body: "Most journeys require a deposit to secure space. Balance due dates appear on your confirmation. Late balances may release inventory. Deposit amounts and payment schedules vary by trip type and supplier; your confirmation always lists the amounts that apply to you.",
		},
		{
			id: "changes",
			heading: "Date and traveler changes",
			body: "Change requests are reviewed case by case and may incur supplier fees. See Cancellation for refunds and credits. Name swaps and date moves often depend on availability with hotels, guides, and transport partners. We will outline any extra costs before you commit to a change.",
		},
		{
			id: "responsibilities",
			heading: "Traveler responsibilities",
			body: "You are responsible for accurate passport details, visas, vaccinations, and travel insurance that meet the destinations on your itinerary. Talkwer shares editorial guidance and packing notes, but entry rules and health requirements can change. Always verify current requirements with official sources before you depart.",
		},
		{
			id: "contact",
			heading: "Questions",
			body: "Email hello@s0vers.com or use the Contact page before you book if anything is unclear. We would rather answer a booking question early than unravel a mismatch after deposit. Response times may be longer during peak travel seasons.",
		},
	],
} as const;
