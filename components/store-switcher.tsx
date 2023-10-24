"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import { Button } from "./ui/button";
import { BiCheck, BiPlusCircle, BiSolidStoreAlt } from "react-icons/bi";
import { HiMiniChevronUpDown } from "react-icons/hi2";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "./ui/command";

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>;
interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Record<string, any>[];
}

export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const formItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formItems.find((item) => item.value === params.storeId);

  const [open, setOpen] = useState(false);

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn(" w-[200px] justify-between ", className)}
        >
          <div className="mr-2 h-4 w-4">
            <BiSolidStoreAlt />
          </div>
          Obecny Sklep
          <div className="ml-auto h-4 w-4 shrink-0 opacity-50">
            <HiMiniChevronUpDown />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-200px p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="znajdz sklep..." />
            <CommandEmpty> nie znaleziono sklepu</CommandEmpty>
            <CommandGroup heading="Stores">
              {formItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  {" "}
                  <div className="mr-2 h-4 w-4">
                    <BiSolidStoreAlt />
                  </div>
                  {store.label}
                  <div
                    className={cn(
                      "ml-auto h-4 w-4 ",
                      currentStore?.value === store.value
                        ? " opacity-100"
                        : "opacity-0"
                    )}
                  >
                    {" "}
                    <BiCheck></BiCheck>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <BiPlusCircle className="mr-2 h-5 w-5" />
                Dodaj sklep
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
