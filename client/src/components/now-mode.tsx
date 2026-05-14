import { TodayCard } from "@/components/today-card";
import { BaseCampCard } from "@/components/base-camp-card";
import { DailyBitCard } from "@/components/daily-bit-card";
import { PhraseCheatsheet } from "@/components/phrase-cheatsheet";
import { CheckInCard } from "@/components/check-in-card";
import { dailyBits } from "@/data/daily-bits";

interface NowItineraryDay {
  day: number;
  date: string;
  isoDate: string;
  location: string;
  title: string;
  activities: string[];
}

interface LocationInfo {
  vibe: string;
  knownFor: string;
  mustDo: string;
  airbnbUrl?: string;
  stayUrl?: string;
  stayLabel?: string;
}

interface NowModeProps {
  todayEntry: NowItineraryDay;
  dayNumber: number;
  totalDays: number;
  locationInfoMap: Record<string, LocationInfo>;
}

export function NowMode({ todayEntry, dayNumber, totalDays, locationInfoMap }: NowModeProps) {
  const bit = dailyBits[todayEntry.isoDate] ?? null;
  const baseLocationInfo = locationInfoMap[todayEntry.location] ?? {
    vibe: todayEntry.location,
    knownFor: "",
    mustDo: "",
  };

  const locationInfo = {
    ...baseLocationInfo,
    mustDo:
      todayEntry.isoDate === "2026-05-14"
        ? "Good flexible combo: Pantheon, Colosseum, then Trastevere if everyone still has feet."
        : baseLocationInfo.mustDo,
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 px-4 py-6 sm:py-8">
      <CheckInCard location={todayEntry.location} isoDate={todayEntry.isoDate} />
      <TodayCard
        entry={todayEntry}
        dayNumber={dayNumber}
        totalDays={totalDays}
        bit={bit}
      />
      <BaseCampCard location={todayEntry.location} locationInfo={locationInfo} />
      {bit && <DailyBitCard bit={bit} />}
      <PhraseCheatsheet />
    </div>
  );
}
