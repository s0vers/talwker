"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AUTH_REGISTER_COPY } from "@/features/auth/content/auth-copy";
import { authHref } from "@/features/auth/lib/auth-href";
import { safeNextPath } from "@/features/auth/lib/safe-next-path";
import {
	AUTH_DEMO_REDIRECT_MS,
	withDemoQuery,
} from "@/features/auth/lib/with-demo-query";
import { FieldLabel } from "@/shared/ui";
import { Lock, Mail, Sparkles, User } from "lucide-react";

export function RegisterForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const formId = useId();
	const nameId = `${formId}-name`;
	const emailId = `${formId}-email`;
	const passwordId = `${formId}-password`;

	const [name, setName] = useState("");
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
		setName("Alex Explorer");
		setEmail("alex.explorer@talkwer.com");
		setPassword("wanderlust2026");
		setMessage(null);
	};

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setMessage(AUTH_REGISTER_COPY.demoMessage);
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
					<span>Registering demo account?</span>
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
					<FieldLabel htmlFor={nameId}>{AUTH_REGISTER_COPY.nameLabel}</FieldLabel>
					<div className="relative">
						<Input
							id={nameId}
							name="name"
							type="text"
							autoComplete="name"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder={AUTH_REGISTER_COPY.namePlaceholder}
							className="pl-10"
						/>
						<User className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
					</div>
				</div>

				<div className="mt-6">
					<FieldLabel htmlFor={emailId}>
						{AUTH_REGISTER_COPY.emailLabel}
					</FieldLabel>
					<div className="relative">
						<Input
							id={emailId}
							name="email"
							type="email"
							autoComplete="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder={AUTH_REGISTER_COPY.emailPlaceholder}
							className="pl-10"
						/>
						<Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/40" />
					</div>
				</div>

				<div className="mt-6">
					<FieldLabel htmlFor={passwordId}>
						{AUTH_REGISTER_COPY.passwordLabel}
					</FieldLabel>
					<div className="relative">
						<Input
							id={passwordId}
							name="password"
							type="password"
							autoComplete="new-password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder={AUTH_REGISTER_COPY.passwordPlaceholder}
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
						{AUTH_REGISTER_COPY.submitLabel}
					</Button>
				</div>
			</form>

			<p className="mt-8 text-center text-sm text-white/55">
				{AUTH_REGISTER_COPY.switchPrompt}{" "}
				<Link
					href={authHref("/login", next)}
					className="font-semibold text-orange-500 transition-colors hover:text-orange-400"
				>
					{AUTH_REGISTER_COPY.switchLabel}
				</Link>
			</p>
		</div>
	);
}
