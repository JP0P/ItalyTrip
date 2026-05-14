import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Circle, RotateCcw, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DailyBit } from "@/data/daily-bits";

interface DailyBitCardProps {
  bit: DailyBit;
}

function getStorageKey(bit: DailyBit) {
  return `side-quests:${bit.isoDate}`;
}

export function DailyBitCard({ bit }: DailyBitCardProps) {
  const storageKey = useMemo(() => getStorageKey(bit), [bit]);
  const [completed, setCompleted] = useState<boolean[]>(() =>
    Array.from({ length: bit.sideQuests.length }, () => false),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) {
        setCompleted(Array.from({ length: bit.sideQuests.length }, () => false));
        return;
      }

      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return;

      setCompleted(
        bit.sideQuests.map((_, index) => Boolean(parsed[index])),
      );
    } catch {
      setCompleted(Array.from({ length: bit.sideQuests.length }, () => false));
    }
  }, [bit.sideQuests, storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, JSON.stringify(completed));
  }, [completed, storageKey]);

  const completedCount = completed.filter(Boolean).length;
  const allComplete = completedCount === bit.sideQuests.length && bit.sideQuests.length > 0;

  const toggleQuest = (index: number) => {
    setCompleted((current) =>
      current.map((value, questIndex) => (questIndex === index ? !value : value)),
    );
  };

  const resetQuests = () => {
    setCompleted(Array.from({ length: bit.sideQuests.length }, () => false));
  };

  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-italy-red" />
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                Crew Side Quests 🎯
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {completedCount}/{bit.sideQuests.length} completed · tap to check off
            </p>
          </div>

          {completedCount > 0 && (
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
          )}
        </div>

        <ul className="space-y-3">
          {bit.sideQuests.map((quest, i) => {
            const isComplete = completed[i];

            return (
              <li key={`${bit.isoDate}-${i}`}>
                <button
                  type="button"
                  onClick={() => toggleQuest(i)}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left text-sm leading-snug transition-all ${
                    isComplete
                      ? "bg-italy-green/10 border-italy-green/30 text-foreground/70"
                      : "bg-card border-border text-foreground hover:border-italy-green/30 hover:bg-italy-green/5"
                  }`}
                  aria-pressed={isComplete}
                  data-testid={`button-side-quest-${i}`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-5 h-5 text-italy-green mt-0.5 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  )}
                  <span className={isComplete ? "line-through decoration-italy-green/60" : ""}>
                    {quest}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {allComplete && (
          <div className="mt-4 px-4 py-3 bg-italy-green/10 border border-italy-green/25 rounded-lg">
            <p className="text-xs font-medium text-italy-green leading-snug">
              ✅ Side quest board cleared. Dangerous levels of vacation competence.
            </p>
          </div>
        )}

        {bit.chaosBonus && (
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
