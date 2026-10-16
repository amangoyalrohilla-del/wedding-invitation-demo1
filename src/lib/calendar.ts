import { wedding, type WeddingEvent } from "@/config/wedding";
import { mapsSearchUrl } from "./maps";

/** 2026-12-25T19:00:00+05:30 → 20261225T133000Z (UTC, understood by every calendar) */
export function toCalDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) throw new Error(`Invalid date: ${iso}`);
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/**
 * Google Calendar "add event" link with every field filled in.
 * Opens the guest's Google Calendar (app on Android, web elsewhere) with the event ready to save.
 */
export function googleCalendarUrl(ev: WeddingEvent): string {
  const details = [
    `${ev.titleHi} · ${wedding.groom.shortEn} & ${wedding.bride.shortEn}`,
    ev.description,
    `${ev.dateEn}, ${ev.timeEn} (IST)`,
    `Map: ${mapsSearchUrl()}`,
    `Invitation: ${wedding.site.url}`,
  ].join("\n");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${ev.titleEn} — ${wedding.groom.shortEn} & ${wedding.bride.shortEn}`,
    dates: `${toCalDate(ev.start)}/${toCalDate(ev.end)}`,
    details,
    location: [wedding.venue.nameEn, ...wedding.venue.addressLines].join(", "),
    ctz: wedding.site.timezone,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
