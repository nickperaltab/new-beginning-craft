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
  Phone,
  Mail,
  FileText,
  Calendar,
  DollarSign,
  Package,
  Upload,
  Download,
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
import { ContactFilters } from "@/components/contacts/contact-filters"

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Mock contacts data
  const contacts = [
    {
      id: "cust-001",
      name: "Acme Corp",
      type: ["customer"],
      contactPerson: "John Anderson",
      email: "j.anderson@acmecorp.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Suite 101",
      city: "Metropolis",
      state: "NY",
      status: "active",
      lastContact: "Mar 15, 2023",
      totalJobs: 12,
      openJobs: 2,
      totalSpend: 24500,
      notes: "Key account, premium service level",
    },
    {
      id: "cust-002",
      name: "TechSolutions Inc",
      type: ["customer"],
      contactPerson: "Sarah Miller",
      email: "sarah.m@techsolutions.com",
      phone: "(555) 234-5678",
      address: "456 Tech Blvd",
      city: "Silicon Valley",
      state: "CA",
      status: "active",
      lastContact: "Mar 18, 2023",
      totalJobs: 8,
      openJobs: 1,
      totalSpend: 18750,
      notes: "Expanding their office, potential for more work",
    },
    {
      id: "cust-003",
      name: "Riverside Apartments",
      type: ["customer"],
      contactPerson: "Michael Johnson",
      email: "mjohnson@riverside.com",
      phone: "(555) 345-6789",
      address: "789 River Rd, Building C",
      city: "Riverside",
      state: "NJ",
      status: "active",
      lastContact: "Mar 10, 2023",
      totalJobs: 15,
      openJobs: 0,
      totalSpend: 32000,
      notes: "Multiple properties, regular maintenance contract",
    },
    {
      id: "vend-001",
      name: "HVAC Supplies Inc",
      type: ["vendor"],
      contactPerson: "Robert Chen",
      email: "rchen@hvacsupplies.com",
      phone: "(555) 456-7890",
      address: "100 Industrial Way",
      city: "Commerce",
      state: "TX",
      status: "active",
      lastContact: "Mar 12, 2023",
      totalOrders: 45,
      openOrders: 3,
      totalPurchases: 78500,
      notes: "Primary supplier for HVAC components",
    },
    {
      id: "vend-002",
      name: "ElectroParts Co",
      type: ["vendor"],
      contactPerson: "Lisa Wong",
      email: "lwong@electroparts.com",
      phone: "(555) 567-8901",
      address: "200 Electric Ave",
      city: "Voltage",
      state: "OH",
      status: "active",
      lastContact: "Mar 5, 2023",
      totalOrders: 28,
      openOrders: 1,
      totalPurchases: 42000,
      notes: "Electrical components supplier, good pricing",
    },
    {
      id: "sub-001",
      name: "Expert Plumbing Services",
      type: ["subcontractor"],
      contactPerson: "David Martinez",
      email: "dmartinez@expertplumbing.com",
      phone: "(555) 678-9012",
      address: "300 Plumber Lane",
      city: "Watertown",
      state: "MA",
      status: "active",
      lastContact: "Mar 8, 2023",
      totalJobs: 18,
      openJobs: 2,
      totalPaid: 36000,
      notes: "Reliable plumbing subcontractor, available on short notice",
    },
    {
      id: "cust-vend-001",
      name: "City Hospital",
      type: ["customer", "vendor"],
      contactPerson: "Emily Wilson",
      email: "ewilson@cityhospital.org",
      phone: "(555) 789-0123",
      address: "100 Health Way",
      city: "Metropolis",
      state: "NY",
      status: "active",
      lastContact: "Mar 20, 2023",
      totalJobs: 24,
      openJobs: 3,
      totalSpend: 65000,
      totalOrders: 5,
      openOrders: 0,
      totalPurchases: 12000,
      notes: "Both a customer and supplier of medical equipment",
    },
    {
      id: "cust-004",
      name: "Downtown Office Tower",
      type: ["customer"],
      contactPerson: "James Thompson",
      email: "jthompson@downtowntower.com",
      phone: "(555) 890-1234",
      address: "500 Business Ave",
      city: "Metropolis",
      state: "NY",
      status: "inactive",
      lastContact: "Jan 15, 2023",
      totalJobs: 5,
      openJobs: 0,
      totalSpend: 28000,
      notes: "Building under new management, follow up needed",
    },
  ]

  // Filter contacts based on search query, type, and status
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = selectedType === "all" || contact.type.includes(selectedType)
    const matchesStatus = selectedStatus === "all" || contact.status === selectedStatus

    return matchesSearch && matchesType && matchesStatus
  })

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

  // Render contact list
  const renderContactList = (contacts) => {
    return (
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 text-sm font-medium">Name</th>
              <th className="text-left p-3 text-sm font-medium">Type</th>
              <th className="text-left p-3 text-sm font-medium">Contact</th>
              <th className="text-left p-3 text-sm font-medium hidden md:table-cell">Location</th>
              <th className="text-left p-3 text-sm font-medium">Status</th>
              <th className="text-left p-3 text-sm font-medium hidden lg:table-cell">Activity</th>
              <th className="text-right p-3 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-t hover:bg-muted/20">
                <td className="p-3">
                  <div className="font-medium">{contact.name}</div>
                </td>
                <td className="p-3">{getContactTypeBadge(contact.type)}</td>
                <td className="p-3">
                  <div className="text-sm">{contact.contactPerson}</div>
                  <div className="text-xs text-muted-foreground">{contact.email}</div>
                  <div className="text-xs text-muted-foreground">{contact.phone}</div>
                </td>
                <td className="p-3 hidden md:table-cell">
                  <div className="text-sm">
                    {contact.city}, {contact.state}
                  </div>
                </td>
                <td className="p-3">
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
                </td>
                <td className="p-3 hidden lg:table-cell">
                  {contact.type.includes("customer") && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Jobs:</span>{" "}
                      <span className="font-medium">
                        {contact.openJobs} open / {contact.totalJobs} total
                      </span>
                    </div>
                  )}
                  {contact.type.includes("vendor") && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Orders:</span>{" "}
                      <span className="font-medium">
                        {contact.openOrders} open / {contact.totalOrders} total
                      </span>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">Last contact: {contact.lastContact}</div>
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/contacts/${contact.id}`}>
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
        <h1 className="text-3xl font-bold">Contacts</h1>
        <p className="text-muted-foreground">Manage customers, vendors, and subcontractors</p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contacts..."
              className="w-full pl-8 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ContactFilters
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href="/contacts/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Contacts</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="subcontractors">Subcontractors</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Contacts</CardTitle>
              <CardDescription>Showing {filteredContacts.length} contacts</CardDescription>
            </CardHeader>
            <CardContent>{renderContactList(filteredContacts)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Customers</CardTitle>
              <CardDescription>
                Showing {filteredContacts.filter((c) => c.type.includes("customer")).length} customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderContactList(filteredContacts.filter((contact) => contact.type.includes("customer")))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Vendors</CardTitle>
              <CardDescription>
                Showing {filteredContacts.filter((c) => c.type.includes("vendor")).length} vendors
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderContactList(filteredContacts.filter((contact) => contact.type.includes("vendor")))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subcontractors" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Subcontractors</CardTitle>
              <CardDescription>
                Showing {filteredContacts.filter((c) => c.type.includes("subcontractor")).length} subcontractors
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderContactList(filteredContacts.filter((contact) => contact.type.includes("subcontractor")))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent Contacts</CardTitle>
              <CardDescription>Recently added or updated contacts</CardDescription>
            </CardHeader>
            <CardContent>
              {renderContactList(
                filteredContacts.sort((a, b) => new Date(b.lastContact) - new Date(a.lastContact)).slice(0, 6),
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

