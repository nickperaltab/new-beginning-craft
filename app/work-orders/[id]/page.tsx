import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  FileText,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Plus,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ClipboardList,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function WorkOrderViewPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the work order data based on the ID
  const workOrder = {
    id: params.id || "WO-2023-1234",
    customer: "Acme Corp",
    address: "123 Main St, Suite 101",
    type: "HVAC Repair",
    status: "In Progress",
    jobId: "JOB-2023-0045",
    jobName: "Commercial HVAC Overhaul",
    createdDate: "Mar 15, 2023",
    scheduledDate: "Mar 19, 2023",
    estimatedCompletion: "Mar 25, 2023",
    priority: "High",
    assignedTechnicians: [
      { name: "John Smith", role: "Lead Technician" },
      { name: "Mike Davis", role: "Assistant" },
    ],
    description:
      "Repair commercial HVAC system in the main office area. Multiple units affected with inconsistent cooling. Customer reports temperature fluctuations throughout the day.",
    notes: [
      {
        id: "note1",
        author: "Sarah Johnson",
        authorInitials: "SJ",
        date: "Mar 16, 2023",
        time: "10:30 AM",
        content:
          "Called customer to confirm appointment details. They mentioned the issue has worsened since the initial report.",
        attachments: [],
      },
      {
        id: "note2",
        author: "John Smith",
        authorInitials: "JS",
        date: "Mar 17, 2023",
        time: "2:15 PM",
        content: "Reviewed the building schematics. Will need to bring additional tools for the rooftop units.",
        attachments: [{ name: "building_schematics.pdf", size: "2.4 MB" }],
      },
      {
        id: "note3",
        author: "Mike Davis",
        authorInitials: "MD",
        date: "Mar 18, 2023",
        time: "9:00 AM",
        content: "Ordered replacement parts that might be needed based on the symptoms described.",
        attachments: [{ name: "parts_list.xlsx", size: "1.1 MB" }],
      },
    ],
    visits: [
      {
        id: "V-2023-5678",
        date: "Mar 19, 2023",
        startTime: "2:00 PM",
        endTime: "4:00 PM",
        status: "Scheduled",
        technicians: [
          { name: "John Smith", initials: "JS", role: "Lead" },
          { name: "Mike Davis", initials: "MD", role: "Assistant" },
        ],
        description: "Initial diagnostic visit to identify the root cause of the cooling issues.",
        tasks: [
          { id: "task1", description: "Inspect all HVAC units", status: "Pending" },
          { id: "task2", description: "Check refrigerant levels", status: "Pending" },
          { id: "task3", description: "Test thermostat functionality", status: "Pending" },
        ],
      },
      {
        id: "V-2023-5679",
        date: "Mar 22, 2023",
        startTime: "9:00 AM",
        endTime: "1:00 PM",
        status: "Scheduled",
        technicians: [
          { name: "John Smith", initials: "JS", role: "Lead" },
          { name: "Lisa Wong", initials: "LW", role: "Apprentice" },
        ],
        description: "Repair visit to fix identified issues from initial diagnostic.",
        tasks: [
          { id: "task4", description: "Replace faulty components", status: "Pending" },
          { id: "task5", description: "Recharge refrigerant if needed", status: "Pending" },
          { id: "task6", description: "Calibrate thermostats", status: "Pending" },
        ],
      },
      {
        id: "V-2023-5680",
        date: "Mar 25, 2023",
        startTime: "3:00 PM",
        endTime: "4:00 PM",
        status: "Scheduled",
        technicians: [
          { name: "Sarah Johnson", initials: "SJ", role: "Lead" },
          { name: "Mike Davis", initials: "MD", role: "Assistant" },
        ],
        description: "Final inspection and customer sign-off.",
        tasks: [
          { id: "task7", description: "Verify all systems functioning properly", status: "Pending" },
          { id: "task8", description: "Demonstrate proper operation to customer", status: "Pending" },
          { id: "task9", description: "Collect customer signature", status: "Pending" },
        ],
      },
    ],
    materials: [
      { id: "mat1", name: "Refrigerant R-410A", quantity: 2, unit: "lbs", cost: 45.0 },
      { id: "mat2", name: "Condenser Fan Motor", quantity: 1, unit: "ea", cost: 125.0 },
      { id: "mat3", name: "Capacitor", quantity: 2, unit: "ea", cost: 18.5 },
      { id: "mat4", name: "Air Filter", quantity: 4, unit: "ea", cost: 12.75 },
    ],
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/work-orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Work Order {workOrder.id}</h1>
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

        <div className="flex items-center gap-2">
          <Link href={`/work-orders/${workOrder.id}/edit`}>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Work Order
            </Button>
          </Link>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Work Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Customer</h3>
                    <p className="text-base">{workOrder.customer}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Job</h3>
                    <p className="text-base">
                      {workOrder.jobId} - {workOrder.jobName}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
                    <p className="text-base">{workOrder.type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Priority</h3>
                    <p className="text-base">{workOrder.priority}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                    <p className="text-base">{workOrder.address}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Assigned Technicians</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {workOrder.assignedTechnicians.map((tech, i) => (
                        <Badge key={i} variant="outline" className="bg-blue-50">
                          {tech.name} {tech.role && <span className="text-muted-foreground">({tech.role})</span>}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Created Date</h3>
                    <p className="text-base">{workOrder.createdDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Estimated Completion</h3>
                    <p className="text-base">{workOrder.estimatedCompletion}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                  <p className="text-base">{workOrder.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visits</CardTitle>
              <CardDescription>Scheduled site visits for this work order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workOrder.visits.map((visit) => (
                  <div key={visit.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{visit.id}</h3>
                          <Badge
                            className={cn(
                              visit.status === "Completed" && "bg-green-500",
                              visit.status === "In Progress" && "bg-blue-500",
                              visit.status === "Scheduled" && "bg-yellow-500",
                              visit.status === "Cancelled" && "bg-red-500",
                            )}
                          >
                            {visit.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{visit.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {visit.date}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {visit.startTime} - {visit.endTime}
                      </div>
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>Technicians:</span>
                        </div>
                        <div className="flex flex-wrap gap-1 ml-5">
                          {visit.technicians.map((tech, i) => (
                            <Badge key={i} variant="outline" className="text-xs py-0 h-5">
                              {tech.name}{" "}
                              {tech.role && <span className="text-xs text-muted-foreground">({tech.role})</span>}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Tasks</h4>
                      <div className="space-y-2">
                        {visit.tasks.map((task) => (
                          <div key={task.id} className="flex items-center gap-2 text-sm">
                            {task.status === "Completed" ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : task.status === "In Progress" ? (
                              <Clock className="h-4 w-4 text-blue-500" />
                            ) : task.status === "Pending" ? (
                              <AlertCircle className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span>{task.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-center">
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Visit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Materials</CardTitle>
              <CardDescription>Materials used or required for this work order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium">Item</th>
                      <th className="text-center p-3 text-sm font-medium">Quantity</th>
                      <th className="text-center p-3 text-sm font-medium">Unit</th>
                      <th className="text-right p-3 text-sm font-medium">Cost</th>
                      <th className="text-right p-3 text-sm font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workOrder.materials.map((material) => (
                      <tr key={material.id} className="border-t">
                        <td className="p-3">{material.name}</td>
                        <td className="p-3 text-center">{material.quantity}</td>
                        <td className="p-3 text-center">{material.unit}</td>
                        <td className="p-3 text-right">${material.cost.toFixed(2)}</td>
                        <td className="p-3 text-right">${(material.quantity * material.cost).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="border-t bg-muted/20">
                      <td colSpan={4} className="p-3 text-right font-medium">
                        Total
                      </td>
                      <td className="p-3 text-right font-medium">
                        ${workOrder.materials.reduce((sum, item) => sum + item.quantity * item.cost, 0).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Material
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark as Completed
                </Button>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Current Status</h3>
                  <Badge className="bg-blue-500">{workOrder.status}</Badge>

                  <h3 className="text-sm font-medium mt-4">Change Status</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      Scheduled
                    </Button>
                    <Button variant="outline" size="sm">
                      In Progress
                    </Button>
                    <Button variant="outline" size="sm">
                      On Hold
                    </Button>
                    <Button variant="outline" size="sm">
                      Cancelled
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes & Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workOrder.notes.map((note) => (
                  <div key={note.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                          {note.authorInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{note.author}</p>
                          <p className="text-xs text-muted-foreground">
                            {note.date} at {note.time}
                          </p>
                        </div>
                        <p className="text-sm">{note.content}</p>

                        {note.attachments.length > 0 && (
                          <div className="mt-2">
                            {note.attachments.map((attachment, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-blue-600 mt-1">
                                <Paperclip className="h-3 w-3" />
                                <span>{attachment.name}</span>
                                <span className="text-muted-foreground">({attachment.size})</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-2 pt-2">
                  <Button className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Job</h3>
                  <Button variant="outline" className="w-full justify-start">
                    <ClipboardList className="h-4 w-4 mr-2" />
                    {workOrder.jobId} - {workOrder.jobName}
                  </Button>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Invoices</h3>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    INV-2023-0056 - $450.00
                  </Button>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Documents</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Paperclip className="h-4 w-4 mr-2" />
                      HVAC_System_Diagram.pdf
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Paperclip className="h-4 w-4 mr-2" />
                      Maintenance_History.xlsx
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

