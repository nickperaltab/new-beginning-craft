"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Award,
  MapPin,
  MoreHorizontal,
  Star,
  Edit,
  Download,
  Upload,
  Briefcase,
  FileCheck,
  ClipboardList,
  PenTool,
  Plus,
  ClipboardCheck,
  Check,
  X,
  Play,
  Pause,
  Timer,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TeamMemberPage({ params }: { params: { id: string } }) {
  const [activeTimesheet, setActiveTimesheet] = useState<string>("current")
  const [showNewEntryDialog, setShowNewEntryDialog] = useState(false)
  const [showTimerDialog, setShowTimerDialog] = useState(false)
  const [timerActive, setTimerActive] = useState(false)
  const [timerTime, setTimerTime] = useState(0)
  const [timerJob, setTimerJob] = useState("")
  const [timerTask, setTimerTask] = useState("")

  // In a real app, you would fetch the team member data based on the ID
  const teamMember = {
    id: params.id || "tech1",
    name: "John Smith",
    role: "HVAC Technician",
    image: null,
    initials: "JS",
    status: "On Job",
    location: "Downtown Office Tower",
    eta: "2 hours remaining",
    phone: "(555) 123-4567",
    email: "john.smith@fieldpro.com",
    address: "123 Technician Lane, Serviceville, CA 94123",
    hireDate: "March 15, 2020",
    skills: ["HVAC Installation", "HVAC Repair", "Electrical", "Refrigeration", "Controls Basics"],
    certifications: [
      { name: "HVAC Certified", expiry: "Dec 31, 2025", status: "Active" },
      { name: "EPA 608", expiry: "Dec 31, 2024", status: "Active" },
      { name: "OSHA 10", expiry: "Jun 15, 2023", status: "Expired" },
    ],
    performance: {
      jobsCompleted: 145,
      onTimeRate: 94,
      customerSatisfaction: 4.8,
      utilizationRate: 87,
      responseTime: "28 min avg",
      firstTimeFixRate: "92%",
    },
    currentAssignment: {
      jobId: "JOB-2023-0045",
      customer: "Acme Corp",
      type: "HVAC Repair",
      address: "123 Main St, Suite 101",
      startTime: "10:30 AM",
      estimatedCompletion: "2:30 PM",
    },
    upcomingAssignments: [
      {
        id: "V-2023-5682",
        customer: "Downtown Office Tower",
        time: "Tomorrow, 10:00 AM",
        type: "HVAC Installation",
        address: "500 Business Ave",
        duration: "4 hours",
      },
      {
        id: "V-2023-5690",
        customer: "City Hospital",
        time: "Wed, 2:00 PM",
        type: "Maintenance",
        address: "100 Health Way",
        duration: "2 hours",
      },
    ],
    recentJobs: [
      {
        id: "JOB-2023-0040",
        customer: "TechSolutions Inc",
        date: "Mar 15, 2023",
        type: "HVAC Repair",
        status: "Completed",
        rating: 5,
      },
      {
        id: "JOB-2023-0038",
        customer: "Riverside Apartments",
        date: "Mar 12, 2023",
        type: "HVAC Maintenance",
        status: "Completed",
        rating: 4,
      },
      {
        id: "JOB-2023-0035",
        customer: "City Hospital",
        date: "Mar 8, 2023",
        type: "HVAC Installation",
        status: "Completed",
        rating: 5,
      },
    ],
    documents: [
      { name: "HVAC Certification.pdf", type: "certification", date: "Jan 10, 2022", size: "1.2 MB" },
      { name: "EPA 608 Certificate.pdf", type: "certification", date: "Mar 22, 2021", size: "0.8 MB" },
      { name: "Training Record.pdf", type: "training", date: "Nov 15, 2022", size: "2.4 MB" },
      { name: "Performance Review 2022.pdf", type: "review", date: "Dec 12, 2022", size: "1.5 MB" },
    ],
    notes: [
      {
        id: "note1",
        author: "Lisa Wong",
        date: "Mar 14, 2023",
        content: "John completed the advanced HVAC troubleshooting training with excellent results.",
      },
      {
        id: "note2",
        author: "Robert Chen",
        date: "Feb 22, 2023",
        content:
          "Discussed career development path. John is interested in learning more about building automation systems.",
      },
    ],
    availability: {
      regularHours: "Mon-Fri, 8:00 AM - 5:00 PM",
      timeOff: [
        { start: "Apr 10, 2023", end: "Apr 14, 2023", type: "Vacation" },
        { start: "May 25, 2023", end: "May 25, 2023", type: "Personal" },
      ],
    },
    timesheets: {
      current: {
        weekOf: "Apr 1, 2023",
        status: "In Progress",
        totalHours: 32,
        regularHours: 32,
        overtimeHours: 0,
        entries: [
          {
            id: "TS-001",
            date: "Apr 1, 2023",
            jobId: "JOB-2023-0045",
            customer: "Acme Corp",
            task: "HVAC Repair",
            startTime: "8:00 AM",
            endTime: "12:00 PM",
            hours: 4,
            notes: "Diagnosed and repaired faulty compressor",
            status: "Approved",
          },
          {
            id: "TS-002",
            date: "Apr 1, 2023",
            jobId: "JOB-2023-0045",
            customer: "Acme Corp",
            task: "HVAC Repair",
            startTime: "1:00 PM",
            endTime: "5:00 PM",
            hours: 4,
            notes: "Completed repair and tested system",
            status: "Approved",
          },
          {
            id: "TS-003",
            date: "Apr 2, 2023",
            jobId: "JOB-2023-0046",
            customer: "TechSolutions Inc",
            task: "Maintenance",
            startTime: "8:00 AM",
            endTime: "4:00 PM",
            hours: 8,
            notes: "Quarterly maintenance of all HVAC units",
            status: "Pending",
          },
          {
            id: "TS-004",
            date: "Apr 3, 2023",
            jobId: "JOB-2023-0047",
            customer: "City Hospital",
            task: "HVAC Installation",
            startTime: "8:00 AM",
            endTime: "4:00 PM",
            hours: 8,
            notes: "Installed new AC unit in east wing",
            status: "Submitted",
          },
          {
            id: "TS-005",
            date: "Apr 4, 2023",
            jobId: "JOB-2023-0048",
            customer: "Downtown Office Tower",
            task: "Inspection",
            startTime: "8:00 AM",
            endTime: "12:00 PM",
            hours: 4,
            notes: "Annual inspection of all HVAC systems",
            status: "Draft",
          },
          {
            id: "TS-006",
            date: "Apr 4, 2023",
            jobId: "JOB-2023-0049",
            customer: "Riverside Apartments",
            task: "Estimate",
            startTime: "1:00 PM",
            endTime: "5:00 PM",
            hours: 4,
            notes: "Provided estimate for new AC installation",
            status: "Draft",
          },
        ],
      },
      previous: {
        weekOf: "Mar 25, 2023",
        status: "Approved",
        totalHours: 42,
        regularHours: 40,
        overtimeHours: 2,
        entries: [
          {
            id: "TS-101",
            date: "Mar 25, 2023",
            jobId: "JOB-2023-0040",
            customer: "TechSolutions Inc",
            task: "HVAC Repair",
            startTime: "8:00 AM",
            endTime: "5:00 PM",
            hours: 8,
            notes: "Emergency repair of main cooling system",
            status: "Approved",
          },
          {
            id: "TS-102",
            date: "Mar 26, 2023",
            jobId: "JOB-2023-0041",
            customer: "Riverside Apartments",
            task: "HVAC Maintenance",
            startTime: "8:00 AM",
            endTime: "6:00 PM",
            hours: 10,
            notes: "Maintenance of multiple units across complex",
            status: "Approved",
          },
          {
            id: "TS-103",
            date: "Mar 27, 2023",
            jobId: "JOB-2023-0042",
            customer: "City Hospital",
            task: "HVAC Installation",
            startTime: "8:00 AM",
            endTime: "4:00 PM",
            hours: 8,
            notes: "New installation in pediatric wing",
            status: "Approved",
          },
          {
            id: "TS-104",
            date: "Mar 28, 2023",
            jobId: "JOB-2023-0043",
            customer: "Downtown Office Tower",
            task: "HVAC Repair",
            startTime: "8:00 AM",
            endTime: "4:00 PM",
            hours: 8,
            notes: "Repaired cooling tower",
            status: "Approved",
          },
          {
            id: "TS-105",
            date: "Mar 29, 2023",
            jobId: "JOB-2023-0044",
            customer: "Acme Corp",
            task: "HVAC Maintenance",
            startTime: "8:00 AM",
            endTime: "6:00 PM",
            hours: 8,
            notes: "Quarterly maintenance of all systems",
            status: "Approved",
          },
        ],
      },
    },
  }

  // Get status color
  const getStatusColor = (status: string) => {
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
  const getSkillBadgeColor = (skill: string) => {
    if (skill.includes("HVAC")) return "bg-blue-100 text-blue-800 border-blue-200"
    if (skill.includes("Electrical")) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    if (skill.includes("Plumbing")) return "bg-green-100 text-green-800 border-green-200"
    if (skill.includes("Controls")) return "bg-purple-100 text-purple-800 border-purple-200"
    if (skill.includes("Refrigeration")) return "bg-cyan-100 text-cyan-800 border-cyan-200"
    return "bg-gray-100 text-gray-800 border-gray-200"
  }

  // Get certification status color
  const getCertificationStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "Expiring Soon":
        return "bg-yellow-500"
      case "Expired":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  // Get document type icon
  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case "certification":
        return <Award className="h-4 w-4" />
      case "training":
        return <FileCheck className="h-4 w-4" />
      case "review":
        return <ClipboardList className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  // Get timesheet entry status color
  const getTimesheetStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500"
      case "Submitted":
        return "bg-blue-500"
      case "Pending":
        return "bg-yellow-500"
      case "Draft":
        return "bg-gray-400"
      case "Rejected":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  // Format time as hours and minutes
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
  }

  // Toggle timer
  const toggleTimer = () => {
    setTimerActive(!timerActive)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/team">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{teamMember.name}</h1>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{teamMember.name}</h1>
          <p className="text-muted-foreground">{teamMember.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Overview Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-3">
                  <Avatar className="h-32 w-32 border-4 border-blue-200">
                    <AvatarImage src={teamMember.image || ""} alt={teamMember.name} />
                    <AvatarFallback className="bg-blue-50 text-blue-600 text-4xl">{teamMember.initials}</AvatarFallback>
                  </Avatar>
                  <Badge className={cn("text-sm py-1", getStatusColor(teamMember.status))}>{teamMember.status}</Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0">
                      <Phone className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0">
                      <Mail className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{teamMember.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{teamMember.role}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{teamMember.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{teamMember.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{teamMember.address}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Hired: {teamMember.hireDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{teamMember.availability.regularHours}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        <span>{teamMember.performance.jobsCompleted} Jobs Completed</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {teamMember.skills.map((skill, i) => (
                        <Badge key={i} variant="outline" className={getSkillBadgeColor(skill)}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="schedule" className="w-full">
            <TabsList>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="timesheets">Timesheets</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Schedule & Assignments</CardTitle>
                  <CardDescription>Current and upcoming assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Current Assignment */}
                    {teamMember.currentAssignment && (
                      <div>
                        <h3 className="text-sm font-medium mb-3">Current Assignment</h3>
                        <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{teamMember.currentAssignment.customer}</h4>
                                <Badge className="bg-blue-500">In Progress</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{teamMember.currentAssignment.type}</p>
                              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5" />
                                {teamMember.currentAssignment.address}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm">
                                <Clock className="h-3.5 w-3.5 inline-block mr-1" />
                                Started at {teamMember.currentAssignment.startTime}
                              </div>
                              <div className="text-sm">
                                <Calendar className="h-3.5 w-3.5 inline-block mr-1" />
                                Est. completion: {teamMember.currentAssignment.estimatedCompletion}
                              </div>
                              <div className="mt-2">
                                <Link href={`/jobs/${teamMember.currentAssignment.jobId}`}>
                                  <Button variant="outline" size="sm">
                                    View Job
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Upcoming Assignments */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Upcoming Assignments</h3>
                      <div className="space-y-3">
                        {teamMember.upcomingAssignments.map((assignment, index) => (
                          <div key={index} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{assignment.customer}</h4>
                                  <Badge className="bg-yellow-500">Scheduled</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{assignment.type}</p>
                                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                  <MapPin className="h-3.5 w-3.5" />
                                  {assignment.address}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm">
                                  <Calendar className="h-3.5 w-3.5 inline-block mr-1" />
                                  {assignment.time}
                                </div>
                                <div className="text-sm">
                                  <Clock className="h-3.5 w-3.5 inline-block mr-1" />
                                  Duration: {assignment.duration}
                                </div>
                                <div className="mt-2">
                                  <Link href={`/schedule/${assignment.id}`}>
                                    <Button variant="outline" size="sm">
                                      View Details
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Time Off */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Scheduled Time Off</h3>
                      <div className="space-y-3">
                        {teamMember.availability.timeOff.map((timeOff, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{timeOff.type}</h4>
                                </div>
                                <div className="flex items-center gap-1 mt-1 text-sm">
                                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                  {timeOff.start === timeOff.end ? (
                                    <span>{timeOff.start}</span>
                                  ) : (
                                    <span>
                                      {timeOff.start} to {timeOff.end}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timesheets" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <CardTitle>Timesheets</CardTitle>
                      <CardDescription>Time tracking and work hours</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dialog open={showTimerDialog} onOpenChange={setShowTimerDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Timer className="h-4 w-4 mr-2" />
                            Time Tracker
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Time Tracker</DialogTitle>
                            <DialogDescription>Track time for the current job in real-time.</DialogDescription>
                          </DialogHeader>
                          <div className="py-4 space-y-4">
                            <div className="text-center">
                              <div className="text-4xl font-bold mb-2">{formatTime(timerTime)}</div>
                              <div className="flex justify-center gap-2">
                                <Button
                                  variant={timerActive ? "destructive" : "default"}
                                  onClick={toggleTimer}
                                  className="w-24"
                                >
                                  {timerActive ? (
                                    <>
                                      <Pause className="h-4 w-4 mr-2" />
                                      Pause
                                    </>
                                  ) : (
                                    <>
                                      <Play className="h-4 w-4 mr-2" />
                                      Start
                                    </>
                                  )}
                                </Button>
                                <Button variant="outline" className="w-24">
                                  <X className="h-4 w-4 mr-2" />
                                  Reset
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label htmlFor="timer-job">Job</Label>
                                <Select value={timerJob} onValueChange={setTimerJob}>
                                  <SelectTrigger id="timer-job">
                                    <SelectValue placeholder="Select job" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="JOB-2023-0045">JOB-2023-0045 - Acme Corp</SelectItem>
                                    <SelectItem value="JOB-2023-0046">JOB-2023-0046 - TechSolutions Inc</SelectItem>
                                    <SelectItem value="JOB-2023-0047">JOB-2023-0047 - City Hospital</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="timer-task">Task</Label>
                                <Select value={timerTask} onValueChange={setTimerTask}>
                                  <SelectTrigger id="timer-task">
                                    <SelectValue placeholder="Select task" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="repair">HVAC Repair</SelectItem>
                                    <SelectItem value="maintenance">Maintenance</SelectItem>
                                    <SelectItem value="installation">Installation</SelectItem>
                                    <SelectItem value="inspection">Inspection</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="timer-notes">Notes</Label>
                                <Textarea id="timer-notes" placeholder="Add notes about the work performed" />
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowTimerDialog(false)}>
                              Cancel
                            </Button>
                            <Button onClick={() => setShowTimerDialog(false)}>Save Time Entry</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={showNewEntryDialog} onOpenChange={setShowNewEntryDialog}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            New Entry
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Add Time Entry</DialogTitle>
                            <DialogDescription>Record time spent on a job or task.</DialogDescription>
                          </DialogHeader>
                          <div className="py-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="entry-date">Date</Label>
                                <Input id="entry-date" type="date" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="entry-job">Job</Label>
                                <Select>
                                  <SelectTrigger id="entry-job">
                                    <SelectValue placeholder="Select job" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="JOB-2023-0045">JOB-2023-0045 - Acme Corp</SelectItem>
                                    <SelectItem value="JOB-2023-0046">JOB-2023-0046 - TechSolutions Inc</SelectItem>
                                    <SelectItem value="JOB-2023-0047">JOB-2023-0047 - City Hospital</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="entry-start">Start Time</Label>
                                <Input id="entry-start" type="time" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="entry-end">End Time</Label>
                                <Input id="entry-end" type="time" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="entry-task">Task</Label>
                              <Select>
                                <SelectTrigger id="entry-task">
                                  <SelectValue placeholder="Select task" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="repair">HVAC Repair</SelectItem>
                                  <SelectItem value="maintenance">Maintenance</SelectItem>
                                  <SelectItem value="installation">Installation</SelectItem>
                                  <SelectItem value="inspection">Inspection</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="entry-notes">Notes</Label>
                              <Textarea id="entry-notes" placeholder="Add notes about the work performed" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowNewEntryDialog(false)}>
                              Cancel
                            </Button>
                            <Button onClick={() => setShowNewEntryDialog(false)}>Save Entry</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <Tabs value={activeTimesheet} onValueChange={setActiveTimesheet} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="current">Current Week</TabsTrigger>
                        <TabsTrigger value="previous">Previous Week</TabsTrigger>
                      </TabsList>
                      <TabsContent value="current" className="mt-4 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium">Week of {teamMember.timesheets.current.weekOf}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getTimesheetStatusColor(teamMember.timesheets.current.status)}>
                                {teamMember.timesheets.current.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {teamMember.timesheets.current.totalHours} hours total
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2 md:mt-0">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </Button>
                            <Button size="sm">
                              <Check className="h-4 w-4 mr-2" />
                              Submit for Approval
                            </Button>
                          </div>
                        </div>

                        <Card>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Job</TableHead>
                                <TableHead>Task</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Hours</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {teamMember.timesheets.current.entries.map((entry) => (
                                <TableRow key={entry.id}>
                                  <TableCell>{entry.date}</TableCell>
                                  <TableCell>
                                    <div className="font-medium">{entry.customer}</div>
                                    <div className="text-xs text-muted-foreground">{entry.jobId}</div>
                                  </TableCell>
                                  <TableCell>{entry.task}</TableCell>
                                  <TableCell>
                                    {entry.startTime} - {entry.endTime}
                                  </TableCell>
                                  <TableCell>{entry.hours}</TableCell>
                                  <TableCell>
                                    <Badge className={getTimesheetStatusColor(entry.status)}>{entry.status}</Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Edit className="h-4 w-4 mr-2" />
                                          Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <ClipboardCheck className="h-4 w-4 mr-2" />
                                          Mark as Complete
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">
                                          <X className="h-4 w-4 mr-2" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">Regular Hours</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{teamMember.timesheets.current.regularHours}</div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">Overtime Hours</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{teamMember.timesheets.current.overtimeHours}</div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">Total Hours</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{teamMember.timesheets.current.totalHours}</div>
                              <Progress
                                value={(teamMember.timesheets.current.totalHours / 40) * 100}
                                className="h-2 mt-2"
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>

                      <TabsContent value="previous" className="mt-4 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium">Week of {teamMember.timesheets.previous.weekOf}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getTimesheetStatusColor(teamMember.timesheets.previous.status)}>
                                {teamMember.timesheets.previous.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {teamMember.timesheets.previous.totalHours} hours total
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2 md:mt-0">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </Button>
                          </div>
                        </div>

                        <Card>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Job</TableHead>
                                <TableHead>Task</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Hours</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {teamMember.timesheets.previous.entries.map((entry) => (
                                <TableRow key={entry.id}>
                                  <TableCell>{entry.date}</TableCell>
                                  <TableCell>
                                    <div className="font-medium">{entry.customer}</div>
                                    <div className="text-xs text-muted-foreground">{entry.jobId}</div>
                                  </TableCell>
                                  <TableCell>{entry.task}</TableCell>
                                  <TableCell>
                                    {entry.startTime} - {entry.endTime}
                                  </TableCell>
                                  <TableCell>{entry.hours}</TableCell>
                                  <TableCell>
                                    <Badge className={getTimesheetStatusColor(entry.status)}>{entry.status}</Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">Regular Hours</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{teamMember.timesheets.previous.regularHours}</div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">Overtime Hours</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{teamMember.timesheets.previous.overtimeHours}</div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">Total Hours</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{teamMember.timesheets.previous.totalHours}</div>
                              <Progress
                                value={(teamMember.timesheets.previous.totalHours / 40) * 100}
                                className="h-2 mt-2"
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certifications" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Certifications & Qualifications</CardTitle>
                  <CardDescription>Professional certifications and qualifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Certifications */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium">Active Certifications</h3>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Certification
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {teamMember.certifications.map((cert, index) => (
                          <div key={index} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <Award className="h-5 w-5 text-orange-500" />
                                  <h4 className="font-medium">{cert.name}</h4>
                                  <Badge className={getCertificationStatusColor(cert.status)}>{cert.status}</Badge>
                                </div>
                                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                                  <Calendar className="h-3.5 w-3.5" />
                                  Expires: {cert.expiry}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <FileText className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Training History */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Training History</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="text-left p-3 text-sm font-medium">Training</th>
                              <th className="text-left p-3 text-sm font-medium">Date Completed</th>
                              <th className="text-left p-3 text-sm font-medium">Instructor</th>
                              <th className="text-left p-3 text-sm font-medium">Score</th>
                              <th className="text-right p-3 text-sm font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t hover:bg-muted/20">
                              <td className="p-3 font-medium">Advanced HVAC Troubleshooting</td>
                              <td className="p-3">Mar 10, 2023</td>
                              <td className="p-3">Robert Chen</td>
                              <td className="p-3">95%</td>
                              <td className="p-3 text-right">
                                <Button variant="outline" size="sm">
                                  <FileText className="h-4 w-4 mr-1" />
                                  Certificate
                                </Button>
                              </td>
                            </tr>
                            <tr className="border-t hover:bg-muted/20">
                              <td className="p-3 font-medium">Customer Service Excellence</td>
                              <td className="p-3">Jan 15, 2023</td>
                              <td className="p-3">Lisa Wong</td>
                              <td className="p-3">98%</td>
                              <td className="p-3 text-right">
                                <Button variant="outline" size="sm">
                                  <FileText className="h-4 w-4 mr-1" />
                                  Certificate
                                </Button>
                              </td>
                            </tr>
                            <tr className="border-t hover:bg-muted/20">
                              <td className="p-3 font-medium">Refrigerant Handling</td>
                              <td className="p-3">Nov 22, 2022</td>
                              <td className="p-3">Mike Davis</td>
                              <td className="p-3">92%</td>
                              <td className="p-3 text-right">
                                <Button variant="outline" size="sm">
                                  <FileText className="h-4 w-4 mr-1" />
                                  Certificate
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          {/* Current Status Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className={cn("h-3 w-3 rounded-full", getStatusColor(teamMember.status))}></div>
                  <span className="font-medium">{teamMember.status}</span>
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{teamMember.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{teamMember.eta}</span>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Assign
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timesheet Summary Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Timesheet Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Current Week</span>
                    <span className="font-medium">{teamMember.timesheets.current.totalHours} hours</span>
                  </div>
                  <Progress value={(teamMember.timesheets.current.totalHours / 40) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Regular: {teamMember.timesheets.current.regularHours}h</span>
                    <span>Overtime: {teamMember.timesheets.current.overtimeHours}h</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Status</span>
                    <Badge className={getTimesheetStatusColor(teamMember.timesheets.current.status)}>
                      {teamMember.timesheets.current.status}
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Recent Activity</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Today</span>
                      <span className="font-medium">0 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Yesterday</span>
                      <span className="font-medium">8 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This Week</span>
                      <span className="font-medium">{teamMember.timesheets.current.totalHours} hours</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <Button variant="outline" className="w-full">
                  <ClipboardCheck className="h-4 w-4 mr-1" />
                  View Full Timesheet
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Certifications Summary */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Skills & Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Top Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {teamMember.skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className={getSkillBadgeColor(skill)}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium mb-2">Certifications</h3>
                  <div className="space-y-2">
                    {teamMember.certifications.map((cert, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">{cert.name}</span>
                        </div>
                        <Badge className={getCertificationStatusColor(cert.status)}>{cert.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <FileCheck className="h-4 w-4 mr-1" />
                  Manage Certifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

