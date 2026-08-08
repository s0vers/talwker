"use client";

import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

type AccordionContextValue = {
	value?: string | string[];
	type?: "single" | "multiple";
	collapsible?: boolean;
	onValueChange?: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue>({});

export interface AccordionSingleProps {
	type?: "single";
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	collapsible?: boolean;
	children: React.ReactNode;
	className?: string;
}

export function Accordion({
	type = "single",
	value: valueProp,
	defaultValue,
	onValueChange,
	collapsible = true,
	children,
	className,
}: AccordionSingleProps) {
	const [value, setValue] = React.useState<string>(valueProp ?? defaultValue ?? "");

	const handleValueChange = React.useCallback(
		(itemValue: string) => {
			const nextValue = value === itemValue && collapsible ? "" : itemValue;
			setValue(nextValue);
			onValueChange?.(nextValue);
		},
		[value, collapsible, onValueChange],
	);

	const currentValue = valueProp !== undefined ? valueProp : value;

	return (
		<AccordionContext.Provider
			value={{
				value: currentValue,
				type,
				collapsible,
				onValueChange: handleValueChange,
			}}
		>
			<div className={cn("space-y-1", className)}>{children}</div>
		</AccordionContext.Provider>
	);
}

type AccordionItemContextValue = {
	value: string;
	isOpen: boolean;
};

const AccordionItemContext = React.createContext<AccordionItemContextValue>({
	value: "",
	isOpen: false,
});

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
	value: string;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
	({ className, value, children, ...props }, ref) => {
		const { value: selectedValue } = React.useContext(AccordionContext);
		const isOpen = Array.isArray(selectedValue)
			? selectedValue.includes(value)
			: selectedValue === value;

		return (
			<AccordionItemContext.Provider value={{ value, isOpen }}>
				<div
					ref={ref}
					className={cn("border-b border-white/10", className)}
					data-state={isOpen ? "open" : "closed"}
					{...props}
				>
					{children}
				</div>
			</AccordionItemContext.Provider>
		);
	},
);
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
	const { onValueChange } = React.useContext(AccordionContext);
	const { value, isOpen } = React.useContext(AccordionItemContext);

	return (
		<h3 className="flex">
			<button
				ref={ref}
				type="button"
				onClick={() => onValueChange?.(value)}
				className={cn(
					"flex flex-1 items-center justify-between py-5 text-left text-base font-semibold transition-all hover:text-orange-500 [&[data-state=open]>svg]:rotate-180",
					className,
				)}
				data-state={isOpen ? "open" : "closed"}
				aria-expanded={isOpen}
				{...props}
			>
				{children}
				<ChevronDownIcon className="h-5 w-5 shrink-0 text-white/50 transition-transform duration-200" />
			</button>
		</h3>
	);
});
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
	const { isOpen } = React.useContext(AccordionItemContext);

	if (!isOpen) return null;

	return (
		<div
			ref={ref}
			className={cn(
				"overflow-hidden pb-5 text-sm leading-relaxed text-white/60 animate-in fade-in-0 slide-in-from-top-1 duration-200",
				className,
			)}
			data-state={isOpen ? "open" : "closed"}
			{...props}
		>
			{children}
		</div>
	);
});
AccordionContent.displayName = "AccordionContent";
