"use client";

import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { CommandDialog } from "./command-dialog";
import { DesktopNavbar, MobileNavbar } from "./navbar";
import { UserDropdown } from "./user-dropdown";

export const DashboardHeader = () => {
  return (
    <>
      <header className="w-full h-15 bg-accent flex items-center justify-between p-4">
        <div className="w-full max-w-[100rem] mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tighter text-balance">
            PanaBarbero
          </Link>
          <CommandDialog />

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <MobileNavbar />

            <UserDropdown />
          </div>
        </div>
      </header>
      <DesktopNavbar />
    </>
  );
};
