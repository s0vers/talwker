"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { LuCheck, LuChevronDown, LuGlobe } from "react-icons/lu";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LOCALES: Array<{ code: Locale; label: string; short: string }> = [
	{ code: "en", label: "English", short: "EN" },
	{ code: "es", label: "Español", short: "ES" },
	{ code: "ja", label: "日本語", short: "JA" },
];

export function LanguageSwitcher({
	className,
	compact = false,
}: {
	className?: string;
	compact?: boolean;
}) {
	const currentLocale = useLocale();
	const pathname = usePathname();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const optionsId = useId();

	const activeOption =
		LOCALES.find((l) => l.code === currentLocale) ?? LOCALES[0];

	const handleSelectLocale = (code: Locale) => {
		triggerRef.current?.focus();
		if (code === currentLocale) {
			setIsOpen(false);
			return;
		}
		router.replace(pathname, { locale: code });
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				event.target instanceof Node &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div
			ref={dropdownRef}
			className={cn("relative inline-block text-left", className)}
			onBlur={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
			}}
			onKeyDown={(event) => {
				if (event.key === "Escape" && isOpen) {
					event.preventDefault();
					event.stopPropagation();
					setIsOpen(false);
					triggerRef.current?.focus();
				}
			}}
		>
			<button
				ref={triggerRef}
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				aria-expanded={isOpen}
				aria-controls={isOpen ? optionsId : undefined}
				aria-label={`Current language is ${activeOption.label}. Select language.`}
				className={cn(
					"inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[12px] font-medium tracking-wider text-white/80 transition-[background-color,border-color,color] duration-200 hover:border-orange-500/70 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
					isOpen && "border-orange-500 text-white bg-white/10",
				)}
			>
				<LuGlobe className="h-3.5 w-3.5 text-orange-400" />
				<span className="uppercase">{compact ? activeOption.short : activeOption.label}</span>
				<LuChevronDown
					className={cn(
						"h-3 w-3 text-white/50 transition-transform duration-200",
						isOpen && "rotate-180 text-orange-400",
					)}
				/>
			</button>

			{isOpen && (
				<div
					id={optionsId}
					role="group"
					aria-label="Languages"
					className="absolute right-0 z-120 pt-2 min-w-[140px] origin-top-right"
				>
					<div className="rounded-xl border border-white/12 bg-[#0d0d0d]/98 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
						{LOCALES.map((option) => {
							const isSelected = option.code === currentLocale;
							return (
								<button
									key={option.code}
									type="button"
									aria-pressed={isSelected}
									onClick={() => handleSelectLocale(option.code)}
									className={cn(
										"flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[13px] font-normal transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
										isSelected
											? "bg-orange-500/15 text-orange-400 font-medium"
											: "text-white/70 hover:bg-white/8 hover:text-white",
									)}
								>
									<span>{option.label}</span>
									<span className="flex items-center gap-1.5">
										<span className="text-[10px] uppercase tracking-wider text-white/40">
											{option.short}
										</span>
										{isSelected && <LuCheck className="h-3.5 w-3.5 text-orange-400" />}
									</span>
								</button>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
