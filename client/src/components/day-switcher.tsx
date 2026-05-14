import { CalendarDays, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

interface DaySwitcherDay {
  day: number;
  date: string;
  isoDate: string;
  location: string;
  title: string;
}

interface DaySwitcherProps {
  days: DaySwitcherDay[];
  currentDay: number;
}

function hrefWithParams(update: (params: URLSearchParams) => void) {
  if (typeof window === "undefined") return "?";
  const params = new URLSearchParams(window.location.search);
  update(params);
  const query = params.toString();
  return `${window.location.pathname}${query ? `?${query}` : ""}`;
}

function dayHref(day: number) {
  return hrefWithParams((params) => {
    params.set("day", String(day));
    params.delete("date");
  });
}

function todayHref() {
  return hrefWithParams((params) => {
    params.delete("day");
    params.delete("date");
  });
}

export function DaySwitcher({ days, currentDay }: DaySwitcherProps) {
  const current = days.find((day) => day.day === currentDay) ?? days[0];
  const previous = days.find((day) => day.day === currentDay - 1);
  const next = days.find((day) => day.day === currentDay + 1);

  return (
    <div className="rounded-2xl border border-italy-green/15 bg-italy-cream/55 p-2.5 shadow-sm">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          asChild={Boolean(previous)}
          disabled={!previous}
          className="justify-start px-2 text-xs text-muted-foreground hover:text-italy-green"
          data-testid="button-previous-trip-day"
        >
          {previous ? (
            <a href={dayHref(previous.day)} aria-label={`View Day ${previous.day}: ${previous.title}`}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Day {previous.day}
            </a>
          ) : (
            <span>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Start
            </span>
          )}
        </Button>

        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-9 rounded-full border-italy-green/25 bg-white/85 px-3 text-italy-green shadow-sm"
              data-testid="button-open-day-switcher"
            >
              <CalendarDays className="mr-1.5 h-4 w-4" />
              Day {current?.day ?? currentDay}
              <ChevronDown className="ml-1 h-3.5 w-3.5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[82vh] px-4 pb-6">
            <div className="overflow-y-auto pr-1">
              <DrawerHeader className="px-0 text-left">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <DrawerTitle className="font-serif text-2xl text-foreground">Trip Days</DrawerTitle>
                    <DrawerDescription>Jump to any day without cluttering the page.</DrawerDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild className="shrink-0 rounded-full">
                    <a href={todayHref()} data-testid="link-trip-today">Today</a>
                  </Button>
                </div>
              </DrawerHeader>

              <div className="grid grid-cols-5 gap-2 py-2" aria-label="Trip day quick picker">
              {days.map((day) => {
                const isActive = day.day === currentDay;
                return (
                  <a
                    key={day.isoDate}
                    href={dayHref(day.day)}
                    className={`rounded-2xl border px-2 py-3 text-center text-sm font-semibold transition-colors ${
                      isActive
                        ? "border-italy-green bg-italy-green text-white shadow-sm"
                        : "border-border bg-white text-foreground hover:border-italy-green/40 hover:bg-italy-green/5"
                    }`}
                    data-testid={`link-trip-day-${day.day}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {day.day}
                  </a>
                );
              })}
              </div>

              <div className="mt-3 space-y-2 pb-2">
                {days.map((day) => {
                const isActive = day.day === currentDay;
                return (
                  <a
                    key={`${day.isoDate}-detail`}
                    href={dayHref(day.day)}
                    className={`block rounded-2xl border p-3 transition-colors ${
                      isActive
                        ? "border-italy-green bg-italy-green/10"
                        : "border-border bg-white/80 hover:border-italy-green/30 hover:bg-italy-green/5"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          Day {day.day} · {day.date}
                        </p>
                        <p className="font-medium text-foreground">{day.title}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-italy-cream px-2.5 py-1 text-xs text-italy-green">
                        {day.location}
                      </span>
                    </div>
                  </a>
                );
                })}
              </div>
            </div>
          </DrawerContent>
        </Drawer>

        <Button
          variant="ghost"
          size="sm"
          asChild={Boolean(next)}
          disabled={!next}
          className="justify-end px-2 text-xs text-muted-foreground hover:text-italy-green"
          data-testid="button-next-trip-day"
        >
          {next ? (
            <a href={dayHref(next.day)} aria-label={`View Day ${next.day}: ${next.title}`}>
              Day {next.day}
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          ) : (
            <span>
              Finale
              <ChevronRight className="ml-1 h-4 w-4" />
            </span>
          )}
        </Button>
      </div>
      {current && (
        <p className="mt-1.5 text-center text-xs text-muted-foreground">
          {current.location} · {current.date} · {current.title}
        </p>
      )}
    </div>
  );
}
