export type AuthMockupVariant = "atlas" | "postcard";
export type AuthMockupMode = "login" | "register";

export const AUTH_CONCEPT_PATHS = {
	original: { login: "/login", register: "/register" },
	atlas: { login: "/login-2", register: "/register-2" },
	postcard: { login: "/login-3", register: "/register-3" }
} as const;

const copy = {
	en: {
		atlas: {
			eyebrow: "THE TRAVELER ATLAS / 02",
			headline: "Every journey begins somewhere.",
			intro:
				"Keep your plans, places, and possibilities in one thoughtful space.",
			location: "PATAGONIA · 50°56′ S",
			aside: "Collect moments. Find your way back to them.",
			formIntro: "Your next chapter starts here."
		},
		postcard: {
			eyebrow: "POSTCARDS FROM ELSEWHERE / 03",
			headline: "Go where the story takes you.",
			intro: "The world is wide. Make room for the moments that stay with you.",
			location: "NORWAY · 69°39′ N",
			aside: "A field note from the edge of the map.",
			formIntro: "Keep the journey close."
		}
	},
	es: {
		atlas: {
			eyebrow: "EL ATLAS DEL VIAJERO / 02",
			headline: "Todo viaje comienza en algún lugar.",
			intro: "Guarda tus planes, lugares y posibilidades en un espacio propio.",
			location: "PATAGONIA · 50°56′ S",
			aside: "Colecciona momentos. Encuentra el camino de vuelta.",
			formIntro: "Tu próximo capítulo empieza aquí."
		},
		postcard: {
			eyebrow: "POSTALES DE OTROS LUGARES / 03",
			headline: "Ve donde te lleve la historia.",
			intro: "El mundo es inmenso. Haz sitio para los momentos que perduran.",
			location: "NORUEGA · 69°39′ N",
			aside: "Una nota desde el borde del mapa.",
			formIntro: "Mantén tu viaje cerca."
		}
	},
	ja: {
		atlas: {
			eyebrow: "旅人のアトラス / 02",
			headline: "すべての旅には、始まりがある。",
			intro: "計画も、場所も、まだ見ぬ可能性も。自分だけの場所に。",
			location: "パタゴニア · 南緯50°56′",
			aside: "瞬間を集め、いつでもそこへ戻ろう。",
			formIntro: "次の物語を、ここから。"
		},
		postcard: {
			eyebrow: "遠くからの絵葉書 / 03",
			headline: "物語が導く場所へ。",
			intro: "世界は広い。心に残る瞬間のために、余白をつくろう。",
			location: "ノルウェー · 北緯69°39′",
			aside: "地図の端から届いた旅の記録。",
			formIntro: "旅の記憶をいつもそばに。"
		}
	}
} as const;

export function getAuthMockupCopy(locale: string, variant: AuthMockupVariant) {
	const language = locale === "es" || locale === "ja" ? locale : "en";
	return copy[language][variant];
}
