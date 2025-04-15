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
        "before:absolute before:inset-[-2px] before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-teal-500 before:rounded-xl before:animate-[gradient_3s_linear_infinite] before:transition-opacity before:duration-150 before:ease-in-out",
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