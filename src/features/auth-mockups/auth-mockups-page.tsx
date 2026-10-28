"use client";

import type {
	AuthMockupMode,
	AuthMockupVariant
} from "@/features/auth-mockups/content/auth-mockup-copy";
import { AtlasAuth } from "@/features/auth-mockups/sections/atlas-auth";
import { PostcardAuth } from "@/features/auth-mockups/sections/postcard-auth";

export default function AuthMockupsPage({
	mode,
	variant
}: {
	mode: AuthMockupMode;
	variant: AuthMockupVariant;
}) {
	return variant === "atlas" ? (
		<AtlasAuth mode={mode} />
	) : (
		<PostcardAuth mode={mode} />
	);
}
