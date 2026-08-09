import type { Destination } from "@/shared/types/domain";
import { DESTINATIONS } from "@/features/home/content/destinations";

/** Editorial home tease — Bali (Popular), Santorini (Trending), Kyoto (New), Maldives (Luxury). */
export const FEATURED_DESTINATION_IDS = [1, 2, 4, 6] as const;

export function getFeaturedDestinations(
	catalog: readonly Destination[] = DESTINATIONS,
): Destination[] {
	const byId = new Map(catalog.map((d) => [d.id, d]));
	const featured = FEATURED_DESTINATION_IDS.map((id) => {
		const dest = byId.get(id);
		if (!dest) {
			throw new Error(`Featured destination id ${id} missing from DESTINATIONS`);
		}
		return dest;
	});
	if (featured.length !== 4) {
		throw new Error("Home destinations tease requires exactly 4 featured destinations");
	}
	return featured;
}
