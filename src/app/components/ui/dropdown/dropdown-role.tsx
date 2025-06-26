"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/app/components/ui/dropdown/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/dropdown/popover";

type Option = {
  value: string;
  label: string;
};

interface DropDownProps {
  options: Option[];
  placeholder?: string;
  width?: string;
  height?: string;

  buttonTextColor?: string;
  buttonBorderColor?: string;
  buttonBgColor?: string;
  buttonHoverTextColor?: string;
  buttonHoverBgColor?: string;
  buttonActiveBgColor?: string;

  dropdownTextColor?: string;
  dropdownBorderColor?: string;
  dropdownBgColor?: string;
  dropdownHoverTextColor?: string;
  dropdownHoverBgColor?: string;
  dropdownActiveBgColor?: string;
}

export default function DropDownRole({
  options,
  placeholder = "Select an option...",
  width = "w-[145px]",
  height = "h-10",

  buttonTextColor = "text-action-seafoam-green",
  buttonBorderColor = "border-secondary-muted-sage",
  buttonBgColor = "bg-transparent",
  buttonHoverTextColor = "hover:text-neutral-pure-white",
  buttonHoverBgColor = "hover:bg-action-seafoam-green",
  buttonActiveBgColor = "active:bg-action-moss-green",

  dropdownTextColor = "text-action-seafoam-green",
  dropdownBorderColor = "border-secondary-muted-sage",
  dropdownBgColor = "bg-neutral-pure-white",
  dropdownHoverTextColor = "hover:text-neutral-pure-white",
  dropdownHoverBgColor = "hover:bg-action-seafoam-green",
  dropdownActiveBgColor = "active:bg-action-moss-green",
}: DropDownProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            width,
            height,
            buttonTextColor,
            buttonBorderColor,
            buttonBgColor,
            buttonHoverTextColor,
            buttonHoverBgColor,
            buttonActiveBgColor,
            "justify-between cursor-pointer transition-all duration-150 ease-in-out active:scale-95"
          )}
        >
          {selectedLabel || placeholder}
          <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          width,
          dropdownTextColor,
          dropdownBorderColor,
          dropdownBgColor,
          "p-0 rounded-md shadow-md"
        )}
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
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className={cn(
                    "cursor-pointer",
                    dropdownTextColor,
                    dropdownHoverBgColor,
                    dropdownHoverTextColor,
                    dropdownActiveBgColor
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
