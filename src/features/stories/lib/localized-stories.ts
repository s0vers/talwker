import type { Story } from "@/shared/types/domain";
import { STORIES } from "../content/stories";

export type LocalizedStoryData = {
	title: string;
	dek: string;
	location: string;
	body: Story["body"];
};

export const LOCALIZED_STORIES_DATA: Record<string, Record<string, LocalizedStoryData>> = {
	es: {
		"temple-smoke-and-terrace-light": {
			title: "Humo de templos y luz de terrazas",
			dek: "Ubud no se revela en el primer circuito de templos. Espera a que el incienso se disipe y las orillas del arroz se vuelvan doradas.",
			location: "Ubud, Bali",
			body: [
				{
					type: "paragraph",
					text: "Llegamos en el calor del atardecer, cuando el aire olía a cigarrillos de clavo y piedra húmeda. Nuestro guía no nos apresuró hacia el patio de postal. Nos llevó más allá de la puerta principal, por un callejón lateral donde las ofrendas descansaban sobre taburetes de plástico y una mujer barría cenizas en una lata. Esa fue la primera imagen auténtica de Bali que guardé: no la silueta de un templo recortada en el cielo, sino el pequeño esfuerzo diario que hace posible esa silueta.",
				},
				{
					type: "paragraph",
					text: "A la segunda mañana recorrimos las terrazas de arroz antes de que llegaran las furgonetas turísticas. La niebla aún se aferraba a los bancales bajos. Un campesino nos indicó que nos apartáramos de la estrecha vereda para dejar pasar a un búfalo de agua. Esperamos. La espera se convirtió en lo esencial. La Inmersión Cultural en Bali de Talkwer prometía un ritmo abierto a la pausa; apartarse para el ganado fue la prueba de que el folleto decía la verdad.",
				},
				{
					type: "pullquote",
					text: "La isla no necesita que colecciones templos. Necesita que te fijes en quién los cuida.",
				},
				{
					type: "image",
					src: "/unsplash-culture-ritual.jpg",
					alt: "Humo de incienso elevándose junto a un altar de piedra durante un tranquilo ritual matutino",
				},
				{
					type: "paragraph",
					text: "La clase de cocina llegó a mitad de semana en una cocina familiar sobre un mercado. Compramos hierba limón a puñados y quemamos la primera tanda de sambal por hablar demasiado. Nuestra anfitriona rió, limpió el wok y nos hizo empezar de nuevo. Esa noche, cenando lo rehecho, comprendí la premisa silenciosa del viaje: la inmersión no es simple cercanía a la cultura, sino la humildad de equivocarse en el oficio ajeno y volver a intentarlo.",
				},
				{
					type: "paragraph",
					text: "En la última noche en la costa, el cielo se tiñó de rosa suave sobre la orilla sur. Nadie programó un discurso al atardecer. Nos sentamos con bebidas frías a ver a los pescadores adentrar sus barcas en la oscuridad. Me fui de Bali con menos fotos de lista y un recuerdo imborrable: el sonido de la escoba sobre la piedra, temprano, antes de que los templos se llenasen.",
				},
			],
		},
		"white-walls-after-the-cruise": {
			title: "Paredes blancas tras el crucero",
			dek: "La caldera de Santorini resuena con cada llegada. La historia serena comienza cuando zarpa el último barco y las callejuelas se vacían.",
			location: "Oia, Santorini",
			body: [
				{
					type: "paragraph",
					text: "Todos me advirtieron sobre las multitudes. Nadie me habló del silencio que las sucede. Nuestro grupo de la Odisea por las Islas Griegas presenció el apogeo del atardecer en el borde de la caldera, con los teléfonos alzados como un segundo horizonte. Luego, casi acompasadamente, los barcos se alejaron y el pueblo respiró. Las puertas azules dejaron de posar. Los gatos recuperaron los peldaños.",
				},
				{
					type: "image",
					src: "/vertical-high-angle-shot-white-buildings-santorini-greece.jpg",
					alt: "Vista cenital de las casas encaladas de Santorini escalonadas hacia el mar",
				},
				{
					type: "paragraph",
					text: "Pasamos la mañana siguiente caminando hacia el interior, lejos del borde del acantilado que todos fotografían. Una panadería vendía koulouri aún caliente. Un anciano discutía la preferencia de paso con una moto de reparto. El mito de la isla es el drama volcánico; su vida cotidiana es pan y logística. Ese contraste me acompañó mucho más que el crucero al atardecer, aunque la travesía fue hermosa y el vino generoso.",
				},
				{
					type: "pullquote",
					text: "Aquí la belleza no es escasa. La atención sí lo es.",
				},
				{
					type: "paragraph",
					text: "Más adelante en Mykonos, las playas solo nos pidieron sal y tiempo. Dejé de ver cada parada como contenido para redes. Nadé hasta que me dolieron los hombros y descansé ajeno al bullicio nocturno. Cuando me preguntan cómo fue Santorini, respondo: paredes blancas, sí, y sobre todo esa hora tras la marcha de los barcos, cuando la isla recuerda que se pertenece a sí misma.",
				},
			],
		},
		"wind-at-the-edge-of-patagonia": {
			title: "Viento en el confín de la Patagonia",
			dek: "En Torres del Paine el clima dicta el itinerario. Aprendes a caminar cuando lo permite y a esperar cuando no.",
			location: "Torres del Paine, Chile",
			body: [
				{
					type: "paragraph",
					text: "La primera ráfaga golpeó antes de que divisáramos las torres. Llegó como un empujón contra el pecho, tan gélida que hacía escocer los ojos. Nuestro guía sonrió como quien saluda a un viejo rival: «Patagonia», dijo, como si el propio viento fuera el destino. El programa de la Expedición Patagonia contaba con márgenes de tiempo; al mediodía del segundo día comprendí el porqué. Aquí los planes son meras propuestas que el clima puede vetar.",
				},
				{
					type: "paragraph",
					text: "Caminamos bajo un cielo que cambiaba constantemente de parecer: azul intenso, luego plomizo y una fina lluvia plateada que nunca llegó a cuajar. Los guanacos nos observaban desde las crestas. A lo lejos, un autobús de excursionistas dio media vuelta. Nosotros mantuvimos un ritmo más pausado: menos kilómetros, más contemplación. El lago bajo la cota de nieve guardaba un color para el que no tengo palabra exacta: un turquesa que parecía casi inventado.",
				},
				{
					type: "image",
					src: "/laguna-del-inca-lake-surrounded-by-high-mountains-covered-snow-chile.jpg",
					alt: "Lago alpino rodeado de montañas nevadas bajo el cielo despejado de la Patagonia",
				},
				{
					type: "pullquote",
					text: "Este paisaje no se conquista. Se negocia con él, hora tras hora.",
				},
				{
					type: "paragraph",
					text: "Una noche el viento cesó sin previo aviso. El grupo permaneció frente al refugio en absoluto silencio. Las estrellas aparecieron en mantos densos. Pensé en todos los relatos pulidos que retratan la Patagonia como algo épico. Épico es acertado, pero incompleto. Lo que más recuerdo es la humildad de consultar el pronóstico dos veces antes de atarse las botas, y el orgullo tranquilo de completar una jornada que el clima estuvo a punto de cancelar.",
				},
				{
					type: "paragraph",
					text: "En el traslado hacia el sur contemplé la estepa allanarse en la distancia. Me dolían las piernas. Tenía pocas fotos en la cámara. Se sentía lo correcto. Hay lugares que te piden regresar con menos trofeos y una noción más clara de tu escala en el mundo.",
				},
			],
		},
		"kyoto-before-the-gates-open": {
			title: "Kioto antes de que abran las puertas",
			dek: "Una ruta patrimonial se presta a las prisas. La mejor versión comienza en la hora gris, cuando los patios de los templos aún pertenecen a los barrenderos.",
			location: "Kioto, Japón",
			body: [
				{
					type: "paragraph",
					text: "Solía pensar que Kioto era una cuestión de sincronización: ganarle a la multitud y conseguir la foto perfecta. La Ruta del Patrimonio de Japón me enseñó que es una cuestión de actitud. Salimos del hotel antes del amanecer, caminamos por calles húmedas por la lluvia nocturna y llegamos a la primera puerta mientras los faroles guardaban los últimos vestigios de la noche. Un cuidador asintió en silencio. Sin colas. Sin empujones.",
				},
				{
					type: "pullquote",
					text: "La ciudad es generosa si llegas temprano y con las manos vacías.",
				},
				{
					type: "paragraph",
					text: "Más tarde, en un salón de té en una machiya tradicional, nuestra anfitriona corrigió cómo sostenía el cuenco sin incomodidad para ninguno de los dos. Aquí la precisión no es frialdad; es cuidado hecho visible. Entre templo y templo comimos en un puesto de mercado donde el tendero recordó nuestro pedido del día anterior. La continuidad cotidiana, y no el espectáculo, fue el hilo conductor del viaje.",
				},
				{
					type: "image",
					src: "/cherry-blossoms-spring-chureito-pagoda-fuji-mountain-japan.jpg",
					alt: "Pagoda alzándose sobre los cerezos en flor en primavera",
				},
				{
					type: "paragraph",
					text: "En el tren de regreso vi pasar los balcones de los edificios sin sentir el habitual cansancio del viaje. Kioto no había actuado para mí; yo simplemente había acompasado mi ritmo al suyo por un instante. Ese es un recuerdo mucho más valioso que cualquier grabado artesanal, aunque también compré uno, doblado con esmero en mi equipaje de mano.",
				},
			],
		},
		"aurora-above-the-falls": {
			title: "Aurora sobre las cascadas",
			dek: "Islandia en invierno es un aprendizaje de la espera: esperar al cielo despejado, a la luz verde y al valor de detenerse en el frío.",
			location: "Goðafoss, Islandia",
			body: [
				{
					type: "paragraph",
					text: "Estuvimos a punto de cancelar la ruta nocturna. Una densa capa de nubes cubría el norte y las aplicaciones del tiempo se contradecían entre sí. Nuestro guía se encogió de hombros, sirvió café en un termo y dijo que la cascada valdría la pena incluso sin luces del norte. Esa honestidad es lo que me hace confiar en un viaje. Las expectativas vacías son fáciles; la sinceridad es respeto.",
				},
				{
					type: "image",
					src: "/northern-light-aurora-borealis-godafoss-waterfall-winter-iceland.jpg",
					alt: "Luces del norte ondulando sobre una cascada congelada en el invierno de Islandia",
				},
				{
					type: "paragraph",
					text: "En Goðafoss, la bruma se congeló formando un suave brillo sobre nuestras chaquetas. La cascada rugía bajo un borde oscuro de hielo. De pronto el cielo se abrió, no de golpe, sino en lentas cintas verdes que brillaron hasta que los presentes en la orilla guardaron silencio. Alguien lloró discretamente. Yo no; simplemente olvidé que tenía las manos heladas.",
				},
				{
					type: "pullquote",
					text: "El asombro no hace ruido. Es el instante en que tus planes dejan de importar.",
				},
				{
					type: "paragraph",
					text: "De regreso en coche, la aurora se desvaneció y volvió la noche habitual. Nos reímos de lo cerca que estuvimos de quedarnos en el hotel. Islandia siempre enseña la misma lección con distinto clima: esta tierra recompensa a quienes salen incluso cuando la certeza no es total. Dormí profundamente soñando con luz verde fluyendo como agua sobre roca negra.",
				},
			],
		},
		"bougainvillea-and-the-slow-coast": {
			title: "Buganvillas y la costa pausada",
			dek: "En los acantilados de Amalfi, el verdadero lujo no es una suite con vistas. Es el permiso de tomar el camino largo entre los pueblos.",
			location: "Costa Amalfitana, Italia",
			body: [
				{
					type: "paragraph",
					text: "El autobús se aferraba al acantilado desafiando a la gravedad. Abajo, el mar Tirreno destellaba entre los túneles. Llegué esperando limoneros de postal y me marché con un anhelo diferente: el de caminar sin prisas, buscar la sombra y disfrutar de conversaciones que duraban más que el café. La Costa Amalfitana premia a quien se permite perder un ferry y tomar el siguiente.",
				},
				{
					type: "image",
					src: "/travel-europe-tourism-bougainvillea-village.jpg",
					alt: "Buganvillas color magenta desbordándose sobre una callejuela soleada del sur de Europa",
				},
				{
					type: "paragraph",
					text: "En un pueblo de la colina, las buganvillas caían sobre un muro encalado tan densas que el callejón parecía un túnel de color. Un tendero vendía peces de cerámica y se negó a envolverlos con prisa. Más abajo, las cuerdas de tender ropa cruzaban el callejón como banderas silenciosas. Nada en aquella escena estaba preparado para los turistas, y por eso mismo funcionaba a la perfección.",
				},
				{
					type: "pullquote",
					text: "La lentitud no es la ausencia de itinerario. Es la presencia de la elección.",
				},
				{
					type: "paragraph",
					text: "En nuestra última noche cenamos anchoas y bebimos algo tan frío que empañaba la copa. Las luces del acantilado se encendieron una a una. Pensé en todos los viajes que había sobrecargado de planes. Aquí el mejor acierto fue sencillo: caminar distancias más cortas, mirar durante más tiempo y dejar que la costa marcara el compás. Regresaré cuando los limones vuelvan a madurar, no para repetir fotos, sino para tomar de nuevo el camino largo.",
				},
			],
		},
	},
	ja: {
		"temple-smoke-and-terrace-light": {
			title: "寺院の線香の煙と棚田の光",
			dek: "ウブドは最初の寺院巡りではその真姿を見せません。線香の煙が薄れ、稲穂が黄金色に輝く静寂の時間を待っています。",
			location: "バリ島・ウブド",
			body: [
				{
					type: "paragraph",
					text: "チョウジ煙草と濡れた石の香りが漂う夕暮れの熱気の中、私たちは到着しました。ガイドは絵葉書のような中庭へと私たちを急がせませんでした。正門を通り過ぎ、プラスチックの腰掛けに供え物が置かれ、女性がブリキ缶に灰を掃き集める路地裏へと案内してくれたのです。それこそが私の心に残ったバリの最初の真実の姿でした。空に浮かぶ寺院のシルエットではなく、その美しさを支える日々の慎ましやかな営みでした。",
				},
				{
					type: "paragraph",
					text: "2日目の朝、ツアーバスが押し寄せる前に棚田を歩きました。朝霧がまだ低い水田に立ち込めています。水牛が細い畦道を通るため、農夫が私たちに脇へ寄るよう合図しました。私たちは立ち止まり、待ちました。その待ち時間こそが旅の本質でした。Talkwerの「バリ島・文化探訪ツアー」が約束していたのは、予期せぬ出来事を受け入れるゆとりある時間でした。家畜に道を譲る瞬間、旅のしおりが真実を語っているのだと実感しました。",
				},
				{
					type: "pullquote",
					text: "この島が求めているのは寺院を集めることではない。そこに祈りを捧げ、手入れをする人々に気づくことだ。",
				},
				{
					type: "image",
					src: "/unsplash-culture-ritual.jpg",
					alt: "静かな朝の祈りの中、石造りの祠の傍らで立ち上る線香の煙",
				},
				{
					type: "paragraph",
					text: "旅の半ば、市場の路地の上にある民家の台所で料理教室が開かれました。レモングラスを一掴み買い、おしゃべりに夢中になって最初のサンバルを焦がしてしまいました。ホストは笑いながら中華鍋を洗い、もう一度最初から作らせてくれました。その夜、作り直した料理を食べながら、この旅の静かな核心を理解しました。文化に触れるとは単に近づくことではなく、誰かの手仕事に不器用に向き合い、もう一度やり直す意志を持つことなのだと。",
				},
				{
					type: "paragraph",
					text: "南海岸で過ごす最後の夕暮れ、空は柔らかなピンク色に染まりました。夕日を前に演説する人など誰もいません。私たちは冷たい飲み物を手に、漁師たちが暗闇の海へと舟を押し出すのを静かに眺めていました。チェックリストの写真ではなく、ひとつの忘れがたい記憶を胸にバリを後にしました。寺院が人で満ちる前、早朝の石畳に響く箒の音を。",
				},
			],
		},
		"white-walls-after-the-cruise": {
			title: "クルーズ船が去った後の白い街並み",
			dek: "サントリーニのカルデラは旅人の喧騒に包まれます。しかし真の静寂は、最後の連絡船が港を離れ、路地が静まり返った時に始まります。",
			location: "サントリーニ島・イア",
			body: [
				{
					type: "paragraph",
					text: "誰もが混雑について警告してくれましたが、その後に訪れる静けさについて教えてくれた人はいませんでした。「ギリシャ諸島オデッセイツアー」の仲間と、カルデラの断崖沿いで夕暮れの混雑が最高潮に達するのを見守りました。無数のスマートフォンが第二のスカイラインのように掲げられていました。そして、合図でもあったかのように連絡船が離れ、村は深呼吸をしました。青い扉はポーズをとるのをやめ、猫たちが石段を取り戻しました。",
				},
				{
					type: "image",
					src: "/vertical-high-angle-shot-white-buildings-santorini-greece.jpg",
					alt: "海に向かって連なるサントリーニの白い家並みの俯瞰風景",
				},
				{
					type: "paragraph",
					text: "翌朝、誰もが写真を撮る崖っぷちを離れ、内陸へと歩みを進めました。ベーカリーからは焼き立てのクルリ（胡麻パン）の香りが漂い、老人が配達スクーターと道の優先権を巡って口論していました。この島の伝説は火山のドラマですが、日常の現実はパンと日々の暮らしです。そのコントラストこそが、夕暮れのクルーズ以上に心に刻まれました。",
				},
				{
					type: "pullquote",
					text: "ここに美しさが不足しているのではない。不足しているのは、立ち止まって見つめる心だ。",
				},
				{
					type: "paragraph",
					text: "その週の後半に訪れたミコノス島では、ビーチは潮風と時間以外の何も求めませんでした。すべての場所をSNSの素材として扱うのをやめました。肩が痛くなるまで泳ぎ、夜の賑わいをよそにぐっすり眠りました。サントリーニはどうだったかと尋ねられたら、私は答えます。白い壁、そして何より船が去った後のあの静かな1時間、島が本来の自分自身を取り戻すあの瞬間のことだと。",
				},
			],
		},
		"wind-at-the-edge-of-patagonia": {
			title: "パタゴニアの果てに吹く風",
			dek: "トーレス・デル・パイネでは天候が旅程を決めます。風が許せば歩き、許さなければ待つことを学びます。",
			location: "チリ・トーレス・デル・パイネ",
			body: [
				{
					type: "paragraph",
					text: "最初の突風は、岩峰を目にする前に吹き付けました。胸を突くような衝撃で、目が痛むほどの冷たさでした。ガイドは宿敵を迎えるかのように微笑み、「これがパタゴニアさ」と風そのものが目的地であるかのように言いました。「パタゴニア遠征ツアー」の日程には十分な予備時間が組み込まれていましたが、2日目の昼にはその理由がよく分かりました。ここでの計画とは、天候がいつでも却下できる単なる提案に過ぎないのです。",
				},
				{
					type: "paragraph",
					text: "澄み切った青、鉛色、そして降り注ぐ銀の雨へと、目まぐるしく表情を変える空の下を歩きました。グアナコたちが尾根からじっと見守っています。遥か遠くで日帰りバスが引き返すのが見えました。私たちは歩みを緩め、歩く距離を減らしてより深く景色を見つめました。雪線の麓に広がる湖は、言葉では言い表せないほど神秘的な青緑色を湛えていました。",
				},
				{
					type: "image",
					src: "/laguna-del-inca-lake-surrounded-by-high-mountains-covered-snow-chile.jpg",
					alt: "澄んだパタゴニアの空の下、雪山に囲まれた神秘的な山岳湖",
				},
				{
					type: "pullquote",
					text: "この大自然を征服することはできない。私たちは1時間ごとに自然と対話しているのだ。",
				},
				{
					type: "paragraph",
					text: "ある日の夕暮れ、突風が予告もなくピタリと止みました。私たちはロッジの外に立ち、言葉を失って立ち尽くしました。夜空には無数の星が濃密に輝いていました。パタゴニアを「壮大」と称賛する数々の旅行記を思い出しました。壮大であることは確かですが、それだけでは語り尽くせません。靴紐を結ぶ前に何度も天気予報を確認した謙虚さと、中止になりかけた1日を踏破した静かな誇りこそが心に残っています。",
				},
				{
					type: "paragraph",
					text: "南へと向かう車窓から、地平線へと続くステップ地帯を眺めました。足は痛み、カメラの写真の枚数は多くありませんでした。しかし、それで良かったのです。世の中には、多くの戦利品ではなく、自分自身の小ささを知る澄んだ視点を持ち帰るべき場所があるのです。",
				},
			],
		},
		"kyoto-before-the-gates-open": {
			title: "開門前の京都にて",
			dek: "歴史の道を急ぎ足で巡るのは簡単です。しかし本当の京都は、寺院の境内がまだ清掃の人々だけのものである薄明の刻に始まります。",
			location: "日本・京都",
			body: [
				{
					type: "paragraph",
					text: "かつて私は、京都観光とはタイミングの勝負だと思っていました。混雑を避け、最高の写真を撮ることだと。「日本ヘリテージトレイル」はその考え方を姿勢の問題へと変えてくれました。夜明け前にホテルを出て、夜露に濡れた小路を歩き、灯籠に最後の灯りが残る時間に最初の山門へ到着しました。庭の手入れをする方が静かに一礼してくれました。拝観券の列も、人の押し合いもありません。",
				},
				{
					type: "pullquote",
					text: "手ぶらで、そして早く訪れるなら、この街は限りなく寛大だ。",
				},
				{
					type: "paragraph",
					text: "その後、町家の茶室でお茶をいただいた際、亭主の方が私の茶碗の持ち方をそっと直してくれました。そこには気まずさなど微塵もありませんでした。ここでの厳格さとは冷たさではなく、目に見える形になった「心遣い」なのです。寺院巡りの合間には市場の屋台に立ち寄り、前日の注文を覚えていてくれた店主から買い物をしました。華やかな見せ物ではなく、日々の静かな営みの連続こそが旅の軸となりました。",
				},
				{
					type: "image",
					src: "/cherry-blossoms-spring-chureito-pagoda-fuji-mountain-japan.jpg",
					alt: "春の桜の上にそびえ立つ五重塔",
				},
				{
					type: "paragraph",
					text: "帰りの新幹線の車窓からマンションのベランダが通り過ぎるのを眺めながら、旅の後にありがちな疲労感がまったくないことに気づきました。京都は私のために演じてくれたわけではありません。私が一瞬だけその静かなリズムに寄り添えたのです。それは伝統工芸の版画以上に貴重なお土産でした。",
				},
			],
		},
		"aurora-above-the-falls": {
			title: "滝の上に舞うオーロラ",
			dek: "冬のアイスランドは「待つこと」を学ぶ旅です。晴れ間を待ち、緑の光を待ち、寒さの中でじっと立ち止まる勇気を待ちます。",
			location: "アイスランド・ゴーザフォス",
			body: [
				{
					type: "paragraph",
					text: "私たちは夜のドライブをあきらめかけるところでした。北の空は厚い雲に覆われ、天気予報アプリは意見の合わない親戚のようにばらばらでした。ガイドは肩をすくめて水筒にコーヒーを注ぎ、「光が見えなくても滝を見る価値は十分ある」と言いました。そうした誠実さこそが旅を信頼できる理由です。過度な誇張は安っぽいですが、率直さは敬意そのものです。",
				},
				{
					type: "image",
					src: "/northern-light-aurora-borealis-godafoss-waterfall-winter-iceland.jpg",
					alt: "冬のアイスランドで凍てつく滝の上に揺らめくオーロラ",
				},
				{
					type: "paragraph",
					text: "ゴーザフォスの滝に到着すると、舞い上がる水煙がジャケットの上で凍り、淡くきらめきました。氷の縁の下で轟音を立てる滝。その時、空がゆっくりと開きました。一気にではなく、緩やかな緑のリボンが広がり、川岸にいた見知らぬ旅人たち皆が言葉を失いました。誰かが静かに涙を流していました。私はただ、手がかじかんでいることさえ忘れていました。",
				},
				{
					type: "pullquote",
					text: "感動とは騒がしいものではない。自分が立てた計画などどうでもよくなる瞬間のことだ。",
				},
				{
					type: "paragraph",
					text: "帰り道、オーロラは薄れ、いつもの夜へと戻っていきました。ホテルに残ろうとしていた自分たちを笑い合いました。アイスランドは天候が変わっても同じ教訓を教えてくれます。確実な保証がなくても一歩を踏み出す者に、この島は最高の贈り物を授けてくれるのだと。その夜は、黒い岩肌の上を水のように流れる緑の光を夢見ながら深く眠りにつきました。",
				},
			],
		},
		"bougainvillea-and-the-slow-coast": {
			title: "ブーゲンビリアと緩やかな海岸線",
			dek: "アマルフィの断崖において、最高の贅沢とは眺望の良いスイートルームではありません。村と村の間をあえて遠回りして歩く自由のことです。",
			location: "イタリア・アマルフィ海岸",
			body: [
				{
					type: "paragraph",
					text: "バスは重力に抗うかのように断崖絶壁にしがみついて走っていました。眼下にはトンネルの合間からティレニア海が輝いて見えます。絵葉書のようなレモン畑を期待して訪れましたが、心に残ったのは別の渇望でした。急がずに歩くこと、木陰で休むこと、エスプレッソを飲み終えた後も続く会話を楽しむこと。アマルフィ海岸は、船を1本乗り過ごして次の船を待てるような旅人に微笑みかけてくれます。",
				},
				{
					type: "image",
					src: "/travel-europe-tourism-bougainvillea-village.jpg",
					alt: "南欧の陽光あふれる村の路地を鮮やかに彩るブーゲンビリア",
				},
				{
					type: "paragraph",
					text: "丘の上の村では、漆喰の壁からブーゲンビリアが溢れ出し、路地がまるで色彩のトンネルのようになっていました。陶器の魚を売る店主は、包装を急ぐ素振りすら見せません。その先では洗濯物が静かな旗のように路地を横切っていました。観光客向けに演出されたものは何一つなく、だからこそ心に深く響きました。",
				},
				{
					type: "pullquote",
					text: "ゆったりとした時間とは、旅程がないことではない。自分の意志で選べる自由があることだ。",
				},
				{
					type: "paragraph",
					text: "最後の夜、私たちはアンチョビをつまみながら、グラスが白く曇るほど冷えたワインを飲みました。断崖の灯りがひとつずつ灯っていきます。欲張りすぎて予定を詰め込みすぎた過去の旅の数々を思い出しました。ここでは、より良い選択はごくシンプルでした。歩く距離を短くし、長く見つめ、海岸のリズムに身を委ねること。レモンが実る季節にまた訪れたいと思います。同じ写真を撮るためではなく、もう一度遠回りを楽しむために。",
				},
			],
		},
	},
};

/**
 * Returns a story with translated title, dek, location, and body if available for the given locale.
 */
export function getLocalizedStory(story: Story, locale?: string): Story {
	if (!locale || locale === "en") return story;
	const localized = LOCALIZED_STORIES_DATA[locale]?.[story.slug];
	if (!localized) return story;

	return {
		...story,
		title: localized.title,
		dek: localized.dek,
		location: localized.location,
		body: localized.body,
	};
}

/**
 * Returns the list of stories localized for the given locale.
 */
export function getLocalizedStories(locale?: string): Story[] {
	return STORIES.map((story) => getLocalizedStory(story, locale));
}
