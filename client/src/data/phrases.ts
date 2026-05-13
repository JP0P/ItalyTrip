export type PhraseCategory =
  | "ordering"
  | "directions"
  | "basics"
  | "emergency"
  | "the-bit";

export interface Phrase {
  italian: string;
  english: string;
  phonetic: string;
  category: PhraseCategory;
}

export const phrases: Phrase[] = [
  // Ordering
  {
    italian: "Un caffè, per favore.",
    english: "One coffee, please.",
    phonetic: "oon kaf-FEH, pehr fah-VOH-reh",
    category: "ordering",
  },
  {
    italian: "Il conto, per favore.",
    english: "The check, please.",
    phonetic: "eel KON-toh, pehr fah-VOH-reh",
    category: "ordering",
  },
  {
    italian: "Quattro spritz, per favore.",
    english: "Four spritzes, please.",
    phonetic: "KWAT-troh SPRITZ, pehr fah-VOH-reh",
    category: "ordering",
  },
  {
    italian: "Cos'è questo?",
    english: "What is this?",
    phonetic: "koh-ZEH KWES-toh",
    category: "ordering",
  },
  {
    italian: "È senza glutine?",
    english: "Is it gluten-free?",
    phonetic: "eh SEN-tsah gloo-TEE-neh",
    category: "ordering",
  },
  {
    italian: "Un gelato al pistacchio.",
    english: "One pistachio gelato.",
    phonetic: "oon jeh-LAH-toh al pee-STAHK-kyoh",
    category: "ordering",
  },
  {
    italian: "Ancora un giro!",
    english: "Another round!",
    phonetic: "ahn-KOH-rah oon JEE-roh",
    category: "ordering",
  },

  // Directions
  {
    italian: "Dov'è il Pantheon?",
    english: "Where is the Pantheon?",
    phonetic: "doh-VEH eel pan-TEH-on",
    category: "directions",
  },
  {
    italian: "Quanto dista?",
    english: "How far is it?",
    phonetic: "KWAN-toh DEE-stah",
    category: "directions",
  },
  {
    italian: "A sinistra / A destra.",
    english: "To the left / To the right.",
    phonetic: "ah see-NEE-strah / ah DES-trah",
    category: "directions",
  },
  {
    italian: "Sono perso/a.",
    english: "I'm lost.",
    phonetic: "SOH-noh PEHR-soh/sah",
    category: "directions",
  },
  {
    italian: "Dov'è la fermata del bus?",
    english: "Where is the bus stop?",
    phonetic: "doh-VEH lah fehr-MAH-tah del boos",
    category: "directions",
  },

  // Basics
  {
    italian: "Grazie mille!",
    english: "Thank you so much!",
    phonetic: "GRAT-syeh MEE-leh",
    category: "basics",
  },
  {
    italian: "Prego.",
    english: "You're welcome.",
    phonetic: "PREH-goh",
    category: "basics",
  },
  {
    italian: "Non capisco.",
    english: "I don't understand.",
    phonetic: "non kah-PEE-skoh",
    category: "basics",
  },
  {
    italian: "Parla inglese?",
    english: "Do you speak English?",
    phonetic: "PAR-lah een-GLEH-seh",
    category: "basics",
  },
  {
    italian: "Quanto costa?",
    english: "How much does it cost?",
    phonetic: "KWAN-toh KOS-tah",
    category: "basics",
  },
  {
    italian: "Che bellezza!",
    english: "How beautiful!",
    phonetic: "keh bel-LETS-ah",
    category: "basics",
  },

  // Emergency
  {
    italian: "Aiuto!",
    english: "Help!",
    phonetic: "ah-YOO-toh",
    category: "emergency",
  },
  {
    italian: "Chiama la polizia!",
    english: "Call the police!",
    phonetic: "KYAH-mah lah poh-LEE-tsyah",
    category: "emergency",
  },
  {
    italian: "Dov'è la farmacia?",
    english: "Where is the pharmacy?",
    phonetic: "doh-VEH lah far-mah-CHEE-ah",
    category: "emergency",
  },
  {
    italian: "Ho bisogno di un medico.",
    english: "I need a doctor.",
    phonetic: "oh bee-ZON-yoh dee oon MEH-dee-koh",
    category: "emergency",
  },

  // The Bit
  {
    italian: "Dove si comprano le sigarette?",
    english: "Where does one buy cigarettes?",
    phonetic: "DOH-veh see KOHM-prah-noh leh see-gah-RET-teh",
    category: "the-bit",
  },
  {
    italian: "Mia zia cerca un marito italiano.",
    english: "My aunt is looking for an Italian husband.",
    phonetic: "MEE-ah TSEE-ah CHEHR-kah oon mah-REE-toh ee-tal-YAH-noh",
    category: "the-bit",
  },
  {
    italian: "È questa la fila per il Vaticano o per il purgatorio?",
    english: "Is this the line for the Vatican or for purgatory?",
    phonetic: "eh KWES-tah lah FEE-lah pehr eel vah-tee-KAH-noh oh pehr eel poor-gah-TOH-ryoh",
    category: "the-bit",
  },
  {
    italian: "Siamo americani, ma non nel senso brutto.",
    english: "We're Americans, but not in the bad way.",
    phonetic: "SYAH-moh ah-meh-ree-KAH-nee, mah non nel SEN-soh BROOT-toh",
    category: "the-bit",
  },
  {
    italian: "Questo è il miglior gelato della mia vita.",
    english: "This is the best gelato of my life.",
    phonetic: "KWES-toh eh eel meel-YOR jeh-LAH-toh DEL-lah MEE-ah VEE-tah",
    category: "the-bit",
  },
  {
    italian: "Stiamo vivendo la dolce vita.",
    english: "We are living the sweet life.",
    phonetic: "STYAH-moh vee-VEN-doh lah DOL-cheh VEE-tah",
    category: "the-bit",
  },
];

export const categoryLabels: Record<PhraseCategory, string> = {
  ordering: "🍝 Ordering",
  directions: "🗺️ Directions",
  basics: "🤝 Basics",
  emergency: "🚨 Emergency",
  "the-bit": "😂 The Bit",
};
