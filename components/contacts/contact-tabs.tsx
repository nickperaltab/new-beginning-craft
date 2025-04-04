"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  DollarSign,
  FileText,
  MapPin,
  Package,
  Plus,
  Truck,
  Upload,
  User,
  Building,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function ContactTabs({ contact }) {
  return (
    <Tabs defaultValue="locations" className="w-full">
      <TabsList>
        <TabsTrigger value="locations">Locations</TabsTrigger>
        {contact.type.includes("customer") && (
          <>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </>
        )}
        {contact.type.includes("vendor") && (
          <>
            <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
            <TabsTrigger value="items">Supplied Items</TabsTrigger>
          </>
        )}
        {contact.type.includes("subcontractor") && <TabsTrigger value="assignments">Assignments</TabsTrigger>}
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
      </TabsList>

      {/* Locations Tab */}
      <TabsContent value="locations" className="mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Locations</CardTitle>
              <CardDescription>Manage multiple locations for this contact</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contact.locations.map((location) => (
                <div key={location.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{location.name}</h3>
                        {location.isPrimary && (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                            Primary
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          {location.address}
                          <br />
                          {location.city}, {location.state} {location.zipCode}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{location.phone}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {location.locationType.map((type) => (
                          <Badge key={type} variant="outline" className="text-xs py-0 h-5">
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule Visit
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        View History
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Jobs Tab (for customers) */}
      {contact.type.includes("customer") && (
        <TabsContent value="jobs" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Jobs</CardTitle>
                <CardDescription>Jobs and work orders for this customer</CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Job
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contact.recentJobs?.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{job.id}</h3>
                          <Badge
                            className={cn(
                              job.status === "Completed" && "bg-green-500",
                              job.status === "In Progress" && "bg-blue-500",
                              job.status === "Scheduled" && "bg-yellow-500",
                              job.status === "Pending" && "bg-gray-500",
                            )}
                          >
                            {job.status}
                          </Badge>
                        </div>
                        <p className="text-sm">{job.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{job.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link href={`/jobs/${job.id}`}>
                          <Button variant="outline" size="sm">
                            <ArrowRight className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

                {contact.recentJobs?.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Building className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No jobs found for this customer</p>
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Job
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      )}

      {/* Invoices Tab (for customers) */}
      {contact.type.includes("customer") && (
        <TabsContent value="invoices" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>Billing history for this customer</CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Invoice
              </Button>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium">Invoice #</th>
                      <th className="text-left p-3 text-sm font-medium">Date</th>
                      <th className="text-right p-3 text-sm font-medium">Amount</th>
                      <th className="text-left p-3 text-sm font-medium">Status</th>
                      <th className="text-right p-3 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contact.recentInvoices?.map((invoice) => (
                      <tr key={invoice.id} className="border-t hover:bg-muted/20">
                        <td className="p-3 font-medium">{invoice.id}</td>
                        <td className="p-3">{invoice.date}</td>
                        <td className="p-3 text-right">${invoice.amount.toLocaleString()}</td>
                        <td className="p-3">
                          <Badge
                            className={cn(
                              invoice.status === "Paid" && "bg-green-500",
                              invoice.status === "Pending" && "bg-yellow-500",
                              invoice.status === "Overdue" && "bg-red-500",
                            )}
                          >
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-right">
                          <Link href={`/invoices/${invoice.id}`}>
                            <Button variant="outline" size="sm">
                              <ArrowRight className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {contact.recentInvoices?.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <DollarSign className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>No invoices found for this customer</p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Invoice
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      )}

      {/* Purchase Orders Tab (for vendors) */}
      {contact.type.includes("vendor") && (
        <TabsContent value="orders" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Purchase Orders</CardTitle>
                <CardDescription>Orders placed with this vendor</CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Purchase Order
              </Button>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium">PO #</th>
                      <th className="text-left p-3 text-sm font-medium">Date</th>
                      <th className="text-right p-3 text-sm font-medium">Amount</th>
                      <th className="text-left p-3 text-sm font-medium">Status</th>
                      <th className="text-right p-3 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contact.recentOrders?.map((order) => (
                      <tr key={order.id} className="border-t hover:bg-muted/20">
                        <td className="p-3 font-medium">{order.id}</td>
                        <td className="p-3">{order.date}</td>
                        <td className="p-3 text-right">${order.amount.toLocaleString()}</td>
                        <td className="p-3">
                          <Badge
                            className={cn(
                              order.status === "Received" && "bg-green-500",
                              order.status === "Ordered" && "bg-blue-500",
                              order.status === "Pending" && "bg-yellow-500",
                            )}
                          >
                            {order.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-right">
                          <Link href={`/purchase-orders/${order.id}`}>
                            <Button variant="outline" size="sm">
                              <ArrowRight className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {contact.recentOrders?.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Truck className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>No purchase orders found for this vendor</p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Purchase Order
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      )}

      {/* Supplied Items Tab (for vendors) */}
      {contact.type.includes("vendor") && (
        <TabsContent value="items" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Supplied Items</CardTitle>
                <CardDescription>Items supplied by this vendor</CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium">Item</th>
                      <th className="text-left p-3 text-sm font-medium">SKU</th>
                      <th className="text-left p-3 text-sm font-medium">Category</th>
                      <th className="text-right p-3 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contact.suppliedItems?.map((item) => (
                      <tr key={item.id} className="border-t hover:bg-muted/20">
                        <td className="p-3 font-medium">{item.name}</td>
                        <td className="p-3">{item.sku}</td>
                        <td className="p-3">{item.category}</td>
                        <td className="p-3 text-right">
                          <Link href={`/items/${item.id}`}>
                            <Button variant="outline" size="sm">
                              <ArrowRight className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {contact.suppliedItems?.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>No items found for this vendor</p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Item
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      )}

      {/* Assignments Tab (for subcontractors) */}
      {contact.type.includes("subcontractor") && (
        <TabsContent value="assignments" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Job Assignments</CardTitle>
                <CardDescription>Jobs assigned to this subcontractor</CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Assign to Job
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contact.recentSubJobs?.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{job.id}</h3>
                          <Badge
                            className={cn(
                              job.status === "Completed" && "bg-green-500",
                              job.status === "In Progress" && "bg-blue-500",
                              job.status === "Scheduled" && "bg-yellow-500",
                              job.status === "Pending" && "bg-gray-500",
                            )}
                          >
                            {job.status}
                          </Badge>
                        </div>
                        <p className="text-sm">{job.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{job.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link href={`/jobs/${job.id}`}>
                          <Button variant="outline" size="sm">
                            <ArrowRight className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

                {contact.recentSubJobs?.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No jobs assigned to this subcontractor</p>
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Assign to First Job
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      )}

      {/* Documents Tab */}
      <TabsContent value="documents" className="mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Contracts, agreements, and other files</CardDescription>
            </div>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>No documents uploaded yet</p>
              <Button className="mt-4">
                <Upload className="h-4 w-4 mr-2" />
                Upload First Document
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Notes Tab */}
      <TabsContent value="notes" className="mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Notes & Communication</CardTitle>
              <CardDescription>Communication history and notes</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Initial Contact</div>
                  <div className="text-sm text-muted-foreground">Mar 10, 2023</div>
                </div>
                <p className="text-sm">
                  {contact.type.includes("customer")
                    ? "Customer reached out for a quote on HVAC system replacement."
                    : contact.type.includes("vendor")
                      ? "Established vendor relationship for HVAC supplies."
                      : "Subcontractor provided references and certification documents."}
                </p>
              </div>

              <div className="text-center py-4 text-muted-foreground">
                <p>No additional notes found</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

