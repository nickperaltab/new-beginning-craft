"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pencil,
  Check,
  X,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Star,
  DollarSign,
  Target,
  Users,
  BarChart3,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TooltipWithGlow } from "@/app/components/ui/tooltip-with-glow"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, ResponsiveContainer } from 'recharts'

interface EditableFieldProps {
  value: string
  label: string
  icon?: React.ReactNode
  onSave: (value: string) => void
}

const EditableField = ({ value, label, icon, onSave }: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)

  const handleSave = () => {
    onSave(editValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        {icon && <div className="text-muted-foreground">{icon}</div>}
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="h-8"
          autoFocus
        />
        <Button size="icon" variant="ghost" onClick={handleSave} className="h-8 w-8">
          <Check className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={handleCancel} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="group flex items-center gap-2">
      {icon && <div className="text-muted-foreground">{icon}</div>}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{label}:</span>
        <span>{value}</span>
      </div>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIsEditing(true)}
        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  )
}

const healthScoreData = [
  { week: 'Week 1', score: 82 },
  { week: 'Week 2', score: 85 },
  { week: 'Week 3', score: 78 },
  { week: 'Week 4', score: 80 },
  { week: 'Week 5', score: 85 },
  { week: 'Week 6', score: 88 },
  { week: 'Week 7', score: 85 },
  { week: 'Week 8', score: 82 },
]

const timeline = [
  {
    id: 1,
    type: 'invoice',
    title: 'Invoice #INV-2024-001 issued',
    description: 'Amount: $12,500',
    date: '2024-03-15',
    time: '14:30',
    status: 'completed',
  },
  {
    id: 2,
    type: 'meeting',
    title: 'Quarterly Review Meeting',
    description: 'Discussed new project requirements and timeline',
    date: '2024-03-10',
    time: '10:00',
    status: 'completed',
  },
  {
    id: 3,
    type: 'email',
    title: 'Proposal Follow-up',
    description: 'Sent detailed project scope and pricing',
    date: '2024-03-08',
    time: '16:45',
    status: 'completed',
  },
  {
    id: 4,
    type: 'call',
    title: 'Phone Discussion',
    description: 'Discussed potential expansion opportunities',
    date: '2024-03-05',
    time: '11:15',
    status: 'completed',
  },
  {
    id: 5,
    type: 'email',
    title: 'Meeting Confirmation',
    description: 'Received confirmation for next week\'s workshop',
    date: '2024-03-01',
    time: '09:20',
    status: 'completed',
  },
]

export default function ExistingContactPage() {
  const [contact] = useState({
    name: "John Anderson",
    email: "j.anderson@acmecorp.com",
    phone: "(555) 123-4567",
    position: "Senior Procurement Manager",
    company: "Acme Corp",
    department: "Procurement",
    location: "New York, NY",
    address: "123 Main St, Suite 101",
    tags: ["Enterprise", "Key Decision Maker", "High Value"],
    totalSpent: 24500000,
    lastContact: "2024-03-15",
    healthScore: 85,
    healthScoreTrend: 12,
    notes: "Key account, premium service level. Prefers email communication.",
  })

  const handleSave = (field: string, value: string) => {
    console.log(`Saving ${field}:`, value)
    // Here you would typically make an API call to update the contact
  }

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'invoice':
        return <FileText className="h-4 w-4" />
      case 'meeting':
        return <Calendar className="h-4 w-4" />
      case 'email':
        return <Mail className="h-4 w-4" />
      case 'call':
        return <Phone className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{contact.name}</h1>
          <p className="text-muted-foreground">{contact.position} at {contact.company}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Phone className="h-4 w-4" />
            Call
          </Button>
          <Button variant="outline" className="gap-2">
            <Mail className="h-4 w-4" />
            Email
          </Button>
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-start gap-2">
              <Sparkles className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <CardTitle>AI Insights</CardTitle>
                <CardDescription>Smart analysis based on contact history and behavior</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              <div className="flex flex-col gap-1 p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  Total Sales
                </div>
                <div className="text-2xl font-bold">${(contact.totalSpent / 1000000).toFixed(2)}M</div>
                <div className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  +15% from last year
                </div>
              </div>
              <div className="flex flex-col gap-1 p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Target className="h-4 w-4" />
                  Opportunity Size
                </div>
                <div className="text-2xl font-bold">$2.8M</div>
                <div className="text-sm text-muted-foreground">
                  Based on similar accounts
                </div>
              </div>
              <div className="flex flex-col gap-1 p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  Relationship Strength
                </div>
                <div className="text-2xl font-bold">Strong</div>
                <div className="text-sm text-muted-foreground">
                  8+ years of collaboration
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Key Observations</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  High engagement rate with our proposals (85% response rate)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Consistent growth in order value over the past 3 quarters
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  Recent delay in response to latest pricing update
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <EditableField
              label="Email"
              value={contact.email}
              icon={<Mail className="h-4 w-4" />}
              onSave={(value) => handleSave('email', value)}
            />
            <EditableField
              label="Phone"
              value={contact.phone}
              icon={<Phone className="h-4 w-4" />}
              onSave={(value) => handleSave('phone', value)}
            />
            <EditableField
              label="Position"
              value={contact.position}
              icon={<Users className="h-4 w-4" />}
              onSave={(value) => handleSave('position', value)}
            />
            <EditableField
              label="Department"
              value={contact.department}
              icon={<Building2 className="h-4 w-4" />}
              onSave={(value) => handleSave('department', value)}
            />
            <EditableField
              label="Location"
              value={contact.location}
              icon={<MapPin className="h-4 w-4" />}
              onSave={(value) => handleSave('location', value)}
            />
            <div className="pt-2">
              <div className="text-sm text-muted-foreground mb-2">Tags</div>
              <div className="flex flex-wrap gap-2">
                {contact.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
                <Button variant="outline" size="icon" className="h-6 w-6">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Activity Timeline</CardTitle>
              <Button variant="outline" size="sm">
                Add Activity
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {timeline.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      {getTimelineIcon(item.type)}
                    </div>
                    <div className="flex-1 w-[2px] bg-border my-2" />
                  </div>
                  <div className="flex-1 pt-1 pb-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{item.title}</h4>
                        {getStatusIcon(item.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.date} {item.time}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Progress value={contact.healthScore} className="w-[100px]" />
                    <span className="font-medium">{contact.healthScore}%</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">+{contact.healthScoreTrend}%</span>
                  </div>
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={healthScoreData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 100]} />
                      <RechartTooltip />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#2563eb"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Score Factors</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      Regular engagement
                    </li>
                    <li className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      Timely payments
                    </li>
                    <li className="flex items-center gap-2 text-yellow-600">
                      <AlertCircle className="h-4 w-4" />
                      Recent response delays
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Company</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/existing-company" className="gap-2">
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium">{contact.company}</h4>
                    <p className="text-sm text-muted-foreground">Enterprise Technology</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Total Revenue</div>
                    <div className="font-medium">${(contact.totalSpent / 1000000).toFixed(2)}M</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Active Projects</div>
                    <div className="font-medium">8</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 