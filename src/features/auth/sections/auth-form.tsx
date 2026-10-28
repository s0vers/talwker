"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { LuArrowRight, LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useRouter } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { safeNextPath } from "@/features/auth/lib/safe-next-path";
import {
	AUTH_DEMO_REDIRECT_MS,
	withDemoQuery
} from "@/features/auth/lib/with-demo-query";
import { FieldLabel } from "@/shared/ui";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
	const t = useTranslations("Auth");
	const router = useRouter();
	const searchParams = useSearchParams();
	const id = useId();
	const isLogin = mode === "login";
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [message, setMessage] = useState<string | null>(null);
	const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const next = safeNextPath(searchParams?.get("next") ?? null);
	const switchPath = isLogin ? "/register" : "/login";
	const switchHref = next
		? `${switchPath}?next=${encodeURIComponent(next)}`
		: switchPath;

	useEffect(
		() => () => {
			if (redirectTimer.current) clearTimeout(redirectTimer.current);
		},
		[]
	);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setMessage(t("demoMessage"));
		if (redirectTimer.current) clearTimeout(redirectTimer.current);
		redirectTimer.current = setTimeout(() => {
			router.push(withDemoQuery(next ?? "/dashboard/customer"));
		}, AUTH_DEMO_REDIRECT_MS);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="space-y-5">
					{!isLogin && (
						<div>
							<FieldLabel htmlFor={`${id}-name`}>{t("nameLabel")}</FieldLabel>
							<Input
								id={`${id}-name`}
								name="name"
								type="text"
								autoComplete="name"
								placeholder={t("namePlaceholder")}
								required
								className="h-13 rounded-lg bg-white/[0.035] text-base sm:text-sm"
							/>
						</div>
					)}
					<div>
						<FieldLabel htmlFor={`${id}-email`}>{t("emailLabel")}</FieldLabel>
						<Input
							id={`${id}-email`}
							name="email"
							type="email"
							autoComplete="email"
							inputMode="email"
							placeholder={t("emailPlaceholder")}
							required
							className="h-13 rounded-lg bg-white/[0.035] text-base sm:text-sm"
						/>
					</div>
					<div>
						<div className="flex items-center justify-between">
							<FieldLabel htmlFor={`${id}-password`}>
								{t("passwordLabel")}
							</FieldLabel>
							{!isLogin && (
								<span className="mb-2 text-[11px] text-white/35">
									{t("passwordHint")}
								</span>
							)}
						</div>
						<div className="relative">
							<Input
								id={`${id}-password`}
								name="password"
								type={passwordVisible ? "text" : "password"}
								autoComplete={isLogin ? "current-password" : "new-password"}
								placeholder={t("passwordPlaceholder")}
								required
								minLength={isLogin ? undefined : 8}
								className="h-13 rounded-lg bg-white/[0.035] pr-14 text-base sm:text-sm"
							/>
							<button
								type="button"
								onClick={() => setPasswordVisible(visible => !visible)}
								aria-label={
									passwordVisible ? t("hidePassword") : t("showPassword")
								}
								aria-pressed={passwordVisible}
								className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-white/45 transition-colors hover:text-white focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-orange-500"
							>
								{passwordVisible ? (
									<LuEyeOff aria-hidden="true" className="size-4" />
								) : (
									<LuEye aria-hidden="true" className="size-4" />
								)}
							</button>
						</div>
					</div>
				</div>

				{message && (
					<p
						role="status"
						className="mt-5 rounded-lg border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm text-orange-200"
					>
						{message}
					</p>
				)}

				<button
					type="submit"
					className="mt-7 flex min-h-13 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 text-sm font-semibold text-[#111] transition-[background-color,transform] duration-150 hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-orange-500 active:scale-[0.98]"
				>
					{isLogin ? t("signInSubmit") : t("registerSubmit")}
					<LuArrowRight aria-hidden="true" className="size-4" />
				</button>
			</form>

			<div className="mt-8 border-t border-white/[0.08] pt-7 text-center text-sm text-white/55">
				{isLogin ? t("needAccountPrompt") : t("haveAccountPrompt")}{" "}
				<Link
					href={switchHref}
					className="font-semibold text-white underline decoration-orange-500 underline-offset-4 transition-colors hover:text-orange-400 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-orange-500"
				>
					{isLogin ? t("createAccountLink") : t("signInLink")}
				</Link>
			</div>
		</div>
	);
}
