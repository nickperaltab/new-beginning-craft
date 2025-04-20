"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Globe,
  Briefcase,
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
  { week: 'Week 1', score: 88 },
  { week: 'Week 2', score: 85 },
  { week: 'Week 3', score: 90 },
  { week: 'Week 4', score: 92 },
  { week: 'Week 5', score: 89 },
  { week: 'Week 6', score: 94 },
  { week: 'Week 7', score: 95 },
  { week: 'Week 8', score: 92 },
]

const timeline = [
  {
    id: 1,
    type: 'invoice',
    title: 'Enterprise License Renewal',
    description: 'Annual contract value: $450,000',
    date: '2024-03-15',
    time: '14:30',
    status: 'completed',
  },
  {
    id: 2,
    type: 'meeting',
    title: 'Strategic Partnership Review',
    description: 'Discussed expansion into new markets',
    date: '2024-03-10',
    time: '10:00',
    status: 'completed',
  },
  {
    id: 3,
    type: 'invoice',
    title: 'Additional Services Package',
    description: 'Professional services: $85,000',
    date: '2024-03-08',
    time: '16:45',
    status: 'completed',
  },
  {
    id: 4,
    type: 'meeting',
    title: 'Technical Integration Workshop',
    description: 'API implementation planning with tech team',
    date: '2024-03-05',
    time: '11:15',
    status: 'completed',
  },
  {
    id: 5,
    type: 'email',
    title: 'Q2 Roadmap Presentation',
    description: 'Shared upcoming features and timeline',
    date: '2024-03-01',
    time: '09:20',
    status: 'completed',
  },
]

const contacts = [
  {
    id: "cont-001",
    name: "John Anderson",
    position: "Senior Procurement Manager",
    email: "j.anderson@acmecorp.com",
    phone: "(555) 123-4567",
    avatar: "/avatars/john-anderson.jpg",
    status: "active",
  },
  {
    id: "cont-002",
    name: "Sarah Miller",
    position: "Technical Director",
    email: "s.miller@acmecorp.com",
    phone: "(555) 123-4568",
    avatar: "/avatars/sarah-miller.jpg",
    status: "active",
  },
  {
    id: "cont-003",
    name: "Michael Chen",
    position: "Finance Controller",
    email: "m.chen@acmecorp.com",
    phone: "(555) 123-4569",
    avatar: "/avatars/michael-chen.jpg",
    status: "active",
  },
]

export default function ExistingCompanyPage() {
  const [company] = useState({
    name: "Acme Corporation",
    website: "www.acmecorp.com",
    industry: "Enterprise Technology",
    size: "1000-5000 employees",
    headquarters: "New York, NY",
    address: "123 Tech Plaza, Suite 1000",
    founded: "1995",
    tags: ["Enterprise", "Fortune 500", "Strategic Partner"],
    totalRevenue: 24500000,
    lastEngagement: "2024-03-15",
    healthScore: 92,
    healthScoreTrend: 8,
    notes: "Key strategic account with global presence. Strong partnership in enterprise solutions.",
  })

  const handleSave = (field: string, value: string) => {
    console.log(`Saving ${field}:`, value)
    // Here you would typically make an API call to update the company
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
          <h1 className="text-3xl font-bold tracking-tight">{company.name}</h1>
          <p className="text-muted-foreground">{company.industry} • {company.size}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Globe className="h-4 w-4" />
            Visit Website
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
                <CardDescription>Strategic analysis and business intelligence</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              <div className="flex flex-col gap-1 p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  Annual Revenue
                </div>
                <div className="text-2xl font-bold">${(company.totalRevenue / 1000000).toFixed(2)}M</div>
                <div className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  +22% YoY Growth
                </div>
              </div>
              <div className="flex flex-col gap-1 p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Target className="h-4 w-4" />
                  Market Potential
                </div>
                <div className="text-2xl font-bold">$45M</div>
                <div className="text-sm text-muted-foreground">
                  Expansion opportunity
                </div>
              </div>
              <div className="flex flex-col gap-1 p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  Active Projects
                </div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">
                  4 in negotiation
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Strategic Insights</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Strong adoption of our enterprise solutions across all divisions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  High potential for expansion into APAC markets
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  Competitor presence in cloud services division
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <EditableField
              label="Website"
              value={company.website}
              icon={<Globe className="h-4 w-4" />}
              onSave={(value) => handleSave('website', value)}
            />
            <EditableField
              label="Industry"
              value={company.industry}
              icon={<Briefcase className="h-4 w-4" />}
              onSave={(value) => handleSave('industry', value)}
            />
            <EditableField
              label="Size"
              value={company.size}
              icon={<Users className="h-4 w-4" />}
              onSave={(value) => handleSave('size', value)}
            />
            <EditableField
              label="Founded"
              value={company.founded}
              icon={<Calendar className="h-4 w-4" />}
              onSave={(value) => handleSave('founded', value)}
            />
            <EditableField
              label="Location"
              value={company.headquarters}
              icon={<MapPin className="h-4 w-4" />}
              onSave={(value) => handleSave('headquarters', value)}
            />
            <div className="pt-2">
              <div className="text-sm text-muted-foreground mb-2">Tags</div>
              <div className="flex flex-wrap gap-2">
                {company.tags.map((tag) => (
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
              <div className="flex items-center justify-between">
                <CardTitle>Health Score</CardTitle>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">+{company.healthScoreTrend}%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Progress value={company.healthScore} className="flex-1 h-2" />
                  <span className="font-medium text-lg">{company.healthScore}%</span>
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
                      High product adoption
                    </li>
                    <li className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      Strong financial performance
                    </li>
                    <li className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      Regular strategic meetings
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Key Contacts</CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <Link 
                    key={contact.id}
                    href="/existing-contact"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Avatar>
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {contact.position}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 