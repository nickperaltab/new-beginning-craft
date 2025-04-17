"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState, useEffect } from "react"

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  isB2B: z.boolean(),
  location: z.string().min(1, "Location is required"),
  tags: z.array(z.string()).optional(),
  rating: z.number(),
})

export default function NewContactPage() {
  const [currentTag, setCurrentTag] = useState("")
  const [tags, setTags] = useState<string[]>([])

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

  const handleSubmit = async (values: z.infer<typeof formSchema>, shouldAddAnother: boolean = false) => {
    try {
      // Here we would typically make an API call to save the contact
      console.log("Saving contact:", values)

      if (shouldAddAnother) {
        form.reset()
        setTags([])
      } else {
        // Navigate back to contacts page
        window.location.href = "/contacts"
      }
    } catch (error) {
      console.error("Error saving contact:", error)
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit((values) => handleSubmit(values, false))} className="space-y-8">
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
                        onValueChange={(value) => form.setValue('isB2B', value === "b2b")}
                      >
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="b2b">B2B</TabsTrigger>
                          <TabsTrigger value="b2c">B2C</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

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
                  </div>

                  <div className="space-y-4">
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
                  </div>
                </div>
              </div>

              {/* Optional Fields Section */}
              <div>
                <h2 className="text-lg font-medium mb-4">Additional Information</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
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

                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex flex-wrap items-center gap-1 p-2 min-h-10 rounded-md border border-input bg-background ring-offset-background mt-2">
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
                </div>
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button type="button" variant="ghost" asChild>
                  <Link href="/contacts">Cancel</Link>
                </Button>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => form.handleSubmit((values) => handleSubmit(values, true))()}
                  >
                    Save & Add Another
                  </Button>
                  <Button type="submit">
                    Save & Close
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

