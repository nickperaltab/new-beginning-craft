import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Calendar, FileText, ClipboardList } from "lucide-react"

interface JobMetrics {
  estimating: number
  inProgress: number
  upcomingDeadlines: number
  overdueJobs: number
}

export function OperationalOverview() {
  // This would come from your API or state management in a real app
  const metrics: JobMetrics = {
    estimating: 3,
    inProgress: 8,
    upcomingDeadlines: 3,
    overdueJobs: 1,
  }

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.overdueJobs > 0 && (
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-red-50 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <div className="text-2xl font-semibold">{metrics.overdueJobs}</div>
                <div className="text-sm text-muted-foreground">Overdue job</div>
              </div>
            </CardContent>
          </Card>
        )}

        {metrics.upcomingDeadlines > 0 && (
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-yellow-50 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <div className="text-2xl font-semibold">{metrics.upcomingDeadlines}</div>
                <div className="text-sm text-muted-foreground">Upcoming deadlines</div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-full">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-semibold">{metrics.estimating}</div>
              <div className="text-sm text-muted-foreground">Estimates awaiting approval</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="bg-green-50 p-2 rounded-full">
              <ClipboardList className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-semibold">{metrics.inProgress}</div>
              <div className="text-sm text-muted-foreground">Active work orders</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

