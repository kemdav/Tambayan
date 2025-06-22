import * as React from "react";
import { Input, InputProps } from "./input";
import { ResizableInput, ResizableInputProps } from "./resizable-input";
import { Toggle } from "./toggle";
import { cn } from "@/lib/utils";

interface FormattableInputBaseProps {
  isFormattable?: boolean;
  multiline?: boolean;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

type FormattableInputProps =
  | (FormattableInputBaseProps & InputProps & { multiline?: false })
  | (FormattableInputBaseProps & ResizableInputProps & { multiline: true });

const formatting = [
  { label: "B", title: "Bold", command: "bold", style: "font-bold" },
  { label: "I", title: "Italic", command: "italic", style: "italic" },
  { label: "U", title: "Underline", command: "underline", style: "underline" },
  { label: "S", title: "Strikethrough", command: "strikeThrough", style: "line-through" },
];

function isCommandActive(command: string): boolean {
  if (typeof window === "undefined" || !window.getSelection) return false;
  switch (command) {
    case "bold":
      return document.queryCommandState("bold");
    case "italic":
      return document.queryCommandState("italic");
    case "underline":
      return document.queryCommandState("underline");
    case "strikeThrough":
      return document.queryCommandState("strikeThrough");
    default:
      return false;
  }
}

const FormattingToolbar: React.FC<{
  onFormat: (command: string) => void;
  getActive: (command: string) => boolean;
}> = ({ onFormat, getActive }) => (
  <div
    className={cn(
      "flex gap-1 z-10 absolute left-2 -bottom-7",
      "bg-transparent"
    )}
    style={{ pointerEvents: "auto" }}
  >
    {formatting.map((fmt) => (
      <Toggle
        key={fmt.label}
        pressed={getActive(fmt.command)}
        onPressedChange={() => onFormat(fmt.command)}
        size="sm"
        variant="outline"
        aria-label={fmt.title}
        title={fmt.title}
        className={cn(
          fmt.style,
          "h-6 w-6 px-0.5 py-0 text-xs border border-input",
          getActive(fmt.command)
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-white text-black border-input"
        )}
        type="button"
        tabIndex={-1}
      >
        {fmt.label}
      </Toggle>
    ))}
  </div>
);

export const FormattableInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLDivElement,
  FormattableInputProps
>(function FormattableInput(
  { isFormattable, multiline, className, value, onChange, ...props },
  ref
) {
  const editableRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  React.useImperativeHandle(ref, () => {
    if (isFormattable) return editableRef.current!;
    return inputRef.current!;
  });

  // For controlled value
  React.useEffect(() => {
    if (isFormattable && value !== undefined && editableRef.current) {
      if (editableRef.current.innerText !== value) {
        editableRef.current.innerText = value;
      }
    }
  }, [value, isFormattable]);

  const [selectionState, setSelectionState] = React.useState(0);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (onChange) {
      onChange(e.currentTarget.innerText);
    }
    // Auto-grow for multiline
    if (multiline && editableRef.current) {
      editableRef.current.style.height = "auto";
      editableRef.current.style.height = `${editableRef.current.scrollHeight}px`;
    }
  };

  // Initial auto-grow for multiline
  React.useEffect(() => {
    if (multiline && editableRef.current) {
      editableRef.current.style.height = "auto";
      editableRef.current.style.height = `${editableRef.current.scrollHeight}px`;
    }
  }, [multiline, value]);

  const handleFormat = (command: string) => {
    document.execCommand(command, false);
    editableRef.current?.focus();
    setSelectionState((s) => s + 1); // force re-render to update toggle state
  };

  const getActive = (command: string) => isCommandActive(command);

  if (isFormattable) {
    return (
      <div className={cn("relative w-full", className)}>
        <div className="w-full">
          <div
            ref={editableRef}
            contentEditable
            suppressContentEditableWarning
            className={cn(
              "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              multiline ? `min-h-[60px] resize-none overflow-hidden` : `h-9` // removed pb-8
            )}
            style={multiline ? { whiteSpace: "pre-wrap", wordBreak: "break-word", overflow: "hidden", resize: "none" } : { whiteSpace: "nowrap" }}
            onInput={handleInput}
            onKeyUp={() => setSelectionState((s) => s + 1)}
            onMouseUp={() => setSelectionState((s) => s + 1)}
            data-placeholder={props.placeholder}
            aria-label={props.placeholder}
          />
          <FormattingToolbar onFormat={handleFormat} getActive={getActive} />
        </div>
      </div>
    );
  }

  // Fallback to normal input/textarea
  if (multiline) {
    const { onChange: _onChange, ...rest } = props as ResizableInputProps;
    return (
      <ResizableInput ref={inputRef as React.Ref<HTMLTextAreaElement>} onChange={_onChange} {...rest} />
    );
  } else {
    const { onChange: _onChange, ...rest } = props as InputProps;
    return (
      <Input ref={inputRef as React.Ref<HTMLInputElement>} onChange={_onChange} {...rest} />
    );
  }
}); 