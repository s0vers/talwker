/** Append `demo=1` so checkout can flash auth demo messaging after return. */
export function withDemoQuery(path: string): string {
	const qIndex = path.indexOf("?");
	const pathname = qIndex === -1 ? path : path.slice(0, qIndex);
	const search = qIndex === -1 ? "" : path.slice(qIndex + 1);
	const params = new URLSearchParams(search);
	params.set("demo", "1");
	return `${pathname}?${params.toString()}`;
}

export const AUTH_DEMO_REDIRECT_MS = 700;
