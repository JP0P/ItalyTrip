import { useState, useEffect } from "react";
import { X, Heart, Share, Plus, Smartphone } from "lucide-react";

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
          Tap <Share className="h-3 w-3 inline -mt-0.5 mx-0.5" /> then <span className="font-semibold">Add to Home</span>
        </>
      );
    }
    if (deviceType === "android") {
      return (
        <>
          Tap <span className="font-semibold">Menu</span> then <span className="font-semibold">Add to Home</span>
        </>
      );
    }
    return (
      <>
        <span className="font-semibold">Install</span> from browser menu
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
      <div className="flex items-center gap-2 py-2 pl-2.5 pr-1.5 bg-white dark:bg-gray-900 rounded-full shadow-lg border border-border">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-italy-green to-italy-green/80">
          <Smartphone className="h-3.5 w-3.5 text-white" />
        </div>
        
        <div className="flex flex-col gap-0 pr-1">
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-medium text-foreground whitespace-nowrap">
              Add to Home
            </span>
            <Heart className="h-2.5 w-2.5 text-italy-red fill-italy-red animate-pulse" />
          </div>
          <span className="text-[9px] text-muted-foreground whitespace-nowrap">
            {getInstruction()}
          </span>
        </div>

        <button
          onClick={handleDismiss}
          className="flex items-center justify-center w-5 h-5 rounded-full text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/50 transition-colors"
          data-testid="button-dismiss-prompt"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
