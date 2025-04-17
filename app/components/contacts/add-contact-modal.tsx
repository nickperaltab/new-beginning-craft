"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import { useState, useEffect } from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  isB2B: z.boolean(),
  location: z.string().min(1, "Location is required"),
  tags: z.array(z.string()).optional(),
  rating: z.number(),
  assignedTo: z.string().optional(),
  company: z.string().optional(),
})

interface AddContactModalProps {
  isOpen: boolean
  onClose: () => void
  onAddContact: (contact: z.infer<typeof formSchema>) => void
}

export function AddContactModal({ isOpen, onClose, onAddContact }: AddContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentTag, setCurrentTag] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [contactType, setContactType] = useState<"customer" | "company">("customer")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      isB2B: true,
      location: "",
      tags: [],
      rating: 0,
      assignedTo: "",
      company: "",
    },
  })

  useEffect(() => {
    // Initialize tags from form values
    const formTags = form.getValues('tags') || []
    setTags(formTags)
  }, [form])

  const handleTagInput = (e: React.KeyboardEvent | React.FocusEvent) => {
    const trimmedTag = currentTag.trim()
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      const newTags = [...tags, trimmedTag]
      setTags(newTags)
      setCurrentTag("")
      form.setValue('tags', newTags)
    }
  }

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(newTags)
    form.setValue('tags', newTags)
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>, createAnother: boolean = false) => {
    try {
      setIsSubmitting(true)
      await onAddContact(values)
      if (!createAnother) {
        onClose()
      }
      form.reset()
      setTags([])
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((values) => handleSubmit(values, false))} className="space-y-6">
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
                    <Tabs defaultValue="b2b" className="w-[400px] mt-2" onValueChange={(value) => form.setValue('isB2B', value === "b2b")}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="b2b">B2B</TabsTrigger>
                        <TabsTrigger value="b2c">B2C</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
              )}

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1">
                      Full Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-1">
                        Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {contactType === "customer" && (
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1">
                      Location <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="City, State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned To</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team member" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="john.smith">John Smith</SelectItem>
                        <SelectItem value="sarah.wilson">Sarah Wilson</SelectItem>
                        <SelectItem value="michael.brown">Michael Brown</SelectItem>
                        <SelectItem value="emily.davis">Emily Davis</SelectItem>
                        <SelectItem value="david.miller">David Miller</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-1.5">
                <FormLabel>Tags</FormLabel>
                <div className="flex flex-wrap items-center gap-1 p-2 min-h-10 rounded-md border border-input bg-background ring-offset-background">
                  {tags.map((tag) => (
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
                          removeTag(tag)
                        }}
                      />
                    </Badge>
                  ))}
                  <input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleTagInput(e)
                      }
                    }}
                    onBlur={handleTagInput}
                    disabled={tags.length >= 5}
                    className="flex-1 bg-transparent border-0 outline-none text-sm placeholder:text-muted-foreground min-w-[120px] h-6 p-0 focus:outline-none focus:ring-0"
                    placeholder={tags.length >= 5 ? "Maximum tags reached" : "Type and press Enter to add tags"}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lead Rating</FormLabel>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 cursor-pointer ${
                            star <= field.value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                          onClick={() => form.setValue('rating', star)}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex justify-between items-center">
              <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => form.handleSubmit((values) => handleSubmit(values, true))()}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save & Add Another"}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save & Close"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 