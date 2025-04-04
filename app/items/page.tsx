"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Plus,
  SlidersHorizontal,
  Package,
  Wrench,
  Grid,
  List,
  MoreHorizontal,
  AlertTriangle,
  ArrowUpDown,
  Download,
  Upload,
  Truck,
  BarChart3,
  Tag,
  DollarSign,
  Clipboard,
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function ItemsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [showAddItemDialog, setShowAddItemDialog] = useState(false)

  // Mock items data
  const items = [
    {
      id: "ITM-001",
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
      description: "High-efficiency HVAC filter for commercial systems. 16x20x1 inch. MERV 13 rating.",
      usedIn: ["HVAC Maintenance", "HVAC Installation"],
    },
    {
      id: "ITM-002",
      name: "Refrigerant R-410A",
      sku: "REF-410A-10",
      category: "Materials",
      subcategory: "Refrigerants",
      stockLevel: 8,
      lowStockThreshold: 10,
      unitPrice: 89.5,
      location: "Main Warehouse",
      manufacturer: "CoolChem",
      lastOrdered: "Feb 22, 2023",
      image: null,
      description: "R-410A refrigerant, 10lb cylinder. For use in modern HVAC systems.",
      usedIn: ["HVAC Repair", "HVAC Maintenance"],
    },
    {
      id: "ITM-003",
      name: "Digital Multimeter",
      sku: "TOOL-DMM-01",
      category: "Equipment",
      subcategory: "Testing Equipment",
      stockLevel: 15,
      lowStockThreshold: 5,
      unitPrice: 149.99,
      location: "Tool Crib",
      manufacturer: "TechTest",
      lastOrdered: "Jan 15, 2023",
      image: null,
      description:
        "Professional digital multimeter with temperature probe. Measures voltage, current, resistance, and temperature.",
      usedIn: ["Electrical", "HVAC Diagnostics"],
    },
    {
      id: "ITM-004",
      name: "Condenser Fan Motor",
      sku: "MTR-CF-230",
      category: "Parts",
      subcategory: "Motors",
      stockLevel: 6,
      lowStockThreshold: 5,
      unitPrice: 125.75,
      location: "Main Warehouse",
      manufacturer: "MotorWorks",
      lastOrdered: "Mar 5, 2023",
      image: null,
      description: "230V condenser fan motor for commercial HVAC units. 1/4 HP, 1075 RPM.",
      usedIn: ["HVAC Repair", "HVAC Installation"],
    },
    {
      id: "ITM-005",
      name: "Copper Tubing - 3/4 inch",
      sku: "PPE-CU-075",
      category: "Materials",
      subcategory: "Piping",
      stockLevel: 120,
      lowStockThreshold: 50,
      unitPrice: 3.75,
      location: "Main Warehouse",
      manufacturer: "CopperTech",
      lastOrdered: "Feb 28, 2023",
      image: null,
      description: "3/4 inch copper tubing for refrigeration and HVAC applications. Sold by the foot.",
      usedIn: ["HVAC Installation", "Refrigeration"],
    },
    {
      id: "ITM-006",
      name: "Pipe Wrench Set",
      sku: "TOOL-PW-SET",
      category: "Equipment",
      subcategory: "Hand Tools",
      stockLevel: 8,
      lowStockThreshold: 3,
      unitPrice: 89.99,
      location: "Tool Crib",
      manufacturer: "ProTools",
      lastOrdered: "Dec 10, 2022",
      image: null,
      description: 'Professional pipe wrench set including 8", 10", and 14" wrenches.',
      usedIn: ["Plumbing", "HVAC Installation"],
    },
    {
      id: "ITM-007",
      name: "Capacitor - 45/5 MFD",
      sku: "ELE-CAP-455",
      category: "Parts",
      subcategory: "Electrical Components",
      stockLevel: 23,
      lowStockThreshold: 10,
      unitPrice: 18.5,
      location: "Electrical Cabinet",
      manufacturer: "ElectroParts",
      lastOrdered: "Mar 1, 2023",
      image: null,
      description: "Dual run capacitor, 45/5 MFD, 440V. For HVAC compressor and fan motors.",
      usedIn: ["HVAC Repair", "Electrical"],
    },
    {
      id: "ITM-008",
      name: "Refrigerant Leak Detector",
      sku: "TOOL-RLD-01",
      category: "Equipment",
      subcategory: "Testing Equipment",
      stockLevel: 4,
      lowStockThreshold: 2,
      unitPrice: 215.0,
      location: "Tool Crib",
      manufacturer: "TechTest",
      lastOrdered: "Jan 20, 2023",
      image: null,
      description:
        "Electronic refrigerant leak detector with visual and audible alerts. Detects all common refrigerants.",
      usedIn: ["HVAC Diagnostics", "Refrigeration"],
    },
    {
      id: "ITM-009",
      name: "Thermostat - Programmable",
      sku: "CTRL-THERM-PRG",
      category: "Parts",
      subcategory: "Controls",
      stockLevel: 12,
      lowStockThreshold: 5,
      unitPrice: 65.99,
      location: "Main Warehouse",
      manufacturer: "ClimateControl",
      lastOrdered: "Feb 15, 2023",
      image: null,
      description: "Programmable digital thermostat with 7-day scheduling. Compatible with most HVAC systems.",
      usedIn: ["HVAC Installation", "HVAC Repair"],
    },
    {
      id: "ITM-010",
      name: "Air Compressor - Portable",
      sku: "TOOL-COMP-PORT",
      category: "Equipment",
      subcategory: "Power Tools",
      stockLevel: 2,
      lowStockThreshold: 1,
      unitPrice: 349.99,
      location: "Tool Crib",
      manufacturer: "PowerTools",
      lastOrdered: "Dec 5, 2022",
      image: null,
      description: "Portable air compressor, 2HP, 4 gallon tank. 120V power with 150 PSI max pressure.",
      usedIn: ["HVAC Installation", "General Use"],
    },
    {
      id: "ITM-011",
      name: "PVC Pipe - 2 inch",
      sku: "PPE-PVC-2",
      category: "Materials",
      subcategory: "Piping",
      stockLevel: 85,
      lowStockThreshold: 30,
      unitPrice: 2.25,
      location: "Main Warehouse",
      manufacturer: "PlastiPipe",
      lastOrdered: "Mar 8, 2023",
      image: null,
      description: "2-inch schedule 40 PVC pipe for drainage and venting applications. Sold by the foot.",
      usedIn: ["Plumbing", "Drainage"],
    },
    {
      id: "ITM-012",
      name: "Circuit Breaker - 20A",
      sku: "ELE-CB-20A",
      category: "Parts",
      subcategory: "Electrical Components",
      stockLevel: 18,
      lowStockThreshold: 8,
      unitPrice: 12.75,
      location: "Electrical Cabinet",
      manufacturer: "ElectroParts",
      lastOrdered: "Feb 20, 2023",
      image: null,
      description: "20 Amp single-pole circuit breaker. Compatible with standard residential panels.",
      usedIn: ["Electrical"],
    },
  ]

  // Filter items based on search query, category, and location
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesLocation = selectedLocation === "all" || item.location === selectedLocation

    return matchesSearch && matchesCategory && matchesLocation
  })

  // Get stock level status
  const getStockLevelStatus = (item) => {
    if (item.stockLevel <= 0) return "out-of-stock"
    if (item.stockLevel <= item.lowStockThreshold) return "low-stock"
    return "in-stock"
  }

  // Get stock level badge
  const getStockLevelBadge = (item) => {
    const status = getStockLevelStatus(item)
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

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Items</h1>
        <p className="text-muted-foreground">Manage inventory, equipment, and materials</p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items..."
              className="w-full pl-8 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="font-medium">Filter by Category</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCategory("all")}>All Categories</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCategory("Parts")}>Parts</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCategory("Equipment")}>Equipment</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCategory("Materials")}>Materials</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-medium">Filter by Location</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedLocation("all")}>All Locations</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedLocation("Main Warehouse")}>Main Warehouse</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedLocation("Tool Crib")}>Tool Crib</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedLocation("Electrical Cabinet")}>
                Electrical Cabinet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
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
          <Dialog open={showAddItemDialog} onOpenChange={setShowAddItemDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
                <DialogDescription>
                  Enter the details for the new inventory item. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input id="name" placeholder="Enter item name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="Enter SKU" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parts">Parts</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="materials">Materials</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Input id="subcategory" placeholder="Enter subcategory" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stockLevel">Stock Level</Label>
                  <Input id="stockLevel" type="number" placeholder="Enter current stock" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                  <Input id="lowStockThreshold" type="number" placeholder="Enter threshold" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitPrice">Unit Price ($)</Label>
                  <Input id="unitPrice" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Warehouse</SelectItem>
                      <SelectItem value="tool">Tool Crib</SelectItem>
                      <SelectItem value="electrical">Electrical Cabinet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input id="manufacturer" placeholder="Enter manufacturer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <Input id="image" type="file" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter item description" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Used In</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hvac-repair" />
                      <Label htmlFor="hvac-repair">HVAC Repair</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hvac-install" />
                      <Label htmlFor="hvac-install">HVAC Installation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="electrical" />
                      <Label htmlFor="electrical">Electrical</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="plumbing" />
                      <Label htmlFor="plumbing">Plumbing</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setShowAddItemDialog(false)}>
                  Add Item
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="parts">Parts</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Items</CardTitle>
              <CardDescription>Showing {filteredItems.length} items in inventory</CardDescription>
            </CardHeader>
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className={getCategoryBadgeColor(item.category)}>
                              {item.category}
                            </Badge>
                            {getStockLevelBadge(item)}
                          </div>
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Tag className="h-3.5 w-3.5" />
                            <span>{item.sku}</span>
                          </div>
                          <p className="text-sm mt-2 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="text-sm">
                              <span className="font-medium">{item.stockLevel}</span> in stock
                            </div>
                            <div className="text-sm font-medium">
                              <DollarSign className="h-3.5 w-3.5 inline-block" />
                              {item.unitPrice.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div className="bg-muted/20 px-4 py-3 flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">Location: {item.location}</div>
                          <div className="flex items-center gap-2">
                            <Link href={`/items/${item.id}`}>
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
                                  <Plus className="h-4 w-4 mr-2" />
                                  Adjust Stock
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Truck className="h-4 w-4 mr-2" />
                                  Order More
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Clipboard className="h-4 w-4 mr-2" />
                                  Assign to Job
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <BarChart3 className="h-4 w-4 mr-2" />
                                  View Usage History
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium">
                          <div className="flex items-center gap-1 cursor-pointer">
                            Item <ArrowUpDown className="h-3.5 w-3.5" />
                          </div>
                        </th>
                        <th className="text-left p-3 text-sm font-medium">SKU</th>
                        <th className="text-left p-3 text-sm font-medium">Category</th>
                        <th className="text-center p-3 text-sm font-medium">Stock</th>
                        <th className="text-right p-3 text-sm font-medium">Price</th>
                        <th className="text-left p-3 text-sm font-medium">Location</th>
                        <th className="text-right p-3 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item) => (
                        <tr key={item.id} className="border-t hover:bg-muted/20">
                          <td className="p-3">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-muted-foreground line-clamp-1">{item.description}</div>
                          </td>
                          <td className="p-3 text-sm">{item.sku}</td>
                          <td className="p-3">
                            <Badge variant="outline" className={getCategoryBadgeColor(item.category)}>
                              {item.category}
                            </Badge>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex flex-col items-center">
                              <span className="font-medium">{item.stockLevel}</span>
                              {getStockLevelBadge(item)}
                            </div>
                          </td>
                          <td className="p-3 text-right font-medium">${item.unitPrice.toFixed(2)}</td>
                          <td className="p-3 text-sm">{item.location}</td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link href={`/items/${item.id}`}>
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
                                    <Plus className="h-4 w-4 mr-2" />
                                    Adjust Stock
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Truck className="h-4 w-4 mr-2" />
                                    Order More
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Clipboard className="h-4 w-4 mr-2" />
                                    Assign to Job
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parts" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Parts</CardTitle>
              <CardDescription>Replacement parts and components</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar content but filtered for parts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems
                  .filter((item) => item.category === "Parts")
                  .map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className={getCategoryBadgeColor(item.category)}>
                              {item.subcategory}
                            </Badge>
                            {getStockLevelBadge(item)}
                          </div>
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Tag className="h-3.5 w-3.5" />
                            <span>{item.sku}</span>
                          </div>
                          <p className="text-sm mt-2 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="text-sm">
                              <span className="font-medium">{item.stockLevel}</span> in stock
                            </div>
                            <div className="text-sm font-medium">
                              <DollarSign className="h-3.5 w-3.5 inline-block" />
                              {item.unitPrice.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div className="bg-muted/20 px-4 py-3 flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">Location: {item.location}</div>
                          <div className="flex items-center gap-2">
                            <Link href={`/items/${item.id}`}>
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
                                  <Plus className="h-4 w-4 mr-2" />
                                  Adjust Stock
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Truck className="h-4 w-4 mr-2" />
                                  Order More
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Clipboard className="h-4 w-4 mr-2" />
                                  Assign to Job
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Equipment</CardTitle>
              <CardDescription>Tools and equipment for technicians</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar content but filtered for equipment */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems
                  .filter((item) => item.category === "Equipment")
                  .map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className={getCategoryBadgeColor(item.category)}>
                              {item.subcategory}
                            </Badge>
                            {getStockLevelBadge(item)}
                          </div>
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Tag className="h-3.5 w-3.5" />
                            <span>{item.sku}</span>
                          </div>
                          <p className="text-sm mt-2 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="text-sm">
                              <span className="font-medium">{item.stockLevel}</span> in stock
                            </div>
                            <div className="text-sm font-medium">
                              <DollarSign className="h-3.5 w-3.5 inline-block" />
                              {item.unitPrice.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div className="bg-muted/20 px-4 py-3 flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">Location: {item.location}</div>
                          <div className="flex items-center gap-2">
                            <Link href={`/items/${item.id}`}>
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
                                  <Plus className="h-4 w-4 mr-2" />
                                  Adjust Stock
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Truck className="h-4 w-4 mr-2" />
                                  Order More
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Clipboard className="h-4 w-4 mr-2" />
                                  Assign to Technician
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Materials</CardTitle>
              <CardDescription>Consumable materials and supplies</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar content but filtered for materials */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems
                  .filter((item) => item.category === "Materials")
                  .map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className={getCategoryBadgeColor(item.category)}>
                              {item.subcategory}
                            </Badge>
                            {getStockLevelBadge(item)}
                          </div>
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Tag className="h-3.5 w-3.5" />
                            <span>{item.sku}</span>
                          </div>
                          <p className="text-sm mt-2 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="text-sm">
                              <span className="font-medium">{item.stockLevel}</span> in stock
                            </div>
                            <div className="text-sm font-medium">
                              <DollarSign className="h-3.5 w-3.5 inline-block" />
                              {item.unitPrice.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div className="bg-muted/20 px-4 py-3 flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">Location: {item.location}</div>
                          <div className="flex items-center gap-2">
                            <Link href={`/items/${item.id}`}>
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
                                  <Plus className="h-4 w-4 mr-2" />
                                  Adjust Stock
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Truck className="h-4 w-4 mr-2" />
                                  Order More
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Clipboard className="h-4 w-4 mr-2" />
                                  Assign to Job
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low-stock" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Low Stock Items</CardTitle>
              <CardDescription>Items that need to be reordered soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium">Item</th>
                      <th className="text-left p-3 text-sm font-medium">SKU</th>
                      <th className="text-center p-3 text-sm font-medium">Current Stock</th>
                      <th className="text-center p-3 text-sm font-medium">Threshold</th>
                      <th className="text-right p-3 text-sm font-medium">Last Ordered</th>
                      <th className="text-right p-3 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems
                      .filter((item) => item.stockLevel <= item.lowStockThreshold)
                      .map((item) => (
                        <tr key={item.id} className="border-t hover:bg-muted/20">
                          <td className="p-3">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {item.category} - {item.subcategory}
                            </div>
                          </td>
                          <td className="p-3 text-sm">{item.sku}</td>
                          <td className="p-3 text-center">
                            <Badge className={item.stockLevel === 0 ? "bg-red-500" : "bg-yellow-500"}>
                              {item.stockLevel}
                            </Badge>
                          </td>
                          <td className="p-3 text-center">{item.lowStockThreshold}</td>
                          <td className="p-3 text-right">{item.lastOrdered}</td>
                          <td className="p-3 text-right">
                            <Button variant="outline" size="sm">
                              <Truck className="h-4 w-4 mr-1" />
                              Order More
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Inventory Alert</h3>
                    <p className="text-sm mt-1">
                      {filteredItems.filter((item) => item.stockLevel <= item.lowStockThreshold).length} items are below
                      their reorder threshold. Consider placing orders soon to avoid stockouts.
                    </p>
                    <Button className="mt-3" variant="outline">
                      <Truck className="h-4 w-4 mr-2" />
                      Generate Purchase Orders
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

