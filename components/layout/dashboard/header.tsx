"use client";

import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { CommandDialog } from "./command-dialog";
import { DesktopNavbar, MobileNavbar } from "./navbar";
import { UserDropdown } from "./user-dropdown";

export const DashboardHeader = () => {
  return (
    <>
      <header className="flex h-15 w-full items-center justify-between bg-accent p-4">
        <div className="mx-auto flex w-full max-w-[100rem] items-center justify-between">
          <Link
            href="/"
            className="text-balance font-semibold text-xl tracking-tighter"
          >
            PanaBarbero
          </Link>
          {/* <CommandDialog /> */}

          <DesktopNavbar />

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <MobileNavbar />

            <UserDropdown />
          </div>
        </div>
      </header>
    </>
  );
};
