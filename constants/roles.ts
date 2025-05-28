export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  BARBER: "barber",
  MEMBER: "member",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];
