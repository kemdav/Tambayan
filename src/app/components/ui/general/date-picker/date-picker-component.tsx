"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/app/components/ui/general/date-picker/buttonshadcn"
import { Calendar } from "@/app/components/ui/general/date-picker/calendar"
import { Input } from "@/app/components/ui/general/date-picker/inputshadcn"
import { Label } from "@/app/components/ui/general/date-picker/labelshadcn"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/general/date-picker/popover"
import { CalendarIcon } from "lucide-react"

export function DateTimePicker({
  date,
  setDate,
}: {
  date?: Date;
  setDate?: (date: Date | undefined) => void;
}) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(date);

  // Extract time in "HH:mm" format
  const timeValue = internalDate
    ? internalDate.toTimeString().slice(0, 5)
    : "";

  // When date changes from calendar
  const handleDateChange = (selected: Date | undefined) => {
    if (!selected) {
      setInternalDate(undefined);
      setDate?.(undefined);
      return;
    }
    // Keep the time from the previous date, or default to 00:00
    const hours = internalDate?.getHours() ?? 0;
    const minutes = internalDate?.getMinutes() ?? 0;
    selected.setHours(hours, minutes, 0, 0);
    setInternalDate(new Date(selected));
    setDate?.(new Date(selected));
  };

  // When time changes
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!internalDate) return;
    const [hours, minutes] = e.target.value.split(":").map(Number);
    const newDate = new Date(internalDate);
    newDate.setHours(hours, minutes, 0, 0);
    setInternalDate(newDate);
    setDate?.(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!internalDate}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          {internalDate ? format(internalDate, "PPP p") : <span>Pick a date & time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 flex flex-col gap-2">
        <Calendar mode="single" selected={internalDate} onSelect={handleDateChange} />
        <input
          type="time"
          value={timeValue}
          onChange={handleTimeChange}
          className="border rounded px-2 py-1"
        />
      </PopoverContent>
    </Popover>
  );
}
