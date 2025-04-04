"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  Plus,
  Save,
  Trash2,
  X,
  DollarSign,
  Building,
  Calendar,
  User,
  Edit,
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function JobEditPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the job data based on the ID
  const job = {
    id: params.id || "JOB-2023-0045",
    customer: "Acme Corp",
    customerContact: "John Anderson",
    customerPhone: "(555) 123-4567",
    customerEmail: "j.anderson@acmecorp.com",
    address: "123 Main St, Suite 101",
    type: "Commercial HVAC",
    status: "In Progress",
    priority: "High",
    createdDate: "Mar 10, 2023",
    startDate: "Mar 15, 2023",
    estimatedCompletion: "Mar 30, 2023",
    projectManager: "Lisa Wong",
    description:
      "Complete HVAC system overhaul for office building. Multiple units need replacement and the control system requires upgrading to a modern digital system with zone control.",
    progress: 35, // percentage complete
    estimatedValue: 12500.0,
    estimatedLaborHours: 30,
    estimatedMaterialsCost: 8000.0,
    estimatedOtherCosts: 750.0,
    team: [
      { id: "tech1", name: "Lisa Wong", role: "Project Manager", initials: "LW" },
      { id: "tech2", name: "John Smith", role: "Lead Technician", initials: "JS" },
      { id: "tech3", name: "Mike Davis", role: "HVAC Technician", initials: "MD" },
      { id: "tech4", name: "Sarah Johnson", role: "Controls Specialist", initials: "SJ" },
    ],
  }

  // Available team members in the system
  const availableTeamMembers = [
    { id: "tech1", name: "Lisa Wong", initials: "LW", skills: ["Project Management", "HVAC"] },
    { id: "tech2", name: "John Smith", initials: "JS", skills: ["HVAC", "Electrical"] },
    { id: "tech3", name: "Mike Davis", initials: "MD", skills: ["HVAC", "Plumbing"] },
    { id: "tech4", name: "Sarah Johnson", initials: "SJ", skills: ["Electrical", "Controls"] },
    { id: "tech5", name: "Robert Chen", initials: "RC", skills: ["Plumbing", "Electrical"] },
    { id: "tech6", name: "Emily Wilson", initials: "EW", skills: ["HVAC", "Project Management"] },
    { id: "tech7", name: "David Kim", initials: "DK", skills: ["Controls", "Automation"] },
  ]

  // Available team member roles
  const teamMemberRoles = [
    "Project Manager",
    "Lead Technician",
    "HVAC Technician",
    "Electrician",
    "Plumber",
    "Controls Specialist",
    "Apprentice",
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
          <h1 className="text-2xl font-bold">Edit Job {job.id}</h1>
          <Badge
            className={cn(
              "ml-2",
              job.status === "Completed" && "bg-green-500",
              job.status === "In Progress" && "bg-blue-500",
              job.status === "Scheduled" && "bg-yellow-500",
              job.status === "Estimating" && "bg-purple-500",
            )}
          >
            {job.status}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/jobs/${job.id}`}>
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

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="work-orders">Work Orders</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Edit the basic information for this job</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Job Type</Label>
                    <Select defaultValue={job.type}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Commercial HVAC">Commercial HVAC</SelectItem>
                        <SelectItem value="Residential HVAC">Residential HVAC</SelectItem>
                        <SelectItem value="Electrical Upgrade">Electrical Upgrade</SelectItem>
                        <SelectItem value="Plumbing Repair">Plumbing Repair</SelectItem>
                        <SelectItem value="Preventative Maintenance">Preventative Maintenance</SelectItem>
                        <SelectItem value="HVAC Installation">HVAC Installation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue={job.status}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Estimating">Estimating</SelectItem>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select defaultValue={job.priority}>
                      <SelectTrigger>
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
                    <Label htmlFor="projectManager">Project Manager</Label>
                    <Select defaultValue={job.projectManager}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project manager" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lisa Wong">Lisa Wong</SelectItem>
                        <SelectItem value="Emily Wilson">Emily Wilson</SelectItem>
                        <SelectItem value="Robert Chen">Robert Chen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" type="date" defaultValue="2023-03-15" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estimatedCompletion">Est. Completion</Label>
                      <Input id="estimatedCompletion" type="date" defaultValue="2023-03-30" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      defaultValue={job.description}
                      placeholder="Enter job description"
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Enter any additional notes about this job"
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>Edit customer details for this job</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer">Customer</Label>
                    <Select defaultValue={job.customer}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Acme Corp">Acme Corp</SelectItem>
                        <SelectItem value="TechSolutions Inc">TechSolutions Inc</SelectItem>
                        <SelectItem value="Riverside Apartments">Riverside Apartments</SelectItem>
                        <SelectItem value="City Hospital">City Hospital</SelectItem>
                        <SelectItem value="Downtown Office Tower">Downtown Office Tower</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerContact">Contact Name</Label>
                    <Input id="customerContact" defaultValue={job.customerContact} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">Contact Phone</Label>
                    <Input id="customerPhone" defaultValue={job.customerPhone} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerEmail">Contact Email</Label>
                    <Input id="customerEmail" defaultValue={job.customerEmail} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Job Site Address</Label>
                    <Textarea
                      id="address"
                      defaultValue={job.address}
                      placeholder="Enter the job site address"
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingAddress">Billing Address</Label>
                    <div className="flex items-center gap-2 mb-2">
                      <Checkbox id="sameAsSite" />
                      <Label htmlFor="sameAsSite" className="text-sm font-normal">
                        Same as job site address
                      </Label>
                    </div>
                    <Textarea
                      id="billingAddress"
                      placeholder="Enter billing address if different from job site"
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="pt-4">
                    <Button variant="outline" className="gap-2">
                      <Building className="h-4 w-4" />
                      View Customer Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage team members assigned to this job</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-4">Currently Assigned Team Members</h3>

                  <div className="space-y-4">
                    {job.team.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3">
                          <Badge className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium bg-blue-100 text-blue-700 border-0">
                            {member.initials}
                          </Badge>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Select defaultValue={member.role}>
                                <SelectTrigger className="h-7 text-xs w-[180px]">
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  {teamMemberRoles.map((role) => (
                                    <SelectItem key={role} value={role}>
                                      {role}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-4">Add Team Members</h3>

                  <div className="space-y-4">
                    {availableTeamMembers
                      .filter((member) => !job.team.some((assigned) => assigned.id === member.id))
                      .map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox id={`member-${member.id}`} />
                            <div>
                              <Label htmlFor={`member-${member.id}`} className="font-medium cursor-pointer">
                                {member.name}
                              </Label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {member.skills.map((skill) => (
                                  <Badge key={skill} variant="outline" className="text-xs py-0 h-5">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Select>
                            <SelectTrigger className="h-8 text-xs w-[180px]">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              {teamMemberRoles.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ))}
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Selected Team Members
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="work-orders" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Work Orders</CardTitle>
                <CardDescription>Manage work orders for this job</CardDescription>
              </div>
              <Button onClick={() => {}}>
                <Plus className="h-4 w-4 mr-2" />
                Create Work Order
              </Button>
            </CardHeader>
            <CardContent>
              {/* Existing Work Orders */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium mb-2">Existing Work Orders</h3>

                {/* Sample work orders - in a real app, these would be fetched from the backend */}
                {[
                  {
                    id: "WO-2023-1234",
                    title: "Initial Assessment",
                    type: "HVAC Inspection",
                    status: "Completed",
                    date: "Mar 15, 2023",
                    technicians: ["John Smith"],
                  },
                  {
                    id: "WO-2023-1235",
                    title: "Replace Main Units",
                    type: "HVAC Replacement",
                    status: "In Progress",
                    date: "Mar 19, 2023",
                    technicians: ["Mike Davis", "Sarah Johnson"],
                  },
                  {
                    id: "WO-2023-1236",
                    title: "Control System Installation",
                    type: "HVAC Controls",
                    status: "Scheduled",
                    date: "Mar 25, 2023",
                    technicians: ["Sarah Johnson"],
                  },
                ].map((workOrder) => (
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

                        <div className="flex flex-wrap gap-3 pt-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            {workOrder.date}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <User className="h-3.5 w-3.5" />
                            {workOrder.technicians.join(", ")}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 self-end md:self-center">
                        <Link href={`/work-orders/${workOrder.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Create New Work Order Form */}
              <div className="mt-8 border rounded-lg p-4">
                <h3 className="text-sm font-medium mb-4">Create New Work Order</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="workOrderTitle">Title</Label>
                      <Input id="workOrderTitle" placeholder="Enter work order title" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workOrderType">Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select work order type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HVAC Inspection">HVAC Inspection</SelectItem>
                          <SelectItem value="HVAC Repair">HVAC Repair</SelectItem>
                          <SelectItem value="HVAC Replacement">HVAC Replacement</SelectItem>
                          <SelectItem value="HVAC Controls">HVAC Controls</SelectItem>
                          <SelectItem value="HVAC Testing">HVAC Testing</SelectItem>
                          <SelectItem value="Electrical">Electrical</SelectItem>
                          <SelectItem value="Plumbing">Plumbing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workOrderStatus">Status</Label>
                      <Select defaultValue="Pending">
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Scheduled">Scheduled</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="workOrderDate">Scheduled Date</Label>
                      <Input id="workOrderDate" type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workOrderTechnicians">Assign Technicians</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select technicians" />
                        </SelectTrigger>
                        <SelectContent>
                          {job.team.map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        You can assign more technicians after creating the work order
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workOrderDescription">Description</Label>
                      <Textarea
                        id="workOrderDescription"
                        placeholder="Enter work order description"
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Work Order
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Documents & Approvals</CardTitle>
                <CardDescription>Manage documents and approvals that may affect job progress</CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Document
              </Button>
            </CardHeader>
            <CardContent>
              {/* Estimates Section */}
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-4">Estimates</h3>

                <div className="space-y-4">
                  {[
                    {
                      id: "EST-2023-0045",
                      title: "Initial HVAC System Estimate",
                      status: "Approved",
                      date: "Mar 8, 2023",
                      amount: "$12,500.00",
                    },
                    {
                      id: "EST-2023-0046",
                      title: "Additional Ductwork Estimate",
                      status: "Pending Approval",
                      date: "Mar 16, 2023",
                      amount: "$3,200.00",
                    },
                  ].map((estimate) => (
                    <div key={estimate.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{estimate.id}</h3>
                            <Badge
                              className={cn(
                                "ml-2",
                                estimate.status === "Approved" && "bg-green-500",
                                estimate.status === "Pending Approval" && "bg-yellow-500",
                                estimate.status === "Rejected" && "bg-red-500",
                              )}
                            >
                              {estimate.status}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{estimate.title}</p>
                          <div className="flex flex-wrap gap-3 pt-2">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5" />
                              {estimate.date}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <DollarSign className="h-3.5 w-3.5" />
                              {estimate.amount}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 self-end md:self-center">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Estimate
                  </Button>
                </div>
              </div>

              {/* Customer Requests Section */}
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-4">Customer Requests</h3>

                <div className="space-y-4">
                  {[
                    {
                      id: "REQ-2023-0012",
                      title: "Additional Zone Control",
                      status: "Pending Review",
                      date: "Mar 17, 2023",
                      priority: "Medium",
                    },
                  ].map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{request.id}</h3>
                            <Badge
                              className={cn(
                                "ml-2",
                                request.status === "Approved" && "bg-green-500",
                                request.status === "Pending Review" && "bg-yellow-500",
                                request.status === "Rejected" && "bg-red-500",
                                request.status === "Completed" && "bg-blue-500",
                              )}
                            >
                              {request.status}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{request.title}</p>
                          <div className="flex flex-wrap gap-3 pt-2">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5" />
                              {request.date}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <AlertTriangle className="h-3.5 w-3.5" />
                              Priority: {request.priority}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 self-end md:self-center">
                          <Button variant="outline" size="sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer Request
                  </Button>
                </div>
              </div>

              {/* Purchase Orders Section */}
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-4">Purchase Orders</h3>

                <div className="space-y-4">
                  {[
                    {
                      id: "PO-2023-0078",
                      title: "HVAC Units and Components",
                      status: "Ordered",
                      date: "Mar 12, 2023",
                      vendor: "HVAC Supplies Inc.",
                      amount: "$6,450.00",
                      eta: "Mar 22, 2023",
                    },
                    {
                      id: "PO-2023-0079",
                      title: "Control System Components",
                      status: "Pending Approval",
                      date: "Mar 18, 2023",
                      vendor: "Smart Controls Co.",
                      amount: "$2,200.00",
                      eta: "Pending",
                    },
                  ].map((po) => (
                    <div key={po.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{po.id}</h3>
                            <Badge
                              className={cn(
                                "ml-2",
                                po.status === "Ordered" && "bg-blue-500",
                                po.status === "Pending Approval" && "bg-yellow-500",
                                po.status === "Delivered" && "bg-green-500",
                                po.status === "Cancelled" && "bg-red-500",
                              )}
                            >
                              {po.status}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{po.title}</p>
                          <p className="text-sm text-muted-foreground">Vendor: {po.vendor}</p>
                          <div className="flex flex-wrap gap-3 pt-2">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5" />
                              Ordered: {po.date}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <DollarSign className="h-3.5 w-3.5" />
                              {po.amount}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Truck className="h-3.5 w-3.5" />
                              ETA: {po.eta}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 self-end md:self-center">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Purchase Order
                  </Button>
                </div>
              </div>

              {/* Permits & Approvals Section */}
              <div>
                <h3 className="text-sm font-medium mb-4">Permits & Approvals</h3>

                <div className="space-y-4">
                  {[
                    {
                      id: "PERM-2023-0034",
                      title: "HVAC Installation Permit",
                      status: "Approved",
                      date: "Mar 14, 2023",
                      authority: "City Building Department",
                      expiryDate: "Sep 14, 2023",
                    },
                    {
                      id: "PERM-2023-0035",
                      title: "Rooftop Work Permit",
                      status: "Pending",
                      date: "Mar 16, 2023",
                      authority: "Building Management",
                      expiryDate: "N/A",
                    },
                  ].map((permit) => (
                    <div key={permit.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{permit.id}</h3>
                            <Badge
                              className={cn(
                                "ml-2",
                                permit.status === "Approved" && "bg-green-500",
                                permit.status === "Pending" && "bg-yellow-500",
                                permit.status === "Rejected" && "bg-red-500",
                                permit.status === "Expired" && "bg-red-300",
                              )}
                            >
                              {permit.status}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{permit.title}</p>
                          <p className="text-sm text-muted-foreground">Authority: {permit.authority}</p>
                          <div className="flex flex-wrap gap-3 pt-2">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5" />
                              Filed: {permit.date}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              Expires: {permit.expiryDate}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 self-end md:self-center">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Update
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Permit/Approval
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
              <CardDescription>Edit financial details for this job</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Estimated Values</h3>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedValue">Total Job Value ($)</Label>
                    <Input id="estimatedValue" type="number" defaultValue={job.estimatedValue} step="0.01" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedLaborHours">Estimated Labor Hours</Label>
                    <Input id="estimatedLaborHours" type="number" defaultValue={job.estimatedLaborHours} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="laborRate">Labor Rate ($ per hour)</Label>
                    <Input id="laborRate" type="number" defaultValue="80.00" step="0.01" />
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Checkbox id="taxExempt" />
                      <Label htmlFor="taxExempt" className="text-sm font-normal">
                        Tax Exempt
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Cost Estimates</h3>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedMaterialsCost">Estimated Materials Cost ($)</Label>
                    <Input
                      id="estimatedMaterialsCost"
                      type="number"
                      defaultValue={job.estimatedMaterialsCost}
                      step="0.01"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedOtherCosts">Estimated Other Costs ($)</Label>
                    <Input id="estimatedOtherCosts" type="number" defaultValue={job.estimatedOtherCosts} step="0.01" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="markupPercentage">Markup Percentage (%)</Label>
                    <Input id="markupPercentage" type="number" defaultValue="25" step="0.1" />
                  </div>

                  <div className="pt-4">
                    <Button variant="outline" className="gap-2">
                      <DollarSign className="h-4 w-4" />
                      Calculate Totals
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 border rounded-lg bg-muted/20">
                <h3 className="text-sm font-medium mb-3">Financial Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Labor</p>
                    <p className="text-lg font-medium">$2,400.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Materials</p>
                    <p className="text-lg font-medium">$8,000.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Other</p>
                    <p className="text-lg font-medium">$750.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Costs</p>
                    <p className="text-lg font-medium">$11,150.00</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Profit</p>
                    <p className="text-lg font-medium">$1,350.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Profit Margin</p>
                    <p className="text-lg font-medium">10.8%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

