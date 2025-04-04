"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, User, Building, MapPin, CheckCircle, X, Download, Printer } from "lucide-react"
import { cn } from "@/lib/utils"

interface EstimateViewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  estimate: {
    id: string
    title: string
    status: string
    date: string
    amount: number
    customer?: string
    address?: string
    contact?: string
    description?: string
    lineItems?: Array<{
      id: string
      description: string
      quantity: number
      unit: string
      unitPrice: number
    }>
    notes?: string
    createdBy?: string
  }
}

export function EstimateViewDialog({ open, onOpenChange, estimate }: EstimateViewDialogProps) {
  // Calculate totals
  const subtotal = estimate.lineItems?.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) || estimate.amount
  const taxRate = 0.07 // 7% tax rate
  const tax = subtotal * taxRate
  const total = subtotal + tax

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Estimate {estimate.id}</DialogTitle>
            <Badge
              className={cn(
                estimate.status === "Approved" && "bg-green-500",
                estimate.status === "Pending Approval" && "bg-yellow-500",
                estimate.status === "Rejected" && "bg-red-500",
                estimate.status === "Draft" && "bg-gray-500",
              )}
            >
              {estimate.status}
            </Badge>
          </div>
          <DialogDescription>{estimate.title}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Estimate Header */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Date: {estimate.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span>Amount: ${estimate.amount.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Created by: {estimate.createdBy || "Lisa Wong"}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building className="h-4 w-4" />
                <span>Customer: {estimate.customer || "Acme Corp"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Address: {estimate.address || "123 Main St, Suite 101"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Contact: {estimate.contact || "John Anderson"}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Estimate Description */}
          <div>
            <h3 className="text-sm font-medium mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">
              {estimate.description ||
                "Additional ductwork required for the HVAC system overhaul. This includes replacing damaged sections, adding new zones, and improving airflow to previously underserved areas of the building."}
            </p>
          </div>

          {/* Line Items */}
          <div>
            <h3 className="text-sm font-medium mb-2">Line Items</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium">Description</th>
                    <th className="text-center p-3 text-sm font-medium">Quantity</th>
                    <th className="text-center p-3 text-sm font-medium">Unit</th>
                    <th className="text-right p-3 text-sm font-medium">Unit Price</th>
                    <th className="text-right p-3 text-sm font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    estimate.lineItems || [
                      { id: "1", description: "Ductwork - Main Trunk", quantity: 50, unit: "ft", unitPrice: 28.0 },
                      { id: "2", description: "Ductwork - Branch Lines", quantity: 120, unit: "ft", unitPrice: 15.0 },
                      { id: "3", description: "Dampers - Adjustable", quantity: 8, unit: "ea", unitPrice: 45.0 },
                      { id: "4", description: "Vents - Ceiling", quantity: 12, unit: "ea", unitPrice: 35.0 },
                      { id: "5", description: "Labor - Installation", quantity: 24, unit: "hr", unitPrice: 65.0 },
                    ]
                  ).map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-3">{item.description}</td>
                      <td className="p-3 text-center">{item.quantity}</td>
                      <td className="p-3 text-center">{item.unit}</td>
                      <td className="p-3 text-right">${item.unitPrice.toFixed(2)}</td>
                      <td className="p-3 text-right">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="border-t bg-muted/20">
                    <td colSpan={4} className="p-3 text-right font-medium">
                      Subtotal
                    </td>
                    <td className="p-3 text-right font-medium">${subtotal.toFixed(2)}</td>
                  </tr>
                  <tr className="border-t bg-muted/20">
                    <td colSpan={4} className="p-3 text-right font-medium">
                      Tax (7%)
                    </td>
                    <td className="p-3 text-right font-medium">${tax.toFixed(2)}</td>
                  </tr>
                  <tr className="border-t bg-muted/20">
                    <td colSpan={4} className="p-3 text-right font-medium">
                      Total
                    </td>
                    <td className="p-3 text-right font-medium">${total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-sm font-medium mb-2">Notes</h3>
            <p className="text-sm text-muted-foreground">
              {estimate.notes ||
                "This estimate is valid for 30 days from the date issued. Work can begin within 2 weeks of approval. Payment terms: 50% deposit required before work begins, remaining balance due upon completion."}
            </p>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-muted/20 p-3 rounded-lg text-xs text-muted-foreground">
            <h4 className="font-medium mb-1">Terms and Conditions</h4>
            <p>
              By approving this estimate, the customer agrees to the scope of work described and the associated costs.
              Any changes to the scope of work may result in additional charges. All work will be performed according to
              industry standards and local building codes. Warranty information will be provided upon completion.
            </p>
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
          </div>
          <div className="flex gap-2">
            {estimate.status === "Pending Approval" && (
              <>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

