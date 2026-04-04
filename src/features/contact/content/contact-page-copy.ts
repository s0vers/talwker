export const CONTACT_HERO_COPY = {
	eyebrow: "Correspondence",
	headlineLead: "Drop us",
	headlineAccent: "a line",
	description:
		"Editorial pitches, partnerships, press, and reader notes — we read every thread, even when we cannot answer them all.",
	metaCardTitle: "Desk routing",
	metaLines: [
		{ label: "Ref", value: "TALKWER · CONTACT" },
		{ label: "Timezone", value: "Editorial · GMT−5" },
		{ label: "Typical reply", value: "A few business days" },
	] as const,
	stampLabel: "AIR MAIL",
} as const;

export const CONTACT_CHANNELS_COPY = {
	sectionEyebrow: "Direct lines",
	sectionTitle: "How to reach us",
	sectionDescription:
		"One inbox per desk. Choose the line that matches your note — we route from there.",
	channels: [
		{
			id: "editorial",
			title: "Editorial pitches",
			body: "Story ideas, photographer portfolios, and destination features. Include a short summary and any relevant links.",
			ctaLabel: "Email editorial",
			email: "editorial@talkwer.com",
			mailtoSubject: "Editorial pitch",
		},
		{
			id: "press",
			title: "Partnerships & press",
			body: "Brand collaborations, media kits, and interview requests. Tell us your timeline and audience.",
			ctaLabel: "Email partnerships",
			email: "partners@talkwer.com",
			mailtoSubject: "Partnership or press inquiry",
		},
		{
			id: "support",
			title: "Reader support",
			body: "Booking questions, account help, or feedback about the site. We typically respond within a few business days.",
			ctaLabel: "Email support",
			email: "hello@talkwer.com",
			mailtoSubject: "Reader support",
		},
	] as const,
} as const;

export const CONTACT_FORM_COPY = {
	eyebrow: "Message",
	title: "Send a note",
	description:
		"Share a few details and we’ll route your note to the right desk. When you send, your email app opens with everything filled in — you stay in control of what goes out.",
	nameLabel: "Name",
	namePlaceholder: "Your name",
	emailLabel: "Email",
	emailPlaceholder: "you@example.com",
	topicLabel: "Topic",
	topicPlaceholder: "What is this about?",
	topics: [
		{ value: "editorial", label: "Editorial pitch" },
		{ value: "partnerships", label: "Partnerships & press" },
		{ value: "support", label: "Reader support" },
		{ value: "other", label: "Something else" },
	] as const,
	messageLabel: "Message",
	messagePlaceholder:
		"A few sentences help us route your note — links, dates, or destinations if relevant.",
	submitLabel: "Send message",
	/** Shown beside the button — explains mailto behavior without sounding like dev notes */
	submitHint: "Opens your email app with a draft addressed to us.",
} as const;

export const CONTACT_SOCIAL_COPY = {
	title: "Elsewhere",
	description: "Day-to-day dispatches and behind-the-scenes travel.",
	links: [
		{ label: "Instagram", href: "https://instagram.com/talkwer" },
		{ label: "X (Twitter)", href: "https://x.com/talkwer" },
	] as const,
} as const;
