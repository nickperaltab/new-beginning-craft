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
  UserCircle2,
  Sparkles,
  Star,
  Trash2,
  TrendingUp,
  TrendingDown,
  Building2,
  User,
  Wrench,
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
import { Progress } from "@/components/ui/progress"
import { TooltipWithGlow } from "../components/ui/tooltip-with-glow"
import { AddCustomerModal } from "../components/customers/add-customer-modal"
import { InsightsConfigDialog } from "@/components/insights-config-dialog"

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [viewType, setViewType] = useState<"customers" | "companies">("customers")
  const [showAddModal, setShowAddModal] = useState(false)
  const [customers] = useState([
    {
      id: "cust-001",
      name: "Acme Corp",
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
      totalSpend: 24500000,
      ltv: 2.4,
      notes: "Key account, premium service level",
      healthScore: 85,
      healthScoreTrend: 12,
      tags: ["Enterprise"],
      isIndividual: false
    },
    {
      id: "cust-002",
      name: "Skyline Properties",
      contactPerson: "Alice Bennett",
      email: "a.bennett@skyline.com",
      phone: "(555) 234-5678",
      address: "456 Tower Ave",
      city: "Chicago",
      state: "IL",
      status: "crucial",
      healthScore: 65,
      healthScoreTrend: -8,
      totalSpend: 15600000,
      ltv: 1.56,
      tags: ["Real Estate"],
      isIndividual: false
    },
    {
      id: "cust-003",
      name: "Skyline Properties",
      contactPerson: "Marcus Wong",
      email: "m.wong@skyline.com",
      phone: "(555) 234-5679",
      address: "456 Tower Ave",
      city: "Chicago",
      state: "IL",
      status: "crucial",
      healthScore: 65,
      healthScoreTrend: -8,
      tags: ["Real Estate"],
      isIndividual: false
    },
    {
      id: "cust-004",
      name: "",
      contactPerson: "Sarah Johnson",
      email: "s.johnson@gmail.com",
      phone: "(555) 345-6789",
      address: "789 Market St",
      city: "Boston",
      state: "MA",
      status: "urgent",
      healthScore: 45,
      healthScoreTrend: -15,
      totalSpend: 890000,
      ltv: 0.89,
      tags: ["Individual"],
      isIndividual: true
    },
    {
      id: "cust-005",
      name: "Fresh Foods Market",
      contactPerson: "Michael Brown",
      email: "m.brown@freshfoods.com",
      phone: "(555) 345-6790",
      address: "789 Market St",
      city: "Boston",
      state: "MA",
      status: "urgent",
      healthScore: 45,
      healthScoreTrend: -15,
      tags: ["Retail", "Food"],
      isIndividual: false
    },
    {
      id: "cust-006",
      name: "Cloud Solutions Inc",
      contactPerson: "Jessica Lee",
      email: "j.lee@cloudsol.com",
      phone: "(555) 456-7890",
      address: "321 Tech Blvd",
      city: "San Francisco",
      state: "CA",
      status: "none",
      healthScore: 92,
      healthScoreTrend: 5,
      tags: ["Technology", "SaaS"],
      isIndividual: false
    },
    {
      id: "cust-007",
      name: "Cloud Solutions Inc",
      contactPerson: "Ryan Martinez",
      email: "r.martinez@cloudsol.com",
      phone: "(555) 456-7891",
      address: "321 Tech Blvd",
      city: "San Francisco",
      state: "CA",
      status: "none",
      healthScore: 92,
      healthScoreTrend: 5,
      tags: ["Technology", "SaaS"],
      isIndividual: false
    },
    {
      id: "cust-008",
      name: "Metro Healthcare",
      contactPerson: "David Wilson",
      email: "d.wilson@metrohc.com",
      phone: "(555) 567-8901",
      address: "567 Hospital Drive",
      city: "Houston",
      state: "TX",
      status: "none",
      healthScore: 78,
      healthScoreTrend: 3,
      tags: ["Healthcare"],
      isIndividual: false
    },
    {
      id: "cust-009",
      name: "Metro Healthcare",
      contactPerson: "Emily Chen",
      email: "e.chen@metrohc.com",
      phone: "(555) 567-8902",
      address: "567 Hospital Drive",
      city: "Houston",
      state: "TX",
      status: "none",
      healthScore: 78,
      healthScoreTrend: 3,
      tags: ["Healthcare"],
      isIndividual: false
    },
    {
      id: "cust-010",
      name: "First National Bank",
      contactPerson: "William Taylor",
      email: "w.taylor@fnbank.com",
      phone: "(555) 678-9012",
      address: "890 Financial Ave",
      city: "Charlotte",
      state: "NC",
      status: "crucial",
      healthScore: 71,
      healthScoreTrend: -6,
      tags: ["Finance", "Banking"],
      isIndividual: false
    },
    {
      id: "cust-011",
      name: "First National Bank",
      contactPerson: "Sofia Rodriguez",
      email: "s.rodriguez@fnbank.com",
      phone: "(555) 678-9013",
      address: "890 Financial Ave",
      city: "Charlotte",
      state: "NC",
      status: "crucial",
      healthScore: 71,
      healthScoreTrend: -6,
      tags: ["Finance", "Banking"],
      isIndividual: false
    },
    {
      id: "cust-012",
      name: "Modern Architects Group",
      contactPerson: "Andrew Kim",
      email: "a.kim@modernarch.com",
      phone: "(555) 789-0123",
      address: "432 Design Street",
      city: "Seattle",
      state: "WA",
      status: "none",
      healthScore: 88,
      healthScoreTrend: 7,
      tags: ["Architecture", "Design"],
      isIndividual: false
    },
    {
      id: "cust-013",
      name: "Modern Architects Group",
      contactPerson: "Laura Thompson",
      email: "l.thompson@modernarch.com",
      phone: "(555) 789-0124",
      address: "432 Design Street",
      city: "Seattle",
      state: "WA",
      status: "none",
      healthScore: 88,
      healthScoreTrend: 7,
      tags: ["Architecture", "Design"],
      isIndividual: false
    },
    {
      id: "cust-014",
      name: "Green Valley Hotels",
      contactPerson: "Christopher Davis",
      email: "c.davis@gvhotels.com",
      phone: "(555) 890-1234",
      address: "765 Resort Way",
      city: "Miami",
      state: "FL",
      status: "urgent",
      healthScore: 52,
      healthScoreTrend: -12,
      tags: ["Hospitality"],
      isIndividual: false
    },
    {
      id: "cust-015",
      name: "Green Valley Hotels",
      contactPerson: "Michelle Park",
      email: "m.park@gvhotels.com",
      phone: "(555) 890-1235",
      address: "765 Resort Way",
      city: "Miami",
      state: "FL",
      status: "urgent",
      healthScore: 52,
      healthScoreTrend: -12,
      tags: ["Hospitality"],
      isIndividual: false
    },
    {
      id: "cust-016",
      name: "",
      contactPerson: "Robert White",
      email: "r.white@gmail.com",
      phone: "(555) 901-2345",
      address: "543 Campus Circle",
      city: "Atlanta",
      state: "GA",
      status: "none",
      healthScore: 95,
      healthScoreTrend: 8,
      totalSpend: 1200000,
      ltv: 1.2,
      tags: ["Individual"],
      isIndividual: true
    },
    {
      id: "cust-017",
      name: "Elite Education Center",
      contactPerson: "Jennifer Lee",
      email: "j.lee@eliteedu.com",
      phone: "(555) 901-2346",
      address: "543 Campus Circle",
      city: "Atlanta",
      state: "GA",
      status: "none",
      healthScore: 95,
      healthScoreTrend: 8,
      tags: ["Education"],
      isIndividual: false
    },
    {
      id: "cust-018",
      name: "Pacific Logistics",
      contactPerson: "Thomas Garcia",
      email: "t.garcia@paclog.com",
      phone: "(555) 012-3456",
      address: "876 Harbor Road",
      city: "Los Angeles",
      state: "CA",
      status: "crucial",
      healthScore: 68,
      healthScoreTrend: -5,
      tags: ["Logistics", "Transportation"],
      isIndividual: false
    },
    {
      id: "cust-019",
      name: "Pacific Logistics",
      contactPerson: "Rachel Kim",
      email: "r.kim@paclog.com",
      phone: "(555) 012-3457",
      address: "876 Harbor Road",
      city: "Los Angeles",
      state: "CA",
      status: "crucial",
      healthScore: 68,
      healthScoreTrend: -5,
      tags: ["Logistics", "Transportation"],
      isIndividual: false
    },
    {
      id: "cust-020",
      name: "Innovative Research Labs",
      contactPerson: "Daniel Smith",
      email: "d.smith@irlabs.com",
      phone: "(555) 123-4567",
      address: "234 Science Park",
      city: "Cambridge",
      state: "MA",
      status: "none",
      healthScore: 89,
      healthScoreTrend: 6,
      totalSpend: 18700000,
      ltv: 1.87,
      tags: ["Research", "Biotech"],
      isIndividual: false
    },
    {
      id: "cust-021",
      name: "Innovative Research Labs",
      contactPerson: "Amanda Chen",
      email: "a.chen@irlabs.com",
      phone: "(555) 123-4568",
      address: "234 Science Park",
      city: "Cambridge",
      state: "MA",
      status: "none",
      healthScore: 89,
      healthScoreTrend: 6,
      totalSpend: 18700000,
      ltv: 1.87,
      tags: ["Research", "Biotech"],
      isIndividual: false
    }
  ])

  // Filter customers based on search query and customer filter
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())

    // For now, we'll just return true for the customer filter since we don't have the assigned customer data
    const matchesCustomerFilter = selectedCustomerFilter === "all" || true

    return matchesSearch && matchesCustomerFilter
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

  const getStatusBadge = (status: string) => {
    const getTooltipContent = () => {
      switch (status) {
        case "urgent":
          return "Missing follow-up after critical meeting. Action required within 24h."
        case "crucial":
          return "Multiple overdue invoices pending. Review and update payment status."
        case "none":
          return "Regular monitoring. Schedule next check-in."
        case "inactive":
          return "No activity in past 90 days. Consider reengagement strategy."
        default:
          return ""
      }
    }

    const getBadgeColor = () => {
      switch (status) {
        case "urgent":
          return "bg-red-100 hover:bg-red-200/70 text-red-800 border-red-200"
        case "crucial":
          return "bg-yellow-100 hover:bg-yellow-200/70 text-yellow-800 border-yellow-200"
        case "none":
          return "bg-green-100 hover:bg-green-200/70 text-green-800 border-green-200"
        case "inactive":
          return "bg-gray-100 hover:bg-gray-200/70 text-gray-800 border-gray-200"
        default:
          return "bg-gray-100 hover:bg-gray-200/70 text-gray-800 border-gray-200"
      }
    }

    const getStatusLabel = () => {
      switch (status) {
        case "urgent":
          return "High"
        case "crucial":
          return "Medium"
        case "none":
          return "Low"
        case "inactive":
          return "Inactive"
        default:
          return status
      }
    }

    const getDots = () => {
      switch (status) {
        case "urgent":
          return (
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-red-500" />
            </div>
          )
        case "crucial":
          return (
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full border border-yellow-500" />
            </div>
          )
        case "none":
          return (
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div className="w-2 h-2 rounded-full border border-green-500" />
              <div className="w-2 h-2 rounded-full border border-green-500" />
            </div>
          )
        case "inactive":
          return (
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full border border-gray-500" />
              <div className="w-2 h-2 rounded-full border border-gray-500" />
              <div className="w-2 h-2 rounded-full border border-gray-500" />
            </div>
          )
        default:
          return null
      }
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge className={cn("inline-flex items-center gap-2 transition-colors", getBadgeColor())}>
              <span>{getStatusLabel()}</span>
              {getDots()}
            </Badge>
          </TooltipTrigger>
          <TooltipWithGlow>
            <div className="flex items-start gap-2 w-[300px]">
              <Sparkles className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-sm font-semibold text-gray-900">AI Insight:</span>
                <div className="text-sm text-gray-600">{getTooltipContent()}</div>
              </div>
            </div>
          </TooltipWithGlow>
        </Tooltip>
      </TooltipProvider>
    )
  }

  const renderHealthScore = (score: number, trend: number) => {
    const changePercent = Math.floor(Math.random() * 31) + 5;
    const trendTooltip = trend > 0 
      ? `Increased ${changePercent}% in last 14 days`
      : `Decreased ${changePercent}% in last 14 days`;

    return (
      <div className="flex items-center gap-2">
        <span className="font-medium text-[14px]">{score}%</span>
        <Progress value={score} className="w-[80px] h-[8px] [&>.bg-primary]:bg-[#1E40AF] [&>.bg-primary]:!opacity-100 bg-[#1E40AF]/20" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {trend > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </TooltipTrigger>
            <TooltipContent className="py-2 px-3">
              <p className="text-sm">{trendTooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }

  // Format currency in millions
  const formatMillions = (value: number | undefined): string => {
    if (!value) return '0';
    return (value / 1000000).toFixed(2);
  }

  // Render customer list
  const renderCustomerList = (customers: typeof filteredCustomers) => {
    // Get unique companies
    const getUniqueCompanies = () => {
      const companies = customers.filter(c => !c.isIndividual && c.name);
      const uniqueCompanyNames = Array.from(new Set(companies.map(c => c.name)));
      return uniqueCompanyNames.map(name => {
        const company = companies.find(c => c.name === name);
        if (!company) return null;
        return {
          id: company.id,
          name: company.name,
          mainContact: company.contactPerson,
          totalSpend: company.totalSpend,
          ltv: company.ltv,
          city: company.city,
          state: company.state,
          tags: company.tags,
          status: company.status,
          healthScore: company.healthScore,
          healthScoreTrend: company.healthScoreTrend
        };
      }).filter((company): company is NonNullable<typeof company> => company !== null);
    }

    return (
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="py-3 px-4 text-left font-medium">
                {viewType === "customers" ? "Name" : "Company"}
              </th>
              <th className="py-3 px-4 text-left font-medium">
                {viewType === "customers" ? "Contact" : "Main Contact"}
              </th>
              {viewType === "companies" && (
                <th className="py-3 px-4 text-left font-medium">Lifetime Value</th>
              )}
              <th className="py-3 px-4 text-left font-medium">Tags</th>
              <th className="py-3 px-4 text-left font-medium">
                <div className="flex items-center gap-2">
                  Priority
                  <InsightsConfigDialog>
                    <Wrench className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
                  </InsightsConfigDialog>
                </div>
              </th>
              <th className="py-3 px-4 text-left font-medium">Health Score</th>
              <th className="py-3 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {viewType === "customers" ? (
              customers.map((customer) => (
                <tr 
                  key={customer.id} 
                  className="border-b hover:bg-muted/50 hover:cursor-pointer"
                  onClick={(e) => {
                    // Don't navigate if clicking on the dropdown menu
                    if ((e.target as HTMLElement).closest('.dropdown-trigger')) return;
                    window.location.href = '/existing-contact';
                  }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-4">
                      {customer.isIndividual ? (
                        <div className="h-5 w-5 rounded-sm bg-gray-100 flex items-center justify-center">
                          <User className="h-3 w-3 text-gray-500" />
                        </div>
                      ) : (
                        getCompanyIcon(customer.name)
                      )}
                      <div>
                        <div className="font-medium text-base">
                          {customer.contactPerson}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {customer.isIndividual ? (
                            <div className="flex items-center gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger className="cursor-default">
                                    <span>Total spent ${formatMillions(customer.totalSpend)}M</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    This customer has spent a total of ${formatMillions(customer.totalSpend)}M
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              {customer.ltv && customer.ltv > 1.5 && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger className="cursor-default">
                                      <span className="text-green-600 font-semibold">(Top 10%)</span>
                                    </TooltipTrigger>
                                    <TooltipWithGlow>
                                      <div className="flex items-start gap-2 w-[300px]">
                                        <Sparkles className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                                        <div>
                                          <span className="text-sm font-semibold text-gray-900">AI Insight:</span>
                                          <div className="text-sm text-gray-600">
                                            Customer's lifetime value is {customer.ltv}x the average, indicating strong long-term potential.
                                          </div>
                                        </div>
                                      </div>
                                    </TooltipWithGlow>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <span>{customer.name}</span>
                              <span className="text-muted-foreground">|</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger className="cursor-default">
                                    <span>${formatMillions(customer.totalSpend)}M</span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    This company has spent a total of ${formatMillions(customer.totalSpend)}M
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              {customer.ltv && customer.ltv > 1.5 && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger className="cursor-default">
                                      <span className="text-green-600 font-semibold ml-2">(Top 10%)</span>
                                    </TooltipTrigger>
                                    <TooltipWithGlow>
                                      <div className="flex items-start gap-2 w-[300px]">
                                        <Sparkles className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                                        <div>
                                          <span className="text-sm font-semibold text-gray-900">AI Insight:</span>
                                          <div className="text-sm text-gray-600">
                                            Company's lifetime value is {customer.ltv}x the average, showing exceptional partnership potential.
                                          </div>
                                        </div>
                                      </div>
                                    </TooltipWithGlow>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">{customer.email}</div>
                    <div className="text-xs text-muted-foreground">{customer.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-2">
                      {customer.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="font-medium bg-white text-gray-500 border-gray-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(customer.status)}
                  </td>
                  <td className="py-3 px-4">
                    {renderHealthScore(customer.healthScore, customer.healthScoreTrend)}
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
                  className="border-b hover:bg-muted/50 hover:cursor-pointer"
                  onClick={(e) => {
                    // Don't navigate if clicking on the dropdown menu
                    if ((e.target as HTMLElement).closest('.dropdown-trigger')) return;
                    window.location.href = '/existing-company';
                  }}
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
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="cursor-default">
                            <span className="text-[14px]">${formatMillions(company.totalSpend)}M</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            This company has spent a total of ${formatMillions(company.totalSpend)}M
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      {company.ltv && company.ltv > 1.5 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="cursor-default">
                              <span className="text-green-600 font-semibold text-xs">(Top 10%)</span>
                            </TooltipTrigger>
                            <TooltipWithGlow>
                              <div className="flex items-start gap-2 w-[300px]">
                                <Sparkles className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                                <div>
                                  <span className="text-sm font-semibold text-gray-900">AI Insight:</span>
                                  <div className="text-sm text-gray-600">
                                    Company's lifetime value is {company.ltv}x the average, showing exceptional partnership potential.
                                  </div>
                                </div>
                              </div>
                            </TooltipWithGlow>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-2">
                      {company.tags.slice(0, 1).map((tag) => (
                        <Badge key={tag} variant="outline" className="font-medium bg-white text-gray-500 border-gray-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(company.status)}
                  </td>
                  <td className="py-3 px-4">
                    {renderHealthScore(company.healthScore, company.healthScoreTrend)}
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
      "Acme Corporation": "https://www.acme.com/favicon.ico",
      "CBRE Properties": "https://www.cbre.com/favicon.ico",
      "Whole Foods Market": "https://www.wholefoodsmarket.com/favicon.ico",
      "Salesforce": "https://www.salesforce.com/favicon.ico",
      "UnitedHealth Group": "https://www.unitedhealthgroup.com/favicon.ico",
      "JPMorgan Chase": "https://www.chase.com/favicon.ico",
      "Gensler": "https://www.gensler.com/favicon.ico",
      "Hilton Hotels": "https://www.hilton.com/favicon.ico",
      "Kaplan Education": "https://kaplan.com/favicon.ico",
      "FedEx Logistics": "https://www.fedex.com/favicon.ico",
      "Thermo Fisher Scientific": "https://www.thermofisher.com/favicon.ico"
    }

    // Map old company names to new ones for data consistency
    const companyNameMap: { [key: string]: string } = {
      "Acme Corp": "Acme Corporation",
      "Skyline Properties": "CBRE Properties",
      "Fresh Foods Market": "Whole Foods Market",
      "Cloud Solutions Inc": "Salesforce",
      "Metro Healthcare": "UnitedHealth Group",
      "First National Bank": "JPMorgan Chase",
      "Modern Architects Group": "Gensler",
      "Green Valley Hotels": "Hilton Hotels",
      "Elite Education Center": "Kaplan Education",
      "Pacific Logistics": "FedEx Logistics",
      "Innovative Research Labs": "Thermo Fisher Scientific"
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
        {companyName ? (
          <Building2 className="h-3 w-3 text-gray-500" />
        ) : (
          <User className="h-3 w-3 text-gray-500" />
        )}
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCustomerFilter} onValueChange={setSelectedCustomerFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Customers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="assigned">Assigned to Me</SelectItem>
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

      <Tabs defaultValue="customers" className="w-full" onValueChange={(value) => setViewType(value as "customers" | "companies")}>
        <TabsList>
          <TabsTrigger value="customers">Contacts</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-baseline gap-1.5">
                <CardTitle className="font-[550] text-[20px]">All Contacts</CardTitle>
                <span className="text-sm text-muted-foreground">({filteredCustomers.length})</span>
              </div>
            </CardHeader>
            <CardContent className="pt-2">{renderCustomerList(filteredCustomers)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-baseline gap-1.5">
                <CardTitle className="font-[550] text-[20px]">All Companies</CardTitle>
                <span className="text-sm text-muted-foreground">
                  ({filteredCustomers.filter(c => !c.isIndividual).length})
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              {renderCustomerList(filteredCustomers.filter(c => !c.isIndividual))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <AddCustomerModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal}
        onSubmit={async (values, createAnother) => {
          // Here you would typically make an API call to create the customer
          console.log('Creating customer:', values)
          // For now, we'll just log the values
          return Promise.resolve()
        }}
      />
    </div>
  )
} 