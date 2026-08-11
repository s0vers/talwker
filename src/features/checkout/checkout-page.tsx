"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
	BOOKING_HANDOFF_KEY,
	readBookingHandoff,
} from "@/features/booking/lib/booking-handoff";
import { CHECKOUT_COPY } from "@/features/checkout/content/checkout-copy";
import { CheckoutForm, CheckoutSummary } from "@/features/checkout/sections";

const SERVER_SNAPSHOT = "__server__";

function subscribe(onStoreChange: () => void) {
	window.addEventListener("storage", onStoreChange);
	return () => window.removeEventListener("storage", onStoreChange);
}

function getHandoffRaw(): string | null {
	try {
		return sessionStorage.getItem(BOOKING_HANDOFF_KEY);
	} catch {
		return null;
	}
}

function getServerSnapshot(): string {
	return SERVER_SNAPSHOT;
}

export default function CheckoutPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const showDemoFlash = searchParams.get("demo") === "1";
	const raw = useSyncExternalStore(subscribe, getHandoffRaw, getServerSnapshot);
	const isServer = raw === SERVER_SNAPSHOT;
	const handoff = useMemo(() => {
		if (!raw || isServer) return null;
		return readBookingHandoff();
	}, [raw, isServer]);

	useEffect(() => {
		if (isServer) return;
		if (!handoff) {
			router.replace("/tours");
		}
	}, [handoff, isServer, router]);

	if (isServer || !handoff) {
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

				{showDemoFlash ? (
					<p className="mt-4 text-sm text-orange-400" role="status">
						{CHECKOUT_COPY.demoAuthFlash}
					</p>
				) : null}

				<div className="mt-10 grid gap-8">
					<CheckoutSummary handoff={handoff} />
					<CheckoutForm />
				</div>
			</div>
		</main>
	);
}
