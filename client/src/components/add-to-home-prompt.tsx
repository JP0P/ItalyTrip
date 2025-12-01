import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Heart, Share, Plus } from "lucide-react";

type DeviceType = "ios" | "android" | "other";

function getDeviceType(): DeviceType {
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/android/i.test(ua)) return "android";
  return "other";
}

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true
  );
}

export function AddToHomePrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>("other");

  useEffect(() => {
    const dismissed = localStorage.getItem("add-to-home-dismissed");
    const dismissedTime = dismissed ? parseInt(dismissed, 10) : 0;
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    
    if (Date.now() - dismissedTime < oneWeek) {
      return;
    }

    if (isStandalone()) {
      return;
    }

    const device = getDeviceType();
    setDeviceType(device);

    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 50);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem("add-to-home-dismissed", Date.now().toString());
    }, 300);
  };

  if (!isVisible) return null;

  const getInstruction = () => {
    if (deviceType === "ios") {
      return (
        <>
          <Share className="h-3 w-3 text-italy-green inline mr-1" />
          <span className="font-medium">Share</span> {">"} Add to Home
        </>
      );
    }
    if (deviceType === "android") {
      return (
        <>
          <Plus className="h-3 w-3 text-italy-green inline mr-1" />
          <span className="font-medium">Menu</span> {">"} Add to Home
        </>
      );
    }
    return (
      <>
        <Plus className="h-3 w-3 text-italy-green inline mr-1" />
        <span className="font-medium">Install</span> from browser menu
      </>
    );
  };

  return (
    <div
      className={`fixed bottom-24 right-4 z-50 transition-all duration-300 ${
        isAnimating ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"
      }`}
      data-testid="prompt-add-to-home"
    >
      <div className="relative">
        <div className="absolute -top-1 -left-1 animate-pulse">
          <Heart className="h-4 w-4 text-italy-red fill-italy-red" />
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-italy-green/20 overflow-hidden max-w-[200px]">
          <div className="p-3 pb-2">
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-1 right-1 h-5 w-5 rounded-full text-muted-foreground/60"
              onClick={handleDismiss}
              data-testid="button-dismiss-prompt"
            >
              <X className="h-2.5 w-2.5" />
            </Button>

            <p className="text-[11px] font-medium text-foreground pr-4 leading-tight">
              Save me to your home screen!
            </p>
            
            <p className="text-[10px] text-muted-foreground mt-1.5 leading-snug">
              {getInstruction()}
            </p>
          </div>

          <div className="h-0.5 w-full flex">
            <div className="flex-1 bg-italy-green" />
            <div className="flex-1 bg-white dark:bg-gray-300" />
            <div className="flex-1 bg-italy-red" />
          </div>
        </div>
      </div>
    </div>
  );
}
