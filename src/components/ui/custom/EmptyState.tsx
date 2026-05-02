import * as React from "react"
import { cn } from "@/lib/utils"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 bg-[hsl(var(--sw-yellow))] text-[hsl(var(--sw-bg))] border-[5px] border-[hsl(var(--sw-bg))] space-y-6 animate-in fade-in zoom-in-95 duration-500",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="p-6 bg-[hsl(var(--sw-bg))] text-[hsl(var(--sw-yellow))] border-[3px] border-[hsl(var(--sw-bg))]">
          {icon}
        </div>
      )}
      <div className="text-center space-y-3">
        <h3 className="text-3xl font-display uppercase tracking-tight">{title}</h3>
        {description && (
          <p className="text-[hsl(var(--sw-bg))/80] max-w-sm mx-auto text-sm font-mono-sw uppercase leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="pt-4">
          {action}
        </div>
      )}
    </div>
  )
}
