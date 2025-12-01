import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Smartphone, Share, Plus } from "lucide-react";

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

  return (
    <div
      className={`fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 transition-all duration-300 ${
        isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      data-testid="prompt-add-to-home"
    >
      <div className="relative overflow-visible rounded-2xl bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950/30 border border-italy-green/20 shadow-lg">
        <div className="absolute -top-3 -right-2 w-8 h-8 bg-italy-red rounded-full flex items-center justify-center animate-bounce shadow-md">
          <span className="text-white text-xs font-bold">!</span>
        </div>
        
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 h-6 w-6 rounded-full text-muted-foreground"
          onClick={handleDismiss}
          data-testid="button-dismiss-prompt"
        >
          <X className="h-3 w-3" />
        </Button>

        <div className="p-4 pr-8">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-italy-green to-green-600 flex items-center justify-center shadow-sm">
              <Smartphone className="h-5 w-5 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-sm mb-0.5">
                Portami a casa!
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Add this trip countdown to your home screen for quick access
              </p>
              
              <div className="mt-3 p-2.5 rounded-lg bg-background/80 dark:bg-background/50 border border-border/50">
                {deviceType === "ios" ? (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Share className="h-3.5 w-3.5 text-italy-green flex-shrink-0" />
                    <span>
                      Tap <span className="font-medium text-foreground">Share</span> then{" "}
                      <span className="font-medium text-foreground">"Add to Home Screen"</span>
                    </span>
                  </div>
                ) : deviceType === "android" ? (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Plus className="h-3.5 w-3.5 text-italy-green flex-shrink-0" />
                    <span>
                      Tap <span className="font-medium text-foreground">Menu</span> then{" "}
                      <span className="font-medium text-foreground">"Add to Home Screen"</span>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Plus className="h-3.5 w-3.5 text-italy-green flex-shrink-0" />
                    <span>
                      Use your browser menu to{" "}
                      <span className="font-medium text-foreground">"Install"</span> or{" "}
                      <span className="font-medium text-foreground">"Add to Home Screen"</span>
                    </span>
                  </div>
                )}
              </div>

              <p className="mt-2 text-[10px] text-muted-foreground/70 italic">
                Ciao bella! Never lose track of your Italian adventure
              </p>
            </div>
          </div>
        </div>

        <div className="h-1 w-full flex">
          <div className="flex-1 bg-italy-green" />
          <div className="flex-1 bg-white dark:bg-gray-200" />
          <div className="flex-1 bg-italy-red" />
        </div>
      </div>
    </div>
  );
}
