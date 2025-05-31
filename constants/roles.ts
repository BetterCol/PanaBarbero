export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  BARBER: "barber",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];
