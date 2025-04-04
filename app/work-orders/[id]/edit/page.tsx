import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Paperclip,
  Plus,
  User,
  CheckCircle2,
  ClipboardList,
  Save,
  X,
  Trash2,
} from "lucide-react"
import Link from "next/link"

export default function WorkOrderEditPage({ params }: { params: { id: string } }) {
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
      { id: "tech1", name: "John Smith", role: "Lead Technician" },
      { id: "tech2", name: "Mike Davis", role: "Assistant" },
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
          { id: "tech1", name: "John Smith", initials: "JS", role: "Lead" },
          { id: "tech2", name: "Mike Davis", initials: "MD", role: "Assistant" },
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
          { id: "tech1", name: "John Smith", initials: "JS", role: "Lead" },
          { id: "tech4", name: "Lisa Wong", initials: "LW", role: "Apprentice" },
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
          { id: "tech3", name: "Sarah Johnson", initials: "SJ", role: "Lead" },
          { id: "tech2", name: "Mike Davis", initials: "MD", role: "Assistant" },
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

  // Available technicians in the system
  const availableTechnicians = [
    { id: "tech1", name: "John Smith", initials: "JS", skills: ["HVAC", "Electrical"] },
    { id: "tech2", name: "Mike Davis", initials: "MD", skills: ["HVAC", "Plumbing"] },
    { id: "tech3", name: "Sarah Johnson", initials: "SJ", skills: ["Electrical", "Controls"] },
    { id: "tech4", name: "Lisa Wong", initials: "LW", skills: ["HVAC", "Refrigeration"] },
    { id: "tech5", name: "Robert Chen", initials: "RC", skills: ["Plumbing", "Electrical"] },
  ]

  // Available technician roles
  const technicianRoles = ["Lead Technician", "Assistant", "Apprentice", "Specialist", "Inspector"]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/work-orders/${workOrder.id}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Edit Work Order {workOrder.id}</h1>
          <Select defaultValue={workOrder.status}>
            <SelectTrigger className="w-[140px] h-7">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="On Hold">On Hold</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/work-orders/${workOrder.id}`}>
            <Button variant="outline" className="gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </Link>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
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
                  <div className="space-y-2">
                    <Label htmlFor="customer">Customer</Label>
                    <Select defaultValue={workOrder.customer}>
                      <SelectTrigger id="customer">
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Acme Corp">Acme Corp</SelectItem>
                        <SelectItem value="TechSolutions Inc">TechSolutions Inc</SelectItem>
                        <SelectItem value="Riverside Apartments">Riverside Apartments</SelectItem>
                        <SelectItem value="City Hospital">City Hospital</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job">Job</Label>
                    <Select defaultValue={workOrder.jobId}>
                      <SelectTrigger id="job">
                        <SelectValue placeholder="Select job" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={workOrder.jobId}>
                          {workOrder.jobId} - {workOrder.jobName}
                        </SelectItem>
                        <SelectItem value="JOB-2023-0044">JOB-2023-0044 - Electrical Upgrade</SelectItem>
                        <SelectItem value="JOB-2023-0043">JOB-2023-0043 - Plumbing Repair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Work Order Type</Label>
                    <Select defaultValue={workOrder.type}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HVAC Repair">HVAC Repair</SelectItem>
                        <SelectItem value="HVAC Installation">HVAC Installation</SelectItem>
                        <SelectItem value="Electrical">Electrical</SelectItem>
                        <SelectItem value="Plumbing">Plumbing</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select defaultValue={workOrder.priority}>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Job Site Address</Label>
                    <Textarea
                      id="address"
                      defaultValue={workOrder.address}
                      placeholder="Enter the job site address"
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="technicians">Assigned Technicians</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {workOrder.assignedTechnicians.map((tech, i) => (
                        <div key={i} className="flex items-center gap-1 bg-blue-50 border rounded-md px-2 py-1">
                          <span>{tech.name}</span>
                          {tech.role && <span className="text-muted-foreground text-xs">({tech.role})</span>}
                          <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-muted-foreground">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="h-7">
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="createdDate">Created Date</Label>
                    <Input id="createdDate" defaultValue={workOrder.createdDate} readOnly className="bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedCompletion">Est. Completion</Label>
                    <Input id="estimatedCompletion" type="date" defaultValue="2023-03-25" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    defaultValue={workOrder.description}
                    placeholder="Enter work order description"
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Visits</CardTitle>
                <CardDescription>Scheduled site visits for this work order</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Visit
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workOrder.visits.map((visit, index) => (
                  <div key={visit.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Input defaultValue={visit.id} className="h-7 w-[120px] font-medium" readOnly />
                          <Select defaultValue={visit.status}>
                            <SelectTrigger className="w-[120px] h-7">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Scheduled">Scheduled</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                              <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Textarea
                          defaultValue={visit.description}
                          className="text-sm text-muted-foreground mt-1 min-h-[60px]"
                          placeholder="Visit description"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <Input
                          type="date"
                          defaultValue={visit.date.split("/").reverse().join("-")}
                          className="h-7 w-[140px]"
                        />
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Select defaultValue={visit.startTime}>
                          <SelectTrigger className="h-7 w-[100px]">
                            <SelectValue placeholder="Start" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                            <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                            <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                            <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                            <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                            <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                            <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                            <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                            <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                        <span>-</span>
                        <Select defaultValue={visit.endTime}>
                          <SelectTrigger className="h-7 w-[100px]">
                            <SelectValue placeholder="End" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                            <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                            <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                            <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                            <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                            <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                            <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                            <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                            <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>Technicians:</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs ml-1">
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-1 ml-5">
                          {visit.technicians.map((tech, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-1 bg-blue-50 border rounded-md px-2 py-0.5 text-xs"
                            >
                              <span>{tech.name}</span>
                              {tech.role && (
                                <Select defaultValue={tech.role} className="ml-1">
                                  <SelectTrigger className="h-5 text-xs w-[80px] border-none bg-transparent p-0">
                                    <SelectValue placeholder="Role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Lead">Lead</SelectItem>
                                    <SelectItem value="Assistant">Assistant</SelectItem>
                                    <SelectItem value="Apprentice">Apprentice</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                              <Button variant="ghost" size="sm" className="h-4 w-4 p-0 text-muted-foreground">
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium">Tasks</h4>
                        <Button variant="outline" size="sm" className="h-6 text-xs">
                          <Plus className="h-3 w-3 mr-1" />
                          Add Task
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {visit.tasks.map((task) => (
                          <div key={task.id} className="flex items-center gap-2 text-sm">
                            <Select defaultValue={task.status} className="w-[120px]">
                              <SelectTrigger className="h-7 text-xs">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input defaultValue={task.description} className="h-7 text-sm flex-1" />
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Materials</CardTitle>
                <CardDescription>Materials used or required for this work order</CardDescription>
              </div>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Material
              </Button>
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
                      <th className="p-3 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {workOrder.materials.map((material) => (
                      <tr key={material.id} className="border-t">
                        <td className="p-3">
                          <Input defaultValue={material.name} className="h-8 text-sm" />
                        </td>
                        <td className="p-3">
                          <Input type="number" defaultValue={material.quantity} className="h-8 text-sm text-center" />
                        </td>
                        <td className="p-3">
                          <Select defaultValue={material.unit}>
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ea">ea</SelectItem>
                              <SelectItem value="lbs">lbs</SelectItem>
                              <SelectItem value="ft">ft</SelectItem>
                              <SelectItem value="gal">gal</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-3">
                          <Input type="number" defaultValue={material.cost} className="h-8 text-sm text-right" />
                        </td>
                        <td className="p-3 text-right">${(material.quantity * material.cost).toFixed(2)}</td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t bg-muted/20">
                      <td colSpan={4} className="p-3 text-right font-medium">
                        Total
                      </td>
                      <td className="p-3 text-right font-medium">
                        ${workOrder.materials.reduce((sum, item) => sum + item.quantity * item.cost, 0).toFixed(2)}
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
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
                  <Select defaultValue={workOrder.status}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Notes & Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-3 mb-4">
                  <Textarea placeholder="Add a new note..." className="min-h-[100px] mb-2" />
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4 mr-1" />
                      Attach
                    </Button>
                    <Button size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Add Note
                    </Button>
                  </div>
                </div>

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
                        <Textarea defaultValue={note.content} className="text-sm min-h-[60px]" readOnly />

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
                  <Select defaultValue={workOrder.jobId}>
                    <SelectTrigger className="w-full justify-start">
                      <SelectValue placeholder="Select job" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={workOrder.jobId}>
                        <ClipboardList className="h-4 w-4 mr-2 inline" />
                        {workOrder.jobId} - {workOrder.jobName}
                      </SelectItem>
                      <SelectItem value="JOB-2023-0044">
                        <ClipboardList className="h-4 w-4 mr-2 inline" />
                        JOB-2023-0044 - Electrical Upgrade
                      </SelectItem>
                      <SelectItem value="JOB-2023-0043">
                        <ClipboardList className="h-4 w-4 mr-2 inline" />
                        JOB-2023-0043 - Plumbing Repair
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Invoices</h3>
                  <Select defaultValue="INV-2023-0056">
                    <SelectTrigger className="w-full justify-start">
                      <SelectValue placeholder="Select invoice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INV-2023-0056">
                        <FileText className="h-4 w-4 mr-2 inline" />
                        INV-2023-0056 - $450.00
                      </SelectItem>
                      <SelectItem value="INV-2023-0057">
                        <FileText className="h-4 w-4 mr-2 inline" />
                        INV-2023-0057 - $275.50
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Documents</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Button variant="outline" className="w-full justify-start">
                        <Paperclip className="h-4 w-4 mr-2" />
                        HVAC_System_Diagram.pdf
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <Button variant="outline" className="w-full justify-start">
                        <Paperclip className="h-4 w-4 mr-2" />
                        Maintenance_History.xlsx
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Document
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

