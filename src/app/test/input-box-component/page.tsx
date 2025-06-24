"use client";

import { Input } from "@/app/components/ui/input";
import { SearchIcon } from "@/app/components/icons";
import { ResizableInput } from "@/app/components/ui/resizable-input";
import { FormattableInput } from "@/app/components/ui/FormattableInput";
import { FixedScrollTextarea } from "@/app/components/ui/fixed-scroll-textarea";
import { MarkdownInputBox } from "@/app/components/ui/MarkdownInputBox";

export default function InputBoxComponentPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-8">
      <div className="flex w-full max-w-sm flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <span className="font-semibold">Normal input</span>
          <Input placeholder="Normal input" />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="font-semibold">Formattable input</span>
          <FormattableInput placeholder="Formattable input" isFormattable />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="font-semibold">Search input</span>
          <Input placeholder="Search" rightIcon={<SearchIcon className="h-4 w-4" />} />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="font-semibold">Normal resizable input</span>
          <ResizableInput placeholder="Normal resizable input" />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="font-semibold">Formattable resizable input</span>
          <FormattableInput placeholder="Formattable resizable input" isFormattable multiline />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="font-semibold">Normal fixed-scroll textarea</span>
          <FixedScrollTextarea placeholder="Normal fixed-scroll textarea" />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="font-semibold">Formattable fixed-scroll textarea</span>
          <FormattableInput placeholder="Formattable fixed-scroll textarea" isFormattable multiline fixedScroll />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="font-semibold">Very big Formattable fixed-scroll textarea</span>
          <FormattableInput
            placeholder="Very big Formattable fixed-scroll textarea"
            isFormattable
            multiline
            fixedScroll
            className="w-[800px]"
            style={{ minHeight: "600px", maxHeight: "3200px", height: "800px" }}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="font-semibold">Markdown input box (edit/preview)</span>
          <MarkdownInputBox placeholder="Type markdown here..." />
        </div>
      </div>
    </div>
  );
}