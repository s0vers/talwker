"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const SERVER_SNAPSHOT = "__server__";

function subscribeStorage(onStoreChange: () => void) {
	window.addEventListener("storage", onStoreChange);
	return () => window.removeEventListener("storage", onStoreChange);
}

function getServerSnapshot() {
	return SERVER_SNAPSHOT;
}

/**
 * Read a sessionStorage key with SSR-safe hydration.
 * Cross-tab `storage` events refresh; same-tab writers should re-read after navigate.
 */
export function useSessionStorageJson<T>(
	key: string,
	parse: (raw: string) => T | null,
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
		getServerSnapshot,
	);

	const ready = raw !== SERVER_SNAPSHOT;
	const value = useMemo(() => {
		if (!ready || !raw) return null;
		return parse(raw);
	}, [ready, raw, parse]);

	return { ready, value };
}
