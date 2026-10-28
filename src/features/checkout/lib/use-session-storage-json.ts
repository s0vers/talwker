"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

function subscribeStorage(onStoreChange: () => void) {
	window.addEventListener("storage", onStoreChange);
	return () => window.removeEventListener("storage", onStoreChange);
}

function getServerSnapshot() {
	return undefined;
}

/**
 * Read a sessionStorage key with SSR-safe hydration.
 * Session storage is scoped to a tab; same-document writes are read on navigation.
 */
export function useSessionStorageJson<T>(
	key: string,
	parse: (raw: string) => T | null
): { ready: boolean; value: T | null } {
	const getSnapshot = useCallback(() => {
		try {
			return sessionStorage.getItem(key);
		} catch {
			return null;
		}
	}, [key]);

	const raw = useSyncExternalStore(
		subscribeStorage,
		getSnapshot,
		getServerSnapshot
	);

	const ready = raw !== undefined;
	const value = useMemo(() => {
		if (!ready || !raw) return null;
		return parse(raw);
	}, [ready, raw, parse]);

	return { ready, value };
}
