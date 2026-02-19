"use client";

import { useState } from "react";
import { MenuIcon, X } from "lucide-react";
import NavLinks from "./NavLinks";
export default function SidebarTrigger() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="flex items-center justify-center">
                {!isOpen && (
                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        aria-label="Open menu"
                    >
                        <MenuIcon className="w-6 h-6" />
                    </button>

                )}


                {/* Backdrop + sidebar */}
                {isOpen && (
                    <>
                        <div className="flex justify-between items-center absolute top-1 right-0 z-50">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close menu"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>
                        <div
                            className="fixed inset-0 bg-black/50 z-40"
                            aria-hidden
                            onClick={() => setIsOpen(false)}
                        />
                        <aside
                            className="fixed top-0 left-0 h-full w-74 bg-background border-r border-gray-500 z-50 p-8 shadow-xl pt-15"
                            role="dialog"
                            aria-label="Sidebar menu"
                        >

                            <NavLinks onLinkClick={() => setIsOpen(false)} />
                        </aside>
                    </>
                )}
            </div>


        </>
    );
}