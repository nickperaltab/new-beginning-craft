import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, FileText, AlertTriangle, ClipboardList } from "lucide-react"

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
    <div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Attention Required</CardTitle>
          <CardDescription>Critical items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {metrics.overdueJobs > 0 && (
              <Alert variant="destructive" className="py-2">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <AlertDescription className="text-sm">{metrics.overdueJobs} overdue job</AlertDescription>
              </Alert>
            )}

            {metrics.upcomingDeadlines > 0 && (
              <Alert className="py-2 border-yellow-500 text-yellow-700 bg-yellow-50">
                <Calendar className="h-4 w-4 mr-2" />
                <AlertDescription className="text-sm">
                  {metrics.upcomingDeadlines} upcoming deadlines this week
                </AlertDescription>
              </Alert>
            )}

            <Alert className="py-2 border-blue-500 text-blue-700 bg-blue-50">
              <FileText className="h-4 w-4 mr-2" />
              <AlertDescription className="text-sm">{metrics.estimating} estimates awaiting approval</AlertDescription>
            </Alert>

            <Alert className="py-2 border-green-500 text-green-700 bg-green-50">
              <ClipboardList className="h-4 w-4 mr-2" />
              <AlertDescription className="text-sm">{metrics.inProgress} active work orders</AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

