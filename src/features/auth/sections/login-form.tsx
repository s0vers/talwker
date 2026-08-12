"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AUTH_LOGIN_COPY } from "@/features/auth/content/auth-copy";
import { authHref } from "@/features/auth/lib/auth-href";
import { safeNextPath } from "@/features/auth/lib/safe-next-path";
import {
	AUTH_DEMO_REDIRECT_MS,
	withDemoQuery,
} from "@/features/auth/lib/with-demo-query";
import { FieldLabel } from "@/shared/ui";
import { Lock, Mail, Sparkles } from "lucide-react";

export function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const formId = useId();
	const emailId = `${formId}-email`;
	const passwordId = `${formId}-password`;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState<string | null>(null);
	const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const next = safeNextPath(searchParams.get("next"));

	useEffect(() => {
		return () => {
			if (redirectTimer.current) clearTimeout(redirectTimer.current);
		};
	}, []);

	const handleFillDemo = () => {
		setEmail("explorer@talkwer.com");
		setPassword("wanderlust2026");
		setMessage(null);
	};

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setMessage(AUTH_LOGIN_COPY.demoMessage);
		if (!next) return;
		const target = withDemoQuery(next);
		if (redirectTimer.current) clearTimeout(redirectTimer.current);
		redirectTimer.current = setTimeout(() => {
			router.push(target);
		}, AUTH_DEMO_REDIRECT_MS);
	}

	return (
		<div className="rounded-3xl border border-white/[0.08] bg-[#0a0a0a] p-6 shadow-[0_32px_96px_rgba(0,0,0,0.5)] md:p-8">
			{/* Quick Fill Demo Banner */}
			<div className="mb-6 flex items-center justify-between rounded-2xl border border-orange-500/20 bg-orange-500/10 px-3.5 py-2.5 text-xs text-orange-300">
				<div className="flex items-center gap-2">
					<Sparkles className="size-4 shrink-0 text-orange-400" />
					<span>Quick demo sign-in?</span>
				</div>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={handleFillDemo}
					className="h-7 rounded-lg bg-orange-500/20 px-2.5 text-xs font-medium text-orange-200 hover:bg-orange-500/30 hover:text-white"
				>
					Autofill Demo
				</Button>
			</div>

			<form onSubmit={handleSubmit} noValidate>
				<div>
					<FieldLabel htmlFor={emailId}>{AUTH_LOGIN_COPY.emailLabel}</FieldLabel>
					<div className="relative">
						<Input
							id={emailId}
							name="email"
							type="email"
							autoComplete="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder={AUTH_LOGIN_COPY.emailPlaceholder}
							className="pl-10"
						/>
						<Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
					</div>
				</div>

				<div className="mt-6">
					<FieldLabel htmlFor={passwordId}>
						{AUTH_LOGIN_COPY.passwordLabel}
					</FieldLabel>
					<div className="relative">
						<Input
							id={passwordId}
							name="password"
							type="password"
							autoComplete="current-password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder={AUTH_LOGIN_COPY.passwordPlaceholder}
							className="pl-10"
						/>
						<Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
					</div>
				</div>

				{message ? (
					<p className="mt-4 text-sm font-medium text-orange-400" role="status">
						{message}
					</p>
				) : null}

				<div className="mt-8">
					<Button
						type="submit"
						size="lg"
						className="h-12 w-full rounded-full bg-orange-500 font-semibold text-white transition-colors hover:bg-orange-500/90"
					>
						{AUTH_LOGIN_COPY.submitLabel}
					</Button>
				</div>
			</form>

			<p className="mt-8 text-center text-sm text-white/55">
				{AUTH_LOGIN_COPY.switchPrompt}{" "}
				<Link
					href={authHref("/register", next)}
					className="font-semibold text-orange-500 transition-colors hover:text-orange-400"
				>
					{AUTH_LOGIN_COPY.switchLabel}
				</Link>
			</p>
		</div>
	);
}
