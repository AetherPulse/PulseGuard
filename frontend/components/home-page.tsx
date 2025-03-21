"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, BarChart3, Globe, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fetchHomePageData } from "@/lib/api"
import type { HomePageData } from "@/types/dashboard"

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<HomePageData | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const homeData = await fetchHomePageData()
        setData(homeData)
      } catch (error) {
        console.error("Failed to fetch home page data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Welcome to PulseGuard</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI-powered disease outbreak prediction and monitoring platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Globe className="h-10 w-10 text-blue-500" />}
            title="Global Monitoring"
            description="Real-time monitoring of disease outbreaks across the globe with advanced AI analysis."
          />
          <FeatureCard
            icon={<BarChart3 className="h-10 w-10 text-green-500" />}
            title="Predictive Analytics"
            description="AI-driven predictive models to forecast potential outbreaks before they occur."
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-red-500" />}
            title="Early Warning System"
            description="Get alerts and notifications about emerging threats in your region of interest."
          />
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Current Outbreak Status</h2>
          <Button variant="outline" asChild>
            <Link href="/">
              View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.outbreakStatus.map((item, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item.disease}</CardTitle>
                <CardDescription>{item.region}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Cases</p>
                    <p className="text-2xl font-semibold">{item.cases}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      item.riskLevel === "High"
                        ? "bg-red-100 text-red-800"
                        : item.riskLevel === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.riskLevel} Risk
                  </div>
                </div>
              </CardContent>
            </Card>
          )) || (
            <>
              <OutbreakStatusCard disease="COVID-19" region="Global" cases="12,345" riskLevel="Medium" />
              <OutbreakStatusCard disease="Influenza" region="North America" cases="8,721" riskLevel="Medium" />
              <OutbreakStatusCard disease="Dengue Fever" region="Southeast Asia" cases="4,532" riskLevel="High" />
              <OutbreakStatusCard disease="Ebola" region="Central Africa" cases="127" riskLevel="Low" />
            </>
          )}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Insights</h2>
          <Button variant="outline" asChild>
            <Link href="/analytics">
              View Analytics <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.recentInsights.map((insight, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{insight.title}</CardTitle>
                <CardDescription>{insight.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{insight.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <Link href={insight.link}>
                    Read More <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )) || (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>AI Detects New Pattern in Respiratory Diseases</CardTitle>
                  <CardDescription>June 15, 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our AI system has identified a new pattern in respiratory disease spread that could help predict
                    future outbreaks with greater accuracy.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    Read More <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Climate Change Impact on Vector-borne Diseases</CardTitle>
                  <CardDescription>June 10, 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Analysis shows a strong correlation between climate change and the spread of vector-borne diseases
                    in previously unaffected regions.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    Read More <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

interface OutbreakStatusCardProps {
  disease: string
  region: string
  cases: string
  riskLevel: "High" | "Medium" | "Low"
}

function OutbreakStatusCard({ disease, region, cases, riskLevel }: OutbreakStatusCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{disease}</CardTitle>
        <CardDescription>{region}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Cases</p>
            <p className="text-2xl font-semibold">{cases}</p>
          </div>
          <div
            className={`px-2 py-1 rounded text-xs font-medium ${
              riskLevel === "High"
                ? "bg-red-100 text-red-800"
                : riskLevel === "Medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
            }`}
          >
            {riskLevel} Risk
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

