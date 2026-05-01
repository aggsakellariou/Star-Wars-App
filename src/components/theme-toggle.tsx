"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { CustomButton } from "@/components/ui/custom/custom-button"
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
      <CustomButton
        variant="gray"
        size="sm"
        disabled
        className="group relative size-9"
      >
        <span className="sr-only">Toggle theme</span>
      </CustomButton>
    )
  }

  // Use resolvedTheme since theme can be "system"
  const currentTheme = resolvedTheme || theme

  return (
    <CustomButton
      variant="gray"
      size="sm"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="group relative size-9 cursor-pointer visible animate-in fade-in duration-200"
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun
        className={cn(
          "size-4 transition-all duration-300",
          currentTheme === "dark"
            ? "scale-0 -rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        )}
      />
      <Moon
        className={cn(
          "absolute size-4 transition-all duration-300",
          currentTheme === "dark"
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 rotate-90 opacity-0"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </CustomButton>
  )
}
