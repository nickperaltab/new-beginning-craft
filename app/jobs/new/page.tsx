"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ArrowLeft,
  Plus,
  Save,
  X,
  DollarSign,
  Building,
  FileText,
  InfoIcon,
  Calendar,
  AlertTriangle,
  Truck,
  FileCheck,
  ClipboardList,
  FileSpreadsheet,
  Clock,
  ChevronRight,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function NewJobPage() {
  // State for tracking documents
  const [estimates, setEstimates] = useState<any[]>([])
  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([])
  const [permits, setPermits] = useState<any[]>([])
  const [customerRequests, setCustomerRequests] = useState<any[]>([])

  // State for new document forms
  const [showEstimateForm, setShowEstimateForm] = useState(false)
  const [showPOForm, setShowPOForm] = useState(false)
  const [showPermitForm, setShowPermitForm] = useState(false)
  const [showRequestForm, setShowRequestForm] = useState(false)

  // State for job creation method
  const [jobCreationMethod, setJobCreationMethod] = useState("new")

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

  // Sample existing estimates for selection
  const existingEstimates = [
    {
      id: "EST-2023-0045",
      title: "HVAC System Replacement - Acme Corp",
      customer: "Acme Corp",
      amount: 12500.0,
      date: "2023-03-08",
    },
    {
      id: "EST-2023-0046",
      title: "Electrical Upgrade - TechSolutions Inc",
      customer: "TechSolutions Inc",
      amount: 8750.0,
      date: "2023-03-10",
    },
    {
      id: "EST-2023-0047",
      title: "Plumbing Repair - Riverside Apartments",
      customer: "Riverside Apartments",
      amount: 5200.0,
      date: "2023-03-12",
    },
  ]

  // Handler for adding a new estimate
  const handleAddEstimate = () => {
    // In a real app, this would validate and process the form data
    const newEstimate = {
      id: `EST-2023-00${48 + estimates.length}`,
      title: "New HVAC System Estimate",
      status: "Draft",
      amount: 12500.0,
      date: new Date().toISOString().split("T")[0],
    }

    setEstimates([...estimates, newEstimate])
    setShowEstimateForm(false)
  }

  // Handler for adding a new purchase order
  const handleAddPO = () => {
    // In a real app, this would validate and process the form data
    const newPO = {
      id: `PO-2023-00${78 + purchaseOrders.length}`,
      title: "HVAC Equipment Order",
      vendor: "HVAC Supplies Inc.",
      status: "Draft",
      amount: 6450.0,
      date: new Date().toISOString().split("T")[0],
      eta: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    }

    setPurchaseOrders([...purchaseOrders, newPO])
    setShowPOForm(false)
  }

  // Handler for adding a new permit
  const handleAddPermit = () => {
    // In a real app, this would validate and process the form data
    const newPermit = {
      id: `PERM-2023-00${34 + permits.length}`,
      title: "HVAC Installation Permit",
      authority: "City Building Department",
      status: "Not Started",
      date: new Date().toISOString().split("T")[0],
      expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    }

    setPermits([...permits, newPermit])
    setShowPermitForm(false)
  }

  // Handler for adding a new customer request
  const handleAddRequest = () => {
    // In a real app, this would validate and process the form data
    const newRequest = {
      id: `REQ-2023-00${12 + customerRequests.length}`,
      title: "Additional Zone Control",
      status: "Pending Review",
      priority: "Medium",
      date: new Date().toISOString().split("T")[0],
    }

    setCustomerRequests([...customerRequests, newRequest])
    setShowRequestForm(false)
  }

  // Function to check if there are any potential blockers
  const hasPotentialBlockers = () => {
    return permits.length > 0 || purchaseOrders.length > 0
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/jobs">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Create New Job</h1>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/jobs">
            <Button variant="outline" className="gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </Link>
          <Link href="/jobs/JOB-2023-0045">
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Create Job
            </Button>
          </Link>
        </div>
      </div>

      {/* Job Creation Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Job Creation Method</CardTitle>
          <CardDescription>Choose how you want to create this job</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            defaultValue="new"
            value={jobCreationMethod}
            onValueChange={setJobCreationMethod}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div
              className={cn(
                "flex items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer",
                jobCreationMethod === "new" ? "border-blue-600 bg-blue-50" : "hover:bg-muted",
              )}
            >
              <RadioGroupItem value="new" id="new" className="mt-1" />
              <div className="space-y-1">
                <Label htmlFor="new" className="font-medium cursor-pointer">
                  Create New Job
                </Label>
                <p className="text-sm text-muted-foreground">Start from scratch with a new job</p>
              </div>
            </div>

            <div
              className={cn(
                "flex items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer",
                jobCreationMethod === "from-estimate" ? "border-blue-600 bg-blue-50" : "hover:bg-muted",
              )}
            >
              <RadioGroupItem value="from-estimate" id="from-estimate" className="mt-1" />
              <div className="space-y-1">
                <Label htmlFor="from-estimate" className="font-medium cursor-pointer">
                  Convert from Estimate
                </Label>
                <p className="text-sm text-muted-foreground">Create a job from an existing estimate</p>
              </div>
            </div>

            <div
              className={cn(
                "flex items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer",
                jobCreationMethod === "template" ? "border-blue-600 bg-blue-50" : "hover:bg-muted",
              )}
            >
              <RadioGroupItem value="template" id="template" className="mt-1" />
              <div className="space-y-1">
                <Label htmlFor="template" className="font-medium cursor-pointer">
                  Use Template
                </Label>
                <p className="text-sm text-muted-foreground">Start from a predefined job template</p>
              </div>
            </div>
          </RadioGroup>

          {jobCreationMethod === "from-estimate" && (
            <div className="mt-6 border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-4">Select Estimate to Convert</h3>
              <div className="space-y-3">
                {existingEstimates.map((estimate) => (
                  <div key={estimate.id} className="flex items-center space-x-3 border-b pb-3 last:border-0 last:pb-0">
                    <Checkbox id={`estimate-${estimate.id}`} />
                    <div className="flex-1">
                      <Label htmlFor={`estimate-${estimate.id}`} className="font-medium cursor-pointer">
                        {estimate.id}: {estimate.title}
                      </Label>
                      <div className="flex flex-wrap gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building className="h-3.5 w-3.5" />
                          {estimate.customer}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5" />${estimate.amount.toFixed(2)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {estimate.date}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4">
                <Button>
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Continue with Selected Estimate
                </Button>
              </div>
            </div>
          )}

          {jobCreationMethod === "template" && (
            <div className="mt-6 border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-4">Select Job Template</h3>
              <div className="space-y-3">
                {[
                  {
                    id: "template1",
                    name: "Commercial HVAC Installation",
                    description: "Standard template for commercial HVAC installations",
                  },
                  {
                    id: "template2",
                    name: "Residential HVAC Service",
                    description: "Template for residential HVAC service calls",
                  },
                  {
                    id: "template3",
                    name: "Preventative Maintenance",
                    description: "Standard preventative maintenance job template",
                  },
                ].map((template) => (
                  <div key={template.id} className="flex items-center space-x-3 border-b pb-3 last:border-0 last:pb-0">
                    <Checkbox id={`template-${template.id}`} />
                    <div className="flex-1">
                      <Label htmlFor={`template-${template.id}`} className="font-medium cursor-pointer">
                        {template.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4">
                <Button>
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Use Selected Template
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="documents" className={hasPotentialBlockers() ? "relative" : ""}>
            Documents
            {hasPotentialBlockers() && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="work-orders">Work Orders</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Enter the basic information for this job</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Job Type</Label>
                    <Select>
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
                    <Select defaultValue="Estimating">
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
                    <Select defaultValue="Medium">
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
                    <Select>
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
                      <Input id="startDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estimatedCompletion">Est. Completion</Label>
                      <Input id="estimatedCompletion" type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Enter job description" className="min-h-[120px]" />
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
              <CardDescription>Enter customer details for this job</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer">Customer</Label>
                    <Select>
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
                    <Input id="customerContact" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">Contact Phone</Label>
                    <Input id="customerPhone" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerEmail">Contact Email</Label>
                    <Input id="customerEmail" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Job Site Address</Label>
                    <Textarea id="address" placeholder="Enter the job site address" className="min-h-[80px]" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingAddress">Billing Address</Label>
                    <div className="flex items-center gap-2 mb-2">
                      <Checkbox id="sameAsSite" defaultChecked />
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
                      Create New Customer
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
              <CardDescription>Assign team members to this job</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-4">Add Team Members</h3>

                  <div className="space-y-4">
                    {availableTeamMembers.map((member) => (
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

        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents & Approvals</CardTitle>
              <CardDescription>Add estimates, purchase orders, and required approvals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Estimates Section */}
                <Accordion type="single" collapsible defaultValue="estimates" className="border rounded-lg">
                  <AccordionItem value="estimates" className="border-0">
                    <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 [&[data-state=open]]:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Estimates</span>
                        {estimates.length > 0 && (
                          <Badge variant="outline" className="ml-2 bg-blue-50">
                            {estimates.length}
                          </Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      {estimates.length > 0 ? (
                        <div className="space-y-3 mb-4">
                          {estimates.map((estimate, index) => (
                            <div key={index} className="border rounded-lg p-3 bg-card">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium">{estimate.id}</h4>
                                    <Badge
                                      className={cn(
                                        estimate.status === "Approved"
                                          ? "bg-green-500"
                                          : estimate.status === "Draft"
                                            ? "bg-gray-500"
                                            : "bg-yellow-500",
                                      )}
                                    >
                                      {estimate.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm mt-1">{estimate.title}</p>
                                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-3.5 w-3.5" />
                                      {estimate.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <DollarSign className="h-3.5 w-3.5" />${estimate.amount.toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <FileText className="h-4 w-4 mr-1" />
                                    Edit
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground py-6">
                          <FileSpreadsheet className="h-12 w-12 mx-auto mb-3 opacity-20" />
                          <p>No estimates added yet</p>
                          <p className="text-sm">Add an estimate to track job value and scope</p>
                        </div>
                      )}

                      {showEstimateForm ? (
                        <div className="border rounded-lg p-4 mt-4">
                          <h3 className="text-sm font-medium mb-4">Add New Estimate</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label htmlFor="estimateTitle">Estimate Title</Label>
                                <Input id="estimateTitle" placeholder="Enter estimate title" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="estimateAmount">Amount ($)</Label>
                                <Input id="estimateAmount" type="number" step="0.01" placeholder="0.00" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="estimateStatus">Status</Label>
                                <Select defaultValue="Draft">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Draft">Draft</SelectItem>
                                    <SelectItem value="Sent">Sent to Customer</SelectItem>
                                    <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                                    <SelectItem value="Approved">Approved</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label htmlFor="estimateDate">Date</Label>
                                <Input id="estimateDate" type="date" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="estimateNotes">Notes</Label>
                                <Textarea
                                  id="estimateNotes"
                                  placeholder="Enter any notes about this estimate"
                                  className="min-h-[80px]"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => setShowEstimateForm(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleAddEstimate}>Add Estimate</Button>
                          </div>
                        </div>
                      ) : (
                        <Button onClick={() => setShowEstimateForm(true)} className="w-full mt-4">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Estimate
                        </Button>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Purchase Orders Section */}
                <Accordion type="single" collapsible className="border rounded-lg">
                  <AccordionItem value="purchase-orders" className="border-0">
                    <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 [&[data-state=open]]:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Purchase Orders</span>
                        {purchaseOrders.length > 0 && (
                          <Badge variant="outline" className="ml-2 bg-blue-50">
                            {purchaseOrders.length}
                          </Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      {purchaseOrders.length > 0 ? (
                        <div className="space-y-3 mb-4">
                          {purchaseOrders.map((po, index) => (
                            <div key={index} className="border rounded-lg p-3 bg-card">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium">{po.id}</h4>
                                    <Badge
                                      className={cn(
                                        po.status === "Ordered"
                                          ? "bg-blue-500"
                                          : po.status === "Draft"
                                            ? "bg-gray-500"
                                            : po.status === "Delivered"
                                              ? "bg-green-500"
                                              : "bg-yellow-500",
                                      )}
                                    >
                                      {po.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm mt-1">{po.title}</p>
                                  <p className="text-xs text-muted-foreground">Vendor: {po.vendor}</p>
                                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-3.5 w-3.5" />
                                      {po.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <DollarSign className="h-3.5 w-3.5" />${po.amount.toFixed(2)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Truck className="h-3.5 w-3.5" />
                                      ETA: {po.eta}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <FileText className="h-4 w-4 mr-1" />
                                    Edit
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground py-6">
                          <Truck className="h-12 w-12 mx-auto mb-3 opacity-20" />
                          <p>No purchase orders added yet</p>
                          <p className="text-sm">Add purchase orders to track materials and equipment</p>
                        </div>
                      )}

                      {showPOForm ? (
                        <div className="border rounded-lg p-4 mt-4">
                          <h3 className="text-sm font-medium mb-4">Add New Purchase Order</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label htmlFor="poTitle">Purchase Order Title</Label>
                                <Input id="poTitle" placeholder="Enter purchase order title" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="poVendor">Vendor</Label>
                                <Input id="poVendor" placeholder="Enter vendor name" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="poAmount">Amount ($)</Label>
                                <Input id="poAmount" type="number" step="0.01" placeholder="0.00" />
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label htmlFor="poDate">Order Date</Label>
                                <Input id="poDate" type="date" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="poEta">Expected Delivery Date</Label>
                                <Input id="poEta" type="date" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="poStatus">Status</Label>
                                <Select defaultValue="Draft">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Draft">Draft</SelectItem>
                                    <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                                    <SelectItem value="Ordered">Ordered</SelectItem>
                                    <SelectItem value="Shipped">Shipped</SelectItem>
                                    <SelectItem value="Delivered">Delivered</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => setShowPOForm(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleAddPO}>Add Purchase Order</Button>
                          </div>
                        </div>
                      ) : (
                        <Button onClick={() => setShowPOForm(true)} className="w-full mt-4">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Purchase Order
                        </Button>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Permits & Approvals Section */}
                <Accordion type="single" collapsible className="border rounded-lg">
                  <AccordionItem value="permits" className="border-0">
                    <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 [&[data-state=open]]:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Permits & Approvals</span>
                        {permits.length > 0 && (
                          <Badge variant="outline" className="ml-2 bg-blue-50">
                            {permits.length}
                          </Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      {permits.length > 0 ? (
                        <div className="space-y-3 mb-4">
                          {permits.map((permit, index) => (
                            <div key={index} className="border rounded-lg p-3 bg-card">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium">{permit.id}</h4>
                                    <Badge
                                      className={cn(
                                        permit.status === "Approved"
                                          ? "bg-green-500"
                                          : permit.status === "Not Started"
                                            ? "bg-gray-500"
                                            : permit.status === "Rejected"
                                              ? "bg-red-500"
                                              : "bg-yellow-500",
                                      )}
                                    >
                                      {permit.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm mt-1">{permit.title}</p>
                                  <p className="text-xs text-muted-foreground">Authority: {permit.authority}</p>
                                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-3.5 w-3.5" />
                                      Filed: {permit.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3.5 w-3.5" />
                                      Expires: {permit.expiryDate}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <FileText className="h-4 w-4 mr-1" />
                                    Edit
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground py-6">
                          <FileCheck className="h-12 w-12 mx-auto mb-3 opacity-20" />
                          <p>No permits or approvals added yet</p>
                          <p className="text-sm">Add permits to track required approvals</p>
                        </div>
                      )}

                      {showPermitForm ? (
                        <div className="border rounded-lg p-4 mt-4">
                          <h3 className="text-sm font-medium mb-4">Add New Permit/Approval</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label htmlFor="permitTitle">Permit/Approval Title</Label>
                                <Input id="permitTitle" placeholder="Enter permit or approval title" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="permitAuthority">Issuing Authority</Label>
                                <Input id="permitAuthority" placeholder="Enter authority name" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="permitStatus">Status</Label>
                                <Select defaultValue="Not Started">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Not Started">Not Started</SelectItem>
                                    <SelectItem value="In Process">In Process</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Approved">Approved</SelectItem>
                                    <SelectItem value="Rejected">Rejected</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label htmlFor="permitDate">Filing Date</Label>
                                <Input id="permitDate" type="date" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="permitExpiry">Expiry Date (if applicable)</Label>
                                <Input id="permitExpiry" type="date" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="permitNotes">Notes</Label>
                                <Textarea
                                  id="permitNotes"
                                  placeholder="Enter any notes about this permit or approval"
                                  className="min-h-[80px]"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => setShowPermitForm(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleAddPermit}>Add Permit/Approval</Button>
                          </div>
                        </div>
                      ) : (
                        <Button onClick={() => setShowPermitForm(true)} className="w-full mt-4">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Permit/Approval
                        </Button>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Customer Requests Section */}
                <Accordion type="single" collapsible className="border rounded-lg">
                  <AccordionItem value="requests" className="border-0">
                    <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 [&[data-state=open]]:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <ClipboardList className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Customer Requests</span>
                        {customerRequests.length > 0 && (
                          <Badge variant="outline" className="ml-2 bg-blue-50">
                            {customerRequests.length}
                          </Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      {customerRequests.length > 0 ? (
                        <div className="space-y-3 mb-4">
                          {customerRequests.map((request, index) => (
                            <div key={index} className="border rounded-lg p-3 bg-card">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium">{request.id}</h4>
                                    <Badge
                                      className={cn(
                                        request.status === "Approved"
                                          ? "bg-green-500"
                                          : request.status === "Rejected"
                                            ? "bg-red-500"
                                            : request.status === "Completed"
                                              ? "bg-blue-500"
                                              : "bg-yellow-500",
                                      )}
                                    >
                                      {request.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm mt-1">{request.title}</p>
                                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-3.5 w-3.5" />
                                      {request.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <AlertTriangle className="h-3.5 w-3.5" />
                                      Priority: {request.priority}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <FileText className="h-4 w-4 mr-1" />
                                    Edit
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground py-6">
                          <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-20" />
                          <p>No customer requests added yet</p>
                          <p className="text-sm">Add customer requests to track additional requirements</p>
                        </div>
                      )}

                      {showRequestForm ? (
                        <div className="border rounded-lg p-4 mt-4">
                          <h3 className="text-sm font-medium mb-4">Add New Customer Request</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label htmlFor="requestTitle">Request Title</Label>
                                <Input id="requestTitle" placeholder="Enter request title" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="requestPriority">Priority</Label>
                                <Select defaultValue="Medium">
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
                                <Label htmlFor="requestStatus">Status</Label>
                                <Select defaultValue="Pending Review">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Pending Review">Pending Review</SelectItem>
                                    <SelectItem value="Approved">Approved</SelectItem>
                                    <SelectItem value="Rejected">Rejected</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label htmlFor="requestDate">Date</Label>
                                <Input id="requestDate" type="date" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="requestDescription">Description</Label>
                                <Textarea
                                  id="requestDescription"
                                  placeholder="Enter request description"
                                  className="min-h-[120px]"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={() => setShowRequestForm(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleAddRequest}>Add Request</Button>
                          </div>
                        </div>
                      ) : (
                        <Button onClick={() => setShowRequestForm(true)} className="w-full mt-4">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Customer Request
                        </Button>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Potential Blockers Summary */}
                {hasPotentialBlockers() && (
                  <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span>Potential Blockers</span>
                    </h3>
                    <div className="space-y-2">
                      {permits.length > 0 && (
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <p className="text-sm">
                            {permits.length} permit{permits.length > 1 ? "s" : ""} added that may require approval
                          </p>
                        </div>
                      )}
                      {purchaseOrders.length > 0 && (
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <p className="text-sm">
                            {purchaseOrders.length} purchase order{purchaseOrders.length > 1 ? "s" : ""} that may affect
                            timeline
                          </p>
                        </div>
                      )}
                      <div className="pt-2">
                        <p className="text-xs text-yellow-700">
                          These items may affect job progress. Make sure to track their status.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="work-orders" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Initial Work Orders</CardTitle>
              <CardDescription>Create initial work orders for this job</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-4">Create Work Order</h3>

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
                        <Label htmlFor="workOrderDescription">Description</Label>
                        <Textarea
                          id="workOrderDescription"
                          placeholder="Enter work order description"
                          className="min-h-[120px]"
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

                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-4">Work Orders to Create</h3>

                  <div className="text-center text-muted-foreground py-8">
                    <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No work orders added yet</p>
                    <p className="text-sm">Work orders will appear here after you add them</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-muted/20">
                  <div className="flex items-center gap-2">
                    <InfoIcon className="h-5 w-5 text-blue-500" />
                    <p className="text-sm">You can also create work orders after the job has been created.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
              <CardDescription>Enter financial details for this job</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Estimated Values</h3>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedValue">Total Job Value ($)</Label>
                    <Input id="estimatedValue" type="number" step="0.01" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedLaborHours">Estimated Labor Hours</Label>
                    <Input id="estimatedLaborHours" type="number" />
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
                    <Input id="estimatedMaterialsCost" type="number" step="0.01" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedOtherCosts">Estimated Other Costs ($)</Label>
                    <Input id="estimatedOtherCosts" type="number" step="0.01" />
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

