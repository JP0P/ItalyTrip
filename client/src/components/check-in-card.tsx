import { useState, useRef, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { MapPin, CheckCircle2, Send, LocateFixed, AlertCircle, Camera, X } from "lucide-react";

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

const MAX_DIMENSION = 800;
const JPEG_QUALITY = 0.65;
const MAX_COMPRESSED_BYTES = 300 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

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

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const scale = MAX_DIMENSION / Math.max(width, height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("Canvas not supported")); return; }
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg", JPEG_QUALITY);
      if (dataUrl.length > MAX_COMPRESSED_BYTES) {
        reject(new Error("Photo is still too large after compression. Try a smaller image."));
        return;
      }
      resolve(dataUrl);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that image. Try a JPEG or PNG."));
    };
    img.src = url;
  });
}

export function CheckInCard({ location, isoDate }: CheckInCardProps) {
  const [customPlace, setCustomPlace] = useState("");
  const [checkInNote, setCheckInNote] = useState("");
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Photo state
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const checkIns = getDefaultCheckIns(location);

  const checkInMutation = useMutation({
    mutationFn: async (payload: { message: string; photo?: string | null }) => {
      const res = await apiRequest("POST", "/api/chat/messages", {
        nickname: getNickname(),
        message: payload.message,
        ...(payload.photo ? { photo: payload.photo } : {}),
      });
      return res.json();
    },
    onSuccess: (_data, payload) => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/messages"] });
      setLastCheckIn(payload.message);
      setCustomPlace("");
      setCheckInNote("");
      setPhotoPreview(null);
      setPhotoError(null);
    },
  });

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (e.target) e.target.value = ""; // reset so same file can be re-selected
    if (!file) return;

    setPhotoError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setPhotoError("Unsupported format. Use JPEG, PNG, or WebP.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setPhotoError("Photo is too large (max 10 MB before compression).");
      return;
    }

    try {
      const dataUrl = await compressImage(file);
      setPhotoPreview(dataUrl);
    } catch (err) {
      setPhotoError(err instanceof Error ? err.message : "Failed to process photo.");
    }
  }, []);

  const removePhoto = useCallback(() => {
    setPhotoPreview(null);
    setPhotoError(null);
  }, []);

  const withOptionalNote = (message: string) => {
    const note = checkInNote.trim();
    return note ? `${message}\n📝 ${note}` : message;
  };

  const sendCheckIn = (message: string) => {
    const stampedMessage = `${withOptionalNote(message)}\n📍 Trip check-in · ${isoDate}`;
    checkInMutation.mutate({ message: stampedMessage, photo: photoPreview });
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

      {/* Photo picker / preview */}
      <div className="mb-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          className="hidden"
          onChange={handleFileSelect}
          data-testid="input-photo-file"
        />
        {photoPreview ? (
          <div className="relative rounded-2xl overflow-hidden border border-italy-green/20 bg-white/80">
            <img
              src={photoPreview}
              alt="Photo preview"
              className="w-full max-h-48 object-cover"
            />
            <button
              type="button"
              onClick={removePhoto}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
              data-testid="button-remove-photo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full rounded-2xl bg-white/80 border-italy-green/20 hover:bg-italy-green/10"
            onClick={() => fileInputRef.current?.click()}
            disabled={checkInMutation.isPending}
            data-testid="button-add-photo"
          >
            <Camera className="w-4 h-4 mr-2" />
            Add a photo
          </Button>
        )}
        {photoError && (
          <div className="mt-2 flex items-start gap-2 rounded-2xl bg-italy-red/10 px-3 py-2 text-sm text-italy-red">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{photoError}</span>
          </div>
        )}
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
