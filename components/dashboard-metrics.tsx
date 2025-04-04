import { Card, CardContent } from "@/components/ui/card"
import { Calendar, DollarSign, FileText, Layers } from "lucide-react"

export function DashboardMetrics() {
  const metrics = [
    {
      title: "Active Jobs",
      value: "24",
      change: "+2 this week",
      icon: Layers,
    },
    {
      title: "Open Work Orders",
      value: "18",
      change: "3 due today",
      icon: FileText,
    },
    {
      title: "Scheduled Visits",
      value: "12",
      change: "4 today",
      icon: Calendar,
    },
    {
      title: "Pending Invoices",
      value: "$12,450",
      change: "8 invoices",
      icon: DollarSign,
    },
  ]

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, i) => {
        const Icon = metric.icon
        return (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
                </div>
                <div className="rounded-full p-2 bg-blue-100">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

