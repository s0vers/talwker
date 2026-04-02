import type { Destination } from "@/shared/types/domain";
import { Footer, Navbar } from "@/features/home/sections";
import { getDestinationStoryViewModel } from "./lib/story-view-model";
import {
	EditorialCompositionCoastal,
	EditorialCompositionMountain,
	StorySectionsMotion,
} from "@/features/destination-details/sections";

export type DestinationDetailsPageProps = {
	destination: Destination;
};

export default function DestinationDetailsPage({ destination }: DestinationDetailsPageProps) {
	const model = getDestinationStoryViewModel(destination);
	const StoryComposition =
		model.variant === "mountain" ? EditorialCompositionMountain : EditorialCompositionCoastal;

	return (
		<div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
			<Navbar />
			<main className="relative pb-16 md:pb-20">
				<StorySectionsMotion>
					<StoryComposition model={model} />
				</StorySectionsMotion>
			</main>
			<Footer />
		</div>
	);
}
