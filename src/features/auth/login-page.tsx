"use client";

import { AuthLayout } from "@/features/auth/sections/auth-layout";
import { LoginForm } from "@/features/auth/sections";

export default function LoginPage() {
	return (
		<AuthLayout mode="login">
			<LoginForm />
		</AuthLayout>
	);
}
