"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { 
  CreditCard, 
  Building, 
  Bell, 
  Shield, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  CreditCardIcon,
  BankIcon
} from "lucide-react"

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  
  return (
    <>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <div className="flex items-center gap-2">
            <Link href="/payments">
              <Button variant="outline">Payments Dashboard</Button>
            </Link>
            <Link href="/method-pay/payouts">
              <Button variant="outline">Payouts</Button>
            </Link>
            <Link href="/method-pay">
              <Button variant="outline">Method Pay</Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full max-w-3xl">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            <TabsTrigger value="bank">Bank Accounts</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <Card>
            <CardContent className="p-6">
              <TabsContent value="profile" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue="Hannah Johnston" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="hannahmacleanjohnston@gmail.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" defaultValue="Furever Pet Care" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Security</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Two-factor Authentication</div>
                        <div className="text-sm text-gray-500">Add an extra layer of security to your account</div>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Password</div>
                        <div className="text-sm text-gray-500">Last changed 3 months ago</div>
                      </div>
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="payment" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Credit Cards</h2>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-md">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">Visa ending in 4242</div>
                            <div className="text-sm text-gray-500">Expires 12/2025</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">Remove</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Add New Card
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="bank" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Bank Accounts</h2>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 p-2 rounded-md">
                            <Building className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium">STREETER VALLEY BANK</div>
                            <div className="text-sm text-gray-500">Account ending in 2227</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">Remove</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Add New Bank Account
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Payment Receipts</div>
                        <div className="text-sm text-gray-500">Receive receipts for all payments</div>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Payout Notifications</div>
                        <div className="text-sm text-gray-500">Get notified when funds are sent to your bank</div>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Security Alerts</div>
                        <div className="text-sm text-gray-500">Receive alerts about suspicious activity</div>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Marketing Updates</div>
                        <div className="text-sm text-gray-500">Receive news and special offers</div>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Preferences</Button>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </>
  )
}
