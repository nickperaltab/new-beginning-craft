"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Building,
  Phone,
  Mail,
  Globe,
  MapPin,
  Edit,
  MoreHorizontal,
  Calendar,
  FileText,
  DollarSign,
  Package,
  Truck,
  Users,
  Upload,
  ClipboardList,
  PenTool,
  User,
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
import { ContactTabs } from "@/components/contacts/contact-tabs"

export default function ContactDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the contact data based on the ID
  const contactId = params.id

  // Mock contact data - in a real app this would come from an API or database
  const contact = {
    id: contactId,
    name: contactId.startsWith("cust")
      ? "Acme Corp"
      : contactId.startsWith("vend")
        ? "HVAC Supplies Inc"
        : "Expert Plumbing Services",
    type: contactId.startsWith("cust") ? ["customer"] : contactId.startsWith("vend") ? ["vendor"] : ["subcontractor"],
    contactPerson: contactId.startsWith("cust")
      ? "John Anderson"
      : contactId.startsWith("vend")
        ? "Robert Chen"
        : "David Martinez",
    email: contactId.startsWith("cust")
      ? "j.anderson@acmecorp.com"
      : contactId.startsWith("vend")
        ? "rchen@hvacsupplies.com"
        : "dmartinez@expertplumbing.com",
    phone: "(555) 123-4567",
    website: contactId.startsWith("cust")
      ? "www.acmecorp.com"
      : contactId.startsWith("vend")
        ? "www.hvacsupplies.com"
        : "www.expertplumbing.com",
    address: contactId.startsWith("cust")
      ? "123 Main St, Suite 101"
      : contactId.startsWith("vend")
        ? "100 Industrial Way"
        : "300 Plumber Lane",
    city: contactId.startsWith("cust") ? "Metropolis" : contactId.startsWith("vend") ? "Commerce" : "Watertown",
    state: contactId.startsWith("cust") ? "NY" : contactId.startsWith("vend") ? "TX" : "MA",
    zipCode: contactId.startsWith("cust") ? "10001" : contactId.startsWith("vend") ? "75001" : "02472",
    status: "active",
    lastContact: "Mar 15, 2023",
    notes: contactId.startsWith("cust")
      ? "Key account, premium service level"
      : contactId.startsWith("vend")
        ? "Primary supplier for HVAC components"
        : "Reliable plumbing subcontractor, available on short notice",
    locations: [
      {
        id: "loc-001",
        name: "Main Office",
        address: contactId.startsWith("cust")
          ? "123 Main St, Suite 101"
          : contactId.startsWith("vend")
            ? "100 Industrial Way"
            : "300 Plumber Lane",
        city: contactId.startsWith("cust") ? "Metropolis" : contactId.startsWith("vend") ? "Commerce" : "Watertown",
        state: contactId.startsWith("cust") ? "NY" : contactId.startsWith("vend") ? "TX" : "MA",
        zipCode: contactId.startsWith("cust") ? "10001" : contactId.startsWith("vend") ? "75001" : "02472",
        phone: "(555) 123-4567",
        isPrimary: true,
        locationType: ["billing", "shipping", "service"],
      },
      {
        id: "loc-002",
        name: "Warehouse",
        address: contactId.startsWith("cust")
          ? "456 Storage Blvd"
          : contactId.startsWith("vend")
            ? "200 Warehouse Ave"
            : "400 Storage Lane",
        city: contactId.startsWith("cust") ? "Metropolis" : contactId.startsWith("vend") ? "Commerce" : "Watertown",
        state: contactId.startsWith("cust") ? "NY" : contactId.startsWith("vend") ? "TX" : "MA",
        zipCode: contactId.startsWith("cust") ? "10002" : contactId.startsWith("vend") ? "75002" : "02473",
        phone: "(555) 987-6543",
        isPrimary: false,
        locationType: ["shipping"],
      },
    ],
    // Customer specific data
    totalJobs: contactId.startsWith("cust") ? 12 : 0,
    openJobs: contactId.startsWith("cust") ? 2 : 0,
    totalSpend: contactId.startsWith("cust") ? 24500 : 0,
    recentJobs: contactId.startsWith("cust")
      ? [
          { id: "JOB-2023-0045", date: "Mar 10, 2023", description: "HVAC System Overhaul", status: "In Progress" },
          { id: "JOB-2023-0038", date: "Feb 15, 2023", description: "Quarterly Maintenance", status: "Completed" },
          { id: "JOB-2023-0024", date: "Jan 05, 2023", description: "Electrical Upgrade", status: "Completed" },
        ]
      : [],
    recentInvoices: contactId.startsWith("cust")
      ? [
          { id: "INV-2023-0056", date: "Mar 12, 2023", amount: 4500, status: "Paid" },
          { id: "INV-2023-0042", date: "Feb 18, 2023", amount: 2800, status: "Paid" },
          { id: "INV-2023-0028", date: "Jan 08, 2023", amount: 3200, status: "Paid" },
        ]
      : [],
    // Vendor specific data
    totalOrders: contactId.startsWith("vend") ? 45 : 0,
    openOrders: contactId.startsWith("vend") ? 3 : 0,
    totalPurchases: contactId.startsWith("vend") ? 78500 : 0,
    recentOrders: contactId.startsWith("vend")
      ? [
          { id: "PO-2023-0089", date: "Mar 10, 2023", amount: 5400, status: "Received" },
          { id: "PO-2023-0076", date: "Feb 22, 2023", amount: 3200, status: "Received" },
          { id: "PO-2023-0062", date: "Jan 15, 2023", amount: 4100, status: "Received" },
        ]
      : [],
    suppliedItems: contactId.startsWith("vend")
      ? [
          { id: "ITM-001", name: "HVAC Filter - High Efficiency", sku: "FLT-HE-001", category: "Parts" },
          { id: "ITM-002", name: "Refrigerant R-410A", sku: "REF-410A-10", category: "Materials" },
          { id: "ITM-004", name: "Condenser Fan Motor", sku: "MTR-CF-230", category: "Parts" },
        ]
      : [],
    // Subcontractor specific data
    totalSubJobs: contactId.startsWith("sub") ? 18 : 0,
    openSubJobs: contactId.startsWith("sub") ? 2 : 0,
    totalPaid: contactId.startsWith("sub") ? 36000 : 0,
    recentSubJobs: contactId.startsWith("sub")
      ? [
          {
            id: "JOB-2023-0043",
            date: "Mar 08, 2023",
            description: "Plumbing Repair - Riverside Apartments",
            status: "In Progress",
          },
          {
            id: "JOB-2023-0036",
            date: "Feb 20, 2023",
            description: "Bathroom Renovation - Downtown Office",
            status: "Completed",
          },
          {
            id: "JOB-2023-0022",
            date: "Jan 12, 2023",
            description: "Emergency Pipe Repair - City Hospital",
            status: "Completed",
          },
        ]
      : [],
  }

  // Get contact type badge
  const getContactTypeBadge = (types) => {
    if (types.includes("customer") && types.includes("vendor")) {
      return <Badge className="bg-purple-500">Customer & Vendor</Badge>
    } else if (types.includes("customer")) {
      return <Badge className="bg-blue-500">Customer</Badge>
    } else if (types.includes("vendor")) {
      return <Badge className="bg-green-500">Vendor</Badge>
    } else if (types.includes("subcontractor")) {
      return <Badge className="bg-orange-500">Subcontractor</Badge>
    }
    return null
  }

  // Get contact type icon
  const getContactTypeIcon = (types) => {
    if (types.includes("customer")) {
      return <Building className="h-5 w-5" />
    } else if (types.includes("vendor")) {
      return <Truck className="h-5 w-5" />
    } else if (types.includes("subcontractor")) {
      return <Users className="h-5 w-5" />
    }
    return <Building className="h-5 w-5" />
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/contacts">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Contact Details</h1>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/contacts/${contact.id}/edit`}>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Contact
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="h-4 w-4 mr-2" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Phone className="h-4 w-4 mr-2" />
                Call
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="h-4 w-4 mr-2" />
                Email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {contact.type.includes("customer") && (
                <>
                  <DropdownMenuItem>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Visit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="h-4 w-4 mr-2" />
                    Create Job
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Create Invoice
                  </DropdownMenuItem>
                </>
              )}
              {contact.type.includes("vendor") && (
                <DropdownMenuItem>
                  <Package className="h-4 w-4 mr-2" />
                  Create Purchase Order
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PenTool className="h-4 w-4 mr-2" />
                Add Note
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Overview Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 flex flex-col items-center gap-3">
                  <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
                    {getContactTypeIcon(contact.type)}
                  </div>
                  {getContactTypeBadge(contact.type)}
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{contact.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <Badge
                      variant="outline"
                      className={cn(
                        contact.status === "active"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-gray-100 text-gray-800 border-gray-200",
                      )}
                    >
                      {contact.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                    <span>Last contact: {contact.lastContact}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Contact Person:</span>
                        <span>{contact.contactPerson}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Email:</span>
                        <span>{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Phone:</span>
                        <span>{contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Website:</span>
                        <span>{contact.website}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <span className="text-muted-foreground">Primary Address:</span>
                          <div>
                            {contact.address}
                            <br />
                            {contact.city}, {contact.state} {contact.zipCode}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {contact.notes && (
                    <div className="mt-4 p-3 bg-muted/20 rounded-md">
                      <div className="text-sm text-muted-foreground mb-1">Notes:</div>
                      <p className="text-sm">{contact.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <ContactTabs contact={contact} />
        </div>

        <div className="space-y-6">
          {/* Quick Actions Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {contact.type.includes("customer") && (
                  <>
                    <Button className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Create New Job
                    </Button>
                    <Button className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Visit
                    </Button>
                    <Button className="w-full justify-start">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Create Invoice
                    </Button>
                  </>
                )}
                {contact.type.includes("vendor") && (
                  <>
                    <Button className="w-full justify-start">
                      <Package className="h-4 w-4 mr-2" />
                      Create Purchase Order
                    </Button>
                    <Button className="w-full justify-start">
                      <Truck className="h-4 w-4 mr-2" />
                      Request Quote
                    </Button>
                  </>
                )}
                {contact.type.includes("subcontractor") && (
                  <>
                    <Button className="w-full justify-start">
                      <ClipboardList className="h-4 w-4 mr-2" />
                      Assign to Job
                    </Button>
                    <Button className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Work
                    </Button>
                  </>
                )}
                <Separator />
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PenTool className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Summary Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contact.type.includes("customer") && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Jobs</span>
                      <span className="font-medium">{contact.totalJobs}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Open Jobs</span>
                      <span className="font-medium">{contact.openJobs}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Spend</span>
                      <span className="font-medium">${contact.totalSpend.toLocaleString()}</span>
                    </div>
                  </>
                )}
                {contact.type.includes("vendor") && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Orders</span>
                      <span className="font-medium">{contact.totalOrders}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Open Orders</span>
                      <span className="font-medium">{contact.openOrders}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Purchases</span>
                      <span className="font-medium">${contact.totalPurchases.toLocaleString()}</span>
                    </div>
                  </>
                )}
                {contact.type.includes("subcontractor") && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Jobs</span>
                      <span className="font-medium">{contact.totalSubJobs}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Open Jobs</span>
                      <span className="font-medium">{contact.openSubJobs}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Paid</span>
                      <span className="font-medium">${contact.totalPaid.toLocaleString()}</span>
                    </div>
                  </>
                )}
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Contact</span>
                  <span className="font-medium">{contact.lastContact}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Locations</span>
                  <span className="font-medium">{contact.locations.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

