"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CHECKOUT_SUCCESS_COPY } from "@/features/checkout/content/checkout-copy";
import {
	type BookingConfirmation,
	readBookingConfirmation,
} from "@/features/checkout/lib/confirmation-id";
import { CheckoutSuccessBody } from "@/features/checkout/sections";

export default function CheckoutSuccessPage() {
	const router = useRouter();
	const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(
		null,
	);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const data = readBookingConfirmation();
		if (!data) {
			router.replace("/tours");
			return;
		}
		setConfirmation(data);
		setReady(true);
	}, [router]);

	if (!ready || !confirmation) {
		return (
			<main className="flex min-h-[100svh] items-center justify-center bg-[#050505] text-white/40">
				{CHECKOUT_SUCCESS_COPY.redirectingLabel}
			</main>
		);
	}

	return (
		<main className="min-h-[100svh] bg-[#050505] text-white">
			<div className="pad-x mx-auto max-w-[720px] py-16 md:py-24">
				<CheckoutSuccessBody confirmation={confirmation} />
			</div>
		</main>
	);
}
