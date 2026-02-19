"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

export default function SearchBar() {

    return (
        <form className="flex items-center bg-gray-50 rounded-full pl-0.5 relative min-sm:max-w-[385px]">
            <SearchIcon className="absolute left-2 pointer-events-none text-gray-600" />
            <Input

                name="q"

                className="rounded-full shadow-none border-0 bg-gray-50 pl-8 text-gray-600" placeholder="Search movie titles" />
        </form>
    );
}