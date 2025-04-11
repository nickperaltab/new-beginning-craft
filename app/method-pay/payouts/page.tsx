"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoIcon, Download, HelpCircle, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Sample payout data
const payoutTransactions = [
  {
    id: "PO-2023-001",
    date: "2023-11-20",
    status: "completed",
    destination: "Bank of America ****1234",
    amount: 4250.75
  },
  {
    id: "PO-2023-002",
    date: "2023-11-15",
    status: "in_transit",
    destination: "Bank of America ****1234",
    amount: 1875.50
  },
  {
    id: "PO-2023-003",
    date: "2023-11-01",
    status: "completed",
    destination: "Bank of America ****1234",
    amount: 3120.25
  },
  {
    id: "PO-2023-004",
    date: "2023-10-15",
    status: "completed",
    destination: "Bank of America ****1234",
    amount: 2750.00
  },
  {
    id: "PO-2023-005",
    date: "2023-10-01",
    status: "completed",
    destination: "Bank of America ****1234",
    amount: 1950.50
  }
];

// Calculate summary metrics
const totalBalance = 8750.25;
const fundsOnHold = 1250.00;
const inTransit = 1875.50;
const futureRefunds = 350.75;

export default function PayoutsPage() {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Helper function to format payout status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-700">Completed</span>
          </div>
        );
      case "in_transit":
        return (
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-yellow-700">In Transit</span>
          </div>
        );
      case "failed":
        return (
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-red-700">Failed</span>
          </div>
        );
      default:
        return <span>{status}</span>;
    }
  };
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
                <div className="text-2xl font-bold">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-gray-500">Funds on hold</div>
                <div className="text-2xl font-bold">${fundsOnHold.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-gray-500">In transit to bank</div>
                <div className="text-2xl font-bold">${inTransit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</div>
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
            <div className="text-2xl font-bold">${futureRefunds.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</div>
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
                  {payoutTransactions.length > 0 ? (
                    payoutTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(transaction.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getStatusBadge(transaction.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.destination}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                          ${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
                        No payout transactions found
                      </td>
                    </tr>
                  )}
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
