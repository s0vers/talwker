"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import parsePhoneNumberFromString, {
	AsYouType,
	type CarrierCode,
	type CountryCallingCode,
	type CountryCode,
	type E164Number,
	type NationalNumber,
	type NumberType,
} from "libphonenumber-js";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { type PhoneCountry, countries } from "./countries";
import { useStateHistory } from "./use-state-history";

export type Country = PhoneCountry;

export type PhoneData = {
	phoneNumber?: E164Number;
	countryCode?: CountryCode;
	countryCallingCode?: CountryCallingCode;
	carrierCode?: CarrierCode;
	nationalNumber?: NationalNumber;
	internationalNumber?: string;
	possibleCountries?: string;
	isValid?: boolean;
	isPossible?: boolean;
	uri?: string;
	type?: NumberType;
};

interface PhoneInputProps extends React.ComponentPropsWithoutRef<"input"> {
	value?: string;
	defaultCountry?: CountryCode;
}

export function getPhoneData(phone: string): PhoneData {
	const asYouType = new AsYouType();
	asYouType.input(phone);
	const number = asYouType.getNumber();
	return {
		phoneNumber: number?.number,
		countryCode: number?.country,
		countryCallingCode: number?.countryCallingCode,
		carrierCode: number?.carrierCode,
		nationalNumber: number?.nationalNumber,
		internationalNumber: number?.formatInternational(),
		possibleCountries: number?.getPossibleCountries().join(", "),
		isValid: number?.isValid(),
		isPossible: number?.isPossible(),
		uri: number?.getURI(),
		type: number?.getType(),
	};
}

export function PhoneInput({
	value: valueProp,
	defaultCountry = "US",
	className,
	id,
	required = true,
	...rest
}: PhoneInputProps) {
	const asYouType = new AsYouType();
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [value, handlers, history] = useStateHistory(valueProp);
	const [query, setQuery] = React.useState("");

	let resolvedDefaultCountry = defaultCountry;
	if (value && value.length > 0) {
		resolvedDefaultCountry =
			parsePhoneNumberFromString(value)?.getPossibleCountries()[0] ||
			defaultCountry;
	}

	const [openCommand, setOpenCommand] = React.useState(false);
	const [countryCode, setCountryCode] =
		React.useState<CountryCode>(resolvedDefaultCountry);

	const selectedCountry = countries.find(
		(country) => country.iso2 === countryCode,
	);

	const filteredCountries = React.useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return countries;
		return countries.filter(
			(country) =>
				country.name.toLowerCase().includes(q) ||
				country.phone_code.includes(q) ||
				country.iso2.toLowerCase().includes(q),
		);
	}, [query]);

	const initializeDefaultValue = () => {
		if (value) return value;
		return `+${selectedCountry?.phone_code}`;
	};

	const handleOnInput = (event: React.FormEvent<HTMLInputElement>) => {
		asYouType.reset();

		let next = event.currentTarget.value;
		if (!next.startsWith("+")) {
			next = `+${next}`;
		}

		const formattedValue = asYouType.input(next);
		const number = asYouType.getNumber();
		setCountryCode(number?.country || resolvedDefaultCountry);
		event.currentTarget.value = formattedValue;
		handlers.set(formattedValue);
	};

	const handleOnPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
		event.preventDefault();
		asYouType.reset();

		const clipboardData = event.clipboardData;
		if (clipboardData) {
			const pastedData = clipboardData.getData("text/plain");
			const formattedValue = asYouType.input(pastedData);
			const number = asYouType.getNumber();
			setCountryCode(number?.country || resolvedDefaultCountry);
			event.currentTarget.value = formattedValue;
			handlers.set(formattedValue);
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if ((event.metaKey || event.ctrlKey) && event.key === "z") {
			handlers.back();
			if (
				inputRef.current &&
				history.current > 0 &&
				history.history[history.current - 1] !== undefined
			) {
				event.preventDefault();
				inputRef.current.value = history.history[history.current - 1] || "";
			}
		}
	};

	return (
		<div className={cn("flex gap-2", className)}>
			<Popover open={openCommand} onOpenChange={setOpenCommand} modal={true}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={openCommand}
						className="w-max items-center justify-between whitespace-nowrap border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
					>
						{selectedCountry?.name ? (
							<span className="relative top-0.5">{selectedCountry.emoji}</span>
						) : (
							"Select country"
						)}
						<ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-max border-white/10 bg-[#0a0a0a] p-0 text-white"
					align="start"
				>
					<div className="border-b border-white/10 p-2">
						<Input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search country..."
							className="h-9 rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/35"
						/>
					</div>
					<ScrollArea className="h-[300px]">
						<ul className="p-1">
							{filteredCountries.length === 0 ? (
								<li className="px-3 py-2 text-sm text-white/50">
									No country found.
								</li>
							) : (
								filteredCountries.map((country) => (
									<li key={country.iso3}>
										<button
											type="button"
											className={cn(
												"flex w-full items-center rounded-lg px-2 py-1.5 text-left text-sm text-white hover:bg-white/10",
											)}
											onClick={() => {
												if (inputRef.current) {
													inputRef.current.value = `+${country.phone_code}`;
													handlers.set(`+${country.phone_code}`);
													inputRef.current.focus();
												}
												setCountryCode(country.iso2 as CountryCode);
												setOpenCommand(false);
												setQuery("");
											}}
										>
											<Check
												className={cn(
													"mr-2 size-4",
													countryCode === country.iso2
														? "opacity-100"
														: "opacity-0",
												)}
											/>
											<span className="mr-2">{country.emoji}</span>
											{country.name}
											<span className="ml-1 text-white/50">
												(+{country.phone_code})
											</span>
										</button>
									</li>
								))
							)}
						</ul>
					</ScrollArea>
				</PopoverContent>
			</Popover>
			<Input
				ref={inputRef}
				type="text"
				pattern="^(\+)?[0-9\s]*$"
				name="phone"
				id={id}
				placeholder="Phone"
				defaultValue={initializeDefaultValue()}
				onInput={handleOnInput}
				onPaste={handleOnPaste}
				onKeyDown={handleKeyDown}
				required={required}
				aria-required={required}
				className="rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/35"
				{...rest}
			/>
		</div>
	);
}
