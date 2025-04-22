"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
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

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="health-score">Health score</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
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
                      <span className="text-sm">+{contact.healthScoreTrend}%</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Progress value={contact.healthScore} className="flex-1 h-2" />
                      <span className="font-medium text-lg">{contact.healthScore}%</span>
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
        </TabsContent>

        <TabsContent value="details" className="mt-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{contact.name}</h3>
                    <p className="text-muted-foreground">{contact.position}</p>
                    <p className="text-muted-foreground">{contact.department}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
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
                    label="Mobile"
                    value="(555) 987-6543"
                    icon={<Phone className="h-4 w-4" />}
                    onSave={(value) => handleSave('mobile', value)}
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
                  <EditableField
                    label="Address"
                    value={contact.address}
                    icon={<MapPin className="h-4 w-4" />}
                    onSave={(value) => handleSave('address', value)}
                  />
                  <EditableField
                    label="LinkedIn"
                    value="linkedin.com/in/johnanderson"
                    icon={<ArrowRight className="h-4 w-4" />}
                    onSave={(value) => handleSave('linkedin', value)}
                  />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Tags</h4>
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
            
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                    <Building2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{contact.company}</h3>
                    <p className="text-muted-foreground">Enterprise Technology</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Industry</div>
                    <div className="font-medium">Technology / Software</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Company Size</div>
                    <div className="font-medium">500-1000 employees</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Annual Revenue</div>
                    <div className="font-medium">${(contact.totalSpent * 4).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Website</div>
                    <div className="font-medium text-blue-600">www.acmecorp.com</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Headquarters</div>
                    <div className="font-medium">New York, NY</div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Related Contacts</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                          RJ
                        </div>
                        <div>
                          <div className="font-medium">Robert Johnson</div>
                          <div className="text-sm text-muted-foreground">CTO</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        View
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                          SM
                        </div>
                        <div>
                          <div className="font-medium">Sarah Miller</div>
                          <div className="text-sm text-muted-foreground">VP of Operations</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        View
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Notes & Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Meeting Notes - Quarterly Review</h4>
                      <div className="text-sm text-muted-foreground">Added on March 10, 2024</div>
                    </div>
                    <p className="text-muted-foreground">
                      {contact.notes} Discussed expansion plans for Q3. Client is interested in our premium service tier.
                      Follow up needed regarding pricing structure.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Contract - 2024 Service Agreement</h4>
                      <div className="text-sm text-muted-foreground">Added on January 15, 2024</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="text-blue-500">2024_Service_Agreement.pdf</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Note or Document
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activities" className="mt-4">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Tasks</CardTitle>
                    <CardDescription>Manage your tasks related to this contact</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Task</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Review Contract</TableCell>
                        <TableCell className="text-red-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Overdue (Yesterday)
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">High</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">In Progress</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Check className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Follow Up on Proposal</TableCell>
                        <TableCell>Tomorrow</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">Medium</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">Not Started</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Check className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Schedule Quarterly Review</TableCell>
                        <TableCell>Next Week</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Low</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">Not Started</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Check className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Events</CardTitle>
                    <CardDescription>Scheduled events with this contact</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Event
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Event</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Quarterly Review Meeting</TableCell>
                        <TableCell>March 10, 2024 - 10:00 AM</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span>Meeting</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Phone Discussion</TableCell>
                        <TableCell>March 5, 2024 - 11:15 AM</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-green-500" />
                            <span>Call</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Proposal Follow-up</TableCell>
                        <TableCell>March 8, 2024 - 4:45 PM</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-purple-500" />
                            <span>Email</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                        <div className="text-3xl font-bold">8</div>
                        <div className="text-sm text-muted-foreground">Total Activities</div>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                        <div className="text-3xl font-bold text-green-600">5</div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Activity Types</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-purple-500" />
                            <span className="text-sm">Emails</span>
                          </div>
                          <span className="text-sm font-medium">3</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Calls</span>
                          </div>
                          <span className="text-sm font-medium">2</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">Meetings</span>
                          </div>
                          <span className="text-sm font-medium">2</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-amber-500" />
                            <span className="text-sm">Documents</span>
                          </div>
                          <span className="text-sm font-medium">1</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
                      <div className="text-sm text-muted-foreground">
                        Last activity: <span className="font-medium text-foreground">2 days ago</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Response time: <span className="font-medium text-foreground">Average 1.2 days</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Phone className="mr-2 h-4 w-4" />
                      Log Call
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Create Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="mt-4">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Opportunities</CardTitle>
                    <CardDescription>Manage sales opportunities for this contact</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Opportunity
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Opportunity</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Stage</TableHead>
                        <TableHead>Close Date</TableHead>
                        <TableHead>Probability</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">HVAC System Upgrade</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-muted-foreground" />
                            <span>24,500</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">Discovery</Badge>
                        </TableCell>
                        <TableCell>April 15, 2024</TableCell>
                        <TableCell>20%</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Annual Maintenance Contract</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-muted-foreground" />
                            <span>18,750</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">Proposal</Badge>
                        </TableCell>
                        <TableCell>April 20, 2024</TableCell>
                        <TableCell>60%</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Office Expansion Project</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-muted-foreground" />
                            <span>65,000</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">Negotiation</Badge>
                        </TableCell>
                        <TableCell>May 1, 2024</TableCell>
                        <TableCell>80%</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Opportunity Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                        <div className="text-3xl font-bold">3</div>
                        <div className="text-sm text-muted-foreground">Open Deals</div>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                        <div className="text-3xl font-bold text-green-600">$108K</div>
                        <div className="text-sm text-muted-foreground">Total Value</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Pipeline Stages</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Discovery</span>
                            <span className="font-medium">$24.5K</span>
                          </div>
                          <Progress value={20} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Proposal</span>
                            <span className="font-medium">$18.7K</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Negotiation</span>
                            <span className="font-medium">$65K</span>
                          </div>
                          <Progress value={80} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Win Rate</h4>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold">68%</div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +5%
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Compared to company average of 62%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-2 border-blue-500 pl-4 py-1">
                      <div className="text-sm font-medium">Proposal Sent</div>
                      <p className="text-sm text-muted-foreground">Annual Maintenance Contract</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                    <div className="border-l-2 border-yellow-500 pl-4 py-1">
                      <div className="text-sm font-medium">Meeting Scheduled</div>
                      <p className="text-sm text-muted-foreground">Office Expansion Project</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                    <div className="border-l-2 border-green-500 pl-4 py-1">
                      <div className="text-sm font-medium">Discovery Call Completed</div>
                      <p className="text-sm text-muted-foreground">HVAC System Upgrade</p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="health-score" className="mt-4">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Health Score Trend</CardTitle>
                    <CardDescription>12-month historical view of contact health</CardDescription>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">+{contact.healthScoreTrend}%</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { month: 'Apr', score: 73 },
                        { month: 'May', score: 75 },
                        { month: 'Jun', score: 70 },
                        { month: 'Jul', score: 72 },
                        { month: 'Aug', score: 78 },
                        { month: 'Sep', score: 82 },
                        { month: 'Oct', score: 80 },
                        { month: 'Nov', score: 79 },
                        { month: 'Dec', score: 82 },
                        { month: 'Jan', score: 85 },
                        { month: 'Feb', score: 83 },
                        { month: 'Mar', score: 85 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
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
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Score Components</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="font-medium">Engagement</span>
                        </div>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                      <p className="text-sm text-muted-foreground">Regular communication and prompt responses to inquiries.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="font-medium">Financial</span>
                        </div>
                        <span className="font-medium">95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                      <p className="text-sm text-muted-foreground">Consistent payment history with no outstanding invoices.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">Responsiveness</span>
                        </div>
                        <span className="font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <p className="text-sm text-muted-foreground">Recent delays in response to communications and proposals.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="font-medium">Growth</span>
                        </div>
                        <span className="font-medium">88%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                      <p className="text-sm text-muted-foreground">Consistent increase in order value and service adoption.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Health Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center p-6">
                    <div className="relative h-40 w-40">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-5xl font-bold">{contact.healthScore}%</div>
                      </div>
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle
                          className="stroke-muted fill-none"
                          cx="50"
                          cy="50"
                          r="40"
                          strokeWidth="10"
                        />
                        <circle
                          className="stroke-blue-500 fill-none"
                          cx="50"
                          cy="50"
                          r="40"
                          strokeWidth="10"
                          strokeDasharray="251.2"
                          strokeDashoffset="${251.2 - (251.2 * contact.healthScore) / 100}"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-lg font-medium">Very Good</div>
                      <div className="text-sm text-muted-foreground">Last updated: Today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-700">Improve Responsiveness</h4>
                          <p className="text-sm text-yellow-700">Schedule regular check-ins to improve response times.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-700">Maintain Engagement</h4>
                          <p className="text-sm text-green-700">Continue regular engagement through quarterly reviews.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Sparkles className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-700">Growth Opportunity</h4>
                          <p className="text-sm text-blue-700">Explore premium service tier based on recent interest.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Activity Timeline</CardTitle>
                    <CardDescription>Complete history of all interactions</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Filter by Date
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Filter by Type
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mt-8">
                    <div className="flex">
                      <div className="relative flex flex-col items-center mr-4 h-[120px]">
                        <div className="min-h-[40px] min-w-[40px] h-[40px] w-[40px] rounded-full bg-blue-100 flex items-center justify-center z-10 flex-shrink-0">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="h-full w-0.5 bg-muted mt-2 flex-grow"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Invoice #INV-2024-001 issued</h4>
                          <div className="text-sm text-muted-foreground">March 15, 2024 - 2:30 PM</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Amount: $12,500 for HVAC System Upgrade project</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>
                          <Button variant="ghost" size="sm" className="h-7 px-2">View Invoice</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="relative flex flex-col items-center mr-4 h-[120px]">
                        <div className="min-h-[40px] min-w-[40px] h-[40px] w-[40px] rounded-full bg-purple-100 flex items-center justify-center z-10 flex-shrink-0">
                          <Calendar className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="h-full w-0.5 bg-muted mt-2 flex-grow"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Quarterly Review Meeting</h4>
                          <div className="text-sm text-muted-foreground">March 10, 2024 - 10:00 AM</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Discussed new project requirements and timeline for Office Expansion</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>
                          <Button variant="ghost" size="sm" className="h-7 px-2">View Notes</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="relative flex flex-col items-center mr-4 h-[120px]">
                        <div className="min-h-[40px] min-w-[40px] h-[40px] w-[40px] rounded-full bg-indigo-100 flex items-center justify-center z-10 flex-shrink-0">
                          <Mail className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="h-full w-0.5 bg-muted mt-2 flex-grow"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Proposal Follow-up</h4>
                          <div className="text-sm text-muted-foreground">March 8, 2024 - 4:45 PM</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Sent detailed project scope and pricing for Annual Maintenance Contract</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Sent</Badge>
                          <Button variant="ghost" size="sm" className="h-7 px-2">View Email</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="relative flex flex-col items-center mr-4 h-[120px]">
                        <div className="min-h-[40px] min-w-[40px] h-[40px] w-[40px] rounded-full bg-green-100 flex items-center justify-center z-10 flex-shrink-0">
                          <Phone className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="h-full w-0.5 bg-muted mt-2 flex-grow"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Phone Discussion</h4>
                          <div className="text-sm text-muted-foreground">March 5, 2024 - 11:15 AM</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Discussed potential expansion opportunities and new service requirements</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>
                          <Button variant="ghost" size="sm" className="h-7 px-2">View Call Notes</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="relative flex flex-col items-center mr-4 h-[120px]">
                        <div className="min-h-[40px] min-w-[40px] h-[40px] w-[40px] rounded-full bg-indigo-100 flex items-center justify-center z-10 flex-shrink-0">
                          <Mail className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="h-full w-0.5 bg-muted mt-2 flex-grow"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Meeting Confirmation</h4>
                          <div className="text-sm text-muted-foreground">March 1, 2024 - 9:20 AM</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Received confirmation for the quarterly review workshop</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Received</Badge>
                          <Button variant="ghost" size="sm" className="h-7 px-2">View Email</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="relative flex flex-col items-center mr-4 h-[120px]">
                        <div className="min-h-[40px] min-w-[40px] h-[40px] w-[40px] rounded-full bg-amber-100 flex items-center justify-center z-10 flex-shrink-0">
                          <FileText className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="h-full w-0.5 bg-muted mt-2 flex-grow"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Contract Signed</h4>
                          <div className="text-sm text-muted-foreground">January 15, 2024 - 2:15 PM</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">2024 Service Agreement signed and processed</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>
                          <Button variant="ghost" size="sm" className="h-7 px-2">View Document</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="relative flex flex-col items-center mr-4 h-[120px]">
                        <div className="min-h-[40px] min-w-[40px] h-[40px] w-[40px] rounded-full bg-muted flex items-center justify-center z-10 flex-shrink-0">
                          <Plus className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <Button variant="outline" className="w-full">
                          Load More History
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                        <div className="text-3xl font-bold">24</div>
                        <div className="text-sm text-muted-foreground">Total Activities</div>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                        <div className="text-3xl font-bold">8</div>
                        <div className="text-sm text-muted-foreground">Last 30 Days</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Activity by Type</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-indigo-500" />
                            <span className="text-sm">Emails</span>
                          </div>
                          <span className="text-sm font-medium">9</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Calls</span>
                          </div>
                          <span className="text-sm font-medium">6</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-purple-500" />
                            <span className="text-sm">Meetings</span>
                          </div>
                          <span className="text-sm font-medium">5</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-amber-500" />
                            <span className="text-sm">Documents</span>
                          </div>
                          <span className="text-sm font-medium">4</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Activity Trend</h4>
                      <div className="h-[100px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={[
                            { month: 'Oct', count: 2 },
                            { month: 'Nov', count: 3 },
                            { month: 'Dec', count: 4 },
                            { month: 'Jan', count: 3 },
                            { month: 'Feb', count: 5 },
                            { month: 'Mar', count: 8 },
                          ]}>
                            <Line
                              type="monotone"
                              dataKey="count"
                              stroke="#2563eb"
                              strokeWidth={2}
                              dot={{ r: 3 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Relationship Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-5">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Relationship Started</div>
                        <div className="text-sm text-muted-foreground">April 2016</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-5">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Star className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">First Major Project</div>
                        <div className="text-sm text-muted-foreground">June 2017</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-5">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Target className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">Strategic Partnership</div>
                        <div className="text-sm text-muted-foreground">March 2020</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-5">
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="font-medium">Largest Contract</div>
                        <div className="text-sm text-muted-foreground">January 2024</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
