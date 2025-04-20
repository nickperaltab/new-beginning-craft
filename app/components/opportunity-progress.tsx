import React from "react"
import { CheckCircle, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface OpportunityProgressProps {
  currentStage: string
}

const stages = [
  { id: 1, name: "Lead" },
  { id: 2, name: "Discovery" },
  { id: 3, name: "Proposal" },
  { id: 4, name: "Negotiation" },
  { id: 5, name: "Closed Won" },
]

export function OpportunityProgress({ currentStage }: OpportunityProgressProps) {
  const currentStageIndex = stages.findIndex((stage) => stage.name === currentStage) + 1

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
                  currentStageIndex > stage.id && "bg-green-50",
                  currentStageIndex === stage.id && "bg-blue-50",
                  currentStageIndex < stage.id && "bg-gray-50",
                )}
              >
                {currentStageIndex > stage.id ? (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                ) : currentStageIndex === stage.id ? (
                  <Circle className="h-8 w-8 text-blue-500 fill-current" />
                ) : (
                  <Circle className="h-8 w-8 text-gray-300" />
                )}
              </div>
              <span className="text-xs mt-1 text-center">{stage.name}</span>
            </div>

            {/* Connector Line */}
            {index < stages.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-grow mx-2",
                  currentStageIndex > stage.id ? "bg-green-500" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
} 