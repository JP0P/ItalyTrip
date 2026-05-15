import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronDown, Circle, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DailyBit } from "@/data/daily-bits";

interface DailyBitCardProps {
  bit: DailyBit;
  featured?: boolean;
}

function getStorageKey(bit: DailyBit) {
  return `side-quests:${bit.isoDate}`;
}

function getExpandedStorageKey(bit: DailyBit) {
  return `side-quests-expanded:${bit.isoDate}`;
}

function getSavedCompleted(bit: DailyBit) {
  if (typeof window === "undefined") {
    return Array.from({ length: bit.sideQuests.length }, () => false);
  }

  try {
    const saved = window.localStorage.getItem(getStorageKey(bit));
    const parsed = saved ? JSON.parse(saved) : null;
    if (!Array.isArray(parsed)) {
      return Array.from({ length: bit.sideQuests.length }, () => false);
    }

    return bit.sideQuests.map((_, index) => Boolean(parsed[index]));
  } catch {
    return Array.from({ length: bit.sideQuests.length }, () => false);
  }
}

function getSavedExpanded(bit: DailyBit, featured: boolean) {
  if (!featured || typeof window === "undefined") return !featured;

  try {
    return window.localStorage.getItem(getExpandedStorageKey(bit)) === "true";
  } catch {
    return false;
  }
}

export function DailyBitCard({ bit, featured = false }: DailyBitCardProps) {
  const storageKey = useMemo(() => getStorageKey(bit), [bit]);
  const expandedStorageKey = useMemo(() => getExpandedStorageKey(bit), [bit]);
  const [completed, setCompleted] = useState<boolean[]>(() => getSavedCompleted(bit));
  const [isExpanded, setIsExpanded] = useState(() => getSavedExpanded(bit, featured));

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, JSON.stringify(completed));
  }, [completed, storageKey]);

  useEffect(() => {
    if (typeof window === "undefined" || !featured) return;
    window.localStorage.setItem(expandedStorageKey, String(isExpanded));
  }, [expandedStorageKey, featured, isExpanded]);

  const completedCount = completed.filter(Boolean).length;
  const allComplete = completedCount === bit.sideQuests.length && bit.sideQuests.length > 0;

  useEffect(() => {
    if (!featured || !allComplete || !isExpanded) return;

    const timer = window.setTimeout(() => setIsExpanded(false), 800);
    return () => window.clearTimeout(timer);
  }, [allComplete, featured, isExpanded]);

  const toggleQuest = (index: number) => {
    setCompleted((current) =>
      current.map((value, questIndex) => (questIndex === index ? !value : value)),
    );
  };

  const resetQuests = () => {
    setCompleted(Array.from({ length: bit.sideQuests.length }, () => false));
    if (featured) setIsExpanded(true);
  };

  const toggleExpanded = () => {
    if (!featured) return;
    setIsExpanded((current) => !current);
  };

  const showQuestDetails = !featured || isExpanded;

  return (
    <Card
      className={`overflow-hidden ${
        featured
          ? "border-italy-red/30 bg-gradient-to-br from-italy-red/10 via-card to-italy-green/10 shadow-xl ring-1 ring-italy-red/10"
          : "border-0 shadow-md"
      }`}
      data-testid="card-todays-missions"
    >
      {featured && (
        <div className="h-1.5 bg-gradient-to-r from-italy-green via-white to-italy-red" />
      )}
      <div className={featured ? "p-4 sm:p-5" : "p-5 sm:p-6"}>
        <button
          type="button"
          onClick={toggleExpanded}
          className={`w-full flex items-center justify-between gap-3 text-left ${showQuestDetails ? "mb-4" : ""}`}
          aria-expanded={showQuestDetails}
          data-testid="button-toggle-todays-missions"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={featured ? "text-xl" : "text-base"} aria-hidden="true">🎯</span>
              <span className={`uppercase tracking-widest font-semibold ${featured ? "text-italy-red text-xs" : "text-muted-foreground text-xs"}`}>
                {featured ? "Today's Missions" : "Crew Side Quests 🎯"}
              </span>
            </div>
            <p className={featured ? "text-sm font-medium text-foreground" : "text-xs text-muted-foreground"}>
              {completedCount}/{bit.sideQuests.length} complete{allComplete ? " ✅" : ""}
              {showQuestDetails ? " · tap a quest to mark it done" : " · tap to expand"}
            </p>
          </div>

          {featured && (
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 text-italy-red transition-transform ${showQuestDetails ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          )}
        </button>

        {showQuestDetails && completedCount > 0 && (
          <div className="mb-3 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetQuests}
              className="h-8 rounded-full text-xs text-muted-foreground"
              data-testid="button-reset-side-quests"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Reset
            </Button>
          </div>
        )}

        {showQuestDetails && (
          <ul className={featured ? "space-y-2.5" : "space-y-3"}>
          {bit.sideQuests.map((quest, i) => {
            const isComplete = completed[i];

            return (
              <li key={`${bit.isoDate}-${i}`}>
                <button
                  type="button"
                  onClick={() => toggleQuest(i)}
                  className={`w-full flex items-start gap-3 rounded-xl border text-left text-sm leading-snug transition-all ${
                    featured ? "p-3.5 shadow-sm active:scale-[0.99]" : "p-3"
                  } ${
                    isComplete
                      ? "bg-italy-green/10 border-italy-green/30 text-foreground/70"
                      : featured
                        ? "bg-background/90 border-italy-red/20 text-foreground hover:border-italy-red/40 hover:bg-white/90"
                        : "bg-card border-border text-foreground hover:border-italy-green/30 hover:bg-italy-green/5"
                  }`}
                  aria-pressed={isComplete}
                  data-testid={`button-side-quest-${i}`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-5 h-5 text-italy-green mt-0.5 flex-shrink-0" />
                  ) : (
                    <Circle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${featured ? "text-italy-red" : "text-muted-foreground"}`} />
                  )}
                  <span className={isComplete ? "line-through decoration-italy-green/60" : ""}>
                    {quest}
                  </span>
                </button>
              </li>
            );
          })}
          </ul>
        )}

        {showQuestDetails && allComplete && (
          <div className="mt-4 px-4 py-3 bg-italy-green/10 border border-italy-green/25 rounded-lg">
            <p className="text-xs font-medium text-italy-green leading-snug">
              ✅ Side quest board cleared. Dangerous levels of vacation competence.
            </p>
          </div>
        )}

        {showQuestDetails && bit.chaosBonus && (
          <div className="mt-4 px-4 py-3 bg-italy-green/8 border border-italy-green/20 rounded-lg">
            <p className="text-xs font-medium text-italy-green leading-snug">
              🎲 Chaos Bonus: {bit.chaosBonus}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
