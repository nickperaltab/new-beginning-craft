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

// Update type definitions at the top of the file
type Status = "Available" | "On Job" | "Off Duty" | "Pending" | "Approved" | "Submitted" | "Pending Approval" | "Not Submitted" | "Rejected"
type BaseSkill = "HVAC" | "Plumbing" | "Electrical" | "General" | "Carpentry" | "Controls" | "Project"
type Skill = BaseSkill | `${BaseSkill} Installation` | `${BaseSkill} Repair` | "Water Heaters" | "Project Management" | "Customer Relations" | "Controls Programming" | "Automation" | "Refrigeration" | "Lighting"
type BaseRole = "Technician" | "Supervisor" | "Manager" | "Admin" | "Specialist" | "Electrician" | "Plumber"
type Role = BaseRole | `${BaseSkill} ${BaseRole}` | "Project Manager" | "Controls Specialist" | "Plumbing Contractor" | "Electrical Contractor"

interface TeamMember {
  id: string
  name: string
  email: string
  image?: string
  initials: string
  role: Role
  status: Status
  location: string
  eta?: string
  skills: Skill[]
  type: "core" | "subcontractor"
  timesheet: {
    status: Status
    weekOf?: string
    totalHours?: number
    submittedDate?: string | null
  }
}

const getStatusColor = (status: Status): string => {
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

const getSkillBadgeColor = (skill: Skill): string => {
  if (skill.includes("HVAC")) return "bg-blue-100 text-blue-800 border-blue-200"
  if (skill.includes("Electrical")) return "bg-yellow-100 text-yellow-800 border-yellow-200"
  if (skill.includes("Plumbing")) return "bg-green-100 text-green-800 border-green-200"
  if (skill.includes("Controls")) return "bg-purple-100 text-purple-800 border-purple-200"
  if (skill.includes("Project")) return "bg-indigo-100 text-indigo-800 border-indigo-200"
  return "bg-gray-100 text-gray-800 border-gray-200"
}

const getCertificationBadgeColor = (cert: string): string => {
  return "bg-orange-100 text-orange-800 border-orange-200"
}

const getRoleIcon = (role: Role) => {
  if (role.includes("HVAC")) return <Wrench className="h-5 w-5" />
  if (role.includes("Electrician")) return <Zap className="h-5 w-5" />
  if (role.includes("Plumber")) return <Wrench className="h-5 w-5" />
  if (role.includes("Project Manager")) return <Briefcase className="h-5 w-5" />
  if (role.includes("Controls")) return <Zap className="h-5 w-5" />
  return <Users className="h-5 w-5" />
}

const getTimesheetStatusColor = (status: Status): string => {
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

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [viewMode, setViewMode] = useState("cards")
  const [activeTab, setActiveTab] = useState("all")

  // Mock team members data
  const teamMembers: TeamMember[] = [
    {
      id: "tech1",
      name: "John Smith",
      email: "john.smith@fieldpro.com",
      image: undefined,
      initials: "JS",
      role: "HVAC Technician",
      status: "On Job",
      location: "Downtown Office Tower",
      eta: "2 hours remaining",
      skills: ["HVAC Installation", "HVAC Repair", "Electrical"],
      type: "core",
      timesheet: {
        status: "Pending Approval",
        weekOf: "Apr 1, 2023",
        totalHours: 42,
        submittedDate: "Apr 7, 2023"
      }
    },
    {
      id: "tech2",
      name: "Sarah Johnson",
      email: "sarah.johnson@fieldpro.com",
      image: undefined,
      initials: "SJ",
      role: "Electrician",
      status: "On Job",
      location: "TechSolutions Inc",
      eta: "1 hour remaining",
      skills: ["Electrical Installation", "Electrical Repair", "Controls"],
      type: "core",
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
      email: "mike.davis@fieldpro.com",
      image: undefined,
      initials: "MD",
      role: "Plumber",
      status: "Available",
      location: "Office",
      eta: "Available now",
      skills: ["Plumbing Installation", "Plumbing Repair", "Water Heaters"],
      type: "core",
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
      email: "lisa.wong@fieldpro.com",
      image: undefined,
      initials: "LW",
      role: "Project Manager",
      status: "On Job",
      location: "City Hospital",
      eta: "1 hour remaining",
      skills: ["Project Management", "HVAC", "Customer Relations"],
      type: "core",
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
      email: "robert.chen@fieldpro.com",
      image: undefined,
      initials: "RC",
      role: "Electrician",
      status: "Off Duty",
      location: "Off Duty",
      eta: "Returns tomorrow",
      skills: ["Electrical Installation", "Electrical Repair", "Lighting"],
      type: "core",
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
      email: "emily.wilson@fieldpro.com",
      image: undefined,
      initials: "EW",
      role: "HVAC Technician",
      status: "Available",
      location: "Office",
      eta: "Available now",
      skills: ["HVAC Installation", "HVAC Repair", "Refrigeration"],
      type: "core",
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
      email: "david.kim@fieldpro.com",
      image: undefined,
      initials: "DK",
      role: "Controls Specialist",
      status: "On Job",
      location: "TechSolutions Inc",
      eta: "1 hour remaining",
      skills: ["Controls Programming", "Automation", "Electrical"],
      type: "core",
      timesheet: {
        status: "Approved",
        weekOf: "Apr 1, 2023",
        totalHours: 40,
        submittedDate: "Apr 2, 2023",
      },
    },
    {
      id: "sub-001",
      name: "Expert Plumbing Services",
      email: "dmartinez@expertplumbing.com",
      image: undefined,
      initials: "EP",
      role: "Plumbing Contractor",
      status: "Available",
      location: "Watertown, MA",
      eta: "Available on call",
      skills: ["Plumbing Installation", "Plumbing Repair", "Water Heaters"],
      type: "subcontractor",
      timesheet: {
        status: "Not Submitted",
        weekOf: "Apr 1, 2023",
        totalHours: 0,
        submittedDate: null,
      },
    },
    {
      id: "sub-002",
      name: "Elite Electrical Contractors",
      email: "info@eliteelectrical.com",
      image: undefined,
      initials: "EE",
      role: "Electrical Contractor",
      status: "Available",
      location: "Metropolis, NY",
      eta: "Available on call",
      skills: ["Electrical Installation", "Electrical Repair", "Lighting"],
      type: "subcontractor",
      timesheet: {
        status: "Not Submitted",
        weekOf: "Apr 1, 2023",
        totalHours: 0,
        submittedDate: null,
      },
    },
  ]

  // Filter team members based on search query, role, status, and type
  const filteredTeamMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = selectedRole === "all" || member.role === selectedRole
    const matchesStatus = selectedStatus === "all" || member.status === selectedStatus
    const matchesType = selectedType === "all" || member.type === selectedType

    return matchesSearch && matchesRole && matchesStatus && matchesType
  })

  // Get pending timesheet approvals
  const pendingTimesheetApprovals = teamMembers.filter((member) => member.timesheet.status === "Pending Approval")

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground">Manage field crew and subcontractors</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Member Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                <SelectItem value="core">Core Team</SelectItem>
                <SelectItem value="subcontractor">Subcontractors</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="HVAC Technician">HVAC Technician</SelectItem>
                <SelectItem value="Electrician">Electrician</SelectItem>
                <SelectItem value="Plumber">Plumber</SelectItem>
                <SelectItem value="Project Manager">Project Manager</SelectItem>
                <SelectItem value="Controls Specialist">Controls Specialist</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="On Job">On Job</SelectItem>
                <SelectItem value="Off Duty">Off Duty</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={viewMode} onValueChange={setViewMode}>
          <TabsList>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>
          <TabsContent value="cards">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTeamMembers.map((member) => (
                <Card key={member.id} className={cn(
                  member.type === "subcontractor" && "border-orange-200 bg-orange-50/50"
                )}>
                  <Link href={`/team/${member.id}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.image} />
                            <AvatarFallback>{member.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{member.name}</CardTitle>
                            <CardDescription>{member.role}</CardDescription>
                          </div>
                        </div>
                        <Badge className={cn(
                          member.type === "subcontractor" 
                            ? "bg-orange-500" 
                            : "bg-blue-500"
                        )}>
                          {member.type === "subcontractor" ? "Subcontractor" : "Core Team"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{member.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{member.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{member.status}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className={getSkillBadgeColor(skill)}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="table">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeamMembers.map((member) => (
                  <TableRow key={member.id} className={cn(
                    member.type === "subcontractor" && "bg-orange-50/50"
                  )}>
                    <TableCell>
                      <Link href={`/team/${member.id}`} className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={member.image} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>
                      <Badge className={cn(
                        member.type === "subcontractor" 
                          ? "bg-orange-500" 
                          : "bg-blue-500"
                      )}>
                        {member.type === "subcontractor" ? "Subcontractor" : "Core Team"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{member.location}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 2).map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className={getSkillBadgeColor(skill)}
                          >
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 2 && (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                            +{member.skills.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

