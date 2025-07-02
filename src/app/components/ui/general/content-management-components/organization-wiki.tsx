import { Book } from "lucide-react";
import { Button } from "@/app/components/ui/general/button";

interface WikiOptions {
  title: string;
  date: string;
}

interface Props {
  contents: WikiOptions[];
  onClickEdit?: () => void;
}

export default function OrgWikiComponent({
  contents = [],
  onClickEdit,
}: Props) {
  return (
    <div className="w-full max-w-[328px] h-[567px] rounded-xl border border-black overflow-hidden shadow-md bg-white flex flex-col">
      <div className="bg-action-olive-gray text-white px-4 py-2 text-lg font-semibold border-b border-black flex items-center space-x-2">
        <Book className="w-4 h-4 opacity-80" />
        <span className="text-sm">Organization Wiki</span>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-hidden">
        {contents.map((post, index) => (
          <div key={index}>
            <h1 className="font-bold text-[15px]">{post.title}</h1>
            <p className="text-sm text-[#455A64] mt-2 line-clamp-2 border-b border-gray-300 pb-2">
              Last Updated : {post.date}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-end p-4 space-x-4 border-t border-gray-300 bg-[#F9F5EE]">
        <Button
          className="bg-action-moss-green text-white px-4 py-1 text-sm rounded-md"
          onClick={onClickEdit}
        >
          Edit Wiki
        </Button>
      </div>
    </div>
  );
}
