'use client';

import { cn } from "@/lib/utils";
import { TooltipContent } from "@/components/ui/tooltip";
import { ComponentPropsWithoutRef } from "react";

interface TooltipWithGlowProps extends ComponentPropsWithoutRef<typeof TooltipContent> {
  children: React.ReactNode;
}

export function TooltipWithGlow({ children, className, ...props }: TooltipWithGlowProps) {
  return (
    <TooltipContent 
      className={cn(
        "relative bg-white rounded-xl overflow-hidden",
        "before:absolute before:inset-[-2px] before:bg-gradient-to-r before:from-blue-300 before:via-purple-400 before:to-teal-300 before:rounded-xl before:animate-[gradient_4s_linear_infinite]",
        "after:absolute after:inset-[3px] after:bg-white after:rounded-lg after:z-[0]",
        className
      )} 
      {...props}
    >
      <div className="relative z-[1] p-4">
        {children}
      </div>
    </TooltipContent>
  );
} 