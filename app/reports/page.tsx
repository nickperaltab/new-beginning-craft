"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  Package,
  Clock,
  Building,
  FileText,
  ChevronRight,
  ArrowUpRight,
  Truck,
  Star,
  CalendarRange,
} from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReportMetricCard } from "@/components/reports/report-metric-card"
import { ReportChart } from "@/components/reports/report-chart"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("last-30")

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Analyze performance and track key metrics</p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search reports..." className="w-full pl-8 bg-background" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="last-7">Last 7 days</SelectItem>
              <SelectItem value="last-30">Last 30 days</SelectItem>
              <SelectItem value="this-month">This month</SelectItem>
              <SelectItem value="last-month">Last month</SelectItem>
              <SelectItem value="this-quarter">This quarter</SelectItem>
              <SelectItem value="this-year">This year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Dashboard Overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Dashboard Overview</CardTitle>
          <CardDescription>Key performance metrics for the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ReportMetricCard
              title="Jobs Completed"
              value="42"
              change="+12%"
              trend="up"
              icon={Briefcase}
              description="vs. previous period"
            />
            <ReportMetricCard
              title="Revenue"
              value="$48,250"
              change="+8.5%"
              trend="up"
              icon={DollarSign}
              description="vs. previous period"
            />
            <ReportMetricCard
              title="Avg. Job Value"
              value="$1,149"
              change="-3.2%"
              trend="down"
              icon={TrendingUp}
              description="vs. previous period"
            />
            <ReportMetricCard
              title="Customer Satisfaction"
              value="4.8"
              change="+0.2"
              trend="up"
              icon={Star}
              description="out of 5.0"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Revenue by Job Type</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[250px]">
                  <ReportChart
                    type="bar"
                    data={{
                      labels: ["HVAC Installation", "HVAC Repair", "Electrical", "Plumbing", "Maintenance"],
                      datasets: [
                        {
                          label: "Revenue",
                          data: [18500, 12300, 8700, 5200, 3550],
                          backgroundColor: "#3b82f6",
                        },
                      ],
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Job Completion Status</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[250px]">
                  <ReportChart
                    type="pie"
                    data={{
                      labels: ["Completed", "In Progress", "Scheduled", "On Hold", "Cancelled"],
                      datasets: [
                        {
                          data: [42, 18, 12, 5, 3],
                          backgroundColor: [
                            "#22c55e", // green
                            "#3b82f6", // blue
                            "#eab308", // yellow
                            "#94a3b8", // slate
                            "#ef4444", // red
                          ],
                        },
                      ],
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Report Categories */}
      <Tabs defaultValue="operational" className="w-full">
        <TabsList>
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="operational" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/reports/job-completion">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-4">Job Completion Rate</CardTitle>
                  <CardDescription>Track on-time vs. delayed job completions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">86%</p>
                      <p className="text-sm text-muted-foreground">On-time completion</p>
                    </div>
                    <Badge className="bg-green-500">+4% vs. last period</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/reports/technician-utilization">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-purple-100">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-4">Technician Utilization</CardTitle>
                  <CardDescription>Hours billed vs. available hours per technician</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">78%</p>
                      <p className="text-sm text-muted-foreground">Average utilization</p>
                    </div>
                    <Badge className="bg-yellow-500">-2% vs. last period</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/reports/response-time">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-green-100">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-4">Response Time</CardTitle>
                  <CardDescription>Average time between job request and first visit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">1.8 days</p>
                      <p className="text-sm text-muted-foreground">Average response time</p>
                    </div>
                    <Badge className="bg-green-500">-0.3 days vs. last period</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/reports/job-duration">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-orange-100">
                      <CalendarRange className="h-5 w-5 text-orange-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-4">Job Duration Analysis</CardTitle>
                  <CardDescription>Comparing estimated vs. actual completion times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">+12%</p>
                      <p className="text-sm text-muted-foreground">Avg. time over estimate</p>
                    </div>
                    <Badge className="bg-yellow-500">+2% vs. last period</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/reports/work-order-status">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-blue-100">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-4">Work Order Status</CardTitle>
                  <CardDescription>Overview of all work orders by status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">80</p>
                      <p className="text-sm text-muted-foreground">Active work orders</p>
                    </div>
                    <Badge className="bg-blue-500">+8 vs. last period</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/reports/job-profitability">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-green-100">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-4">Job Profitability</CardTitle>
                  <CardDescription>Revenue vs. costs broken down by job</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">28.4%</p>
                      <p className="text-sm text-muted-foreground">Average profit margin</p>
                    </div>
                    <Badge className="bg-green-500">+1.2% vs. last period</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/reports/margin-analysis">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-blue-100">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-4">Margin Analysis</CardTitle>
                  <CardDescription>Profit margins across different job types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">32.5%</p>
                      <p className="text-sm text-muted-foreground">Highest margin (HVAC Install)</p>
                    </div>
                    <Badge className="bg-green-500">+2.8% vs. last period</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/reports/revenue-by-service">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-purple-100">
                      <PieChart className="h-5 w-5 text-purple-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-4">Revenue by Service Type</CardTitle>
                  <CardDescription>Which services generate the most revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">$18,500</p>
                      <p className="text-sm text-muted-foreground">HVAC Installation (highest)</p>
                    </div>
                    <Badge className="bg-blue-500">38% of total</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/reports/material-usage">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-4">Material Usage by Job Type</CardTitle>
                  <CardDescription>Most commonly used materials by job type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">HVAC Units</p>
                      <p className="text-sm text-muted-foreground">Highest cost material</p>
                    </div>
                    <Badge className="bg-blue-500">$32,000 used</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/reports/inventory-turnover">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-green-100">
                      <ArrowUpRight className="h-5 w-5 text-green-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-4">Inventory Turnover</CardTitle>
                  <CardDescription>How quickly materials are being used</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">4.2x</p>
                      <p className="text-sm text-muted-foreground">Average turnover rate</p>
                    </div>
                    <Badge className="bg-green-500">+0.3 vs. last period</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/reports/low-stock">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-red-100">
                      <Package className="h-5 w-5 text-red-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-4">Low Stock Alerts</CardTitle>
                  <CardDescription>Items approaching reorder thresholds</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Items below threshold</p>
                    </div>
                    <Badge className="bg-red-500">3 critical</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="customer" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/reports/customer-satisfaction">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-yellow-100">
                      <Star className="h-5 w-5 text-yellow-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-4">Customer Satisfaction</CardTitle>
                  <CardDescription>Ratings and feedback by job/technician</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">4.8/5.0</p>
                      <p className="text-sm text-muted-foreground">Average rating</p>
                    </div>
                    <Badge className="bg-green-500">+0.2 vs. last period</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/reports/repeat-business">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Building className="h-5 w-5 text-blue-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-4">Repeat Business Rate</CardTitle>
                  <CardDescription>Percentage of customers with multiple jobs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">68%</p>
                      <p className="text-sm text-muted-foreground">Repeat customer rate</p>
                    </div>
                    <Badge className="bg-green-500">+5% vs. last period</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/reports/customer-value">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-green-100">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-4">Customer Value</CardTitle>
                  <CardDescription>Ranking customers by total revenue generated</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">$24,500</p>
                      <p className="text-sm text-muted-foreground">Top customer value</p>
                    </div>
                    <Badge className="bg-blue-500">Acme Corp</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/reports/technician-efficiency">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-4">Technician Efficiency</CardTitle>
                  <CardDescription>Jobs completed per technician</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">8.5</p>
                      <p className="text-sm text-muted-foreground">Avg. jobs per technician</p>
                    </div>
                    <Badge className="bg-green-500">+1.2 vs. last period</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/reports/quality-metrics">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-yellow-100">
                      <Star className="h-5 w-5 text-yellow-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-4">Quality Metrics</CardTitle>
                  <CardDescription>Callback rate, customer satisfaction by technician</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">3.2%</p>
                      <p className="text-sm text-muted-foreground">Callback rate</p>
                    </div>
                    <Badge className="bg-green-500">-0.8% vs. last period</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/reports/travel-time">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-full bg-purple-100">
                      <Truck className="h-5 w-5 text-purple-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-4">Travel Time Analysis</CardTitle>
                  <CardDescription>Time spent traveling vs. on-site</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">18%</p>
                      <p className="text-sm text-muted-foreground">Time spent traveling</p>
                    </div>
                    <Badge className="bg-yellow-500">-2% vs. last period</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

