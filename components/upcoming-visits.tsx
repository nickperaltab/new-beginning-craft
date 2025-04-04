import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function UpcomingVisits() {
  const visits = [
    {
      id: "V-2023-5678",
      customer: "Acme Corp",
      address: "123 Main St, Suite 101",
      technician: "John Smith",
      techInitials: "JS",
      time: "Today, 2:00 PM",
      duration: "2 hours",
    },
    {
      id: "V-2023-5679",
      customer: "TechSolutions Inc",
      address: "456 Tech Blvd",
      technician: "Sarah Johnson",
      techInitials: "SJ",
      time: "Today, 4:30 PM",
      duration: "1 hour",
    },
    {
      id: "V-2023-5680",
      customer: "Riverside Apartments",
      address: "789 River Rd, Building C",
      technician: "Mike Davis",
      techInitials: "MD",
      time: "Tomorrow, 9:00 AM",
      duration: "3 hours",
    },
    {
      id: "V-2023-5681",
      customer: "City Hospital",
      address: "100 Health Way",
      technician: "Lisa Wong",
      techInitials: "LW",
      time: "Tomorrow, 1:00 PM",
      duration: "2 hours",
    },
  ]

  return (
    <div className="space-y-4">
      {visits.map((visit) => (
        <div key={visit.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-blue-200">
              <AvatarFallback className="bg-blue-50 text-blue-600">{visit.techInitials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{visit.customer}</p>
              <p className="text-sm text-muted-foreground">{visit.address}</p>
              <div className="flex items-center gap-1 mt-1">
                <Badge variant="outline" className="text-xs py-0 h-5">
                  {visit.time}
                </Badge>
                <Badge variant="outline" className="text-xs py-0 h-5">
                  {visit.duration}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

