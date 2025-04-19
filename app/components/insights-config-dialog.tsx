"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function InsightsConfigDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure Insights</DialogTitle>
          <DialogDescription>
            Customize which insights appear on your dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="invoice-reminders">Invoice reminders</Label>
            <Switch id="invoice-reminders" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="customer-followups">Customer follow-ups</Label>
            <Switch id="customer-followups" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="overdue-tasks">Overdue tasks</Label>
            <Switch id="overdue-tasks" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="team-availability">Team availability</Label>
            <Switch id="team-availability" defaultChecked />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 