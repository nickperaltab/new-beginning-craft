"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowLeft, CreditCard, Zap, Shield, Clock } from "lucide-react"
import Link from "next/link"

export default function MethodPayPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <Link href="/settings" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Settings
        </Link>
        <div className="flex gap-3">
          <Link href="/payments">
            <Button variant="outline">Payments Dashboard</Button>
          </Link>
          <Link href="/method-pay/payouts">
            <Button variant="outline">Payouts</Button>
          </Link>
          <Link href="/method-pay/account">
            <Button variant="outline">Account Settings</Button>
          </Link>
        </div>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Method Pay</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Experience faster payments and seamless integration with your existing workflow
        </p>
      </div>

      <Card className="mb-10 border-blue-200 shadow-md">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Get Started with Method Pay</CardTitle>
            <span className="text-blue-600 font-semibold">Free 30-day trial</span>
          </div>
          <CardDescription>
            Complete these steps to activate your Method Pay account
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-full p-2 mt-0.5">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Create your account</h3>
                <p className="text-gray-600">Your Method Pay account has been created successfully</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gray-100 rounded-full p-2 mt-0.5">
                <span className="flex h-5 w-5 items-center justify-center font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Connect your bank account</h3>
                <p className="text-gray-600">Securely connect your business bank account to receive payments</p>
                <Button className="mt-2">Connect Bank Account</Button>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gray-100 rounded-full p-2 mt-0.5">
                <span className="flex h-5 w-5 items-center justify-center font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Set up payment methods</h3>
                <p className="text-gray-600">Choose which payment methods you want to accept</p>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Credit Cards
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    ACH
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gray-100 rounded-full p-2 mt-0.5">
                <span className="flex h-5 w-5 items-center justify-center font-semibold">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Customize your payment page</h3>
                <p className="text-gray-600">Add your logo and customize the payment experience for your customers</p>
                <Button variant="outline" className="mt-2">Customize</Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 border-t flex justify-between">
          <p className="text-sm text-gray-600">Need help? Contact our support team</p>
          <Button variant="link" className="text-blue-600">support@methodpay.com</Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Faster Payments</h3>
              <p className="text-gray-600">Get paid up to 3x faster with our streamlined payment processing</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Transactions</h3>
              <p className="text-gray-600">Bank-level security with encryption and fraud protection</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Automatic Reconciliation</h3>
              <p className="text-gray-600">Save time with automatic payment matching and reconciliation</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Link href="/payments">
          <Button size="lg" className="px-8">
            Complete Setup
          </Button>
        </Link>
      </div>
    </div>
  )
}
