const SKILLS = [
  'mental-math',
  'persuasive-speaking',
  'financial-literacy',
  'creative-problem-solving',
  'emotional-intelligence',
]

// t=title d=description q=question a=answers(null = open-ended)
const CHALLENGES = {
  'mental-math': {
    en: [
      { t: 'Market Change Master', d: 'You are at the market helping Mama sell oranges.', q: 'You buy 3 biscuits at ₦150 each and pay with ₦500. What is your change?', a: [{ id: 'a', text: '₦50', correct: true }, { id: 'b', text: '₦100', correct: false }, { id: 'c', text: '₦150', correct: false }, { id: 'd', text: '₦200', correct: false }] },
      { t: 'Double Trouble', d: 'Quick! Your friends are waiting to see how fast you are.', q: 'What is 7 + 8 doubled? Type your answer!', a: null },
      { t: 'Sharing Fairly', d: 'You and 2 friends bought a big cake together.', q: 'If the cake costs ₦1,200, how much does each person pay?', a: [{ id: 'a', text: '₦300', correct: false }, { id: 'b', text: '₦400', correct: true }, { id: 'c', text: '₦600', correct: false }, { id: 'd', text: '₦1,200', correct: false }] },
    ],
    yo: [
      { t: 'Ọgá Ìsirọ́ Ọjà', d: 'O wà ní ọjà ṣìíràn ìyá láti tàjìrẹ̀.', q: 'O ra bísíḳítì 3 ní ₦150 fún ọ̀kọ̀ọ̀kan, o sì san ₦500. Èló ni owó tí ó kù?', a: [{ id: 'a', text: '₦50', correct: true }, { id: 'b', text: '₦100', correct: false }, { id: 'c', text: '₦150', correct: false }, { id: 'd', text: '₦200', correct: false }] },
      { t: 'Ìpínlẹ̀ Méjì', d: 'Kíákíá! Àwọn ọrẹ́ rẹ ń dúró láti rí bí o ṣe yára.', q: 'Kí ni 7 + 8 tí a pín sí méjì? Kọ èsì rẹ!', a: null },
      { t: 'Pín Dógba', d: 'Ìwọ àti ọrẹ́ méjì rà akara ńlá papọ̀.', q: 'Bí akara náà jẹ́ ₦1,200, èló ni ẹ̀rùkẹni kọ̀ọ̀kan yóò san?', a: null },
    ],
    ha: [
      { t: 'Sarkin Kudi na Kasuwa', d: 'Kana kasuwa taimakon Mama sayar lemu.', q: 'Ka sai biscuits 3 da ₦150 kowanne, ka biya ₦500. Nawa ne sauran kudinka?', a: [{ id: 'a', text: '₦50', correct: true }, { id: 'b', text: '₦100', correct: false }, { id: 'c', text: '₦150', correct: false }, { id: 'd', text: '₦200', correct: false }] },
      { t: 'Sau Biyu', d: 'Da sauri! Abokanka na jiran ganin yadda kake sauri.', q: 'Mene ne ninkewar 7 + 8? Rubuta amsarka!', a: null },
      { t: 'Raba Daidai', d: 'Kai da abokanka biyu kun sai babbar kek tare.', q: 'Idan kekin ya kai ₦1,200, nawa kowanne zai biya?', a: null },
    ],
    ig: [
      { t: 'Onyeisi Ọgụgụ Ahịa', d: 'Ị nọ na ahịa na-enyere Mama aka ire oroma.', q: 'Ị zụrụ bisikitị 3 na ₦150 ọ bụla, ị kwụrụ ₦500. Ego ole fọdụrụ gị?', a: [{ id: 'a', text: '₦50', correct: true }, { id: 'b', text: '₦100', correct: false }, { id: 'c', text: '₦150', correct: false }, { id: 'd', text: '₦200', correct: false }] },
      { t: 'Okpuko Okpuko', d: 'Ngwa ngwa! Ndị enyi gị na-eche ịhụ ngwa ngwa gị.', q: 'Gịnị bụ okpukpu abụọ nke 7 + 8? Dee azịza gị!', a: null },
      { t: 'Kekọrịta Nha anya', d: 'Gị na ndị enyi gị abụọ zụrụ uke ukwu ọnụ.', q: 'Ọ bụrụ na uke ahụ dị ₦1,200, ego ole onye ọ bụla ga-akwụ?', a: null },
    ],
    fr: [
      { t: 'As du Marché', d: 'Tu es au marché pour aider Mama à vendre des oranges.', q: "Tu achètes 3 biscuits à 150 ₦ chacun et tu paies avec 500 ₦. Quelle est ta monnaie ?", a: [{ id: 'a', text: '50 ₦', correct: true }, { id: 'b', text: '100 ₦', correct: false }, { id: 'c', text: '150 ₦', correct: false }, { id: 'd', text: '200 ₦', correct: false }] },
      { t: 'Double Défi', d: 'Vite ! Tes amis attendent de voir ta rapidité.', q: 'Combien font 7 + 8 doublés ? Écris ta réponse !', a: null },
      { t: 'Partager Équitablement', d: 'Toi et 2 amis avez acheté un gros gâteau ensemble.', q: 'Si le gâteau coûte 1 200 ₦, combien chaque personne paie-t-elle ?', a: null },
    ],
    pcm: [
      { t: 'Market Change Oga', d: 'You dey market help Mama sell orange.', q: 'You buy 3 biscuit at ₦150 each come pay ₦500. Wetin remain?', a: [{ id: 'a', text: '₦50', correct: true }, { id: 'b', text: '₦100', correct: false }, { id: 'c', text: '₦150', correct: false }, { id: 'd', text: '₦200', correct: false }] },
      { t: 'Double Wahala', d: 'Sharp sharp! Your friends dey wait see as you fast.', q: 'Wetin be double of 7 + 8? Type your answer!', a: null },
      { t: 'Share Am Well', d: 'You and 2 friends buy big cake together.', q: 'If the cake cost ₦1,200, how much everybody go pay?', a: null },
    ],
  },
  'persuasive-speaking': {
    en: [
      { t: 'Ask for It Nicely', d: 'You want more playtime before homework.', q: 'Record or write ONE kind sentence to convince your parent to give you extra playtime today.', a: null },
      { t: 'Sell It!', d: 'Imagine you made delicious zobo you want everyone to taste.', q: 'Say or write TWO exciting sentences to sell your zobo to the class.', a: null },
      { t: 'Kindness Campaign', d: 'Your school wants students to help keep classrooms clean.', q: 'Write one short speech (2-3 sentences) to convince classmates to pick up litter today.', a: null },
    ],
    yo: [
      { t: 'Bè Lọ́nà Tó Dára', d: 'O fẹ́ àkókò eré síwájú iṣẹ́ ilé.', q: 'Gbasilẹ̀ tàbí kọ gbólóhùn ọ̀kan tí yóò faramọ́ òbí rẹ láti fúnyọ ní àkókò eré síwájú lónìí.', a: null },
      { t: 'Tà Á!', d: 'Rò wípé o ṣe zobo tó dun tí o fẹ́ kí gbogbo ènìyàn tọ́.', q: 'Sọ tàbí kọ gbólóhùn méjì tí yóò mú kí wọ́n ra zobo rẹ.', a: null },
      { t: 'Ìpolongo Ifẹ́', d: 'Ilé-ẹ̀kọ́ rẹ fẹ́ kí àwọn akẹ́kọ̀ rànán lálàgbára fúnni mọ́.', q: 'Kọ ọ̀rọ̀ kékeré kan (gbólóhùn 2-3) láti faramọ́ àwọn ọmọkilasi láti gbé eérú sílẹ̀ lónìí.', a: null },
    ],
    ha: [
      { t: 'Neman da Kyau', d: 'Kana son karin lokacin wasa kafin aikin gida.', q: 'Rubuta ko yi rikodin jimla daya mai tausayi don rinjayar iyayenka su ba ka karin lokacin wasa yau.', a: null },
      { t: 'Sayar da Ita!', d: 'Ka yi tunanin ka yi zobo mai dadi kanaso kowa ya dandana.', q: 'Faɗi ko rubuta jimloli biyu masu jan hali don sayar da zobonka ga ajin.', a: null },
      { t: 'Yakin Tausayi', d: 'Makarantarku tana son dalibai su taimaka wajen tsabtace ajuzu.', q: 'Rubuta jawabi gajere (jimloli 2-3) don rinjayar abokan ajinka su tattara sharar gida yau.', a: null },
    ],
    ig: [
      { t: 'Rịọ Ya Nke ọma', d: 'Ị chọrọ oge egwu ndị ọzọ tupu ọrụ ụlọ.', q: 'Dee ma ọ bụ dekọọ otu okwu ọma iji kwenye ndị nne na nna gị nye gị oge egwu ọzọ taa.', a: null },
      { t: 'Ree Ya!', d: 'Chee na ị mere zobo ụtọ nke ịchọrọ ka onye ọ bụla nwalee.', q: 'Gwa ma ọ bụ dee okwu abụọ na-atọ ụtọ iji ree zobo gị n\u2019 klas.', a: null },
      { t: 'Mgbasa Ozi Obi Ọma', d: 'Ụlọ akwụkwọ gị chọrọ ka ụmụ akwụkwọ nyere aka idobe klas ọcha.', q: 'Dee okwu mkpirisi (okwu 2-3) iji kwenye ndị ọgbọ gị were ihe mkpofu taa.', a: null },
    ],
    fr: [
      { t: 'Demandez Gentiment', d: "Tu veux plus de temps de jeu avant les devoirs.", q: "Enregistre ou écris UNE phrase gentille pour convaincre tes parents de te donner plus de temps de jeu aujourd'hui.", a: null },
      { t: 'Vends-le !', d: 'Imagine que tu as préparé un délicieux zobo que tout le monde doit goûter.', q: 'Dis ou écris DEUX phrases passionnantes pour vendre ton zobo à la classe.', a: null },
      { t: 'Campagne de Gentillesse', d: 'Ton école veut que les élèves gardent les classes propres.', q: "Écris un court discours (2-3 phrases) pour convaincre tes camarades de ramasser les déchets aujourd'hui.", a: null },
    ],
    pcm: [
      { t: 'Ask Am Well', d: 'You wan get more playtime before homework.', q: 'Talk or write ONE sweet sentence make your parent give you extra playtime today.', a: null },
      { t: 'Sell Am!', d: 'Imagine say you cook zobo wey sweet, you want everybody taste am.', q: 'Talk or write TWO sweet sentences to sell your zobo for class.', a: null },
      { t: 'Kindness Move', d: 'Your school want make students help keep class clean.', q: 'Write small talk (2-3 sentences) to convince your classmates to pick dirty today.', a: null },
    ],
  },
  'financial-literacy': {
    en: [
      { t: 'Save First!', d: 'You got ₦2,000 as a gift for doing well in school.', q: 'You want to save half and spend the rest on a toy that costs ₦900. Can you afford it? How much is left after buying?', a: null },
      { t: 'Needs vs Wants', d: "Let's sort out what really matters.", q: 'Write one NEED and one WANT from this list: sweets, exercise book, football, water.', a: null },
      { t: 'Little Business', d: 'You want to start selling puff-puff on weekends.', q: 'Flour and oil cost ₦700 and you can make 20 pieces. To make a profit of ₦500, what price will you sell each piece?', a: [{ id: 'a', text: '₦35', correct: false }, { id: 'b', text: '₦60', correct: true }, { id: 'c', text: '₦50', correct: false }, { id: 'd', text: '₦70', correct: false }] },
    ],
    yo: [
      { t: 'Fi Owó Pàmọ́ Kọ́kọ́!', d: 'O gba ₦2,000 gẹ́gẹ́ bi ẹ̀bùn fún ṣiṣe dáadáa ní ilé-ẹ̀kọ́.', q: 'O fẹ́ fi àádọ́ta pamọ́, o sì fẹ́ lo omiiran ra eré tí ó jẹ́ ₦900. Ṣé ó tó? Èló ni ó kù lẹ́yìn ríra?', a: null },
      { t: 'Àwúlóró vs Àjọ̀ṣepọ̀', d: 'Jẹ́ ká ṣètò ohun tí ó ṣe pàtàkì jùlọ.', q: 'Kọ ohun tí o NÍLÒ àti ohun tí o FẸ́ láti àkójọ yìí: ewébe, ìwé títabi, bọ́ọ̀lù, omi.', a: null },
      { t: 'Iṣẹ́ Owó Kékèké', d: 'O fẹ́ bẹ̀rẹ̀ títà páńkéré ní àwọn ọ̀sẹ̀ ìsinmi.', q: 'Iresi àti epo jẹ́ ₦700, o sì lè ṣe 20. Láti ní ànfàní ₦500, élo ni yóò tà ọ̀kọ̀ọ̀kan?', a: null },
    ],
    ha: [
      { t: 'Ajiye Fari!', d: 'Ka sami ₦2,000 a matsayin kyauta saboda kyawun aikinka a makaranta.', q: 'Kana son ajiye rabi ka kashe sauran don wasa mai ₦900. Za ka iya? Nawa zai rage bayan saya?', a: null },
      { t: 'Buhani vs Son Zuciya', d: 'Mu raba abubuwan da suka fi muhimmanci.', q: 'Rubuta daya da ake BUKATA da daya da ake SO daga jerin: alewa, littafin motsa jiki, kwallon kafa, ruwa.', a: null },
      { t: 'Karamin Sana\u2019a', d: 'Kana son fara sayar da puff-puff a karshen mako.', q: 'Gari da mai suna ₦700 kuma za ka iya yin 20. Don samun ribar ₦500, da farashi nawa za ka sayar da kowanne?', a: null },
    ],
    ig: [
      { t: 'Dobe Mbụ!', d: 'Ị nwere ₦2,000 dị ka onyinye maka ịrụ ọrụ oma n\u2019ụlọ akwụkwọ.', q: 'Ị chọrọ idobe ọkara ma jiri nke fọdụrụ zụrụ ihe egwu na-eri ₦900. Ị nwere ike? Ego ole fọdụrụ mgbe ị zụchara?', a: null },
      { t: 'Mkpa vs Ịchọ', d: 'Ka anyị hazie ihe dị mkpa n\u2019ezie.', q: 'Dee otu MKPA na otu ỊCHỌ si na ndepụta a: utọ, akwụkwọ mmega ahụ, bọọlụ, mmiri.', a: null },
      { t: 'Azụmahịa Ntakịrị', d: 'Ị chọrọ ịmalite ire puff-puff na izu ụka.', q: 'Ọka na mmanụ na-eri ₦700, ị nwekwara ike ime 20. Iji nweta uru ₦500, ego ole ị ga-ere nke ọ bụla?', a: null },
    ],
    fr: [
      { t: "Économise d'abord !", d: 'Tu as reçu 2 000 ₦ comme cadeau pour tes bons résultats à l\u2019école.', q: 'Tu veux économiser la moitié et dépenser le reste pour un jouet qui coûte 900 ₦. Peux-tu te le permettre ? Combien reste-t-il après l\u2019achat ?', a: null },
      { t: 'Besoins vs Envies', d: 'Trijons ce qui compte vraiment.', q: 'Écris un BESOIN et une ENVIE dans cette liste : bonbons, cahier, ballon, eau.', a: null },
      { t: 'Petit Commerce', d: 'Tu veux vendre des puff-puff le week-end.', q: 'La farine et l\u2019huile coûtent 700 ₦ et tu peux faire 20 morceaux. Pour faire un bénéfice de 500 ₦, à quel prix vendras-tu chaque morceau ?', a: null },
    ],
    pcm: [
      { t: 'Save First!', d: 'You get ₦2,000 gift because you dey do well for school.', q: 'You wan save half come spend the rest on toy wey cost ₦900. You fit am? Wetin go remain after buying?', a: null },
      { t: 'Need vs Want', d: 'Make we arrange wetin really matter.', q: 'Write one NEED and one WANT from this list: sweet, exercise book, football, water.', a: null },
      { t: 'Small Business', d: 'You wan start sell puff-puff for weekend.', q: 'Flour and oil cost ₦700 and you fit make 20 pieces. To gain ₦500 profit, how much you go sell each one?', a: null },
    ],
  },
  'creative-problem-solving': {
    en: [
      { t: 'Bridge the Gap', d: 'Rain washed away the small path to your compound.', q: 'Using only things around your home (no buying!), describe ONE way to cross a muddy puddle safely.', a: null },
      { t: 'Invent a Game', d: 'No ball? No problem!', q: 'Invent a fun game using a plastic bottle and water. Write the rules in 2 sentences.', a: null },
      { t: 'Fix It Smart', d: 'The classroom fan stopped working and it is hot.', q: 'List THREE smart ways to keep the class cool until it is fixed.', a: null },
    ],
    yo: [
      { t: 'Kọ́já Ìdíwọ̀', d: 'Òjò ṣe ìparun ọ̀nà kékeré tí ń lọ sílé yìówú.', q: 'Ní lílo nkan tí ó wà nílé rẹ nìkan, ṣàpèjúwe ọ̀nà kan láti kọjá omi òjò ní ààbò.', a: null },
      { t: 'Dá Eré Padà', d: 'Kò sí bọ́ọ̀lù? Kò ṣe pàtàkì!', q: 'Dá eré ayọ̀kan dá lóri ígò plástíkì àti omi. Kọ àwọn ofin rẹ̀ ní gbólóhùn méjì.', a: null },
      { t: 'Tun Ṣe Ógbọ́n', d: 'Agbéfọ̀ kilasi dúró ṣiṣẹ́, ó sì gbóná.', q: 'Ko ọ̀nà mẹ́ta tí ó gbọ́n láti tú kilasi tutu díẹ díẹ kí wọ́n tó tún ṣe é.', a: null },
    ],
    ha: [
      { t: 'Gada Rata', d: 'Ruwan sama ya kwashe kananan hanyoyin zuwa gidanku.', q: 'Sanya kawai abubuwan da ke kusa da gidanka (kar saiya!), bayyana hanya daya don tsallake tabo lafiya.', a: null },
      { t: 'Kirkiri Wasa', d: 'Ba kwalliya? Ba matsala!', q: 'Kirkirci nishadi ne mai kayan sha\u2019a da kwalan plastik da ruwa. Rubuta dokokin a jimloli biyu.', a: null },
      { t: 'Gyara da Hikima', d: 'Injin iska na aji ya tsaye, kuma yana zafi.', q: 'Bayyana hanyoyi uku masu wayo don sanyayar aji har sai an gyara shi.', a: null },
    ],
    ig: [
      { t: 'Ruo Oghom', d: 'Mmiri ozuzo kpochapụrụ obere ụzọ gaa na ogige unu.', q: 'Na-eji naanị ihe dị n\u2019ụlọ gị (efula!), kọwa otu ụzọ iji gafee mmiri ozuzo nchekwa.', a: null },
      { t: 'Mepụta Egwu', d: 'Enweghị bọọlụ? Ọ nweghị nsogbu!', q: 'Mepụta egwu na-atọ ụtọ site na iji karama plasta na mmiri. Dee iwu ahụ na okwu abụọ.', a: null },
      { t: 'Dozie Ya Nke ọma', d: 'Ogwe oyi klas ahụ kwụsịrị ọrụ, ọ dịkwa ọkụ.', q: 'Depụta ụzọ atọ smart iji mee ka klas jụrụ oyi ruo mgbe emezi ya.', a: null },
    ],
    fr: [
      { t: 'Franchir le Trou', d: 'La pluie a emporté le petit chemin vers votre cour.', q: "En n'utilisant que des objets de la maison (sans acheter !), décris UN moyen de traverser une flaque boueuse en sécurité.", a: null },
      { t: 'Invente un Jeu', d: "Pas de ballon ? Pas de problème !", q: 'Invente un jeu amusant avec une bouteille en plastique et de l\u2019eau. Écris les règles en 2 phrases.', a: null },
      { t: 'Répare Malin', d: "Le ventilateur de la classe est tombé en panne et il fait chaud.", q: 'Liste TROIS moyens malins de garder la classe fraîche jusqu\u2019à la réparation.', a: null },
    ],
    pcm: [
      { t: 'Bridge the Gap', d: 'Rain wash comot the small road wey dey go your compound.', q: 'Use only things around your house (no buying!), talk ONE way to cross muddy water safe safe.', a: null },
      { t: 'Create Game', d: 'No ball? No wahala!', q: 'Create fun game with plastic bottle and water. Write the rules in 2 sentences.', a: null },
      { t: 'Fix Am Smart', d: 'Class fan no dey work again and e hot.', q: 'List THREE smart ways to cool the class till dem fix am.', a: null },
    ],
  },
  'emotional-intelligence': {
    en: [
      { t: 'Name That Feeling', d: 'Your best friend did not greet you today.', q: 'How might you feel? Write the feeling and ONE kind thing you could say to them.', a: null },
      { t: 'Calm Down Plan', d: 'Everyone gets angry sometimes — even champions.', q: 'Write TWO healthy things you can do when you feel very angry.', a: null },
      { t: 'Kindness Detective', d: 'Time to spot kindness everywhere!', q: 'Do ONE secret kind act for someone at home today. Then write what you did and how they reacted.', a: null },
    ],
    yo: [
      { t: 'Pè ní Orúkọ Ìmọ̀lára', d: 'Ọrẹ́ rẹ tó dára jùlọ kì bá ní lónìí.', q: 'Báwo ni o lè fẹ́? Kọ ìmọ̀lára náà àti ọ̀rọ̀ ifẹ́ kan tí o lè sọ fún un.', a: null },
      { t: 'Ètò Ìbálọ̀pọ̀ Ọkàn', d: 'Gbogbo ènìyàn máa ń binú — àwọn aṣájú náà.', q: 'Kọ ohun míràn méjì tí ó wùṣù láti ṣe nígbà tí o bá binú gidigidi.', a: null },
      { t: 'Oláyẹ̀wò Ifẹ́', d: 'Àkókò ti dé láti rí ifẹ́ ní ibikíbi!', q: 'Ṣe iṣẹ́ ifẹ́ àṣírí kan fún ẹnìkan nílé lónìí. Lẹ́yìn náà, kọ ohun tí o ṣe àti bí wọ́n ṣe hàn.', a: null },
    ],
    ha: [
      { t: 'Sunanta Muhalalcin Kai', d: 'Abokin ka mafi kyau bai gaishe ka yau ba.', q: 'Yaya zaka ji? Rubuta jin dadinka da abu daya mai tausayi da zaka fada wa.', a: null },
      { t: 'Shirin Natsuwa', d: 'Kowa na fushi wani lokaci - har da zakara.', q: 'Rubuta abubuwa biyu masu lafiya da zaka iya yi lokacin da kuka ji fushi sosai.', a: null },
      { t: 'Duba Tausayi', d: 'Lokaci ya yi da za ka gano taurayi ko ina!', q: 'Yi daya sirrin taurayi wa wani a gida yau. Sai ka rubuta abinda ka yi da yadda suka amsa.', a: null },
    ],
    ig: [
      { t: 'KPọọ Mmetụta Ahụ', d: 'Enyi gị kacha mma ekeweghị gị taa.', q: 'Kedu ka ị nwere ike ịnụ? Dee mmetụta ahụ na otu okwu ọma ị nwere ike ikwu ha.', a: null },
      { t: 'Atụmatụ Nduchi', d: 'Onye ọ bụla na-ewe iwe mgbe ụfọdụ — ọbụnadị ndị mmeri.', q: 'Dee ihe abụọ dị mma ị nwere ike ime mgbe ị na-ewe iwe nke ukwuu.', a: null },
      { t: 'Onye Nledo Obi Ọma', d: 'Oge eruo ịchọta obi ọma ebe niile!', q: 'Mee otu ihe nzuzo obi ọma maka onye ọ bụla n\u2019ụlọ taa. Mgbe ahụ dee ihe ị mere na otu ha si zaghachi.', a: null },
    ],
    fr: [
      { t: 'Nomme ce Sentiment', d: "Ton meilleur ami ne t'a pas salué aujourd'hui.", q: 'Comment pourrais-tu te sentir ? Écris le sentiment et UNE chose gentille que tu pourrais lui dire.', a: null },
      { t: 'Plan Calme', d: "Tout le monde se met en colère parfois — même les champions.", q: 'Écris DEUX choses saines à faire quand tu es très en colère.', a: null },
      { t: 'Détective de la Gentillesse', d: "Il est temps de repérer la gentillesse partout !", q: "Fais UNE action secrète et gentille pour quelqu'un à la maison aujourd'hui. Puis écris ce que tu as fait et comment ils ont réagi.", a: null },
    ],
    pcm: [
      { t: 'Name That Feeling', d: 'Your best friend no greet you today.', q: 'How you go feel? Write the feeling and ONE kind thing you fit tell am.', a: null },
      { t: 'Calm Down Plan', d: 'Everybody dey angry sometimes — even champions.', q: 'Write TWO healthy things you fit do when you dey very angry.', a: null },
      { t: 'Kindness Detective', d: 'Time to find kindness everywhere!', q: 'Do ONE secret kind thing for person for house today. Then write wetin you do and how dem react.', a: null },
    ],
  },
}

