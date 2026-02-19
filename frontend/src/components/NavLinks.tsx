
import { HomeIcon, CompassIcon } from "lucide-react";

type NavLinksProps = {
    onLinkClick?: () => void;
};

export default function NavLinks({ onLinkClick }: NavLinksProps) {
    return (
        <nav className="flex flex-col gap-2 justify-center">
            <a
                href="/"
                onClick={onLinkClick}
                className="flex items-center gap-1"
            >
                <HomeIcon className="w-4 h-4" />
                Home
            </a>
            <a
                href="/discover"
                onClick={onLinkClick}
                className="flex items-center gap-1"
            >
                <CompassIcon className="w-4 h-4" />
                Discover
            </a>
        </nav>
    );
}