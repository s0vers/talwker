import type { Story } from "@/shared/types/domain";
import { defineStories } from "@/lib/content-guards";

export const STORIES: Story[] = defineStories([
	{
		id: 1,
		slug: "temple-smoke-and-terrace-light",
		title: "Temple smoke and terrace light",
		dek: "Ubud does not reveal itself on the first temple circuit. It waits until the incense thins and the rice edges turn gold.",
		heroImage: "/image.jpg",
		author: "Maya Chen",
		location: "Ubud, Bali",
		readMinutes: 7,
		relatedDestinationSlug: "bali-indonesia",
		relatedTourId: 1,
		body: [
			{
				type: "paragraph",
				text: "We arrived in the late heat, when the air held the smell of clove cigarettes and wet stone. Our guide did not rush us toward the postcard courtyard. He led us past the main gate, down a side lane where offerings sat on plastic stools and a woman swept ash into a tin. That was the first honest frame of Bali I kept: not the silhouette of a temple against sky, but the small labor that keeps the silhouette possible.",
			},
			{
				type: "paragraph",
				text: "On the second morning we walked the rice terraces before the tour vans stacked up. Mist still clung to the lower paddies. A farmer waved us off the narrow berm when a water buffalo needed the path. We waited. The wait became the point. Talkwer’s Bali Cultural Immersion had promised a pace that left room for interruption; standing aside for livestock felt like the brochure finally telling the truth.",
			},
			{
				type: "pullquote",
				text: "The island does not need you to collect temples. It needs you to notice who tends them.",
			},
			{
				type: "image",
				src: "/unsplash-culture-ritual.jpg",
				alt: "Incense smoke rising beside a stone shrine during a quiet morning ritual",
			},
			{
				type: "paragraph",
				text: "The cooking class came midweek in a home kitchen above a market lane. We bought lemongrass by the fistful, then burned the first batch of sambal because I talked too much. Our host laughed, reset the wok, and made us start again. That night, eating what we had remade, I understood the trip’s quiet thesis: immersion is not proximity to culture. It is the willingness to fail at someone else’s craft and try once more.",
			},
			{
				type: "paragraph",
				text: "On the last coast evening the sky went soft pink over the south shore. Nobody scheduled a sunset speech. We sat with cold drinks and watched fishermen push boats into the dark. I left Bali with fewer checklist photos and one stubborn memory: the sound of the broom on stone, early, before the temples filled.",
			},
		],
	},
	{
		id: 2,
		slug: "white-walls-after-the-cruise",
		title: "White walls after the cruise",
		dek: "Santorini’s caldera is loud with arrival. The quieter story starts when the last tender leaves and the alleys empty.",
		heroImage: "/vertical-high-angle-shot-white-buildings-santorini-greece.jpg",
		author: "Elena Vasquez",
		location: "Oia, Santorini",
		readMinutes: 6,
		relatedDestinationSlug: "santorini-greece",
		relatedTourId: 2,
		body: [
			{
				type: "paragraph",
				text: "Everyone warned me about the crowds. Nobody warned me about the silence that follows them. Our Greek Island Odyssey group watched the evening crush peak along the caldera rim, phones raised like a second skyline. Then, almost on cue, the tenders pulled away and the village exhaled. Blue doors stopped posing. Cats reclaimed the steps.",
			},
			{
				type: "image",
				src: "/vertical-high-angle-shot-white-buildings-santorini-greece.jpg",
				alt: "High-angle view of whitewashed Santorini buildings stacked toward the sea",
			},
			{
				type: "paragraph",
				text: "We spent the next morning walking inland, away from the cliff edge everyone photographs. A bakery sold still-warm koulouri. An old man argued with a delivery scooter about right of way. The island’s myth is volcanic drama; its daily life is logistics and bread. That contrast is what stayed with me longer than the sunset cruise — though the cruise was beautiful, and the wine that followed was generous.",
			},
			{
				type: "pullquote",
				text: "Beauty here is not scarce. Attention is.",
			},
			{
				type: "paragraph",
				text: "On Mykonos later in the week the beaches asked for nothing but salt and time. I stopped treating each stop as content. I swam until my shoulders ached, then slept through the early nightlife. When people ask what Santorini was like, I say: white walls, yes — and the hour after the ships leave, when the island remembers it belongs to itself.",
			},
		],
	},
	{
		id: 3,
		slug: "wind-at-the-edge-of-patagonia",
		title: "Wind at the edge of Patagonia",
		dek: "In Torres del Paine the weather writes the itinerary. You learn to walk when it allows and wait when it does not.",
		heroImage:
			"/laguna-del-inca-lake-surrounded-by-high-mountains-covered-snow-chile.jpg",
		author: "Jonah Reed",
		location: "Torres del Paine, Chile",
		readMinutes: 8,
		relatedDestinationSlug: "patagonia-chile",
		relatedTourId: 3,
		body: [
			{
				type: "paragraph",
				text: "The first gust hit before we saw the towers. It arrived as a shove against the chest, cold enough to sting the eyes. Our guide grinned like someone greeting an old rival. “Patagonia,” he said, as if the wind itself were the destination. The Patagonia Expedition schedule had buffers built in; by lunch on day two I understood why. Plans here are proposals the weather can veto.",
			},
			{
				type: "paragraph",
				text: "We hiked under a sky that kept changing its mind — hard blue, then slate, then a brief silver rain that never quite committed. Guanacos watched from the ridgelines. Somewhere far off, a bus of day-trippers turned back. We kept a slower tempo: fewer miles, more looking. The lake below the snow line held a color I do not have a reliable word for — teal that felt almost invented.",
			},
			{
				type: "image",
				src: "/laguna-del-inca-lake-surrounded-by-high-mountains-covered-snow-chile.jpg",
				alt: "Alpine lake ringed by snow-covered mountains under a clear Patagonian sky",
			},
			{
				type: "pullquote",
				text: "You do not conquer this landscape. You negotiate with it, hour by hour.",
			},
			{
				type: "paragraph",
				text: "One evening the wind dropped without warning. The group stood outside the lodge saying almost nothing. Stars arrived in dense fields. I thought about all the polished travel writing that frames Patagonia as epic. Epic is accurate, but incomplete. What I remember most is the humility of checking the forecast twice before lacing boots, and the quiet pride of finishing a day the weather almost canceled.",
			},
			{
				type: "paragraph",
				text: "On the transfer south I watched the steppe flatten into distance. My legs hurt. My camera roll was thin. That felt correct. Some places ask you to return with fewer trophies and a clearer sense of scale.",
			},
		],
	},
	{
		id: 4,
		slug: "kyoto-before-the-gates-open",
		title: "Kyoto before the gates open",
		dek: "A heritage trail is easy to rush. The better version starts in the gray hour when temple courtyards still belong to the sweepers.",
		heroImage:
			"/cherry-blossoms-spring-chureito-pagoda-fuji-mountain-japan.jpg",
		author: "Aiko Tanaka",
		location: "Kyoto, Japan",
		readMinutes: 6,
		relatedDestinationSlug: "kyoto-japan",
		relatedTourId: 4,
		body: [
			{
				type: "paragraph",
				text: "I used to think Kyoto was a problem of timing — beat the crowds, win the photograph. The Japan Heritage Trail reframed it as a problem of posture. We left the hotel before dawn, walked streets still wet from overnight rain, and reached the first gate while the lanterns held the last of the night. A groundskeeper nodded once. No ticket line. No choreography of elbows.",
			},
			{
				type: "pullquote",
				text: "The city is generous if you arrive empty-handed and early.",
			},
			{
				type: "paragraph",
				text: "Later, in a machiya tearoom, our host corrected my grip on the bowl without embarrassment for either of us. Precision here is not cold; it is care made visible. Between temples we ate from a market stall where the vendor remembered our order from the day before. Continuity, not spectacle, became the trip’s through-line.",
			},
			{
				type: "image",
				src: "/cherry-blossoms-spring-chureito-pagoda-fuji-mountain-japan.jpg",
				alt: "Pagoda rising above spring cherry blossoms with Mount Fuji on the horizon",
			},
			{
				type: "paragraph",
				text: "On the train out I watched apartment balconies flicker past and felt none of the usual travel hangover. Kyoto had not performed for me. I had briefly matched its tempo. That is a rarer souvenir than any print from the craft district — though I bought one of those, too, folded carefully into my carry-on.",
			},
		],
	},
	{
		id: 5,
		slug: "aurora-above-the-falls",
		title: "Aurora above the falls",
		dek: "Iceland in winter is a study in waiting: for clear sky, for green light, for the courage to stand still in the cold.",
		heroImage:
			"/northern-light-aurora-borealis-godafoss-waterfall-winter-iceland.jpg",
		author: "Sofia Bergman",
		location: "Goðafoss, Iceland",
		readMinutes: 7,
		relatedDestinationSlug: "iceland-iceland",
		body: [
			{
				type: "paragraph",
				text: "We nearly skipped the night drive. Cloud cover sat thick over the north, and the forecast apps disagreed with each other like quarreling uncles. Our guide shrugged, poured coffee into a thermos, and said the falls would be worth it even without the lights. Honesty like that is why I trust a trip. Hype is cheap. Contingency is respect.",
			},
			{
				type: "image",
				src: "/northern-light-aurora-borealis-godafoss-waterfall-winter-iceland.jpg",
				alt: "Northern lights curling above a frozen waterfall in winter Iceland",
			},
			{
				type: "paragraph",
				text: "At Goðafoss the mist froze into a soft glitter on our jackets. The waterfall roared under a dark rim of ice. Then the sky tore open — not all at once, but in slow green ribbons that brightened until strangers on the bank stopped speaking. Someone cried quietly. I did not. I just forgot my hands were cold.",
			},
			{
				type: "pullquote",
				text: "Wonder is not loud. It is the moment your plans stop mattering.",
			},
			{
				type: "paragraph",
				text: "Driving back, the aurora faded and the ordinary night returned. We laughed about how close we had come to staying in. Iceland keeps teaching the same lesson in different weather: the island rewards people who leave the hotel when certainty is incomplete. I slept hard that night, dreaming of green light moving like water above black rock.",
			},
		],
	},
	{
		id: 6,
		slug: "bougainvillea-and-the-slow-coast",
		title: "Bougainvillea and the slow coast",
		dek: "Along the Amalfi cliffs, the luxury is not a suite with a view. It is permission to take the long way between villages.",
		heroImage: "/low-angle-shot-buildings-houses-amalfi-coast-captured-italy.jpg",
		author: "Marco Bellini",
		location: "Amalfi Coast, Italy",
		readMinutes: 5,
		relatedDestinationSlug: "amalfi-coast-italy",
		body: [
			{
				type: "paragraph",
				text: "The bus clung to the cliff like it had opinions about gravity. Below, the Tyrrhenian flashed between tunnel mouths. I had come expecting postcard lemon groves and left with a different hunger: for unhurried walking, for shade, for conversations that outlasted the espresso. The Amalfi Coast rewards anyone willing to miss a ferry and take the next one.",
			},
			{
				type: "image",
				src: "/travel-europe-tourism-bougainvillea-village.jpg",
				alt: "Magenta bougainvillea spilling over a sunlit village lane in southern Europe",
			},
			{
				type: "paragraph",
				text: "In a hillside village, bougainvillea poured over a plaster wall so thick the lane felt like a tunnel of color. A shopkeeper sold ceramic fish and refused to hurry the wrapping. Farther down, laundry lines crossed the alley like quiet flags. Nothing about the scene was curated for visitors, which is exactly why it worked.",
			},
			{
				type: "pullquote",
				text: "Slowness is not the absence of itinerary. It is the presence of choice.",
			},
			{
				type: "paragraph",
				text: "On our last evening we ate anchovies and drank something cold enough to fog the glass. The cliff lights came on one by one. I thought of all the trips I have overpacked with ambition. Here, the better move was simple: walk less far, look longer, let the coast set the tempo. I will come back when the lemons are heavy again — not to collect the same photos, but to take the long way once more.",
			},
		],
	},
]);
