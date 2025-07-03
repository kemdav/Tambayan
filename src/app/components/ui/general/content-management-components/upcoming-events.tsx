import { Calendar } from "lucide-react";
import { Button } from "@/app/components/ui/general/button";

interface RecentPost {
  id: string;
  title: string;
  date: string;
  location: string;
}

interface Props {
  contents: RecentPost[];
  onClickCreateNew?: () => void;
  onClickViewAll?: () => void;
}

export default function UpcomingEventComponent({
  contents = [],
  onClickCreateNew,
  onClickViewAll,
}: Props) {
  return (
    <div className="w-full max-w-[328px] h-[567px] rounded-xl border border-black overflow-hidden shadow-md bg-white flex flex-col">
      <div className="bg-action-olive-gray text-white px-4 py-2 text-lg font-semibold border-b border-black flex items-center space-x-2">
        <Calendar className="w-4 h-4 opacity-80" />
        <span className="text-sm">Upcoming Event</span>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-hidden">
        {contents.map((post) => (
          <div key={post.id}>
            <h1 className="font-bold text-[15px]">{post.title}</h1>
            <p className="text-sm text-[#455A64] mt-2">Date : {post.date}</p>
            <p className="mt-1.5 text-sm text-[#455A64] line-clamp-2 border-b border-gray-300 pb-2">
              Location : {post.location}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-end p-4 space-x-4 border-t border-gray-300 bg-[#F9F5EE]">
        <Button
          className="bg-action-moss-green text-white px-4 py-1 text-sm rounded-md"
          onClick={onClickCreateNew}
        >
          Create New
        </Button>
        <Button
          className="bg-white border border-black text-black px-4 py-1 text-sm rounded-md shadow-sm"
          onClick={onClickViewAll}
        >
          View All
        </Button>
      </div>
    </div>
  );
}
