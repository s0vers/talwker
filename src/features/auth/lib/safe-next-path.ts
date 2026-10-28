export function safeNextPath(raw: string | null | undefined): string | null {
	if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return null;
	// Browsers normalize backslashes and strip control characters in URLs.
	if (/[\\\u0000-\u0020\u007f]/.test(raw)) return null;
	const base = "https://talkwer.invalid";
	try {
		const url = new URL(raw, base);
		if (url.origin !== base || url.pathname.startsWith("//")) return null;
		return `${url.pathname}${url.search}${url.hash}`;
	} catch {
		return null;
	}
}
