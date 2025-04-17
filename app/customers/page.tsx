"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddCustomerModal } from "@/components/customers/add-customer-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TooltipWithGlow } from "@/components/ui/tooltip-with-glow"
import { Building, FileText, Mail, MoreHorizontal, Phone, Plus, Sparkles, Star, Trash2, User, UserPlus } from "lucide-react"

export default function CustomersPage() {
  // ... rest of the code remains the same until the tag display part ...

  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full md:w-[200px]"
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="crucial">Crucial</option>
            <option value="none">None</option>
          </select>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
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
            <CardContent className="pt-2">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Name</th>
                      <th className="py-3 px-4 text-left font-medium">Contact</th>
                      <th className="py-3 px-4 text-left font-medium">Location</th>
                      <th className="py-3 px-4 text-left font-medium">Tags</th>
                      <th className="py-3 px-4 text-left font-medium">Priority</th>
                      <th className="py-3 px-4 text-left font-medium">Health Score</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-b hover:bg-muted/50 cursor-pointer">
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
                              {!customer.isIndividual && (
                                <div className="text-sm text-muted-foreground">
                                  {customer.name}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">{customer.email}</div>
                          <div className="text-sm text-muted-foreground">{customer.phone}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            {customer.city}, {customer.state}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-2">
                            {customer.tags && customer.tags.length > 0 && (
                              <Badge variant="outline" className="font-medium bg-white text-gray-500 border-gray-200">
                                {customer.tags[0]}
                              </Badge>
                            )}
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
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
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
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Company</th>
                      <th className="py-3 px-4 text-left font-medium">Main Contact</th>
                      <th className="py-3 px-4 text-left font-medium">Location</th>
                      <th className="py-3 px-4 text-left font-medium">Total Spent</th>
                      <th className="py-3 px-4 text-left font-medium">Tags</th>
                      <th className="py-3 px-4 text-left font-medium">Priority</th>
                      <th className="py-3 px-4 text-left font-medium">Health Score</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getUniqueCompanies().map((company) => (
                      <tr key={company.id} className="border-b hover:bg-muted/50 cursor-pointer">
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
                            {company.tags && company.tags.length > 0 && (
                              <Badge variant="outline" className="font-medium bg-white text-gray-500 border-gray-200">
                                {company.tags[0]}
                              </Badge>
                            )}
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
                    ))}
                  </tbody>
                </table>
              </div>
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