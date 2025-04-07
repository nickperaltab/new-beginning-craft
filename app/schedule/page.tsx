"use client"

import { useState, useRef, useEffect } from "react"
import {
  format,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  isToday,
  parseISO,
  isSameDay,
} from "date-fns"
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  MapPin,
  Clock,
  Users,
  CheckCircle,
  Search,
  CalendarDays,
  Calendar,
  AlertTriangle,
  CalendarOff,
} from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for technicians
const technicians = [
  { id: "tech1", name: "Tom Harris", initials: "TH", role: "HVAC Technician", status: "Available", color: "#3b82f6" },
  { id: "tech2", name: "Sarah Johnson", initials: "SJ", role: "Electrician", status: "On Job", color: "#8b5cf6" },
  { id: "tech3", name: "Mike Davis", initials: "MD", role: "Plumber", status: "Available", color: "#10b981" },
  { id: "tech4", name: "Lisa Wong", initials: "LW", role: "Foreman", status: "On Job", color: "#f59e0b" },
  { id: "tech5", name: "Robert Chen", initials: "RC", role: "Electrician", status: "Off Duty", color: "#ef4444" },
  {
    id: "tech6",
    name: "Robin Schneider",
    initials: "RS",
    role: "HVAC Technician",
    status: "Available",
    color: "#6366f1",
  },
  { id: "tech7", name: "Joel Moore", initials: "JM", role: "Plumber", status: "Available", color: "#0ea5e9" },
  { id: "tech8", name: "Steven Hall", initials: "SH", role: "Electrician", status: "Available", color: "#14b8a6" },
  { id: "tech9", name: "Natasha Wheeler", initials: "NW", role: "Office Manager", status: "Office", color: "#f43f5e" },
  { id: "tech10", name: "Chance Boseman", initials: "CB", role: "Apprentice", status: "Training", color: "#a855f7" },
]

