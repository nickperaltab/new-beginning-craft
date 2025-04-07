"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Download,
  Edit,
  MoreHorizontal,
  DollarSign,
  Calendar,
  Clock,
  FileText,
  Building,
  Mail,
  Send,
  Printer,
  History,
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

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  // Mock invoice data - in a real app, fetch this based on the ID
  const invoice = {
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
    customerDetails: {
      name: "Acme Corp",
      attention: "John Anderson",
      address: "123 Main St, Suite 101",
      city: "Metropolis",
      state: "NY",
      zipCode: "10001",
      email: "j.anderson@acmecorp.com",
      phone: "(555) 123-4567",
    },
    items: [
      {
        description: "HVAC Unit Replacement",
        quantity: 2,
        unitPrice: 4500.00,
        total: 9000.00,
      },
      {
        description: "Installation Labor",
        quantity: 16,
        unitPrice: 125.00,
        total: 2000.00,
      },
      {
        description: "Ductwork Modifications",
        quantity: 1,
        unitPrice: 1500.00,
        total: 1500.00,
      },
    ],
    subtotal: 12500.00,
    tax: 0,
    total: 12500.00,
    history: [
      {
        date: "2023-03-15",
        action: "Invoice Created",
        user: "Lisa Wong",
      },
      {
        date: "2023-03-15",
        action: "Invoice Sent to Customer",
        user: "Lisa Wong",
      },
      {
        date: "2023-04-10",
        action: "Payment Received",
        user: "System",
        details: "Bank Transfer - $12,500.00",
      },
    ],
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/invoices">
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Invoice {invoice.id}</h1>
              <Badge
                className={cn(
                  "ml-1",
                  invoice.status === "paid" && "bg-green-500",
                  invoice.status === "pending" && "bg-yellow-500",
                  invoice.status === "overdue" && "bg-red-500",
                  invoice.status === "draft" && "bg-gray-500",
                )}
              >
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {invoice.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Printer className="h-3.5 w-3.5" />
            Print
          </Button>
          <Link href={`/invoices/${invoice.id}/edit`}>
            <Button size="sm" className="gap-1">
              <Edit className="h-3.5 w-3.5" />
              Edit Invoice
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Invoice Details */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Customer</div>
                  <div className="font-medium">{invoice.customerDetails.name}</div>
                  <div className="text-sm">{invoice.customerDetails.attention}</div>
                  <div className="text-sm">{invoice.customerDetails.address}</div>
                  <div className="text-sm">
                    {invoice.customerDetails.city}, {invoice.customerDetails.state} {invoice.customerDetails.zipCode}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Invoice Information</div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Invoice Date:</span> {invoice.issuedDate}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Due Date:</span> {invoice.dueDate}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Job:</span>{" "}
                    <Link href={`/jobs/${invoice.jobId}`} className="text-blue-500 hover:underline">
                      {invoice.jobId}
                    </Link>
                  </div>
                  {invoice.paidDate && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Paid Date:</span> {invoice.paidDate}
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-2 font-medium">Description</th>
                      <th className="text-right pb-2 font-medium">Quantity</th>
                      <th className="text-right pb-2 font-medium">Unit Price</th>
                      <th className="text-right pb-2 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-2">{item.description}</td>
                        <td className="py-2 text-right">{item.quantity}</td>
                        <td className="py-2 text-right">${item.unitPrice.toLocaleString()}</td>
                        <td className="py-2 text-right">${item.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="pt-4 text-right font-medium">
                        Subtotal
                      </td>
                      <td className="pt-4 text-right font-medium">
                        ${invoice.subtotal.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="pt-2 text-right font-medium">
                        Tax
                      </td>
                      <td className="pt-2 text-right font-medium">
                        ${invoice.tax.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="pt-2 text-right text-lg font-bold">
                        Total
                      </td>
                      <td className="pt-2 text-right text-lg font-bold">
                        ${invoice.total.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {invoice.notes && (
                <div className="mt-6 p-3 bg-muted/20 rounded-md">
                  <div className="text-sm text-muted-foreground mb-1">Notes:</div>
                  <p className="text-sm">{invoice.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity History */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Activity History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoice.history.map((event, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1">
                      <History className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{event.action}</div>
                      <div className="text-sm text-muted-foreground">
                        {event.date} • {event.user}
                      </div>
                      {event.details && (
                        <div className="text-sm text-muted-foreground mt-1">{event.details}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start">
                  <Send className="h-4 w-4 mr-2" />
                  Send to Customer
                </Button>
                <Button className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Record Payment
                </Button>
                <Button className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Send Reminder
                </Button>
                <Button className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{invoice.customerDetails.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground ml-6">
                    {invoice.customerDetails.address}
                    <br />
                    {invoice.customerDetails.city}, {invoice.customerDetails.state} {invoice.customerDetails.zipCode}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${invoice.customerDetails.email}`} className="text-blue-500 hover:underline">
                      {invoice.customerDetails.email}
                    </a>
                  </div>
                </div>
                <Button variant="outline" className="w-full justify-start">
                  <Building className="h-4 w-4 mr-2" />
                  View Customer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 