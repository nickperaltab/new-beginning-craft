"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Users,
  Briefcase,
  Wrench,
  Zap,
  ClipboardCheck,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Reuse the types from the team page
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

// Mock data - in a real app, this would come from an API
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
      submittedDate: "Apr 4, 2023"
    }
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
      submittedDate: "Apr 3, 2023"
    }
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
      submittedDate: "Apr 4, 2023"
    }
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
      submittedDate: null
    }
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
      submittedDate: "Apr 3, 2023"
    }
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
      submittedDate: "Apr 2, 2023"
    }
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
      submittedDate: null
    }
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
      submittedDate: null
    }
  }
]

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

export default function TeamMemberPage() {
  const params = useParams()
  const member = teamMembers.find(m => m.id === params.id)

  if (!member) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Member not found</h1>
          <Link href="/team">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Team
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/team">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{member.name}</h1>
          <p className="text-muted-foreground">{member.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Member information and details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={member.image} />
                  <AvatarFallback className="text-2xl">{member.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <Badge className={cn(
                      member.type === "subcontractor" 
                        ? "bg-orange-500" 
                        : "bg-blue-500"
                    )}>
                      {member.type === "subcontractor" ? "Subcontractor" : "Core Team"}
                    </Badge>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{member.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{member.location}</span>
                </div>
                {member.eta && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{member.eta}</span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
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
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Timesheet</CardTitle>
              <CardDescription>Current week's timesheet status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Status</span>
                </div>
                <Badge className={cn(
                  member.timesheet.status === "Approved" && "bg-green-500",
                  member.timesheet.status === "Submitted" && "bg-blue-500",
                  member.timesheet.status === "Pending Approval" && "bg-yellow-500",
                  member.timesheet.status === "Not Submitted" && "bg-gray-400",
                  member.timesheet.status === "Rejected" && "bg-red-500"
                )}>
                  {member.timesheet.status}
                </Badge>
              </div>
              {member.timesheet.weekOf && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Week of</span>
                  </div>
                  <span>{member.timesheet.weekOf}</span>
                </div>
              )}
              {member.timesheet.totalHours !== undefined && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                    <span>Total Hours</span>
                  </div>
                  <span>{member.timesheet.totalHours} hours</span>
                </div>
              )}
              {member.timesheet.submittedDate && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Submitted</span>
                  </div>
                  <span>{member.timesheet.submittedDate}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

