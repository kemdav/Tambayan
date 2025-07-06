"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/general/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/app/components/ui/general/dropdown/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/general/dropdown/popover";

type Option = {
  value: string;
  label: string;
};

interface DropDownProps {
  options: Option[];
  placeholder?: string;
  width?: string;
  height?: string;
  classNameButton?: string;
  classNameDropdown?: string;
  onSelect?: (value: string) => void;
}

export default function DropDownRole({
  options = [],
  placeholder = "Select option...",
  width = "w-full sm:w-40",
  height = "h-10",
  classNameButton = "text-action-seafoam-green border-secondary-muted-sage bg-transparent hover:text-neutral-pure-white hover:bg-action-moss-green active:bg-secondary-light-moss",
  classNameDropdown = "text-action-seafoam-green border-secondary-muted-sage bg-neutral-pure-white",
  onSelect,
}: DropDownProps) {
  if (!Array.isArray(options)) {
    console.warn("DropDownRole: options prop is not an array or is undefined.");
    options = [];
  }

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [dropdownWidth, setDropdownWidth] = React.useState<number>();
  const triggerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (open && triggerRef.current) {
      setDropdownWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div ref={triggerRef} className={cn(width)}>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full",
              height,
              "rounded-[5px] justify-between items-center cursor-pointer transition-all duration-150 ease-in-out active:scale-95",
              classNameButton
            )}
          >
            <span
              className="truncate overflow-hidden whitespace-nowrap flex-1 text-left"
              title={selectedLabel ?? placeholder}
            >
              {selectedLabel || placeholder}
            </span>
            <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4 shrink-0" />
          </Button>
        </div>
      </PopoverTrigger>

      <PopoverContent
        style={{ width: dropdownWidth }}
        className={cn("p-0 rounded-md shadow-md", classNameDropdown)}
      >
        <Command>
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    setOpen(false);
                    if (onSelect) onSelect(newValue);
                  }}
                  className={cn(
                    "cursor-pointer transition-colors px-2 py-1 rounded-sm",
                    "hover:text-neutral-pure-white hover:bg-action-moss-green",
                    "active:bg-secondary-light-moss"
                  )}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
