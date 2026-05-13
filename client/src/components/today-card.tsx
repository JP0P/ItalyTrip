import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DailyBit } from "@/data/daily-bits";

interface TodayItineraryDay {
  day: number;
  date: string;
  isoDate: string;
  location: string;
  title: string;
  activities: string[];
}

interface TodayCardProps {
  entry: TodayItineraryDay;
  dayNumber: number;
  totalDays: number;
  bit: DailyBit | null;
}

export function TodayCard({ entry, dayNumber, totalDays, bit }: TodayCardProps) {
  const headline = bit?.headlineOverride ?? entry.title;
  const urgencyLine = bit?.urgencyLine ?? null;

  return (
    <Card className="overflow-hidden border-0 shadow-xl">
      {/* Italian flag accent bar */}
      <div className="flex h-1.5 w-full overflow-hidden">
        <div className="flex-1 bg-italy-green" />
        <div className="flex-1 bg-white border-y border-border/30" />
        <div className="flex-1 bg-italy-red" />
      </div>

      <div className="p-5 sm:p-6">
        {/* Day counter */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Now Playing in Rome 🇮🇹
            </span>
          </div>
          <span className="text-sm font-semibold text-italy-green bg-italy-green/10 px-3 py-1 rounded-full">
            Day {dayNumber} of {totalDays}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
          <MapPin className="w-4 h-4 text-italy-red flex-shrink-0" />
          <span className="text-sm">{entry.location} · {entry.date}</span>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-4">
          {headline}
        </h2>

        {/* Activities */}
        <ul className="space-y-2 mb-4">
          {entry.activities.map((activity, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <span className="text-italy-green mt-0.5 flex-shrink-0">•</span>
              <span>{activity}</span>
            </li>
          ))}
        </ul>

        {/* Urgency line */}
        {urgencyLine && (
          <div className="mt-4 px-4 py-3 bg-italy-red/8 border border-italy-red/20 rounded-lg">
            <p className="text-sm font-medium text-italy-red leading-snug">
              ⚡ {urgencyLine}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
