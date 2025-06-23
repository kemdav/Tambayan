import * as React from "react";
import { cn } from "@/lib/utils";
import { marked } from "marked";

interface MarkdownInputBoxProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  minRows?: number;
  maxRows?: number;
}

export const MarkdownInputBox: React.FC<MarkdownInputBoxProps> = ({
  value: propValue = "",
  onChange,
  placeholder,
  className,
  style,
  minRows = 6,
  maxRows = 20,
}) => {
  const [value, setValue] = React.useState(propValue);
  const [focused, setFocused] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  // Calculate rows for textarea
  const rows = Math.min(
    maxRows,
    Math.max(minRows, value.split("\n").length)
  );

  return (
    <div className={cn("relative w-full", className)} style={style}>
      {focused ? (
        <textarea
          ref={textareaRef}
          className={cn(
            "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive resize-none min-h-[120px] max-h-[400px] h-[180px] overflow-y-auto"
          )}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <div
          className={cn(
            "prose-xl border-input w-full rounded-md border bg-white px-3 py-2 min-h-[120px] max-h-[400px] h-[180px] overflow-y-auto focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            !value && "text-muted-foreground"
          )}
          style={{ cursor: "text", ...style }}
          tabIndex={0}
          onClick={handleFocus}
          dangerouslySetInnerHTML={{
            __html: value ? marked.parse(value) : `<span>${placeholder ?? ""}</span>`,
          }}
        />
      )}
    </div>
  );
}; 