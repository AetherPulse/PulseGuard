"use client"

import { useState, useEffect } from "react"
import { Calendar, Download, Globe, Info, Lightbulb, Maximize2, WormIcon as Virus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { fetchAnalyticsData } from "@/lib/api"
import type { AnalyticsData } from "@/types/dashboard"
import CaseTrendsChart from "@/components/case-trends-chart"
import RiskByRegionChart from "@/components/risk-by-region-chart"
import PredictiveAnalyticsChart from "@/components/predictive-analytics-chart"
import OutbreakPredictionMap from "@/components/outbreak-prediction-map"
import { exportToPDF, exportToCSV, exportToImage } from "@/lib/export-utils"
import { useToast } from "@/hooks/use-toast"

export default function AnalyticsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [region, setRegion] = useState("global")
  const [timeRange, setTimeRange] = useState("30d")
  const [diseaseType, setDiseaseType] = useState("all")
  const [exportMenuOpen, setExportMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("trends")

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const analyticsData = await fetchAnalyticsData(region, timeRange, diseaseType)
        setData(analyticsData)
      } catch (error) {
        console.error("Failed to fetch analytics data:", error)
        toast({
          title: "Error",
          description: "Failed to load analytics data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [region, timeRange, diseaseType, toast])

  const handleExport = async (format: "pdf" | "csv" | "image") => {
    setExportMenuOpen(false)

    if (!data) {
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
          result = await exportToPDF(data, activeTab)
          break
        case "csv":
          result = await exportToCSV(data)
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
            <p className="mt-2 text-muted-foreground">Loading analytics data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Advanced analytics and insights for disease outbreak prediction</p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[150px]">
              <Globe className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">Global</SelectItem>
              <SelectItem value="north-america">North America</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="africa">Africa</SelectItem>
              <SelectItem value="south-america">South America</SelectItem>
              <SelectItem value="oceania">Oceania</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={diseaseType} onValueChange={setDiseaseType}>
            <SelectTrigger className="w-[150px]">
              <Virus className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Disease Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="respiratory">Respiratory</SelectItem>
              <SelectItem value="vector-borne">Vector-borne</SelectItem>
              <SelectItem value="zoonotic">Zoonotic</SelectItem>
              <SelectItem value="water-borne">Water-borne</SelectItem>
              <SelectItem value="food-borne">Food-borne</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Button variant="outline" size="icon" onClick={() => setExportMenuOpen(!exportMenuOpen)}>
              <Download className="h-4 w-4" />
            </Button>

            {exportMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleExport("pdf")}
                  >
                    Export as PDF
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleExport("csv")}
                  >
                    Export as CSV
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Cases"
          value={data?.stats.totalCases || "124,567"}
          change={data?.stats.totalCasesChange || "+12.5%"}
          trend="up"
        />
        <StatCard
          title="Active Outbreaks"
          value={data?.stats.activeOutbreaks || "37"}
          change={data?.stats.activeOutbreaksChange || "+3"}
          trend="up"
        />
        <StatCard
          title="Prediction Accuracy"
          value={data?.stats.predictionAccuracy || "92.7%"}
          change={data?.stats.predictionAccuracyChange || "+1.2%"}
          trend="up"
        />
        <StatCard
          title="Risk Index"
          value={data?.stats.riskIndex || "68/100"}
          change={data?.stats.riskIndexChange || "-2.3"}
          trend="down"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="trends">Case Trends</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="regions">Regional Analysis</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Disease Case Trends</CardTitle>
                  <CardDescription>Historical case data with trend analysis</CardDescription>
                </div>
                <Button variant="outline" size="icon">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="h-[400px]">
                <CaseTrendsChart data={data?.caseTrends || []} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Predictive Disease Model</CardTitle>
                  <CardDescription>AI-powered prediction of future disease spread</CardDescription>
                </div>
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500">
                  <Info className="mr-1 h-3 w-3" />
                  Prediction Confidence: 87%
                </Badge>
              </CardHeader>
              <CardContent className="h-[400px]">
                <PredictiveAnalyticsChart data={data?.predictiveData || []} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regions" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Risk by Region</CardTitle>
                <CardDescription>Comparative analysis of risk levels across regions</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <RiskByRegionChart data={data?.regionRisks || []} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Outbreak Prediction Map</CardTitle>
                <CardDescription>Geographical visualization of predicted outbreaks</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <OutbreakPredictionMap riskZones={data?.riskZones || []} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.aiInsights.map((insight, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <CardTitle>{insight.title}</CardTitle>
                  </div>
                  <CardDescription>{insight.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{insight.description}</p>
                  {insight.confidence && (
                    <div className="mt-4">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500">
                        Confidence: {insight.confidence}%
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            )) || (
              <>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      <CardTitle>Emerging Pattern Detected</CardTitle>
                    </div>
                    <CardDescription>June 15, 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Our AI system has detected an emerging pattern in respiratory disease transmission that suggests a
                      potential new outbreak in Southeast Asia within the next 30 days.
                    </p>
                    <div className="mt-4">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500">
                        Confidence: 83%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      <CardTitle>Correlation Analysis</CardTitle>
                    </div>
                    <CardDescription>June 10, 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Strong correlation found between climate change patterns and the spread of vector-borne diseases
                      in previously unaffected regions. Recommend increased surveillance in northern temperate zones.
                    </p>
                    <div className="mt-4">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500">
                        Confidence: 91%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  change?: string
  trend?: "up" | "down"
}

function StatCard({ title, value, change, trend }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="text-2xl font-semibold mt-1">{value}</div>
        {change && <div className={`text-sm mt-1 ${trend === "up" ? "text-green-500" : "text-red-500"}`}>{change}</div>}
      </CardContent>
    </Card>
  )
}

