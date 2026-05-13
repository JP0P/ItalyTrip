import { Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DailyBit } from "@/data/daily-bits";

interface DailyBitCardProps {
  bit: DailyBit;
}

export function DailyBitCard({ bit }: DailyBitCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-italy-red" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
            Crew Side Quests 🎯
          </span>
        </div>

        <ul className="space-y-3">
          {bit.sideQuests.map((quest, i) => (
            <li
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border text-sm text-foreground leading-snug"
            >
              <span className="text-base leading-none mt-0.5 flex-shrink-0">→</span>
              <span>{quest}</span>
            </li>
          ))}
        </ul>

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
