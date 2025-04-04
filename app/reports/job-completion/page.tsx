"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Download,
  Calendar,
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertTriangle,
  Share2,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReportChart } from "@/components/reports/report-chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function JobCompletionReportPage() {
  const [dateRange, setDateRange] = useState("last-30")
  const [jobType, setJobType] = useState("all")

  // Sample data for the report
  const completionData = {
    onTime: 36,
    delayed: 6,
    total: 42,
    onTimePercentage: 85.7,
    averageDelay: 2.3, // days
    byJobType: [
      { type: "HVAC Installation", onTime: 12, delayed: 3, total: 15 },
      { type: "HVAC Repair", onTime: 14, delayed: 1, total: 15 },
      { type: "Electrical", onTime: 6, delayed: 1, total: 7 },
      { type: "Plumbing", onTime: 4, delayed: 1, total: 5 },
    ],
    byTechnician: [
      { name: "John Smith", onTime: 10, delayed: 0, total: 10 },
      { name: "Sarah Johnson", onTime: 8, delayed: 2, total: 10 },
      { name: "Mike Davis", onTime: 9, delayed: 1, total: 10 },
      { name: "Lisa Wong", onTime: 9, delayed: 3, total: 12 },
    ],
    trend: [
      { month: "Jan", onTimePercentage: 82 },
      { month: "Feb", onTimePercentage: 84 },
      { month: "Mar", onTimePercentage: 80 },
      { month: "Apr", onTimePercentage: 83 },
      { month: "May", onTimePercentage: 86 },
      { month: "Jun", onTimePercentage: 85 },
    ],
    recentJobs: [
      {
        id: "JOB-2023-0045",
        customer: "Acme Corp",
        type: "HVAC Installation",
        dueDate: "Jun 15, 2023",
        completedDate: "Jun 14, 2023",
        status: "on-time",
        delay: 0,
      },
      {
        id: "JOB-2023-0046",
        customer: "TechSolutions Inc",
        type: "Electrical",
        dueDate: "Jun 16, 2023",
        completedDate: "Jun 16, 2023",
        status: "on-time",
        delay: 0,
      },
      {
        id: "JOB-2023-0047",
        customer: "Riverside Apartments",
        type: "Plumbing",
        dueDate: "Jun 17, 2023",
        completedDate: "Jun 20, 2023",
        status: "delayed",
        delay: 3,
      },
      {
        id: "JOB-2023-0048",
        customer: "City Hospital",
        type: "HVAC Repair",
        dueDate: "Jun 18, 2023",
        completedDate: "Jun 18, 2023",
        status: "on-time",
        delay: 0,
      },
      {
        id: "JOB-2023-0049",
        customer: "Downtown Office Tower",
        type: "HVAC Installation",
        dueDate: "Jun 20, 2023",
        completedDate: "Jun 22, 2023",
        status: "delayed",
        delay: 2,
      },
    ],
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/reports">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Job Completion Rate</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search jobs..." className="w-full pl-8 bg-background" />
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

          <Select value={jobType} onValueChange={setJobType}>
            <SelectTrigger className="w-[180px]">
              <Briefcase className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Job Types</SelectItem>
              <SelectItem value="hvac-installation">HVAC Installation</SelectItem>
              <SelectItem value="hvac-repair">HVAC Repair</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="plumbing">Plumbing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-1">On-Time Completion</h3>
              <p className="text-3xl font-bold">{completionData.onTimePercentage.toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground mt-1">
                {completionData.onTime} of {completionData.total} jobs
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-yellow-100 mb-4">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-medium mb-1">Delayed Jobs</h3>
              <p className="text-3xl font-bold">{completionData.delayed}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {(100 - completionData.onTimePercentage).toFixed(1)}% of total jobs
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-blue-100 mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium mb-1">Average Delay</h3>
              <p className="text-3xl font-bold">{completionData.averageDelay} days</p>
              <p className="text-sm text-muted-foreground mt-1">When jobs are delayed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completion Rate Trend</CardTitle>
            <CardDescription>On-time completion percentage over time</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px]">
              <ReportChart
                type="line"
                data={{
                  labels: completionData.trend.map((item) => item.month),
                  datasets: [
                    {
                      label: "On-Time Percentage",
                      data: completionData.trend.map((item) => item.onTimePercentage),
                      borderColor: "#3b82f6",
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      borderWidth: 2,
                      fill: true,
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      min: 70,
                      max: 100,
                      ticks: {
                        callback: (value: number) => `${value}%`,
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completion by Job Type</CardTitle>
            <CardDescription>On-time vs. delayed jobs by type</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px]">
              <ReportChart
                type="bar"
                data={{
                  labels: completionData.byJobType.map((item) => item.type),
                  datasets: [
                    {
                      label: "On-Time",
                      data: completionData.byJobType.map((item) => item.onTime),
                      backgroundColor: "#22c55e",
                    },
                    {
                      label: "Delayed",
                      data: completionData.byJobType.map((item) => item.delayed),
                      backgroundColor: "#f59e0b",
                    },
                  ],
                }}
                options={{
                  scales: {
                    x: {
                      stacked: true,
                    },
                    y: {
                      stacked: true,
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Data */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Jobs</CardTitle>
          <CardDescription>Completion status of recent jobs</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Completed Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delay (days)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completionData.recentJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">
                    <Link href={`/jobs/${job.id}`} className="text-blue-600 hover:underline">
                      {job.id}
                    </Link>
                  </TableCell>
                  <TableCell>{job.customer}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>{job.dueDate}</TableCell>
                  <TableCell>{job.completedDate}</TableCell>
                  <TableCell>
                    <Badge className={cn(job.status === "on-time" ? "bg-green-500" : "bg-yellow-500")}>
                      {job.status === "on-time" ? "On Time" : "Delayed"}
                    </Badge>
                  </TableCell>
                  <TableCell>{job.delay}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Technician Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Technician Performance</CardTitle>
          <CardDescription>On-time completion rate by technician</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {completionData.byTechnician.map((tech) => {
              const percentage = (tech.onTime / tech.total) * 100
              return (
                <div key={tech.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{tech.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {tech.onTime} of {tech.total} jobs on time
                      </p>
                    </div>
                    <p className="font-bold">{percentage.toFixed(1)}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={cn(
                        "h-2.5 rounded-full",
                        percentage >= 90
                          ? "bg-green-500"
                          : percentage >= 80
                            ? "bg-blue-500"
                            : percentage >= 70
                              ? "bg-yellow-500"
                              : "bg-red-500",
                      )}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

