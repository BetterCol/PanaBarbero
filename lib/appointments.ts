import type { Barbershop } from "@/database/schemas";

export function getAvailableDays(availability: Barbershop["availability"]) {
  const days = Object.entries(availability);

  return days.map(([day, times]) => ({
    day,
    open: times.open,
    close: times.close,
  }));
}
