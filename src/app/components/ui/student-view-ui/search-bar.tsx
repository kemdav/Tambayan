import { SearchIcon } from "lucide-react";
import { Input } from "../general/input/input";

interface Props {
    className?: string;
}

export default function SearchBar({ className }: Props) {
    return (
        <main className={className}><Input placeholder="Search" rightIcon={<SearchIcon className="h-8 w-8" />} /></main>
    );
}