// Mock data for visits
const mockVisits = [
  {
    id: "V-2023-5678",
    jobId: "JOB-2023-0045",
    jobNumber: "54",
    customer: "Tom Harris",
    address: "14932 111 Ave NW, Edmonton, AB T5M 4W3",
    technician: "Tom Harris",
    techId: "tech1",
    techInitials: "TH",
    date: "2024-03-18",
    startTime: "9:00 AM",
    endTime: "11:00 AM",
    status: "Scheduled",
    type: "HVAC Repair",
    notes: "Customer reported inconsistent cooling in main office area.",
    priority: "Medium",
    notified: true,
    team: ["Nathaniel", "Carl"],
    visitCount: 1,
    color: "#3b82f6",
  },
  {
    id: "V-2023-5679",
    jobId: "JOB-2023-0044",
    jobNumber: "53",
    customer: "TechSolutions Inc",
    address: "456 Tech Blvd, Edmonton, AB",
    technician: "Sarah Johnson",
    techId: "tech2",
    techInitials: "SJ",
    date: "2024-03-18",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    status: "Scheduled",
    type: "Electrical",
    notes: "Install new electrical panel and update wiring.",
    priority: "High",
    notified: true,
    team: ["Robert"],
    visitCount: 1,
    color: "#8b5cf6",
  },
  {
    id: "V-2023-5680",
    jobId: "JOB-2023-0043",
    jobNumber: "52",
    customer: "Riverside Apartments",
    address: "789 River Rd, Building C, Edmonton, AB",
    technician: "Mike Davis",
    techId: "tech3",
    techInitials: "MD",
    date: "2024-03-19",
    startTime: "9:00 AM",
    endTime: "12:00 PM",
    status: "Pending",
    type: "Plumbing",
    notes: "Fix leaking pipes in multiple units, water damage assessment.",
    priority: "High",
    notified: false,
    team: ["Joel"],
    visitCount: 1,
    color: "#10b981",
  },
  {
    id: "V-2023-5681",
    jobId: "JOB-2023-0042",
    jobNumber: "51",
    customer: "City Hospital",
    address: "100 Health Way, Edmonton, AB",
    technician: "Lisa Wong",
    techId: "tech4",
    techInitials: "LW",
    date: "2024-03-19",
    startTime: "1:00 PM",
    endTime: "3:00 PM",
    status: "Confirmed",
    type: "Maintenance",
    notes: "Quarterly maintenance of all medical equipment cooling systems.",
    priority: "Medium",
    notified: true,
    team: ["Steven", "Robert"],
    visitCount: 1,
    color: "#f59e0b",
  },
  {
    id: "V-2023-5682",
    jobId: "JOB-2023-0045",
    jobNumber: "54",
    customer: "Tom Harris",
    address: "14932 111 Ave NW, Edmonton, AB T5M 4W3",
    technician: "Tom Harris",
    techId: "tech1",
    techInitials: "TH",
    date: "2024-03-20",
    startTime: "10:00 AM",
    endTime: "2:00 PM",
    status: "Confirmed",
    type: "HVAC Installation",
    notes: "New HVAC system installation.",
    priority: "Medium",
    notified: true,
    team: ["Nathaniel", "Carl"],
    visitCount: 1,
    color: "#3b82f6",
  },
  {
    id: "V-2023-5683",
    jobId: "JOB-2023-0046",
    jobNumber: "55",
    customer: "Parkside Mall",
    address: "200 Retail Way, Edmonton, AB",
    technician: "Sarah Johnson",
    techId: "tech2",
    techInitials: "SJ",
    date: "2024-03-21",
    startTime: "9:00 AM",
    endTime: "11:00 AM",
    status: "Confirmed",
    type: "Electrical Inspection",
    notes: "Annual electrical safety inspection for mall common areas.",
    priority: "Low",
    notified: true,
    team: [],
    visitCount: 1,
    color: "#8b5cf6",
  },
  {
    id: "V-2023-5684",
    jobId: "JOB-2023-0043",
    jobNumber: "52",
    customer: "Riverside Apartments",
    address: "789 River Rd, Building C, Edmonton, AB",
    technician: "Mike Davis",
    techId: "tech3",
    techInitials: "MD",
    date: "2024-03-21",
    startTime: "1:00 PM",
    endTime: "4:00 PM",
    status: "Pending",
    type: "Plumbing",
    notes: "Replace water heaters in units 301-305.",
    priority: "Medium",
    notified: false,
    team: ["Joel"],
    visitCount: 1,
    color: "#10b981",
  },
  {
    id: "V-2023-5685",
    jobId: "JOB-2023-0047",
    jobNumber: "56",
    customer: "Sunset Restaurant",
    address: "800 Coastal Highway, Edmonton, AB",
    technician: "Robin Schneider",
    techId: "tech6",
    techInitials: "RS",
    date: "2024-03-22",
    startTime: "8:00 AM",
    endTime: "10:00 AM",
    status: "Confirmed",
    type: "HVAC Repair",
    notes: "Kitchen ventilation system not working properly.",
    priority: "High",
    notified: true,
    team: [],
    visitCount: 1,
    color: "#6366f1",
  },
  {
    id: "V-2023-5686",
    jobId: "JOB-2023-0042",
    jobNumber: "51",
    customer: "City Hospital",
    address: "100 Health Way, Edmonton, AB",
    technician: "Lisa Wong",
    techId: "tech4",
    techInitials: "LW",
    date: "2024-03-22",
    startTime: "11:00 AM",
    endTime: "2:00 PM",
    status: "Confirmed",
    type: "Maintenance",
    notes: "General maintenance check of all systems before weekend event.",
    priority: "Medium",
    notified: true,
    team: ["Steven"],
    visitCount: 1,
    color: "#f59e0b",
  },
  {
    id: "V-2023-5687",
    jobId: "JOB-2023-0045",
    jobNumber: "54",
    customer: "Tom Harris",
    address: "14932 111 Ave NW, Edmonton, AB T5M 4W3",
    technician: "Tom Harris",
    techId: "tech1",
    techInitials: "TH",
    date: "2024-03-23",
    startTime: "9:00 AM",
    endTime: "1:00 PM",
    status: "Confirmed",
    type: "HVAC Maintenance",
    notes: "Seasonal maintenance of all AC units.",
    priority: "Medium",
    notified: true,
    team: ["Nathaniel"],
    visitCount: 1,
    color: "#3b82f6",
  },
  {
    id: "V-2023-5688",
    jobId: "JOB-2023-0045",
    jobNumber: "54",
    customer: "Tom Harris",
    address: "14932 111 Ave NW, Edmonton, AB T5M 4W3",
    technician: "Lisa Wong",
    techId: "tech4",
    techInitials: "LW",
    date: "2024-03-18",
    startTime: "1:00 PM",
    endTime: "2:00 PM",
    status: "Confirmed",
    type: "Estimate - HVAC",
    notes: "Initial site visit for HVAC system estimate.",
    priority: "Medium",
    notified: true,
    team: [],
    visitCount: 1,
    color: "#f59e0b",
  },
  {
    id: "V-2023-5689",
    jobId: "JOB-2023-0044",
    jobNumber: "53",
    customer: "TechSolutions Inc",
    address: "456 Tech Blvd, Edmonton, AB",
    technician: "Tom Harris",
    techId: "tech1",
    techInitials: "TH",
    date: "2024-03-20",
    startTime: "3:00 PM",
    endTime: "4:00 PM",
    status: "Pending",
    type: "Estimate - Ductwork",
    notes: "Follow-up visit to assess additional ductwork requirements.",
    priority: "Low",
    notified: false,
    team: [],
    visitCount: 1,
    color: "#3b82f6",
  },
  // Tasks
  {
    id: "T-2023-001",
    jobId: "",
    jobNumber: "",
    customer: "",
    address: "",
    technician: "",
    techId: "",
    techInitials: "",
    date: "2024-03-18",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Pending",
    type: "Task",
    notes: "Pick up materials",
    priority: "Medium",
    notified: false,
    team: [],
    visitCount: 0,
    color: "#64748b",
    isTask: true,
  },
  {
    id: "T-2023-002",
    jobId: "",
    jobNumber: "",
    customer: "",
    address: "",
    technician: "",
    techId: "",
    techInitials: "",
    date: "2024-03-18",
    startTime: "4:45 PM",
    endTime: "5:30 PM",
    status: "Pending",
    type: "Task",
    notes: "End of day team check-in",
    priority: "Medium",
    notified: false,
    team: [],
    visitCount: 0,
    color: "#eab308",
    isTask: true,
  },
  {
    id: "T-2023-003",
    jobId: "",
    jobNumber: "",
    customer: "",
    address: "",
    technician: "",
    techId: "",
    techInitials: "",
    date: "2024-03-19",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Pending",
    type: "Task",
    notes: "Pick up materials",
    priority: "Medium",
    notified: false,
    team: [],
    visitCount: 0,
    color: "#64748b",
    isTask: true,
  },
  {
    id: "T-2023-004",
    jobId: "",
    jobNumber: "",
    customer: "",
    address: "",
    technician: "",
    techId: "",
    techInitials: "",
    date: "2024-03-19",
    startTime: "4:45 PM",
    endTime: "5:30 PM",
    status: "Pending",
    type: "Task",
    notes: "End of day team check-in",
    priority: "Medium",
    notified: false,
    team: [],
    visitCount: 0,
    color: "#eab308",
    isTask: true,
  },
  // Reminders
  {
    id: "R-2023-001",
    jobId: "",
    jobNumber: "",
    customer: "Sofia Garcia",
    address: "",
    technician: "",
    techId: "",
    techInitials: "",
    date: "2024-03-22",
    startTime: "9:00 AM",
    endTime: "9:30 AM",
    status: "Pending",
    type: "Reminder",
    notes: "Reminder about quote #11522 for Sofia Garcia",
    priority: "High",
    notified: false,
    team: [],
    visitCount: 0,
    color: "#dc2626",
    isReminder: true,
  },
  {
    id: "R-2023-002",
    jobId: "",
    jobNumber: "",
    customer: "Natasha Wheeler",
    address: "",
    technician: "",
    techId: "",
    techInitials: "",
    date: "2024-03-21",
    startTime: "2:00 PM",
    endTime: "2:30 PM",
    status: "Pending",
    type: "Reminder",
    notes: "Invoice reminder for Natasha Wheeler",
    priority: "Medium",
    notified: false,
    team: [],
    visitCount: 0,
    color: "#dc2626",
    isReminder: true,
  },
]

