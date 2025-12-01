import { useState, useEffect, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  Plane, MapPin, Coffee, UtensilsCrossed, Camera, Wine, Sun, Heart, Sparkles,
  ChevronDown, ChevronUp, CheckSquare, Volume2, VolumeX, Share2, Copy, Check,
  Building, Landmark, Ship, Mountain, Church, Music
} from "lucide-react";
import heroImage from "@assets/generated_images/amalfi_coast_sunset_view.png";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

interface ItineraryDay {
  day: number;
  date: string;
  location: string;
  title: string;
  activities: string[];
  icon: typeof Landmark;
}

interface LocationInfo {
  vibe: string;
  knownFor: string;
  mustDo: string;
}

interface LocationGroup {
  location: string;
  dateRange: string;
  days: ItineraryDay[];
  icon: typeof Landmark;
  info: LocationInfo;
}

const locationInfoMap: Record<string, LocationInfo> = {
  "Rome": {
    vibe: "Ancient grandeur meets vibrant nightlife",
    knownFor: "Colosseum, Vatican, pasta alla carbonara",
    mustDo: "Toss a coin in the Trevi Fountain at sunrise"
  },
  "Amalfi Coast": {
    vibe: "Dramatic cliffs, la dolce vita glamour",
    knownFor: "Positano views, limoncello, Path of the Gods",
    mustDo: "Sunset aperitivo overlooking the Mediterranean"
  },
  "Tuscany": {
    vibe: "Rolling hills, unhurried village life",
    knownFor: "Chianti wine, truffle hunting, Renaissance art",
    mustDo: "Wine tasting at a family vineyard"
  },
  "Cinque Terre": {
    vibe: "Colorful fishing villages, coastal romance",
    knownFor: "Five UNESCO villages, fresh pesto, hiking trails",
    mustDo: "Watch sunset from Manarola with local wine"
  },
  "Florence": {
    vibe: "Renaissance elegance, art at every turn",
    knownFor: "Michelangelo's David, Duomo, bistecca Fiorentina",
    mustDo: "Sunset at Piazzale Michelangelo"
  },
  "Venice": {
    vibe: "Floating fairytale, romantic labyrinth",
    knownFor: "Grand Canal, gondolas, cicchetti & Prosecco",
    mustDo: "Gondola ride through hidden canals at dusk"
  }
};

interface PackingItem {
  id: string;
  name: string;
  checked: boolean;
}

interface PackingCategory {
  name: string;
  items: PackingItem[];
}

function ItalianFlagStripe() {
  return (
    <div className="flex h-1.5 w-full overflow-hidden rounded-full">
      <div className="flex-1 bg-italy-green" />
      <div className="flex-1 bg-white" />
      <div className="flex-1 bg-italy-red" />
    </div>
  );
}

function FloatingIcon({ icon: Icon, className, delay = "0s" }: { icon: typeof Plane; className?: string; delay?: string }) {
  return (
    <div 
      className={`absolute text-white/40 ${className}`}
      style={{ animationDelay: delay }}
    >
      <Icon className="w-8 h-8 lg:w-12 lg:h-12" />
    </div>
  );
}

function CountdownUnit({ value, label, prevValue, size = "normal" }: { value: number; label: string; prevValue: number; size?: "large" | "normal" }) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (value !== prevValue) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  const isLarge = size === "large";

  return (
    <div className="flex flex-col items-center" data-testid={`countdown-${label.toLowerCase()}`}>
      <div className={`glass-effect rounded-3xl ${isLarge ? 'p-6 sm:p-8 lg:p-10 min-w-[140px] sm:min-w-[180px] lg:min-w-[240px]' : 'p-3 sm:p-4 lg:p-5 min-w-[70px] sm:min-w-[85px] lg:min-w-[100px]'}`}>
        <span 
          className={`font-serif font-bold text-white text-shadow-lg block text-center ${isAnimating ? 'animate-number-flip' : ''} ${isLarge ? 'text-7xl sm:text-8xl lg:text-9xl' : 'text-3xl sm:text-4xl lg:text-5xl'}`}
          aria-label={`${value} ${label}`}
        >
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className={`text-white/80 uppercase tracking-widest font-medium text-shadow ${isLarge ? 'text-sm sm:text-base mt-4' : 'text-xs mt-2'}`}>
        {label}
      </span>
    </div>
  );
}

