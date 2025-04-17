"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, X, CornerDownLeft } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().min(1, "Company name is required"),
  location: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

interface AddVendorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: z.infer<typeof formSchema>, createAnother: boolean) => void
}

export function AddVendorModal({ open, onOpenChange, onSubmit }: AddVendorModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentTag, setCurrentTag] = useState("")
  const [tags, setTags] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      location: "",
      notes: "",
      tags: [],
    },
  })

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

  useEffect(() => {
    // Initialize tags from form values
    const formTags = form.getValues('tags') || []
    setTags(formTags)
  }, [form])

  const handleSubmit = async (values: z.infer<typeof formSchema>, createAnother: boolean = false) => {
    try {
      setIsSubmitting(true)
      await onSubmit(values, createAnother)
      if (!createAnother) {
        onOpenChange(false)
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-2xl font-bold">Add vendor</DialogTitle>
          </div>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit((values) => handleSubmit(values, false))} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-1">
                    Name
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
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
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel className="flex gap-1">
                      Email
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City, Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-1.5">
              <FormLabel>Tags</FormLabel>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center gap-1.5 max-w-[calc(100%-24px)] overflow-x-auto">
                  {tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="h-6 text-xs py-0.5 px-2 flex items-center gap-0.5 shrink-0 bg-blue-100 hover:bg-blue-200 transition-colors font-normal"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-destructive rounded-full p-0.5"
                      >
                        <X className="h-2.5 w-2.5" />
                      </button>
                    </Badge>
                  ))}
                  <div className="flex items-center gap-1">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder={tags.length >= 5 ? "Maximum tags reached" : "Type and press Enter"}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleTagInput(e)
                        }
                      }}
                      onBlur={handleTagInput}
                      disabled={tags.length >= 5}
                      className="border-0 bg-transparent p-0 h-5 text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 w-[160px]"
                    />
                    {tags.length < 5 && currentTag.length === 0 && (
                      <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground absolute right-2" />
                    )}
                  </div>
                </div>
                <div 
                  className="w-full h-9 border rounded-md cursor-text" 
                  onClick={(e) => {
                    const input = e.currentTarget.querySelector('input')
                    if (input) input.focus()
                  }}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes about the vendor"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end gap-4 pt-2">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => handleSubmit(form.getValues(), true)}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save & Create Another"}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save & Close"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 