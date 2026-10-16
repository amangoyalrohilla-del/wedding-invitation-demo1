import { wedding } from "@/config/wedding";

/**
 * Google Maps URLs (https://developers.google.com/maps/documentation/urls/get-started).
 * These universal links open the Google Maps app on Android and iOS when it is
 * installed, and Google Maps on the web everywhere else. No API key needed.
 */

export function directionsUrl(): string {
  const p = new URLSearchParams({ api: "1", destination: wedding.venue.mapsQuery });
  if (wedding.venue.placeId) p.set("destination_place_id", wedding.venue.placeId);
  return `https://www.google.com/maps/dir/?${p.toString()}`;
}

export function mapsSearchUrl(): string {
  const p = new URLSearchParams({ api: "1", query: wedding.venue.mapsQuery });
  if (wedding.venue.placeId) p.set("query_place_id", wedding.venue.placeId);
  return `https://www.google.com/maps/search/?${p.toString()}`;
}

/** Key-less embeddable map view. */
export function mapsEmbedUrl(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(wedding.venue.mapsQuery)}&z=15&output=embed`;
}
