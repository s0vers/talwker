export type SeoConfig = {
	title: string;
	description: string;
	path?: `/${string}` | "/";
	canonicalPath?: `/${string}` | "/";
	imagePath?: `/${string}`;
	keywords?: string[];
	index?: boolean;
	follow?: boolean;
	type?: "website" | "article";
	absoluteTitle?: boolean;
};

export type SeoBreadcrumbItem = {
	name: string;
	path: `/${string}` | "/";
};

export type SeoArticleJsonLd = {
	headline: string;
	description: string;
	path: `/${string}` | "/";
	imagePath?: `/${string}`;
	datePublished: string;
	dateModified?: string;
	authorName: string;
};

export type SeoDefaults = {
	siteName: string;
	siteUrl: string;
	defaultTitle: string;
	titleTemplate: string;
	defaultDescription: string;
	defaultImagePath: `/${string}`;
	locale: string;
	twitterCreator: string;
	defaultKeywords: string[];
	robots: {
		index: boolean;
		follow: boolean;
		googleBot: {
			index: boolean;
			follow: boolean;
			"max-image-preview": "large" | "none" | "standard";
			"max-snippet": number;
			"max-video-preview": number;
		};
	};
};
