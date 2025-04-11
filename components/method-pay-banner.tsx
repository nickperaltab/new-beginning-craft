"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function MethodPayBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative w-full bg-blue-50 rounded-lg p-6 mb-6 flex flex-col sm:flex-row items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-yellow-400 text-xl">✨</span>
        <span className="font-semibold text-xl text-gray-800">Try Method Pay</span>
      </div>

      <p className="text-gray-700 my-3 sm:my-0 text-base">
        Experience faster payments and seamless integration
      </p>

      <div className="flex items-center gap-3">
        <Button className="bg-white text-blue-600 hover:bg-blue-100 border border-blue-200 font-medium px-6 rounded-full">
          Get Started
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
