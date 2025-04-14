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
  TrendingUp,
  TrendingDown,
  UserPlus,
  Filter,
  Settings,
  UserCircle2,
  Warehouse,
  Repeat2,
  ExternalLink,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [viewType, setViewType] = useState<"people" | "companies">("people")

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
      status: "none",
      lastContact: "Mar 15, 2023",
      totalJobs: 12,
      openJobs: 2,
      totalSpend: 24500,
      notes: "Key account, premium service level",
      healthScore: 85,
      healthScoreTrend: 12,
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
      status: "none",
      lastContact: "Mar 18, 2023",
      totalJobs: 8,
      openJobs: 1,
      totalSpend: 18750,
      notes: "Expanding their office, potential for more work",
      healthScore: 92,
      healthScoreTrend: 5,
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
      status: "crucial",
      lastContact: "Mar 10, 2023",
      totalJobs: 15,
      openJobs: 0,
      totalSpend: 32000,
      notes: "Multiple properties, regular maintenance contract",
      healthScore: 95,
      healthScoreTrend: -2,
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
      status: "none",
      lastContact: "Mar 12, 2023",
      totalOrders: 45,
      openOrders: 3,
      totalPurchases: 78500,
      notes: "Primary supplier for HVAC components",
      healthScore: 78,
      healthScoreTrend: 8,
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
      status: "urgent",
      lastContact: "Mar 5, 2023",
      totalOrders: 28,
      openOrders: 1,
      totalPurchases: 42000,
      notes: "Electrical components supplier, good pricing",
      healthScore: 45,
      healthScoreTrend: -15,
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
      status: "crucial",
      lastContact: "Mar 20, 2023",
      totalJobs: 24,
      openJobs: 3,
      totalSpend: 65000,
      totalOrders: 5,
      openOrders: 0,
      totalPurchases: 12000,
      notes: "Both a customer and supplier of medical equipment",
      healthScore: 30,
      healthScoreTrend: -8,
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
      status: "urgent",
      lastContact: "Jan 15, 2023",
      totalJobs: 5,
      openJobs: 0,
      totalSpend: 28000,
      notes: "Building under new management, follow up needed",
      healthScore: 15,
      healthScoreTrend: -25,
    },
    {
      id: "vend-003",
      name: "Old Parts Ltd",
      type: ["vendor"],
      contactPerson: "David Brown",
      email: "dbrown@oldparts.com",
      phone: "(555) 901-2345",
      address: "300 Vintage Lane",
      city: "Oldtown",
      state: "PA",
      status: "inactive",
      lastContact: "Dec 1, 2022",
      totalOrders: 15,
      openOrders: 0,
      totalPurchases: 25000,
      notes: "No orders in last 6 months",
      healthScore: 20,
      healthScoreTrend: -30,
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
  }).sort((a, b) => {
    // Define status priority order
    const statusPriority: Record<string, number> = {
      urgent: 1,
      crucial: 2,
      none: 3,
      inactive: 4
    }
    return statusPriority[a.status] - statusPriority[b.status]
  })

  // Get contact type icon
  const getContactTypeIcon = (types: string[]) => {
    const getTooltipContent = () => {
      if (types.includes("customer") && types.includes("vendor")) {
        return "Customer & Vendor"
      } else if (types.includes("customer")) {
        return "Customer"
      } else if (types.includes("vendor")) {
        return "Vendor"
      }
      return ""
    }

    const icon = types.includes("customer") && types.includes("vendor") ? (
      <div className="relative">
        <UserCircle2 className="h-5 w-5 text-blue-500" />
        <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-[1px]">
          <Warehouse className="h-2.5 w-2.5 text-green-500" />
        </div>
      </div>
    ) : types.includes("customer") ? (
      <UserCircle2 className="h-5 w-5 text-blue-500" />
    ) : types.includes("vendor") ? (
      <Warehouse className="h-5 w-5 text-green-500" />
    ) : null

    return (
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <div>{icon}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{getTooltipContent()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  // Get health score color
  const getHealthScoreColor = (score: number) => {
    if (score <= 33) return "text-red-500"
    if (score <= 66) return "text-orange-500"
    if (score <= 90) return "text-green-400"
    return "text-green-600"
  }

  // Get health score background color
  const getHealthScoreBgColor = (score: number) => {
    if (score <= 33) return "bg-red-500"
    if (score <= 66) return "bg-orange-500"
    if (score <= 90) return "bg-green-400"
    return "bg-green-600"
  }

  // Format currency in millions
  const formatMillions = (value: number) => {
    const millions = value / 1000000
    return `$${millions.toFixed(2)} mln`
  }

  // Calculate lifetime value
  const getLifetimeValue = (contact: typeof contacts[0]) => {
    if (contact.type.includes("customer") && contact.type.includes("vendor")) {
      return (contact.totalSpend || 0) + (contact.totalPurchases || 0)
    }
    if (contact.type.includes("customer")) {
      return contact.totalSpend || 0
    }
    if (contact.type.includes("vendor")) {
      return contact.totalPurchases || 0
    }
    return 0
  }

  // Render contact list
  const renderContactList = (contacts: typeof filteredContacts) => {
    return (
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 text-sm font-medium">
                {viewType === "people" ? "Name" : "Company"}
              </th>
              <th className="text-left p-3 text-sm font-medium">
                {viewType === "people" ? "Contact" : "Main Contact"}
              </th>
              <th className="text-left p-3 text-sm font-medium hidden md:table-cell">Location</th>
              <th className="text-left p-3 text-sm font-medium">Priority</th>
              <th className="text-left p-3 text-sm font-medium hidden lg:table-cell">Health Score</th>
              {viewType === "companies" && (
                <th className="text-left p-3 text-sm font-medium hidden lg:table-cell">Lifetime Value</th>
              )}
              <th className="text-left p-3 text-sm font-medium w-[85px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr 
                key={contact.id} 
                className="border-t hover:bg-muted/20 cursor-pointer relative"
                onClick={(e) => {
                  // Prevent navigation if clicking on dropdown
                  if ((e.target as HTMLElement).closest('.dropdown-trigger')) {
                    return;
                  }
                  window.location.href = `/contacts/${contact.id}`;
                }}
              >
                <td className="p-3">
                  <div className="flex items-center gap-4">
                    {getContactTypeIcon(contact.type)}
                    <div>
                      {viewType === "people" ? (
                        <>
                          <div className="font-medium text-base">{contact.contactPerson}</div>
                          <div className="text-xs text-muted-foreground -mt-0.25 flex items-center gap-1">
                            {contact.name}
                            <span className="text-muted-foreground">|</span>
                            <TooltipProvider>
                              <Tooltip delayDuration={100}>
                                <TooltipTrigger asChild>
                                  <span className="text-muted-foreground cursor-help">
                                    {formatMillions(getLifetimeValue(contact))}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Lifetime value of {formatMillions(getLifetimeValue(contact))}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </>
                      ) : (
                        <div className="font-medium text-base">{contact.name}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  {viewType === "people" ? (
                    <>
                      <div className="text-sm">{contact.email}</div>
                      <div className="text-xs text-muted-foreground">{contact.phone}</div>
                    </>
                  ) : (
                    <div className="text-sm font-medium">{contact.contactPerson}</div>
                  )}
                </td>
                <td className="p-3 hidden md:table-cell">
                  <div className="text-sm">
                    {contact.city}, {contact.state}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {contact.status === "urgent" ? (
                    <Badge className="bg-red-100 text-red-800 border-red-200 inline-flex items-center gap-2">
                      <span>High</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                      </div>
                    </Badge>
                  ) : contact.status === "crucial" ? (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 inline-flex items-center gap-2">
                      <span>Medium</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full border border-yellow-500" />
                      </div>
                    </Badge>
                  ) : contact.status === "none" ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200 inline-flex items-center gap-2">
                      <span>Low</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <div className="w-2 h-2 rounded-full border border-green-500" />
                        <div className="w-2 h-2 rounded-full border border-green-500" />
                      </div>
                    </Badge>
                  ) : contact.status === "inactive" ? (
                    <Badge className="bg-gray-100 text-gray-800 border-gray-200 inline-flex items-center gap-2">
                      <span>Inactive</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full border border-gray-500" />
                        <div className="w-2 h-2 rounded-full border border-gray-500" />
                        <div className="w-2 h-2 rounded-full border border-gray-500" />
                      </div>
                    </Badge>
                  ) : null}
                </td>
                <td className="p-3 hidden lg:table-cell">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-center gap-1">
                      <div className={`font-medium ${getHealthScoreColor(contact.healthScore)}`}>
                        {contact.healthScore}
                      </div>
                      <TooltipProvider>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <div>
                              {contact.healthScoreTrend > 0 ? (
                                <TrendingUp className="h-3 w-3 text-muted-foreground" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-muted-foreground" />
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{Math.abs(contact.healthScoreTrend)}% {contact.healthScoreTrend > 0 ? 'increase' : 'decrease'} in 14 days</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getHealthScoreBgColor(contact.healthScore)}`}
                        style={{ width: `${contact.healthScore}%` }}
                      />
                    </div>
                  </div>
                </td>
                {viewType === "companies" && (
                  <td className="p-3 hidden lg:table-cell pl-6">
                    <div className="text-sm font-medium">
                      {formatMillions(getLifetimeValue(contact))}
                    </div>
                  </td>
                )}
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-0.5">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`/contacts/${contact.id}`, '_blank');
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 dropdown-trigger">
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

  const ViewToggle = () => (
    <div className="flex items-baseline gap-2 text-sm ml-3">
      <button
        onClick={() => setViewType("people")}
        className={cn(
          "text-blue-500 hover:text-blue-600",
          viewType === "people" && "font-bold"
        )}
      >
        people
      </button>
      <span className="text-muted-foreground">|</span>
      <button
        onClick={() => setViewType("companies")}
        className={cn(
          "text-blue-500 hover:text-blue-600",
          viewType === "companies" && "font-bold"
        )}
      >
        companies
      </button>
    </div>
  )

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Contacts</h1>
          <p className="text-muted-foreground">Manage customers and vendors</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="customer">Customers</SelectItem>
                <SelectItem value="vendor">Vendors</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="crucial">Crucial</SelectItem>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="metropolis">Metropolis</SelectItem>
                <SelectItem value="silicon-valley">Silicon Valley</SelectItem>
                <SelectItem value="riverside">Riverside</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Contacts</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-baseline">
                <div className="flex items-baseline gap-3">
                  <div className="flex items-baseline gap-1.5">
                    <CardTitle>All Contacts</CardTitle>
                    <span className="text-sm text-muted-foreground">({filteredContacts.length})</span>
                  </div>
                  <ViewToggle />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">{renderContactList(filteredContacts)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-baseline">
                <div className="flex items-baseline gap-3">
                  <div className="flex items-baseline gap-1.5">
                    <CardTitle>Customers</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      ({filteredContacts.filter((c) => c.type.includes("customer")).length})
                    </span>
                  </div>
                  <ViewToggle />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              {renderContactList(filteredContacts.filter((contact) => contact.type.includes("customer")))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-baseline">
                <div className="flex items-baseline gap-3">
                  <div className="flex items-baseline gap-1.5">
                    <CardTitle>Vendors</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      ({filteredContacts.filter((c) => c.type.includes("vendor")).length})
                    </span>
                  </div>
                  <ViewToggle />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              {renderContactList(filteredContacts.filter((contact) => contact.type.includes("vendor")))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

