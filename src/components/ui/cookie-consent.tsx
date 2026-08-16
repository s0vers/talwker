"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { LuCookie } from "react-icons/lu";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const CONSENT_STORAGE_KEY = "talkwer_cookie_consent";

function subscribe(callback: () => void) {
	window.addEventListener("storage", callback);
	return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): string {
	try {
		return localStorage.getItem(CONSENT_STORAGE_KEY) ?? "none";
	} catch {
		return "none";
	}
}

function getServerSnapshot(): string {
	return "server";
}

export type CookieConsentProps = {
	variant?: "small" | "default";
	onAcceptCallback?: () => void;
	onDeclineCallback?: () => void;
	className?: string;
};

export function CookieConsent({
	variant = "small",
	onAcceptCallback,
	onDeclineCallback,
	className,
}: CookieConsentProps) {
	const t = useTranslations("Legal");
	const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	const handleAccept = () => {
		try {
			localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
			window.dispatchEvent(new Event("storage"));
		} catch {}
		onAcceptCallback?.();
	};

	const handleDecline = () => {
		try {
			localStorage.setItem(CONSENT_STORAGE_KEY, "declined");
			window.dispatchEvent(new Event("storage"));
		} catch {}
		onDeclineCallback?.();
	};

	if (consent !== "none") return null;

	return (
		<aside
			aria-label="Cookie consent"
			className={cn(
				"fixed bottom-4 right-4 z-50 max-w-sm w-[calc(100vw-2rem)] rounded-2xl border border-white/10 bg-[#0a0a0a]/95 p-5 shadow-2xl backdrop-blur-md animate-in fade-in-0 slide-from-bottom-4 duration-300 text-white",
				variant === "default" && "max-w-md",
				className,
			)}
		>
			<div className="flex items-start gap-3">
				<div className="rounded-xl bg-orange-500/10 p-2.5 text-orange-500 shrink-0 mt-0.5">
					<LuCookie className="h-5 w-5" />
				</div>
				<div className="flex-1 space-y-1">
					<h2 className="text-sm font-semibold tracking-tight text-white">{t("cookieTitle")}</h2>
					<p className="text-xs leading-relaxed text-white/60">
						{t("cookieDescription")}{" "}
						<Link
							href="/cookies"
							className="text-orange-500 underline underline-offset-2 hover:text-orange-400"
						>
							{t("cookieLearnMore")}
						</Link>
						.
					</p>
				</div>
			</div>
			<div className="mt-4 flex items-center justify-end gap-2.5">
				<button
					type="button"
					onClick={handleDecline}
					className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-white/60 transition-colors hover:border-white/30 hover:text-white"
				>
					{t("cookieDecline")}
				</button>
				<button
					type="button"
					onClick={handleAccept}
					className="rounded-full bg-orange-500 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-md hover:shadow-orange-500/20"
				>
					{t("cookieAccept")}
				</button>
			</div>
		</aside>
	);
}
