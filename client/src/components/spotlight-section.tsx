import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink } from "lucide-react";

interface Spotlight {
  id: string;
  slug: string;
  publishedDate: string;
  location: string;
  headline: string;
  subheadline: string;
  body: string;
  image: string;
  imageCredit: string;
  link: string;
  linkLabel: string;
}

interface SpotlightsData {
  spotlights: Spotlight[];
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

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function PastSpotlightCard({
  spotlight,
  isActive,
  onSelect,
}: {
  spotlight: Spotlight;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full text-left"
      aria-pressed={isActive}
      aria-label={`Show ${spotlight.headline} as current spotlight`}
    >
      <Card
        className={`overflow-hidden border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
          isActive
            ? "border-italy-red/60 ring-1 ring-italy-red/30"
            : "border-border hover:border-italy-red/30"
        }`}
      >
        <div className="relative h-32 overflow-hidden">
          <img
            src={spotlight.image}
            alt={spotlight.headline}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="text-xs bg-black/60 text-white border-white/20">
              Drop #{spotlight.id}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin className="w-3 h-3 text-italy-red" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide">{spotlight.location}</span>
          </div>

          <p className="font-serif font-semibold text-sm text-foreground leading-snug line-clamp-2 mb-2">
            {spotlight.headline}
          </p>

          <p className="text-xs text-muted-foreground">
            Tap to bring this into the main spotlight
          </p>
        </div>
      </Card>
    </button>
  );
}

export function SpotlightSection() {
  const [data, setData] = useState<SpotlightsData | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch("/spotlights.json")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  useEffect(() => {
    return () => {
      if (transitionRef.current) {
        clearTimeout(transitionRef.current);
      }
    };
  }, []);

  if (!data || data.spotlights.length === 0) return null;

  const allSpotlights = data.spotlights;
  const featured = allSpotlights[featuredIndex] ?? allSpotlights[0];

  const past = allSpotlights
    .map((spotlight, index) => ({ spotlight, index }))
    .filter((item) => item.index !== featuredIndex);

  const handleSelectSpotlight = (index: number) => {
    if (index === featuredIndex) return;

    setIsTransitioning(true);

    if (transitionRef.current) {
      clearTimeout(transitionRef.current);
    }

    transitionRef.current = setTimeout(() => {
      setFeaturedIndex(index);
      setImageError(false);
      setIsTransitioning(false);
    }, 220);
  };

  return (
    <section className="py-16 lg:py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-24 mx-auto mb-6">
            <ItalianFlagStripe />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-italy-red/10 mb-4">
            <span className="text-xs font-semibold text-italy-red uppercase tracking-widest">Drop #{featured.id}</span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-3">The Spotlight</h2>
          <p className="text-muted-foreground text-sm">
            Things you should be losing sleep over. Updated every few days.
          </p>
        </div>

        {/* Featured Spotlight */}
        <div
          className={`transition-all duration-300 ease-out ${
            isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          <Card className="overflow-hidden border-border shadow-lg mb-10">
            {/* Image */}
            <div className="relative h-72 lg:h-96 overflow-hidden bg-muted">
              {!imageError ? (
                <img
                  src={featured.image}
                  alt={featured.headline}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-italy-green/20 to-italy-red/20">
                  <MapPin className="w-16 h-16 text-italy-red/40" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Overlay badges */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <Badge className="bg-italy-red text-white border-none text-xs font-semibold uppercase tracking-wide">
                  {featured.location}
                </Badge>
                <span className="text-white/60 text-xs">{formatDate(featured.publishedDate)}</span>
              </div>

              {featured.imageCredit && (
                <span className="absolute bottom-4 right-4 text-white/40 text-xs">📷 {featured.imageCredit}</span>
              )}
            </div>

            {/* Content */}
            <div className="p-6 lg:p-10">
              <p className="text-italy-red text-sm font-semibold uppercase tracking-widest mb-3">{featured.subheadline}</p>
              <h3 className="font-serif text-2xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                {featured.headline}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">{featured.body}</p>

              {featured.link && (
                <div className="mt-8">
                  <Button
                    asChild
                    variant="outline"
                    className="border-italy-green text-italy-green hover:bg-italy-green hover:text-white transition-colors"
                  >
                    <a href={featured.link} target="_blank" rel="noopener noreferrer">
                      {featured.linkLabel}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Past Spotlights */}
        {past.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4 font-medium">Previous Drops</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {past.map(({ spotlight, index }) => (
                <PastSpotlightCard
                  key={spotlight.id}
                  spotlight={spotlight}
                  isActive={index === featuredIndex}
                  onSelect={() => handleSelectSpotlight(index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
