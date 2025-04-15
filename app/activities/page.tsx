"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, AlertCircle, Calendar as CalendarIcon, User, CheckCircle2, Check, Bell, LayoutGrid, List, Sparkles } from "lucide-react"
import { addDays, format, isSameMonth, isToday, startOfMonth } from "date-fns"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

const styles = `
  @keyframes borderAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animated-border {
    position: absolute;
    inset: -3px;
    border-radius: 8px;
    padding: 3px;
    background: linear-gradient(
      60deg,
      rgba(59, 130, 246, 0.2),
      rgba(59, 130, 246, 0.4),
      rgba(59, 130, 246, 0.2)
    );
    background-size: 300% 100%;
    animation: borderAnimation 4s linear infinite;
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`

// Mock data for tasks and events
const events = [
  {
    id: 1,
    title: "Client Meeting",
    date: new Date(new Date().setHours(22, 31, 0, 0)),
    description: "Discuss project requirements and timeline",
    contact: {
      name: "John Doe",
      company: "Acme Corp",
      email: "john@example.com",
      avatar: "/avatars/john.png",
      initials: "JD"
    },
    assignedTo: "Emma Thompson",
    priority: "high",
    type: "meeting"
  },
  {
    id: 2,
    title: "Site Visit",
    date: new Date(new Date().setHours(22, 31, 0, 0)),
    description: "Initial site inspection and measurements",
    contact: {
      name: "Jane Smith",
      company: "Tech Solutions Ltd",
      email: "jane@example.com",
      avatar: "/avatars/jane.png",
      initials: "JS"
    },
    assignedTo: "David Chen",
    priority: "medium",
    type: "visit"
  },
  {
    id: 3,
    title: "Design Review",
    date: new Date(addDays(new Date(), 1).setHours(12, 20, 0, 0)),
    description: "Review design proposals with the team",
    contact: {
      name: "Alex Turner",
      company: "Design Studio Inc",
      email: "alex@example.com",
      avatar: "/avatars/alex.png",
      initials: "AT"
    },
    assignedTo: "Sarah Wilson",
    priority: "low",
    type: "review"
  }
]

const tasks = [
  {
    id: 2,
    title: "Review Contract",
    dueDate: addDays(new Date(), -1),
    status: "overdue",
    description: "Review and sign the contract documents",
    contact: {
      name: "Sarah Wilson",
      company: "Legal Solutions Inc",
      email: "sarah@example.com",
      avatar: "/avatars/sarah.png",
      initials: "SW"
    },
    assignedTo: "Michael Brown",
    priority: "high",
    type: "document"
  },
  {
    id: 3,
    title: "Follow Up with Client",
    dueDate: addDays(new Date(), -2),
    status: "overdue",
    description: "Send follow-up email regarding project timeline",
    contact: {
      name: "Tom Brown",
      company: "Marketing Pro",
      email: "tom@example.com",
      avatar: "/avatars/tom.png",
      initials: "TB"
    },
    assignedTo: "Lisa Anderson",
    priority: "medium",
    type: "follow-up"
  },
  {
    id: 1,
    title: "Submit Proposal",
    dueDate: addDays(new Date(), 1),
    status: "pending",
    description: "Prepare and submit project proposal",
    contact: {
      name: "Mike Johnson",
      company: "Consulting Group",
      email: "mike@example.com",
      avatar: "/avatars/mike.png",
      initials: "MJ"
    },
    assignedTo: "Robert Taylor",
    priority: "high",
    type: "document"
  }
]

const priorityTooltips = {
  high: "immediate attention based on deadline proximity and stakeholder impact",
  medium: "standard priority with flexible timeline",
  low: "this can be handled as resources become available"
}

