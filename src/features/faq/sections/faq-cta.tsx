import { EditorialCtaBand } from "@/shared/ui";

export function FaqCTA() {
	return (
		<EditorialCtaBand
			label="Help & Support"
			titleLead="Still have"
			titleAccent="questions?"
			description="Our experience team and trip planners are available to assist with custom routes, dates, and booking details."
			primary={{
				label: "Contact Support",
				href: "/contact",
			}}
			secondary={{
				label: "Read Booking Policy",
				href: "/booking-policy",
			}}
			showTopFrame
		/>
	);
}
