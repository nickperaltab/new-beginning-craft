import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddContactModalProps {
  isOpen: boolean
  onClose: () => void
  onAddContact: (contact: {
    fullName: string
    email: string
    phone: string
    isB2B: boolean
    location: string
    tags: string[]
    rating: number
    assignedTo: string
  }) => void
}

export function AddContactModal({ isOpen, onClose, onAddContact }: AddContactModalProps) {
  const initialState = {
    fullName: "",
    email: "",
    phone: "",
    isB2B: true,
    location: "",
    newTag: "",
    tags: [] as string[],
    rating: 0,
    assignedTo: "",
    company: "",
  }

  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [contactType, setContactType] = useState<"customer" | "company">("customer")

  const resetForm = () => {
    setFormData(initialState)
    setErrors({})
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && formData.newTag.trim()) {
      if (!formData.tags.includes(formData.newTag.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, prev.newTag.trim()],
          newTag: ""
        }))
      }
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!formData.location) {
      newErrors.location = "Location is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (shouldClose: boolean) => {
    if (validateForm()) {
      const contactData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        isB2B: formData.isB2B,
        location: formData.location,
        tags: formData.tags,
        rating: formData.rating,
        assignedTo: formData.assignedTo
      }

      onAddContact(contactData)

      if (shouldClose) {
        onClose()
      } else {
        resetForm()
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <Tabs defaultValue="customer" className="w-full" onValueChange={(value) => setContactType(value as "customer" | "company")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
            </TabsList>
          </Tabs>

          {contactType === "customer" && (
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1" />
              <div className="col-span-3">
                <Label htmlFor="type">Type</Label>
                <Tabs defaultValue="b2b" className="w-[400px] mt-2" onValueChange={(value) => setFormData(prev => ({ ...prev, isB2B: value === "b2b" }))}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="b2b">B2B</TabsTrigger>
                    <TabsTrigger value="b2c">B2C</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1" />
            <div className="col-span-3">
              <Label htmlFor="fullName">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="mt-2"
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1" />
            <div className="col-span-3">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-2"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1" />
            <div className="col-span-3">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-2"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          {contactType === "customer" && (
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1" />
              <div className="col-span-3">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="mt-2"
                  placeholder="Company name"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1" />
            <div className="col-span-3">
              <Label htmlFor="location">
                Location <span className="text-red-500">*</span>
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="mt-2"
                placeholder="City, State"
              />
              {errors.location && (
                <p className="text-sm text-red-500 mt-1">{errors.location}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1" />
            <div className="col-span-3">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Select
                value={formData.assignedTo}
                onValueChange={(value) => setFormData(prev => ({ ...prev, assignedTo: value }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john.smith">John Smith</SelectItem>
                  <SelectItem value="sarah.wilson">Sarah Wilson</SelectItem>
                  <SelectItem value="michael.brown">Michael Brown</SelectItem>
                  <SelectItem value="emily.davis">Emily Davis</SelectItem>
                  <SelectItem value="david.miller">David Miller</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1" />
            <div className="col-span-3">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex flex-wrap items-center gap-1 p-2 min-h-10 rounded-md border border-input bg-background ring-offset-background mt-2">
                {formData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer py-0.5 text-xs flex items-center gap-1 h-6"
                  >
                    {tag}
                    <X 
                      className="h-3 w-3" 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveTag(tag)
                      }}
                    />
                  </Badge>
                ))}
                <input
                  id="tags"
                  value={formData.newTag}
                  onChange={(e) => setFormData(prev => ({ ...prev, newTag: e.target.value }))}
                  onKeyDown={handleAddTag}
                  className="flex-1 bg-transparent border-0 outline-none text-sm placeholder:text-muted-foreground min-w-[120px] h-6 p-0 focus:outline-none focus:ring-0"
                  placeholder="Type and press Enter to add tags"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1" />
            <div className="col-span-3">
              <Label>Lead Rating</Label>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 cursor-pointer ${
                      star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between items-center">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSubmit(false)}>
              Save & Add Another
            </Button>
            <Button onClick={() => handleSubmit(true)}>
              Save & Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 