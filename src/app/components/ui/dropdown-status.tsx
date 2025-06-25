"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Option = {
  value: string;
  label: string;
};

interface DropdownStatusProps {
  label?: string;
  options: Option[];
  placeholder?: string;
  widthbutton?: string;
  heightbutton?: string;
  widthdropdown?: string;
  heightdropdown?: string;

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

export function DropdownStatus({
  label = "Status",
  options,
  placeholder = "Status",
  widthbutton = "w-[145px]",
  heightbutton = "h-10",
  widthdropdown = "w-[145px]",

  buttonTextColor = "text-[#7DBA9D]",
  buttonBorderColor = "border-[#98BAA9]",
  buttonBgColor = "bg-transparent",
  buttonHoverTextColor = "hover:text-white",
  buttonHoverBgColor = "hover:bg-[#7DBA9D]",
  buttonActiveBgColor = "active:bg-[#358163]",

  dropdownTextColor = "text-[#7DBA9D]",
  dropdownBorderColor = "border-[#98BAA9]",
  dropdownBgColor = "bg-white",
  dropdownHoverTextColor = "hover:text-white",
  dropdownHoverBgColor = "hover:bg-[#7DBA9D]",
  dropdownActiveBgColor = "active:bg-[#358163]",
}: DropdownStatusProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<Option | null>(
    null
  );

  return (
    <div className="flex items-center space-x-4">
      <p className="text-muted-foreground text-sm">{label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              widthbutton,
              heightbutton,
              buttonTextColor,
              buttonBorderColor,
              buttonBgColor,
              buttonHoverTextColor,
              buttonHoverBgColor,
              buttonActiveBgColor,
              "justify-start cursor-pointer transition-all duration-150 ease-in-out active:scale-95"
            )}
          >
            {selectedOption ? (
              <>{selectedOption.label}</>
            ) : (
              <>+ Set {placeholder.toLowerCase()}</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            widthdropdown,
            dropdownTextColor,
            dropdownBorderColor,
            dropdownBgColor,
            "p-0 rounded-md shadow-md"
          )}
          side="right"
          align="start"
        >
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(value) => {
                      setSelectedOption(
                        options.find((o) => o.value === value) || null
                      );
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
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
