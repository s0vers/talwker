"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { CHECKOUT_SUCCESS_COPY } from "@/features/checkout/content/checkout-copy";
import {
	BOOKING_CONFIRMATION_KEY,
	parseBookingConfirmation,
} from "@/features/checkout/lib/confirmation-id";
import { useSessionStorageJson } from "@/features/checkout/lib/use-session-storage-json";
import { CheckoutSuccessBody } from "@/features/checkout/sections";

export default function CheckoutSuccessPage() {
	const router = useRouter();
	const { ready, value: confirmation } = useSessionStorageJson(
		BOOKING_CONFIRMATION_KEY,
		parseBookingConfirmation,
	);

	useEffect(() => {
		if (!ready) return;
		if (!confirmation) router.replace("/tours");
	}, [ready, confirmation, router]);

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
