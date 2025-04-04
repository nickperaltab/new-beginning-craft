"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  FileText,
  MoreHorizontal,
  Plus,
  User,
  Package,
  TrendingUp,
  TrendingDown,
  Clipboard,
  CalendarDays,
  Users,
  Boxes,
  DollarSign,
  FileBox,
  ExternalLink,
  Download,
  FileSpreadsheet,
  Settings,
  ShoppingCart,
  FileCheck,
  Receipt,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { EstimateViewDialog } from "@/components/estimate-view-dialog"
import { JobProgressTracker } from "@/components/job-progress-tracker"

export default function JobDetailPage({ params }: { params: { id: string } }) {
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
    workOrders: [
      {
        id: "WO-2023-1234",
        title: "Initial Assessment",
        type: "HVAC Inspection",
        status: "Completed",
        date: "Mar 15, 2023",
        technician: "John Smith",
        hours: 4,
        materials: 0,
        materialsCost: 0,
        notes: "Completed initial assessment of all HVAC units. Found several issues that need addressing.",
        completedOn: "Mar 15, 2023",
      },
      {
        id: "WO-2023-1235",
        title: "Replace Main Units",
        type: "HVAC Replacement",
        status: "In Progress",
        date: "Mar 19, 2023",
        technician: "Mike Davis, Sarah Johnson",
        hours: 12,
        materials: 8,
        materialsCost: 950.75,
        notes: "Replacing two main HVAC units on the roof. Additional ductwork repairs needed.",
      },
      {
        id: "WO-2023-1236",
        title: "Control System Installation",
        type: "HVAC Controls",
        status: "Scheduled",
        date: "Mar 25, 2023",
        technician: "Sarah Johnson",
        hours: 8,
        materials: 4,
        materialsCost: 300.0,
        notes: "Installation of new digital control system with zone control capabilities.",
      },
    ],
    team: [
      { name: "Lisa Wong", role: "Project Manager", initials: "LW" },
      { name: "John Smith", role: "Lead Technician", initials: "JS" },
      { name: "Mike Davis", role: "HVAC Technician", initials: "MD" },
      { name: "Sarah Johnson", role: "Controls Specialist", initials: "SJ" },
    ],
    materials: [
      { name: "HVAC Unit - 5 Ton", quantity: 2, unit: "ea", cost: 3200.0, workOrder: "WO-2023-1235" },
      { name: "Digital Thermostat", quantity: 5, unit: "ea", cost: 125.0, workOrder: "WO-2023-1236" },
      { name: "Control Panel", quantity: 1, unit: "ea", cost: 450.0, workOrder: "WO-2023-1236" },
      { name: "Refrigerant R-410A", quantity: 10, unit: "lbs", cost: 45.0, workOrder: "WO-2023-1235" },
      { name: "Copper Tubing", quantity: 50, unit: "ft", cost: 3.75, workOrder: "WO-2023-1235" },
      { name: "Duct Material", quantity: 100, unit: "sq ft", cost: 2.25, workOrder: "WO-2023-1235" },
    ],
    financials: {
      estimatedValue: 12500.0,
      laborCost: 2400.0,
      materialsCost: 5750.0,
      otherCosts: 750.0,
      totalCosts: 8900.0,
      invoiced: 4500.0,
      paid: 4500.0,
      outstanding: 0.0,
      profitMargin: 28.8, // percentage
      trending: "up", // up or down
    },
    notes: [
      {
        id: "note1",
        author: "Lisa Wong",
        authorInitials: "LW",
        date: "Mar 14, 2023",
        time: "09:15 AM",
        content:
          "Kickoff meeting with customer completed. They emphasized the need for minimal disruption to office operations during installation.",
        attachments: [{ name: "meeting_notes.pdf", size: "1.2 MB" }],
      },
      {
        id: "note2",
        author: "John Smith",
        authorInitials: "JS",
        date: "Mar 15, 2023",
        time: "04:30 PM",
        content:
          "Initial assessment complete. Found additional issues with the ductwork that weren't in the original scope. Will need to discuss with the customer.",
        attachments: [{ name: "assessment_photos.zip", size: "8.5 MB" }],
      },
      {
        id: "note3",
        author: "Mike Davis",
        authorInitials: "MD",
        date: "Mar 19, 2023",
        time: "02:45 PM",
        content:
          "Started replacement of main units. Customer approved the additional ductwork repairs. Will require extra materials.",
        attachments: [],
      },
    ],
    // Added for progress tracker
    lifecycle: {
      currentStage: 3, // Work Order created (adjusted for fewer stages)
      hasPurchaseOrders: true,
      hasPermits: true,
      estimateStatus: "Approved",
      workOrderStatus: "In Progress",
    },
    visits: [
      {
        id: "VISIT-2023-001",
        type: "Quote Visit",
        date: "Mar 12, 2023",
        time: "10:00 AM - 12:00 PM",
        technician: "John Smith",
        status: "Completed",
        notes: "Completed site survey and estimate for HVAC replacement.",
      },
      {
        id: "VISIT-2023-002",
        type: "Work Order Visit",
        date: "Mar 15, 2023",
        time: "09:00 AM - 01:00 PM",
        technician: "John Smith",
        status: "Completed",
        notes: "Initial assessment of all HVAC units.",
      },
      {
        id: "VISIT-2023-003",
        type: "Work Order Visit",
        date: "Mar 19, 2023",
        time: "08:00 AM - 05:00 PM",
        technician: "Mike Davis, Sarah Johnson",
        status: "Completed",
        notes: "Day 1 of HVAC unit replacement.",
      },
      {
        id: "VISIT-2023-004",
        type: "Work Order Visit",
        date: "Mar 20, 2023",
        time: "08:00 AM - 05:00 PM",
        technician: "Mike Davis",
        status: "In Progress",
        notes: "Day 2 of HVAC unit replacement.",
      },
      {
        id: "VISIT-2023-005",
        type: "Work Order Visit",
        date: "Mar 25, 2023",
        time: "09:00 AM - 05:00 PM",
        technician: "Sarah Johnson",
        status: "Scheduled",
        notes: "Control system installation.",
      },
    ],
    purchaseOrders: [
      {
        id: "PO-2023-001",
        title: "HVAC Units",
        supplier: "HVAC Wholesale Inc.",
        status: "Received",
        date: "Mar 16, 2023",
        amount: 3450.0,
      },
      {
        id: "PO-2023-002",
        title: "Control System Components",
        supplier: "Digital Controls Co.",
        status: "Ordered",
        date: "Mar 18, 2023",
        amount: 750.0,
      },
    ],
    permits: [
      {
        id: "PERMIT-2023-001",
        title: "HVAC Installation Permit",
        authority: "City Building Department",
        status: "Approved",
        date: "Mar 17, 2023",
        expiryDate: "Sep 17, 2023",
      },
    ],
    invoices: [
      {
        id: "INV-2023-001",
        title: "Initial Assessment",
        status: "Paid",
        date: "Mar 16, 2023",
        amount: 450.0,
      },
      {
        id: "INV-2023-002",
        title: "HVAC Units (50% Deposit)",
        status: "Paid",
        date: "Mar 18, 2023",
        amount: 4050.0,
      },
      {
        id: "INV-2023-003",
        title: "Labor and Materials (Progress Payment)",
        status: "Pending",
        date: "Mar 25, 2023",
        amount: 3500.0,
      },
    ],
  }

  // State management
  const [showScheduleVisitDialog, setShowScheduleVisitDialog] = useState(false)
  const [selectedEstimate, setSelectedEstimate] = useState<{ id: string; title: string } | null>(null)
  const [showConvertDialog, setShowConvertDialog] = useState(false)
  const [showEstimateViewDialog, setShowEstimateViewDialog] = useState(false)
  const [selectedViewEstimate, setSelectedViewEstimate] = useState<{
    id: string
    title: string
    status: string
    date: string
    amount: number
  } | null>(null)
  const [activeTab, setActiveTab] = useState("work-orders")
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)

  // Toggle states for optional stages
  const [enablePurchaseOrder, setEnablePurchaseOrder] = useState(true)
  const [enablePermits, setEnablePermits] = useState(false)
  const [enableQuoteVisit, setEnableQuoteVisit] = useState(false)

  // Event handlers
  const handleScheduleVisitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const estimateId = e.currentTarget.getAttribute("data-estimate-id")
    const estimateTitle = e.currentTarget.getAttribute("data-estimate-title")
    if (estimateId && estimateTitle) {
      setSelectedEstimate({ id: estimateId, title: estimateTitle })
      setShowScheduleVisitDialog(true)
    }
  }

  const handleViewEstimateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const estimateId = e.currentTarget.getAttribute("data-estimate-id")
    const estimateTitle = e.currentTarget.getAttribute("data-estimate-title")
    const estimateStatus = e.currentTarget.getAttribute("data-estimate-status")
    const estimateDate = e.currentTarget.getAttribute("data-estimate-date")
    const estimateAmount = e.currentTarget.getAttribute("data-estimate-amount")

    if (estimateId && estimateTitle && estimateStatus && estimateDate && estimateAmount) {
      setSelectedViewEstimate({
        id: estimateId,
        title: estimateTitle,
        status: estimateStatus,
        date: estimateDate,
        amount: Number.parseFloat(estimateAmount),
      })
      setShowEstimateViewDialog(true)
    }
  }

  // Calculate totals
  const totalHours = job.workOrders.reduce((sum, wo) => sum + wo.hours, 0)
  const completedHours = job.workOrders.filter((wo) => wo.status === "Completed").reduce((sum, wo) => sum + wo.hours, 0)
  const totalMaterialsCost = job.workOrders.reduce((sum, wo) => sum + wo.materialsCost, 0)

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 bg-gray-50">
      {/* Improved Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/jobs">
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Job {job.id}</h1>
              <Badge
                className={cn(
                  "ml-1",
                  job.status === "Completed" && "bg-green-500",
                  job.status === "In Progress" && "bg-blue-500",
                  job.status === "Scheduled" && "bg-yellow-500",
                  job.status === "Estimating" && "bg-purple-500",
                )}
              >
                {job.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {job.type} - {job.customer}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1" onClick={() => setShowSettingsDialog(true)}>
            <Settings className="h-3.5 w-3.5" />
            Job Settings
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
          <Link href={`/jobs/${job.id}/edit`}>
            <Button size="sm" className="gap-1">
              <Edit className="h-3.5 w-3.5" />
              Edit Job
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Job Details and Lifecycle */}
        <div className="lg:col-span-2 space-y-4">
          {/* Job Overview Card */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground mb-2">{job.description}</p>
                </div>

                {/* Job Lifecycle with Tooltips */}
                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-3">Job Lifecycle</h3>
                  <TooltipProvider>
                    <div className="relative">
                      <JobProgressTracker
                        currentStage={job.lifecycle.currentStage}
                        enablePurchaseOrder={enablePurchaseOrder}
                        enablePermits={enablePermits}
                        enableQuoteVisit={enableQuoteVisit}
                        jobData={{
                          hasPurchaseOrders: job.lifecycle.hasPurchaseOrders,
                          hasPermits: job.lifecycle.hasPermits,
                          estimateStatus: job.lifecycle.estimateStatus,
                          workOrderStatus: job.lifecycle.workOrderStatus,
                        }}
                      />
                    </div>
                  </TooltipProvider>
                </div>

                <Separator className="my-4" />

                {/* Metrics with Visual Indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-white p-3 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs font-medium text-muted-foreground flex items-center">
                        <Clipboard className="h-3.5 w-3.5 mr-1" />
                        Work Orders
                      </p>
                      <div className="h-5 w-5 rounded-full bg-blue-50 flex items-center justify-center">
                        <span className="text-xs text-blue-600 font-medium">
                          {Math.round(
                            (job.workOrders.filter((wo) => wo.status === "Completed").length / job.workOrders.length) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-semibold">
                        {job.workOrders.filter((wo) => wo.status === "Completed").length}/{job.workOrders.length}
                      </p>
                      <div className="flex items-center text-xs text-green-600">
                        <TrendingUp className="h-3.5 w-3.5 mr-1" />
                        <span>On track</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs font-medium text-muted-foreground flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        Labor Hours
                      </p>
                      <div className="h-5 w-5 rounded-full bg-blue-50 flex items-center justify-center">
                        <span className="text-xs text-blue-600 font-medium">
                          {Math.round((completedHours / totalHours) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-semibold">
                        {completedHours}/{totalHours}
                      </p>
                      <div className="flex items-center text-xs text-yellow-600">
                        <TrendingDown className="h-3.5 w-3.5 mr-1" />
                        <span>+2 hrs</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs font-medium text-muted-foreground flex items-center">
                        <Package className="h-3.5 w-3.5 mr-1" />
                        Materials
                      </p>
                      <Badge variant="outline" className="text-xs h-5 px-1.5 bg-gray-50">
                        {job.materials.length} items
                      </Badge>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-semibold">${totalMaterialsCost.toFixed(0)}</p>
                      <div className="flex items-center text-xs text-green-600">
                        <TrendingUp className="h-3.5 w-3.5 mr-1" />
                        <span>Under budget</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs font-medium text-muted-foreground flex items-center">
                        <Users className="h-3.5 w-3.5 mr-1" />
                        Team Members
                      </p>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="flex -space-x-2">
                        {job.team.slice(0, 3).map((member, i) => (
                          <div
                            key={i}
                            className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-medium border-2 border-white"
                          >
                            {member.initials}
                          </div>
                        ))}
                        {job.team.length > 3 && (
                          <div className="h-6 w-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-medium border-2 border-white">
                            +{job.team.length - 3}
                          </div>
                        )}
                      </div>
                      <p className="text-2xl font-semibold">{job.team.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Tabs based on enabled features */}
          <Tabs defaultValue="work-orders" className="w-full" onValueChange={setActiveTab}>
            <TabsList
              className={`grid ${enablePurchaseOrder && enablePermits && enableQuoteVisit ? "grid-cols-8" : enablePurchaseOrder && enablePermits ? "grid-cols-7" : enablePurchaseOrder && enableQuoteVisit ? "grid-cols-7" : enablePermits && enableQuoteVisit ? "grid-cols-7" : enablePurchaseOrder || enablePermits || enableQuoteVisit ? "grid-cols-6" : "grid-cols-5"} h-auto p-0 bg-white rounded-lg shadow-sm`}
            >
              <TabsTrigger
                value="job-requests"
                className="flex items-center gap-1.5 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600"
              >
                <FileText className="h-4 w-4" />
                <span>Job Requests</span>
              </TabsTrigger>

              {enableQuoteVisit && (
                <TabsTrigger
                  value="quote-visits"
                  className="flex items-center gap-1.5 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600"
                >
                  <CalendarDays className="h-4 w-4" />
                  <span>Quote Visits</span>
                </TabsTrigger>
              )}

              <TabsTrigger
                value="estimates"
                className="flex items-center gap-1.5 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600"
              >
                <FileSpreadsheet className="h-4 w-4" />
                <span>Estimates</span>
              </TabsTrigger>

              <TabsTrigger
                value="work-orders"
                className="flex items-center gap-1.5 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600"
              >
                <Clipboard className="h-4 w-4" />
                <span>Work Orders</span>
              </TabsTrigger>

              {enablePurchaseOrder && (
                <TabsTrigger
                  value="purchase-orders"
                  className="flex items-center gap-1.5 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Purchase Orders</span>
                </TabsTrigger>
              )}

              {enablePermits && (
                <TabsTrigger
                  value="permits"
                  className="flex items-center gap-1.5 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600"
                >
                  <FileCheck className="h-4 w-4" />
                  <span>Permits</span>
                </TabsTrigger>
              )}

              <TabsTrigger
                value="invoices"
                className="flex items-center gap-1.5 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600"
              >
                <Receipt className="h-4 w-4" />
                <span>Invoices</span>
              </TabsTrigger>

              <TabsTrigger
                value="inventory"
                className="flex items-center gap-1.5 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600"
              >
                <Boxes className="h-4 w-4" />
                <span>Inventory</span>
              </TabsTrigger>

              <TabsTrigger
                value="documents"
                className="flex items-center gap-1.5 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600"
              >
                <FileBox className="h-4 w-4" />
                <span>Documents</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <TabsContent value="job-requests" className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-medium">Job Requests</h2>
                  <p className="text-sm text-muted-foreground">Manage job requests for this job</p>
                </div>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  Create Job Request
                </Button>
              </div>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center h-40">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">Job Requests</h3>
                      <p className="text-muted-foreground">This tab content is simplified for the demo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {enableQuoteVisit && (
              <TabsContent value="quote-visits" className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-medium">Quote Visits</h2>
                    <p className="text-sm text-muted-foreground">Manage quote visits for this job</p>
                  </div>
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    Schedule Quote Visit
                  </Button>
                </div>
                <div className="space-y-3">
                  {job.visits
                    .filter((visit) => visit.type === "Quote Visit")
                    .map((visit) => (
                      <Card
                        key={visit.id}
                        className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            {/* Status Indicator */}
                            <div
                              className={cn(
                                "w-full md:w-1.5 h-1.5 md:h-auto",
                                visit.status === "Completed" && "bg-green-500",
                                visit.status === "In Progress" && "bg-blue-500",
                                visit.status === "Scheduled" && "bg-yellow-500",
                                visit.status === "Pending" && "bg-gray-300",
                              )}
                            />

                            <div className="flex flex-col md:flex-row flex-grow p-4 gap-4">
                              {/* Visit Details */}
                              <div className="flex-grow space-y-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{visit.id}</h3>
                                  <Badge
                                    className={cn(
                                      "ml-2",
                                      visit.status === "Completed" && "bg-green-500",
                                      visit.status === "In Progress" && "bg-blue-500",
                                      visit.status === "Scheduled" && "bg-yellow-500",
                                      visit.status === "Pending" && "bg-gray-300",
                                    )}
                                  >
                                    {visit.status}
                                  </Badge>
                                </div>
                                <p className="text-sm font-medium">{visit.type}</p>
                                <p className="text-sm text-muted-foreground">{visit.notes}</p>

                                <div className="flex flex-wrap gap-4 pt-2">
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-50 px-2 py-1 rounded-md">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {visit.date}
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-50 px-2 py-1 rounded-md">
                                    <Clock className="h-3.5 w-3.5" />
                                    {visit.time}
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-50 px-2 py-1 rounded-md">
                                    <User className="h-3.5 w-3.5" />
                                    {visit.technician}
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex md:flex-col gap-2 self-end md:self-center justify-end md:min-w-[100px]">
                                <Button variant="outline" size="sm" className="w-full gap-1">
                                  <FileText className="h-3.5 w-3.5" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm" className="w-full gap-1">
                                  <Edit className="h-3.5 w-3.5" />
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            )}

            <TabsContent value="estimates" className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-medium">Estimates</h2>
                  <p className="text-sm text-muted-foreground">Manage estimates for this job</p>
                </div>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  Create Estimate
                </Button>
              </div>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center h-40">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">Estimates</h3>
                      <p className="text-muted-foreground">This tab content is simplified for the demo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="work-orders" className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-medium">Work Orders</h2>
                  <p className="text-sm text-muted-foreground">Manage work orders for this job</p>
                </div>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  Create Work Order
                </Button>
              </div>

              {/* Improved Work Order Cards */}
              <div className="space-y-3">
                {job.workOrders.map((workOrder) => (
                  <Card
                    key={workOrder.id}
                    className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Status Indicator */}
                        <div
                          className={cn(
                            "w-full md:w-1.5 h-1.5 md:h-auto",
                            workOrder.status === "Completed" && "bg-green-500",
                            workOrder.status === "In Progress" && "bg-blue-500",
                            workOrder.status === "Scheduled" && "bg-yellow-500",
                            workOrder.status === "Pending" && "bg-gray-300",
                          )}
                        />

                        <div className="flex flex-col md:flex-row flex-grow p-4 gap-4">
                          {/* Work Order Details */}
                          <div className="flex-grow space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{workOrder.id}</h3>
                              <Badge
                                className={cn(
                                  "ml-2",
                                  workOrder.status === "Completed" && "bg-green-500",
                                  workOrder.status === "In Progress" && "bg-blue-500",
                                  workOrder.status === "Scheduled" && "bg-yellow-500",
                                  workOrder.status === "Pending" && "bg-gray-300",
                                )}
                              >
                                {workOrder.status}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium">{workOrder.title}</p>
                            <p className="text-sm text-muted-foreground">{workOrder.notes}</p>

                            <div className="flex flex-wrap gap-4 pt-2">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-50 px-2 py-1 rounded-md">
                                <Calendar className="h-3.5 w-3.5" />
                                {workOrder.date}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-50 px-2 py-1 rounded-md">
                                <Clock className="h-3.5 w-3.5" />
                                {workOrder.hours} hours
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-50 px-2 py-1 rounded-md">
                                <User className="h-3.5 w-3.5" />
                                {workOrder.technician}
                              </div>
                              {workOrder.materials > 0 && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-50 px-2 py-1 rounded-md">
                                  <Package className="h-3.5 w-3.5" />
                                  {workOrder.materials} items (${workOrder.materialsCost.toFixed(2)})
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex md:flex-col gap-2 self-end md:self-center justify-end md:min-w-[100px]">
                            <Link href={`/work-orders/${workOrder.id}`}>
                              <Button variant="outline" size="sm" className="w-full gap-1">
                                <FileText className="h-3.5 w-3.5" />
                                View
                              </Button>
                            </Link>
                            <Link href={`/work-orders/${workOrder.id}/edit`}>
                              <Button variant="outline" size="sm" className="w-full gap-1">
                                <Edit className="h-3.5 w-3.5" />
                                Edit
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {enablePurchaseOrder && (
              <TabsContent value="purchase-orders" className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-medium">Purchase Orders</h2>
                    <p className="text-sm text-muted-foreground">Manage purchase orders for this job</p>
                  </div>
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    Create Purchase Order
                  </Button>
                </div>
                <div className="space-y-3">
                  {job.purchaseOrders.map((po) => (
                    <Card key={po.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Status Indicator */}
                          <div
                            className={cn(
                              "w-full md:w-1.5 h-1.5 md:h-auto",
                              po.status === "Received" && "bg-green-500",
                              po.status === "Ordered" && "bg-blue-500",
                              po.status === "Pending" && "bg-yellow-500",
                              po.status === "Cancelled" && "bg-red-500",
                            )}
                          />

                          <div className="flex flex-col md:flex-row flex-grow p-4 gap-4">
                            {/* PO Details */}
                            <div className="flex-grow space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{po.id}</h3>
                                <Badge
                                  className={cn(
                                    "ml-2",
                                    po.status === "Received" && "bg-green-500",
                                    po.status === "Ordered" && "bg-blue-500",
                                    po.status === "Pending" && "bg-yellow-500",
                                    po.status === "Cancelled" && "bg-red-500",
                                  )}
                                >
                                  {po.status}
                                </Badge>
                              </div>
                              <p className="text-sm font-medium">{po.title}</p>
                              <p className="text-sm text-muted-foreground">Supplier: {po.supplier}</p>

                              <div className="flex flex-wrap gap-4 pt-2">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-50 px-2 py-1 rounded-md">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {po.date}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-50 px-2 py-1 rounded-md">
                                  <DollarSign className="h-3.5 w-3.5" />${po.amount.toFixed(2)}
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex md:flex-col gap-2 self-end md:self-center justify-end md:min-w-[100px]">
                              <Button variant="outline" size="sm" className="w-full gap-1">
                                <FileText className="h-3.5 w-3.5" />
                                View
                              </Button>
                              <Button variant="outline" size="sm" className="w-full gap-1">
                                <Edit className="h-3.5 w-3.5" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            )}

            {enablePermits && (
              <TabsContent value="permits" className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-medium">Permits</h2>
                    <p className="text-sm text-muted-foreground">Manage permits for this job</p>
                  </div>
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    Add Permit
                  </Button>
                </div>
                <div className="space-y-3">
                  {job.permits.map((permit) => (
                    <Card
                      key={permit.id}
                      className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {/* Status Indicator */}
                          <div
                            className={cn(
                              "w-full md:w-1.5 h-1.5 md:h-auto",
                              permit.status === "Approved" && "bg-green-500",
                              permit.status === "Pending" && "bg-yellow-500",
                              permit.status === "Rejected" && "bg-red-500",
                            )}
                          />

                          <div className="flex flex-col md:flex-row flex-grow p-4 gap-4">
                            {/* Permit Details */}
                            <div className="flex-grow space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{permit.id}</h3>
                                <Badge
                                  className={cn(
                                    "ml-2",
                                    permit.status === "Approved" && "bg-green-500",
                                    permit.status === "Pending" && "bg-yellow-500",
                                    permit.status === "Rejected" && "bg-red-500",
                                  )}
                                >
                                  {permit.status}
                                </Badge>
                              </div>
                              <p className="text-sm font-medium">{permit.title}</p>
                              <p className="text-sm text-muted-foreground">Authority: {permit.authority}</p>

                              <div className="flex flex-wrap gap-4 pt-2">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-50 px-2 py-1 rounded-md">
                                  <Calendar className="h-3.5 w-3.5" />
                                  Issued: {permit.date}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-50 px-2 py-1 rounded-md">
                                  <Calendar className="h-3.5 w-3.5" />
                                  Expires: {permit.expiryDate}
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex md:flex-col gap-2 self-end md:self-center justify-end md:min-w-[100px]">
                              <Button variant="outline" size="sm" className="w-full gap-1">
                                <FileText className="h-3.5 w-3.5" />
                                View
                              </Button>
                              <Button variant="outline" size="sm" className="w-full gap-1">
                                <Edit className="h-3.5 w-3.5" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            )}

            <TabsContent value="invoices" className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-medium">Invoices</h2>
                  <p className="text-sm text-muted-foreground">Manage invoices for this job</p>
                </div>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  Create Invoice
                </Button>
              </div>
              <div className="space-y-3">
                {job.invoices.map((invoice) => (
                  <Card
                    key={invoice.id}
                    className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Status Indicator */}
                        <div
                          className={cn(
                            "w-full md:w-1.5 h-1.5 md:h-auto",
                            invoice.status === "Paid" && "bg-green-500",
                            invoice.status === "Pending" && "bg-yellow-500",
                            invoice.status === "Overdue" && "bg-red-500",
                          )}
                        />

                        <div className="flex flex-col md:flex-row flex-grow p-4 gap-4">
                          {/* Invoice Details */}
                          <div className="flex-grow space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{invoice.id}</h3>
                              <Badge
                                className={cn(
                                  "ml-2",
                                  invoice.status === "Paid" && "bg-green-500",
                                  invoice.status === "Pending" && "bg-yellow-500",
                                  invoice.status === "Overdue" && "bg-red-500",
                                )}
                              >
                                {invoice.status}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium">{invoice.title}</p>

                            <div className="flex flex-wrap gap-4 pt-2">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-50 px-2 py-1 rounded-md">
                                <Calendar className="h-3.5 w-3.5" />
                                {invoice.date}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-gray-50 px-2 py-1 rounded-md">
                                <DollarSign className="h-3.5 w-3.5" />${invoice.amount.toFixed(2)}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex md:flex-col gap-2 self-end md:self-center justify-end md:min-w-[100px]">
                            <Button variant="outline" size="sm" className="w-full gap-1">
                              <FileText className="h-3.5 w-3.5" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="w-full gap-1">
                              <Edit className="h-3.5 w-3.5" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-medium">Inventory</h2>
                  <p className="text-sm text-muted-foreground">Manage inventory for this job</p>
                </div>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  Add Item
                </Button>
              </div>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center h-40">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">Inventory</h3>
                      <p className="text-muted-foreground">This tab content is simplified for the demo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-medium">Additional Documents</h2>
                  <p className="text-sm text-muted-foreground">Manage documents for this job</p>
                </div>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  Upload Document
                </Button>
              </div>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center h-40">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">Documents</h3>
                      <p className="text-muted-foreground">This tab content is simplified for the demo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Job Details Sidebar */}
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Job Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Status and Priority */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge
                      className={cn(
                        job.status === "Completed" && "bg-green-500",
                        job.status === "In Progress" && "bg-blue-500",
                        job.status === "Scheduled" && "bg-yellow-500",
                        job.status === "Estimating" && "bg-purple-500",
                      )}
                    >
                      {job.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Priority</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        job.priority === "High" && "border-red-500 text-red-500",
                        job.priority === "Medium" && "border-yellow-500 text-yellow-500",
                        job.priority === "Low" && "border-green-500 text-green-500",
                      )}
                    >
                      {job.priority}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Dates */}
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-muted-foreground">TIMELINE</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="text-sm font-medium">{job.createdDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Start Date</span>
                    <span className="text-sm font-medium">{job.startDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Est. Completion</span>
                    <span className="text-sm font-medium">{job.estimatedCompletion}</span>
                  </div>
                </div>

                <Separator />

                {/* Team */}
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-muted-foreground">TEAM</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Project Manager</span>
                    <span className="text-sm font-medium">{job.projectManager}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Team Size</span>
                    <span className="text-sm font-medium">{job.team.length} members</span>
                  </div>
                </div>

                <Separator />

                {/* Financials */}
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-muted-foreground">FINANCIALS</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Estimated Value</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">${job.financials.estimatedValue.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Current Costs</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">${job.financials.totalCosts.toFixed(2)}</span>
                      {job.financials.trending === "up" ? (
                        <TrendingUp className="h-3.5 w-3.5 ml-1 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5 ml-1 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Profit Margin</span>
                    <span className="text-sm font-medium">{job.financials.profitMargin}%</span>
                  </div>
                </div>

                <Separator />

                {/* Customer */}
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-muted-foreground">CUSTOMER</h3>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{job.customer}</p>
                    <p className="text-sm text-muted-foreground">{job.customerContact}</p>
                    <p className="text-sm text-muted-foreground">{job.customerPhone}</p>
                    <p className="text-sm text-muted-foreground">{job.customerEmail}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2 gap-1">
                    <ExternalLink className="h-3.5 w-3.5" />
                    View Customer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <Plus className="h-4 w-4" />
                  Create Work Order
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <Receipt className="h-4 w-4" />
                  Create Invoice
                </Button>
                {enablePurchaseOrder && (
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Create Purchase Order
                  </Button>
                )}
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <FileBox className="h-4 w-4" />
                  Upload Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Job Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Job Settings</DialogTitle>
            <DialogDescription>Configure job lifecycle and features</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h3 className="text-sm font-medium mb-3">Job Lifecycle Stages</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="purchase-order">Purchase Order</Label>
                  <p className="text-xs text-muted-foreground">Enable purchase order stage in job lifecycle</p>
                </div>
                <Switch id="purchase-order" checked={enablePurchaseOrder} onCheckedChange={setEnablePurchaseOrder} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="permits">Permits</Label>
                  <p className="text-xs text-muted-foreground">Enable permits stage in job lifecycle</p>
                </div>
                <Switch id="permits" checked={enablePermits} onCheckedChange={setEnablePermits} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="quote-visit">Quote Visit</Label>
                  <p className="text-xs text-muted-foreground">Enable quote visit stage in job lifecycle</p>
                </div>
                <Switch id="quote-visit" checked={enableQuoteVisit} onCheckedChange={setEnableQuoteVisit} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettingsDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowSettingsDialog(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Other Dialogs */}
      <Dialog open={showScheduleVisitDialog} onOpenChange={setShowScheduleVisitDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule Estimate Visit</DialogTitle>
            <DialogDescription>Schedule a visit for estimate: {selectedEstimate?.title}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="estimate-id" className="text-right">
                Estimate
              </Label>
              <Input id="estimate-id" value={selectedEstimate?.id} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="visit-type" className="text-right">
                Visit Type
              </Label>
              <Select defaultValue="estimate">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select visit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="estimate">Estimate Visit</SelectItem>
                  <SelectItem value="survey">Site Survey</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="technician" className="text-right">
                Technician
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Assign technician" />
                </SelectTrigger>
                <SelectContent>
                  {job.team.map((member) => (
                    <SelectItem key={member.name} value={member.name}>
                      {member.name} - {member.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="visit-date" className="text-right">
                Date
              </Label>
              <Input id="visit-date" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="visit-time" className="text-right">
                Time
              </Label>
              <div className="col-span-3 flex gap-2 items-center">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Start time" />
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
                    <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
                <span>to</span>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="End time" />
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
                    <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="visit-notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="visit-notes"
                placeholder="Visit notes and instructions"
                className="col-span-3"
                defaultValue={`Estimate visit for ${selectedEstimate?.title}. Please bring necessary tools for assessment.`}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Notification</Label>
              <div className="col-span-3 flex items-center gap-2">
                <Checkbox id="send-notification" defaultChecked />
                <Label htmlFor="send-notification">Send notification to customer</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleVisitDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowScheduleVisitDialog(false)
                alert(`Visit scheduled for estimate ${selectedEstimate?.id}`)
              }}
            >
              Schedule Visit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Estimate View Dialog */}
      {selectedViewEstimate && (
        <EstimateViewDialog
          open={showEstimateViewDialog}
          onOpenChange={setShowEstimateViewDialog}
          estimate={selectedViewEstimate}
        />
      )}
    </div>
  )
}

