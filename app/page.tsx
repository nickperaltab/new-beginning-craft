import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Calendar, CheckCircle, ChevronRight, Clock, DollarSign, FileText, Mail, Sparkles, UserPlus, Wrench } from "lucide-react"
import Link from "next/link"
import { DashboardMetrics } from "@/components/dashboard-metrics"
import { RecentWorkOrders } from "@/components/recent-work-orders"
import { UpcomingVisits } from "@/components/upcoming-visits"
import { InsightsConfigDialog } from "@/components/insights-config-dialog"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your field service management system</p>
      </div>

      <div className="relative bg-white rounded-xl overflow-hidden">
        <div className="absolute inset-[-2px] bg-gradient-to-r from-blue-300 via-purple-400 to-teal-300 rounded-xl animate-[gradient_8s_linear_infinite]" />
        <div className="relative bg-gradient-to-r from-blue-50/[0.02] via-purple-50/[0.02] to-teal-50/[0.02] m-[3px] p-6 rounded-lg z-[1]">
          <div className="absolute inset-0 bg-white/95 rounded-lg" />
          <div className="relative z-[2]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                <h2 className="text-xl font-semibold">John's daily insights</h2>
              </div>
              <InsightsConfigDialog>
                <Button variant="secondary" size="sm" className="h-8 gap-2">
                  <Wrench className="h-4 w-4" />
                  Configure
                </Button>
              </InsightsConfigDialog>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">
              You have several important tasks that need your attention today
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Button variant="outline" className="justify-start gap-2 py-3 group bg-white hover:bg-white/90">
                <FileText className="h-4 w-4 text-blue-500" />
                <span className="flex-1 text-left">Send 3 invoice reminders</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-70 group-hover:opacity-100" />
              </Button>
              <Button variant="outline" className="justify-start gap-2 py-3 group bg-white hover:bg-white/90">
                <Mail className="h-4 w-4 text-orange-500" />
                <span className="flex-1 text-left">Follow up with 8 customers</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-70 group-hover:opacity-100" />
              </Button>
              <Button variant="outline" className="justify-start gap-2 py-3 group bg-white hover:bg-white/90">
                <Clock className="h-4 w-4 text-purple-500" />
                <span className="flex-1 text-left">View 4 overdue tasks</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-70 group-hover:opacity-100" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <DashboardMetrics />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Recent Work Orders</CardTitle>
              <Link href="/work-orders">
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  View all <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>Latest work orders across all jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentWorkOrders />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Upcoming Visits</CardTitle>
              <Link href="/schedule">
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  View all <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>Scheduled visits for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingVisits />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link href="/work-orders/new">
              <Button className="w-full justify-start gap-2" variant="outline">
                <FileText className="h-4 w-4" />
                Create Work Order
              </Button>
            </Link>
            <Link href="/schedule/new">
              <Button className="w-full justify-start gap-2" variant="outline">
                <Calendar className="h-4 w-4" />
                Schedule Visit
              </Button>
            </Link>
            <Link href="/jobs/new">
              <Button className="w-full justify-start gap-2" variant="outline">
                <CheckCircle className="h-4 w-4" />
                Create New Job
              </Button>
            </Link>
            <Link href="/invoices/new">
              <Button className="w-full justify-start gap-2" variant="outline">
                <DollarSign className="h-4 w-4" />
                Create Invoice
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Team Availability</CardTitle>
            <CardDescription>Current technician status and availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "John Smith", role: "HVAC Technician", status: "On Job", time: "2 hours remaining" },
                { name: "Sarah Johnson", role: "Electrician", status: "Available", time: "Today" },
                { name: "Mike Davis", role: "Plumber", status: "Off Duty", time: "Returns tomorrow" },
                { name: "Lisa Wong", role: "Foreman", status: "On Job", time: "1 hour remaining" },
              ].map((tech, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        tech.status === "Available"
                          ? "bg-green-500"
                          : tech.status === "On Job"
                            ? "bg-blue-500"
                            : "bg-gray-400"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{tech.name}</p>
                      <p className="text-sm text-muted-foreground">{tech.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{tech.status}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {tech.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

