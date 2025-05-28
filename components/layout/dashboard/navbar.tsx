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
    <nav className="w-full h-14 border-y bg-card items-center hidden sm:flex">
      <div className="flex items-center sm:space-x-2 md:space-x-4 w-full max-w-[100rem] mx-auto justify-center sm:justify-start border-l px-4">
        {links.map((link) => (
          <Button variant={pathname === link.href ? "outline" : "ghost"} key={link.href} asChild>
            <Link href={link.href}>
              <link.icon className="hidden md:block" />
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

  // @ts-expect-error
  const links = DASHBOARD_LINKS[(data?.user?.role as keyof typeof DASHBOARD_LINKS) ?? "barber"];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="sm:hidden" size="icon">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="space-y-2 pb-4 pr-4">
        {links.map((link) => (
          <DrawerClose key={link.href} className="mr-auto w-full">
            <Button
              variant="ghost"
              className={cn("w-full justify-start", {
                "border-l ml-2 bg-accent w-full": pathname === link.href,
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
