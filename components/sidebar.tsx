"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  Home,
  Layers,
  Users,
  DollarSign,
  Activity,
  BarChart2,
  Package,
  Store,
  ChevronDown,
  UserPlus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Contacts", href: "/contacts", icon: UserPlus },
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
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 flex-col bg-[#001a5c] text-white">
      <div className="p-4 flex items-center">
        <h1 className="text-2xl font-bold text-white"></h1>
      </div>
      <div className="flex flex-col flex-1">
        {navItems.map((item, index) => {
          if (item.separator) {
            return <Separator key={`sep-${index}`} className="my-2 bg-[#0a2a6c]" />
          }

          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 rounded-none px-4 py-2 text-white hover:bg-[#0a2a6c]",
                  isActive && "bg-[#0066ff] hover:bg-[#0066ff]",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
                {item.hasDropdown && <ChevronDown className="ml-auto h-4 w-4" />}
              </Button>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

