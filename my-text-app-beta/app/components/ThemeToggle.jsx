"use client"

import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function ThemeToggle(
    {
        text,
        btnStyle,
    }
) {
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const isDark = resolvedTheme == "dark";

    //Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`${btnStyle} dark:text-white`}>
            {isDark ? (<FiSun className="text-white" />) : (<FiMoon className="
                text-blue-600"/>)} {text}
            <span className="sr-only">Theme Toggle</span>
        </button>
    );
}