export default function ActivitiesPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<'calendar' | 'list'>('calendar')

  // Combine and sort tasks and events for list view
  const allActivities = [
    ...tasks.map(task => ({
      ...task,
      date: task.dueDate,
      isTask: true as const
    })),
    ...events.map(event => ({
      ...event,
      status: undefined,
      isTask: false as const
    }))
  ].sort((a, b) => {
    // First sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const priorityDiff = priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    if (priorityDiff !== 0) return priorityDiff;
    // Then by date
    return a.date.getTime() - b.date.getTime();
  })

  return (
    <>
      <style>{styles}</style>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Activities</h1>
          <p className="text-muted-foreground">Manage your tasks and events</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-9">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex space-x-2">
                <Button
                  variant={view === 'calendar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setView('calendar')}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Calendar
                </Button>
                <Button
                  variant={view === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setView('list')}
                >
                  <List className="h-4 w-4 mr-2" />
                  List
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {view === 'calendar' ? (
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(day) => day && setDate(day)}
                  className="rounded-md border w-full p-0"
                  classNames={{
                    day_today: "bg-primary/5 text-primary font-bold",
                    day: "h-24 w-full relative",
                    cell: "h-24 w-full p-0",
                    table: "w-full border-collapse pt-6",
                    head_cell: "text-muted-foreground font-normal text-base p-4 text-center relative w-full",
                    nav_button: "h-9 w-9 bg-transparent hover:bg-muted/50 rounded-md inline-flex items-center justify-center",
                    nav: "absolute top-6 left-0 right-0 flex items-center justify-between px-6 py-4 z-10",
                    caption: "text-lg font-semibold text-center flex-1 pb-2",
                    caption_label: "text-lg font-semibold",
                    nav_button_previous: "absolute left-4",
                    nav_button_next: "absolute right-4",
                    months: "w-full pt-6",
                    month: "w-full",
                    tbody: "border-t",
                    head_row: "grid grid-cols-7 w-full",
                    row: "grid grid-cols-7 w-full",
                    head: "w-full",
                    root: "w-full flex flex-col relative",
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_outside: "opacity-50",
                  }}
                  formatters={{
                    formatWeekdayName: (date) => format(date, 'EEE')
                  }}
                  components={{
                    Day: ({ date: dayDate, ...props }) => {
                      const dayEvents = events.filter(event => 
                        format(event.date, 'yyyy-MM-dd') === format(dayDate, 'yyyy-MM-dd')
                      )
                      const dayTasks = tasks.filter(task => 
                        format(task.dueDate, 'yyyy-MM-dd') === format(dayDate, 'yyyy-MM-dd')
                      )
                      
                      const isCurrentMonth = isSameMonth(dayDate, date)
                      const isTodays = isToday(dayDate)
                      
                      return (
                        <div
                          {...props}
                          className={`h-full w-full p-1 relative flex flex-col items-start justify-start border-b border-r ${
                            !isCurrentMonth ? 'opacity-50' : ''
                          } ${isTodays ? 'bg-primary/5' : ''}`}
                        >
                          <span className="text-sm font-medium absolute top-1 left-1">
                            {format(dayDate, 'd')}
                          </span>
                          <div className="mt-6 w-full space-y-1 overflow-hidden">
                            <TooltipProvider>
                              {dayEvents.map((event, i) => (
                                <Tooltip key={event.id}>
                                  <TooltipTrigger asChild>
                                    <div className="text-xs truncate bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/40">
                                      {event.title}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent side="right" className="p-4 max-w-[300px]">
                                    <div className="space-y-2">
                                      <p className="font-medium">{event.title}</p>
                                      <p className="text-sm text-muted-foreground">{event.description}</p>
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                          <AvatarImage src={event.contact.avatar} />
                                          <AvatarFallback>{event.contact.initials}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">{event.contact.name}</span>
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        {format(event.date, 'PPp')}
                                      </p>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              ))}
                              {dayTasks.map((task, i) => (
                                <Tooltip key={task.id}>
                                  <TooltipTrigger asChild>
                                    <div
                                      className={`text-xs truncate px-1.5 py-0.5 rounded cursor-pointer ${
                                        task.status === 'overdue' 
                                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/40'
                                          : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/40'
                                      }`}
                                    >
                                      {task.title}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent side="right" className="p-4 max-w-[300px]">
                                    <div className="space-y-2">
                                      <p className="font-medium">{task.title}</p>
                                      <Badge
                                        variant={task.status === 'overdue' ? 'destructive' : 'default'}
                                      >
                                        {task.status}
                                      </Badge>
                                      <p className="text-sm text-muted-foreground">{task.description}</p>
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                          <AvatarImage src={task.contact.avatar} />
                                          <AvatarFallback>{task.contact.initials}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">{task.contact.name}</span>
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        Due {format(task.dueDate, 'PPp')}
                                      </p>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              ))}
                            </TooltipProvider>
                          </div>
                        </div>
                      )
                    }
                  }}
                  modifiers={{
                    event: (date) => events.some(event => 
                      format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                    )
                  }}
                  modifiersStyles={{
                    event: { border: '1px solid #3b82f6' }
                  }}
                />
              ) : (
                <Table className="border rounded-md">
                  <TableHeader className="bg-muted">
                    <TableRow>
                      <TableHead className="w-[200px]">Title</TableHead>
                      <TableHead className="w-[200px]">Customer</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allActivities.map((activity) => (
                      <TableRow key={`${activity.isTask ? 'task' : 'event'}-${activity.id}`} className="hover:bg-muted/50">
                        <TableCell>
                          <span className="text-[14px]">{activity.title}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{activity.contact.name}</span>
                            <span className="text-sm text-muted-foreground">{activity.contact.company}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-muted-foreground border-muted-foreground/20 bg-background">
                            {activity.isTask ? 'task' : 'event'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "bg-opacity-10 border-2",
                                    {
                                      "border-red-500 bg-red-500 text-red-500": activity.priority === "high",
                                      "border-yellow-500 bg-yellow-500 text-yellow-500": activity.priority === "medium",
                                      "border-green-500 bg-green-500 text-green-500": activity.priority === "low",
                                    }
                                  )}
                                >
                                  {activity.priority}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent 
                                className="flex items-start gap-2 p-3 max-w-[320px] relative bg-background" 
                                style={{
                                  background: "linear-gradient(to right, hsl(var(--background)), hsl(var(--background))) padding-box, linear-gradient(60deg, rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0.7), rgba(59, 130, 246, 0.4)) border-box",
                                  border: "3px solid transparent",
                                  backgroundSize: "300% 100%",
                                  animation: "borderAnimation 4s linear infinite"
                                }}
                              >
                                <div className="relative z-10 flex items-start gap-2">
                                  <Sparkles className="h-5 w-5 text-blue-500 shrink-0" />
                                  <p>
                                    <span className="font-semibold">AI insights: </span>
                                    {priorityTooltips[activity.priority as keyof typeof priorityTooltips]}
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className={cn(
                              "text-sm",
                              {
                                "text-red-500": activity.isTask && activity.status === "overdue"
                              }
                            )}>
                              {isToday(activity.date) 
                                ? `Today, ${format(activity.date, 'h:mm a')}`
                                : format(activity.date, 'MMM d, h:mm a')}
                            </span>
                            {activity.isTask && activity.status === "overdue" && (
                              <Bell className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {activity.isTask && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                                    <Check className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Mark complete</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>Upcoming and overdue tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tasks
                  .sort((a, b) => (a.status === 'overdue' ? -1 : 1))
                  .map(task => (
                  <div key={task.id} className="flex flex-col space-y-2 p-3 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{task.title}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                              <Check className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Mark complete</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{task.contact.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={`text-sm ${task.status === 'overdue' ? 'text-red-500' : 'text-muted-foreground'}`}>
                          Due {format(task.dueDate, 'PPp')}
                        </span>
                        {task.status === 'overdue' && (
                          <Bell className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline">View All Tasks</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Events</CardTitle>
                <CardDescription>Upcoming and past events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map(event => (
                  <div key={event.id} className="flex flex-col space-y-2 p-3 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{event.title}</span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{event.contact.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {isToday(event.date) 
                            ? `Today, ${format(event.date, 'h:mm a')}`
                            : `Tomorrow, ${format(event.date, 'h:mm a')}`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline">View All Events</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
} 