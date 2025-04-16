"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"

interface ContactFiltersProps {
  selectedType: string
  setSelectedType: (type: string) => void
  selectedPriority: string
  setSelectedPriority: (priority: string) => void
}

export function ContactFilters({ selectedType, setSelectedType, selectedPriority, setSelectedPriority }: ContactFiltersProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem className="font-medium">Filter by Type</DropdownMenuItem>
        <DropdownMenuItem
          className={selectedType === "customer" ? "bg-muted" : ""}
          onClick={() => setSelectedType("customer")}
        >
          Customers
        </DropdownMenuItem>
        <DropdownMenuItem
          className={selectedType === "vendor" ? "bg-muted" : ""}
          onClick={() => setSelectedType("vendor")}
        >
          Vendors
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-medium">Filter by Priority</DropdownMenuItem>
        <DropdownMenuItem
          className={selectedPriority === "all" ? "bg-muted" : ""}
          onClick={() => setSelectedPriority("all")}
        >
          All Priorities
        </DropdownMenuItem>
        <DropdownMenuItem
          className={selectedPriority === "high" ? "bg-muted" : ""}
          onClick={() => setSelectedPriority("high")}
        >
          High
        </DropdownMenuItem>
        <DropdownMenuItem
          className={selectedPriority === "medium" ? "bg-muted" : ""}
          onClick={() => setSelectedPriority("medium")}
        >
          Medium
        </DropdownMenuItem>
        <DropdownMenuItem
          className={selectedPriority === "low" ? "bg-muted" : ""}
          onClick={() => setSelectedPriority("low")}
        >
          Low
        </DropdownMenuItem>
        <DropdownMenuItem
          className={selectedPriority === "inactive" ? "bg-muted" : ""}
          onClick={() => setSelectedPriority("inactive")}
        >
          Inactive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

