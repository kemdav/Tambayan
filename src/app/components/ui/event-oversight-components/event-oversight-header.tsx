import DropDownRole from "../general/dropdown/dropdown-role";
import { Button } from "@/app/components/ui/general/button";
import { Plus } from "lucide-react";

interface Props {
  name?: string;
}

export default function EventOversight({ name = "Event Oversight" }: Props) {
  return (
    <div className="w-full max-w-[1066px] sm:h-[56px] border border-green-900 rounded-[10px] flex items-center px-4 font-bold py-3 sm:py-0 text-sm sm:text-base mt-4">
      {name}
    </div>
  );
}
