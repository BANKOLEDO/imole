const SKILLS = [
  'mental-math',
  'persuasive-speaking',
  'financial-literacy',
  'creative-problem-solving',
  'emotional-intelligence',
]

const CHALLENGES = {
  'mental-math': [
    {
      en: {
        title: 'Market Change Master',
        description: 'You are at the market helping Mama sell oranges.',
        question: 'You buy 3 biscuits at ₦150 each and pay with ₦500. What is your change?',
        answers: [
          { id: 'a', text: '₦50', correct: true },
          { id: 'b', text: '₦100', correct: false },
          { id: 'c', text: '₦150', correct: false },
          { id: 'd', text: '₦200', correct: false },
        ],
      },
      yo: {
        title: 'Ọgá Ìsirọ́ Ọjà',
        description: 'O wà ní ọjà ṣìíràn ìyá láti tàjìrẹ̀.',
        question: 'O ra bísíḳítì 3 ní ₦150 fún ọ̀kọ̀ọ̀kan, o sì san ₦500. Èló ni owó tí ó kù?',
        answers: null,
      },
    },
    {
      en: {
        title: 'Double Trouble',
        description: 'Quick! Your friends are waiting to see how fast you are.',
        question: 'What is 7 + 8 doubled? Type your answer!',
        answers: null,
      },
      yo: {
        title: 'Ìpínlẹ̀ Méjì',
        description: 'Kíákíá! Àwọn ọrẹ́ rẹ ń dúró láti rí bí o ṣe yára.',
        question: 'Kí ni 7 + 8 tí a pín sí méjì? Kọ èsì rẹ!',
        answers: null,
      },
    },
    {
      en: {
        title: 'Sharing Fairly',
        description: 'You and 2 friends bought a big cake together.',
        question: 'If the cake costs ₦1,200, how much does each person pay?',
        answers: [
          { id: 'a', text: '₦300', correct: false },
          { id: 'b', text: '₦400', correct: true },
          { id: 'c', text: '₦600', correct: false },
          { id: 'd', text: '₦1,200', correct: false },
        ],
      },
      yo: {
        title: 'Pín Dógba',
        description: 'Ìwọ àti ọrẹ́ méjì rà akara ńlá papọ̀.',
        question: 'Bí akara náà jẹ́ ₦1,200, èló ni ẹ̀rùkẹni kọ̀ọ̀kan yóò san?',
        answers: null,
      },
    },
  ],
  'persuasive-speaking': [
    {
      en: {
        title: 'Ask for It Nicely',
        description: 'You want more playtime before homework.',
        question:
          'Record or write ONE kind sentence to convince your parent to give you extra playtime today.',
        answers: null,
      },
      yo: {
        title: 'Bè Lọ́nà Tó Dára',
        description: 'O fẹ́ àkókò eré síwájú iṣẹ́ ilé.',
        question:
          'Gbasilẹ̀ tàbí kọ gbólóhùn ọ̀kan tí yóò faramọ́ òbí rẹ láti fúnyọ ní àkókò eré síwájú lónìí.',
        answers: null,
      },
    },
    {
      en: {
        title: 'Sell It!',
        description: "Imagine you made delicious zobo you want everyone to taste.",
        question: 'Say or write TWO exciting sentences to sell your zobo to the class.',
        answers: null,
      },
      yo: {
        title: 'Tà Á!',
        description: 'Rò wípé o ṣe zobo tó dun tí o fẹ́ kí gbogbo ènìyàn tọ́.',
        question: 'Sọ tàbí kọ gbólóhùn méjì tí yóò mú kí wọ́n ra zobo rẹ.',
        answers: null,
      },
    },
    {
      en: {
        title: 'Kindness Campaign',
        description: 'Your school wants students to help keep classrooms clean.',
        question:
          'Write one short speech (2-3 sentences) to convince classmates to pick up litter today.',
        answers: null,
      },
      yo: {
        title: 'Ìpolongo Ifẹ́',
        description: 'Ilé-ẹ̀kọ́ rẹ fẹ́ kí àwọn akẹ́kọ̀ rànán lálàgbára fúnni mọ́.',
        question:
          'Kọ ọ̀rọ̀ kékeré kan (gbólóhùn 2-3) láti faramọ́ àwọn ọmọkilasi láti gbé eérú sílẹ̀ lónìí.',
        answers: null,
      },
    },
  ],
  'financial-literacy': [
    {
      en: {
        title: 'Save First!',
        description: 'You got ₦2,000 as a gift for doing well in school.',
        question:
          'You want to save half and spend the rest on a toy that costs ₦900. Can you afford it? How much is left after buying?',
        answers: null,
      },
      yo: {
        title: 'Fi Owó Pàmọ́ Kọ́kọ́!',
        description: 'O gba ₦2,000 gẹ́gẹ́ bi ẹ̀bùn fún ṣiṣe dáadáa ní ilé-ẹ̀kọ́.',
        question:
          'O fẹ́ fi àádọ́ta pamọ́, o sì fẹ́ lo omiiran ra eré tí ó jẹ́ ₦900. Ṣé ó tó? Èló ni ó kù lẹ́yìn ríra?',
        answers: null,
      },
    },
    {
      en: {
        title: 'Needs vs Wants',
        description: "Let's sort out what really matters.",
        question:
          'Write one NEED and one WANT from this list: sweets, exercise book, football, water.',
        answers: null,
      },
      yo: {
        title: 'Àwúlóró vs Àjọ̀ṣepọ̀',
        description: 'Jẹ́ ká ṣètò ohun tí ó ṣe pàtàkì jùlọ.',
        question:
          'Kọ ohun tí o NÍLÒ àti ohun tí o FẸ́ láti àkójọ yìí: ewébe, ìwé títabi, bọ́ọ̀lù, omi.',
        answers: null,
      },
    },
    {
      en: {
        title: 'Little Business',
        description: 'You want to start selling puff-puff on weekends.',
        question:
          'Flour and oil cost ₦700 and you can make 20 pieces. To make a profit of ₦500, what price will you sell each piece?',
        answers: [
          { id: 'a', text: '₦35', correct: false },
          { id: 'b', text: '₦60', correct: true },
          { id: 'c', text: '₦50', correct: false },
          { id: 'd', text: '₦70', correct: false },
        ],
      },
      yo: {
        title: 'Iṣẹ́ Owó Kékèké',
        description: 'O fẹ́ bẹ̀rẹ̀ títà páńkéré ní àwọn ọ̀sẹ̀ ìsinmi.',
        question:
          'Iresi àti epo jẹ́ ₦700, o sì lè ṣe 20. Láti ní ànfàní ₦500, élo ni yóò tà ọ̀kọ̀ọ̀kan?',
        answers: null,
      },
    },
  ],
  'creative-problem-solving': [
    {
      en: {
        title: 'Bridge the Gap',
        description: 'Rain washed away the small path to your compound.',
        question:
          'Using only things around your home (no buying!), describe ONE way to cross a muddy puddle safely.',
        answers: null,
      },
      yo: {
        title: 'Kọ́já Ìdíwọ̀',
        description: 'Ìjì ṣe ìparun ọ̀nà kékeré tí ń lọ sílé yìówú.',
        question:
          'Ní lílo nkan tí ó wà nílé rẹ nìkan, ṣàpèjúwe ọ̀nà kan láti kọjá omi òjò ní ààbò.',
        answers: null,
      },
    },
    {
      en: {
        title: 'Invent a Game',
        description: 'No ball? No problem!',
        question:
          'Invent a fun game using a plastic bottle and water. Write the rules in 2 sentences.',
        answers: null,
      },
      yo: {
        title: 'Dá Eré Padà',
        description: 'Kò sí bọ́ọ̀lù? Kò ṣe pàtàkì!',
        question:
          'Dá eré ayọ̀kan dá lóri ígò plástíkì àti omi. Kọ àwọn ofin rẹ̀ ní gbólóhùn méjì.',
        answers: null,
      },
    },
    {
      en: {
        title: 'Fix It Smart',
        description: 'The classroom fan stopped working and it is hot.',
        question:
          'List THREE smart ways to keep the class cool until it is fixed.',
        answers: null,
      },
      yo: {
        title: 'Tun Ṣe Ógbọ́n',
        description: 'Agbéfọ̀ kilasi dúró ṣiṣẹ́, ó sì gbóná.',
        question:
          'Ko ọ̀nà mẹ́ta tí ó gbọ́n láti tú kilasi tutu díẹ díẹ kí wọ́n tó tún ṣe é.',
        answers: null,
      },
    },
  ],
  'emotional-intelligence': [
    {
      en: {
        title: 'Name That Feeling',
        description: 'Your best friend did not greet you today.',
        question:
          'How might you feel? Write the feeling and ONE kind thing you could say to them.',
        answers: null,
      },
      yo: {
        title: 'Pè ní Orúkọ Ìmọ̀lára',
        description: 'Ọrẹ́ rẹ tó dára jùlọ kì bá ní lónìí.',
        question:
          'Báwo ni o lè fẹ́? Kọ ìmọ̀lára náà àti ọ̀rọ̀ ifẹ́ kan tí o lè sọ fún un.',
        answers: null,
      },
    },
    {
      en: {
        title: 'Calm Down Plan',
        description: 'Everyone gets angry sometimes — even champions.',
        question:
          'Write TWO healthy things you can do when you feel very angry.',
        answers: null,
      },
      yo: {
        title: 'Ètò Ìbálọ̀pọ̀ Ọkàn',
        description: 'Gbogbo ènìyàn máa ń binú — àwọn aṣájú náà.',
        question:
          'Kọ ohun míràn méjì tí ó wùṣù láti ṣe nígbà tí o bá binú gidigidi.',
        answers: null,
      },
    },
    {
      en: {
        title: 'Kindness Detective',
        description: 'Time to spot kindness everywhere!',
        question:
          'Do ONE secret kind act for someone at home today. Then write what you did and how they reacted.',
        answers: null,
      },
      yo: {
        title: 'Oláyẹ̀wò Ifẹ́',
        description: 'Àkókò ti dé láti rí ifẹ́ ní ibikíbi!',
        question:
          'Ṣe iṣẹ́ ifẹ́ àṣírí kan fún ẹnìkan nílé lónìí. Lẹ́yìn náà, kọ ohun tí o ṣe àti bí wọ́n ṣe hàn.',
        answers: null,
      },
    },
  ],
}

