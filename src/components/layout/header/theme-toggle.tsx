"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    const handle =
      typeof window !== "undefined" && typeof window.requestAnimationFrame === "function"
        ? window.requestAnimationFrame(() => setIsMounted(true))
        : window.setTimeout(() => setIsMounted(true), 0)

    return () => {
      if (typeof window !== "undefined" && typeof window.cancelAnimationFrame === "function") {
        window.cancelAnimationFrame(handle as number)
      } else {
        clearTimeout(handle as number)
      }
    }
  }, [])

  // To prevent hydration warnings
  if (!isMounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="group relative size-9 hover:bg-black/5 dark:hover:bg-white/10"
      >
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  // Use resolvedTheme since theme can be "system"
  const currentTheme = resolvedTheme || theme

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="group relative size-10 cursor-pointer flex items-center justify-center transition-colors border-[3px] border-transparent hover:border-[hsl(var(--sw-bg))] hover:bg-[hsl(var(--sw-bg))] hover:text-[hsl(var(--sw-yellow))]"
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
    >
      <div className="relative size-5 flex items-center justify-center">
        <Sun
          className={cn(
            "size-full transition-all duration-300 absolute",
            currentTheme === "dark"
              ? "scale-0 -rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100"
          )}
        />
        <Moon
          className={cn(
            "size-full transition-all duration-300 absolute",
            currentTheme === "dark"
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 rotate-90 opacity-0"
          )}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