const RESOURCES = {
  'mental-math': [
    { id: 'rR95Cbcjzus', en: 'Math Tricks You Should Know', yo: 'Ìṣirọ́ Àṣayan', ha: 'Yaƙɓoyen Lissafi', ig: 'Aghụghọ Ọgụgụ Ọnụ', fr: 'Astuces de Maths', pcm: 'Math Trick Wey You suppose Know' },
    { id: '5nZEUpZX_P0', en: 'Fast Addition for Kids', yo: 'Ìsapọ̀ Yára fún Àwọn Omọdé', ha: 'Haɗaka Mai Sauri ga Yara', ig: 'Mgbakọ Ngwa ngwa maka Ụmụntakịrị', fr: 'Addition Rapide pour Enfants', pcm: 'Fast Addition for Pikin' },
  ],
  'persuasive-speaking': [
    { id: 'cFdCzN7RYbw', en: 'Speak With Confidence', yo: 'Sọ̀rọ̀ Pẹ̀lú Ìgbéraga', ha: 'Magana da Kwarin gwiwa', ig: 'Gwa Okwu na Obi Ike', fr: 'Parle avec Assurance', pcm: 'Talk With Confidence' },
    { id: 'UXFRgMb9TTw', en: 'How to Persuade Anyone', yo: 'Bí a Ṣe Ń Faramọ̀n Ènìyàn', ha: 'Yadda ake Rinjayar Kowa', ig: 'Otu esi eme ka onye ọ bụla kwenye', fr: 'Comment Convaincre Tout le Monde', pcm: 'How to Persuade Anybody' },
  ],
  'financial-literacy': [
    { id: '0iRbD5rM5qc', en: 'Money Basics for Kids', yo: 'Ìmọ̀ Owó fún Àwọn Omọdé', ha: 'Tushen Kudi ga Yara', ig: 'Ihe Ndị Isi Ego maka Ụmụaka', fr: "Les Bases de l'Argent pour Enfants", pcm: 'Money Basics for Pikin' },
    { id: 'YI9OzLCtTu0', en: 'Saving Made Simple', yo: 'Ìpamọ́ Owó Kékèké', ha: 'Saukake Ajiye Kudi', ig: 'Mfe Dobe Ego', fr: 'Épargner Simplement', pcm: 'Saving Made Simple' },
  ],
  'creative-problem-solving': [
    { id: '5aUJyDC_gT8', en: 'Think Outside the Box', yo: 'Ronú Kúrò Ní Abúlé', ha: 'Yi Tunani Bayan Akwati', ig: 'Chee Na mpụga Ógwúgo', fr: 'Pense hors des Sentiers', pcm: 'Think Outside Box' },
    { id: 'UjSjZOjNIJg', en: 'Creative Challenges for Kids', yo: 'Ìdíje Ìmọ̀ fún Omọdé', ha: 'Kalubalen Kirkiro ga Yara', ig: 'Ihe ịma aka Okike maka Ụmụaka', fr: 'Défis Créatifs pour Enfants', pcm: 'Creative Challenge for Pikin' },
  ],
  'emotional-intelligence': [
    { id: 'dOkyKyVFnSs', en: 'Understanding Your Feelings', yo: 'Ìmọ̀ Ìmọ̀lára Rẹ', ha: 'Fahimtar Jin Dadinka', ig: 'Ịghọta Mmetụta Gị', fr: 'Comprendre ses Émotions', pcm: 'Understand Your Feelings' },
    { id: 'FpKo9FEhZHI', en: 'The Kindness Story', yo: 'Ìtàn Ifẹ́', ha: 'Labarin Tausayi', ig: 'Akụkọ Obi Ọma', fr: "L'Histoire de la Gentillesse", pcm: 'The Kindness Story' },
  ],
}

function pick(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function generateChallenge({ skill, language }) {
  const list = CHALLENGES[skill]?.[language] ?? CHALLENGES[skill]?.en ?? []
  const entry = pick(list)
  return {
    skill,
    title: entry.t,
    description: entry.d,
    question: entry.q,
    answers: entry.a,
    difficulty: 1 + Math.floor(Math.random() * 3),
  }
}

function resourceFor(skill, language) {
  const list = RESOURCES[skill]
  if (!list) return null
  const entry = pick(list)
  const lang = entry[language] ? language : 'en'
  return {
    type: 'video',
    url: `https://www.youtube.com/watch?v=${entry.id}`,
    title: entry[lang],
    language: lang,
  }
}

function askReply(message) {
  const replies = [
    "That's a great question! Here's what I think: take a deep breath, break the problem into small steps, and try the first step today. You've got this!",
    'I love that you asked! Remember, every big thing starts small. What is one tiny thing you can do about it right now?',
    'Good thinking! Talk to a trusted adult about it too. Meanwhile, write down your ideas — bright minds like yours grow by sharing.',
  ]
  return pick(replies)
}

module.exports = { SKILLS, generateChallenge, resourceFor, askReply }
