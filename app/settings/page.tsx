"use client"

import { useState } from "react"
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  User, 
  Settings as SettingsIcon, 
  Globe, 
  Palette, 
  Lock, 
  CreditCard, 
  FileText, 
  Building,
  Truck,
  Calendar,
  Wifi
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">User Settings</h1>
        <p className="text-muted-foreground">Manage your application settings and preferences</p>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-4xl">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" placeholder="Your Company" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Phone Number</Label>
                  <Input id="company-phone" placeholder="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email</Label>
                  <Input id="company-email" type="email" placeholder="contact@yourcompany.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-website">Website</Label>
                  <Input id="company-website" placeholder="https://yourcompany.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address">Address</Label>
                <Input id="company-address" placeholder="Street Address" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-city">City</Label>
                  <Input id="company-city" placeholder="City" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-state">State</Label>
                  <Input id="company-state" placeholder="State/Province" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-zip">ZIP Code</Label>
                  <Input id="company-zip" placeholder="ZIP/Postal Code" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>Set your standard operating hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <div key={day} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id={`${day.toLowerCase()}-active`} />
                      <Label htmlFor={`${day.toLowerCase()}-active`}>{day}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Select defaultValue="09:00">
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Start" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, i) => (
                            <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                              {`${i.toString().padStart(2, '0')}:00`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span>to</span>
                      <Select defaultValue="17:00">
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="End" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, i) => (
                            <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                              {`${i.toString().padStart(2, '0')}:00`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize your application appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Color Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 border-2 border-primary">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700"></div>
                    <span className="sr-only">Blue Theme</span>
                  </Button>
                  <Button variant="outline" className="h-20">
                    <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-700"></div>
                    <span className="sr-only">Green Theme</span>
                  </Button>
                  <Button variant="outline" className="h-20">
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700"></div>
                    <span className="sr-only">Purple Theme</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Display Mode</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start h-12">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded-full bg-white border"></div>
                      <span>Light Mode</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-12 border-2 border-primary">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded-full bg-gray-900"></div>
                      <span>Dark Mode</span>
                    </div>
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-dark-mode" />
                <Label htmlFor="auto-dark-mode">Use system preferences</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Layout</CardTitle>
              <CardDescription>Customize your dashboard view</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Dashboard View</Label>
                <Select defaultValue="calendar">
                  <SelectTrigger>
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="calendar">Calendar View</SelectItem>
                    <SelectItem value="jobs">Jobs Overview</SelectItem>
                    <SelectItem value="metrics">Performance Metrics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Widget Preferences</Label>
                <div className="space-y-2">
                  {["Upcoming Jobs", "Team Availability", "Recent Invoices", "Performance Stats", "Customer Messages"].map((widget) => (
                    <div key={widget} className="flex items-center justify-between border p-3 rounded-md">
                      <span>{widget}</span>
                      <Switch id={`widget-${widget.toLowerCase().replace(/\s+/g, '-')}`} defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Control how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">In-App Notifications</h3>
                  <div className="space-y-2">
                    {[
                      "New job assignments",
                      "Schedule changes",
                      "Customer messages",
                      "Team updates",
                      "System alerts"
                    ].map((item) => (
                      <div key={item} className="flex items-center justify-between py-2">
                        <Label htmlFor={`inapp-${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</Label>
                        <Switch 
                          id={`inapp-${item.toLowerCase().replace(/\s+/g, '-')}`} 
                          defaultChecked 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Desktop Notifications</h3>
                  <div className="space-y-2">
                    {[
                      "New job assignments",
                      "Urgent messages",
                      "Schedule changes",
                      "System alerts"
                    ].map((item) => (
                      <div key={item} className="flex items-center justify-between py-2">
                        <Label htmlFor={`desktop-${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</Label>
                        <Switch 
                          id={`desktop-${item.toLowerCase().replace(/\s+/g, '-')}`} 
                          defaultChecked={item === "Urgent messages"}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Email Notifications</h3>
                  <div className="space-y-2">
                    {[
                      "Daily schedule summary",
                      "New job assignments",
                      "Job status changes",
                      "Customer feedback",
                      "Team performance reports"
                    ].map((item) => (
                      <div key={item} className="flex items-center justify-between py-2">
                        <Label htmlFor={`email-${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</Label>
                        <Switch 
                          id={`email-${item.toLowerCase().replace(/\s+/g, '-')}`} 
                          defaultChecked={["Daily schedule summary", "New job assignments"].includes(item)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">SMS Notifications</h3>
                  <div className="space-y-2">
                    {[
                      "Emergency alerts",
                      "Schedule changes",
                      "Job cancellations",
                      "Urgent customer requests"
                    ].map((item) => (
                      <div key={item} className="flex items-center justify-between py-2">
                        <Label htmlFor={`sms-${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</Label>
                        <Switch 
                          id={`sms-${item.toLowerCase().replace(/\s+/g, '-')}`} 
                          defaultChecked={item === "Emergency alerts"}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between py-2">
                  <Label htmlFor="notification-sound">Notification Sound</Label>
                  <Select defaultValue="chime">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select sound" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chime">Chime</SelectItem>
                      <SelectItem value="bell">Bell</SelectItem>
                      <SelectItem value="ping">Ping</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline">Reset to Default</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Templates Settings */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Communication Templates</CardTitle>
              <CardDescription>Manage your email and SMS templates for customer communications</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="email-templates">
                  <AccordionTrigger>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5" />
                      <span>Email Templates</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          "Job Confirmation", 
                          "Appointment Reminder", 
                          "Schedule Change",
                          "Invoice", 
                          "Feedback Request", 
                          "Quote Approval"
                        ].map((template) => (
                          <Card key={template} className="hover:bg-muted cursor-pointer transition-colors">
                            <CardHeader className="p-4">
                              <CardTitle className="text-base">{template}</CardTitle>
                            </CardHeader>
                            <CardFooter className="p-4 pt-0 flex justify-between">
                              <Button variant="ghost" size="sm">Preview</Button>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                      <Button className="mt-2">
                        <FileText className="h-4 w-4 mr-2" />
                        Create Template
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="sms-templates">
                  <AccordionTrigger>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>SMS Templates</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          "Appointment Reminder", 
                          "On-Route Notification", 
                          "Service Complete",
                          "Follow-up", 
                          "Delay Notice", 
                          "Emergency Contact"
                        ].map((template) => (
                          <Card key={template} className="hover:bg-muted cursor-pointer transition-colors">
                            <CardHeader className="p-4">
                              <CardTitle className="text-base">{template}</CardTitle>
                            </CardHeader>
                            <CardFooter className="p-4 pt-0 flex justify-between">
                              <Button variant="ghost" size="sm">Preview</Button>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                      <Button className="mt-2">
                        <FileText className="h-4 w-4 mr-2" />
                        Create Template
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="customer-templates">
                  <AccordionTrigger>
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Customer Portal Templates</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          "Welcome Message", 
                          "Password Reset", 
                          "Service Instructions",
                          "Account Update", 
                          "Payment Confirmation", 
                          "Satisfaction Survey"
                        ].map((template) => (
                          <Card key={template} className="hover:bg-muted cursor-pointer transition-colors">
                            <CardHeader className="p-4">
                              <CardTitle className="text-base">{template}</CardTitle>
                            </CardHeader>
                            <CardFooter className="p-4 pt-0 flex justify-between">
                              <Button variant="ghost" size="sm">Preview</Button>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                      <Button className="mt-2">
                        <FileText className="h-4 w-4 mr-2" />
                        Create Template
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Import Templates</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>Connect with third-party services and applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  { name: "Google Calendar", icon: Calendar, connected: true },
                  { name: "QuickBooks", icon: CreditCard, connected: true },
                  { name: "Stripe", icon: CreditCard, connected: false },
                  { name: "Zapier", icon: Wifi, connected: false },
                  { name: "Mailchimp", icon: Mail, connected: false }
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <integration.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {integration.connected ? "Connected" : "Not connected"}
                        </p>
                      </div>
                    </div>
                    <Button variant={integration.connected ? "outline" : "default"}>
                      {integration.connected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Manage API access and tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex space-x-2">
                  <Input id="api-key" value="••••••••••••••••••••••••••••" readOnly className="font-mono" />
                  <Button variant="outline">Copy</Button>
                  <Button variant="outline">Regenerate</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  This key provides access to all API endpoints. Keep it secure.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <Input placeholder="https://your-service.com/webhook" />
              </div>
              
              <div className="space-y-2">
                <Label>Webhook Events</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "job.created",
                    "job.updated",
                    "job.completed",
                    "invoice.created",
                    "payment.received",
                    "customer.created"
                  ].map((event) => (
                    <div key={event} className="flex items-center space-x-2">
                      <Switch id={`webhook-${event}`} />
                      <Label htmlFor={`webhook-${event}`}>{event}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Reset API Key</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 