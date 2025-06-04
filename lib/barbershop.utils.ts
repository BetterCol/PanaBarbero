import type { Barbershop } from "@/database/schemas";

export function getAvailableDays(availability: Barbershop["availability"]) {
  const days = Object.entries(availability);

  return days.map(([day, times]) => ({
    day,
    open: times.open,
    close: times.close,
  }));
}

export function getSocialMedia(socialMedia: Barbershop["socialMedia"]) {
  const entries = Object.entries(socialMedia!);

  return entries.map(([media, link]) => ({
    media,
    link,
  }));
}
