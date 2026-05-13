import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { phrases, categoryLabels, type PhraseCategory } from "@/data/phrases";

const CATEGORY_ORDER: PhraseCategory[] = [
  "ordering",
  "directions",
  "basics",
  "emergency",
  "the-bit",
];

function PhraseRow({ italian, english, phonetic }: { italian: string; english: string; phonetic: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(italian);
      } else {
        const ta = document.createElement("textarea");
        ta.value = italian;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // silently fail
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full text-left flex items-start justify-between gap-3 p-3 rounded-lg hover:bg-muted/50 active:bg-muted transition-colors group"
      aria-label={`Copy: ${italian}`}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground leading-snug">{italian}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{english}</p>
        <p className="text-xs text-italy-green/70 italic mt-0.5 leading-snug">{phonetic}</p>
      </div>
      <div className="flex-shrink-0 mt-0.5">
        {copied ? (
          <Check className="w-4 h-4 text-italy-green" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
        )}
      </div>
    </button>
  );
}

export function PhraseCheatsheet() {
  const [activeCategory, setActiveCategory] = useState<PhraseCategory>("ordering");

  const visiblePhrases = phrases.filter((p) => p.category === activeCategory);

  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <div className="p-5 sm:p-6">
        <div className="mb-4">
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
            Italian Survival Kit 🗣️
          </span>
          <p className="text-xs text-muted-foreground mt-0.5">Tap any phrase to copy it.</p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1.5 flex-wrap mb-4">
          {CATEGORY_ORDER.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-2.5 py-1.5 rounded-full font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-italy-green text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Phrases */}
        <div className="divide-y divide-border">
          {visiblePhrases.map((phrase, i) => (
            <PhraseRow
              key={i}
              italian={phrase.italian}
              english={phrase.english}
              phonetic={phrase.phonetic}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
