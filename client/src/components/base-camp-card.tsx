import { ExternalLink, MapPin, Moon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface LocationInfo {
  vibe: string;
  knownFor: string;
  mustDo: string;
  airbnbUrl?: string;
  stayUrl?: string;
  stayLabel?: string;
}

interface BaseCampCardProps {
  location: string;
  locationInfo: LocationInfo;
}

export function BaseCampCard({ location, locationInfo }: BaseCampCardProps) {
  const stayUrl = locationInfo.stayUrl || locationInfo.airbnbUrl;
  const stayLabel = locationInfo.stayLabel || "Airbnb";

  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <Moon className="w-4 h-4 text-italy-green" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
            Tonight's Base Camp 🏠
          </span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin className="w-4 h-4 text-italy-red flex-shrink-0" />
              <h3 className="font-serif text-lg font-semibold text-foreground">
                {location}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-snug">
              {locationInfo.vibe}
            </p>
          </div>

          {stayUrl && (
            <a
              href={stayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-italy-green/10 text-italy-green text-sm font-medium hover:bg-italy-green/20 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {stayLabel}
            </a>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Must-do:</span>{" "}
            {locationInfo.mustDo}
          </p>
        </div>
      </div>
    </Card>
  );
}
