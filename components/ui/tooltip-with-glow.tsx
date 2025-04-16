"use client"

import * as React from "react"
import { TooltipContent } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface TooltipWithGlowProps extends React.ComponentPropsWithoutRef<typeof TooltipContent> {
  children: React.ReactNode
}

export function TooltipWithGlow({ className, children, ...props }: TooltipWithGlowProps) {
  return (
    <TooltipContent
      className={cn(
        "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 rounded-lg border bg-white px-3 py-2 text-sm text-popover-foreground shadow-md outline-none",
        "relative before:absolute before:-inset-1 before:rounded-[20px] before:bg-gradient-to-r before:from-[#4F46E5] before:to-[#10B981] before:opacity-0 before:blur-md before:transition before:duration-1000 hover:before:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </TooltipContent>
  )
} 