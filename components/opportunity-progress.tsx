'use client';

import React from "react"
import { CheckCircle, Circle, FileText, Target, FileCheck, HandshakeIcon, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils";

const stages = [
  { id: 'lead', label: 'Lead', icon: Target },
  { id: 'discovery', label: 'Discovery', icon: FileText },
  { id: 'proposal', label: 'Proposal', icon: FileCheck },
  { id: 'negotiation', label: 'Negotiation', icon: HandshakeIcon },
  { id: 'closed_won', label: 'Closed Won', icon: TrendingUp }
] as const;

type Stage = typeof stages[number]['id'];

interface OpportunityProgressProps {
  currentStage: Stage;
}

export function OpportunityProgress({ currentStage }: OpportunityProgressProps) {
  const currentIndex = stages.findIndex(stage => stage.id === currentStage);

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
                  index < currentIndex && "bg-green-50",
                  index === currentIndex && "bg-blue-50",
                  index > currentIndex && "bg-gray-50"
                )}
              >
                {index < currentIndex ? (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                ) : index === currentIndex ? (
                  <stage.icon className="h-6 w-6 text-blue-500" />
                ) : (
                  <Circle className="h-8 w-8 text-gray-300" />
                )}
              </div>
              <span className="text-xs mt-1 text-center">{stage.label}</span>
            </div>

            {/* Connector Line */}
            {index < stages.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-grow mx-2",
                  index < currentIndex ? "bg-green-500" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
} 