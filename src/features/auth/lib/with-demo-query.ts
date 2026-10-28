/** Append `demo=1` so checkout can flash auth demo messaging after return. */
export function withDemoQuery(path: string): string {
	const url = new URL(path, "https://talkwer.invalid");
	url.searchParams.set("demo", "1");
	return `${url.pathname}${url.search}${url.hash}`;
}

export const AUTH_DEMO_REDIRECT_MS = 700;
