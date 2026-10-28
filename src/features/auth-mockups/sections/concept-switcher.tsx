"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { safeNextPath } from "@/features/auth/lib/safe-next-path";
import {
	AUTH_CONCEPT_PATHS,
	type AuthMockupMode,
	type AuthMockupVariant
} from "@/features/auth-mockups/content/auth-mockup-copy";

const concepts = [
	{ name: "Original", ...AUTH_CONCEPT_PATHS.original },
	{ name: "Atlas", ...AUTH_CONCEPT_PATHS.atlas },
	{ name: "Postcard", ...AUTH_CONCEPT_PATHS.postcard }
] as const;

const labels = {
	en: {
		title: "Authentication design concepts",
		names: ["Original", "Atlas", "Postcard"]
	},
	es: { title: "Conceptos de acceso", names: ["Original", "Atlas", "Postal"] },
	ja: {
		title: "ログイン画面のデザイン案",
		names: ["元の案", "アトラス", "絵葉書"]
	}
} as const;

function conceptHref(index: number, mode: AuthMockupMode, next: string | null) {
	const path = concepts[index][mode];
	return next ? `${path}?next=${encodeURIComponent(next)}` : path;
}

export function ConceptSwitcher({
	mode,
	variant
}: {
	mode: AuthMockupMode;
	variant: AuthMockupVariant;
}) {
	const router = useRouter();
	const locale = useLocale();
	const searchParams = useSearchParams();
	const pickerLabels =
		labels[locale === "es" || locale === "ja" ? locale : "en"];
	const next = safeNextPath(searchParams?.get("next") ?? null);
	const active = variant === "atlas" ? 1 : 2;

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
				return;
			const target = event.target;
			if (
				target instanceof HTMLElement &&
				(target.isContentEditable ||
					/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
			)
				return;
			const number = Number(event.key);
			if (number >= 1 && number <= concepts.length)
				router.push(conceptHref(number - 1, mode, next));
			else if (event.key === "ArrowRight")
				router.push(conceptHref((active + 1) % concepts.length, mode, next));
			else if (event.key === "ArrowLeft")
				router.push(
					conceptHref(
						(active + concepts.length - 1) % concepts.length,
						mode,
						next
					)
				);
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [active, mode, next, router]);

	return (
		<nav
			aria-label={pickerLabels.title}
			className="flex items-center gap-1 rounded-full border border-white/15 bg-black/45 p-1 text-[11px] font-semibold backdrop-blur-sm"
		>
			{concepts.map((concept, index) => (
				<Link
					key={concept.name}
					href={conceptHref(index, mode, next)}
					aria-current={index === active ? "page" : undefined}
					className={`flex min-h-9 items-center rounded-full px-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${index === active ? "bg-white text-[#171715]" : "text-white/65 hover:text-white"}`}
				>
					<span className="mr-1.5 opacity-60">{index + 1}</span>
					{pickerLabels.names[index]}
				</Link>
			))}
		</nav>
	);
}
