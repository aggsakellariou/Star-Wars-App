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
        "flex flex-col items-center justify-center py-20 bg-primary text-secondary border-[5px] border-secondary space-y-6",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="p-6 bg-secondary text-primary border-[3px] border-secondary">
          {icon}
        </div>
      )}
      <div className="text-center space-y-3">
        <h3 className="text-3xl font-display uppercase tracking-tight">{title}</h3>
        {description && (
          <p className="text-secondary/80 max-w-sm mx-auto text-sm font-mono-sw uppercase leading-relaxed">
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
