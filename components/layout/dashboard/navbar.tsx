import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DASHBOARD_LINKS } from "@/constants/links";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export const DesktopNavbar = () => {
  const pathname = usePathname();

  const { data } = useSession();

  console.log(data);

  const links =
    DASHBOARD_LINKS[
      // @ts-expect-error
      (data?.user?.role as keyof typeof DASHBOARD_LINKS) ?? "barber"
    ];

  return (
    <nav className="mx-auto hidden h-14 w-max items-center sm:flex">
      <div className="mx-auto flex w-full max-w-[100rem] items-center justify-center px-4 sm:justify-start sm:space-x-2 md:space-x-4">
        {links.map((link) => (
          <Button
            key={link.href}
            variant={pathname === link.href ? "outline" : "ghost"}
            asChild
          >
            <Link href={link.href}>
              <link.icon className="hidden lg:block" />
              {link.label}
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export const MobileNavbar = () => {
  const pathname = usePathname();

  const { data } = useSession();

  const links =
    DASHBOARD_LINKS[
      // @ts-expect-error
      (data?.user?.role as keyof typeof DASHBOARD_LINKS) ?? "barber"
    ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="sm:hidden" size="icon">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="space-y-2 pr-4 pb-4">
        {links.map((link) => (
          <DrawerClose className="mr-auto w-full" key={link.href}>
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
        ))}
      </DrawerContent>
    </Drawer>
  );
};
