"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  FileText,
  MapPin,
  MoreHorizontal,
  UserPlus,
  Users,
  Briefcase,
  Wrench,
  Zap,
  ClipboardCheck,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewMode, setViewMode] = useState("cards")
  const [showTimesheetApprovals, setShowTimesheetApprovals] = useState(false)

  // Mock team members data
  const teamMembers = [
    {
      id: "tech1",
      name: "John Smith",
      role: "HVAC Technician",
      image: null,
      initials: "JS",
      status: "On Job",
      location: "Downtown Office Tower",
      eta: "2 hours remaining",
      phone: "(555) 123-4567",
      email: "john.smith@fieldpro.com",
      skills: ["HVAC Installation", "HVAC Repair", "Electrical"],
      certifications: ["HVAC Certified", "EPA 608", "OSHA 10"],
      performance: {
        jobsCompleted: 145,
        onTimeRate: 94,
        customerSatisfaction: 4.8,
        utilizationRate: 87,
      },
      currentAssignment: {
        jobId: "JOB-2023-0045",
        customer: "Acme Corp",
        type: "HVAC Repair",
      },
      upcomingAssignments: [
        {
          id: "V-2023-5682",
          customer: "Downtown Office Tower",
          time: "Tomorrow, 10:00 AM",
          type: "HVAC Installation",
        },
        {
          id: "V-2023-5690",
          customer: "City Hospital",
          time: "Wed, 2:00 PM",
          type: "Maintenance",
        },
      ],
      timesheet: {
        status: "Pending Approval",
        weekOf: "Apr 1, 2023",
        totalHours: 32,
        submittedDate: "Apr 4, 2023",
      },
    },
    {
      id: "tech2",
      name: "Sarah Johnson",
      role: "Electrician",
      image: null,
      initials: "SJ",
      status: "On Job",
      location: "TechSolutions Inc",
      eta: "1 hour remaining",
      phone: "(555) 234-5678",
      email: "sarah.johnson@fieldpro.com",
      skills: ["Electrical Installation", "Electrical Repair", "Controls"],
      certifications: ["Licensed Electrician", "OSHA 30", "First Aid"],
      performance: {
        jobsCompleted: 132,
        onTimeRate: 96,
        customerSatisfaction: 4.9,
        utilizationRate: 92,
      },
      currentAssignment: {
        jobId: "JOB-2023-0044",
        customer: "TechSolutions Inc",
        type: "Electrical Upgrade",
      },
      upcomingAssignments: [
        {
          id: "V-2023-5683",
          customer: "Parkside Mall",
          time: "Thu, 9:00 AM",
          type: "Electrical Inspection",
        },
      ],
      timesheet: {
        status: "Pending Approval",
        weekOf: "Apr 1, 2023",
        totalHours: 40,
        submittedDate: "Apr 4, 2023",
      },
    },
    {
      id: "tech3",
      name: "Mike Davis",
      role: "Plumber",
      image: null,
      initials: "MD",
      status: "Available",
      location: "Office",
      eta: "Available now",
      phone: "(555) 345-6789",
      email: "mike.davis@fieldpro.com",
      skills: ["Plumbing Installation", "Plumbing Repair", "Water Heaters"],
      certifications: ["Licensed Plumber", "Backflow Certified", "OSHA 10"],
      performance: {
        jobsCompleted: 118,
        onTimeRate: 91,
        customerSatisfaction: 4.7,
        utilizationRate: 84,
      },
      currentAssignment: null,
      upcomingAssignments: [
        {
          id: "V-2023-5680",
          customer: "Riverside Apartments",
          time: "Tomorrow, 9:00 AM",
          type: "Plumbing",
        },
      ],
      timesheet: {
        status: "Approved",
        weekOf: "Apr 1, 2023",
        totalHours: 38,
        submittedDate: "Apr 3, 2023",
      },
    },
    {
      id: "tech4",
      name: "Lisa Wong",
      role: "Project Manager",
      image: null,
      initials: "LW",
      status: "On Job",
      location: "City Hospital",
      eta: "1 hour remaining",
      phone: "(555) 456-7890",
      email: "lisa.wong@fieldpro.com",
      skills: ["Project Management", "HVAC", "Customer Relations"],
      certifications: ["PMP", "HVAC Certified", "Leadership Training"],
      performance: {
        jobsCompleted: 87,
        onTimeRate: 98,
        customerSatisfaction: 4.9,
        utilizationRate: 95,
      },
      currentAssignment: {
        jobId: "JOB-2023-0042",
        customer: "City Hospital",
        type: "Preventative Maintenance",
      },
      upcomingAssignments: [
        {
          id: "V-2023-5681",
          customer: "City Hospital",
          time: "Tomorrow, 1:00 PM",
          type: "Maintenance",
        },
      ],
      timesheet: {
        status: "Submitted",
        weekOf: "Apr 1, 2023",
        totalHours: 42,
        submittedDate: "Apr 4, 2023",
      },
    },
    {
      id: "tech5",
      name: "Robert Chen",
      role: "Electrician",
      image: null,
      initials: "RC",
      status: "Off Duty",
      location: "Off Duty",
      eta: "Returns tomorrow",
      phone: "(555) 567-8901",
      email: "robert.chen@fieldpro.com",
      skills: ["Electrical Installation", "Electrical Repair", "Lighting"],
      certifications: ["Licensed Electrician", "OSHA 10", "Energy Efficiency"],
      performance: {
        jobsCompleted: 110,
        onTimeRate: 93,
        customerSatisfaction: 4.6,
        utilizationRate: 82,
      },
      currentAssignment: null,
      upcomingAssignments: [
        {
          id: "V-2023-5691",
          customer: "Downtown Office Tower",
          time: "Wed, 9:00 AM",
          type: "Electrical",
        },
      ],
      timesheet: {
        status: "Not Submitted",
        weekOf: "Apr 1, 2023",
        totalHours: 0,
        submittedDate: null,
      },
    },
    {
      id: "tech6",
      name: "Emily Wilson",
      role: "HVAC Technician",
      image: null,
      initials: "EW",
      status: "Available",
      location: "Office",
      eta: "Available now",
      phone: "(555) 678-9012",
      email: "emily.wilson@fieldpro.com",
      skills: ["HVAC Installation", "HVAC Repair", "Refrigeration"],
      certifications: ["HVAC Certified", "EPA 608", "NATE Certified"],
      performance: {
        jobsCompleted: 98,
        onTimeRate: 95,
        customerSatisfaction: 4.8,
        utilizationRate: 86,
      },
      currentAssignment: null,
      upcomingAssignments: [
        {
          id: "V-2023-5692",
          customer: "Acme Corp",
          time: "Tomorrow, 3:00 PM",
          type: "HVAC Repair",
        },
      ],
      timesheet: {
        status: "Pending Approval",
        weekOf: "Apr 1, 2023",
        totalHours: 36,
        submittedDate: "Apr 3, 2023",
      },
    },
    {
      id: "tech7",
      name: "David Kim",
      role: "Controls Specialist",
      image: null,
      initials: "DK",
      status: "On Job",
      location: "TechSolutions Inc",
      eta: "3 hours remaining",
      phone: "(555) 789-0123",
      email: "david.kim@fieldpro.com",
      skills: ["Controls Programming", "Automation", "Electrical"],
      certifications: ["BAS Certified", "OSHA 10", "Energy Management"],
      performance: {
        jobsCompleted: 76,
        onTimeRate: 97,
        customerSatisfaction: 4.9,
        utilizationRate: 89,
      },
      currentAssignment: {
        jobId: "JOB-2023-0044",
        customer: "TechSolutions Inc",
        type: "Electrical Upgrade",
      },
      upcomingAssignments: [
        {
          id: "V-2023-5693",
          customer: "City Hospital",
          time: "Thu, 10:00 AM",
          type: "Controls",
        },
      ],
      timesheet: {
        status: "Approved",
        weekOf: "Apr 1, 2023",
        totalHours: 40,
        submittedDate: "Apr 2, 2023",
      },
    },
  ]

  // Filter team members based on search query, role, and status
  const filteredTeamMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesRole = selectedRole === "all" || member.role.includes(selectedRole)
    const matchesStatus = selectedStatus === "all" || member.status === selectedStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  // Get pending timesheet approvals
  const pendingTimesheetApprovals = teamMembers.filter((member) => member.timesheet.status === "Pending Approval")

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-500"
      case "On Job":
        return "bg-blue-500"
      case "Off Duty":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  // Get skill badge color
  const getSkillBadgeColor = (skill) => {
    if (skill.includes("HVAC")) return "bg-blue-100 text-blue-800 border-blue-200"
    if (skill.includes("Electrical")) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    if (skill.includes("Plumbing")) return "bg-green-100 text-green-800 border-green-200"
    if (skill.includes("Controls")) return "bg-purple-100 text-purple-800 border-purple-200"
    if (skill.includes("Project")) return "bg-indigo-100 text-indigo-800 border-indigo-200"
    return "bg-gray-100 text-gray-800 border-gray-200"
  }

  // Get certification badge color
  const getCertificationBadgeColor = (cert) => {
    return "bg-orange-100 text-orange-800 border-orange-200"
  }

  // Get role icon
  const getRoleIcon = (role) => {
    if (role.includes("HVAC")) return <Wrench className="h-5 w-5" />
    if (role.includes("Electrician")) return <Zap className="h-5 w-5" />
    if (role.includes("Plumber")) return <Wrench className="h-5 w-5" />
    if (role.includes("Project Manager")) return <Briefcase className="h-5 w-5" />
    if (role.includes("Controls")) return <Zap className="h-5 w-5" />
    return <Users className="h-5 w-5" />
  }

  // Get timesheet status color
  const getTimesheetStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-500"
      case "Submitted":
        return "bg-blue-500"
      case "Pending Approval":
        return "bg-yellow-500"
      case "Not Submitted":
        return "bg-gray-400"
      case "Rejected":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Team</h1>
        <p className="text-muted-foreground">Manage your field service team members</p>
      </div>

      {pendingTimesheetApprovals.length > 0 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-yellow-600" />
                <span>Timesheet Approvals</span>
              </div>
              <Badge className="bg-yellow-500">{pendingTimesheetApprovals.length} Pending</Badge>
            </CardTitle>
            <CardDescription>You have timesheets waiting for your approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {pendingTimesheetApprovals.length} team members have submitted timesheets for the week of Apr 1, 2023
              </span>
              <Button variant="outline" size="sm" onClick={() => setShowTimesheetApprovals(true)}>
                Review Timesheets
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search team members..."
              className="w-full pl-8 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="font-medium">Filter by Role</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedRole("all")}>All Roles</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedRole("HVAC")}>HVAC Technicians</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedRole("Electrician")}>Electricians</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedRole("Plumber")}>Plumbers</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedRole("Project Manager")}>Project Managers</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedRole("Controls")}>Controls Specialists</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-medium">Filter by Status</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("all")}>All Statuses</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("Available")}>Available</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("On Job")}>On Job</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("Off Duty")}>Off Duty</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "cards" ? "list" : "cards")}>
            {viewMode === "cards" ? <Users className="h-4 w-4" /> : <Briefcase className="h-4 w-4" />}
          </Button>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>
                Enter the details for the new team member. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hvac">HVAC Technician</SelectItem>
                    <SelectItem value="electrician">Electrician</SelectItem>
                    <SelectItem value="plumber">Plumber</SelectItem>
                    <SelectItem value="pm">Project Manager</SelectItem>
                    <SelectItem value="controls">Controls Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="skills">Skills</Label>
                <Input id="skills" placeholder="Enter skills (comma separated)" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="certifications">Certifications</Label>
                <Input id="certifications" placeholder="Enter certifications (comma separated)" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Input id="notes" placeholder="Enter any additional notes" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Team Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Team</TabsTrigger>
          <TabsTrigger value="available">Available Now</TabsTrigger>
          <TabsTrigger value="on-job">On Job</TabsTrigger>
          <TabsTrigger value="off-duty">Off Duty</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="timesheets">Timesheets</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Team Members</CardTitle>
              <CardDescription>Showing {filteredTeamMembers.length} team members</CardDescription>
            </CardHeader>
            <CardContent>
              {viewMode === "cards" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTeamMembers.map((member) => (
                    <Card key={member.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4 flex items-center gap-4">
                          <Avatar className="h-16 w-16 border-2 border-blue-200">
                            <AvatarImage src={member.image || ""} alt={member.name} />
                            <AvatarFallback className="bg-blue-50 text-blue-600 text-xl">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium truncate">{member.name}</h3>
                              <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              {getRoleIcon(member.role)}
                              <span>{member.role}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <MapPin className="h-3.5 w-3.5" />
                              <span className="truncate">{member.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="px-4 pb-2">
                          <div className="flex flex-wrap gap-1 mt-2">
                            {member.skills.slice(0, 3).map((skill, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className={cn("text-xs py-0 h-5", getSkillBadgeColor(skill))}
                              >
                                {skill}
                              </Badge>
                            ))}
                            {member.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs py-0 h-5 bg-gray-100">
                                +{member.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="bg-muted/20 px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                              <Phone className="h-4 w-4 text-blue-600" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                              <Mail className="h-4 w-4 text-blue-600" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                              <Calendar className="h-4 w-4 text-blue-600" />
                            </Button>
                          </div>
                          <Link href={`/team/${member.id}`}>
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium">Name</th>
                        <th className="text-left p-3 text-sm font-medium">Role</th>
                        <th className="text-left p-3 text-sm font-medium">Status</th>
                        <th className="text-left p-3 text-sm font-medium">Location</th>
                        <th className="text-left p-3 text-sm font-medium">Timesheet</th>
                        <th className="text-right p-3 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTeamMembers.map((member) => (
                        <tr key={member.id} className="border-t hover:bg-muted/20">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={member.image || ""} alt={member.name} />
                                <AvatarFallback className="bg-blue-50 text-blue-600 text-xs">
                                  {member.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{member.name}</div>
                                <div className="text-xs text-muted-foreground">{member.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              {getRoleIcon(member.role)}
                              <span>{member.role}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{member.location}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">{member.eta}</div>
                          </td>
                          <td className="p-3">
                            <Badge className={getTimesheetStatusColor(member.timesheet.status)}>
                              {member.timesheet.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link href={`/team/${member.id}`}>
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              </Link>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Phone className="h-4 w-4 mr-2" />
                                    Call
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Email
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Schedule
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <FileText className="h-4 w-4 mr-2" />
                                    Edit Details
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timesheets" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Timesheet Management</CardTitle>
              <CardDescription>Review and approve team member timesheets</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="pending">Pending Approval ({pendingTimesheetApprovals.length})</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="all-timesheets">All Timesheets</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="mt-4">
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Team Member</TableHead>
                          <TableHead>Week Of</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Hours</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingTimesheetApprovals.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={member.image || ""} alt={member.name} />
                                  <AvatarFallback className="bg-blue-50 text-blue-600 text-xs">
                                    {member.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{member.name}</div>
                                  <div className="text-xs text-muted-foreground">{member.role}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{member.timesheet.weekOf}</TableCell>
                            <TableCell>{member.timesheet.submittedDate}</TableCell>
                            <TableCell>{member.timesheet.totalHours}</TableCell>
                            <TableCell>
                              <Badge className={getTimesheetStatusColor(member.timesheet.status)}>
                                {member.timesheet.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                                <Button size="sm">Approve</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>

                <TabsContent value="approved" className="mt-4">
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Team Member</TableHead>
                          <TableHead>Week Of</TableHead>
                          <TableHead>Approved Date</TableHead>
                          <TableHead>Hours</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teamMembers
                          .filter((member) => member.timesheet.status === "Approved")
                          .map((member) => (
                            <TableRow key={member.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={member.image || ""} alt={member.name} />
                                    <AvatarFallback className="bg-blue-50 text-blue-600 text-xs">
                                      {member.initials}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{member.name}</div>
                                    <div className="text-xs text-muted-foreground">{member.role}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{member.timesheet.weekOf}</TableCell>
                              <TableCell>{member.timesheet.submittedDate}</TableCell>
                              <TableCell>{member.timesheet.totalHours}</TableCell>
                              <TableCell>
                                <Badge className={getTimesheetStatusColor(member.timesheet.status)}>
                                  {member.timesheet.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>

                <TabsContent value="all-timesheets" className="mt-4">
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Team Member</TableHead>
                          <TableHead>Week Of</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Hours</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teamMembers.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={member.image || ""} alt={member.name} />
                                  <AvatarFallback className="bg-blue-50 text-blue-600 text-xs">
                                    {member.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{member.name}</div>
                                  <div className="text-xs text-muted-foreground">{member.role}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{member.timesheet.weekOf}</TableCell>
                            <TableCell>{member.timesheet.submittedDate || "—"}</TableCell>
                            <TableCell>{member.timesheet.totalHours}</TableCell>
                            <TableCell>
                              <Badge className={getTimesheetStatusColor(member.timesheet.status)}>
                                {member.timesheet.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>

                <TabsContent value="reports" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Total Hours This Week</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {teamMembers.reduce((total, member) => total + member.timesheet.totalHours, 0)}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Across {teamMembers.length} team members
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Pending Approvals</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{pendingTimesheetApprovals.length}</div>
                        <div className="text-xs text-muted-foreground mt-1">Timesheets awaiting review</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Overtime Hours</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <div className="text-xs text-muted-foreground mt-1">Hours above regular schedule</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Time Tracking Reports</CardTitle>
                      <CardDescription>Generate reports for payroll and analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Report Type</Label>
                            <Select defaultValue="weekly">
                              <SelectTrigger>
                                <SelectValue placeholder="Select report type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="weekly">Weekly Summary</SelectItem>
                                <SelectItem value="monthly">Monthly Summary</SelectItem>
                                <SelectItem value="payroll">Payroll Export</SelectItem>
                                <SelectItem value="utilization">Utilization Report</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Date Range</Label>
                            <Select defaultValue="current">
                              <SelectTrigger>
                                <SelectValue placeholder="Select date range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="current">Current Week</SelectItem>
                                <SelectItem value="previous">Previous Week</SelectItem>
                                <SelectItem value="month">Current Month</SelectItem>
                                <SelectItem value="custom">Custom Range</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Format</Label>
                            <Select defaultValue="pdf">
                              <SelectTrigger>
                                <SelectValue placeholder="Select format" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pdf">PDF</SelectItem>
                                <SelectItem value="excel">Excel</SelectItem>
                                <SelectItem value="csv">CSV</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button>Generate Report</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tab contents remain the same */}
      </Tabs>

      {/* Timesheet Approval Dialog */}
      <Dialog open={showTimesheetApprovals} onOpenChange={setShowTimesheetApprovals}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Timesheet Approvals</DialogTitle>
            <DialogDescription>Review and approve pending timesheets for the week of Apr 1, 2023</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Member</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Overtime</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingTimesheetApprovals.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.image || ""} alt={member.name} />
                          <AvatarFallback className="bg-blue-50 text-blue-600 text-xs">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{member.timesheet.totalHours}</TableCell>
                    <TableCell>{member.timesheet.totalHours > 40 ? member.timesheet.totalHours - 40 : 0}</TableCell>
                    <TableCell>{member.timesheet.submittedDate}</TableCell>
                    <TableCell>
                      <Badge className={getTimesheetStatusColor(member.timesheet.status)}>
                        {member.timesheet.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTimesheetApprovals(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowTimesheetApprovals(false)}>Approve All</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

