import type messages from "../../../../dictionary/en.json";

type Dictionary = typeof messages;

export type HeroCopy = Record<keyof Dictionary["Home"]["hero"], string>;
export type AboutCopy = Record<keyof Dictionary["Home"]["about"], string>;
export type CtaCopy = Record<keyof Dictionary["Home"]["cta"], string>;
export type FooterCopy = Record<keyof Dictionary["Footer"], string>;
