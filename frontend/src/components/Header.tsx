import SearchBar from "./SearchBar";
import SidebarTrigger from "./SidebarTrigger";

export default function Header() {
    return (
        <header>
            <nav className="flex flex-col gap-4">
                <div className="flex items-center justify-between font-bold relative h-10 min-sm:hidden">
                    <a href="/">Movies</a>
                    <SidebarTrigger />
                </div>
                <SearchBar />
            </nav>
        </header>
    );
}