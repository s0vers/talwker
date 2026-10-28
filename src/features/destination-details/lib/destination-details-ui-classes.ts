/**
 * Shared Tailwind class strings for destination details (v1 narrative page).
 * Orange accents align with Talkwer shell (navbar `orange-500`, `::selection`).
 */

/** Section eyebrow / chapter label */
export const destinationDetailsKickerClass =
	"text-xs font-semibold uppercase tracking-[0.28em] text-orange-500";

/** Kicker on photos (slightly softer for small caps on imagery) */
export const destinationDetailsKickerOnImageClass =
	"text-xs font-semibold uppercase tracking-[0.28em] text-orange-500/90";

/** Chapter title: below hero, above body */
export const destinationDetailsSectionHeadingClass =
	"text-3xl font-semibold leading-[1.12] tracking-[-0.025em] text-balance md:text-4xl lg:text-5xl";

/** Closing band title (slightly smaller than main chapters) */
export const destinationDetailsCloseHeadingClass =
	"text-2xl font-semibold leading-tight tracking-tight md:text-3xl lg:text-4xl";

/** Body copy on solid dark sections */
export const destinationDetailsBodyClass =
	"max-w-prose text-sm leading-[1.7] text-white/72 md:text-base md:leading-[1.7]";

/** Body on imagery / gradients (slightly higher contrast) */
export const destinationDetailsBodyOnImageClass =
	"text-sm leading-relaxed text-white/72 md:text-base md:leading-relaxed";

/** Inset ring on image frames — subtle brand warmth without changing layout */
export const destinationDetailsFrameRingClass = "border border-white/12";

/** Collage / card frames: white edge + warm ring */
export const destinationDetailsMediaBorderClass =
	"border border-white/12";

/** Pull quote rail */
export const destinationDetailsQuoteBorderClass = "border-l-2 border-orange-500/45";

/** Field note / micro rail */
export const destinationDetailsMicroRailClass =
	"border-l border-orange-500/35 pl-3 text-[10px] font-medium uppercase tracking-[0.24em] text-orange-500/85";

/** Stat grid row accent */
export const destinationDetailsStatBorderClass = "border-t border-orange-500/20 pt-2";

/** Stat / meta label row */
export const destinationDetailsStatLabelClass =
	"text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40";
