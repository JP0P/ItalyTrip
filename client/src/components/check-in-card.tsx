import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { MapPin, CheckCircle2, Send, LocateFixed, AlertCircle } from "lucide-react";

interface CheckInCardProps {
  location: string;
  isoDate: string;
}

const romeCheckIns = [
  { label: "Vatican", emoji: "⛪", message: "Checked in at the Vatican ⛪" },
  { label: "Pantheon", emoji: "🏛️", message: "Checked in at the Pantheon 🏛️" },
  { label: "The Court", emoji: "🥂", message: "Checked in at The Court — Colosseum-view drinks mode 🥂🏛️" },
  { label: "Gelato", emoji: "🍦", message: "Gelato check-in 🍦" },
];

function getNickname() {
  if (typeof window === "undefined") return "Trip Crew";
  return localStorage.getItem("chat-nickname") || "Trip Crew";
}

function getDefaultCheckIns(location: string) {
  if (location === "Rome") return romeCheckIns;
  return [
    { label: location, emoji: "📍", message: `Checked in at ${location} 📍` },
    { label: "Food stop", emoji: "🍝", message: "Food stop check-in 🍝" },
    { label: "View", emoji: "📸", message: "View check-in 📸" },
    { label: "Gelato", emoji: "🍦", message: "Gelato check-in 🍦" },
  ];
}

export function CheckInCard({ location, isoDate }: CheckInCardProps) {
  const [customPlace, setCustomPlace] = useState("");
  const [checkInNote, setCheckInNote] = useState("");
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const checkIns = getDefaultCheckIns(location);

  const checkInMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await apiRequest("POST", "/api/chat/messages", {
        nickname: getNickname(),
        message,
      });
      return res.json();
    },
    onSuccess: (_data, message) => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/messages"] });
      setLastCheckIn(message);
      setCustomPlace("");
      setCheckInNote("");
    },
  });

  const withOptionalNote = (message: string) => {
    const note = checkInNote.trim();
    return note ? `${message}\n📝 ${note}` : message;
  };

  const sendCheckIn = (message: string) => {
    const stampedMessage = `${withOptionalNote(message)}\n📍 Trip check-in · ${isoDate}`;
    checkInMutation.mutate(stampedMessage);
  };

  const sendCustom = () => {
    const place = customPlace.trim();
    if (!place) return;
    sendCheckIn(`Checked in at ${place} 📍`);
  };

  const sendCurrentLocation = () => {
    setLocationError(null);

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocationError("This browser does not support location check-ins.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const lat = latitude.toFixed(5);
        const lng = longitude.toFixed(5);
        const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
        const accuracyText = Number.isFinite(accuracy)
          ? ` · approx ${Math.round(accuracy)}m accuracy`
          : "";
        setIsLocating(false);
        sendCheckIn(`Live location check-in 📍\n${mapsUrl}${accuracyText}`);
      },
      () => {
        setIsLocating(false);
        setLocationError("Location was blocked or unavailable. Manual check-in still works.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  }; 

  return (
    <Card className="overflow-hidden border-italy-green/20 bg-gradient-to-br from-white via-italy-cream/50 to-italy-green/10 p-4 sm:p-5 shadow-sm">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2.5 rounded-2xl bg-italy-green text-white shadow-sm">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-italy-green mb-1">
            Crew check-in
          </p>
          <h3 className="font-serif text-xl font-semibold text-foreground">
            Drop a breadcrumb
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mt-1">
            Tap once to log where the crew is. Optional GPS asks your browser for one-time permission.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        {checkIns.map((item) => (
          <Button
            key={item.label}
            variant="outline"
            className="justify-start rounded-2xl bg-white/80 border-italy-green/20 hover:bg-italy-green/10"
            onClick={() => sendCheckIn(item.message)}
            disabled={checkInMutation.isPending}
            data-testid={`button-check-in-${item.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
          >
            <span className="mr-2">{item.emoji}</span>
            {item.label}
          </Button>
        ))}
      </div>

      <div className="mb-3">
        <Textarea
          value={checkInNote}
          onChange={(event) => setCheckInNote(event.target.value)}
          placeholder="Optional note… line was fake scary, view was absurd, gelato was elite"
          maxLength={180}
          rows={3}
          disabled={checkInMutation.isPending}
          className="resize-none rounded-2xl bg-white/80 border-italy-green/20"
          data-testid="textarea-check-in-note"
        />
        <p className="mt-1 text-[11px] text-muted-foreground text-right">
          {checkInNote.length}/180
        </p>
      </div>

      <Button
        variant="default"
        className="w-full rounded-2xl mb-3 bg-italy-green hover:bg-italy-green/90"
        onClick={sendCurrentLocation}
        disabled={isLocating || checkInMutation.isPending}
        data-testid="button-gps-check-in"
      >
        <LocateFixed className="w-4 h-4 mr-2" />
        {isLocating ? "Finding you…" : "Use current GPS"}
      </Button>

      <div className="flex gap-2">
        <Input
          value={customPlace}
          onChange={(event) => setCustomPlace(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              sendCustom();
            }
          }}
          placeholder="Custom spot…"
          maxLength={60}
          disabled={checkInMutation.isPending}
          data-testid="input-custom-check-in"
        />
        <Button
          size="icon"
          onClick={sendCustom}
          disabled={!customPlace.trim() || checkInMutation.isPending}
          data-testid="button-custom-check-in"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {locationError && (
        <div className="mt-3 flex items-start gap-2 rounded-2xl bg-italy-red/10 px-3 py-2 text-sm text-italy-red">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{locationError}</span>
        </div>
      )}

      {lastCheckIn && (
        <div className="mt-3 flex items-start gap-2 rounded-2xl bg-italy-green/10 px-3 py-2 text-sm text-italy-green">
          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>Checked in. Sean can see this in the site chat.</span>
        </div>
      )}
    </Card>
  );
}
