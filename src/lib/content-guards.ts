import type {
	Destination,
	Story,
	StoryBodyBlock,
	Testimonial,
	Tour
} from "@/shared/types/domain";
import { getStoryReadMinutes } from "@/shared/lib/story-reading-time";

function isNonEmptyString(value: unknown): value is string {
	return typeof value === "string" && value.trim().length > 0;
}

function isPositiveNumber(value: unknown): value is number {
	return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function assert(condition: unknown, message: string): asserts condition {
	if (!condition) {
		throw new Error(`Invalid content module shape: ${message}`);
	}
}

export function defineDestinations(value: Destination[]): Destination[] {
	value.forEach((destination, index) => {
		assert(isPositiveNumber(destination.id), `destination[${index}].id`);
		assert(isNonEmptyString(destination.name), `destination[${index}].name`);
		assert(
			isNonEmptyString(destination.country),
			`destination[${index}].country`
		);
		assert(isNonEmptyString(destination.image), `destination[${index}].image`);
		assert(isPositiveNumber(destination.price), `destination[${index}].price`);
		assert(
			isPositiveNumber(destination.rating),
			`destination[${index}].rating`
		);
		assert(
			isNonEmptyString(destination.duration),
			`destination[${index}].duration`
		);
		if (destination.tag !== undefined) {
			assert(isNonEmptyString(destination.tag), `destination[${index}].tag`);
		}
	});

	return value;
}

export function defineTours(value: Tour[]): Tour[] {
	value.forEach((tour, index) => {
		assert(isPositiveNumber(tour.id), `tour[${index}].id`);
		assert(isNonEmptyString(tour.slug), `tour[${index}].slug`);
		assert(isNonEmptyString(tour.title), `tour[${index}].title`);
		assert(isNonEmptyString(tour.destination), `tour[${index}].destination`);
		assert(isNonEmptyString(tour.image), `tour[${index}].image`);
		assert(isPositiveNumber(tour.price), `tour[${index}].price`);
		assert(isNonEmptyString(tour.duration), `tour[${index}].duration`);
		assert(isNonEmptyString(tour.groupSize), `tour[${index}].groupSize`);
		assert(isPositiveNumber(tour.rating), `tour[${index}].rating`);
		assert(
			Array.isArray(tour.styles) && tour.styles.length > 0,
			`tour[${index}].styles`
		);
		tour.styles.forEach(style => {
			assert(isNonEmptyString(style), `tour[${index}].styles`);
		});
		assert(Array.isArray(tour.highlights), `tour[${index}].highlights`);
		assert(tour.highlights.length > 0, `tour[${index}].highlights.length`);
		tour.highlights.forEach((highlight, highlightIndex) => {
			assert(
				isNonEmptyString(highlight),
				`tour[${index}].highlights[${highlightIndex}]`
			);
		});
		assert(isNonEmptyString(tour.summary), `tour[${index}].summary`);
		assert(Array.isArray(tour.itinerary), `tour[${index}].itinerary`);
		assert(tour.itinerary.length > 0, `tour[${index}].itinerary.length`);
		tour.itinerary.forEach((day, dayIndex) => {
			assert(
				isPositiveNumber(day.day),
				`tour[${index}].itinerary[${dayIndex}].day`
			);
			assert(
				isNonEmptyString(day.title),
				`tour[${index}].itinerary[${dayIndex}].title`
			);
			assert(
				isNonEmptyString(day.body),
				`tour[${index}].itinerary[${dayIndex}].body`
			);
			assert(
				isNonEmptyString(day.image),
				`tour[${index}].itinerary[${dayIndex}].image`
			);
		});
		assert(Array.isArray(tour.includes), `tour[${index}].includes`);
		assert(tour.includes.length > 0, `tour[${index}].includes.length`);
		tour.includes.forEach((item, itemIndex) => {
			assert(isNonEmptyString(item), `tour[${index}].includes[${itemIndex}]`);
		});
		if (tour.destinationSlug !== undefined) {
			assert(
				isNonEmptyString(tour.destinationSlug),
				`tour[${index}].destinationSlug`
			);
		}
		if (tour.panelImage !== undefined) {
			assert(isNonEmptyString(tour.panelImage), `tour[${index}].panelImage`);
		}
		if (tour.originalPrice !== undefined) {
			assert(
				isPositiveNumber(tour.originalPrice),
				`tour[${index}].originalPrice`
			);
		}
		if (tour.reviews !== undefined) {
			assert(isPositiveNumber(tour.reviews), `tour[${index}].reviews`);
		}
	});

	return value;
}

export function defineTestimonials(value: Testimonial[]): Testimonial[] {
	value.forEach((testimonial, index) => {
		assert(isPositiveNumber(testimonial.id), `testimonial[${index}].id`);
		assert(isNonEmptyString(testimonial.name), `testimonial[${index}].name`);
		assert(
			isNonEmptyString(testimonial.avatar),
			`testimonial[${index}].avatar`
		);
		assert(
			isNonEmptyString(testimonial.location),
			`testimonial[${index}].location`
		);
		assert(
			isPositiveNumber(testimonial.rating),
			`testimonial[${index}].rating`
		);
		assert(isNonEmptyString(testimonial.text), `testimonial[${index}].text`);
		assert(isNonEmptyString(testimonial.trip), `testimonial[${index}].trip`);
	});

	return value;
}

function assertStoryBodyBlock(
	block: StoryBodyBlock,
	storyIndex: number,
	blockIndex: number
): void {
	const path = `story[${storyIndex}].body[${blockIndex}]`;
	assert(block && typeof block === "object" && "type" in block, `${path}.type`);

	switch (block.type) {
		case "paragraph":
		case "pullquote":
			assert(isNonEmptyString(block.text), `${path}.text`);
			break;
		case "image":
			assert(isNonEmptyString(block.src), `${path}.src`);
			assert(isNonEmptyString(block.alt), `${path}.alt`);
			break;
		default: {
			const _exhaustive: never = block;
			assert(
				false,
				`${path}: unknown block type ${JSON.stringify(_exhaustive)}`
			);
		}
	}
}

export function defineStories(value: Omit<Story, "readMinutes">[]): Story[] {
	value.forEach((story, index) => {
		assert(isPositiveNumber(story.id), `story[${index}].id`);
		assert(isNonEmptyString(story.slug), `story[${index}].slug`);
		assert(isNonEmptyString(story.title), `story[${index}].title`);
		assert(isNonEmptyString(story.dek), `story[${index}].dek`);
		assert(isNonEmptyString(story.heroImage), `story[${index}].heroImage`);
		assert(isNonEmptyString(story.author), `story[${index}].author`);
		assert(isNonEmptyString(story.location), `story[${index}].location`);
		assert(Array.isArray(story.body), `story[${index}].body`);
		assert(story.body.length > 0, `story[${index}].body.length`);
		story.body.forEach((block, blockIndex) => {
			assertStoryBodyBlock(block, index, blockIndex);
		});
		if (story.relatedDestinationSlug !== undefined) {
			assert(
				isNonEmptyString(story.relatedDestinationSlug),
				`story[${index}].relatedDestinationSlug`
			);
		}
		if (story.relatedTourId !== undefined) {
			assert(
				isPositiveNumber(story.relatedTourId),
				`story[${index}].relatedTourId`
			);
		}
	});

	return value.map(story => ({
		...story,
		readMinutes: getStoryReadMinutes(story.body)
	}));
}
