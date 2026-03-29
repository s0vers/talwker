export type Destination = {
	id: number;
	name: string;
	country: string;
	image: string;
	price: number;
	rating: number;
	duration: string;
	tag?: string;
};

export type Tour = {
	id: number;
	title: string;
	destination: string;
	image: string;
	price: number;
	originalPrice?: number;
	duration: string;
	groupSize: string;
	rating: number;
	reviews?: number;
	highlights: string[];
};

export type Testimonial = {
	id: number;
	name: string;
	avatar: string;
	location: string;
	rating: number;
	text: string;
	trip: string;
};

export type Stat = {
	value: string;
	label: string;
};

