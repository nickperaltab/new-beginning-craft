"use client"

import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar"

export function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()
  
  return (
    <main className={cn(
      "flex-1 transition-all duration-300 w-full",
      isCollapsed ? "md:ml-[60px]" : "md:ml-52"
    )}>
      {children}
    </main>
  )
} 