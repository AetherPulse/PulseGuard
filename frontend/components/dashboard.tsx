"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowUp, Clock, Download, Layers, Newspaper, TrendingUp, WormIcon as Virus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GlobalRiskMap from "@/components/global-risk-map"
import CaseTrendsChart from "@/components/case-trends-chart"
import RiskByRegionChart from "@/components/risk-by-region-chart"
import PredictiveAnalyticsChart from "@/components/predictive-analytics-chart"
import { useToast } from "@/hooks/use-toast"
import { fetchDashboardData } from "@/lib/api"
import type { DashboardData } from "@/types/dashboard"
import { exportToPDF, exportToCSV, exportToImage } from "@/lib/export-utils"

export default function Dashboard() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("map")
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [exportMenuOpen, setExportMenuOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const data = await fetchDashboardData()
        setDashboardData(data)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  const handleExport = async (format: "pdf" | "csv" | "image") => {
    setExportMenuOpen(false)

    if (!dashboardData) {
      toast({
        title: "Export Failed",
        description: "No data available to export",
        variant: "destructive",
      })
      return
    }

    try {
      toast({
        title: "Exporting...",
        description: `Preparing ${format.toUpperCase()} export`,
      })

      let result

      switch (format) {
        case "pdf":
          result = await exportToPDF(dashboardData, activeTab)
          break
        case "csv":
          result = await exportToCSV(dashboardData)
          break
        case "image":
          result = await exportToImage(activeTab)
          break
      }

      toast({
        title: "Export Complete",
        description: `Successfully exported data as ${format.toUpperCase()}`,
      })
    } catch (error) {
      console.error(`Failed to export as ${format}:`, error)
      toast({
        title: "Export Failed",
        description: `Could not export as ${format.toUpperCase()}. Please try again.`,
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6 grid-bg">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Alerts"
          value={dashboardData?.metrics.activeAlerts.value || "247"}
          change={dashboardData?.metrics.activeAlerts.change || "+12%"}
          trend="up"
          color="blue"
        />
        <MetricCard
          title="Predicted Cases"
          value={dashboardData?.metrics.predictedCases.value || "3,428"}
          change={dashboardData?.metrics.predictedCases.change || "+23%"}
          trend="up"
          color="red"
        />
        <MetricCard
          title="Risk Level"
          value={dashboardData?.metrics.riskLevel.value || "High"}
          subtext={dashboardData?.metrics.riskLevel.subtext || "Level 4"}
          color="red"
        />
        <MetricCard
          title="Monitored Regions"
          value={dashboardData?.metrics.monitoredRegions.value || "182"}
          change={dashboardData?.metrics.monitoredRegions.change || "+5"}
          trend="up"
          color="blue"
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="bg-secondary">
                <TabsTrigger
                  value="map"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Risk Map
                </TabsTrigger>
                <TabsTrigger
                  value="predictive"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Predictive Model
                </TabsTrigger>
              </TabsList>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-primary/50 hover:bg-primary/20">
                  <Layers className="mr-2 h-4 w-4" />
                  Layers
                </Button>
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExportMenuOpen(!exportMenuOpen)}
                    className="border-primary/50 hover:bg-primary/20"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>

                  {exportMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-card ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <button
                          className="block px-4 py-2 text-sm text-foreground hover:bg-secondary w-full text-left"
                          onClick={() => handleExport("pdf")}
                        >
                          Export as PDF
                        </button>
                        <button
                          className="block px-4 py-2 text-sm text-foreground hover:bg-secondary w-full text-left"
                          onClick={() => handleExport("csv")}
                        >
                          Export as CSV
                        </button>
                        <button
                          className="block px-4 py-2 text-sm text-foreground hover:bg-secondary w-full text-left"
                          onClick={() => handleExport("image")}
                        >
                          Export as Image
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <TabsContent value="map" className="mt-0">
              <Card className="futuristic-card">
                <CardContent className="p-0">
                  <GlobalRiskMap riskZones={dashboardData?.riskZones || []} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="predictive" className="mt-0">
              <Card className="futuristic-card">
                <CardContent className="p-0">
                  <PredictiveAnalyticsChart data={dashboardData?.predictiveData || []} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="futuristic-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium glow-text">Case Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <CaseTrendsChart data={dashboardData?.caseTrends || []} />
              </CardContent>
            </Card>

            <Card className="futuristic-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium glow-text">Risk by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <RiskByRegionChart data={dashboardData?.regionRisks || []} />
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <Card className="h-full futuristic-card">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-md font-medium glow-text">Recent Alerts</CardTitle>
              <Button variant="link" size="sm" className="text-primary hover:text-primary/80" asChild>
                <a href="/alerts">View All</a>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {dashboardData?.recentAlerts.map((alert, index) => (
                <AlertItem
                  key={index}
                  type={alert.type}
                  title={alert.title}
                  description={alert.description}
                  time={alert.time}
                  icon={
                    alert.type === "high-risk" ? (
                      <Virus className="h-4 w-4" />
                    ) : alert.type === "trend" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <Newspaper className="h-4 w-4" />
                    )
                  }
                />
              )) || (
                <>
                  <AlertItem
                    type="high-risk"
                    title="High Risk Alert"
                    description="New outbreak predicted in Southeast Asia"
                    time="2 minutes ago"
                    icon={<Virus className="h-4 w-4" />}
                  />
                  <AlertItem
                    type="trend"
                    title="Trend Update"
                    description="Case numbers stabilizing in Europe"
                    time="15 minutes ago"
                    icon={<TrendingUp className="h-4 w-4" />}
                  />
                  <AlertItem
                    type="data"
                    title="Data Update"
                    description="New CDC data integrated into predictions"
                    time="1 hour ago"
                    icon={<Newspaper className="h-4 w-4" />}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change?: string
  trend?: "up" | "down"
  subtext?: string
  color: "blue" | "red" | "green" | "yellow"
}

function MetricCard({ title, value, change, trend, subtext, color }: MetricCardProps) {
  const colorClasses = {
    blue: "text-primary",
    red: "text-destructive",
    green: "text-green-500",
    yellow: "text-yellow-500",
  }

  return (
    <Card className="futuristic-card">
      <CardContent className="p-6">
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="text-2xl font-semibold mt-1 glow-text">{value}</div>
        {change && (
          <div className={`text-sm mt-1 ${colorClasses[color]}`}>
            {trend === "up" && <ArrowUp className="inline h-3 w-3 mr-1" />}
            {change}
          </div>
        )}
        {subtext && <div className={`text-sm mt-1 ${colorClasses[color]}`}>{subtext}</div>}
      </CardContent>
    </Card>
  )
}

interface AlertItemProps {
  type: "high-risk" | "trend" | "data" | "simulation"
  title: string
  description: string
  time: string
  icon: React.ReactNode
}

function AlertItem({ type, title, description, time, icon }: AlertItemProps) {
  const typeStyles = {
    "high-risk": "bg-red-500/10 border-red-500/20 gradient-border",
    trend: "bg-blue-500/10 border-blue-500/20 gradient-border",
    data: "bg-indigo-500/10 border-indigo-500/20 gradient-border",
    simulation: "bg-yellow-500/10 border-yellow-500/20 gradient-border",
  }

  const iconStyles = {
    "high-risk": "bg-red-500 text-white",
    trend: "bg-blue-500 text-white",
    data: "bg-indigo-500 text-white",
    simulation: "bg-yellow-500 text-white",
  }

  return (
    <div className={`p-3 rounded border ${typeStyles[type]}`}>
      <div className="flex items-start">
        <div className={`rounded-full p-2 mr-3 ${iconStyles[type]}`}>{icon}</div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" /> {time}
          </div>
        </div>
      </div>
    </div>
  )
}

