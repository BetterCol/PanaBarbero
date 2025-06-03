import { useRouter } from "next/navigation";

import { LogOutIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth-client";

export const UserDropdown = () => {
  const { push } = useRouter();

  const { data } = useSession();

  const initials = data?.user?.name
    ? data.user.name
        .split(" ")
        .map((name) => name.charAt(0).toUpperCase())
        .join("")
    : "N/A";

  const memoRandomImage = data?.user?.image
    ? data.user.image
    : "https://avatar.iran.liara.run/public";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex w-8 cursor-pointer items-center md:w-auto"
          variant="outline"
        >
          <Avatar className="size-6">
            <AvatarImage
              src={memoRandomImage}
              alt={data?.user?.name ?? "Foto de perfil"}
            />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline-flex md:text-xs lg:text-sm">
            {data?.user?.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="md:hidden">
          {data?.user?.name}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="hidden md:inline-flex">
          Mi cuenta
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        {data?.user && (
          <DropdownMenuItem>
            <Button
              variant="destructive"
              onClick={() =>
                signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      push("/login");
                    },
                  },
                })
              }
            >
              <LogOutIcon className="text-primary-foreground" />
              <span>Cerrar sesión</span>
            </Button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