function TimeSeparator() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-white/60 self-start mt-4">
      <div className="w-2 h-2 rounded-full bg-white/40" />
      <div className="w-2 h-2 rounded-full bg-white/40" />
    </div>
  );
}

function Confetti() {
  const colors = ['#009246', '#ffffff', '#CE2B37', '#FFD700', '#FF6B6B'];
  const confetti = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    size: Math.random() * 10 + 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </div>
  );
}

function HighlightCard({ icon: Icon, title, description }: { icon: typeof Coffee; title: string; description: string }) {
  return (
    <Card className="p-6 lg:p-8 hover-elevate transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-italy-green/10 text-italy-green group-hover:bg-italy-green group-hover:text-white transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
}

function LocationCard({ group, isExpanded, onToggle }: { group: LocationGroup; isExpanded: boolean; onToggle: () => void }) {
  const Icon = group.icon;
  const dayCount = group.days.length;
  const dayLabel = dayCount === 1 ? "1 Day" : `${dayCount} Days`;
  
  return (
    <Card 
      className="overflow-visible hover-elevate transition-all duration-300 cursor-pointer"
      onClick={onToggle}
      data-testid={`itinerary-location-${group.location.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
    >
      <div className="p-5 lg:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-italy-red/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-italy-red" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground">{group.location}</h3>
              <p className="text-sm text-muted-foreground">{group.dateRange} ({dayLabel})</p>
            </div>
          </div>
          <Button size="icon" variant="ghost" className="flex-shrink-0">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-italy-green flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Vibe</p>
              <p className="text-sm text-foreground">{group.info.vibe}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Heart className="w-4 h-4 text-italy-red flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Known For</p>
              <p className="text-sm text-foreground">{group.info.knownFor}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Camera className="w-4 h-4 text-italy-green flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Must-Do</p>
              <p className="text-sm text-foreground">{group.info.mustDo}</p>
            </div>
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-6">
            {group.days.map((day) => (
              <div key={day.day} className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-italy-green/10 text-italy-green text-sm font-semibold">
                    {day.day}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{day.title}</p>
                    <p className="text-sm text-muted-foreground">{day.date}</p>
                  </div>
                </div>
                <ul className="ml-11 space-y-1.5">
                  {day.activities.map((activity, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-italy-green mt-0.5">•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

function PackingChecklist({ categories, onToggleItem }: { categories: PackingCategory[]; onToggleItem: (categoryName: string, itemId: string) => void }) {
  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedItems = categories.reduce((acc, cat) => acc + cat.items.filter(item => item.checked).length, 0);
  const progress = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Packing Progress</span>
          <span className="text-sm font-medium text-foreground">{checkedItems}/{totalItems}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-italy-green transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Categories */}
      {categories.map((category) => (
        <div key={category.name}>
          <h4 className="font-medium text-foreground mb-3">{category.name}</h4>
          <div className="space-y-2">
            {category.items.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover-elevate cursor-pointer transition-all"
                data-testid={`packing-item-${item.id}`}
              >
                <Checkbox 
                  checked={item.checked}
                  onCheckedChange={() => onToggleItem(category.name, item.id)}
                />
                <span className={`text-sm ${item.checked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {item.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function extractSongName(url: string): string {
  try {
    const filename = decodeURIComponent(url.split('/').pop() || '');
    const nameWithoutExt = filename.replace(/\.mp3$/i, '');
    const cleanName = nameWithoutExt.replace(/^\d+\s*/, '');
    return cleanName || 'Italian Music';
  } catch {
    return 'Italian Music';
  }
}

function MusicToggle({ 
  isPlaying, 
  onToggle,
  onTurnOn,
  songUrl,
  showSongName,
  onHideSongName
}: { 
  isPlaying: boolean; 
  onToggle: () => void;
  onTurnOn: () => void;
  songUrl: string;
  showSongName: boolean;
  onHideSongName: () => void;
}) {
  const songName = extractSongName(songUrl);

  useEffect(() => {
    if (showSongName) {
      const timer = setTimeout(() => {
        onHideSongName();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showSongName, onHideSongName]);

  const handleSongNameClick = () => {
    onTurnOn();
    onHideSongName();
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={onToggle}
        className="glass-effect text-white border-white/20 h-11 w-11 p-0"
        data-testid="button-music-toggle"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </Button>
      
      <button 
        onClick={handleSongNameClick}
        className={`absolute top-full right-0 mt-2 px-3 py-2 rounded-lg glass-effect border border-white/20 whitespace-nowrap transition-all duration-300 cursor-pointer hover:bg-white/10 ${
          showSongName 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        data-testid="song-name-dropdown"
        aria-label={`Play ${songName}`}
      >
        <div className="flex items-center gap-2 text-white text-sm">
          <Music className="w-3.5 h-3.5 text-white/70" />
          <span className="font-medium">{songName}</span>
        </div>
      </button>
    </div>
  );
}

function ShareButton({ daysLeft, targetDate }: { daysLeft: number; targetDate: string }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const handleShare = async () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?date=${encodeURIComponent(targetDate)}`;
    const shareText = `Only ${daysLeft} days until our Italy trip! Join the countdown!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Italy Trip Countdown',
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          await copyToClipboard(shareUrl);
        }
      }
    } else {
      await copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(false);
        setTimeout(() => setCopied(false), 2000);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setError(false);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          setError(true);
          setTimeout(() => setError(false), 2000);
        }
        document.body.removeChild(textArea);
      }
    } catch {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleShare}
      className={`glass-effect text-white border-white/20 h-11 w-11 p-0 ${error ? 'border-red-500/50' : ''}`}
      data-testid="button-share"
      aria-label={copied ? "Link copied!" : error ? "Copy failed" : "Share countdown"}
    >
      {copied ? <Check className="w-5 h-5 text-green-400" /> : error ? <Copy className="w-5 h-5 text-red-400" /> : <Share2 className="w-5 h-5" />}
    </Button>
  );
}

function DestinationBadge({ name }: { name: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
      <MapPin className="w-4 h-4 text-italy-red" />
      <span className="text-sm font-medium text-foreground">{name}</span>
    </div>
  );
}

const itinerary: ItineraryDay[] = [
  {
    day: 1,
    date: "May 13",
    location: "Rome",
    title: "The Eternal City - Arrival",
    activities: [
      "Arrive at Rome Fiumicino Airport",
      "Check into hotel in the historic center",
      "Evening stroll through Piazza Navona",
      "Dinner at a traditional trattoria in Trastevere"
    ],
    icon: Landmark
  },
  {
    day: 2,
    date: "May 14",
    location: "Rome",
    title: "Ancient Wonders",
    activities: [
      "Skip-the-line tour of the Colosseum",
      "Explore the Roman Forum and Palatine Hill",
      "Lunch near Campo de' Fiori market",
      "Toss a coin in the Trevi Fountain",
      "Sunset at Pincian Hill overlooking the city"
    ],
    icon: Building
  },
  {
    day: 3,
    date: "May 15",
    location: "Amalfi Coast",
    title: "Coastal Paradise - Arrival",
    activities: [
      "Travel to Naples via high-speed train",
      "Drive scenic route to Positano",
      "Check into cliffside hotel",
      "Beach time at Spiaggia Grande",
      "Sunset aperitivo overlooking the sea"
    ],
    icon: Mountain
  },
  {
    day: 4,
    date: "May 16",
    location: "Amalfi Coast",
    title: "Amalfi Coast Exploration",
    activities: [
      "Boat trip to Emerald Grotto",
      "Visit charming Amalfi town",
      "Hiking along Sentiero Degli Dei (Path of Gods)",
      "Fresh seafood lunch with sea views",
      "Evening passeggiata through village"
    ],
    icon: Ship
  },
  {
    day: 5,
    date: "May 17",
    location: "Amalfi Coast",
    title: "Amalfi Coast Relaxation",
    activities: [
      "Leisurely beach morning",
      "Explore Praiano nearby",
      "Limoncello and local crafts",
      "Sunset beach meditation",
      "Dinner at local family trattoria"
    ],
    icon: Sun
  },
  {
    day: 6,
    date: "May 18",
    location: "Tuscany",
    title: "Wine Country - Arrival",
    activities: [
      "Drive to Tuscany countryside",
      "Check into agriturismo",
      "Welcome wine tasting",
      "Sunset over rolling vineyards",
      "Dinner with local wine pairings"
    ],
    icon: Wine
  },
  {
    day: 7,
    date: "May 19",
    location: "Tuscany",
    title: "Chianti Wine Region",
    activities: [
      "Day trip through Chianti vineyards",
      "Wine tasting at family vineyard",
      "Visit medieval San Gimignano",
      "Traditional Tuscan lunch",
      "Market visit in Siena"
    ],
    icon: Wine
  },
  {
    day: 8,
    date: "May 20",
    location: "Tuscany",
    title: "Tuscan Villages & Culture",
    activities: [
      "Explore Monteriggioni medieval walls",
      "Cooking class with local chef",
      "Learn traditional pasta making",
      "Lunch with your creations",
      "Evening stroll through Val d'Orcia"
    ],
    icon: Building
  },
  {
    day: 9,
    date: "May 21",
    location: "Tuscany",
    title: "Hidden Gems of Tuscany",
    activities: [
      "Visit Pienza - Renaissance village",
      "Pecorino cheese tasting",
      "Thermal springs at Bagno Vignoni",
      "Sunrise hot air balloon ride (optional)",
      "Farewell Tuscan dinner"
    ],
    icon: Landmark
  },
  {
    day: 10,
    date: "May 22",
    location: "Cinque Terre",
    title: "Villages of the Coast - Arrival",
    activities: [
      "Travel to Cinque Terre",
      "Check into Vernazza or Monterosso",
      "Explore colorful fishing villages",
      "Swimming in crystal waters",
      "Fresh pasta with local seafood"
    ],
    icon: Ship
  },
  {
    day: 11,
    date: "May 23",
    location: "Cinque Terre",
    title: "Hiking & Villages",
    activities: [
      "Hike scenic Cinque Terre trails",
      "Visit all 5 villages by boat & foot",
      "Pesto making workshop",
      "Sunset from cliff viewpoint",
      "Wine tasting with anchovies"
    ],
    icon: Mountain
  },
  {
    day: 12,
    date: "May 24",
    location: "Florence",
    title: "Renaissance Heart - Arrival",
    activities: [
      "Train to Florence",
      "Check into hotel in historic center",
      "Walk Ponte Vecchio at sunset",
      "Gelato in Piazza della Signoria",
      "Evening wine in Oltrarno"
    ],
    icon: Church
  },
  {
    day: 13,
    date: "May 25",
    location: "Florence",
    title: "Art & Culture",
    activities: [
      "Skip-the-line Uffizi Gallery tour",
      "Visit Accademia to see David",
      "Climb Duomo for city views",
      "Leather workshop visit",
      "Farewell dinner in Florence"
    ],
    icon: Landmark
  },
  {
    day: 14,
    date: "May 26",
    location: "Venice",
    title: "City of Canals - Finale",
    activities: [
      "High-speed train to Venice",
      "Water taxi to hotel on Grand Canal",
      "St. Mark's Basilica & Doge's Palace",
      "Gondola ride at sunset",
      "Final Italian dinner with Prosecco"
    ],
    icon: Ship
  }
];

function groupItineraryByLocation(days: ItineraryDay[]): LocationGroup[] {
  const groups: LocationGroup[] = [];
  let currentGroup: LocationGroup | null = null;

  days.forEach((day) => {
    if (!currentGroup || currentGroup.location !== day.location) {
      if (currentGroup) {
        groups.push(currentGroup);
      }
      currentGroup = {
        location: day.location,
        dateRange: day.date,
        days: [day],
        icon: day.icon,
        info: locationInfoMap[day.location] || {
          vibe: "",
          knownFor: "",
          mustDo: ""
        }
      };
    } else {
      currentGroup.days.push(day);
      currentGroup.dateRange = `${currentGroup.days[0].date} - ${day.date}`;
    }
  });

  if (currentGroup) {
    groups.push(currentGroup);
  }

  return groups;
}

const locationGroups = groupItineraryByLocation(itinerary);

const defaultPackingCategories: PackingCategory[] = [
  {
    name: "Essentials",
    items: [
      { id: "passport", name: "Passport", checked: false },
      { id: "wallet", name: "Wallet & cards", checked: false },
      { id: "phone", name: "Phone & charger", checked: false },
      { id: "adapter", name: "European adapter", checked: false },
      { id: "tickets", name: "Flight tickets", checked: false },
    ]
  },
  {
    name: "Clothing",
    items: [
      { id: "comfortable-shoes", name: "Comfortable walking shoes", checked: false },
      { id: "light-layers", name: "Light layers for evenings", checked: false },
      { id: "swimwear", name: "Swimwear", checked: false },
      { id: "sun-hat", name: "Sun hat", checked: false },
      { id: "dressy-outfit", name: "Nice outfit for dinners", checked: false },
    ]
  },
  {
    name: "Accessories",
    items: [
      { id: "sunglasses", name: "Sunglasses", checked: false },
      { id: "camera", name: "Camera", checked: false },
      { id: "daypack", name: "Day pack/backpack", checked: false },
      { id: "umbrella", name: "Compact umbrella", checked: false },
    ]
  },
  {
    name: "Toiletries",
    items: [
      { id: "sunscreen", name: "Sunscreen SPF 50+", checked: false },
      { id: "medications", name: "Medications", checked: false },
      { id: "toiletry-bag", name: "Toiletry bag", checked: false },
    ]
  }
];

const traditionalItalianSongs = [
  'https://archive.org/download/TarantellaNapoletana/Tarantella%20Napoletana.mp3',
  'https://archive.org/download/OSoleMio/03%20O%20Sole%20Mio.mp3',
  'https://archive.org/download/ItalianCanzoneGoldenHits/34%20Volare%20-%20Napolitan%20Mandolis.mp3',
  'https://archive.org/download/ItalianCanzoneGoldenHits/28%20Arriverderci%20Roma%20-%20Natalino%20Otto.mp3',
  'https://archive.org/download/ItalianCanzoneGoldenHits/21%20Mambo%20Italiano%20-%20Alma%20Cogan.mp3',
];

function getRandomSong(): string {
  return traditionalItalianSongs[Math.floor(Math.random() * traditionalItalianSongs.length)];
}

function getTargetDateFromUrl(): Date {
  const urlParams = new URLSearchParams(window.location.search);
  const dateParam = urlParams.get('date');
  if (dateParam) {
    const parsed = new Date(dateParam);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  return new Date('2026-05-12T19:40:00');
}

export default function Home() {
  const [targetDate] = useState<Date>(() => getTargetDateFromUrl());
  const targetDateString = targetDate.toISOString().split('T')[0];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSong] = useState<string>(() => getRandomSong());
  
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference,
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>(timeLeft);
  const [showConfetti, setShowConfetti] = useState(false);
  const [expandedLocations, setExpandedLocations] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showSongName, setShowSongName] = useState(false);
  const [packingCategories, setPackingCategories] = useState<PackingCategory[]>(() => {
    const saved = localStorage.getItem('italy-packing-list');
    return saved ? JSON.parse(saved) : defaultPackingCategories;
  });

  useEffect(() => {
    if (timeLeft.total <= 0) {
      if (!showConfetti) {
        setShowConfetti(true);
      }
      return;
    }
    
    const timer = setInterval(() => {
      setPrevTimeLeft(timeLeft);
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft.total <= 0 && !showConfetti) {
        setShowConfetti(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, timeLeft, showConfetti]);

  useEffect(() => {
    localStorage.setItem('italy-packing-list', JSON.stringify(packingCategories));
  }, [packingCategories]);

  const toggleLocation = (location: string) => {
    setExpandedLocations(prev => 
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
  };

  const togglePackingItem = (categoryName: string, itemId: string) => {
    setPackingCategories(prev => 
      prev.map(category => 
        category.name === categoryName
          ? {
              ...category,
              items: category.items.map(item =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              )
            }
          : category
      )
    );
  };

  useEffect(() => {
    audioRef.current = new Audio(currentSong);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    setShowSongName(true);
    
    audioRef.current.play().catch(() => {
      setIsPlaying(false);
    });
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentSong]);

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentSong);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    if (audioRef.current.paused) {
      setShowSongName(true);
      audioRef.current.play().catch(() => {
        console.log('Audio playback requires user interaction');
        setShowSongName(false);
      });
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const turnMusicOn = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentSong);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {
        console.log('Audio playback requires user interaction');
      });
      setIsPlaying(true);
    }
  };

  const hideSongName = useCallback(() => {
    setShowSongName(false);
  }, []);

  const isCountdownComplete = timeLeft.total <= 0;

  const highlights = [
    {
      icon: UtensilsCrossed,
      title: "Culinary Adventures",
      description: "From authentic Neapolitan pizza to fresh pasta in Tuscany, prepare your taste buds for an unforgettable journey."
    },
    {
      icon: Camera,
      title: "Stunning Scenery",
      description: "Capture the breathtaking Amalfi Coast, rolling Tuscan hills, and the timeless beauty of ancient Rome."
    },
    {
      icon: Wine,
      title: "Wine & Culture",
      description: "Savor world-renowned wines while exploring centuries of art, history, and Italian heritage."
    },
    {
      icon: Sun,
      title: "La Dolce Vita",
      description: "Embrace the sweet life - lazy afternoons, gelato by the sea, and the warmth of Italian hospitality."
    }
  ];

  const destinations = ["Rome", "Florence", "Venice", "Amalfi Coast", "Tuscany"];

  return (
    <div className="min-h-screen bg-background">
      {showConfetti && <Confetti />}
      
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Beautiful Amalfi Coast at sunset" 
            className="w-full h-full object-cover"
            data-testid="img-hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        {/* Top Controls - stacked vertically: checklist, share, sound */}
        <div className="absolute top-6 right-6 z-20 flex flex-col items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="glass-effect text-white border-white/20 h-11 w-11 p-0"
                data-testid="button-packing-list"
                aria-label="Open packing list"
              >
                <CheckSquare className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="font-serif text-xl flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-italy-green" />
                  Packing Checklist
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <PackingChecklist 
                  categories={packingCategories} 
                  onToggleItem={togglePackingItem}
                />
              </div>
            </SheetContent>
          </Sheet>
          <ShareButton daysLeft={timeLeft.days} targetDate={targetDateString} />
          <MusicToggle 
            isPlaying={isPlaying} 
            onToggle={toggleMusic}
            onTurnOn={turnMusicOn}
            songUrl={currentSong}
            showSongName={showSongName}
            onHideSongName={hideSongName}
          />
        </div>

        {/* Floating Icons */}
        <FloatingIcon icon={Plane} className="top-[15%] left-[10%] animate-float" delay="0s" />
        <FloatingIcon icon={Coffee} className="top-[25%] right-[12%] animate-float-delayed" delay="0.5s" />
        <FloatingIcon icon={UtensilsCrossed} className="bottom-[25%] left-[8%] animate-float" delay="1s" />
        <FloatingIcon icon={Wine} className="bottom-[30%] right-[10%] animate-float-delayed" delay="1.5s" />
        <FloatingIcon icon={Heart} className="top-[40%] left-[5%] animate-float-delayed opacity-30" delay="0.3s" />
        <FloatingIcon icon={Sparkles} className="top-[20%] right-[25%] animate-float opacity-30" delay="0.8s" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="w-32 mx-auto mb-6">
            <ItalianFlagStripe />
          </div>

          <p className="text-white/80 uppercase tracking-[0.3em] text-sm mb-4 text-shadow">
            The adventure begins
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 text-shadow-lg leading-tight">
            {isCountdownComplete ? (
              <>
                <span className="block">Buon Viaggio!</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl mt-4 font-normal">
                  The wait is over!
                </span>
              </>
            ) : (
              <>
                <span className="block">Italy Awaits</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl mt-4 font-normal italic">
                  Andiamo!
                </span>
              </>
            )}
          </h1>

          {!isCountdownComplete && (
            <div 
              className="flex flex-col items-center gap-6 sm:gap-8 mt-10"
              role="timer"
              aria-live="polite"
              data-testid="countdown-timer"
            >
              {/* Days - Large & Prominent */}
              <CountdownUnit value={timeLeft.days} label="Days" prevValue={prevTimeLeft.days} size="large" />
              
              {/* Hours, Minutes, Seconds Row */}
              <div className="flex items-start justify-center gap-3 sm:gap-4">
                <CountdownUnit value={timeLeft.hours} label="Hours" prevValue={prevTimeLeft.hours} />
                <TimeSeparator />
                <CountdownUnit value={timeLeft.minutes} label="Minutes" prevValue={prevTimeLeft.minutes} />
                <TimeSeparator />
                <CountdownUnit value={timeLeft.seconds} label="Seconds" prevValue={prevTimeLeft.seconds} />
              </div>
            </div>
          )}

          <p className="mt-10 text-white/70 text-lg sm:text-xl font-medium text-shadow" data-testid="text-target-date">
            {targetDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Trip Itinerary Section */}
      <section className="py-16 lg:py-24 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-24 mx-auto mb-6">
              <ItalianFlagStripe />
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Your Italian Adventure
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore each destination and activities!
            </p>
          </div>

          <div className="space-y-4">
            {locationGroups.map((group) => (
              <LocationCard
                key={group.location}
                group={group}
                isExpanded={expandedLocations.includes(group.location)}
                onToggle={() => toggleLocation(group.location)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trip Details Section */}
      <section className="py-16 lg:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <div className="w-24 mx-auto mb-6">
              <ItalianFlagStripe />
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Why Italy?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              From ancient ruins to Renaissance masterpieces, from coastal beauty to culinary excellence — 
              Italy offers an experience like no other.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <HighlightCard 
                  key={index}
                  icon={highlight.icon}
                  title={highlight.title}
                  description={highlight.description}
                />
              ))}
            </div>

            <div>
              <Card className="p-6 lg:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-italy-red/10">
                    <MapPin className="w-5 h-5 text-italy-red" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">Journey Snapshot</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide mb-3">Destinations</p>
                    <div className="flex flex-wrap gap-2">
                      {destinations.map((dest) => (
                        <DestinationBadge key={dest} name={dest} />
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Departure</p>
                      <p className="font-serif text-2xl font-semibold text-foreground">{targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      <p className="text-sm text-muted-foreground">{targetDate.getFullYear()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Duration</p>
                      <p className="font-serif text-2xl font-semibold text-foreground">14 Days</p>
                      <p className="text-sm text-muted-foreground">of adventure</p>
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  <div className="text-center py-4">
                    <p className="font-serif text-2xl italic text-foreground mb-2">"Viaggiare è vivere"</p>
                    <p className="text-sm text-muted-foreground">To travel is to live</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-12 px-4 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="w-16 mx-auto mb-6">
              <ItalianFlagStripe />
            </div>
            <p className="font-serif text-xl text-foreground mb-2">Pack your bags!</p>
            <p className="text-muted-foreground mb-6">
              {isCountdownComplete 
                ? "The adventure has begun! Buon viaggio!" 
                : `Only ${timeLeft.days} days until la dolce vita awaits.`
              }
            </p>
            <div className="flex justify-center gap-4 text-muted-foreground">
              <Plane className="w-5 h-5" />
              <Coffee className="w-5 h-5" />
              <UtensilsCrossed className="w-5 h-5" />
              <Wine className="w-5 h-5" />
              <Camera className="w-5 h-5" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
