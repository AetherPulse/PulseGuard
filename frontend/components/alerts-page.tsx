"use client"

import { useState, useEffect } from "react"
import { AlertCircle, AlertTriangle, Bell, Check, Clock, Filter, Search, Trash2, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { fetchAlerts } from "@/lib/api"
import type { Alert } from "@/types/dashboard"

export default function AlertsPage() {
  const [loading, setLoading] = useState(true)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        setLoading(true)
        const data = await fetchAlerts()
        setAlerts(data)
        setFilteredAlerts(data)
      } catch (error) {
        console.error("Failed to fetch alerts:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAlerts()
  }, [])

  useEffect(() => {
    let filtered = alerts

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (alert) =>
          alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alert.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply severity filter
    if (severityFilter !== "all") {
      filtered = filtered.filter((alert) => alert.severity === severityFilter)
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((alert) => alert.status === statusFilter)
    }

    // Apply time filter
    if (timeFilter !== "all") {
      const now = new Date()
      const timeFilterMap: Record<string, number> = {
        today: 24,
        week: 168,
        month: 720,
      }

      if (timeFilter in timeFilterMap) {
        const hoursCutoff = timeFilterMap[timeFilter]
        filtered = filtered.filter((alert) => {
          const alertDate = new Date(alert.timestamp)
          const hoursDiff = (now.getTime() - alertDate.getTime()) / (1000 * 60 * 60)
          return hoursDiff <= hoursCutoff
        })
      }
    }

    setFilteredAlerts(filtered)
  }, [alerts, searchQuery, severityFilter, statusFilter, timeFilter])

  const markAsRead = (id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, status: "read" } : alert)))
  }

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  if (loading) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading alerts...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
          <p className="text-muted-foreground">Monitor and manage disease outbreak alerts</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search alerts..."
              className="pl-8 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="severity">Severity</Label>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger id="severity">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time Period</Label>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Alert Types</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="outbreak" defaultChecked />
                    <Label htmlFor="outbreak" className="text-sm">
                      Outbreak Alerts
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="prediction" defaultChecked />
                    <Label htmlFor="prediction" className="text-sm">
                      Prediction Alerts
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="data" defaultChecked />
                    <Label htmlFor="data" className="text-sm">
                      Data Updates
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="system" defaultChecked />
                    <Label htmlFor="system" className="text-sm">
                      System Notifications
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Alerts</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="high">High Priority</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0 space-y-4">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    onMarkAsRead={() => markAsRead(alert.id)}
                    onDelete={() => deleteAlert(alert.id)}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No alerts found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery || severityFilter !== "all" || statusFilter !== "all" || timeFilter !== "all"
                      ? "Try adjusting your filters to see more results."
                      : "You're all caught up! No alerts to display."}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="unread" className="mt-0 space-y-4">
              {filteredAlerts.filter((a) => a.status === "unread").length > 0 ? (
                filteredAlerts
                  .filter((a) => a.status === "unread")
                  .map((alert) => (
                    <AlertCard
                      key={alert.id}
                      alert={alert}
                      onMarkAsRead={() => markAsRead(alert.id)}
                      onDelete={() => deleteAlert(alert.id)}
                    />
                  ))
              ) : (
                <div className="text-center py-12">
                  <Check className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No unread alerts</h3>
                  <p className="text-muted-foreground">You've read all your alerts.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="high" className="mt-0 space-y-4">
              {filteredAlerts.filter((a) => a.severity === "high").length > 0 ? (
                filteredAlerts
                  .filter((a) => a.severity === "high")
                  .map((alert) => (
                    <AlertCard
                      key={alert.id}
                      alert={alert}
                      onMarkAsRead={() => markAsRead(alert.id)}
                      onDelete={() => deleteAlert(alert.id)}
                    />
                  ))
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No high priority alerts</h3>
                  <p className="text-muted-foreground">There are currently no high priority alerts.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

interface AlertCardProps {
  alert: Alert
  onMarkAsRead: () => void
  onDelete: () => void
}

function AlertCard({ alert, onMarkAsRead, onDelete }: AlertCardProps) {
  const severityStyles = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200",
  }

  const severityIcons = {
    high: <AlertTriangle className="h-5 w-5" />,
    medium: <AlertCircle className="h-5 w-5" />,
    low: <Bell className="h-5 w-5" />,
  }

  return (
    <Card className={alert.status === "unread" ? "border-l-4 border-l-blue-500" : ""}>
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{alert.title}</CardTitle>
            <Badge className={severityStyles[alert.severity]}>
              {severityIcons[alert.severity]}
              <span className="ml-1">{alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}</span>
            </Badge>
            {alert.status === "unread" && (
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                New
              </Badge>
            )}
          </div>
          <CardDescription className="flex items-center mt-1">
            <Clock className="mr-1 h-3 w-3" />
            {new Date(alert.timestamp).toLocaleString()}
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {alert.status === "unread" && (
            <Button variant="ghost" size="sm" onClick={onMarkAsRead}>
              <Check className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{alert.description}</p>
        {alert.location && (
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <Globe className="mr-1 h-4 w-4" />
            {alert.location}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