// Generate days of the week
const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("week") // month, week, day, map, list
  const [showViewSelector, setShowViewSelector] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filtersEnabled, setFiltersEnabled] = useState(true)
  const [showCreateMenu, setShowCreateMenu] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [createType, setCreateType] = useState("")
  const [selectedVisit, setSelectedVisit] = useState<any>(null)
  const [showVisitDetails, setShowVisitDetails] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTechnicians, setSelectedTechnicians] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [visits, setVisits] = useState(mockVisits)
  const calendarRef = useRef<HTMLDivElement>(null)
  
  // New state for drag event creation
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<{ day: Date; time: string } | null>(null)
  const [dragEnd, setDragEnd] = useState<{ day: Date; time: string } | null>(null)
  const [showEventTypeModal, setShowEventTypeModal] = useState(false)
  const [tempEventData, setTempEventData] = useState<any>(null)

  // Add state for conflicts and unscheduled views
  const [showConflicts, setShowConflicts] = useState(false)
  const [showUnscheduled, setShowUnscheduled] = useState(false)

  // Helper function to calculate position based on time
  const calculateTimePosition = (time: string) => {
    const [hourStr, minuteStr] = time.split(":")
    let hour = Number.parseInt(hourStr)
    const minute = Number.parseInt(minuteStr)
    const isPM = time.includes("PM") && hour !== 12
    const isAM = time.includes("AM") || hour === 12

    if (isPM) hour += 12
    if (isAM && hour === 12) hour = 0

    // Calculate position relative to 7:00 AM (7)
    const hourDiff = hour - 7
    const minutePercentage = minute / 60

    return hourDiff + minutePercentage
  }

  // Helper function to get time from Y position
  const getTimeFromPosition = (y: number) => {
    const hourHeight = 96 // height of one hour in pixels
    const hour = Math.floor(y / hourHeight) + 7 // 7 is start hour
    const minute = Math.round((y % hourHeight) / hourHeight * 60)
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  }

  // Filter visits based on search query, selected technicians, statuses, types
  const filteredVisits = visits.filter((visit) => {
    if (!filtersEnabled) return true

    const matchesSearch =
      visit.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.technician.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.notes.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTechnician = selectedTechnicians.length === 0 || selectedTechnicians.includes(visit.techId)

    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(visit.status)

    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(visit.type)

    return matchesSearch && matchesTechnician && matchesStatus && matchesType
  })

  // Format date for display
  const formatDateRange = () => {
    if (viewMode === "day") {
      return format(currentDate, "MMMM d, yyyy")
    } else if (viewMode === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 0 })
      const end = endOfWeek(currentDate, { weekStartsOn: 0 })

      if (format(start, "MMM") === format(end, "MMM")) {
        return `${format(start, "MMM d")} - ${format(end, "d, yyyy")}`
      } else {
        return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`
      }
    } else {
      return format(currentDate, "MMMM yyyy")
    }
  }

  // Navigate to previous period
  const goToPrevious = () => {
    if (viewMode === "day") {
      setCurrentDate(subDays(currentDate, 1))
    } else if (viewMode === "week") {
      setCurrentDate(subWeeks(currentDate, 1))
    } else {
      const newDate = new Date(currentDate)
      newDate.setMonth(currentDate.getMonth() - 1)
      setCurrentDate(newDate)
    }
  }

  // Navigate to next period
  const goToNext = () => {
    if (viewMode === "day") {
      setCurrentDate(addDays(currentDate, 1))
    } else if (viewMode === "week") {
      setCurrentDate(addWeeks(currentDate, 1))
    } else {
      const newDate = new Date(currentDate)
      newDate.setMonth(currentDate.getMonth() + 1)
      setCurrentDate(newDate)
    }
  }

  // Go to current period
  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Get visits for a specific date
  const getVisitsForDate = (date: Date) => {
    return filteredVisits.filter((visit) => {
      const visitDate = parseISO(visit.date)
      return isSameDay(visitDate, date)
    })
  }

  // Get visit count for a specific date
  const getVisitCountForDate = (date: Date) => {
    return getVisitsForDate(date).length
  }

  // Handle view selection
  const handleViewSelect = (view: string) => {
    setViewMode(view)
    setShowViewSelector(false)
  }

  // Handle create new item
  const handleCreateNew = (type: string) => {
    setCreateType(type)
    setShowCreateDialog(true)
    setShowCreateMenu(false)
  }

  // Handle visit click
  const handleVisitClick = (e: React.MouseEvent, visit: any) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedVisit(visit)
    setShowVisitDetails(true)
  }

  // Generate week days
  const generateWeekDays = () => {
    const startDate = startOfWeek(currentDate, { weekStartsOn: 0 })
    const days = []

    for (let i = 0; i < 7; i++) {
      const day = addDays(startDate, i)
      days.push(day)
    }

    return days
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500"
      case "Scheduled":
        return "bg-green-500"
      case "Pending":
        return "bg-yellow-500"
      case "In Progress":
        return "bg-blue-500"
      case "Completed":
        return "bg-purple-500"
      case "Cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get visit background color
  const getVisitBackgroundColor = (visit: any) => {
    if (visit.isTask) {
      return "bg-slate-100 border-slate-200"
    }
    if (visit.isReminder) {
      return "bg-red-50 border-red-200"
    }

    switch (visit.type) {
      case "HVAC Repair":
      case "HVAC Installation":
      case "HVAC Maintenance":
        return "bg-blue-100 border-blue-200"
      case "Electrical":
      case "Electrical Inspection":
        return "bg-yellow-100 border-yellow-200"
      case "Plumbing":
        return "bg-green-100 border-green-200"
      case "Maintenance":
        return "bg-purple-100 border-purple-200"
      case "Estimate - HVAC":
      case "Estimate - Ductwork":
        return "bg-indigo-100 border-indigo-200"
      default:
        return "bg-gray-100 border-gray-200"
    }
  }

  // Get visit text color
  const getVisitTextColor = (visit: any) => {
    if (visit.isTask) {
      return "text-slate-700"
    }
    if (visit.isReminder) {
      return "text-red-700"
    }

    switch (visit.type) {
      case "HVAC Repair":
      case "HVAC Installation":
      case "HVAC Maintenance":
        return "text-blue-700"
      case "Electrical":
      case "Electrical Inspection":
        return "text-yellow-700"
      case "Plumbing":
        return "text-green-700"
      case "Maintenance":
        return "text-purple-700"
      case "Estimate - HVAC":
      case "Estimate - Ductwork":
        return "text-indigo-700"
      default:
        return "text-gray-700"
    }
  }

  // Get border color based on priority
  const getPriorityBorderColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "border-l-4 border-l-red-500"
      case "Medium":
        return "border-l-4 border-l-yellow-500"
      case "Low":
        return "border-l-4 border-l-green-500"
      default:
        return ""
    }
  }

  // Handle mouse down on calendar grid
  const handleGridMouseDown = (e: React.MouseEvent, day: Date) => {
    // Don't start dragging if clicking on an event
    if ((e.target as HTMLElement).closest('.cursor-pointer')) {
      return
    }
    
    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top + (e.currentTarget as HTMLElement).scrollTop
    const time = getTimeFromPosition(y)
    
    setIsDragging(true)
    setDragStart({ day, time })
    setDragEnd({ day, time })
  }

  // Handle mouse move while dragging
  const handleGridMouseMove = (e: React.MouseEvent, day: Date) => {
    if (!isDragging) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top + (e.currentTarget as HTMLElement).scrollTop
    const time = getTimeFromPosition(y)
    
    setDragEnd({ day, time })
  }

  // Handle mouse up to finish dragging
  const handleGridMouseUp = () => {
    if (isDragging && dragStart && dragEnd) {
      setIsDragging(false)
      setTempEventData({
        date: format(dragStart.day, 'yyyy-MM-dd'),
        startTime: dragStart.time,
        endTime: dragEnd.time
      })
      setShowEventTypeModal(true)
    }
  }

  // Handle event type selection
  const handleEventTypeSelect = (type: 'visit' | 'task' | 'timeoff') => {
    setCreateType(type)
    setShowEventTypeModal(false)
    setShowCreateDialog(true)
  }

  // Generate mock events for demo
  const generateMockEvents = () => {
    const mockEvents = []
    const weekStart = startOfWeek(currentDate)
    const types = ['HVAC Repair', 'Electrical', 'Plumbing', 'Maintenance']
    const statuses = ['Scheduled', 'In Progress', 'Completed']
    const customers = ['Acme Corp', 'TechStart Inc', 'Riverside Hospital', 'Metro Apartments']
    const addresses = [
      '123 Main St, Edmonton, AB',
      '456 Tech Blvd, Edmonton, AB',
      '789 River Rd, Edmonton, AB',
      '100 Health Way, Edmonton, AB'
    ]
    const technicians = [
      { name: 'John D.', id: 'tech-1', initials: 'JD' },
      { name: 'Sarah M.', id: 'tech-2', initials: 'SM' },
      { name: 'Mike R.', id: 'tech-3', initials: 'MR' },
      { name: 'Lisa K.', id: 'tech-4', initials: 'LK' }
    ]
    const teamMembers = ['Nathaniel', 'Carl', 'Robert', 'Joel', 'Steven']
    
    for (let i = 0; i < 15; i++) {
      const day = addDays(weekStart, Math.floor(Math.random() * 7))
      const startHour = 7 + Math.floor(Math.random() * 8)
      const duration = 1 + Math.floor(Math.random() * 3)
      const jobNumber = String(i + 1).padStart(3, '0')
      const tech = technicians[Math.floor(Math.random() * technicians.length)]
      const teamSize = Math.floor(Math.random() * 3)
      const team = Array.from({ length: teamSize }, () => 
        teamMembers[Math.floor(Math.random() * teamMembers.length)]
      )
      
      mockEvents.push({
        id: `V-2024-${String(i + 1).padStart(4, '0')}`,
        jobId: `JOB-2024-${jobNumber}`,
        jobNumber,
        customer: customers[Math.floor(Math.random() * customers.length)],
        address: addresses[Math.floor(Math.random() * addresses.length)],
        technician: tech.name,
        techId: tech.id,
        techInitials: tech.initials,
        date: format(day, 'yyyy-MM-dd'),
        startTime: `${startHour}:00`,
        endTime: `${startHour + duration}:00`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        type: types[Math.floor(Math.random() * types.length)],
        notes: 'Service visit details',
        priority: Math.random() > 0.5 ? 'High' : 'Medium',
        notified: Math.random() > 0.5,
        team: team,
        visitCount: 1,
        color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`
      })
    }
    
    setVisits(mockEvents)
  }

  useEffect(() => {
    generateMockEvents()
  }, [])

  // Render month view
  const renderMonthView = () => {
    // Implementation will go here
    return <div>Month view coming soon</div>
  }

  // Render week view
  const renderWeekView = () => {
    const weekDays = generateWeekDays()
    const hours = [
      "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
      "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
    ]

    return (
      <div className="grid grid-cols-[80px_1fr] h-[calc(100vh-220px)] overflow-auto" ref={calendarRef}>
        {/* Time column header (empty) */}
        <div className="sticky top-0 z-10 border-b bg-white"></div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 sticky top-0 z-10 bg-white">
          {weekDays.map((day, index) => (
            <div
              key={`header-${index}`}
              className={cn("p-2 text-center font-medium border-b", isToday(day) && "bg-blue-50")}
            >
              <div className="text-lg">{daysOfWeek[index]}</div>
              <div className="text-sm text-muted-foreground">{format(day, "MMM d")}</div>
              {getVisitCountForDate(day) > 0 && (
                <Badge className="mt-1 bg-blue-500">
                  {getVisitCountForDate(day)} {getVisitCountForDate(day) === 1 ? "Visit" : "Visits"}
                </Badge>
              )}
            </div>
          ))}
        </div>

        {/* Time column */}
        <div className="flex flex-col border-r">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-24 border-b flex items-start justify-end pr-2 pt-1 text-sm text-muted-foreground"
            >
              {hour}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day, dayIndex) => {
            const dayVisits = getVisitsForDate(day)

            return (
              <div
                key={`content-${dayIndex}`}
                className={cn(
                  "relative border-r min-h-[1248px]", // 13 hours * 96px
                  isToday(day) && "bg-blue-50/30",
                )}
                onMouseDown={(e) => handleGridMouseDown(e, day)}
                onMouseMove={(e) => handleGridMouseMove(e, day)}
                onMouseUp={handleGridMouseUp}
              >
                {/* Hour grid lines */}
                {hours.map((hour, hourIndex) => (
                  <div key={`hour-${hourIndex}`} className="h-24 border-b border-dashed border-gray-200"></div>
                ))}

                {/* Drag selection overlay */}
                {isDragging && dragStart && dragEnd && isSameDay(dragStart.day, day) && (
                  <div
                    className="absolute left-1 right-1 bg-blue-100 opacity-50 border border-blue-300 rounded-md pointer-events-none"
                    style={{
                      top: `${calculateTimePosition(dragStart.time) * 96}px`,
                      height: `${(calculateTimePosition(dragEnd.time) - calculateTimePosition(dragStart.time)) * 96}px`,
                    }}
                  />
                )}

                {/* Existing visits */}
                {(() => {
                  const groups = getOverlappingGroups(dayVisits)
                  return groups.map((group, groupIndex) => {
                    return group.map((visit, visitIndex) => {
                      const startPosition = calculateTimePosition(visit.startTime)
                      const endPosition = calculateTimePosition(visit.endTime)
                      const duration = endPosition - startPosition
                      const width = 100 / group.length
                      const left = (visitIndex * width)

                      return (
                        <div
                          key={visit.id}
                          className={cn(
                            "absolute rounded-md p-2 border cursor-pointer hover:shadow-md transition-shadow overflow-hidden",
                            getVisitBackgroundColor(visit),
                            getPriorityBorderColor(visit.priority),
                          )}
                          style={{
                            top: `${startPosition * 96}px`,
                            height: `${Math.max(duration * 96, 32)}px`,
                            left: `${left}%`,
                            width: `${width}%`,
                          }}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleVisitClick(e, visit)
                          }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <div className="text-xs font-medium flex items-center gap-1 whitespace-nowrap">
                                <Clock className="h-3 w-3 flex-shrink-0" />
                                {visit.startTime} - {visit.endTime}
                              </div>
                            </div>
                            {!visit.isTask && !visit.isReminder && (
                              <Badge className={cn("text-xs py-0 h-4 flex-shrink-0", getStatusBadgeColor(visit.status))}>
                                {visit.status}
                              </Badge>
                            )}
                          </div>

                          {visit.isTask ? (
                            <div className="font-medium text-sm truncate">{visit.notes}</div>
                          ) : visit.isReminder ? (
                            <div className="font-medium text-sm truncate">{visit.notes}</div>
                          ) : (
                            <>
                              <div className="font-medium text-sm truncate">
                                {visit.customer} {visit.jobNumber && `#${visit.jobNumber}`}
                              </div>
                              <div className={cn("text-xs mt-1 truncate", getVisitTextColor(visit))}>{visit.type}</div>
                            </>
                          )}

                          {!visit.isTask && !visit.isReminder && visit.address && duration > 0.5 && (
                            <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1 truncate">
                              <MapPin className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{visit.address.split(",")[0]}</span>
                            </div>
                          )}

                          {visit.team && visit.team.length > 0 && duration > 0.75 && (
                            <div className="flex items-center gap-1 mt-1 truncate">
                              <Users className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              <div className="flex gap-1 overflow-hidden">
                                {visit.team.slice(0, 3).map((member: string, i: number) => (
                                  <Badge key={i} variant="outline" className="text-xs bg-white whitespace-nowrap">
                                    {member}
                                  </Badge>
                                ))}
                                {visit.team.length > 3 && (
                                  <Badge variant="outline" className="text-xs bg-white whitespace-nowrap">
                                    +{visit.team.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })
                  })
                })()}

                {/* Add visit button for empty days */}
                {dayVisits.length === 0 && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center text-muted-foreground"
                    onClick={(e) => e.stopPropagation()} // Prevent triggering drag event
                  >
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center gap-2 h-auto py-4"
                      onClick={() => handleCreateNew("Visit")}
                    >
                      <Plus className="h-8 w-8" />
                      <span>Add Visit</span>
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Render day view
  const renderDayView = () => {
    // Implementation will go here
    return <div>Day view coming soon</div>
  }

  // Render map view
  const renderMapView = () => {
    // Implementation will go here
    return <div>Map view coming soon</div>
  }

  // Render list view
  const renderListView = () => {
    // Implementation will go here
    return <div>List view coming soon</div>
  }

  // Render current view based on viewMode
  const renderCurrentView = () => {
    switch (viewMode) {
      case "month":
        return renderMonthView()
      case "week":
        return renderWeekView()
      case "day":
        return renderDayView()
      case "map":
        return renderMapView()
      case "list":
        return renderListView()
      default:
        return renderWeekView()
    }
  }

  // Add this function to handle overlapping events
  const getOverlappingGroups = (events: any[]) => {
    const sortedEvents = [...events].sort((a, b) => {
      const aStart = calculateTimePosition(a.startTime)
      const bStart = calculateTimePosition(b.startTime)
      return aStart - bStart
    })

    const groups: any[][] = []
    let currentGroup: any[] = []
    let lastEndTime = 0

    sortedEvents.forEach((event) => {
      const startTime = calculateTimePosition(event.startTime)
      if (startTime < lastEndTime) {
        // Event overlaps with current group
        currentGroup.push(event)
      } else {
        // Start a new group
        if (currentGroup.length > 0) {
          groups.push(currentGroup)
        }
        currentGroup = [event]
      }
      const endTime = calculateTimePosition(event.endTime)
      lastEndTime = Math.max(lastEndTime, endTime)
    })

    if (currentGroup.length > 0) {
      groups.push(currentGroup)
    }

    return groups
  }

  // Add function to check for conflicts
  const getScheduleConflicts = () => {
    const conflicts: any[] = []
    const groups = getOverlappingGroups(visits)
    
    groups.forEach(group => {
      if (group.length > 1) {
        // Check if any team members are double-booked
        const teamMembers = new Set<string>()
        let hasConflict = false
        
        group.forEach(visit => {
          visit.team?.forEach((member: string) => {
            if (teamMembers.has(member)) {
              hasConflict = true
            }
            teamMembers.add(member)
          })
        })
        
        if (hasConflict) {
          conflicts.push(...group)
        }
      }
    })
    
    return conflicts
  }

  // Mock unscheduled visits
  const unscheduledVisits = [
    {
      id: "UNSCH-001",
      jobId: "JOB-2024-099",
      jobNumber: "99",
      customer: "Metro Mall",
      address: "789 Shopping Ave, Edmonton, AB",
      type: "HVAC Repair",
      priority: "High",
      notes: "Emergency AC repair needed",
      status: "Unassigned"
    },
    {
      id: "UNSCH-002",
      jobId: "JOB-2024-100",
      jobNumber: "100",
      customer: "City Library",
      address: "456 Book St, Edmonton, AB",
      type: "Electrical",
      priority: "Medium",
      notes: "Lighting system maintenance",
      status: "Unassigned"
    }
  ]

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Schedule</h1>
          <p className="text-muted-foreground">Manage and track all scheduled visits</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search schedule..."
              className="w-full md:w-64 pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>

          <Button variant="outline" onClick={goToToday}>
            Today
          </Button>

          <DropdownMenu open={showCreateMenu} onOpenChange={setShowCreateMenu}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => handleCreateNew("Visit")}>
                <CalendarDays className="h-4 w-4 mr-2" />
                Visit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCreateNew("Task")}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Task
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCreateNew("CalendarEvent")}>
                <Calendar className="h-4 w-4 mr-2" />
                Calendar Event
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={goToPrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setShowDatePicker(true)}>
              <Calendar className="h-4 w-4 mr-2" />
              {format(startOfWeek(currentDate), "MMM d")} -{" "}
              {format(endOfWeek(currentDate), "MMM d, yyyy")}
            </Button>
          </div>

          <Button variant="outline" size="icon" onClick={goToNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button variant="outline" onClick={goToToday}>Today</Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={showConflicts ? "secondary" : "outline"}
            className="flex items-center gap-2"
            onClick={() => setShowConflicts(!showConflicts)}
          >
            <AlertTriangle className="h-4 w-4" />
            Conflicts
            {showConflicts && getScheduleConflicts().length > 0 && (
              <Badge variant="destructive" className="ml-1">{getScheduleConflicts().length}</Badge>
            )}
          </Button>

          <Button
            variant={showUnscheduled ? "secondary" : "outline"}
            className="flex items-center gap-2"
            onClick={() => setShowUnscheduled(!showUnscheduled)}
          >
            <CalendarOff className="h-4 w-4" />
            Unscheduled
            {unscheduledVisits.length > 0 && (
              <Badge variant="secondary" className="ml-1">{unscheduledVisits.length}</Badge>
            )}
          </Button>

          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button
                variant={filtersEnabled ? "secondary" : "outline"}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[500px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium leading-none">Filters</h4>
                  <Badge variant={filtersEnabled ? "default" : "outline"}>
                    {filtersEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFiltersEnabled(false)
                    setSelectedStatuses([])
                    setSelectedTypes([])
                    setSelectedTechnicians([])
                  }}
                >
                  Clear All Filters
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Event</h4>
                    <div className="grid gap-2">
                      {[
                        "Job",
                        "Job Request",
                        "Visit/on site assessment",
                        "Time off"
                      ].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`type-${type}`}
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTypes([...selectedTypes, type])
                                setFiltersEnabled(true)
                              } else {
                                setSelectedTypes(selectedTypes.filter((t) => t !== type))
                              }
                            }}
                          />
                          <Label htmlFor={`type-${type}`}>{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Job type</h4>
                    <div className="grid gap-2">
                      {[
                        "Repair",
                        "Maintenance"
                      ].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`jobtype-${type}`}
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTypes([...selectedTypes, type])
                                setFiltersEnabled(true)
                              } else {
                                setSelectedTypes(selectedTypes.filter((t) => t !== type))
                              }
                            }}
                          />
                          <Label htmlFor={`jobtype-${type}`}>{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Job status</h4>
                    <div className="grid gap-2">
                      {[
                        "Pending",
                        "In progress",
                        "Completed",
                        "Rejected",
                        "Cancelled"
                      ].map((status) => (
                        <div key={status} className="flex items-center space-x-2">
                          <Checkbox
                            id={`status-${status}`}
                            checked={selectedStatuses.includes(status)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedStatuses([...selectedStatuses, status])
                                setFiltersEnabled(true)
                              } else {
                                setSelectedStatuses(selectedStatuses.filter((s) => s !== status))
                              }
                            }}
                          />
                          <Label htmlFor={`status-${status}`}>{status}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Team</h4>
                    <div className="grid gap-2">
                      {[
                        "Betsy",
                        "Jane",
                        "Joe",
                        "John"
                      ].map((member) => (
                        <div key={member} className="flex items-center space-x-2">
                          <Checkbox
                            id={`team-${member}`}
                            checked={selectedTechnicians.includes(member)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTechnicians([...selectedTechnicians, member])
                                setFiltersEnabled(true)
                              } else {
                                setSelectedTechnicians(selectedTechnicians.filter((t) => t !== member))
                              }
                            }}
                          />
                          <Label htmlFor={`team-${member}`}>{member}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Calendar View */}
      <div className="flex">
        <Card className="flex-1">
          <CardContent className="p-0 overflow-hidden">{renderCurrentView()}</CardContent>
        </Card>

        {/* Unscheduled Events Panel */}
        {showUnscheduled && (
          <div className="w-80 ml-4 border rounded-lg bg-gray-50">
            <div className="p-4 border-b bg-white rounded-t-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Unscheduled Events</h3>
                <Button variant="outline" size="sm" onClick={() => setShowCreateDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Event
                </Button>
              </div>
            </div>
            <div className="p-4 space-y-3 overflow-auto max-h-[calc(100vh-220px)]">
              {unscheduledVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="bg-white border rounded-md p-3 hover:shadow-sm transition-shadow cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{visit.customer}</span>
                    <Badge variant="outline">{visit.priority}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {visit.type} - #{visit.jobNumber}
                  </div>
                  <div className="text-sm">{visit.notes}</div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {visit.address}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Visit Details Dialog */}
      <Dialog open={showVisitDetails} onOpenChange={setShowVisitDetails}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedVisit && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedVisit.isTask
                    ? "Task Details"
                    : selectedVisit.isReminder
                      ? "Reminder Details"
                      : `${selectedVisit.customer} - ${selectedVisit.type}`}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {!selectedVisit.isTask && !selectedVisit.isReminder && (
                  <>
                    <div className="flex items-center gap-2">
                      <Checkbox id="completed" />
                      <Label htmlFor="completed">Completed</Label>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-1">Details</h3>
                      <p className="text-green-600 font-medium">
                        {selectedVisit.customer} - Job #{selectedVisit.jobNumber}
                      </p>
                    </div>

                    {selectedVisit.team && selectedVisit.team.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium mb-1">Team</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedVisit.team.map((member: string, i: number) => (
                            <Badge key={i} variant="secondary">
                              {member}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-medium mb-1">Location</h3>
                      <p>{selectedVisit.address}</p>
                    </div>
                  </>
                )}

                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Starts</h3>
                    <p>{format(parseISO(selectedVisit.date), "MMM d, yyyy")}</p>
                    <p className="text-sm text-muted-foreground">{selectedVisit.startTime}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-1">Ends</h3>
                    <p>{format(parseISO(selectedVisit.date), "MMM d, yyyy")}</p>
                    <p className="text-sm text-muted-foreground">{selectedVisit.endTime}</p>
                  </div>
                </div>

                {selectedVisit.notes && (
                  <div>
                    <h3 className="text-sm font-medium mb-1">Notes</h3>
                    <p className="text-sm">{selectedVisit.notes}</p>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline">Edit</Button>
                <Button>View Details</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Event Type Selection Modal - Simplified version */}
      <Dialog open={showEventTypeModal} onOpenChange={setShowEventTypeModal}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>What type of event would you like to create?</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="visit"
                  name="eventType"
                  value="visit"
                  className="h-4 w-4"
                  onChange={() => handleEventTypeSelect('visit')}
                />
                <Label htmlFor="visit">Visit</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="task"
                  name="eventType"
                  value="task"
                  className="h-4 w-4"
                  onChange={() => handleEventTypeSelect('task')}
                />
                <Label htmlFor="task">Task</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="timeoff"
                  name="eventType"
                  value="timeoff"
                  className="h-4 w-4"
                  onChange={() => handleEventTypeSelect('timeoff')}
                />
                <Label htmlFor="timeoff">Time Off</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEventTypeModal(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Event Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New {createType}</DialogTitle>
            <DialogDescription>Fill in the details to create a new {createType.toLowerCase()}.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {createType === 'visit' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customer" className="text-right">Customer</Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acme">Acme Corp</SelectItem>
                        <SelectItem value="techstart">TechStart Inc</SelectItem>
                        <SelectItem value="riverside">Riverside Hospital</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="job" className="text-right">Job</Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="job1">JOB-2024-001 - HVAC Installation</SelectItem>
                        <SelectItem value="job2">JOB-2024-002 - Electrical Repair</SelectItem>
                        <SelectItem value="job3">JOB-2024-003 - Plumbing Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team" className="text-right">Team Members</Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select team members" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="space-y-2 p-2">
                          {['John D.', 'Sarah M.', 'Mike R.', 'Lisa K.'].map((member) => (
                            <div key={member} className="flex items-center space-x-2">
                              <Checkbox id={`team-${member}`} />
                              <Label htmlFor={`team-${member}`}>{member}</Label>
                            </div>
                          ))}
                        </div>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {createType === 'task' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input id="title" className="col-span-3" />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="assignee" className="text-right">Assignee</Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John D.</SelectItem>
                        <SelectItem value="sarah">Sarah M.</SelectItem>
                        <SelectItem value="mike">Mike R.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {createType === 'timeoff' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">Type</Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vacation">Vacation</SelectItem>
                        <SelectItem value="sick">Sick Leave</SelectItem>
                        <SelectItem value="personal">Personal Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team-member" className="text-right">Team Member</Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John D.</SelectItem>
                        <SelectItem value="sarah">Sarah M.</SelectItem>
                        <SelectItem value="mike">Mike R.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <Input
                id="date"
                type="date"
                className="col-span-3"
                value={tempEventData?.date}
                readOnly
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">Time</Label>
              <div className="col-span-3 flex gap-2 items-center">
                <Input
                  id="start-time"
                  type="time"
                  className="flex-1"
                  value={tempEventData?.startTime}
                  readOnly
                />
                <span>to</span>
                <Input
                  id="end-time"
                  type="time"
                  className="flex-1"
                  value={tempEventData?.endTime}
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">Notes</Label>
              <Textarea id="notes" className="col-span-3" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              // Handle event creation here
              setShowCreateDialog(false)
            }}>Create {createType}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Conflicts Warning */}
      {showConflicts && getScheduleConflicts().length > 0 && (
        <div className="border-l-4 border-red-500 bg-red-50 p-4 mb-4 rounded-r-lg">
          <div className="flex items-center gap-2 text-red-700 mb-2">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="font-medium">Schedule Conflicts Detected</h3>
          </div>
          <div className="text-sm text-red-600">
            There are {getScheduleConflicts().length} events with team member scheduling conflicts.
            Please review and adjust the assignments.
          </div>
        </div>
      )}
    </div>
  )
}

