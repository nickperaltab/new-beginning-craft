"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, AlertCircle, Calendar as CalendarIcon, User, CheckCircle2 } from "lucide-react"
import { addDays, format, isSameMonth, isToday, startOfMonth } from "date-fns"

// Mock data for tasks and events
const tasks = [
  {
    id: 1,
    title: "Follow up on proposal",
    dueDate: addDays(new Date(), -2),
    status: "overdue",
    contact: {
      name: "Alex Rivera",
      email: "alex.rivera@gmail.com",
      avatar: null
    },
    type: "follow-up"
  },
  {
    id: 2,
    title: "Send invoice reminder",
    dueDate: addDays(new Date(), 1),
    status: "upcoming",
    contact: {
      name: "Maria Chen",
      email: "maria.chen@outlook.com",
      avatar: null
    },
    type: "invoice"
  },
  {
    id: 3,
    title: "Schedule maintenance visit",
    dueDate: addDays(new Date(), 2),
    status: "upcoming",
    contact: {
      name: "David Kumar",
      email: "david.kumar@yahoo.com",
      avatar: null
    },
    type: "meeting"
  }
]

const events = [
  {
    id: 1,
    title: "Site inspection",
    date: addDays(new Date(), -5),
    contact: {
      name: "Alex Rivera",
      email: "alex.rivera@gmail.com",
      avatar: null
    },
    type: "visit"
  },
  {
    id: 2,
    title: "Contract renewal meeting",
    date: addDays(new Date(), 5),
    contact: {
      name: "Maria Chen",
      email: "maria.chen@outlook.com",
      avatar: null
    },
    type: "meeting"
  }
]

export default function ActivitiesPage() {
  const [date, setDate] = useState<Date>(new Date())

  const overdueTasks = tasks.filter(task => task.status === "overdue")
  const upcomingTasks = tasks.filter(task => task.status === "upcoming")

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Activities</h1>
        <p className="text-muted-foreground">Manage your tasks and events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {overdueTasks.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Overdue Tasks ({overdueTasks.length})</AlertTitle>
            <AlertDescription>
              You have {overdueTasks.length} overdue tasks that require immediate attention.
            </AlertDescription>
          </Alert>
        )}

        {upcomingTasks.length > 0 && (
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertTitle>Upcoming Tasks ({upcomingTasks.length})</AlertTitle>
            <AlertDescription>
              You have {upcomingTasks.length} tasks due in the next few days.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-9">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Monthly overview of your activities</CardDescription>
          </CardHeader>
          <CardContent>
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
              ISOWeek={false}
              showOutsideDays={true}
              fromMonth={startOfMonth(new Date())}
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
                        {dayEvents.map((event, i) => (
                          <div
                            key={event.id}
                            className="text-[10px] truncate bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded"
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayTasks.map((task, i) => (
                          <div
                            key={task.id}
                            className={`text-[10px] truncate px-1.5 py-0.5 rounded ${
                              task.status === 'overdue' 
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            }`}
                          >
                            {task.title}
                          </div>
                        ))}
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
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>Upcoming and overdue tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tasks.map(task => (
                <div key={task.id} className="flex items-start gap-4 p-3 rounded-lg border">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={task.contact.avatar || undefined} />
                    <AvatarFallback>{task.contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{task.title}</p>
                      <Badge variant={task.status === "overdue" ? "destructive" : "outline"}>
                        {task.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{task.contact.name}</span>
                      <span>•</span>
                      <Clock className="h-3 w-3" />
                      <span>Due {format(task.dueDate, 'MMM d')}</span>
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
                <div key={event.id} className="flex items-start gap-4 p-3 rounded-lg border">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={event.contact.avatar || undefined} />
                    <AvatarFallback>{event.contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{event.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{event.contact.name}</span>
                      <span>•</span>
                      <CalendarIcon className="h-3 w-3" />
                      <span>{format(event.date, 'MMM d')}</span>
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
  )
} 