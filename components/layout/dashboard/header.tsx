"use client";

import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { CommandDialog } from "./command-dialog";
import { UserDropdown } from "./user-dropdown";

export const DashboardHeader = () => {
  return (
    <>
      <header className="w-full h-16 bg-card flex items-center justify-between p-4">
        <div className="w-full max-w-[100rem] mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tighter text-balance">
            Dashboard
          </Link>
          <CommandDialog />

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <UserDropdown />
          </div>
        </div>
      </header>
      <nav className="w-full h-14 border-y bg-card flex items-center">
        <div className="flex items-center space-x-6 w-full max-w-[100rem] mx-auto">
          {Array.from({ length: 5 }, (_, i) => (
            <Button variant="ghost" key={i} asChild>
              <Link href={`/dashboard/page-${i + 1}`}>Page {i + 1}</Link>
            </Button>
          ))}
        </div>
      </nav>
    </>
  );
};
