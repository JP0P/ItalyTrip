import { ExternalLink, MapPin } from "lucide-react";
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

        {/* Flexible suggestions */}
        {bit?.suggestionSections?.length ? (
          <div className="space-y-3 mb-4">
            {bit.suggestionSections.map((section) => (
              <div key={section.label} className="rounded-xl border border-border bg-card/70 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base" aria-hidden="true">{section.emoji}</span>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                    {section.label}
                  </h3>
                </div>
                <ul className="space-y-1.5">
                  {section.ideas.map((idea) => (
                    <li key={idea} className="flex items-start gap-2 text-sm text-foreground leading-snug">
                      <span className="text-italy-green mt-0.5 flex-shrink-0">•</span>
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-2 mb-4">
            {entry.activities.map((activity, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="text-italy-green mt-0.5 flex-shrink-0">•</span>
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Explore links */}
        {bit?.exploreLinks?.length ? (
          <div className="mb-4 rounded-xl border border-italy-green/20 bg-italy-green/5 p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base" aria-hidden="true">📸</span>
              <h3 className="text-xs uppercase tracking-widest text-italy-green font-semibold">
                Photos / links to explore
              </h3>
            </div>
            <div className="grid gap-2">
              {bit.exploreLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-3 rounded-lg bg-background/80 px-3 py-2 text-left hover:bg-background transition-colors"
                >
                  <span>
                    <span className="block text-sm font-medium text-foreground">{link.label}</span>
                    {link.note && (
                      <span className="block text-xs text-muted-foreground mt-0.5">{link.note}</span>
                    )}
                  </span>
                  <ExternalLink className="w-4 h-4 text-italy-green mt-0.5 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        ) : null}

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
