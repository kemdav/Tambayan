import DropDownRole from "../general/dropdown/dropdown-role";
import { Button } from "@/app/components/ui/general/button";
import { Plus } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  placeholder?: string;
  name?: string;
  options?: Option[];
  onClickButton?: () => void;
}

export default function EventFilter({
  name = "Filter by Organization :",
  options = [{ value: "Tambayan", label: "Tambayan" }],
  onClickButton,
  placeholder = "Select Organization",
}: Props) {
  return (
    <div className="w-full max-w-[1066px] border border-green-900 rounded-[10px] flex flex-col sm:flex-row items-start sm:items-center px-4 mt-4 justify-between gap-4 sm:gap-0 py-4 sm:h-[86px]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:space-x-4">
        <h1 className="text-sm sm:text-base">{name}</h1>
        <DropDownRole
          options={options}
          placeholder={placeholder}
          width="w-full sm:w-[173px]"
          height="h-[35px]"
        />
      </div>

      <Button
        onClick={onClickButton}
        className="animation-button w-full sm:w-auto"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Event
      </Button>
    </div>
  );
}
