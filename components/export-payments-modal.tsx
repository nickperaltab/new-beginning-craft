"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, ChevronDown } from "lucide-react"

interface ExportPaymentsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ExportPaymentsModal({ isOpen, onClose }: ExportPaymentsModalProps) {
  const [dateRange, setDateRange] = useState("today")
  const [columns, setColumns] = useState("default")

  // Get current date for display
  const today = new Date()
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }).replace(",", "")
  }

  // Calculate date ranges
  const todayStr = formatDate(today)

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
  const monthStartStr = formatDate(monthStart)

  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(today.getDate() - 7)
  const sevenDaysAgoStr = formatDate(sevenDaysAgo)
  const nineDaysAgo = new Date(today)
  nineDaysAgo.setDate(today.getDate() - 9)
  const nineDaysAgoStr = formatDate(nineDaysAgo)

  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  const lastMonthStartStr = formatDate(lastMonthStart)
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)
  const lastMonthEndStr = formatDate(lastMonthEnd)

  const handleExport = () => {
    // In a real app, this would trigger the export process
    console.log(`Exporting payments with date range: ${dateRange} and columns: ${columns}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px] p-0 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">Export payments</DialogTitle>
          <DialogClose className="h-6 w-6 rounded-md hover:bg-gray-100">
            <X className="h-4 w-4" />
          </DialogClose>
        </div>

        <div className="px-6 py-3 space-y-4">
          <div className="space-y-4">
            <h3 className="text-base font-medium text-gray-700">Date range</h3>

            <RadioGroup value={dateRange} onValueChange={setDateRange} className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="today" id="today" className="text-blue-500 border-blue-500 focus:ring-blue-500" />
                <Label htmlFor="today" className="flex flex-col">
                  <span className="font-medium">Today</span>
                  <span className="text-sm text-gray-500">{todayStr}</span>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="current_month" id="current_month" className="text-blue-500 border-blue-500 focus:ring-blue-500" />
                <Label htmlFor="current_month" className="flex flex-col">
                  <span className="font-medium">Current month</span>
                  <span className="text-sm text-gray-500">{monthStartStr}–{todayStr}</span>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="last_7_days" id="last_7_days" className="text-blue-500 border-blue-500 focus:ring-blue-500" />
                <Label htmlFor="last_7_days" className="flex flex-col">
                  <span className="font-medium">Last 7 days</span>
                  <span className="text-sm text-gray-500">{sevenDaysAgoStr}–{nineDaysAgoStr}</span>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="last_month" id="last_month" className="text-blue-500 border-blue-500 focus:ring-blue-500" />
                <Label htmlFor="last_month" className="flex flex-col">
                  <span className="font-medium">Last month</span>
                  <span className="text-sm text-gray-500">{lastMonthStartStr}–{lastMonthEndStr}</span>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" className="text-blue-500 border-blue-500 focus:ring-blue-500" />
                <Label htmlFor="all" className="font-medium">All</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" className="text-blue-500 border-blue-500 focus:ring-blue-500" />
                <Label htmlFor="custom" className="font-medium">Custom</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator className="my-2" />

          <div className="space-y-3">
            <h3 className="text-base font-medium text-gray-700">Columns</h3>

            <div className="relative">
              <div className="border rounded-md border-blue-500 p-2 flex justify-between items-center cursor-pointer">
                <span>Default (23)</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="text-xs text-gray-500 mt-2">
              <p className="leading-tight">
                ID, Created date (UTC), Amount, Amount Refunded, Currency, Captured, Converted Amount,
                Converted Amount Refunded, Converted Currency, Decline Reason, Description, Fee,
                Refunded date (UTC), Statement Descriptor, Status, Seller Message, Taxes On Fee,
                Card ID, Customer ID, Customer Description, Customer Email, Invoice ID, Transfer
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t mt-1">
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleExport}
          >
            Export
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
