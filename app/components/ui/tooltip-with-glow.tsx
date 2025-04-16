"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

interface TooltipWithGlowProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  children: React.ReactNode
  className?: string
  sideOffset?: number
}

export function TooltipWithGlow({ className, children, sideOffset = 4, ...props }: TooltipWithGlowProps) {
  return (
    <TooltipPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        "z-50 rounded-lg bg-white p-[3px]",
        "relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-blue-400/60 before:via-purple-400/60 before:to-pink-400/60 before:animate-[gradient_3s_linear_infinite] before:z-[-1] before:content-['']",
        className
      )}
      {...props}
    >
      <div className="relative z-10 bg-white rounded-[6px] p-3">
        {children}
      </div>
      <TooltipPrimitive.Arrow className="fill-white" />
    </TooltipPrimitive.Content>
  )
} 