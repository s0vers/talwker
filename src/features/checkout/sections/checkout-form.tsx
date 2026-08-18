"use client";

import { useId, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	clearBookingHandoff,
	readBookingHandoff,
} from "@/features/booking/lib/booking-handoff";
import {
	createConfirmationId,
	writeBookingConfirmation,
} from "@/features/checkout/lib/confirmation-id";
import { FieldLabel } from "@/shared/ui";
import {
	Calendar,
	CheckCircle,
	CreditCard,
	Lock,
	ShieldCheck,
	Sparkles,
} from "lucide-react";

const AUTH_NEXT = "/checkout";

export function CheckoutForm() {
	const t = useTranslations("Checkout");
	const router = useRouter();
	const formId = useId();
	const cardNumberId = `${formId}-card`;
	const expiryId = `${formId}-expiry`;
	const cvcId = `${formId}-cvc`;

	const [cardNumber, setCardNumber] = useState("");
	const [expiry, setExpiry] = useState("");
	const [cvc, setCvc] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);

	const handleFillDemoCard = () => {
		setCardNumber("4242 4242 4242 4242");
		setExpiry("12/28");
		setCvc("888");
		setError(null);
	};

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const num = String(fd.get("cardNumber") ?? cardNumber).trim();
		const exp = String(fd.get("expiry") ?? expiry).trim();
		const code = String(fd.get("cvc") ?? cvc).trim();

		if (!num || !exp || !code) {
			setError(t("cardError"));
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
			className="relative p-6 md:p-8 text-white"
		>
			<div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-orange-500/5 blur-[120px]" aria-hidden="true" />
			{/* Checkout Step Header */}
			<div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6">
				<div>
					<p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
						{t("step")}
					</p>
					<h2
						id="checkout-payment-heading"
						className="mt-1 text-2xl font-bold tracking-tight text-white"
					>
						{t("paymentDetails")}
					</h2>
				</div>
				<div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
					<CheckCircle className="size-3.5 text-emerald-400" />
					<span>{t("slotReserved")}</span>
				</div>
			</div>

			{/* Accepted Payment Cards Banner */}
			<div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
				<div className="flex items-center gap-2">
					<CreditCard className="size-5 text-orange-500" />
					<span className="text-sm font-medium text-white">{t("cardBanner")}</span>
				</div>
				<div className="flex items-center gap-2 text-xs font-semibold text-white/60">
					<span className="rounded bg-white/10 px-2 py-1 text-[11px]">VISA</span>
					<span className="rounded bg-white/10 px-2 py-1 text-[11px]">MC</span>
					<span className="rounded bg-white/10 px-2 py-1 text-[11px]">AMEX</span>
					<span className="rounded bg-white/10 px-2 py-1 text-[11px]">APPLE PAY</span>
				</div>
			</div>

			{/* Quick Fill Demo Chip */}
			<div className="mt-4 flex items-center justify-between rounded-xl border border-orange-500/20 bg-orange-500/10 px-3.5 py-2.5">
				<div className="flex items-center gap-2 text-xs text-orange-300">
					<Sparkles className="size-4 shrink-0 text-orange-400" />
					<span>{t("autofillBanner")}</span>
				</div>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={handleFillDemoCard}
					className="h-7 rounded-lg bg-orange-500/20 px-2.5 text-xs font-medium text-orange-200 hover:bg-orange-500/30 hover:text-white"
				>
					{t("autofillButton")}
				</Button>
			</div>

			{/* Payment Form */}
			<form onSubmit={handleSubmit} className="mt-6" noValidate>
				<div>
					<FieldLabel htmlFor={cardNumberId}>
						{t("cardNumberLabel")}
					</FieldLabel>
					<div className="relative">
						<Input
							id={cardNumberId}
							name="cardNumber"
							type="text"
							inputMode="numeric"
							autoComplete="cc-number"
							value={cardNumber}
							onChange={(e) => setCardNumber(e.target.value)}
							placeholder={t("cardNumberPlaceholder")}
							className="pl-10 border-0 bg-white/[0.02] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] focus-visible:ring-1 focus-visible:ring-orange-500/50"
						/>
						<CreditCard className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
					</div>
				</div>

				<div className="mt-6 grid gap-6 sm:grid-cols-2">
					<div>
						<FieldLabel htmlFor={expiryId}>{t("expiryLabel")}</FieldLabel>
						<div className="relative">
							<Input
								id={expiryId}
								name="expiry"
								type="text"
								inputMode="numeric"
								autoComplete="cc-exp"
								value={expiry}
								onChange={(e) => setExpiry(e.target.value)}
								placeholder={t("expiryPlaceholder")}
								className="pl-10 border-0 bg-white/[0.02] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] focus-visible:ring-1 focus-visible:ring-orange-500/50"
							/>
							<Calendar className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
						</div>
					</div>
					<div>
						<FieldLabel htmlFor={cvcId}>{t("cvcLabel")}</FieldLabel>
						<div className="relative">
							<Input
								id={cvcId}
								name="cvc"
								type="text"
								inputMode="numeric"
								autoComplete="cc-csc"
								value={cvc}
								onChange={(e) => setCvc(e.target.value)}
								placeholder={t("cvcPlaceholder")}
								className="pl-10 border-0 bg-white/[0.02] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] focus-visible:ring-1 focus-visible:ring-orange-500/50"
							/>
							<Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
						</div>
					</div>
				</div>

				{error ? (
					<p className="mt-4 text-sm font-medium text-orange-400" role="alert">
						{error}
					</p>
				) : null}

				<div className="mt-8 flex flex-col gap-4">
					<Button
						type="submit"
						size="lg"
						disabled={submitting}
						className="h-12 w-full rounded-full bg-orange-500 font-semibold text-white transition-colors hover:bg-orange-500/90"
					>
						<Lock className="mr-2 size-4" />
						{t("confirmLabel")}
					</Button>
					
					<div className="flex items-center justify-center gap-2 text-center text-xs text-white/45">
						<ShieldCheck className="size-4 text-emerald-400" />
						<span>{t("securityNotice")}</span>
					</div>
				</div>
			</form>

			{/* Demo Account Hint */}
			<div className="mt-8 border-t border-white/10 pt-6">
				<p className="text-sm text-white/55">{t("demoAuthHint")}</p>
				<div className="mt-3 flex flex-wrap gap-4">
					<Link
						href={`/login?next=${encodeURIComponent(AUTH_NEXT)}`}
						className="text-sm font-semibold text-orange-500 transition-colors hover:text-orange-400"
					>
						{t("signInLabel")}
					</Link>
					<Link
						href={`/register?next=${encodeURIComponent(AUTH_NEXT)}`}
						className="text-sm font-semibold text-white/80 transition-colors hover:text-white"
					>
						{t("registerLabel")}
					</Link>
				</div>
			</div>
		</section>
	);
}
