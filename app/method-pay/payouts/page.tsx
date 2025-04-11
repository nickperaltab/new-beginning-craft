"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoIcon, Download, HelpCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function PayoutsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payouts</h1>
        <div className="flex items-center gap-2">
          <Link href="/method-pay">
            <Button variant="outline">Payments Dashboard</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Recent payouts</h2>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="flex items-center text-sm text-gray-500">
                  Total balance <InfoIcon className="h-4 w-4 ml-1" />
                </div>
                <div className="text-2xl font-bold">$0.00 USD</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Funds on hold</div>
                <div className="text-2xl font-bold">$0.00 USD</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-gray-500">In transit to bank</div>
                <div className="text-2xl font-bold">$0.00 USD</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Button variant="link" className="text-blue-600 p-0 h-auto">See details</Button>
              <Button className="bg-green-500 hover:bg-green-600">Add to balance</Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              Future refunds or disputes or negative balance <InfoIcon className="h-4 w-4 ml-1" />
            </div>
            <div className="text-2xl font-bold">$0.00 USD</div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Pay out</h3>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">Status</Button>
              <Button variant="outline" size="sm">Amount</Button>
              <Button variant="outline" size="sm">Method</Button>
              <Button variant="outline" size="sm">Date</Button>
              <div className="flex-1"></div>
              <Button variant="outline" size="sm" className="ml-auto">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            
            <div className="border rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* No data state */}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="text-center py-10 space-y-2">
            <h3 className="text-lg font-medium">Keep track of your payouts</h3>
            <p className="text-gray-500">Follow the status of your payouts here, keep track of how much money you're making, and more.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
