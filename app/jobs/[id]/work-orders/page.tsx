import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  FileText,
  Plus,
  Search,
  User,
  Package,
  Filter,
  SlidersHorizontal,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function JobWorkOrdersPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the job and work order data based on the ID
  const job = {
    id: params.id || "JOB-2023-0045",
    customer: "Acme Corp",
    type: "Commercial HVAC",
  }

  const workOrders = [
    {
      id: "WO-2023-1234",
      title: "Initial Assessment",
      type: "HVAC Inspection",
      status: "Completed",
      date: "Mar 15, 2023",
      technicians: [{ name: "John Smith", initials: "JS", role: "Lead" }],
      hours: 4,
      materials: 0,
      materialsCost: 0,
      description: "Perform initial assessment of all HVAC units and control systems.",
    },
    {
      id: "WO-2023-1235",
      title: "Replace Main Units",
      type: "HVAC Replacement",
      status: "In Progress",
      date: "Mar 19, 2023",
      technicians: [
        { name: "Mike Davis", initials: "MD", role: "Lead" },
        { name: "Sarah Johnson", initials: "SJ", role: "Assistant" },
      ],
      hours: 12,
      materials: 8,
      materialsCost: 950.75,
      description: "Remove and replace two 5-ton HVAC units on the roof. Install new ductwork as needed.",
    },
    {
      id: "WO-2023-1236",
      title: "Control System Installation",
      type: "HVAC Controls",
      status: "Scheduled",
      date: "Mar 25, 2023",
      technicians: [{ name: "Sarah Johnson", initials: "SJ", role: "Lead" }],
      hours: 8,
      materials: 4,
      materialsCost: 300.0,
      description: "Install new digital control system with zone control capabilities.",
    },
    {
      id: "WO-2023-1237",
      title: "Final Testing and Commissioning",
      type: "HVAC Testing",
      status: "Scheduled",
      date: "Mar 28, 2023",
      technicians: [
        { name: "John Smith", initials: "JS", role: "Lead" },
        { name: "Mike Davis", initials: "MD", role: "Assistant" },
      ],
      hours: 6,
      materials: 0,
      materialsCost: 0,
      description: "Test all systems, calibrate controls, and train customer staff on operation.",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/jobs/${job.id}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Work Orders for {job.id}</h1>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/jobs/${job.id}/work-orders/new`}>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Work Order
            </Button>
          </Link>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium">{job.customer}</h2>
              <p className="text-muted-foreground">{job.type}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
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
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Work Orders</CardTitle>
              <CardDescription>Showing {workOrders.length} work orders for this job</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workOrders.map((workOrder) => (
                  <div key={workOrder.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{workOrder.id}</h3>
                          <Badge
                            className={cn(
                              "ml-2",
                              workOrder.status === "Completed" && "bg-green-500",
                              workOrder.status === "In Progress" && "bg-blue-500",
                              workOrder.status === "Scheduled" && "bg-yellow-500",
                              workOrder.status === "Pending" && "bg-gray-500",
                            )}
                          >
                            {workOrder.status}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{workOrder.title}</p>
                        <p className="text-sm text-muted-foreground">{workOrder.type}</p>
                        <p className="text-sm text-muted-foreground">{workOrder.description}</p>

                        <div className="flex flex-wrap gap-3 pt-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            {workOrder.date}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {workOrder.hours} hours
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <User className="h-3.5 w-3.5" />
                            {workOrder.technicians.map((t) => t.name).join(", ")}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Package className="h-3.5 w-3.5" />
                            {workOrder.materials} items (${workOrder.materialsCost.toFixed(2)})
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 self-end md:self-center">
                        <Link href={`/work-orders/${workOrder.id}`}>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Link href={`/work-orders/${workOrder.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
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

