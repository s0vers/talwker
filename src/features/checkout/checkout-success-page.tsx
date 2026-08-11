"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { CHECKOUT_SUCCESS_COPY } from "@/features/checkout/content/checkout-copy";
import {
	BOOKING_CONFIRMATION_KEY,
	readBookingConfirmation,
} from "@/features/checkout/lib/confirmation-id";
import { CheckoutSuccessBody } from "@/features/checkout/sections";

const SERVER_SNAPSHOT = "__server__";

function subscribe(onStoreChange: () => void) {
	window.addEventListener("storage", onStoreChange);
	return () => window.removeEventListener("storage", onStoreChange);
}

function getConfirmationRaw(): string | null {
	try {
		return sessionStorage.getItem(BOOKING_CONFIRMATION_KEY);
	} catch {
		return null;
	}
}

function getServerSnapshot(): string {
	return SERVER_SNAPSHOT;
}

export default function CheckoutSuccessPage() {
	const router = useRouter();
	const raw = useSyncExternalStore(
		subscribe,
		getConfirmationRaw,
		getServerSnapshot,
	);
	const isServer = raw === SERVER_SNAPSHOT;
	const confirmation = useMemo(() => {
		if (!raw || isServer) return null;
		return readBookingConfirmation();
	}, [raw, isServer]);

	useEffect(() => {
		if (isServer) return;
		if (!confirmation) {
			router.replace("/tours");
		}
	}, [confirmation, isServer, router]);

	if (isServer || !confirmation) {
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
