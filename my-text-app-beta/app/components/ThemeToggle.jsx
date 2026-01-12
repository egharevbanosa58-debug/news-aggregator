"use client"

import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="nav-btn dark:text-white">
                {theme === 'dark' ? <FiSun /> : <FiMoon />} Theme
            </button>
        </>
    );
}