import Link from "next/link";
import type { BookingConfirmation } from "@/features/checkout/lib/confirmation-id";
import { CHECKOUT_COPY, CHECKOUT_SUCCESS_COPY } from "@/features/checkout/content/checkout-copy";
import { formatCheckoutSlot } from "@/features/checkout/lib/format-checkout-slot";
import { Button } from "@/components/ui/button";

export function CheckoutSuccessBody({
	confirmation,
}: {
	confirmation: BookingConfirmation;
}) {
	const slot = formatCheckoutSlot(confirmation.slotIso, confirmation.timeZone);

	return (
		<section
			aria-labelledby="checkout-success-heading"
			className="rounded-3xl border border-white/6 bg-linear-to-b from-white/5 to-transparent p-6 shadow-[0_40px_120px_rgba(0,0,0,0.35)] md:p-10"
		>
			<p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
				{CHECKOUT_SUCCESS_COPY.confirmationLabel}
			</p>
			<h1
				id="checkout-success-heading"
				className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tighter text-white"
			>
				{CHECKOUT_SUCCESS_COPY.title}
			</h1>
			<p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 md:text-base">
				{CHECKOUT_SUCCESS_COPY.body}
			</p>

			<p className="mt-8 font-mono text-sm tracking-wide text-orange-400 md:text-base">
				{confirmation.id}
			</p>

			<dl className="mt-8 space-y-4 border-t border-white/10 pt-6">
				<div>
					<dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
						{CHECKOUT_COPY.summaryTourLabel}
					</dt>
					<dd className="mt-1 text-base font-semibold text-white">
						{confirmation.tourTitle}
					</dd>
				</div>
				<div>
					<dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
						{CHECKOUT_COPY.summarySlotLabel}
					</dt>
					<dd className="mt-1 text-sm text-white/90">
						<p>{slot.date}</p>
						{slot.time ? <p>{slot.time}</p> : null}
					</dd>
				</div>
				<div>
					<dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
						{CHECKOUT_COPY.summaryGuestLabel}
					</dt>
					<dd className="mt-1 text-sm text-white/90">
						<p className="font-medium">{confirmation.guestName}</p>
						<p className="text-white/70">{confirmation.guestEmail}</p>
					</dd>
				</div>
			</dl>

			<div className="mt-10 flex flex-col gap-3 sm:flex-row">
				<Button
					asChild
					size="lg"
					className="rounded-full bg-orange-500 text-white hover:bg-orange-500/90"
				>
					<Link href="/">{CHECKOUT_SUCCESS_COPY.homeLabel}</Link>
				</Button>
				<Button
					asChild
					size="lg"
					variant="outline"
					className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white"
				>
					<Link href={`/tours/${confirmation.tourSlug}`}>
						{CHECKOUT_SUCCESS_COPY.tourLabel}
					</Link>
				</Button>
			</div>
		</section>
	);
}
