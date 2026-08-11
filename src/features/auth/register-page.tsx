import { AUTH_REGISTER_COPY } from "@/features/auth/content/auth-copy";
import { RegisterForm } from "@/features/auth/sections";

export default function RegisterPage() {
	return (
		<main className="min-h-[100svh] bg-[#050505] text-white">
			<div className="pad-x mx-auto max-w-[480px] py-16 md:py-24">
				<p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-500">
					{AUTH_REGISTER_COPY.eyebrow}
				</p>
				<h1 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tighter text-white">
					{AUTH_REGISTER_COPY.title}
				</h1>
				<p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
					{AUTH_REGISTER_COPY.description}
				</p>
				<div className="mt-10">
					<RegisterForm />
				</div>
			</div>
		</main>
	);
}
