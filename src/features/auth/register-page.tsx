"use client";

import { AuthLayout } from "@/features/auth/sections/auth-layout";
import { RegisterForm } from "@/features/auth/sections";

export default function RegisterPage() {
	return (
		<AuthLayout mode="register">
			<RegisterForm />
		</AuthLayout>
	);
}
