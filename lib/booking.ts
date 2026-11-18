import { hours } from "./site";

/** Shared (client + server) booking rules. */

export const SLOT_MINUTES = 30;
/** Last seating is this many minutes before close. */
export const LAST_SEATING_BEFORE_CLOSE = 60;
export const MAX_GUESTS = 20;

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** Day of week for a "YYYY-MM-DD" string, independent of the viewer's timezone. */
export function dowOf(date: string) {
  const [y, mo, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, mo - 1, d)).getUTCDay();
}

export function slotsFor(date: string): string[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
  const day = hours.find((h) => h.dow === dowOf(date));
  if (!day?.open || !day.close) return [];
  const out: string[] = [];
  for (let m = toMin(day.open); m <= toMin(day.close) - LAST_SEATING_BEFORE_CLOSE; m += SLOT_MINUTES) {
    out.push(toHHMM(m));
  }
  return out;
}

export function formatSlot(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")}${suffix}` : `${h12}${suffix}`;
}

/** Today's date in Melbourne as YYYY-MM-DD. */
export function melbourneToday(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Melbourne",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Current time in Melbourne as minutes since midnight. */
export function melbourneNowMinutes(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Australia/Melbourne",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h * 60 + m;
}

export function isPastSlot(date: string, time: string, now = new Date()) {
  const today = melbourneToday(now);
  if (date < today) return true;
  if (date > today) return false;
  return toMin(time) <= melbourneNowMinutes(now);
}
