"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, Filter, Plus, Search, User } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { OperationalOverview } from "@/components/jobs/operational-overview"

export default function JobsPage() {
  // This would come from your API or state management in a real app
  const jobs = [
    {
      id: "JOB-2023-0045",
      customer: "Acme Corp",
      type: "Commercial HVAC",
      status: "In Progress",
      priority: "High",
      createdDate: "Mar 10, 2023",
      dueDate: "Mar 30, 2023",
      assignedTo: "Lisa Wong",
      location: "123 Main St, Suite 101",
    },
    {
      id: "JOB-2023-0044",
      customer: "TechStart Inc",
      type: "Electrical",
      status: "Scheduled",
      priority: "Medium",
      createdDate: "Mar 8, 2023",
      dueDate: "Mar 25, 2023",
      assignedTo: "John Smith",
      location: "456 Park Ave",
    },
    {
      id: "JOB-2023-0043",
      customer: "Riverside Hospital",
      type: "Plumbing",
      status: "Estimating",
      priority: "Medium",
      createdDate: "Mar 7, 2023",
      dueDate: "Mar 28, 2023",
      assignedTo: "Sarah Johnson",
      location: "789 River Rd",
    },
    {
      id: "JOB-2023-0042",
      customer: "Golden Meadows Retirement",
      type: "HVAC Maintenance",
      status: "Completed",
      priority: "Low",
      createdDate: "Mar 5, 2023",
      dueDate: "Mar 15, 2023",
      assignedTo: "Mike Davis",
      location: "567 Golden Ave",
    },
    {
      id: "JOB-2023-0041",
      customer: "City Library",
      type: "Electrical",
      status: "Completed",
      priority: "High",
      createdDate: "Mar 3, 2023",
      dueDate: "Mar 10, 2023",
      assignedTo: "John Smith",
      location: "890 Library Lane",
    },
    {
      id: "JOB-2023-0040",
      customer: "Metro Apartments",
      type: "Plumbing",
      status: "Pending",
      priority: "Medium",
      createdDate: "Mar 1, 2023",
      dueDate: "Mar 20, 2023",
      assignedTo: "Unassigned",
      location: "234 Metro Blvd",
    },
  ]

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Jobs</h1>
          <p className="text-muted-foreground">Manage and track all jobs</p>
        </div>
        <Link href="/jobs/new">
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            Create Job
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <OperationalOverview />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-2 md:items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search jobs..." className="pl-8 md:w-[300px] lg:w-[400px]" />
              </div>
              <Button variant="outline" size="sm" className="gap-1 h-9">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
            <Tabs defaultValue="all" className="w-full md:w-auto">
              <TabsList className="grid grid-cols-4 w-full md:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {jobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Status Indicator */}
                      <div
                        className={cn(
                          "w-full md:w-1.5 h-1.5 md:h-auto",
                          job.status === "Completed" && "bg-green-500",
                          job.status === "In Progress" && "bg-blue-500",
                          job.status === "Scheduled" && "bg-yellow-500",
                          job.status === "Estimating" && "bg-purple-500",
                          job.status === "Pending" && "bg-gray-300",
                        )}
                      />

                      <div className="flex flex-col md:flex-row flex-grow p-4 gap-4">
                        {/* Job Details */}
                        <div className="flex-grow space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{job.id}</h3>
                            <Badge
                              className={cn(
                                "ml-2",
                                job.status === "Completed" && "bg-green-500",
                                job.status === "In Progress" && "bg-blue-500",
                                job.status === "Scheduled" && "bg-yellow-500",
                                job.status === "Estimating" && "bg-purple-500",
                                job.status === "Pending" && "bg-gray-300",
                              )}
                            >
                              {job.status}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={cn(
                                job.priority === "High" && "border-red-500 text-red-500",
                                job.priority === "Medium" && "border-yellow-500 text-yellow-500",
                                job.priority === "Low" && "border-green-500 text-green-500",
                              )}
                            >
                              {job.priority}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{job.customer}</p>
                          <p className="text-sm text-muted-foreground">{job.type}</p>

                          <div className="flex flex-wrap gap-4 pt-2">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <CalendarDays className="h-3.5 w-3.5" />
                              Due: {job.dueDate}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              Created: {job.createdDate}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <User className="h-3.5 w-3.5" />
                              {job.assignedTo}
                            </div>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="md:text-right md:min-w-[200px] text-sm text-muted-foreground">
                          {job.location}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

