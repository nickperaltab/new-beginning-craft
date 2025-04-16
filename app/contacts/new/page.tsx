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
import { ArrowLeft, Save, X, Star } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function NewContactPage() {
  const initialState = {
    fullName: "",
    email: "",
    location: "",
    isB2B: true,
    phone: "",
    newTag: "",
    tags: [] as string[],
    rating: 0,
  }

  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState<Record<string, string>>({})

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

  const handleSubmit = (shouldAddAnother: boolean) => {
    if (validateForm()) {
      // Here we would typically make an API call to save the contact
      console.log("Saving contact:", formData)

      if (shouldAddAnother) {
        setFormData(initialState)
        setErrors({})
      } else {
        // Navigate back to contacts page
        window.location.href = "/contacts"
      }
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-4 p-4 border-b">
        <Link href="/contacts">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Add New Contact</h1>
      </div>

      <div className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {/* Required Fields Section */}
            <div>
              <h2 className="text-lg font-medium mb-4">Required Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Tabs 
                      defaultValue="b2b" 
                      className="w-full mt-2" 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, isB2B: value === "b2b" }))}
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="b2b">B2B</TabsTrigger>
                        <TabsTrigger value="b2c">B2C</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div>
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

                <div className="space-y-4">
                  <div>
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

                  <div>
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
              </div>
            </div>

            {/* Optional Fields Section */}
            <div>
              <h2 className="text-lg font-medium mb-4">Additional Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
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

                  <div>
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

                <div>
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
            </div>
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button variant="ghost" asChild>
              <Link href="/contacts">Cancel</Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleSubmit(true)}>
                Save & Add Another
              </Button>
              <Button onClick={() => handleSubmit(false)}>
                Save & Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

