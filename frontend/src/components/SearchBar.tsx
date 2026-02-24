"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const q = query.trim();
        if (q) {
            navigate(`/discover?q=${encodeURIComponent(q)}`);
            setQuery("");  // clear the input after navigating
        }
    }

    return (
        <form
            className="flex items-center bg-gray-50 rounded-full pl-0.5 relative min-sm:max-w-[385px] w-full"
            onSubmit={handleSubmit}
        >
            <SearchIcon className="absolute left-2 pointer-events-none text-gray-600" />
            <Input
                name="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="rounded-full shadow-none border-0 bg-gray-50 pl-8 text-gray-600"
                placeholder="Search movie titles"
            />
        </form>
    );
}