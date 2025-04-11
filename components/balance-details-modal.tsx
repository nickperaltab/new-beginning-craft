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
import { Separator } from "@/components/ui/separator"

interface BalanceDetailsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BalanceDetailsModal({ isOpen, onClose }: BalanceDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">USD balance</DialogTitle>

          </div>
        </DialogHeader>

        <div className="px-6 py-4">
          <h3 className="text-lg font-medium mb-4">Summary</h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700">On the way to your bank</span>
              <span className="font-medium">$0.00</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-700">Funds on hold</span>
              <span className="font-medium">$0.00</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-700 font-medium">Total balance</span>
              <span className="font-medium">$0.00</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-3">
            <div className="flex justify-between">
              <div>
                <span className="text-gray-700 font-medium">Upcoming payouts</span>
                <p className="text-sm text-gray-500 mt-1">
                  These funds will start being paid out again once we have reviewed your account.
                </p>
              </div>
              <span className="font-medium">$0.00</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700 font-medium">On the way to your bank</span>
              <span className="font-medium">$0.00</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex justify-between items-center">
            <p className="text-gray-700">
              Your available funds are automatically paid out daily to{" "}
              <span className="font-medium">STREETER VALLEY BANK ••••2227</span>.
            </p>
            <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50">
              Update
            </Button>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t">
          <Button className="w-full bg-green-500 hover:bg-green-600" onClick={onClose}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
