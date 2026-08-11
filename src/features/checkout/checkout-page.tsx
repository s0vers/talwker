"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
	type BookingHandoff,
	readBookingHandoff,
} from "@/features/booking/lib/booking-handoff";
import { CHECKOUT_COPY } from "@/features/checkout/content/checkout-copy";
import { CheckoutForm, CheckoutSummary } from "@/features/checkout/sections";

export default function CheckoutPage() {
	const router = useRouter();
	const [handoff, setHandoff] = useState<BookingHandoff | null>(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const data = readBookingHandoff();
		if (!data) {
			router.replace("/tours");
			return;
		}
		setHandoff(data);
		setReady(true);
	}, [router]);

	if (!ready || !handoff) {
		return (
			<main className="flex min-h-[100svh] items-center justify-center bg-[#050505] text-white/40">
				{CHECKOUT_COPY.redirectingLabel}
			</main>
		);
	}

	return (
		<main className="min-h-[100svh] bg-[#050505] text-white">
			<div className="pad-x mx-auto max-w-[960px] py-16 md:py-24">
				<p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
					Booking
				</p>
				<h1 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tighter text-white">
					{CHECKOUT_COPY.title}
				</h1>

				<div className="mt-10 grid gap-8">
					<CheckoutSummary handoff={handoff} />
					<CheckoutForm />
				</div>
			</div>
		</main>
	);
}
