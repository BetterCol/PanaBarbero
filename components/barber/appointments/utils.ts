import type { BadgeProps } from "@/components/ui/badge";
import { APPOINTMENT_STATUS } from "@/database/schemas";
import type { AppointmentStatus } from "@/database/schemas";

export const status: Record<AppointmentStatus, string> = {
  [APPOINTMENT_STATUS.CREATED]: "Creada",
  [APPOINTMENT_STATUS.CANCELLED]: "Cancelada",
  [APPOINTMENT_STATUS.COMPLETED]: "Completada",
  [APPOINTMENT_STATUS.RESCHEDULED]: "Reprogramada",
  [APPOINTMENT_STATUS.NO_SHOW]: "No asistió",
};

export function getBadgeVariant(status: AppointmentStatus): BadgeProps["variant"] {
  switch (status) {
    case APPOINTMENT_STATUS.CREATED:
      return "default";
    case APPOINTMENT_STATUS.CANCELLED:
      return "destructive";
    case APPOINTMENT_STATUS.COMPLETED:
      return "success";
    case APPOINTMENT_STATUS.RESCHEDULED:
      return "info";
    case APPOINTMENT_STATUS.NO_SHOW:
      return "warning";
    default:
      return "default";
  }
}
