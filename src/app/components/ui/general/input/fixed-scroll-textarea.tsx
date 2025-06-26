import * as React from "react";
import { cn } from "@/lib/utils";

export interface FixedScrollTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const FixedScrollTextarea = React.forwardRef<HTMLTextAreaElement, FixedScrollTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive resize-none min-h-[100px] max-h-[200px] h-[120px] overflow-y-auto",
          className
        )}
        {...props}
      />
    );
  }
);
FixedScrollTextarea.displayName = "FixedScrollTextarea"; 