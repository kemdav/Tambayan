import DropDownRole from "./dropdown/dropdown-role";
import { FixedScrollTextarea } from "./input/fixed-scroll-textarea";
import * as React from "react";

interface WikiPageComponentProps {
  title?: string;
  cancelText?: string;
  saveText?: string;
  onCancel?: () => void;
  onSave?: () => void;
  onClose?: () => void;
}

const options = [
  { value: "about", label: "About Our Organization" },
  { value: "membership", label: "Membership Requirements" },
  { value: "constitution", label: "Constitution & Bylaws" },
  { value: "create", label: "Create New Section" },
];

export default function WikiPageComponent({
  title = "Edit Wiki Page",
  cancelText = "Cancel",
  saveText = "Save",
  onCancel,
  onSave,
  onClose,
}: WikiPageComponentProps) {
  return (
    <div className="w-[514px] h-[500px] rounded-2xl bg-[#97AE97] p-6 shadow-md flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
          <h2 className="text-white text-xl font-bold">{title}</h2>
          <button
            className=" cursor-pointer w-10 h-10 flex items-center pb-2 justify-center rounded-full bg-green-300 text-white text-2xl font-bold hover:opacity-90 transition-all duration-150 ease-in-out active:scale-95"
            onClick={onClose}
          >
            x
          </button>
        </div>
        <div className="-mx-6 border-b border-white/40 mt-2" />
      </div>

      <div className="flex flex-col gap-4 mt-4 flex-grow">
        <div>
          <label className="text-white font-semibold text-sm">
            Wiki Section
          </label>
          <DropDownRole
            // Placeholder and Size
            placeholder="Select Role"
            width="w-[466px]"
            height="h-[38px]"
            //Button
            //Dropdown

            options={options}
          />
        </div>

        <div className="flex-grow">
          <label className="text-white font-semibold text-sm">Content</label>
          <FixedScrollTextarea className="h-[220px] w-full px-3 py-2" />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          className="bg-[#FFF7CC] text-black font-semibold px-4 py-2 rounded hover:opacity-90 cursor-pointer transition-all duration-150 ease-in-out active:scale-95"
          onClick={onCancel}
        >
          {cancelText}
        </button>
        <button
          className="bg-[#788B77] text-white font-semibold px-4 py-2 rounded hover:opacity-90 cursor-pointer transition-all duration-150 ease-in-out active:scale-95"
          onClick={onSave}
        >
          {saveText}
        </button>
      </div>
    </div>
  );
}
