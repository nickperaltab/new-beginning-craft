"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  SlidersHorizontal,
  MoreHorizontal,
  Calendar,
  DollarSign,
  FileText,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Timer,
  AlertTriangle,
  CalendarClock,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MethodPayBanner } from "@/components/method-pay-banner"

// Invoice Summary Metrics Component
function InvoiceSummaryMetrics({ invoices }: { invoices: any[] }) {
  // Calculate metrics
  const overdueInvoices = invoices.filter(inv => inv.status === "overdue")
  const pendingInvoices = invoices.filter(inv => inv.status === "pending")
  // For upcoming, we'll use pending invoices but in a real app this would be based on due dates
  const upcomingInvoices = invoices.filter(inv => inv.status === "pending" || inv.status === "draft")

  // Calculate total amounts
  const overdueAmount = overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0)
  const outstandingAmount = pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0)
  const upcomingAmount = upcomingInvoices.reduce((sum, inv) => sum + inv.amount, 0)

  // For average time to get paid, we'd normally calculate this from actual data
  // For this example, we'll use a mock value
  const avgDaysToPay = 3

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      {/* Overdue Invoices */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Overdue</p>
              <span className="text-sm font-medium">{overdueInvoices.length}</span>
            </div>
            <p className="text-2xl font-bold text-red-600">$20,000.76</p>
          </div>
        </CardContent>
      </Card>

      {/* Outstanding Invoices */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Outstanding</p>
              <span className="text-sm font-medium">{pendingInvoices.length}</span>
            </div>
            <p className="text-2xl font-bold">$325,465.12</p>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Invoices */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
              <span className="text-sm font-medium">24</span>
            </div>
            <p className="text-2xl font-bold">$325,465.12</p>
          </div>
        </CardContent>
      </Card>

      {/* Average Time to Get Paid */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Average time to get paid</p>
            </div>
            <p className="text-2xl font-bold">3 days</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Mock invoices data
  const invoices = [
    {
      id: "INV-2023-001",
      customer: "Acme Corp",
      jobId: "JOB-2023-0045",
      amount: 12500.00,
      status: "paid",
      dueDate: "2023-04-15",
      issuedDate: "2023-03-15",
      paidDate: "2023-04-10",
      description: "HVAC System Overhaul - Phase 1",
      paymentMethod: "Bank Transfer",
      notes: "Payment received ahead of schedule",
    },
    {
      id: "INV-2023-002",
      customer: "TechSolutions Inc",
      jobId: "JOB-2023-0046",
      amount: 8750.00,
      status: "pending",
      dueDate: "2023-04-30",
      issuedDate: "2023-03-30",
      description: "Electrical System Upgrade",
      notes: "Awaiting client approval",
    },
    {
      id: "INV-2023-003",
      customer: "City Hospital",
      jobId: "JOB-2023-0047",
      amount: 15000.00,
      status: "overdue",
      dueDate: "2023-03-30",
      issuedDate: "2023-03-01",
      description: "Emergency Generator Maintenance",
      notes: "Second reminder sent",
    },
    {
      id: "INV-2023-004",
      customer: "Riverside Apartments",
      jobId: "JOB-2023-0048",
      amount: 5200.00,
      status: "draft",
      issuedDate: "2023-04-01",
      description: "Plumbing Repairs - Multiple Units",
      notes: "Pending final inspection",
    },
  ]

  // Filter invoices based on search query and status
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedStatus === "all" || invoice.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "overdue":
        return <Badge className="bg-red-500">Overdue</Badge>
      case "draft":
        return <Badge className="bg-gray-500">Draft</Badge>
      default:
        return null
    }
  }

  // Render invoice list
  const renderInvoiceList = (invoices: typeof filteredInvoices) => {
    return (
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 text-sm font-medium">Invoice #</th>
              <th className="text-left p-3 text-sm font-medium">Customer</th>
              <th className="text-left p-3 text-sm font-medium">Amount</th>
              <th className="text-left p-3 text-sm font-medium">Status</th>
              <th className="text-left p-3 text-sm font-medium hidden md:table-cell">Due Date</th>
              <th className="text-left p-3 text-sm font-medium hidden lg:table-cell">Job</th>
              <th className="text-right p-3 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t hover:bg-muted/20">
                <td className="p-3">
                  <div className="font-medium">{invoice.id}</div>
                  <div className="text-xs text-muted-foreground">Issued: {invoice.issuedDate}</div>
                </td>
                <td className="p-3">
                  <div className="font-medium">{invoice.customer}</div>
                  <div className="text-xs text-muted-foreground">{invoice.description}</div>
                </td>
                <td className="p-3">
                  <div className="font-medium">${invoice.amount.toLocaleString()}</div>
                </td>
                <td className="p-3">{getStatusBadge(invoice.status)}</td>
                <td className="p-3 hidden md:table-cell">
                  {invoice.dueDate ? (
                    <div className="text-sm">{invoice.dueDate}</div>
                  ) : (
                    <div className="text-sm text-muted-foreground">Not set</div>
                  )}
                </td>
                <td className="p-3 hidden lg:table-cell">
                  <Link href={`/jobs/${invoice.jobId}`} className="text-sm text-blue-500 hover:underline">
                    {invoice.jobId}
                  </Link>
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/invoices/${invoice.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <DollarSign className="h-4 w-4 mr-2" />
                          Record Payment
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Clock className="h-4 w-4 mr-2" />
                          Send Reminder
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <p className="text-muted-foreground">Manage and track all invoices</p>
      </div>

      {/* Method Pay Banner */}
      <MethodPayBanner />

      {/* Invoice Summary Metrics */}
      <InvoiceSummaryMetrics invoices={invoices} />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search invoices..."
              className="w-full pl-8 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href="/invoices/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Invoices</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Invoices</CardTitle>
              <CardDescription>Showing {filteredInvoices.length} invoices</CardDescription>
            </CardHeader>
            <CardContent>{renderInvoiceList(filteredInvoices)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="draft" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Draft Invoices</CardTitle>
              <CardDescription>
                Showing {filteredInvoices.filter((i) => i.status === "draft").length} invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderInvoiceList(filteredInvoices.filter((invoice) => invoice.status === "draft"))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pending Invoices</CardTitle>
              <CardDescription>
                Showing {filteredInvoices.filter((i) => i.status === "pending").length} invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderInvoiceList(filteredInvoices.filter((invoice) => invoice.status === "pending"))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paid" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Paid Invoices</CardTitle>
              <CardDescription>
                Showing {filteredInvoices.filter((i) => i.status === "paid").length} invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderInvoiceList(filteredInvoices.filter((invoice) => invoice.status === "paid"))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Overdue Invoices</CardTitle>
              <CardDescription>
                Showing {filteredInvoices.filter((i) => i.status === "overdue").length} invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderInvoiceList(filteredInvoices.filter((invoice) => invoice.status === "overdue"))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}