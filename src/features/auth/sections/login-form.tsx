"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AUTH_LOGIN_COPY } from "@/features/auth/content/auth-copy";
import { safeNextPath } from "@/features/auth/lib/safe-next-path";
import {
	AUTH_DEMO_REDIRECT_MS,
	withDemoQuery,
} from "@/features/auth/lib/with-demo-query";
import { cn } from "@/lib/utils";

const fieldSurface =
	"border-white/15 bg-white/[0.04] text-white shadow-[0_1px_0_rgba(255,255,255,0.04)]";

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

function authHref(path: "/login" | "/register", next: string | null) {
	if (!next) return path;
	return `${path}?next=${encodeURIComponent(next)}`;
}

export function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const formId = useId();
	const emailId = `${formId}-email`;
	const passwordId = `${formId}-password`;
	const [message, setMessage] = useState<string | null>(null);

	const next = safeNextPath(searchParams.get("next"));

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setMessage(AUTH_LOGIN_COPY.demoMessage);
		if (!next) return;
		const target = withDemoQuery(next);
		window.setTimeout(() => {
			router.push(target);
		}, AUTH_DEMO_REDIRECT_MS);
	}

	return (
		<div className="rounded-3xl border border-white/6 bg-linear-to-b from-white/5 to-transparent p-6 shadow-[0_40px_120px_rgba(0,0,0,0.35)] md:p-8">
			<form onSubmit={handleSubmit} noValidate>
				<div>
					<FieldLabel htmlFor={emailId}>{AUTH_LOGIN_COPY.emailLabel}</FieldLabel>
					<Input
						id={emailId}
						name="email"
						type="email"
						autoComplete="email"
						required
						placeholder={AUTH_LOGIN_COPY.emailPlaceholder}
						className={cn(fieldSurface, "rounded-2xl placeholder:text-white/35")}
					/>
				</div>

				<div className="mt-6">
					<FieldLabel htmlFor={passwordId}>
						{AUTH_LOGIN_COPY.passwordLabel}
					</FieldLabel>
					<Input
						id={passwordId}
						name="password"
						type="password"
						autoComplete="current-password"
						required
						placeholder={AUTH_LOGIN_COPY.passwordPlaceholder}
						className={cn(fieldSurface, "rounded-2xl placeholder:text-white/35")}
					/>
				</div>

				{message ? (
					<p className="mt-4 text-sm text-orange-400" role="status">
						{message}
					</p>
				) : null}

				<div className="mt-8">
					<Button
						type="submit"
						size="lg"
						className="w-full rounded-full bg-orange-500 text-white hover:bg-orange-500/90"
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
