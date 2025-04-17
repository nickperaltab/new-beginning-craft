"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, CheckSquare, Phone, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: any, createAnother: boolean) => void
}

export function AddTaskModal({ open, onOpenChange, onSubmit }: AddTaskModalProps) {
  const [taskType, setTaskType] = useState("task")
  const [formData, setFormData] = useState({
    customer: "",
    date: "",
    endDate: "",
    comments: "",
  })

  const handleSubmit = (shouldClose: boolean) => {
    onSubmit(formData, !shouldClose)
    if (shouldClose) {
      onOpenChange(false)
    } else {
      setFormData({
        customer: "",
        date: "",
        endDate: "",
        comments: "",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Task/Event</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <Tabs defaultValue="task" className="w-full" onValueChange={setTaskType}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="task" className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                Task
              </TabsTrigger>
              <TabsTrigger value="meeting" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Meeting
              </TabsTrigger>
              <TabsTrigger value="call" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Call
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div>
            <Label htmlFor="customer">Customer</Label>
            <Select
              value={formData.customer}
              onValueChange={(value) => setFormData(prev => ({ ...prev, customer: value }))}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john-doe">
                  <div>
                    <div>John Doe</div>
                    <div className="text-xs text-muted-foreground">Acme Corp</div>
                  </div>
                </SelectItem>
                <SelectItem value="sarah-smith">
                  <div>
                    <div>Sarah Smith</div>
                    <div className="text-xs text-muted-foreground">Tech Solutions Inc</div>
                  </div>
                </SelectItem>
                <SelectItem value="mike-johnson">
                  <div>
                    <div>Mike Johnson</div>
                    <div className="text-xs text-muted-foreground">Global Industries</div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={cn(
            "grid gap-4",
            (taskType === "meeting" || taskType === "call") ? "grid-cols-2" : "grid-cols-1"
          )}>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="mt-2"
              />
            </div>
            {(taskType === "meeting" || taskType === "call") && (
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  className="mt-2"
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="comments">Comments</Label>
            <Textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
              className="mt-2"
              placeholder="Add any additional comments..."
              rows={4}
            />
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" type="button" className="flex items-center gap-2">
              <span>Attach File</span>
            </Button>
            <Button variant="secondary" type="button">
              Create Follow-up
            </Button>
          </div>
        </div>
        <DialogFooter className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSubmit(false)}>
              Save & Add Another
            </Button>
            <Button onClick={() => handleSubmit(true)}>
              Save & Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 