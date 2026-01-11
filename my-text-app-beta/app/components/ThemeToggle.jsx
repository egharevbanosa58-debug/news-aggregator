"use client"

import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <>
            <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="nav-btn dark:bg-blue-950">
                {theme === 'dark' ? <FiSun /> : <FiMoon />} Theme
            </button>
        </>
    );
}