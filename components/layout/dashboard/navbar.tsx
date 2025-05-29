import { unstable_ViewTransition as ViewTransition } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DASHBOARD_LINKS } from "@/constants/links";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export const DesktopNavbar = () => {
  const pathname = usePathname();

  const { data } = useSession();

  // @ts-expect-error
  const links = DASHBOARD_LINKS[(data?.user?.role as keyof typeof DASHBOARD_LINKS) ?? "barber"];

  return (
    <nav className="hidden h-14 w-full items-center border-y bg-card sm:flex">
      <div className="mx-auto flex w-full max-w-[100rem] items-center justify-center border-l px-4 sm:justify-start sm:space-x-2 md:space-x-4">
        {links.map((link) => (
          <ViewTransition name={link.href} key={link.href}>
            <Button variant={pathname === link.href ? "outline" : "ghost"} asChild>
              <Link href={link.href}>
                <link.icon className="hidden md:block" />
                {link.label}
              </Link>
            </Button>
          </ViewTransition>
        ))}
      </div>
    </nav>
  );
};

export const MobileNavbar = () => {
  const pathname = usePathname();

  const { data } = useSession();

  // @ts-expect-error
  const links = DASHBOARD_LINKS[(data?.user?.role as keyof typeof DASHBOARD_LINKS) ?? "barber"];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="sm:hidden" size="icon">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="space-y-2 pr-4 pb-4">
        {links.map((link) => (
          <ViewTransition key={link.href} name={link.href}>
            <DrawerClose className="mr-auto w-full">
              <Button
                variant="ghost"
                className={cn("w-full justify-start", {
                  "ml-2 w-full border-l bg-accent": pathname === link.href,
                })}
                asChild
              >
                <Link href={link.href}>
                  <link.icon />
                  {link.label}
                </Link>
              </Button>
            </DrawerClose>
          </ViewTransition>
        ))}
      </DrawerContent>
    </Drawer>
  );
};
