import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Plane, MapPin, Coffee, UtensilsCrossed, Camera, Wine, Sun, Heart, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/amalfi_coast_sunset_view.png";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
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

function FloatingIcon({ icon: Icon, className, delay = "0s" }: { icon: typeof Plane; className?: string; delay?: string }) {
  return (
    <div 
      className={`absolute text-white/40 ${className}`}
      style={{ animationDelay: delay }}
    >
      <Icon className="w-8 h-8 lg:w-12 lg:h-12" />
    </div>
  );
}

function CountdownUnit({ value, label, prevValue }: { value: number; label: string; prevValue: number }) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (value !== prevValue) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <div className="flex flex-col items-center" data-testid={`countdown-${label.toLowerCase()}`}>
      <div className="glass-effect rounded-3xl p-4 sm:p-6 lg:p-8 min-w-[80px] sm:min-w-[100px] lg:min-w-[140px]">
        <span 
          className={`font-serif text-5xl sm:text-6xl lg:text-8xl font-bold text-white text-shadow-lg block text-center ${isAnimating ? 'animate-number-flip' : ''}`}
          aria-label={`${value} ${label}`}
        >
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-white/80 text-xs sm:text-sm uppercase tracking-widest mt-3 font-medium text-shadow">
        {label}
      </span>
    </div>
  );
}

function Confetti() {
  const colors = ['#009246', '#ffffff', '#CE2B37', '#FFD700', '#FF6B6B'];
  const confetti = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    size: Math.random() * 10 + 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </div>
  );
}