const RESOURCES = {
  'mental-math': [
    { id: 'rR95Cbcjzus', en: 'Math Tricks You Should Know', yo: 'Ìṣirọ́ Àṣayan' },
    { id: '5nZEUpZX_P0', en: 'Fast Addition for Kids', yo: 'Ìsapọ̀ Yára fún Àwọn Omọdé' },
  ],
  'persuasive-speaking': [
    { id: 'cFdCzN7RYbw', en: 'Speak With Confidence', yo: 'Sọ̀rọ̀ Pẹ̀lú Ìgbéraga' },
    { id: 'UXFRgMb9TTw', en: 'How to Persuade Anyone', yo: 'Bí a Ṣe Ń Faramọ̀n Ènìyàn' },
  ],
  'financial-literacy': [
    { id: '0iRbD5rM5qc', en: 'Money Basics for Kids', yo: 'Ìmọ̀ Owó fún Àwọn Omọdé' },
    { id: 'YI9OzLCtTu0', en: 'Saving Made Simple', yo: 'Ìpamọ́ Owó Kékèké' },
  ],
  'creative-problem-solving': [
    { id: '5aUJyDC_gT8', en: 'Think Outside the Box', yo: 'Ronú Kúrò Ní Abúlé' },
    { id: 'UjSjZOjNIJg', en: 'Creative Challenges for Kids', yo: 'Ìdíje Ìmọ̀ fún Omọdé' },
  ],
  'emotional-intelligence': [
    { id: 'dOkyKyVFnSs', en: 'Understanding Your Feelings', yo: 'Ìmọ̀ Ìmọ̀lára Rẹ' },
    { id: 'FpKo9FEhZHI', en: 'The Kindness Story', yo: 'Ìtàn Ifẹ́' },
  ],
}

function pick(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function generateChallenge({ skill, language }) {
  const template = pick(CHALLENGES[skill] ?? CHALLENGES['mental-math'])
  const content = template[language] ?? template.en
  return {
    skill,
    ...content,
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
