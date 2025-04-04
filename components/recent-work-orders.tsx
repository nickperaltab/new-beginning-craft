import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function RecentWorkOrders() {
  const workOrders = [
    {
      id: "WO-2023-1234",
      customer: "Acme Corp",
      type: "HVAC Repair",
      status: "In Progress",
      date: "Today",
    },
    {
      id: "WO-2023-1233",
      customer: "TechSolutions Inc",
      type: "Electrical",
      status: "Scheduled",
      date: "Tomorrow",
    },
    {
      id: "WO-2023-1232",
      customer: "Riverside Apartments",
      type: "Plumbing",
      status: "Pending",
      date: "Mar 21",
    },
    {
      id: "WO-2023-1231",
      customer: "City Hospital",
      type: "Maintenance",
      status: "Completed",
      date: "Mar 18",
    },
  ]

  return (
    <div className="space-y-4">
      {workOrders.map((order) => (
        <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
          <div>
            <p className="font-medium">{order.id}</p>
            <p className="text-sm text-muted-foreground">{order.customer}</p>
            <p className="text-xs text-muted-foreground">{order.type}</p>
          </div>
          <div className="text-right">
            <Badge
              className={cn(
                order.status === "Completed" && "bg-green-500",
                order.status === "In Progress" && "bg-blue-500",
                order.status === "Scheduled" && "bg-yellow-500",
                order.status === "Pending" && "bg-gray-500",
              )}
            >
              {order.status}
            </Badge>
            <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

