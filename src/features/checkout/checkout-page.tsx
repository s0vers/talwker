"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
	BOOKING_HANDOFF_KEY,
	parseBookingHandoff
} from "@/features/booking/lib/booking-handoff";
import { CHECKOUT_COPY } from "@/features/checkout/content/checkout-copy";
import { useSessionStorageJson } from "@/features/checkout/lib/use-session-storage-json";
import { CheckoutForm, CheckoutSummary } from "@/features/checkout/sections";

export default function CheckoutPage() {
	const t = useTranslations("Checkout");
	const router = useRouter();
	const searchParams = useSearchParams();
	const showDemoFlash = searchParams?.get("demo") === "1";
	const { ready, value: handoff } = useSessionStorageJson(
		BOOKING_HANDOFF_KEY,
		parseBookingHandoff
	);

	useEffect(() => {
		if (!ready) return;
		if (!handoff) router.replace("/tours");
	}, [ready, handoff, router]);

	if (!ready || !handoff) {
		return (
			<div className="flex min-h-[100svh] items-center justify-center bg-[#050505] text-white/40">
				{CHECKOUT_COPY.redirectingLabel}
			</div>
		);
	}

	return (
		<div className="min-h-[100svh] bg-[#050505] text-white">
			<div className="pad-x mx-auto max-w-[1280px] py-12 md:py-20">
				<p className="text-[11px] font-semibold tracking-[0.25em] text-orange-500 uppercase">
					Checkout & Confirmation
				</p>
				<h1 className="mt-2 text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-tighter text-white">
					{t("title")}
				</h1>

				{showDemoFlash ? (
					<p className="mt-3 text-sm font-medium text-orange-400" role="status">
						{CHECKOUT_COPY.demoAuthFlash}
					</p>
				) : null}

				<div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
					<div className="order-2 lg:order-1 lg:col-span-7">
						<CheckoutForm />
					</div>
					<div className="order-1 lg:sticky lg:top-28 lg:order-2 lg:col-span-5">
						<CheckoutSummary handoff={handoff} />
					</div>
				</div>
			</div>
		</div>
	);
}
