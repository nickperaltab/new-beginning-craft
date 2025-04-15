"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Calendar,
  Home,
  Layers,
  User,
  Users,
  DollarSign,
  Activity,
  BarChart2,
  Package,
  Store,
  ChevronDown,
  Settings,
  PanelLeftClose,
  PanelLeft,
  List,
  ListChecks,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Contacts", href: "/contacts", icon: User },
  { name: "Activities", href: "/activities", icon: ListChecks },
  { name: "Inventory", href: "/items", icon: Package },
  { separator: true },
  { name: "Jobs", href: "/jobs", icon: Layers },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Team", href: "/team", icon: Users },
  { separator: true },
  { name: "Reports", href: "/reports", icon: BarChart2 },
  { name: "Invoices", href: "/invoices", icon: DollarSign },
  { separator: true },
  { name: "More Apps", href: "/apps", icon: Activity, hasDropdown: true },
  { separator: true },
  { name: "App Marketplace", href: "/marketplace", icon: Store },
] satisfies Array<NavItem>

type NavItem = {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  hasDropdown?: boolean
  separator?: never
} | {
  separator: true
  name?: never
  href?: never
  icon?: never
  hasDropdown?: never
}

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className={cn(
      "hidden md:flex flex-col bg-[#001a5c] text-white transition-all duration-300 pt-2 fixed h-[calc(100vh-4rem)] top-16 left-0",
      isCollapsed ? "w-[60px]" : "w-52"
    )}>
      <div className="flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full justify-start rounded-none text-white/70 hover:bg-transparent hover:text-white h-10",
            isCollapsed ? "px-[17px]" : "px-3 gap-2"
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <PanelLeft className="h-5 w-5 opacity-70 hover:opacity-100" />
          ) : (
            <>
              <PanelLeftClose className="h-5 w-5 opacity-70" />
              <span className="text-[12px] opacity-70">collapse</span>
            </>
          )}
        </Button>
      </div>
      <Separator className="my-2 bg-[#0a2a6c]" />
      <div className="flex flex-col flex-1">
        {navItems.map((item, index) => {
          if ('separator' in item) {
            return <Separator key={`sep-${index}`} className="my-2 bg-[#0a2a6c]" />
          }

          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href} className="block">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start rounded-none text-white hover:bg-transparent hover:text-[#8ab4f8]",
                  isCollapsed ? "px-[17px]" : "px-3 gap-2",
                  isActive && "bg-[#0066ff] hover:bg-[#0066ff] hover:text-white",
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="ml-auto h-4 w-4" />}
                  </>
                )}
              </Button>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