function HighlightCard({ icon: Icon, title, description }: { icon: typeof Coffee; title: string; description: string }) {
  return (
    <Card className="p-6 lg:p-8 hover-elevate transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-italy-green/10 text-italy-green group-hover:bg-italy-green group-hover:text-white transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
}

function DestinationBadge({ name }: { name: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
      <MapPin className="w-4 h-4 text-italy-red" />
      <span className="text-sm font-medium text-foreground">{name}</span>
    </div>
  );
}

export default function Home() {
  const targetDate = new Date('2026-05-12T00:00:00');
  
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference,
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>(timeLeft);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (timeLeft.total <= 0) {
      if (!showConfetti) {
        setShowConfetti(true);
      }
      return;
    }
    
    const timer = setInterval(() => {
      setPrevTimeLeft(timeLeft);
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft.total <= 0 && !showConfetti) {
        setShowConfetti(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, timeLeft, showConfetti]);

  const isCountdownComplete = timeLeft.total <= 0;

  const highlights = [
    {
      icon: UtensilsCrossed,
      title: "Culinary Adventures",
      description: "From authentic Neapolitan pizza to fresh pasta in Tuscany, prepare your taste buds for an unforgettable journey."
    },
    {
      icon: Camera,
      title: "Stunning Scenery",
      description: "Capture the breathtaking Amalfi Coast, rolling Tuscan hills, and the timeless beauty of ancient Rome."
    },
    {
      icon: Wine,
      title: "Wine & Culture",
      description: "Savor world-renowned wines while exploring centuries of art, history, and Italian heritage."
    },
    {
      icon: Sun,
      title: "La Dolce Vita",
      description: "Embrace the sweet life - lazy afternoons, gelato by the sea, and the warmth of Italian hospitality."
    }
  ];

  const destinations = ["Rome", "Florence", "Venice", "Amalfi Coast", "Tuscany"];

  return (
    <div className="min-h-screen bg-background">
      {showConfetti && <Confetti />}
      
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Beautiful Amalfi Coast at sunset" 
            className="w-full h-full object-cover"
            data-testid="img-hero"
          />
          {/* Dark gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        {/* Floating Icons */}
        <FloatingIcon icon={Plane} className="top-[15%] left-[10%] animate-float" delay="0s" />
        <FloatingIcon icon={Coffee} className="top-[25%] right-[12%] animate-float-delayed" delay="0.5s" />
        <FloatingIcon icon={UtensilsCrossed} className="bottom-[25%] left-[8%] animate-float" delay="1s" />
        <FloatingIcon icon={Wine} className="bottom-[30%] right-[10%] animate-float-delayed" delay="1.5s" />
        <FloatingIcon icon={Heart} className="top-[40%] left-[5%] animate-float-delayed opacity-30" delay="0.3s" />
        <FloatingIcon icon={Sparkles} className="top-[20%] right-[25%] animate-float opacity-30" delay="0.8s" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Italian Flag Stripe */}
          <div className="w-32 mx-auto mb-6">
            <ItalianFlagStripe />
          </div>

          {/* Heading */}
          <p className="text-white/80 uppercase tracking-[0.3em] text-sm mb-4 text-shadow">
            The adventure begins
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 text-shadow-lg leading-tight">
            {isCountdownComplete ? (
              <>
                <span className="block">Buon Viaggio!</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl mt-4 font-normal">
                  The wait is over!
                </span>
              </>
            ) : (
              <>
                <span className="block">Italy Awaits</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl mt-4 font-normal italic">
                  Andiamo!
                </span>
              </>
            )}
          </h1>

          {/* Countdown Timer */}
          {!isCountdownComplete && (
            <div 
              className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-8 mt-10"
              role="timer"
              aria-live="polite"
              data-testid="countdown-timer"
            >
              <CountdownUnit value={timeLeft.days} label="Days" prevValue={prevTimeLeft.days} />
              <CountdownUnit value={timeLeft.hours} label="Hours" prevValue={prevTimeLeft.hours} />
              <CountdownUnit value={timeLeft.minutes} label="Minutes" prevValue={prevTimeLeft.minutes} />
              <CountdownUnit value={timeLeft.seconds} label="Seconds" prevValue={prevTimeLeft.seconds} />
            </div>
          )}

          {/* Target Date */}
          <p className="mt-10 text-white/70 text-lg sm:text-xl font-medium text-shadow" data-testid="text-target-date">
            May 12, 2026
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Trip Details Section */}
      <section className="py-16 lg:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="w-24 mx-auto mb-6">
              <ItalianFlagStripe />
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Why Italy?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              From ancient ruins to Renaissance masterpieces, from coastal beauty to culinary excellence — 
              Italy offers an experience like no other.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Highlights */}
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <HighlightCard 
                  key={index}
                  icon={highlight.icon}
                  title={highlight.title}
                  description={highlight.description}
                />
              ))}
            </div>

            {/* Right Column - Journey Snapshot */}
            <div>
              <Card className="p-6 lg:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-italy-red/10">
                    <MapPin className="w-5 h-5 text-italy-red" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">Journey Snapshot</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Destinations */}
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide mb-3">Destinations</p>
                    <div className="flex flex-wrap gap-2">
                      {destinations.map((dest) => (
                        <DestinationBadge key={dest} name={dest} />
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border" />

                  {/* Trip Stats */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Departure</p>
                      <p className="font-serif text-2xl font-semibold text-foreground">May 12</p>
                      <p className="text-sm text-muted-foreground">2026</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Duration</p>
                      <p className="font-serif text-2xl font-semibold text-foreground">Adventure</p>
                      <p className="text-sm text-muted-foreground">of a lifetime</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border" />

                  {/* Italian Phrase */}
                  <div className="text-center py-4">
                    <p className="font-serif text-2xl italic text-foreground mb-2">"Viaggiare è vivere"</p>
                    <p className="text-sm text-muted-foreground">To travel is to live</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-12 px-4 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="w-16 mx-auto mb-6">
              <ItalianFlagStripe />
            </div>
            <p className="font-serif text-xl text-foreground mb-2">Pack your bags!</p>
            <p className="text-muted-foreground mb-6">
              {isCountdownComplete 
                ? "The adventure has begun! Buon viaggio!" 
                : `Only ${timeLeft.days} days until la dolce vita awaits.`
              }
            </p>
            <div className="flex justify-center gap-4 text-muted-foreground">
              <Plane className="w-5 h-5" />
              <Coffee className="w-5 h-5" />
              <UtensilsCrossed className="w-5 h-5" />
              <Wine className="w-5 h-5" />
              <Camera className="w-5 h-5" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
