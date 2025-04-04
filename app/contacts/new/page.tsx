"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, X } from "lucide-react"
import Link from "next/link"

export default function NewContactPage() {
  const [contactType, setContactType] = useState<string[]>(["customer"])

  const handleTypeChange = (type: string) => {
    if (contactType.includes(type)) {
      setContactType(contactType.filter((t) => t !== type))
    } else {
      setContactType([...contactType, type])
    }
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
          <h1 className="text-2xl font-bold">Add New Contact</h1>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/contacts">
            <Button variant="outline" className="gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </Link>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Contact
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Basic Details</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="additional">Additional Info</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
              <CardDescription>Enter the basic information for this contact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Contact Name/Company</Label>
                    <Input id="name" placeholder="Enter name or company" />
                  </div>

                  <div className="space-y-2">
                    <Label>Contact Type</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="customer"
                          checked={contactType.includes("customer")}
                          onCheckedChange={() => handleTypeChange("customer")}
                        />
                        <Label htmlFor="customer" className="font-normal">
                          Customer
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="vendor"
                          checked={contactType.includes("vendor")}
                          onCheckedChange={() => handleTypeChange("vendor")}
                        />
                        <Label htmlFor="vendor" className="font-normal">
                          Vendor
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="subcontractor"
                          checked={contactType.includes("subcontractor")}
                          onCheckedChange={() => handleTypeChange("subcontractor")}
                        />
                        <Label htmlFor="subcontractor" className="font-normal">
                          Subcontractor
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Primary Contact Person</Label>
                    <Input id="contactPerson" placeholder="Enter contact person name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" placeholder="Enter website URL" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Primary Address</Label>
                    <Input id="address" placeholder="Street address" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="State" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input id="zipCode" placeholder="Zip code" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" placeholder="Country" defaultValue="United States" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Address Type</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="billing" defaultChecked />
                        <Label htmlFor="billing" className="font-normal">
                          Billing
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="shipping" defaultChecked />
                        <Label htmlFor="shipping" className="font-normal">
                          Shipping
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="service" defaultChecked />
                        <Label htmlFor="service" className="font-normal">
                          Service
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" placeholder="Enter any additional notes about this contact" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Additional Locations</CardTitle>
              <CardDescription>Add multiple locations for this contact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>You can add additional locations after creating the contact</p>
                <p className="text-sm mt-1">The primary address will be saved as the first location</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="additional" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Enter additional details based on contact type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactType.includes("customer") && (
                  <div className="space-y-4 border rounded-lg p-4">
                    <h3 className="font-medium">Customer Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="customerType">Customer Type</Label>
                      <Select>
                        <SelectTrigger id="customerType">
                          <SelectValue placeholder="Select customer type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="government">Government</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxExempt">Tax Status</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="taxExempt" />
                        <Label htmlFor="taxExempt" className="font-normal">
                          Tax Exempt
                        </Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxId">Tax ID (if exempt)</Label>
                      <Input id="taxId" placeholder="Enter tax ID" />
                    </div>
                  </div>
                )}

                {contactType.includes("vendor") && (
                  <div className="space-y-4 border rounded-lg p-4">
                    <h3 className="font-medium">Vendor Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="vendorCategory">Vendor Category</Label>
                      <Select>
                        <SelectTrigger id="vendorCategory">
                          <SelectValue placeholder="Select vendor category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="parts">Parts Supplier</SelectItem>
                          <SelectItem value="equipment">Equipment Supplier</SelectItem>
                          <SelectItem value="materials">Materials Supplier</SelectItem>
                          <SelectItem value="services">Service Provider</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentTerms">Payment Terms</Label>
                      <Select>
                        <SelectTrigger id="paymentTerms">
                          <SelectValue placeholder="Select payment terms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="net15">Net 15</SelectItem>
                          <SelectItem value="net30">Net 30</SelectItem>
                          <SelectItem value="net45">Net 45</SelectItem>
                          <SelectItem value="net60">Net 60</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vendorNotes">Vendor Notes</Label>
                      <Textarea id="vendorNotes" placeholder="Enter vendor-specific notes" />
                    </div>
                  </div>
                )}

                {contactType.includes("subcontractor") && (
                  <div className="space-y-4 border rounded-lg p-4">
                    <h3 className="font-medium">Subcontractor Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Specialty</Label>
                      <Select>
                        <SelectTrigger id="specialty">
                          <SelectValue placeholder="Select specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plumbing">Plumbing</SelectItem>
                          <SelectItem value="electrical">Electrical</SelectItem>
                          <SelectItem value="hvac">HVAC</SelectItem>
                          <SelectItem value="carpentry">Carpentry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insuranceInfo">Insurance Information</Label>
                      <Textarea id="insuranceInfo" placeholder="Enter insurance details" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rateInfo">Rate Information</Label>
                      <Textarea id="rateInfo" placeholder="Enter rate details" />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

