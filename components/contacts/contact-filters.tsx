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

export function ContactFilters({ selectedType, setSelectedType, selectedStatus, setSelectedStatus }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem className="font-medium">Filter by Type</DropdownMenuItem>
        <DropdownMenuItem className={selectedType === "all" ? "bg-muted" : ""} onClick={() => setSelectedType("all")}>
          All Types
        </DropdownMenuItem>
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
        <DropdownMenuItem
          className={selectedType === "subcontractor" ? "bg-muted" : ""}
          onClick={() => setSelectedType("subcontractor")}
        >
          Subcontractors
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-medium">Filter by Status</DropdownMenuItem>
        <DropdownMenuItem
          className={selectedStatus === "all" ? "bg-muted" : ""}
          onClick={() => setSelectedStatus("all")}
        >
          All Statuses
        </DropdownMenuItem>
        <DropdownMenuItem
          className={selectedStatus === "active" ? "bg-muted" : ""}
          onClick={() => setSelectedStatus("active")}
        >
          Active
        </DropdownMenuItem>
        <DropdownMenuItem
          className={selectedStatus === "inactive" ? "bg-muted" : ""}
          onClick={() => setSelectedStatus("inactive")}
        >
          Inactive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

