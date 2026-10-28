import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonWithIconProps = {
	children: ReactNode;
	href?: string;
	onClick?: () => void;
	className?: string;
	variant?: "orange" | "dark" | "outline";
	size?: "default" | "sm" | "lg";
	icon?: ReactNode;
	type?: "button" | "submit" | "reset";
};

const variantStyles = {
	orange: {
		button:
			"bg-orange-500 text-[#0a0a0a] shadow-lg shadow-orange-500/25 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/35",
		badge: "bg-white text-[#0a0a0a]"
	},
	dark: {
		button:
			"bg-[#141414] text-white border border-white/15 hover:border-orange-500/50 hover:bg-[#1c1c1c] shadow-lg shadow-black/40",
		badge: "bg-orange-500 text-[#0a0a0a]"
	},
	outline: {
		button:
			"bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5",
		badge: "bg-white text-[#0a0a0a]"
	}
};

const sizeStyles = {
	sm: {
		button: "h-10 py-1 pl-5 pr-12 text-[11px] uppercase tracking-[0.14em]",
		badge:
			"w-7.5 h-7.5 right-1 group-hover:right-[calc(100%-34px)] motion-reduce:group-hover:right-1",
		textShift:
			"group-hover:translate-x-6 motion-reduce:group-hover:translate-x-0",
		iconSize: 13
	},
	default: {
		button: "h-12 py-1 pl-6 pr-14 text-[12px] uppercase tracking-[0.16em]",
		badge:
			"w-9.5 h-9.5 right-1.5 group-hover:right-[calc(100%-44px)] motion-reduce:group-hover:right-1.5",
		textShift:
			"group-hover:translate-x-7 motion-reduce:group-hover:translate-x-0",
		iconSize: 15
	},
	lg: {
		button: "h-14 py-1 pl-7 pr-16 text-[13px] uppercase tracking-[0.18em]",
		badge:
			"w-11 h-11 right-1.5 group-hover:right-[calc(100%-50px)] motion-reduce:group-hover:right-1.5",
		textShift:
			"group-hover:translate-x-8 motion-reduce:group-hover:translate-x-0",
		iconSize: 17
	}
};

export function ButtonWithIcon({
	children,
	href,
	onClick,
	className,
	variant = "orange",
	size = "default",
	icon,
	type = "button"
}: ButtonWithIconProps) {
	const currentVariant = variantStyles[variant];
	const currentSize = sizeStyles[size];

	const content = (
		<>
			<span
				className={cn(
					"relative z-10 font-semibold whitespace-nowrap transition-transform duration-500 ease-out motion-reduce:transition-none",
					currentSize.textShift
				)}
			>
				{children}
			</span>
			<div
				className={cn(
					"absolute flex items-center justify-center rounded-full shadow-sm transition-[right,transform] duration-500 ease-out group-hover:rotate-45 motion-reduce:transition-none motion-reduce:group-hover:rotate-0",
					currentVariant.badge,
					currentSize.badge
				)}
			>
				{icon ?? (
					<ArrowUpRight
						size={currentSize.iconSize}
						className="transition-transform duration-500 motion-reduce:transition-none"
					/>
				)}
			</div>
		</>
	);

	const baseClassName = cn(
		"relative group inline-flex items-center font-medium rounded-full w-fit overflow-hidden cursor-pointer transition-[background-color,border-color,box-shadow,transform] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-[0.96] motion-reduce:active:scale-100 motion-reduce:transition-none transform-gpu",
		currentVariant.button,
		currentSize.button,
		className
	);

	if (href) {
		if (href.startsWith("#")) {
			return (
				<a href={href} className={baseClassName} onClick={onClick}>
					{content}
				</a>
			);
		}
		return (
			<Link href={href} className={baseClassName} onClick={onClick}>
				{content}
			</Link>
		);
	}

	return (
		<button type={type} onClick={onClick} className={baseClassName}>
			{content}
		</button>
	);
}
