export function safeNextPath(raw: string | null | undefined): string | null {
	if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return null;
	return raw;
}
