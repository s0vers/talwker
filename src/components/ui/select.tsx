"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import type { SelectRootProps } from "@base-ui/react/select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Base UI Select with `modal={false}` by default so opening the list does not lock
 * body scroll (avoids layout shift / horizontal jump with scrollbar gutter).
 *
 * Typed wrapper matching Base UI’s “Typed wrapper component” pattern (`Select.Root.Props<Value, Multiple>`).
 * Use `items` on the root so `Select.Value` shows the item label; use `name` for the built-in hidden input.
 *
 * @see https://base-ui.com/react/components/select
 */
function Select<Value, Multiple extends boolean | undefined = false>({
	modal = false,
	...props
}: SelectRootProps<Value, Multiple>) {
	return <SelectPrimitive.Root<Value, Multiple> modal={modal} {...props} />;
}

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		data-slot="select-trigger"
		className={cn(
			"flex h-12 w-full min-w-0 items-center justify-between gap-2 rounded-full border border-input bg-transparent px-4 py-2 text-sm shadow-sm transition-[color,box-shadow]",
			"focus-visible:border-orange-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/25",
			"disabled:cursor-not-allowed disabled:opacity-50",
			"data-placeholder:text-muted-foreground [&>span]:line-clamp-1",
			className,
		)}
		{...props}
	>
		{children}
		<SelectPrimitive.Icon>
			<ChevronDown className="size-4 shrink-0 opacity-60" aria-hidden />
		</SelectPrimitive.Icon>
	</SelectPrimitive.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectScrollUpButton = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.ScrollUpArrow>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpArrow>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollUpArrow
		ref={ref}
		className={cn("flex cursor-default items-center justify-center py-1", className)}
		{...props}
	>
		<ChevronUp className="size-4" aria-hidden />
	</SelectPrimitive.ScrollUpArrow>
));
SelectScrollUpButton.displayName = "SelectScrollUpButton";

const SelectScrollDownButton = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.ScrollDownArrow>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownArrow>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollDownArrow
		ref={ref}
		className={cn("flex cursor-default items-center justify-center py-1", className)}
		{...props}
	>
		<ChevronDown className="size-4" aria-hidden />
	</SelectPrimitive.ScrollDownArrow>
));
SelectScrollDownButton.displayName = "SelectScrollDownButton";

type SelectContentProps = Omit<
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Popup>,
	"children"
> & {
	children?: React.ReactNode;
	/** @deprecated Base UI uses floating positioning; kept for API compatibility. */
	position?: "popper" | "item-aligned";
	side?: "top" | "bottom";
	sideOffset?: number;
};

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
	(
		{
			className,
			children,
			position = "popper",
			side = "bottom",
			sideOffset = 0,
			...popupProps
		},
		ref,
	) => (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align="start"
				alignItemWithTrigger={position === "item-aligned"}
				className="z-50 outline-none"
			>
				<SelectPrimitive.Popup
					ref={ref}
					data-slot="select-content"
					className={cn(
						"relative max-h-[min(24rem,70vh)] min-w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-3xl border bg-popover text-popover-foreground shadow-lg",
						"transition-[transform,scale,opacity] data-ending-style:scale-95ata-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
						"data-side-none:min-w-[calc(var(--anchor-width)+1rem)]",
						className,
					)}
					{...popupProps}
				>
					<SelectScrollUpButton />
					<SelectPrimitive.List className="p-1">{children}</SelectPrimitive.List>
					<SelectScrollDownButton />
				</SelectPrimitive.Popup>
			</SelectPrimitive.Positioner>
		</SelectPrimitive.Portal>
	),
);
SelectContent.displayName = "SelectContent";

const SelectLabel = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Label
		ref={ref}
		className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)}
		{...props}
	/>
));
SelectLabel.displayName = "SelectLabel";

const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Item
		ref={ref}
		data-slot="select-item"
		className={cn(
			"relative flex w-full cursor-default select-none items-center rounded-full py-2 pl-2 pr-8 text-sm outline-none",
			"data-highlighted:bg-accent data-highlighted:text-accent-foreground",
			"data-disabled:pointer-events-none data-disabled:opacity-50",
			className,
		)}
		{...props}
	>
		<span className="absolute right-2 flex size-4 items-center justify-center">
			<SelectPrimitive.ItemIndicator>
				<Check className="size-4" aria-hidden />
			</SelectPrimitive.ItemIndicator>
		</span>
		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

const SelectSeparator = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Separator
		ref={ref}
		className={cn("-mx-1 my-1 h-px bg-border pointer-events-none", className)}
		{...props}
	/>
));
SelectSeparator.displayName = "SelectSeparator";

export {
	Select,
	SelectGroup,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectLabel,
	SelectItem,
	SelectSeparator,
	SelectScrollUpButton,
	SelectScrollDownButton,
};
