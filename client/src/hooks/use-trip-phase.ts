import { useMemo } from "react";

const TRIP_START_ISO = "2026-05-13";
const TRIP_END_ISO = "2026-05-27";

function getRomeIsoDate(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Rome" }).format(new Date());
}

export interface TripPhaseResult<T extends { isoDate: string }> {
  phase: "pretrip" | "active" | "posttrip";
  todayEntry: T | null;
  dayNumber: number | null;
  isoDate: string;
}

export function useTripPhase<T extends { isoDate: string }>(
  itinerary: T[]
): TripPhaseResult<T> {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const dayOverride = params.get("day");
    const dateOverride = params.get("date");

    let isoDate: string;

    if (dateOverride && /^\d{4}-\d{2}-\d{2}$/.test(dateOverride)) {
      isoDate = dateOverride;
    } else if (dayOverride) {
      const dayNum = parseInt(dayOverride, 10);
      if (!isNaN(dayNum) && dayNum >= 1 && dayNum <= itinerary.length) {
        const sorted = [...itinerary].sort((a, b) =>
          a.isoDate.localeCompare(b.isoDate)
        );
        isoDate = sorted[dayNum - 1]?.isoDate ?? getRomeIsoDate();
      } else {
        isoDate = getRomeIsoDate();
      }
    } else {
      isoDate = getRomeIsoDate();
    }

    let phase: "pretrip" | "active" | "posttrip";
    if (isoDate < TRIP_START_ISO) {
      phase = "pretrip";
    } else if (isoDate > TRIP_END_ISO) {
      phase = "posttrip";
    } else {
      phase = "active";
    }

    const todayEntry = itinerary.find((d) => d.isoDate === isoDate) ?? null;
    const dayNumber = todayEntry !== null ? itinerary.indexOf(todayEntry) + 1 : null;

    return { phase, todayEntry, dayNumber, isoDate };
  }, [itinerary]);
}
