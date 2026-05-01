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
        "flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-3xl bg-muted/30 space-y-4 animate-in fade-in zoom-in-95 duration-500",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="p-4 rounded-full bg-muted text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="text-center space-y-1">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        {description && (
          <p className="text-muted-foreground max-w-xs mx-auto text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="pt-2">
          {action}
        </div>
      )}
    </div>
  )
}
