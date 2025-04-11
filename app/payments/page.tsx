"use client"

import { useState } from "react"
import { ExportPaymentsModal } from "@/components/export-payments-modal"
import { PaymentModal } from "@/components/payment-modal"
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
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Filter,
  ChevronDown,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [selectedDateRange, setSelectedDateRange] = useState("30days")
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  // Mock payment data
  const payments = [
    {
      id: "PAY-2023-001",
      date: "2023-11-15",
      customer: "Acme Corp",
      amount: 2500.00,
      status: "completed",
      method: "credit_card",
      card: "**** **** **** 4242",
      invoice: "INV-2023-005"
    },
    {
      id: "PAY-2023-002",
      date: "2023-11-10",
      customer: "Globex Inc",
      amount: 1750.50,
      status: "completed",
      method: "bank_transfer",
      account: "**** 1234",
      invoice: "INV-2023-004"
    },
    {
      id: "PAY-2023-003",
      date: "2023-11-05",
      customer: "Wayne Enterprises",
      amount: 3250.00,
      status: "pending",
      method: "credit_card",
      card: "**** **** **** 5678",
      invoice: "INV-2023-003"
    },
    {
      id: "PAY-2023-004",
      date: "2023-10-28",
      customer: "Stark Industries",
      amount: 4500.00,
      status: "completed",
      method: "credit_card",
      card: "**** **** **** 9012",
      invoice: "INV-2023-002"
    },
    {
      id: "PAY-2023-005",
      date: "2023-10-20",
      customer: "Umbrella Corp",
      amount: 1875.50,
      status: "failed",
      method: "credit_card",
      card: "**** **** **** 3456",
      invoice: "INV-2023-001"
    },
    {
      id: "PAY-2023-006",
      date: "2023-10-15",
      customer: "Oscorp",
      amount: 2250.75,
      status: "refunded",
      method: "bank_transfer",
      account: "**** 5678",
      invoice: "INV-2023-001"
    },
  ]

  // Filter payments based on selected tab
  const filteredPayments = payments.filter(payment => {
    if (selectedTab === "all") return true
    return payment.status === selectedTab
  })

  // Calculate summary metrics
  const totalPayments = payments.reduce((sum, payment) => {
    if (payment.status === "completed") return sum + payment.amount
    return sum
  }, 0)

  const pendingPayments = payments.reduce((sum, payment) => {
    if (payment.status === "pending") return sum + payment.amount
    return sum
  }, 0)

  const failedPayments = payments.reduce((sum, payment) => {
    if (payment.status === "failed") return sum + payment.amount
    return sum
  }, 0)

  const refundedPayments = payments.reduce((sum, payment) => {
    if (payment.status === "refunded") return sum + payment.amount
    return sum
  }, 0)

  // Helper function to format payment status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
      case "refunded":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Refunded</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Helper function to format payment method
  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit_card":
        return <CreditCard className="h-4 w-4 text-gray-500" />
      case "bank_transfer":
        return <FileText className="h-4 w-4 text-gray-500" />
      default:
        return <DollarSign className="h-4 w-4 text-gray-500" />
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Manage and track all payment transactions</p>
        </div>
        <div className="flex gap-3">
          <Link href="/method-pay">
            <Button variant="outline">Method Pay Dashboard</Button>
          </Link>
          <Link href="/method-pay/payouts">
            <Button variant="outline">Payouts</Button>
          </Link>
        </div>
      </div>

      {/* Payment Summary Metrics */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {/* Total Payments */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Total Payments</p>
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold">${totalPayments.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </CardContent>
        </Card>

        {/* Pending Payments */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <Clock className="h-4 w-4 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold">${pendingPayments.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </CardContent>
        </Card>

        {/* Failed Payments */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Failed</p>
                <XCircle className="h-4 w-4 text-red-500" />
              </div>
              <p className="text-2xl font-bold">${failedPayments.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </CardContent>
        </Card>

        {/* Refunded Payments */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Refunded</p>
                <ArrowDownRight className="h-4 w-4 text-gray-500" />
              </div>
              <p className="text-2xl font-bold">${refundedPayments.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search payments..."
                className="w-full pl-8 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsExportModalOpen(true)}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setIsPaymentModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Payment
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="all">All Payments</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
            <TabsTrigger value="refunded">Refunded</TabsTrigger>
          </TabsList>
          <TabsContent value={selectedTab} className="mt-4">
            <Card>
              <CardHeader className="px-6 py-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Payment Transactions</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <span className="text-sm">Sort by: Recent</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Payment ID</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Customer</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Amount</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Method</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Invoice</th>
                        <th className="text-right py-3 px-6 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayments.map((payment) => (
                        <tr key={payment.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-6">
                            <div className="font-medium">{payment.id}</div>
                          </td>
                          <td className="py-3 px-6">
                            <div className="text-sm">{formatDate(payment.date)}</div>
                          </td>
                          <td className="py-3 px-6">
                            <div className="font-medium">{payment.customer}</div>
                          </td>
                          <td className="py-3 px-6">
                            <div className="font-medium">${payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                          </td>
                          <td className="py-3 px-6">
                            {getStatusBadge(payment.status)}
                          </td>
                          <td className="py-3 px-6">
                            <div className="flex items-center gap-2">
                              {getPaymentMethodIcon(payment.method)}
                              <span className="text-sm text-muted-foreground">
                                {payment.method === "credit_card" ? payment.card : payment.account}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-6">
                            <Link href={`/invoices/${payment.invoice}`} className="text-blue-600 hover:underline">
                              {payment.invoice}
                            </Link>
                          </td>
                          <td className="py-3 px-6 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View details</DropdownMenuItem>
                                <DropdownMenuItem>Download receipt</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {payment.status === "completed" && (
                                  <DropdownMenuItem>Issue refund</DropdownMenuItem>
                                )}
                                {payment.status === "pending" && (
                                  <DropdownMenuItem>Cancel payment</DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Export Payments Modal */}
      <ExportPaymentsModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        invoiceId="New Payment"
        amount={0}
        customer=""
      />
    </div>
  )
}
