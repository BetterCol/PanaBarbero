"use client";

import Link from "next/link";

import { User, UserPlus } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSession } from "@/lib/auth-client";
import { DesktopNavbar, MobileNavbar } from "./navbar";
import { UserDropdown } from "./user-dropdown";

export const Header = () => {
  const { data, isPending } = useSession();
  const isMobile = useIsMobile();

  return (
    <>
      <header className="flex h-15 w-full items-center justify-between border-border/50 border-b bg-card p-4">
        <div className="mx-auto flex w-full max-w-[100rem] items-center justify-between">
          <Link
            href="/"
            className="text-balance font-semibold text-2xl tracking-tighter lg:text-3xl"
          >
            PanaBarbero
          </Link>

          <DesktopNavbar />

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <MobileNavbar />

            {isPending ? (
              <Skeleton className="size-8 md:w-32" />
            ) : data?.user ? (
              <UserDropdown />
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild size={isMobile ? "icon" : "default"}>
                  <Link href="/login" prefetch>
                    <User />
                    <span className="hidden lg:inline-flex">
                      Iniciar sesión
                    </span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size={isMobile ? "icon" : "default"}
                  variant="outline"
                >
                  <Link href="/register" prefetch>
                    <UserPlus />
                    <span className="hidden lg:inline-flex">Registrarse</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
