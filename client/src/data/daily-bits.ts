export interface DailyBit {
  isoDate: string;
  headlineOverride?: string;
  urgencyLine: string;
  sideQuests: string[];
  chaosBonus?: string;
}

export const dailyBits: Record<string, DailyBit> = {
  "2026-05-13": {
    isoDate: "2026-05-13",
    headlineOverride: "We Made It to Rome 🇮🇹",
    urgencyLine:
      "Arrival day. Don't lose your passport. Find coffee immediately. Trastevere awaits.",
    sideQuests: [
      "🚬 Acquire one (1) Italian cigarette through any socially acceptable means",
      "💑 Scout the field — identify any promising Roman husband candidates for the group",
      "🍦 Find the gelato place that becomes Your Place for the whole trip",
    ],
    chaosBonus: "If you find a negroni sbagliato and it's perfect, that's a 10/10 start.",
  },
  "2026-05-14": {
    isoDate: "2026-05-14",
    headlineOverride: "Only Full Rome Day",
    urgencyLine:
      "Only full Rome day. Pantheon + Colosseum mode. Hydrate, caffeinate, and don't let any line spiritually defeat you.",
    sideQuests: [
      "🏛️ Ask an actual Italian for one real local recommendation (not TripAdvisor)",
      "💑 Bonus: If the ladies are on the case, identify one plausible Roman husband candidate",
      "🚬 Chaos bonus: Find the least sketchy cigarette path without derailing the day",
    ],
    chaosBonus:
      "If you see the Pantheon dome AND make it through Colosseum mode without losing your soul, you win Rome.",
  },
  "2026-05-15": {
    isoDate: "2026-05-15",
    urgencyLine: "Amalfi Coast incoming. Brace for vertical cliffs and dramatic beauty.",
    sideQuests: [
      "🚂 Make the train. Frecciarossa 8335, Roma Termini 10:20.",
      "🌊 First look at the coast — mandatory awe moment",
      "🍋 Acquire a lemon-based something within one hour of arrival",
    ],
  },
  "2026-05-16": {
    isoDate: "2026-05-16",
    urgencyLine: "Capri day. It's an island. It's perfect. Try not to miss the ferry back.",
    sideQuests: [
      "🚢 Blue Grotto or bust",
      "📸 Find a view that makes everyone back home insane with jealousy",
      "💅 Aperol Spritz with a view: mandatory",
    ],
  },
  "2026-05-17": {
    isoDate: "2026-05-17",
    urgencyLine: "Cooking class day. You're becoming Italian today, whether Italy is ready or not.",
    sideQuests: [
      "👨‍🍳 Learn one technique you'll actually remember",
      "🍷 Pair everything with local wine, including breakfast",
      "⛵ Ferry-hop to at least one extra coastal town",
    ],
  },
  "2026-05-18": {
    isoDate: "2026-05-18",
    urgencyLine: "Rest day. You've earned this. Eat gelato for breakfast if you want.",
    sideQuests: [
      "😴 Sleep past 8am (this is the mission)",
      "🏖️ Find your version of a perfect lazy Italian afternoon",
      "🥂 Seafood dinner — something you can't pronounce",
    ],
  },
  "2026-05-19": {
    isoDate: "2026-05-19",
    urgencyLine: "Florence. Renaissance art, beautiful people, and excellent leather goods.",
    sideQuests: [
      "🚆 Train departs Napoli 12:10 — do NOT miss it",
      "🍷 First Chianti of the Tuscany leg",
      "🌇 Evening walk through the historic center",
    ],
  },
  "2026-05-20": {
    isoDate: "2026-05-20",
    urgencyLine: "Art and sunset day. Pick ONE museum and give it your full soul.",
    sideQuests: [
      "🎨 Accademia (David) or Uffizi — commit to your choice",
      "🌅 Piazzale Michelangelo sunset is non-negotiable",
      "🍽️ Dinner in Oltrarno: find the place with no English menu",
    ],
  },
  "2026-05-21": {
    isoDate: "2026-05-21",
    urgencyLine: "Val d'Orcia. Rolling hills. Wine. Sheep. This is the Italy of your dreams.",
    sideQuests: [
      "🚗 Rental car pickup — everyone agrees on music before leaving",
      "🏡 Find the agriturismo and immediately sit outside with wine",
      "🌄 Sunset over the hills is literally a screensaver",
    ],
  },
  "2026-05-22": {
    isoDate: "2026-05-22",
    urgencyLine: "Vespa day. This is either the best or worst decision. Probably both.",
    sideQuests: [
      "🛵 Vespa through Pienza + Montepulciano — don't crash",
      "🍷 Winery lunch with actual wine pairings",
      "📸 Get the photo that will live on someone's wall",
    ],
  },
  "2026-05-23": {
    isoDate: "2026-05-23",
    urgencyLine: "Balloon ride if the weather cooperates. Otherwise: more hill towns and wine.",
    sideQuests: [
      "🎈 Sunrise balloon (weather permitting) — say yes if they say go",
      "🏘️ Visit one hill town you haven't been to yet",
      "🍾 Farewell Tuscan dinner: make it count",
    ],
  },
  "2026-05-24": {
    isoDate: "2026-05-24",
    urgencyLine: "Cinque Terre arrival. Five villages. All colorful. All stunning.",
    sideQuests: [
      "✈️ Pisa Airport car return — no drama, just logistics",
      "🚂 Train to Vernazza or Monterosso",
      "🌊 First look at the five villages: breathe it in",
    ],
  },
  "2026-05-25": {
    isoDate: "2026-05-25",
    urgencyLine: "Village-hop day. Manarola sunset is mandatory. Everything else is bonus.",
    sideQuests: [
      "🚉 Train through all five villages minimum",
      "🌅 Manarola sunset — this is the one",
      "🦞 Fresh seafood dinner with the whole crew",
    ],
  },
  "2026-05-26": {
    isoDate: "2026-05-26",
    urgencyLine: "Venice. Final destination. 8:20pm gondola is booked. Do not be late.",
    sideQuests: [
      "⛵ Get lost in the canals on purpose",
      "🥂 Cicchetti crawl: eat everything you see",
      "🚣 8:20pm gondola ride — non-negotiable, already paid for",
    ],
    chaosBonus: "Final Italian dinner with Prosecco. Make a toast. Make it good.",
  },
  "2026-05-27": {
    isoDate: "2026-05-27",
    urgencyLine: "Departure day. Last morning in Venice. Soak it up before real life resumes.",
    sideQuests: [
      "☕ One last proper Italian coffee",
      "📦 Repack your bag with all the things you bought",
      "💭 Start mentally planning the return trip",
    ],
  },
};
