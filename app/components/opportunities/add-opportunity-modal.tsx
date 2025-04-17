"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star } from "lucide-react"

interface AddOpportunityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: any, createAnother: boolean) => void
}

export function AddOpportunityModal({ open, onOpenChange, onSubmit }: AddOpportunityModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    customer: "",
    pipeline: "Pipeline 1",
    stage: "lead",
    amount: "",
    probability: 0,
    assignedTo: "",
    date: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Opportunity name is required"
    }
    if (!formData.customer) {
      newErrors.customer = "Customer is required"
    }
    if (!formData.pipeline) {
      newErrors.pipeline = "Sales pipeline is required"
    }
    if (!formData.stage) {
      newErrors.stage = "Stage is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (shouldClose: boolean) => {
    if (validateForm()) {
      onSubmit(formData, !shouldClose)
      if (shouldClose) {
        onOpenChange(false)
      } else {
        setFormData({
          name: "",
          customer: "",
          pipeline: "Pipeline 1",
          stage: "lead",
          amount: "",
          probability: 0,
          assignedTo: "",
          date: "",
        })
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Opportunity</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div>
            <Label htmlFor="name">
              Opportunity Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-2"
              placeholder="Enter opportunity name"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="customer">
              Customer <span className="text-red-500">*</span>
            </Label>
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
            {errors.customer && (
              <p className="text-sm text-red-500 mt-1">{errors.customer}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pipeline">
                Sales Pipeline <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.pipeline}
                onValueChange={(value) => setFormData(prev => ({ ...prev, pipeline: value }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select pipeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pipeline 1">Pipeline 1</SelectItem>
                </SelectContent>
              </Select>
              {errors.pipeline && (
                <p className="text-sm text-red-500 mt-1">{errors.pipeline}</p>
              )}
            </div>
            <div>
              <Label htmlFor="stage">
                Stage <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.stage}
                onValueChange={(value) => setFormData(prev => ({ ...prev, stage: value }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="discovery">Discovery</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="closed-won">Closed Won</SelectItem>
                </SelectContent>
              </Select>
              {errors.stage && (
                <p className="text-sm text-red-500 mt-1">{errors.stage}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Select
                value={formData.assignedTo}
                onValueChange={(value) => setFormData(prev => ({ ...prev, assignedTo: value }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john.smith">John Smith</SelectItem>
                  <SelectItem value="sarah.wilson">Sarah Wilson</SelectItem>
                  <SelectItem value="michael.brown">Michael Brown</SelectItem>
                  <SelectItem value="emily.davis">Emily Davis</SelectItem>
                  <SelectItem value="david.miller">David Miller</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="mt-2"
                placeholder="$0.00"
              />
            </div>
            <div>
              <Label>Probability</Label>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 cursor-pointer ${
                      star <= formData.probability ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, probability: star }))}
                  />
                ))}
              </div>
            </div>
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