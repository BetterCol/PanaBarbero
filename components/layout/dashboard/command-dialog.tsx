import { useEffect, useState } from "react";

import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandDialog as Dialog,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";

export const CommandDialog = () => {
  const [open, setOpen] = useState(false);

  const isMacRegex = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const commandKey = isMacRegex ? "⌘K" : "Ctrl + K";

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Input
        className="hidden sm:inline-flex max-w-80 truncate md:max-w-xs lg:max-w-md"
        placeholder={`Presiona ${commandKey} para buscar`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            setOpen((open) => !open);
          }
        }}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Dialog>
    </>
  );
};
