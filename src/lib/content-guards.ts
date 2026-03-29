import type { Destination, Testimonial, Tour } from "@/shared/types/domain";

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
		assert(isNonEmptyString(destination.country), `destination[${index}].country`);
		assert(isNonEmptyString(destination.image), `destination[${index}].image`);
		assert(isPositiveNumber(destination.price), `destination[${index}].price`);
		assert(isPositiveNumber(destination.rating), `destination[${index}].rating`);
		assert(isNonEmptyString(destination.duration), `destination[${index}].duration`);
		if (destination.tag !== undefined) {
			assert(isNonEmptyString(destination.tag), `destination[${index}].tag`);
		}
	});

	return value;
}

export function defineTours(value: Tour[]): Tour[] {
	value.forEach((tour, index) => {
		assert(isPositiveNumber(tour.id), `tour[${index}].id`);
		assert(isNonEmptyString(tour.title), `tour[${index}].title`);
		assert(isNonEmptyString(tour.destination), `tour[${index}].destination`);
		assert(isNonEmptyString(tour.image), `tour[${index}].image`);
		assert(isPositiveNumber(tour.price), `tour[${index}].price`);
		assert(isNonEmptyString(tour.duration), `tour[${index}].duration`);
		assert(isNonEmptyString(tour.groupSize), `tour[${index}].groupSize`);
		assert(isPositiveNumber(tour.rating), `tour[${index}].rating`);
		assert(Array.isArray(tour.highlights), `tour[${index}].highlights`);
		assert(tour.highlights.length > 0, `tour[${index}].highlights.length`);
		tour.highlights.forEach((highlight, highlightIndex) => {
			assert(
				isNonEmptyString(highlight),
				`tour[${index}].highlights[${highlightIndex}]`,
			);
		});
		if (tour.originalPrice !== undefined) {
			assert(
				isPositiveNumber(tour.originalPrice),
				`tour[${index}].originalPrice`,
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
		assert(isNonEmptyString(testimonial.avatar), `testimonial[${index}].avatar`);
		assert(
			isNonEmptyString(testimonial.location),
			`testimonial[${index}].location`,
		);
		assert(isPositiveNumber(testimonial.rating), `testimonial[${index}].rating`);
		assert(isNonEmptyString(testimonial.text), `testimonial[${index}].text`);
		assert(isNonEmptyString(testimonial.trip), `testimonial[${index}].trip`);
	});

	return value;
}
