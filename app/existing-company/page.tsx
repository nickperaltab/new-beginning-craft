"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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



      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="health-score">Health Score</TabsTrigger>
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {timeline.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="mt-0.5">
                        {getTimelineIcon(item.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{item.title}</h4>
                          <Badge variant="outline" className="ml-2">
                            {getStatusIcon(item.status)}
                            <span className="ml-1">{item.status}</span>
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.date} at {item.time}
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
        </TabsContent>
        
        <TabsContent value="details" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Legal Name</div>
                        <div className="font-medium">{company.name}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Industry</div>
                        <div className="font-medium">Technology / Software</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Company Size</div>
                        <div className="font-medium">500-1000 employees</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Founded</div>
                        <div className="font-medium">2005</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Annual Revenue</div>
                        <div className="font-medium">${company.totalRevenue.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Website</div>
                        <div className="font-medium text-blue-600">www.acmecorp.com</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Headquarters</div>
                        <div className="font-medium">New York, NY</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Tax ID</div>
                        <div className="font-medium">XX-XXXXXXX</div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-3">Company Description</h4>
                    <p className="text-sm text-muted-foreground">
                      Acme Corporation is a leading provider of enterprise software solutions, specializing in cloud-based business intelligence and analytics platforms. With a global presence in over 30 countries, Acme helps organizations transform their data into actionable insights. The company has been recognized as an industry leader by Gartner and Forrester for five consecutive years.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Employees</h4>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Employee
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {contacts.map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={contact.avatar} />
                              <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{contact.name}</div>
                              <div className="text-sm text-muted-foreground">{contact.position}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Link href="/existing-contact">
                              <Button variant="ghost" size="icon">
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Company Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Headquarters</div>
                      <div className="font-medium">350 Fifth Avenue</div>
                      <div className="text-sm text-muted-foreground">New York, NY 10118</div>
                      <div className="text-sm text-muted-foreground">United States</div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Billing Address</div>
                      <div className="font-medium">350 Fifth Avenue, Suite 4300</div>
                      <div className="text-sm text-muted-foreground">New York, NY 10118</div>
                      <div className="text-sm text-muted-foreground">United States</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Account Manager</div>
                      <div className="font-medium">Sarah Johnson</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Customer Since</div>
                      <div className="font-medium">March 2018</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Contract Renewal</div>
                      <div className="font-medium">April 15, 2026</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Payment Terms</div>
                      <div className="font-medium">Net 30</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="activities" className="mt-4">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Tasks</CardTitle>
                    <CardDescription>Manage your tasks related to this company</CardDescription>
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
                    <CardDescription>Scheduled events with this company</CardDescription>
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
                    <CardDescription>Manage sales opportunities for this company</CardDescription>
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
                            <span>175,000</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Negotiation</Badge>
                        </TableCell>
                        <TableCell>May 30, 2024</TableCell>
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
                  <CardTitle>Pipeline Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Value</span>
                      <span className="font-medium">$218,250</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Weighted Value</span>
                      <span className="font-medium">$152,750</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Avg. Deal Size</span>
                      <span className="font-medium">$72,750</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Win Rate</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium mb-2">Stage Distribution</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Discovery</span>
                            <span>$24,500</span>
                          </div>
                          <Progress value={11} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Proposal</span>
                            <span>$18,750</span>
                          </div>
                          <Progress value={9} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Negotiation</span>
                            <span>$175,000</span>
                          </div>
                          <Progress value={80} className="h-1.5" />
                        </div>
                      </div>
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
                    <CardDescription>12-month historical view of company health</CardDescription>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">+{company.healthScoreTrend}%</span>
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
                      <p className="text-sm text-muted-foreground">Average response time has increased slightly in the past month.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="font-medium">Product Usage</span>
                        </div>
                        <span className="font-medium">88%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                      <p className="text-sm text-muted-foreground">High adoption rate across all product features and modules.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col items-center">
                      <div className="relative w-32 h-32">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-3xl font-bold">{company.healthScore}%</div>
                        </div>
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            className="text-muted stroke-current"
                            strokeWidth="10"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <circle
                            className="text-blue-500 stroke-current"
                            strokeWidth="10"
                            strokeDasharray={`${company.healthScore * 2.51} 251`}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                        </svg>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        <span>+{company.healthScoreTrend}% from previous quarter</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Health Factors</h4>
                      <ul className="space-y-1">
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          Strong financial performance
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          High product adoption
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          Regular strategic meetings
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          Increasing response times
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">Schedule Quarterly Review</div>
                          <p className="text-xs text-muted-foreground">Last meeting was over 60 days ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                      <div className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">Upsell Opportunity</div>
                          <p className="text-xs text-muted-foreground">High usage metrics indicate readiness for premium tier</p>
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
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Company History</CardTitle>
                    <CardDescription>Timeline of key events and interactions</CardDescription>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="contracts">Contracts</SelectItem>
                      <SelectItem value="meetings">Meetings</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="flex gap-4 mt-4">
                      <div className="min-h-[40px] min-w-[40px] h-[40px] w-[40px] rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Contract Renewal</h4>
                          <Badge variant="outline">Contract</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">April 15, 2024</div>
                        <p className="text-sm text-muted-foreground mt-1">Renewed enterprise license agreement for 2-year term valued at $450,000 annually</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="min-h-[40px] min-w-[40px] h-[40px] w-[40px] rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Executive Strategy Meeting</h4>
                          <Badge variant="outline">Meeting</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">March 28, 2024</div>
                        <p className="text-sm text-muted-foreground mt-1">Quarterly strategy session with C-suite to discuss product roadmap and partnership opportunities</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="min-h-[40px] min-w-[40px] h-[40px] w-[40px] rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Analytics Module Expansion</h4>
                          <Badge variant="outline">Sales</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">February 15, 2024</div>
                        <p className="text-sm text-muted-foreground mt-1">Added premium analytics package to existing subscription ($75,000 ARR increase)</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="min-h-[40px] min-w-[40px] h-[40px] w-[40px] rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Support Escalation</h4>
                          <Badge variant="outline">Support</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">January 10, 2024</div>
                        <p className="text-sm text-muted-foreground mt-1">Critical issue with data syncing resolved within 4 hours by senior engineering team</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Event Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Events</span>
                      <span className="font-medium">24</span>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-sm">Contracts</span>
                        </div>
                        <span className="text-sm font-medium">5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-sm">Meetings</span>
                        </div>
                        <span className="text-sm font-medium">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span className="text-sm">Sales</span>
                        </div>
                        <span className="text-sm font-medium">6</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                          <span className="text-sm">Support</span>
                        </div>
                        <span className="text-sm font-medium">5</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Key Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                      <div className="text-sm font-medium">2 Year Anniversary</div>
                      <p className="text-xs text-muted-foreground">April 15, 2024</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                      <div className="text-sm font-medium">Premium Tier Upgrade</div>
                      <p className="text-xs text-muted-foreground">February 15, 2024</p>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg">
                      <div className="text-sm font-medium">First Expansion Deal</div>
                      <p className="text-xs text-muted-foreground">October 10, 2022</p>
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