"use client";

import { BOOKING_COPY } from "@/features/booking/content/booking-copy";
import { writeBookingHandoff } from "@/features/booking/lib/booking-handoff";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Tour } from "@/shared/types/domain";
import { UserPlus, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { PhoneInput, getPhoneData } from "./phone-input";

type Guest = {
	email: string;
};

export function FormPanel({
	tour,
	timeZone,
	onBack,
}: {
	tour: Tour;
	timeZone: string;
	onBack: () => void;
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const slotParam = searchParams.get("slot");

	const [guestName, setGuestName] = React.useState("");
	const [guestEmail, setGuestEmail] = React.useState("");
	const [notes, setNotes] = React.useState("");
	const [guests, setGuests] = React.useState<Guest[]>([]);
	const [error, setError] = React.useState<string | null>(null);

	const addGuest = () => {
		setGuests([...guests, { email: "" }]);
	};

	const removeGuest = (index: number) => {
		setGuests(guests.filter((_, i) => i !== index));
	};

	const handleGuestChange = (index: number, email: string) => {
		setGuests(guests.map((guest, i) => (i === index ? { email } : guest)));
	};

	const hasGuests = guests.length > 0;

	const handleContinue = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);
		const name = String(formData.get("name") ?? guestName).trim();
		const email = String(formData.get("email") ?? guestEmail).trim();
		const phone = String(formData.get("phone") ?? "").trim();
		const notesValue = String(formData.get("notes") ?? notes).trim();

		const phoneData = getPhoneData(phone);
		const hasValidPhone = Boolean(
			phone && phoneData.nationalNumber && phoneData.isValid,
		);

		if (!name || !email || !hasValidPhone) {
			setError(
				!name || !email
					? "Name, email, and phone are required."
					: "Enter a valid phone number (not just the country code).",
			);
			return;
		}

		if (!slotParam) {
			setError("Pick a time slot before continuing.");
			return;
		}

		writeBookingHandoff({
			tourSlug: tour.slug,
			tourTitle: tour.title,
			slotIso: slotParam,
			timeZone,
			guestName: name,
			guestEmail: email,
			guestPhone: phone,
			notes: notesValue,
			guestEmails: guests.map((g) => g.email).filter(Boolean),
		});

		router.push("/checkout");
	};

	return (
		<form
			className="flex w-[360px] flex-col gap-5"
			onSubmit={handleContinue}
			noValidate
		>
			<div className="flex flex-col space-y-1.5">
				<Label htmlFor="name" className="text-white/80">
					Your name *
				</Label>
				<Input
					id="name"
					name="name"
					value={guestName}
					onChange={(e) => setGuestName(e.target.value)}
					required
					className="rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/35"
				/>
			</div>
			<div className="flex flex-col space-y-1.5">
				<Label htmlFor="email" className="text-white/80">
					Email address *
				</Label>
				<Input
					id="email"
					name="email"
					type="email"
					value={guestEmail}
					onChange={(e) => setGuestEmail(e.target.value)}
					required
					className="rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/35"
				/>
			</div>
			<div className="flex flex-col space-y-1.5">
				<Label htmlFor="phone" className="text-white/80">
					Phone number *
				</Label>
				<PhoneInput id="phone" />
			</div>
			<div className="flex flex-col space-y-1.5">
				<Label htmlFor="notes" className="text-white/80">
					Additional notes
				</Label>
				<Textarea
					id="notes"
					name="notes"
					value={notes}
					onChange={(e) => setNotes(e.target.value)}
					placeholder="Please share anything that will help prepare for our meeting"
					className="border-white/15 bg-white/5 text-white placeholder:text-white/35"
				/>
			</div>
			{hasGuests && (
				<>
					<Label htmlFor="guest" className="text-white/80">
						Add guests
					</Label>
					<div className="flex flex-col gap-1">
						{guests.map((guest, index) => (
							<div
								key={index}
								className="relative flex items-center space-x-2"
							>
								<Input
									id={index === 0 ? "guest" : undefined}
									type="email"
									placeholder="Email"
									value={guest.email}
									onChange={(e) => handleGuestChange(index, e.target.value)}
									className="rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/35"
								/>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<button
												type="button"
												className="absolute right-2 top-1/2 -translate-y-1/2"
												onClick={() => removeGuest(index)}
												aria-label="Remove email"
											>
												<X className="size-4 cursor-pointer text-white/60 hover:text-white" />
											</button>
										</TooltipTrigger>
										<TooltipContent className="border border-white/10 bg-[#0a0a0a] text-white">
											Remove email
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
						))}
					</div>
				</>
			)}
			<Button
				type="button"
				variant="ghost"
				onClick={() => addGuest()}
				className="w-fit text-white/80 hover:bg-white/10 hover:text-white"
			>
				<UserPlus className="mr-2 size-4" />
				Add guests
			</Button>
			<p className="my-4 text-xs text-white/50">
				By proceeding, you agree to our{" "}
				<span className="text-white/80">Terms</span> and{" "}
				<span className="text-white/80">Privacy Policy</span>.
			</p>
			{error && <p className="text-sm text-orange-400">{error}</p>}
			<div className="flex justify-end gap-2">
				<Button
					type="button"
					variant="ghost"
					onClick={onBack}
					className="text-white/80 hover:bg-white/10 hover:text-white"
				>
					Back
				</Button>
				<Button
					type="submit"
					className="bg-orange-500 text-white hover:bg-orange-600"
				>
					{BOOKING_COPY.continueLabel}
				</Button>
			</div>
		</form>
	);
}
