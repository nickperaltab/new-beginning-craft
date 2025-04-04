import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Filter, Plus, Search, SlidersHorizontal, Clock, MapPin, User, FileText } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function WorkOrdersPage() {
  const workOrders = [
    {
      id: "WO-2023-1234",
      customer: "Acme Corp",
      address: "123 Main St, Suite 101",
      type: "HVAC Repair",
      status: "In Progress",
      date: "Mar 19, 2023",
      visits: 2,
      technician: "John Smith",
      description: "Repair commercial HVAC system, multiple units affected",
    },
    {
      id: "WO-2023-1233",
      customer: "TechSolutions Inc",
      address: "456 Tech Blvd",
      type: "Electrical",
      status: "Scheduled",
      date: "Mar 20, 2023",
      visits: 1,
      technician: "Sarah Johnson",
      description: "Install new electrical panel and update wiring",
    },
    {
      id: "WO-2023-1232",
      customer: "Riverside Apartments",
      address: "789 River Rd, Building C",
      type: "Plumbing",
      status: "Pending",
      date: "Mar 21, 2023",
      visits: 1,
      technician: "Unassigned",
      description: "Fix leaking pipes in multiple units, water damage assessment",
    },
    {
      id: "WO-2023-1231",
      customer: "City Hospital",
      address: "100 Health Way",
      type: "Maintenance",
      status: "Completed",
      date: "Mar 18, 2023",
      visits: 3,
      technician: "Mike Davis",
      description: "Quarterly maintenance of all medical equipment cooling systems",
    },
    {
      id: "WO-2023-1230",
      customer: "Downtown Office Tower",
      address: "500 Business Ave",
      type: "HVAC Installation",
      status: "Scheduled",
      date: "Mar 22, 2023",
      visits: 4,
      technician: "Lisa Wong",
      description: "New HVAC system installation for floors 10-15",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Work Orders</h1>
        <p className="text-muted-foreground">Manage and track all work orders</p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search work orders..." className="w-full pl-8 bg-background" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <Link href="/work-orders/new">
          <Button className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            New Work Order
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Work Orders</CardTitle>
              <CardDescription>Showing {workOrders.length} work orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{order.id}</h3>
                          <Badge
                            className={cn(
                              "ml-2",
                              order.status === "Completed" && "bg-green-500",
                              order.status === "In Progress" && "bg-blue-500",
                              order.status === "Scheduled" && "bg-yellow-500",
                              order.status === "Pending" && "bg-gray-500",
                            )}
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.type}</p>
                        <p className="text-sm text-muted-foreground">{order.description}</p>

                        <div className="flex flex-wrap gap-3 pt-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            {order.date}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {order.visits} {order.visits === 1 ? "visit" : "visits"}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            {order.address}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <User className="h-3.5 w-3.5" />
                            {order.technician}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 self-end md:self-center">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          Visits
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tab contents would be similar but filtered by status */}
        <TabsContent value="in-progress" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>In Progress Work Orders</CardTitle>
              <CardDescription>Showing work orders currently in progress</CardDescription>
            </CardHeader>
            <CardContent>{/* Similar content but filtered */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

