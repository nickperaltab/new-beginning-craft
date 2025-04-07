"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface CustomerDetails {
  name: string
  attention: string
  address: string
  city: string
  state: string
  zipCode: string
  email: string
  phone: string
}

interface Invoice {
  id: string
  customer: string
  jobId: string
  amount: number
  status: string
  dueDate: string
  issuedDate: string
  description: string
  notes: string
  customerDetails: CustomerDetails
  items: InvoiceItem[]
}

export default function EditInvoicePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  // Mock data - in a real app, fetch this based on the invoice ID
  const initialInvoice: Invoice = {
    id: "INV-2023-001",
    customer: "acme",
    jobId: "job1",
    amount: 12500.00,
    status: "paid",
    dueDate: "2023-04-15",
    issuedDate: "2023-03-15",
    description: "HVAC System Overhaul - Phase 1",
    notes: "Payment received ahead of schedule",
    customerDetails: {
      name: "Acme Corp",
      attention: "John Anderson",
      address: "123 Main St, Suite 101",
      city: "Metropolis",
      state: "NY",
      zipCode: "10001",
      email: "j.anderson@acmecorp.com",
      phone: "(555) 123-4567",
    },
    items: [
      {
        description: "HVAC Unit Replacement",
        quantity: 2,
        unitPrice: 4500.00,
        total: 9000.00,
      },
      {
        description: "Installation Labor",
        quantity: 16,
        unitPrice: 125.00,
        total: 2000.00,
      },
      {
        description: "Ductwork Modifications",
        quantity: 1,
        unitPrice: 1500.00,
        total: 1500.00,
      },
    ],
  }

  const [items, setItems] = useState<InvoiceItem[]>(initialInvoice.items)
  const [notes, setNotes] = useState(initialInvoice.notes)
  const [dueDate, setDueDate] = useState(initialInvoice.dueDate)
  const [selectedCustomer, setSelectedCustomer] = useState(initialInvoice.customer)
  const [selectedJob, setSelectedJob] = useState(initialInvoice.jobId)

  const calculateTotal = (items: InvoiceItem[]) => {
    return items.reduce((sum: number, item: InvoiceItem) => sum + item.quantity * item.unitPrice, 0)
  }

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...items]
    const item = { ...newItems[index], [field]: value }
    
    if (field === "quantity" || field === "unitPrice") {
      item.total = Number(item.quantity) * Number(item.unitPrice)
    }
    
    newItems[index] = item
    setItems(newItems)
  }

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, unitPrice: 0, total: 0 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, make API call here to update invoice
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      router.push(`/invoices/${params.id}`)
    } catch (error) {
      console.error("Failed to update invoice:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const subtotal = calculateTotal(items)
  const tax = 0 // In a real app, calculate based on tax rate
  const total = subtotal + tax

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/invoices/${params.id}`}>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Edit Invoice {params.id}</h1>
            <p className="text-sm text-muted-foreground">
              Make changes to the invoice details below
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push(`/invoices/${params.id}`)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Customer Selection */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Customer</Label>
                    <Select
                      value={selectedCustomer}
                      onValueChange={setSelectedCustomer}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a customer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acme">Acme Corp</SelectItem>
                        <SelectItem value="globex">Globex Corporation</SelectItem>
                        <SelectItem value="soylent">Soylent Corp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Job (Optional)</Label>
                    <Select
                      value={selectedJob}
                      onValueChange={setSelectedJob}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a job" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="job1">JOB-2023-0045</SelectItem>
                        <SelectItem value="job2">JOB-2023-0046</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Items */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Invoice Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="space-y-4">
                    {index > 0 && <Separator />}
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-6 space-y-2">
                        <Label>Description</Label>
                        <Input
                          value={item.description}
                          onChange={(e) => handleItemChange(index, "description", e.target.value)}
                          placeholder="Item description"
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value))}
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label>Unit Price</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(index, "unitPrice", Number(e.target.value))}
                        />
                      </div>
                      <div className="col-span-1 space-y-2">
                        <Label>Total</Label>
                        <div className="pt-2 text-muted-foreground">
                          ${item.total.toLocaleString()}
                        </div>
                      </div>
                      <div className="col-span-1 flex items-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => removeItem(index)}
                          disabled={items.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={addItem}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>

                <div className="flex justify-end">
                  <div className="w-48 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax:</span>
                      <span>${tax.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Invoice Details */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any notes or special instructions..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
} 