"use client"

import { useState } from "react"
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
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface AddFundsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddFundsModal({ isOpen, onClose }: AddFundsModalProps) {
  const [amount, setAmount] = useState("")
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, "")
    setAmount(value)
  }
  
  const handleContinue = () => {
    // Here you would handle the submission of the form
    console.log("Adding funds:", amount)
    onClose()
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Add funds</DialogTitle>
            <DialogClose className="h-6 w-6 rounded-md hover:bg-gray-100">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="px-6 py-4 space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <h3 className="text-gray-700 font-medium">Refunds and disputes</h3>
              <span className="font-medium">$770.00</span>
            </div>
            <p className="text-gray-600 text-sm">
              Extra funds set aside for future refunds, disputes, or to cover negative balances.
            </p>
            <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto text-sm">
              Learn more
            </Button>
          </div>
          
          <div>
            <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                id="amount"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="pl-8"
                placeholder="0"
              />
            </div>
          </div>
        </div>
        
        <div className="p-4 mt-4">
          <Button 
            className="w-full bg-green-500 hover:bg-green-600" 
            onClick={handleContinue}
            disabled={!amount || parseFloat(amount) <= 0}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
