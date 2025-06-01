import {
  Calendar,
  Home,
  Scissors,
  Search,
  Settings,
  Store,
} from "lucide-react";

export const DASHBOARD_LINKS = {
  barber: [
    { href: "/barber", label: "Inicio", icon: Home },
    { href: "/barber/appointments", label: "Reservas", icon: Calendar },
    { href: "/barber/services", label: "Servicios", icon: Scissors },
    { href: "/barber/my-barbershop", label: "Barberia", icon: Store },
    { href: "/barber/settings", label: "Ajustes", icon: Settings },
  ],
  user: [
    { href: "/dashboard", label: "Inicio", icon: Home },
    { href: "/dashboard/appointments", label: "Reservas", icon: Calendar },
    { href: "/dashboard/barbers", label: "Barberos", icon: Search },
    { href: "/dashboard/settings", label: "Ajustes", icon: Settings },
  ],
};

export const APP_LINKS = [
  { href: "/barbers", label: "Buscar barberos", icon: Search },
];

export const REDIRECT_LINKS = {
  barber: "/barber",
  user: "/dashboard",
  admin: "/admin",
} as const;

export type RedirectLink = (typeof REDIRECT_LINKS)[keyof typeof REDIRECT_LINKS];

export const PRIVATE_LINKS = {
  barber: [
    "/barber",
    "/barber/appointments",
    "/barber/services",
    "/barber/my-barbershop",
    "/barber/settings",
  ],
  user: [
    "/dashboard",
    "/dashboard/appointments",
    "/dashboard/barbers",
    "/dashboard/settings",
  ],
  admin: ["/admin", "/admin/users", "/admin/barbers", "/admin/settings"],
} as const;

export type PrivateLink =
  (typeof PRIVATE_LINKS)[keyof typeof PRIVATE_LINKS][number];

export const AUTH_LINKS = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];
