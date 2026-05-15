export interface SuggestionSection {
  label: string;
  emoji: string;
  ideas: string[];
}

export interface ExploreLink {
  label: string;
  url: string;
  note?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface DailyBit {
  isoDate: string;
  headlineOverride?: string;
  eyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  urgencyLine: string;
  sideQuests: string[];
  chaosBonus?: string;
  suggestionSections?: SuggestionSection[];
  exploreLinks?: ExploreLink[];
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
    headlineOverride: "Rome Today",
    eyebrow: "Only full Rome day",
    heroTitle: "Rome, Unscripted",
    heroSubtitle: "Vatican, Pantheon, then Colosseum-view drinks at The Court.",
    heroImageUrl: "/rome/rome-colosseum.jpg",
    urgencyLine:
      "Real plan forming: Vatican → Pantheon → drinks overlooking the Colosseum at The Court. Still flexible, still Rome doing Rome.",
    suggestionSections: [
      {
        label: "Morning suggestions",
        emoji: "☕",
        ideas: [
          "Vatican / Sistine / St. Peter's if the crew is ready for peak Rome grandeur",
          "Coffee + cornetto before committing to any basilica-level decisions",
          "Pantheon can slide later if Vatican timing becomes the main character",
        ],
      },
      {
        label: "Daytime anchors",
        emoji: "🏛️",
        ideas: [
          "Pantheon as the clean, central, jaw-dropping anchor between Vatican and evening plans",
          "Colosseum / Roman Forum if ancient Rome mode still has legs before drinks",
          "Capitoline Hill if you want classic Rome views without turning the day into a museum marathon",
        ],
      },
      {
        label: "Offbeat views & walks",
        emoji: "👀",
        ideas: [
          "Aventine Keyhole + Orange Garden for a quieter weird little Rome view quest",
          "Gianicolo Hill if sunset energy beats another ticketed monument",
          "Trastevere side streets when everyone wants vibes instead of lines",
        ],
      },
      {
        label: "Evening / night ideas",
        emoji: "🥂",
        ideas: [
          "The Court at Palazzo Manfredi: cocktail-bar view straight at the Colosseum",
          "Aroma next door is the fancy rooftop restaurant backup, but The Court is the drink target",
          "Gelato walk after, because ancient ruins plus cocktails requires balance",
        ],
      },
      {
        label: "Food spotlights",
        emoji: "🍝",
        ideas: [
          "Carbonara / amatriciana / cacio e pepe — Rome pasta holy trinity",
          "Trapizzino-style street food if you need fast, local, handheld fuel",
          "Supplì: fried rice ball, red sauce, mozzarella, zero regrets",
        ],
      },
    ],
    exploreLinks: [
      {
        label: "Pantheon official site",
        url: "https://www.pantheonroma.com/home-eng/",
        note: "Tickets, hours, and dome lore",
        imageUrl: "/rome/rome-pantheon.jpg",
        imageAlt: "Pantheon exterior in Rome",
      },
      {
        label: "The Court — Colosseum-view cocktails",
        url: "https://www.manfredihotels.com/en/the-court/",
        note: "Tonight's drinks target at Palazzo Manfredi",
        imageUrl: "/rome/rome-colosseum.jpg",
        imageAlt: "Colosseum exterior in Rome",
      },
      {
        label: "Colosseum official tickets/info",
        url: "https://colosseo.it/en/",
        note: "Official monument info + visit planning",
        imageUrl: "/rome/rome-colosseum.jpg",
        imageAlt: "Colosseum exterior in Rome",
      },
      {
        label: "Aventine Keyhole / Orange Garden map",
        url: "https://www.google.com/maps/search/Aventine+Keyhole+Orange+Garden+Rome/",
        note: "Offbeat view mini-quest",
      },
      {
        label: "Trastevere food map",
        url: "https://www.google.com/maps/search/Trastevere+Rome+restaurants/",
        note: "Dinner chaos board",
      },
    ],
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
    headlineOverride: "Amalfi Arrival",
    eyebrow: "Coast transfer day",
    heroTitle: "Amalfi, First Look",
    heroSubtitle: "Roma Termini to cliffs, lemons, and full coastal drama.",
    heroImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Amalfi_Coast_(Italy).jpg",
    urgencyLine: "Rome → Naples → Amalfi Coast. 12:30pm private transfer from Naples Central, then Via Papa Leone X in Amalfi.",
    suggestionSections: [
      {
        label: "Travel anchors",
        emoji: "🚆",
        ideas: [
          "Frecciarossa 8335: Roma Termini 10:20 → Napoli Centrale 11:33",
          "Private transfer pickup: Naples Central Station at 12:30pm",
          "Drop-off is Via Papa Leone X, Amalfi; once bags are down, do the first-look wander",
        ],
      },
      {
        label: "Arrival mode",
        emoji: "🌊",
        ideas: [
          "Find the closest ridiculous sea view and let everyone recalibrate from Rome speed",
          "Keep dinner low-friction: seafood, pasta, lemon anything, view if possible",
          "Home base is Amalfi, not a vague coast situation; pick vibes over perfection and stay flexible",
        ],
      },
      {
        label: "Food spotlights",
        emoji: "🍋",
        ideas: [
          "Lemon everything: granita, delizia al limone, limoncello, zero restraint",
          "Scialatielli ai frutti di mare if seafood-pasta mode is calling",
          "Sfogliatella or a Naples-adjacent pastry if the transfer leaves snack damage",
        ],
      },
      {
        label: "Soft quests",
        emoji: "📸",
        ideas: [
          "First coastline photo from somewhere that makes the group chat annoying",
          "Find the route/ferry situation for tomorrow before spritz brain takes over",
          "If energy is low, tonight is a balcony/glass/water-staring night. Valid.",
        ],
      },
    ],
    exploreLinks: [
      {
        label: "Roma Termini → Napoli Centrale train",
        url: "https://www.trenitalia.com/en.html",
        note: "Frecciarossa logistics check",
      },
      {
        label: "Amalfi Coast ferry routes",
        url: "https://www.travelmar.it/en/",
        note: "Useful if the coast starts moving by water",
      },
      {
        label: "Amalfi town map",
        url: "https://www.google.com/maps/search/Amalfi+Coast+Amalfi+Italy/",
        note: "Arrival wander / dinner scouting",
        imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Amalfi_Coast_(Italy).jpg",
        imageAlt: "Amalfi Coast view",
      },
      {
        label: "Ravello map",
        url: "https://www.google.com/maps/search/Ravello+Italy/",
        note: "If the crew wants the elegant cliffside detour",
      },
    ],
    sideQuests: [
      "🚂 Make the train. Frecciarossa 8335, Roma Termini 10:20.",
      "🚐 Private transfer pickup at Naples Central Station, 12:30pm.",
      "🌊 First look at the coast — mandatory awe moment",
    ],
    chaosBonus: "If everyone survives the transfer and still gets a sea-view drink, Amalfi has officially begun.",
  },
  "2026-05-16": {
    isoDate: "2026-05-16",
    headlineOverride: "Capri Day",
    eyebrow: "Island chaos board",
    heroTitle: "Capri, Showing Off",
    heroSubtitle: "Ferries, cliffs, blue water, and probably one wildly overpriced spritz.",
    heroImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Capri_skaly_Faraglione.JPG",
    urgencyLine: "Capri can be Blue Grotto, Anacapri, Faraglioni views, or just glamorous wandering. Let sea conditions decide the exact chaos.",
    suggestionSections: [
      {
        label: "Morning anchors",
        emoji: "🚢",
        ideas: [
          "Check ferry timing early; Capri rewards people who do not freestyle the return boat",
          "If Blue Grotto conditions are good, go early before the queue becomes a personality test",
          "If the grotto is closed, pivot fast: Anacapri + Monte Solaro chairlift is not a consolation prize",
        ],
      },
      {
        label: "Capri moves",
        emoji: "🏝️",
        ideas: [
          "Marina Grande arrival, then funicular/taxi up before the harbor eats the whole day",
          "Gardens of Augustus for Faraglioni views without requiring a full expedition",
          "Anacapri if the crew wants the slightly calmer, higher-up version of the island",
        ],
      },
      {
        label: "View / photo targets",
        emoji: "📸",
        ideas: [
          "Faraglioni rocks: the obvious shot because sometimes obvious is correct",
          "Monte Solaro if chairlift energy beats boutique wandering",
          "A boat or overlook photo that makes Capri look fake, because Capri kind of is",
        ],
      },
      {
        label: "Food & drink",
        emoji: "🍹",
        ideas: [
          "Aperol or limoncello spritz with a view; price pain is part of the ritual",
          "Caprese salad actually on Capri, because geography demands it",
          "Seafood pasta if the ferry back is late enough to justify staying feral",
        ],
      },
    ],
    exploreLinks: [
      {
        label: "Capri ferry options",
        url: "https://www.capri.com/en/ferry-schedule",
        note: "Check same-day timing before committing",
      },
      {
        label: "Blue Grotto info",
        url: "https://www.capri.com/en/s/blue-grotto",
        note: "Sea-condition-dependent brain melter",
        imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Grotta_azzurra.capri.JPG",
        imageAlt: "Blue Grotto in Capri",
      },
      {
        label: "Monte Solaro chairlift",
        url: "https://www.capri.com/en/e/mount-solaro-chairlift",
        note: "Single-seat sky chair chaos",
        imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Anacapri_-_Monte_Solaro_-_panoramio.jpg",
        imageAlt: "Monte Solaro view in Capri",
      },
      {
        label: "Gardens of Augustus map",
        url: "https://www.google.com/maps/search/Gardens+of+Augustus+Capri/",
        note: "Easy Faraglioni overlook",
      },
    ],
    sideQuests: [
      "🚢 Blue Grotto if the sea says yes; graceful pivot if it says absolutely not",
      "📸 Find a view that makes everyone back home insane with jealousy",
      "💅 Aperol Spritz with a view: mandatory emotional support beverage",
    ],
    chaosBonus: "If you make the return ferry with everyone accounted for, Capri did not defeat you.",
  },
  "2026-05-17": {
    isoDate: "2026-05-17",
    headlineOverride: "Cooking & Coast Day",
    eyebrow: "Hands-on / ferry-hop day",
    heroTitle: "Pasta, Lemons, Sea",
    heroSubtitle: "Cook something, eat everything, then chase another coastal town if energy allows.",
    heroImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/How_to_cut_the_fresh_egg_pasta_with_a_knife_The_art_of_pasta_making_in_Italy.JPG",
    urgencyLine: "Cooking class is the anchor. The rest of the day can flex around appetite, ferry timing, and how aggressively the coast is calling.",
    suggestionSections: [
      {
        label: "Main anchor",
        emoji: "👨‍🍳",
        ideas: [
          "Cooking class is the day's one real commitment; protect the timing and let the rest breathe",
          "Ask one technique question you might actually use back home",
          "If they hand you local wine during prep, the answer is yes unless logistics object",
        ],
      },
      {
        label: "Coastal add-ons",
        emoji: "⛵",
        ideas: [
          "Ferry-hop to Positano if the crew wants the glamorous postcard version of the coast",
          "Minori/Maiori can be the easier, less performative wander if everyone is cooked",
          "Ravello remains the elegant high-ground option if views beat beach chaos",
        ],
      },
      {
        label: "Food spotlights",
        emoji: "🍝",
        ideas: [
          "Fresh pasta you helped make, ideally with lemon or seafood somewhere in the story",
          "Delizia al limone for dessert if the coast has not already turned everyone into lemons",
          "Anchovies, mozzarella, tomatoes, basil: simple things that hit harder here",
        ],
      },
      {
        label: "Evening ideas",
        emoji: "🌅",
        ideas: [
          "Sunset from wherever requires the least transit drama",
          "Low-key seafood dinner if lunch turned into a whole event",
          "Balcony/water-staring decompression is a legitimate itinerary item",
        ],
      },
    ],
    exploreLinks: [
      {
        label: "Positano map",
        url: "https://www.google.com/maps/search/Positano+Italy/",
        note: "Postcard-coast wander",
        imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Positano_Amalfi_Coast_Italy.jpg",
        imageAlt: "Positano on the Amalfi Coast",
      },
      {
        label: "Minori map",
        url: "https://www.google.com/maps/search/Minori+Italy/",
        note: "Easier pastry/coast detour",
      },
      {
        label: "Villa Cimbrone / Ravello",
        url: "https://www.villacimbrone.com/en/",
        note: "Terrace of Infinity option",
        imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Cimbrone_terraza_infinito_01.jpg",
        imageAlt: "Terrace of Infinity at Villa Cimbrone",
      },
      {
        label: "Amalfi Coast ferry routes",
        url: "https://www.travelmar.it/en/",
        note: "Plan the hop before dinner brain",
      },
    ],
    sideQuests: [
      "👨‍🍳 Learn one technique you'll actually remember",
      "🍷 Pair something with local wine and pretend this is educational",
      "⛵ Ferry-hop or view-hop to one extra coastal town if energy survives lunch",
    ],
    chaosBonus: "If somebody says 'we could make this at home' while staring at the Mediterranean, they are lying but let them dream.",
  },
  "2026-05-18": {
    isoDate: "2026-05-18",
    headlineOverride: "Coast Recovery Day",
    eyebrow: "Rest day, allegedly",
    heroTitle: "Do Less, Better",
    heroSubtitle: "Beach, balcony, seafood, lemons, and no fake productivity unless the crew wants it.",
    heroImageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Ferry_Ride_Between_Amalfi_and_Positano_(42250218604).jpg",
    urgencyLine: "This is the buffer day. Use it for rest, one perfect coastal move, or the thing everyone wishes they had done earlier.",
    suggestionSections: [
      {
        label: "Slow morning",
        emoji: "😴",
        ideas: [
          "Sleep in if bodies are voting no; the site officially endorses not being heroic",
          "Coffee with a view before making even one decision",
          "Laundry / repack / life admin only if it buys future peace",
        ],
      },
      {
        label: "Pick-one adventures",
        emoji: "🌊",
        ideas: [
          "Beach or swim stop if the weather is showing off",
          "Ravello / Terrace of Infinity if the crew never made it uphill",
          "Short ferry ride just to see the coast from water without turning it into a mission",
        ],
      },
      {
        label: "Food spotlights",
        emoji: "🦐",
        ideas: [
          "Seafood dinner with something you cannot pronounce but can point at confidently",
          "Lemon dessert victory lap: delizia, granita, limoncello, dealer's choice",
          "Pizza or pasta comfort meal if everyone is travel-tired and done being impressive",
        ],
      },
      {
        label: "Reset for Florence",
        emoji: "🎒",
        ideas: [
          "Confirm tomorrow's departure plan before the final coastal spritz",
          "Charge batteries, clear storage, rescue camera roll chaos",
          "One last coastline check-in/photo so Amalfi gets its proper goodbye",
        ],
      },
    ],
    exploreLinks: [
      {
        label: "Atrani map",
        url: "https://www.google.com/maps/search/Atrani+Italy/",
        note: "Tiny, nearby, beautiful wander",
        imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Atrani_-_panoramio.jpg",
        imageAlt: "Atrani on the Amalfi Coast",
      },
      {
        label: "Ravello map",
        url: "https://www.google.com/maps/search/Ravello+Italy/",
        note: "Best if you still need the balcony seats",
      },
      {
        label: "Amalfi beaches map",
        url: "https://www.google.com/maps/search/beach+near+Amalfi+Italy/",
        note: "Low-effort recovery target",
      },
      {
        label: "Florence transfer prep",
        url: "https://www.trenitalia.com/en.html",
        note: "Tomorrow-you says thank you",
      },
    ],
    sideQuests: [
      "😴 Sleep past 8am (this is the mission)",
      "🏖️ Find your version of a perfect lazy Italian afternoon",
      "🥂 Seafood dinner — something you can't pronounce",
    ],
    chaosBonus: "If the only achievement is one great meal and one great view, that's not failure. That's vacation literacy.",
  },
  "2026-05-19": {
    isoDate: "2026-05-19",
    urgencyLine: "Florence arrival. Napoli 12:10 → Firenze SMN 15:11, then Costa dei Magnoli, 19.",
    sideQuests: [
      "🚆 Train departs Napoli 12:10 — do NOT miss it",
      "🏡 Check into Costa dei Magnoli, 19",
      "🍷 First Chianti of the Tuscany leg",
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
    urgencyLine: "Rental car day. Pickup is Via Maso Finiguerra 31 R near Firenze SMN, then onward to Castelmuzio.",
    sideQuests: [
      "🚗 Rental car pickup at Via Maso Finiguerra 31 R",
      "🏡 Get to Castelmuzio and immediately sit outside with wine",
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
    urgencyLine: "Cinque Terre arrival. Drive Tuscany → Monterosso, parking confirmed, then Via Roma 33.",
    sideQuests: [
      "🚗 Drive to Monterosso al Mare — about 2.5–3 hours",
      "🅿️ Parking is confirmed at the accommodation",
      "🏡 Check into Via Roma 33",
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
    urgencyLine: "Venice. Return the car in La Spezia, train via Florence, then 8:20pm gondola. Do not freestyle this one.",
    sideQuests: [
      "🚗 Return the rental car in La Spezia",
      "🚆 La Spezia Centrale 12:35 → Firenze SMN 15:08, Regional 18413, PNR JU7ZC5",
      "🚆 Firenze SMN → Venezia Santa Lucia second train — details TBD",
      "🏨 Check into Canal Grande",
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
