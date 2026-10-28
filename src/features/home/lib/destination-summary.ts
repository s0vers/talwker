import type { Destination } from "@/shared/types/domain";

export type DestinationSummary = Pick<
	Destination,
	"id" | "name" | "country" | "image" | "price" | "rating" | "duration" | "tag"
>;
