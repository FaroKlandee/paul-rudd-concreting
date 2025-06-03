"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full w-12 h-12 transition-all duration-300"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="h-6 w-6 text-yellow-400" />
            ) : (
                <Moon className="h-6 w-6 text-gray-700" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
