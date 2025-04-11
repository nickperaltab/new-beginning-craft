"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { CreditCard, Check, Lock, X } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  invoiceId: string
  amount: number
  customer: string
}

export function PaymentModal({ isOpen, onClose, invoiceId, amount = 0, customer = "" }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvc, setCvc] = useState("")
  const [nameOnCard, setNameOnCard] = useState("")
  const [paymentAmount, setPaymentAmount] = useState(amount.toString())
  const [customerName, setCustomerName] = useState(customer)

  // Sample card data for auto-fill
  const sampleCardData = {
    number: "4242 4242 4242 4242",
    expiry: "12/25",
    cvc: "123",
    name: "John Smith"
  }

  // Auto-fill handlers
  const handleCardNumberFocus = () => setCardNumber(sampleCardData.number)
  const handleExpiryFocus = () => setExpiryDate(sampleCardData.expiry)
  const handleCvcFocus = () => setCvc(sampleCardData.cvc)
  const handleNameFocus = () => setNameOnCard(sampleCardData.name)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)

      // Close modal after showing success
      setTimeout(() => {
        onClose()
        setIsComplete(false)
      }, 2000)
    }, 1500)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return value
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px] p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <DialogTitle className="text-xl font-bold mb-1">
              {invoiceId === "New Payment" ? "New Payment" : `Payment for Invoice ${invoiceId}`}
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Enter payment details to complete this transaction.
            </DialogDescription>
          </div>

        </div>

        {isComplete ? (
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="bg-green-100 rounded-full p-3 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">Payment Successful!</h3>
            <p className="text-center text-gray-600">
              Your payment of ${parseFloat(paymentAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} has been processed successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-3 py-2">
              <div className="mb-4">
                {invoiceId !== "New Payment" ? (
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium mb-1">Amount</p>
                      <p className="text-2xl font-bold">${parseFloat(paymentAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium mb-1">Customer</p>
                      <p className="text-sm">{customerName}</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="payment-amount" className="text-sm font-medium block mb-1">Amount</Label>
                      <Input
                        id="payment-amount"
                        type="number"
                        placeholder="0.00"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customer-name" className="text-sm font-medium block mb-1">Customer</Label>
                      <Input
                        id="customer-name"
                        placeholder="Customer name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <Label htmlFor="payment-method" className="text-sm font-medium block mb-1">Payment Method</Label>
                <Select defaultValue="card" onValueChange={setPaymentMethod}>
                  <SelectTrigger id="payment-method" className="w-full">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit Card</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentMethod === "card" && (
                <>
                  <div className="mb-4">
                    <Label htmlFor="card-number" className="text-sm font-medium block mb-1">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        onFocus={handleCardNumberFocus}
                        maxLength={19}
                        className="pl-10 w-full"
                        required
                      />
                      <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="expiry" className="text-sm font-medium block mb-1">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                        onFocus={handleExpiryFocus}
                        maxLength={5}
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvc" className="text-sm font-medium block mb-1">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                        onFocus={handleCvcFocus}
                        maxLength={3}
                        className="w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="name" className="text-sm font-medium block mb-1">Name on Card</Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      value={nameOnCard}
                      onChange={(e) => setNameOnCard(e.target.value)}
                      onFocus={handleNameFocus}
                      className="w-full"
                      required
                    />
                  </div>
                </>
              )}

              {paymentMethod === "bank" && (
                <div className="space-y-2 py-2">
                  <p className="text-sm text-gray-600">
                    You'll be redirected to your bank's website to complete this payment.
                  </p>
                </div>
              )}

              <div className="flex items-center text-xs text-gray-500 mt-4 mb-2">
                <Lock className="h-3 w-3 mr-1" />
                <span>Payments are secure and encrypted</span>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isProcessing}
                className="px-5"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-5"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Pay Now'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
