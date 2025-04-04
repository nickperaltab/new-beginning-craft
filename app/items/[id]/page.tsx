"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Edit,
  Package,
  Tag,
  Truck,
  BarChart3,
  Plus,
  Clipboard,
  FileText,
  Wrench,
  MapPin,
  ShoppingCart,
  Printer,
  QrCode,
} from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const [showAdjustStockDialog, setShowAdjustStockDialog] = useState(false)

  // In a real app, you would fetch the item data based on the ID
  const item = {
    id: params.id || "ITM-001",
    name: "HVAC Filter - High Efficiency",
    sku: "FLT-HE-001",
    category: "Parts",
    subcategory: "Filters",
    stockLevel: 42,
    lowStockThreshold: 10,
    unitPrice: 24.99,
    location: "Main Warehouse",
    manufacturer: "AirPure Systems",
    lastOrdered: "Mar 10, 2023",
    image: null,
    description:
      "High-efficiency HVAC filter for commercial systems. 16x20x1 inch. MERV 13 rating. Designed for improved air quality and reduced allergens. Compatible with most commercial HVAC systems.",
    usedIn: ["HVAC Maintenance", "HVAC Installation"],
    specifications: [
      { name: "Dimensions", value: '16" x 20" x 1"' },
      { name: "MERV Rating", value: "13" },
      { name: "Frame Material", value: "Cardboard" },
      { name: "Media Type", value: "Synthetic" },
      { name: "Recommended Change", value: "3 months" },
    ],
    stockHistory: [
      { date: "Mar 10, 2023", change: "+50", reason: "Purchase Order #PO-2023-0089", balance: 50 },
      { date: "Mar 12, 2023", change: "-2", reason: "Work Order #WO-2023-1231", balance: 48 },
      { date: "Mar 15, 2023", change: "-4", reason: "Work Order #WO-2023-1234", balance: 44 },
      { date: "Mar 18, 2023", change: "-2", reason: "Work Order #WO-2023-1236", balance: 42 },
    ],
    usageHistory: [
      { month: "Jan", usage: 12 },
      { month: "Feb", usage: 18 },
      { month: "Mar", usage: 8 },
    ],
    relatedItems: [
      { id: "ITM-005", name: "HVAC Filter - Standard", sku: "FLT-STD-001", category: "Parts", stockLevel: 65 },
      { id: "ITM-008", name: "Filter Replacement Tool", sku: "TOOL-FLT-01", category: "Equipment", stockLevel: 8 },
      { id: "ITM-012", name: "Air Quality Test Kit", sku: "TEST-AQ-01", category: "Equipment", stockLevel: 5 },
    ],
    purchaseOrders: [
      { id: "PO-2023-0089", date: "Mar 5, 2023", quantity: 50, status: "Received", vendor: "AirPure Systems" },
      { id: "PO-2022-0156", date: "Dec 10, 2022", quantity: 100, status: "Received", vendor: "AirPure Systems" },
    ],
  }

  // Get stock level status
  const getStockLevelStatus = () => {
    if (item.stockLevel <= 0) return "out-of-stock"
    if (item.stockLevel <= item.lowStockThreshold) return "low-stock"
    return "in-stock"
  }

  // Get stock level badge
  const getStockLevelBadge = () => {
    const status = getStockLevelStatus()
    switch (status) {
      case "out-of-stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      case "low-stock":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Low Stock
          </Badge>
        )
      case "in-stock":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            In Stock
          </Badge>
        )
      default:
        return null
    }
  }

  // Get category badge color
  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case "Parts":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Equipment":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Materials":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Parts":
        return <Package className="h-5 w-5" />
      case "Equipment":
        return <Wrench className="h-5 w-5" />
      case "Materials":
        return <Package className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/items">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Item Details</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline">
            <QrCode className="h-4 w-4 mr-2" />
            Generate Label
          </Button>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Item
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Item Overview Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 flex flex-col items-center gap-3">
                  <div className="w-full aspect-square bg-muted/20 rounded-lg flex items-center justify-center">
                    <Package className="h-24 w-24 text-muted-foreground/50" />
                  </div>
                  {getStockLevelBadge()}
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Order
                    </Button>
                    <Dialog open={showAdjustStockDialog} onOpenChange={setShowAdjustStockDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          <Plus className="h-4 w-4 mr-1" />
                          Adjust
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Adjust Stock Level</DialogTitle>
                          <DialogDescription>Update the stock level for {item.name}</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label>Current Stock Level</Label>
                            <div className="text-lg font-medium">{item.stockLevel}</div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="adjustment-type">Adjustment Type</Label>
                            <Select defaultValue="add">
                              <SelectTrigger id="adjustment-type">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="add">Add Stock</SelectItem>
                                <SelectItem value="remove">Remove Stock</SelectItem>
                                <SelectItem value="set">Set Exact Value</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input id="quantity" type="number" min="1" defaultValue="1" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="reason">Reason</Label>
                            <Select>
                              <SelectTrigger id="reason">
                                <SelectValue placeholder="Select reason" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="purchase">Purchase Order</SelectItem>
                                <SelectItem value="return">Customer Return</SelectItem>
                                <SelectItem value="job">Job/Work Order</SelectItem>
                                <SelectItem value="count">Inventory Count</SelectItem>
                                <SelectItem value="damage">Damaged/Defective</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Input id="notes" placeholder="Enter additional details" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowAdjustStockDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => setShowAdjustStockDialog(false)}>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={getCategoryBadgeColor(item.category)}>
                      {item.category}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                      {item.subcategory}
                    </Badge>
                  </div>

                  <h2 className="text-2xl font-bold">{item.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <Tag className="h-4 w-4" />
                    <span>{item.sku}</span>
                  </div>

                  <p className="mt-4">{item.description}</p>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Stock Level</div>
                      <div className="text-lg font-medium">{item.stockLevel}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Unit Price</div>
                      <div className="text-lg font-medium">${item.unitPrice.toFixed(2)}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div className="text-lg font-medium">{item.location}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Manufacturer</div>
                      <div className="text-lg font-medium">{item.manufacturer}</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm text-muted-foreground mb-1">Used In</div>
                    <div className="flex flex-wrap gap-2">
                      {item.usedIn.map((use, i) => (
                        <Badge key={i} variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                          {use}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="specifications" className="w-full">
            <TabsList>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="stock-history">Stock History</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="related-items">Related Items</TabsTrigger>
              <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Specifications</CardTitle>
                  <CardDescription>Technical details and specifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        {item.specifications.map((spec, index) => (
                          <tr key={index} className={index > 0 ? "border-t" : ""}>
                            <td className="p-3 font-medium bg-muted/20 w-1/3">{spec.name}</td>
                            <td className="p-3">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stock-history" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Stock History</CardTitle>
                  <CardDescription>Record of stock level changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-3 text-sm font-medium">Date</th>
                          <th className="text-left p-3 text-sm font-medium">Change</th>
                          <th className="text-left p-3 text-sm font-medium">Reason</th>
                          <th className="text-right p-3 text-sm font-medium">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.stockHistory.map((record, index) => (
                          <tr key={index} className="border-t">
                            <td className="p-3">{record.date}</td>
                            <td className="p-3">
                              <span className={record.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                                {record.change}
                              </span>
                            </td>
                            <td className="p-3">{record.reason}</td>
                            <td className="p-3 text-right font-medium">{record.balance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Usage History</CardTitle>
                  <CardDescription>Monthly usage trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end gap-2 mt-4 mb-2 px-4">
                    {item.usageHistory.map((month, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-blue-500 rounded-t-sm"
                          style={{
                            height: `${(month.usage / Math.max(...item.usageHistory.map((m) => m.usage))) * 100}%`,
                          }}
                        ></div>
                        <div className="text-xs font-medium">{month.month}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Total Usage (Last 3 Months)</div>
                      <div className="text-lg font-medium">
                        {item.usageHistory.reduce((sum, month) => sum + month.usage, 0)} units
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Average Monthly Usage</div>
                      <div className="text-lg font-medium">
                        {(
                          item.usageHistory.reduce((sum, month) => sum + month.usage, 0) / item.usageHistory.length
                        ).toFixed(1)}{" "}
                        units
                      </div>
                    </div>
                    <Button variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Detailed Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="related-items" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Related Items</CardTitle>
                  <CardDescription>Items frequently used together</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {item.relatedItems.map((relatedItem, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className={getCategoryBadgeColor(relatedItem.category)}>
                                {relatedItem.category}
                              </Badge>
                              {relatedItem.stockLevel > 0 ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                  In Stock
                                </Badge>
                              ) : (
                                <Badge variant="destructive">Out of Stock</Badge>
                              )}
                            </div>
                            <h3 className="font-medium">{relatedItem.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                              <Tag className="h-3.5 w-3.5" />
                              <span>{relatedItem.sku}</span>
                            </div>
                          </div>
                          <div className="bg-muted/20 px-4 py-3 flex items-center justify-between">
                            <div className="text-sm">
                              <span className="font-medium">{relatedItem.stockLevel}</span> in stock
                            </div>
                            <Link href={`/items/${relatedItem.id}`}>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="purchase-orders" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Purchase Orders</CardTitle>
                  <CardDescription>Purchase history for this item</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-3 text-sm font-medium">PO Number</th>
                          <th className="text-left p-3 text-sm font-medium">Date</th>
                          <th className="text-left p-3 text-sm font-medium">Vendor</th>
                          <th className="text-center p-3 text-sm font-medium">Quantity</th>
                          <th className="text-left p-3 text-sm font-medium">Status</th>
                          <th className="text-right p-3 text-sm font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.purchaseOrders.map((po, index) => (
                          <tr key={index} className="border-t">
                            <td className="p-3 font-medium">{po.id}</td>
                            <td className="p-3">{po.date}</td>
                            <td className="p-3">{po.vendor}</td>
                            <td className="p-3 text-center">{po.quantity}</td>
                            <td className="p-3">
                              <Badge className={po.status === "Received" ? "bg-green-500" : "bg-blue-500"}>
                                {po.status}
                              </Badge>
                            </td>
                            <td className="p-3 text-right">
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button>
                      <Truck className="h-4 w-4 mr-2" />
                      Create Purchase Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          {/* Stock Status Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Stock Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Stock</span>
                  <span className="font-medium">{item.stockLevel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Low Stock Threshold</span>
                  <span className="font-medium">{item.lowStockThreshold}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Stock Level</span>
                    <span className="font-medium">
                      {Math.round((item.stockLevel / (item.lowStockThreshold * 3)) * 100)}%
                    </span>
                  </div>
                  <Progress value={(item.stockLevel / (item.lowStockThreshold * 3)) * 100} className="h-2" />
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Quick Actions</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" className="justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Adjust Stock Level
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Truck className="h-4 w-4 mr-2" />
                      Create Purchase Order
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Clipboard className="h-4 w-4 mr-2" />
                      Assign to Job
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <MapPin className="h-4 w-4 mr-2" />
                      Transfer Location
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Location Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Primary Location</span>
                  <span className="font-medium">{item.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Bin/Shelf</span>
                  <span className="font-medium">A-12-3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Other Locations</span>
                  <span className="font-medium">None</span>
                </div>
                <Separator />
                <Button variant="outline" className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  View All Locations
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reorder Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Reorder Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Preferred Vendor</span>
                  <span className="font-medium">{item.manufacturer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Vendor SKU</span>
                  <span className="font-medium">AP-F1320-HE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Lead Time</span>
                  <span className="font-medium">5-7 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Ordered</span>
                  <span className="font-medium">{item.lastOrdered}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Reorder Quantity</span>
                  <span className="font-medium">50</span>
                </div>
                <Separator />
                <Button className="w-full">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Create Purchase Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

