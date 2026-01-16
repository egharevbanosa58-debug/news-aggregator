"use client"

import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    //Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="nav-btn dark:text-white">
                {resolvedTheme === 'dark' ? (<FiSun className="text-yellow-400"/>) : (<FiMoon className="
                text-blue-600"/>)} Theme
                <span className="sr-only">Theme Toggle</span>
            </button>
        </>
    );
}