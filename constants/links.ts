import {
  Calendar,
  DollarSign,
  Home,
  Scissors,
  Search,
  Sparkles,
  Store,
} from "lucide-react";

export const DASHBOARD_LINKS = {
  barber: [
    { href: "/barber", label: "Inicio", icon: Home },
    { href: "/barber/appointments", label: "Reservas", icon: Calendar },
    { href: "/barber/services", label: "Servicios", icon: Scissors },
    { href: "/barber/my-barbershop", label: "Barberia", icon: Store },
    { href: "/barber/plan", label: "Plan", icon: Sparkles },
  ],
  user: [
    { href: "/dashboard", label: "Inicio", icon: Home },
    { href: "/dashboard/appointments", label: "Mis reservas", icon: Calendar },
    { href: "/barbers", label: "Buscar barberos", icon: Search },
    { href: "/enroll", label: "Ser barbero", icon: Scissors },
  ],
};

export const APP_LINKS = [
  { href: "/barbers", label: "Buscar barberos", icon: Search },
  { href: "/enroll", label: "Ser barbero", icon: Scissors },
  { href: "/pricing", label: "Precios", icon: DollarSign },
];

export const USER_DROPDOWN_LINKS = [
  { href: "/profile", label: "Perfil" },
  { href: "/settings", label: "Ajustes" },
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
