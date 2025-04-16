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
  UserPlus,
  Filter,
  Settings,
  Warehouse,
  Star,
  Trash2,
  DollarSign,
  Building2,
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
import { AddVendorModal } from "@/app/components/vendors/add-vendor-modal"
import * as z from "zod"

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [viewType, setViewType] = useState<"vendors" | "companies">("vendors")
  const [vendors] = useState([
    {
      id: "vend-001",
      name: "HVAC Supplies Inc",
      contactPerson: "Robert Chen",
      email: "rchen@hvacsupplies.com",
      phone: "(555) 456-7890",
      address: "100 Industrial Way",
      city: "Commerce",
      state: "TX",
      totalSpent: 78500,
      tags: ["Manufacturing"]
    },
    {
      id: "vend-002",
      name: "Tech Components Ltd",
      contactPerson: "Sarah Miller",
      email: "s.miller@techcomp.com",
      phone: "(555) 234-5678",
      address: "789 Innovation Drive",
      city: "San Jose",
      state: "CA",
      totalSpent: 156000,
      tags: ["Electronics", "Wholesale"]
    },
    {
      id: "vend-003",
      name: "Tech Components Ltd",
      contactPerson: "David Park",
      email: "d.park@techcomp.com",
      phone: "(555) 234-5679",
      address: "789 Innovation Drive",
      city: "San Jose",
      state: "CA",
      totalSpent: 156000,
      tags: ["Electronics", "Wholesale"]
    },
    {
      id: "vend-004",
      name: "Global Office Supplies",
      contactPerson: "Maria Garcia",
      email: "m.garcia@globaloffice.com",
      phone: "(555) 345-6789",
      address: "456 Business Park",
      city: "Phoenix",
      state: "AZ",
      totalSpent: 45000,
      tags: ["Office Supplies"]
    },
    {
      id: "vend-005",
      name: "Global Office Supplies",
      contactPerson: "James Wilson",
      email: "j.wilson@globaloffice.com",
      phone: "(555) 345-6790",
      address: "456 Business Park",
      city: "Phoenix",
      state: "AZ",
      totalSpent: 45000,
      tags: ["Office Supplies"]
    },
    {
      id: "vend-006",
      name: "Industrial Motors Co",
      contactPerson: "Linda Martinez",
      email: "l.martinez@indmotors.com",
      phone: "(555) 567-8901",
      address: "321 Factory Lane",
      city: "Detroit",
      state: "MI",
      totalSpent: 234000,
      tags: ["Manufacturing", "Automotive"]
    },
    {
      id: "vend-007",
      name: "Industrial Motors Co",
      contactPerson: "Michael Chang",
      email: "m.chang@indmotors.com",
      phone: "(555) 567-8902",
      address: "321 Factory Lane",
      city: "Detroit",
      state: "MI",
      totalSpent: 234000,
      tags: ["Manufacturing", "Automotive"]
    },
    {
      id: "vend-008",
      name: "Eco Packaging Solutions",
      contactPerson: "Emma Thompson",
      email: "e.thompson@ecopack.com",
      phone: "(555) 678-9012",
      address: "567 Green Way",
      city: "Portland",
      state: "OR",
      totalSpent: 89000,
      tags: ["Packaging", "Eco-friendly"]
    },
    {
      id: "vend-009",
      name: "Eco Packaging Solutions",
      contactPerson: "Daniel Lee",
      email: "d.lee@ecopack.com",
      phone: "(555) 678-9013",
      address: "567 Green Way",
      city: "Portland",
      state: "OR",
      totalSpent: 89000,
      tags: ["Packaging", "Eco-friendly"]
    },
    {
      id: "vend-010",
      name: "Steel & Metal Works",
      contactPerson: "Thomas Anderson",
      email: "t.anderson@steelworks.com",
      phone: "(555) 789-0123",
      address: "890 Industrial Blvd",
      city: "Pittsburgh",
      state: "PA",
      totalSpent: 312000,
      tags: ["Manufacturing", "Raw Materials"]
    },
    {
      id: "vend-011",
      name: "Steel & Metal Works",
      contactPerson: "Rachel Kim",
      email: "r.kim@steelworks.com",
      phone: "(555) 789-0124",
      address: "890 Industrial Blvd",
      city: "Pittsburgh",
      state: "PA",
      totalSpent: 312000,
      tags: ["Manufacturing", "Raw Materials"]
    },
    {
      id: "vend-012",
      name: "Quality Tools Inc",
      contactPerson: "Christopher Brown",
      email: "c.brown@qualitytools.com",
      phone: "(555) 890-1234",
      address: "123 Workshop Road",
      city: "Cincinnati",
      state: "OH",
      totalSpent: 167000,
      tags: ["Tools", "Equipment"]
    },
    {
      id: "vend-013",
      name: "Quality Tools Inc",
      contactPerson: "Jennifer Taylor",
      email: "j.taylor@qualitytools.com",
      phone: "(555) 890-1235",
      address: "123 Workshop Road",
      city: "Cincinnati",
      state: "OH",
      totalSpent: 167000,
      tags: ["Tools", "Equipment"]
    },
    {
      id: "vend-014",
      name: "Smart Electronics",
      contactPerson: "William Davis",
      email: "w.davis@smartelec.com",
      phone: "(555) 901-2345",
      address: "432 Tech Park",
      city: "Austin",
      state: "TX",
      totalSpent: 198000,
      tags: ["Electronics", "Technology"]
    },
    {
      id: "vend-015",
      name: "Smart Electronics",
      contactPerson: "Sophie Chen",
      email: "s.chen@smartelec.com",
      phone: "(555) 901-2346",
      address: "432 Tech Park",
      city: "Austin",
      state: "TX",
      totalSpent: 198000,
      tags: ["Electronics", "Technology"]
    },
    {
      id: "vend-016",
      name: "Pro Safety Equipment",
      contactPerson: "Robert Johnson",
      email: "r.johnson@prosafety.com",
      phone: "(555) 012-3456",
      address: "765 Safety Drive",
      city: "Denver",
      state: "CO",
      totalSpent: 143000,
      tags: ["Safety", "Equipment"]
    },
    {
      id: "vend-017",
      name: "Pro Safety Equipment",
      contactPerson: "Amanda Rodriguez",
      email: "a.rodriguez@prosafety.com",
      phone: "(555) 012-3457",
      address: "765 Safety Drive",
      city: "Denver",
      state: "CO",
      totalSpent: 143000,
      tags: ["Safety", "Equipment"]
    },
    {
      id: "vend-018",
      name: "Green Energy Systems",
      contactPerson: "Kevin White",
      email: "k.white@greenenergy.com",
      phone: "(555) 123-4567",
      address: "987 Solar Road",
      city: "Las Vegas",
      state: "NV",
      totalSpent: 276000,
      tags: ["Energy", "Renewable"]
    },
    {
      id: "vend-019",
      name: "Green Energy Systems",
      contactPerson: "Lisa Wong",
      email: "l.wong@greenenergy.com",
      phone: "(555) 123-4568",
      address: "987 Solar Road",
      city: "Las Vegas",
      state: "NV",
      totalSpent: 276000,
      tags: ["Energy", "Renewable"]
    },
    {
      id: "vend-020",
      name: "Network Solutions Pro",
      contactPerson: "Mark Thompson",
      email: "m.thompson@netsolpro.com",
      phone: "(555) 234-5678",
      address: "654 Network Ave",
      city: "Seattle",
      state: "WA",
      totalSpent: 187000,
      tags: ["IT", "Technology"]
    },
    {
      id: "vend-021",
      name: "Network Solutions Pro",
      contactPerson: "Emily Patel",
      email: "e.patel@netsolpro.com",
      phone: "(555) 234-5679",
      address: "654 Network Ave",
      city: "Seattle",
      state: "WA",
      totalSpent: 187000,
      tags: ["IT", "Technology"]
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)

  // Filter vendors based on search query
  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch
  })

  // Format currency in thousands
  const formatThousands = (value: number) => {
    const thousands = value / 1000
    return `$${thousands.toFixed(1)}k`
  }

  // Render vendor list
  const renderVendorList = (vendors: typeof filteredVendors) => {
    // Get unique companies
    const getUniqueCompanies = () => {
      const companies = vendors;
      const uniqueCompanyNames = Array.from(new Set(companies.map(c => c.name)));
      return uniqueCompanyNames.map(name => {
        const company = companies.find(c => c.name === name);
        if (!company) return null;
        return {
          id: company.id,
          name: company.name,
          mainContact: company.contactPerson,
          totalSpent: company.totalSpent,
          city: company.city,
          state: company.state,
          tags: company.tags
        };
      }).filter((company): company is NonNullable<typeof company> => company !== null);
    }

    return (
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="py-3 px-4 text-left font-medium">
                {viewType === "vendors" ? "Name" : "Company"}
              </th>
              <th className="py-3 px-4 text-left font-medium">
                {viewType === "vendors" ? "Contact" : "Main Contact"}
              </th>
              <th className="py-3 px-4 text-left font-medium">Location</th>
              {viewType === "companies" && (
                <th className="py-3 px-4 text-left font-medium">Total Spent</th>
              )}
              <th className="py-3 px-4 text-left font-medium">Tags</th>
              <th className="py-3 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {viewType === "vendors" ? (
              vendors.map((vendor) => (
                <tr 
                  key={vendor.id} 
                  className="border-b hover:bg-muted/50 cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-4">
                      {getCompanyIcon(vendor.name)}
                      <div>
                        <div className="font-medium text-base">
                          {vendor.contactPerson}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <span>{vendor.name}</span>
                            <span className="text-muted-foreground">|</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger className="cursor-default">
                                  <span>${formatThousands(vendor.totalSpent)}</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Total amount spent with this vendor
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">{vendor.email}</div>
                    <div className="text-xs text-muted-foreground">{vendor.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      {vendor.city}, {vendor.state}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-2">
                      {vendor.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="font-medium bg-white text-gray-500 border-gray-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="dropdown-trigger">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuItem className="cursor-pointer hover:bg-muted">
                          <Mail className="h-4 w-4 mr-2" />
                          Send email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-muted">
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer hover:bg-muted">
                          <FileText className="h-4 w-4 mr-2" />
                          View/Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-muted">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Reassign
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-muted">
                          <Star className="h-4 w-4 mr-2" />
                          Mark as VIP
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-100 hover:text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              getUniqueCompanies().map((company) => (
                <tr 
                  key={company.id} 
                  className="border-b hover:bg-muted/50 cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-4">
                      {getCompanyIcon(company.name)}
                      <div className="font-medium text-base">
                        {company.name}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">{company.mainContact}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      {company.city}, {company.state}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="cursor-default">
                            <span className="text-[14px]">${formatThousands(company.totalSpent)}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            Total amount spent with this vendor
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-2">
                      {company.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="font-medium bg-white text-gray-500 border-gray-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="dropdown-trigger">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuItem className="cursor-pointer hover:bg-muted">
                          <Mail className="h-4 w-4 mr-2" />
                          Send email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-muted">
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer hover:bg-muted">
                          <FileText className="h-4 w-4 mr-2" />
                          View/Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-muted">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Reassign
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-muted">
                          <Star className="h-4 w-4 mr-2" />
                          Mark as VIP
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-100 hover:text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    )
  }

  const getCompanyIcon = (companyName: string) => {
    // Map of company names to their favicon URLs with corrected company names
    const companyLogos: { [key: string]: string } = {
      "Ferguson Supply": "https://www.ferguson.com/favicon.ico",
      "Mouser Electronics": "https://www.mouser.com/favicon.ico",
      "Office Depot": "https://www.officedepot.com/favicon.ico",
      "WEG Industries": "https://www.weg.net/favicon.ico",
      "Berry Global": "https://www.berryglobal.com/favicon.ico",
      "U.S. Steel": "https://www.ussteel.com/favicon.ico",
      "Snap-on Tools": "https://www.snapon.com/favicon.ico",
      "Digi-Key Electronics": "https://www.digikey.com/favicon.ico",
      "Grainger": "https://www.grainger.com/favicon.ico",
      "SolarEdge": "https://www.solaredge.com/favicon.ico",
      "Cisco Systems": "https://www.cisco.com/favicon.ico"
    }

    // Map old company names to new ones for data consistency
    const companyNameMap: { [key: string]: string } = {
      "HVAC Supplies Inc": "Ferguson Supply",
      "Tech Components Ltd": "Mouser Electronics",
      "Global Office Supplies": "Office Depot",
      "Industrial Motors Co": "WEG Industries",
      "Eco Packaging Solutions": "Berry Global",
      "Steel & Metal Works": "U.S. Steel",
      "Quality Tools Inc": "Snap-on Tools",
      "Smart Electronics": "Digi-Key Electronics",
      "Pro Safety Equipment": "Grainger",
      "Green Energy Systems": "SolarEdge",
      "Network Solutions Pro": "Cisco Systems"
    }

    // Get the standardized company name
    const standardizedName = companyNameMap[companyName] || companyName

    if (standardizedName && standardizedName in companyLogos) {
      return (
        <div className="h-5 w-5 rounded-sm bg-gray-100 flex items-center justify-center">
          <img 
            src={companyLogos[standardizedName]} 
            alt={`${standardizedName} logo`} 
            className="h-5 w-5 rounded-sm object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.querySelector('.fallback')?.classList.remove('hidden');
            }}
          />
          <Building2 className="h-3 w-3 text-gray-500 fallback" />
        </div>
      )
    }

    // Fallback to a generic icon (now in square format)
    return (
      <div className="h-5 w-5 rounded-sm bg-gray-100 flex items-center justify-center">
        <Building2 className="h-3 w-3 text-gray-500" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Vendors</h2>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Vendor
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="commerce">Commerce</SelectItem>
                <SelectItem value="san-jose">San Jose</SelectItem>
                <SelectItem value="phoenix">Phoenix</SelectItem>
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

      <Tabs defaultValue="vendors" className="w-full" onValueChange={(value) => setViewType(value as "vendors" | "companies")}>
        <TabsList>
          <TabsTrigger value="vendors">Contacts</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="vendors" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-baseline gap-1.5">
                <CardTitle className="font-[550] text-[20px]">All Contacts</CardTitle>
                <span className="text-sm text-muted-foreground">({filteredVendors.length})</span>
              </div>
            </CardHeader>
            <CardContent className="pt-2">{renderVendorList(filteredVendors)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-baseline gap-1.5">
                <CardTitle className="font-[550] text-[20px]">All Companies</CardTitle>
                <span className="text-sm text-muted-foreground">
                  ({Array.from(new Set(filteredVendors.map(v => v.name))).length})
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              {renderVendorList(filteredVendors)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddVendorModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal}
        onSubmit={async (values: any, createAnother: boolean) => {
          // Here you would typically make an API call to create the vendor
          console.log('Creating vendor:', values)
          // For now, we'll just log the values
          return Promise.resolve()
        }}
      />
    </div>
  )
} 