import { Bell, HelpCircle, Search, Settings, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserNav } from "@/components/user-nav"
import Link from "next/link"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  // Dummy notification data
  const notifications = [
    {
      id: 1,
      title: "Overdue Tasks",
      description: "4 tasks are overdue and require immediate attention",
      time: "2 min ago",
      priority: "high",
      type: "task"
    },
    {
      id: 2,
      title: "High Priority Customers",
      description: "12 customers require urgent attention",
      time: "1 hour ago",
      priority: "medium",
      type: "customer"
    },
    {
      id: 3,
      title: "Meeting with Sarah Miller",
      description: "Scheduled for tomorrow at 10:00 AM",
      time: "30 min ago",
      priority: "normal",
      type: "meeting"
    },
    {
      id: 4,
      title: "Job assigned",
      description: "You've been assigned to a new job",
      time: "5 hours ago",
      priority: "normal",
      type: "job"
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4">
      <div className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 flex items-center gap-2 md:gap-4">
        <div className="hidden md:block -ml-1">
          <Link href="/">
            <Image
              src="/method.svg"
              alt="Method"
              width={140}
              height={37}
              priority
              className="dark:brightness-0 dark:invert"
            />
          </Link>
        </div>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-full pl-8 bg-background" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {notifications.length}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-4 py-2 font-medium">
              <span>Notifications</span>
              <span className="text-xs text-blue-500 cursor-pointer">Mark all as read</span>
            </div>
            <DropdownMenuSeparator />
            {notifications.map((notification) => {
              // Determine background color based on priority
              const bgColor =
                notification.priority === "high" ? "bg-red-50 hover:bg-red-100" :
                notification.priority === "medium" ? "bg-yellow-50 hover:bg-yellow-100" :
                notification.priority === "success" ? "bg-green-50 hover:bg-green-100" : "hover:bg-muted/50";

              // Determine text color based on priority
              const titleColor =
                notification.priority === "high" ? "text-red-600 font-semibold" :
                notification.priority === "medium" ? "text-yellow-600 font-semibold" :
                notification.priority === "success" ? "text-green-600 font-semibold" : "font-medium";

              return (
                <DropdownMenuItem key={notification.id} className={`cursor-pointer py-5 px-4 ${bgColor}`}>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <div className="flex justify-between items-center">
                      <p className={`text-sm ${titleColor}`}>{notification.title}</p>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                    {notification.priority === "high" && notification.type === "task" && (
                      <div style={{ marginTop: '12px' }} className="flex items-center gap-2">
                        <Button size="sm" className="h-7 px-3 py-1 text-xs bg-red-500 hover:bg-red-600">
                          View Tasks
                        </Button>
                      </div>
                    )}
                    {notification.priority === "medium" && notification.type === "customer" && (
                      <div style={{ marginTop: '12px' }} className="flex items-center gap-2">
                        <Button size="sm" className="h-7 px-3 py-1 text-xs bg-yellow-500 hover:bg-yellow-600 text-white">
                          View Customers
                        </Button>
                      </div>
                    )}
                  </div>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer py-2 justify-center">
              <span className="text-sm text-blue-500">View all notifications</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
        <UserNav />
      </div>
    </header>
  )
}

