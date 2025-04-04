import React from "react"
import { CheckCircle, Circle, FileText, ShoppingCart, FileCheck, Calendar, Receipt } from "lucide-react"
import { cn } from "@/lib/utils"

interface JobProgressTrackerProps {
  currentStage: number
  enablePurchaseOrder?: boolean
  enablePermits?: boolean
  enableQuoteVisit?: boolean
  jobData: {
    hasPurchaseOrders?: boolean
    hasPermits?: boolean
    estimateStatus?: string
    workOrderStatus?: string
  }
}

export function JobProgressTracker({
  currentStage,
  enablePurchaseOrder = false,
  enablePermits = false,
  enableQuoteVisit = false,
  jobData,
}: JobProgressTrackerProps) {
  // Define base stages
  const stages = [{ id: 1, name: "Job Request", icon: FileText, required: true }]

  // Add Quote Visit if enabled
  if (enableQuoteVisit) {
    stages.push({ id: stages.length + 1, name: "Quote Visit", icon: Calendar, required: false })
  }

  // Add Estimate
  stages.push({ id: stages.length + 1, name: "Estimate", icon: FileText, required: true })

  // Add Work Order
  stages.push({ id: stages.length + 1, name: "Work Order", icon: FileText, required: true })

  // Add Purchase Order if enabled
  if (enablePurchaseOrder) {
    stages.push({ id: stages.length + 1, name: "Purchase Order", icon: ShoppingCart, required: false })
  }

  // Add Permits if enabled
  if (enablePermits) {
    stages.push({ id: stages.length + 1, name: "Permits", icon: FileCheck, required: false })
  }

  // Add Invoices
  stages.push({ id: stages.length + 1, name: "Invoices", icon: Receipt, required: true })

  // Adjust current stage based on enabled/disabled features
  let adjustedCurrentStage = currentStage
  if (!enableQuoteVisit && currentStage > 1) {
    adjustedCurrentStage -= 1
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.id}>
            {/* Stage Icon */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center relative",
                  adjustedCurrentStage > stage.id && "bg-green-50",
                  adjustedCurrentStage === stage.id && "bg-blue-50",
                  adjustedCurrentStage < stage.id && "bg-gray-50",
                )}
              >
                {adjustedCurrentStage > stage.id ? (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                ) : adjustedCurrentStage === stage.id ? (
                  <stage.icon className="h-6 w-6 text-blue-500" />
                ) : (
                  <Circle className="h-8 w-8 text-gray-300" />
                )}

                {/* Notification Badge */}
                {stage.name === "Purchase Order" && jobData.hasPurchaseOrders && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">!</span>
                  </div>
                )}

                {stage.name === "Permits" && jobData.hasPermits && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">!</span>
                  </div>
                )}
              </div>
              <span className="text-xs mt-1 text-center">{stage.name}</span>
            </div>

            {/* Connector Line */}
            {index < stages.length - 1 && (
              <div
                className={cn("h-0.5 flex-grow mx-2", adjustedCurrentStage > stage.id ? "bg-green-500" : "bg-gray-200")}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

