import type { BookingHandoff } from "@/features/booking/lib/booking-handoff";
import { CHECKOUT_COPY } from "@/features/checkout/content/checkout-copy";
import { formatCheckoutSlot } from "@/features/checkout/lib/format-checkout-slot";

export function CheckoutSummary({ handoff }: { handoff: BookingHandoff }) {
	const slot = formatCheckoutSlot(handoff.slotIso, handoff.timeZone);

	return (
		<section
			aria-labelledby="checkout-summary-heading"
			className="rounded-3xl border border-white/6 bg-linear-to-b from-white/5 to-transparent p-6 md:p-8"
		>
			<h2
				id="checkout-summary-heading"
				className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500"
			>
				Summary
			</h2>

			<dl className="mt-6 space-y-5">
				<div>
					<dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
						{CHECKOUT_COPY.summaryTourLabel}
					</dt>
					<dd className="mt-1 text-lg font-semibold tracking-tight text-white md:text-xl">
						{handoff.tourTitle}
					</dd>
				</div>

				<div>
					<dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
						{CHECKOUT_COPY.summarySlotLabel}
					</dt>
					<dd className="mt-1 text-sm font-medium text-white/90">
						<p>{slot.date}</p>
						{slot.time ? <p>{slot.time}</p> : null}
					</dd>
				</div>

				<div>
					<dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
						{CHECKOUT_COPY.summaryTimezoneLabel}
					</dt>
					<dd className="mt-1 text-sm text-white/80">{handoff.timeZone}</dd>
				</div>

				<div>
					<dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
						{CHECKOUT_COPY.summaryGuestLabel}
					</dt>
					<dd className="mt-1 text-sm text-white/90">
						<p className="font-medium">{handoff.guestName}</p>
						<p className="text-white/70">{handoff.guestEmail}</p>
					</dd>
				</div>
			</dl>

			<div className="mt-8 flex items-end justify-between gap-4 border-t border-white/10 pt-6">
				<div>
					<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
						{CHECKOUT_COPY.feeLabel}
					</p>
					<p className="mt-1 text-sm text-white/55">{CHECKOUT_COPY.feeNote}</p>
				</div>
				<p className="text-2xl font-bold tracking-tight text-white">
					{CHECKOUT_COPY.feeAmount}
				</p>
			</div>
		</section>
	);
}
