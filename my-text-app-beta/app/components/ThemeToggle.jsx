"use client"

import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const isDark = resolvedTheme == "dark";

    //Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <button
            onClick={() => setTheme(isDark? 'light' : 'dark')}
            className="nav-btn dark:text-white">
                {isDark ? (<FiSun className="text-yellow-400"/>) : (<FiMoon className="
                text-blue-600"/>)} Theme
                <span className="sr-only">Theme Toggle</span>
            </button>
        </>
    );
}