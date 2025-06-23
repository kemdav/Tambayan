import * as React from "react";

import { cn } from "@/lib/utils";

export interface ResizableInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ResizableInput = React.forwardRef<
  HTMLTextAreaElement,
  ResizableInputProps
>(({ className, onChange, ...props }, ref) => {
  const internalRef = React.useRef<HTMLTextAreaElement>(null);

  React.useImperativeHandle(ref, () => internalRef.current!, []);

  React.useLayoutEffect(() => {
    const textarea = internalRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [props.value]);

  return (
    <textarea
      className={cn(
        "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "resize-none overflow-hidden",
        className
      )}
      ref={internalRef}
      onChange={(e) => {
        const textarea = e.currentTarget;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
        if (onChange) {
          onChange(e);
        }
      }}
      {...props}
    />
  );
});
ResizableInput.displayName = "ResizableInput";

export { ResizableInput };
