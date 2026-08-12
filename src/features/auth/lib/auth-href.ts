export function authHref(path: "/login" | "/register", next: string | null) {
	if (!next) return path;
	return `${path}?next=${encodeURIComponent(next)}`;
}
