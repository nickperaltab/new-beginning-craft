"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface PaymentDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  payment?: {
    id: string
    date: string
    customer: string
    amount: number
    status: string
    method: string
    card?: string
    account?: string
    invoice: string
    description?: string
  }
}

export function PaymentDetailsModal({ isOpen, onClose, payment }: PaymentDetailsModalProps) {
  if (!payment) return null;
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      hour: "numeric", 
      minute: "numeric",
      hour12: true
    });
  };
  
  // Helper function to format payment status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
      case "refunded":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Refunded</Badge>
      case "incomplete":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Incomplete</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold">
              ${payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
            </DialogTitle>
            <DialogClose className="h-6 w-6 rounded-md hover:bg-gray-100">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
          <DialogDescription className="text-gray-600 mt-1">
            From {payment.customer}
          </DialogDescription>
        </DialogHeader>
        
        <Separator />
        
        <div className="px-6 py-4">
          <h3 className="text-lg font-medium mb-4">Payment details</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-600">Status</div>
              <div>{getStatusBadge(payment.status)}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-600">Date received</div>
              <div>{formatDate(payment.date)}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-600">Description</div>
              <div>{payment.description || "Full grooming package for large Labradoodle"}</div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="px-6 py-4">
          <h3 className="text-lg font-medium mb-4">Timeline</h3>
          
          <div className="relative pl-6 pb-2">
            <div className="absolute left-0 top-1.5 w-3 h-3 bg-gray-300 rounded-full"></div>
            <div>
              <div className="font-medium">Payment started</div>
              <div className="text-sm text-gray-500">{formatDate(payment.date)}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
