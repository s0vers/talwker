"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	clearBookingHandoff,
	readBookingHandoff,
} from "@/features/booking/lib/booking-handoff";
import { CHECKOUT_COPY } from "@/features/checkout/content/checkout-copy";
import {
	createConfirmationId,
	writeBookingConfirmation,
} from "@/features/checkout/lib/confirmation-id";
import { cn } from "@/lib/utils";

const fieldSurface =
	"border-white/15 bg-white/[0.04] text-white shadow-[0_1px_0_rgba(255,255,255,0.04)]";

const AUTH_NEXT = "/checkout";

function FieldLabel({
	htmlFor,
	children,
}: {
	htmlFor: string;
	children: React.ReactNode;
}) {
	return (
		<label
			htmlFor={htmlFor}
			className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50"
		>
			{children}
		</label>
	);
}

export function CheckoutForm() {
	const router = useRouter();
	const formId = useId();
	const cardNumberId = `${formId}-card`;
	const expiryId = `${formId}-expiry`;
	const cvcId = `${formId}-cvc`;
	const [error, setError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const cardNumber = String(fd.get("cardNumber") ?? "").trim();
		const expiry = String(fd.get("expiry") ?? "").trim();
		const cvc = String(fd.get("cvc") ?? "").trim();

		if (!cardNumber || !expiry || !cvc) {
			setError(CHECKOUT_COPY.cardError);
			return;
		}

		const handoff = readBookingHandoff();
		if (!handoff) {
			router.replace("/tours");
			return;
		}

		setSubmitting(true);
		setError(null);

		const id = createConfirmationId();
		writeBookingConfirmation({ id, ...handoff });
		clearBookingHandoff();
		router.push("/checkout/success");
	}

	return (
		<section
			aria-labelledby="checkout-payment-heading"
			className="rounded-3xl border border-white/6 bg-linear-to-b from-white/5 to-transparent p-6 shadow-[0_40px_120px_rgba(0,0,0,0.35)] md:p-8"
		>
			<h2
				id="checkout-payment-heading"
				className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500"
			>
				Payment
			</h2>

			<form onSubmit={handleSubmit} className="mt-6" noValidate>
				<div>
					<FieldLabel htmlFor={cardNumberId}>
						{CHECKOUT_COPY.cardNumberLabel}
					</FieldLabel>
					<Input
						id={cardNumberId}
						name="cardNumber"
						type="text"
						inputMode="numeric"
						autoComplete="cc-number"
						placeholder={CHECKOUT_COPY.cardNumberPlaceholder}
						className={cn(fieldSurface, "rounded-2xl placeholder:text-white/35")}
					/>
				</div>

				<div className="mt-6 grid gap-6 sm:grid-cols-2">
					<div>
						<FieldLabel htmlFor={expiryId}>{CHECKOUT_COPY.expiryLabel}</FieldLabel>
						<Input
							id={expiryId}
							name="expiry"
							type="text"
							inputMode="numeric"
							autoComplete="cc-exp"
							placeholder={CHECKOUT_COPY.expiryPlaceholder}
							className={cn(
								fieldSurface,
								"rounded-2xl placeholder:text-white/35",
							)}
						/>
					</div>
					<div>
						<FieldLabel htmlFor={cvcId}>{CHECKOUT_COPY.cvcLabel}</FieldLabel>
						<Input
							id={cvcId}
							name="cvc"
							type="text"
							inputMode="numeric"
							autoComplete="cc-csc"
							placeholder={CHECKOUT_COPY.cvcPlaceholder}
							className={cn(
								fieldSurface,
								"rounded-2xl placeholder:text-white/35",
							)}
						/>
					</div>
				</div>

				{error ? (
					<p className="mt-4 text-sm text-orange-400" role="alert">
						{error}
					</p>
				) : null}

				<div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<Button
						type="submit"
						size="lg"
						disabled={submitting}
						className="w-full rounded-full bg-orange-500 text-white hover:bg-orange-500/90 sm:w-auto sm:min-w-[200px]"
					>
						{CHECKOUT_COPY.confirmLabel}
					</Button>
					<p className="max-w-xs text-center text-[12px] leading-relaxed text-white/45 sm:text-right">
						{CHECKOUT_COPY.feeNote}
					</p>
				</div>
			</form>

			<div className="mt-10 border-t border-white/10 pt-6">
				<p className="text-sm text-white/55">{CHECKOUT_COPY.demoAuthHint}</p>
				<div className="mt-4 flex flex-wrap gap-4">
					<Link
						href={`/login?next=${encodeURIComponent(AUTH_NEXT)}`}
						className="text-sm font-semibold text-orange-500 transition-colors hover:text-orange-400"
					>
						{CHECKOUT_COPY.signInLabel}
					</Link>
					<Link
						href={`/register?next=${encodeURIComponent(AUTH_NEXT)}`}
						className="text-sm font-semibold text-white/80 transition-colors hover:text-white"
					>
						{CHECKOUT_COPY.registerLabel}
					</Link>
				</div>
			</div>
		</section>
	);
}
