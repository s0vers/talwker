import type { Metadata } from "next";
import type {
	SeoArticleJsonLd,
	SeoBreadcrumbItem,
	SeoConfig,
	SeoDefaults,
} from "@/shared/types/seo";

/** Default when `NEXT_PUBLIC_SITE_URL` is unset (e.g. local / preview). Production: https://talwker.vercel.app */
const FALLBACK_SITE_URL = "https://talwker.vercel.app";

function normalizeSiteUrl(url: string): string {
	return url.endsWith("/") ? url.slice(0, -1) : url;
}

export const SEO_DEFAULTS: SeoDefaults = {
	siteName: "Talkwer",
	siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL),
	defaultTitle: "Talkwer — Wander. Discover. Share.",
	titleTemplate: "%s | Talkwer",
	defaultDescription:
		"A modern travel platform for the curious soul. Discover destinations, curated tours, and stories from fellow wanderers.",
	defaultImagePath: "/image.jpg",
	locale: "en_US",
	twitterCreator: "@talkwer",
	defaultKeywords: [
		"travel inspiration",
		"travel magazine",
		"curated tours",
		"destination stories",
		"travel experiences",
	],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
};

export function resolveCanonicalUrl(path = "/"): string {
	const normalizedPath = path === "/" ? path : `/${path.replace(/^\/+/, "")}`;
	return `${SEO_DEFAULTS.siteUrl}${normalizedPath}`;
}

export function createPageMetadata(config: SeoConfig): Metadata {
	const {
		title,
		description,
		path = "/",
		canonicalPath,
		imagePath = SEO_DEFAULTS.defaultImagePath,
		keywords = SEO_DEFAULTS.defaultKeywords,
		index = true,
		follow = true,
		type = "website",
		absoluteTitle = false,
		locale = "en",
	} = config;

	const targetPath = canonicalPath ?? path;
	const cleanPath = targetPath === "/" ? "" : targetPath.startsWith("/") ? targetPath : `/${targetPath}`;
	const canonicalUrl = resolveCanonicalUrl(
		locale === "en" ? `${cleanPath || "/"}` : `/${locale}${cleanPath}`,
	);
	const imageUrl = resolveCanonicalUrl(imagePath);

	return {
		title: absoluteTitle ? { absolute: title } : title,
		description,
		keywords,
		alternates: {
			canonical: canonicalUrl,
			languages: {
				en: resolveCanonicalUrl(cleanPath || "/"),
				es: resolveCanonicalUrl(`/es${cleanPath}`),
				ja: resolveCanonicalUrl(`/ja${cleanPath}`),
			},
		},
		robots: {
			...SEO_DEFAULTS.robots,
			index,
			follow,
			googleBot: {
				index,
				follow,
				"max-image-preview": "large",
				"max-snippet": -1,
				"max-video-preview": -1,
			},
		},
		openGraph: {
			type,
			url: canonicalUrl,
			title,
			description,
			siteName: SEO_DEFAULTS.siteName,
			locale: locale === "es" ? "es_ES" : locale === "ja" ? "ja_JP" : "en_US",
			images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			creator: SEO_DEFAULTS.twitterCreator,
			images: [imageUrl],
		},
	};
}

export function createBaseMetadata(): Metadata {
	return {
		metadataBase: new URL(SEO_DEFAULTS.siteUrl),
		title: {
			default: SEO_DEFAULTS.defaultTitle,
			template: SEO_DEFAULTS.titleTemplate,
		},
		description: SEO_DEFAULTS.defaultDescription,
		applicationName: SEO_DEFAULTS.siteName,
		category: "travel",
		alternates: {
			canonical: resolveCanonicalUrl("/"),
			languages: {
				en: resolveCanonicalUrl("/"),
				es: resolveCanonicalUrl("/es"),
				ja: resolveCanonicalUrl("/ja"),
			},
		},
		robots: SEO_DEFAULTS.robots,
		openGraph: {
			type: "website",
			url: resolveCanonicalUrl("/"),
			title: SEO_DEFAULTS.defaultTitle,
			description: SEO_DEFAULTS.defaultDescription,
			siteName: SEO_DEFAULTS.siteName,
			locale: SEO_DEFAULTS.locale,
			images: [
				{
					url: resolveCanonicalUrl(SEO_DEFAULTS.defaultImagePath),
					width: 1200,
					height: 630,
					alt: SEO_DEFAULTS.defaultTitle,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: SEO_DEFAULTS.defaultTitle,
			description: SEO_DEFAULTS.defaultDescription,
			creator: SEO_DEFAULTS.twitterCreator,
			images: [resolveCanonicalUrl(SEO_DEFAULTS.defaultImagePath)],
		},
	};
}

export function getOrganizationJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: SEO_DEFAULTS.siteName,
		url: SEO_DEFAULTS.siteUrl,
		logo: resolveCanonicalUrl("/favicon.ico"),
		sameAs: [],
	};
}

export function getWebsiteJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: SEO_DEFAULTS.siteName,
		url: SEO_DEFAULTS.siteUrl,
		description: SEO_DEFAULTS.defaultDescription,
		inLanguage: "en",
	};
}

export function getBreadcrumbJsonLd(items: SeoBreadcrumbItem[]) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: resolveCanonicalUrl(item.path),
		})),
	};
}

export function getArticleJsonLd(article: SeoArticleJsonLd) {
	const imagePath = article.imagePath ?? SEO_DEFAULTS.defaultImagePath;
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		mainEntityOfPage: resolveCanonicalUrl(article.path),
		headline: article.headline,
		description: article.description,
		image: [resolveCanonicalUrl(imagePath)],
		datePublished: article.datePublished,
		dateModified: article.dateModified ?? article.datePublished,
		author: {
			"@type": "Person",
			name: article.authorName,
		},
		publisher: {
			"@type": "Organization",
			name: SEO_DEFAULTS.siteName,
			logo: {
				"@type": "ImageObject",
				url: resolveCanonicalUrl("/favicon.ico"),
			},
		},
	};
}
