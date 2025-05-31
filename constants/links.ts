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
};

export const APP_LINKS = [
  { href: "/barbers", label: "Buscar barberos", icon: Search },
];
