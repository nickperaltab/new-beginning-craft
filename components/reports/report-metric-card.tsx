import { cn } from "@/lib/utils"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ReportMetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: LucideIcon
  description: string
}

export function ReportMetricCard({ title, value, change, trend, icon: Icon, description }: ReportMetricCardProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 rounded-full bg-blue-50">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold">{value}</p>
        <div className="flex items-center mt-1">
          <div
            className={cn(
              "flex items-center text-xs font-medium",
              trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-500",
            )}
          >
            {trend === "up" && <ArrowUpIcon className="h-3 w-3 mr-1" />}
            {trend === "down" && <ArrowDownIcon className="h-3 w-3 mr-1" />}
            {change}
          </div>
          <span className="text-xs text-muted-foreground ml-1">{description}</span>
        </div>
      </div>
    </div>
  )
}

