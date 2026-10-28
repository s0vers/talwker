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
import {
	AUTH_CONCEPT_PATHS,
	type AuthMockupMode,
	type AuthMockupVariant
} from "@/features/auth-mockups/content/auth-mockup-copy";

export function MockupForm({
	mode,
	variant
}: {
	mode: AuthMockupMode;
	variant: AuthMockupVariant;
}) {
	const t = useTranslations("Auth");
	const router = useRouter();
	const searchParams = useSearchParams();
	const id = useId();
	const isLogin = mode === "login";
	const isAtlas = variant === "atlas";
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [message, setMessage] = useState<string | null>(null);
	const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const next = safeNextPath(searchParams?.get("next") ?? null);
	const switchPath = isLogin
		? AUTH_CONCEPT_PATHS[variant].register
		: AUTH_CONCEPT_PATHS[variant].login;
	const switchHref = next
		? `${switchPath}?next=${encodeURIComponent(next)}`
		: switchPath;
	const inputClass = isAtlas
		? "h-13 rounded-none border-x-0 border-t-0 border-b-white/15 bg-transparent px-0 text-base text-white shadow-none placeholder:text-white/35 focus-visible:border-orange-500 focus-visible:ring-0"
		: "h-13 rounded-lg border-white/15 bg-white/[0.06] text-base text-white placeholder:text-white/35";
	const labelClass =
		"mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60";

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
		redirectTimer.current = setTimeout(
			() => router.push(withDemoQuery(next ?? "/dashboard/customer")),
			AUTH_DEMO_REDIRECT_MS
		);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="space-y-5">
					{!isLogin && (
						<div>
							<label htmlFor={`${id}-name`} className={labelClass}>
								{t("nameLabel")}
							</label>
							<Input
								id={`${id}-name`}
								name="name"
								type="text"
								autoComplete="name"
								placeholder={t("namePlaceholder")}
								required
								className={inputClass}
							/>
						</div>
					)}
					<div>
						<label htmlFor={`${id}-email`} className={labelClass}>
							{t("emailLabel")}
						</label>
						<Input
							id={`${id}-email`}
							name="email"
							type="email"
							inputMode="email"
							autoComplete="email"
							placeholder={t("emailPlaceholder")}
							required
							className={inputClass}
						/>
					</div>
					<div>
						<div className="flex items-center justify-between gap-3">
							<label htmlFor={`${id}-password`} className={labelClass}>
								{t("passwordLabel")}
							</label>
							{!isLogin && (
								<span className="text-[11px] text-white/45">
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
								minLength={isLogin ? undefined : 8}
								required
								className={`${inputClass} pr-12`}
							/>
							<button
								type="button"
								onClick={() => setPasswordVisible(value => !value)}
								aria-label={
									passwordVisible ? t("hidePassword") : t("showPassword")
								}
								aria-pressed={passwordVisible}
								className="absolute inset-y-0 right-0 flex min-w-11 items-center justify-center text-white/55 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
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
					<p role="status" className="mt-5 text-sm text-orange-300">
						{message}
					</p>
				)}
				<button
					type="submit"
					disabled={Boolean(message)}
					className={
						isAtlas
							? "mt-8 flex min-h-13 w-full items-center justify-center gap-2 rounded-sm bg-orange-500 px-5 text-sm font-semibold text-[#15110f] transition-[background-color,transform] duration-150 hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white active:scale-[0.97] disabled:cursor-wait disabled:bg-orange-300"
							: "mt-8 flex min-h-13 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 text-sm font-semibold text-[#15110f] transition-[background-color,transform] duration-150 hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white active:scale-[0.97] disabled:cursor-wait disabled:bg-orange-300"
					}
				>
					{isLogin ? t("signInSubmit") : t("registerSubmit")}
					<LuArrowRight aria-hidden="true" className="size-4" />
				</button>
			</form>
			<p className="mt-7 text-center text-sm text-white/60">
				{isLogin ? t("needAccountPrompt") : t("haveAccountPrompt")}{" "}
				<Link
					href={switchHref}
					className="font-semibold text-white underline decoration-orange-500 underline-offset-4 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
				>
					{isLogin ? t("createAccountLink") : t("signInLink")}
				</Link>
			</p>
		</div>
	);
}
