import type { Role } from "@/lib/user-store";

/** Dashboard nav hrefs each role is allowed to see. */
export const ROLE_ALLOWED_HREFS: Record<Role, Set<string>> = {
  player: new Set([
    "/dashboard",
    "/dashboard/discover",
    "/dashboard/jobs",
    "/dashboard/messages",
    "/dashboard/favorites",
    "/dashboard/profile",
  ]),
  coach: new Set([
    "/dashboard",
    "/dashboard/discover",
    "/dashboard/jobs",
    "/dashboard/messages",
    "/dashboard/favorites",
    "/dashboard/profile",
  ]),
  club: new Set([
    "/dashboard",
    "/dashboard/discover",
    "/dashboard/jobs",
    "/dashboard/messages",
    "/dashboard/favorites",
    "/dashboard/profile",
  ]),
  scout: new Set([
    "/dashboard",
    "/dashboard/discover",
    "/dashboard/messages",
    "/dashboard/favorites",
    "/dashboard/profile",
  ]),
  sponsor: new Set([
    "/dashboard",
    "/dashboard/discover",
    "/dashboard/messages",
    "/dashboard/favorites",
    "/dashboard/profile",
  ]),
};

/** Roles that cannot access /dashboard/jobs. */
export const ROLES_WITHOUT_JOBS: Set<Role> = new Set(["scout", "sponsor"]);
