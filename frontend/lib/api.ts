import type { DashboardData, HomePageData, Alert, AnalyticsData } from "@/types/dashboard"
import { generateAIPredictions } from "@/lib/ai-service"

// Simulated API calls with mock data
export async function fetchDashboardData(): Promise<DashboardData> {
  // In a real app, this would be an API call to your backend
  await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

  // Generate AI predictions for the dashboard
  const predictions = await generateAIPredictions()

  return {
    metrics: {
      activeAlerts: {
        value: "247",
        change: "+12%",
      },
      predictedCases: {
        value: "3,428",
        change: "+23%",
      },
      riskLevel: {
        value: "High",
        subtext: "Level 4",
      },
      monitoredRegions: {
        value: "182",
        change: "+5",
      },
    },
    riskZones: [
      { id: "1", name: "Southeast Asia", level: "high", cases: 1245, lat: 12.8797, lng: 121.774 },
      { id: "2", name: "Central Africa", level: "medium", cases: 567, lat: 6.6111, lng: 20.9394 },
      { id: "3", name: "Northern Europe", level: "low", cases: 89, lat: 61.9241, lng: 25.7482 },
      { id: "4", name: "South America", level: "medium", cases: 432, lat: -8.7832, lng: -55.4915 },
      { id: "5", name: "Middle East", level: "high", cases: 876, lat: 29.2985, lng: 42.551 },
    ],
    caseTrends: [
      { day: "Mon", cases: 820 },
      { day: "Tue", cases: 932 },
      { day: "Wed", cases: 901 },
      { day: "Thu", cases: 934 },
      { day: "Fri", cases: 1290 },
      { day: "Sat", cases: 1330 },
      { day: "Sun", cases: 1520 },
    ],
    regionRisks: [
      { region: "Asia", cases: 120 },
      { region: "Europe", cases: 200 },
      { region: "N.America", cases: 150 },
      { region: "S.America", cases: 80 },
      { region: "Africa", cases: 70 },
    ],
    predictiveData: predictions,
    recentAlerts: [
      {
        type: "high-risk",
        title: "High Risk Alert",
        description: "New outbreak predicted in Southeast Asia",
        time: "2 minutes ago",
      },
      {
        type: "trend",
        title: "Trend Update",
        description: "Case numbers stabilizing in Europe",
        time: "15 minutes ago",
      },
      {
        type: "data",
        title: "Data Update",
        description: "New CDC data integrated into predictions",
        time: "1 hour ago",
      },
    ],
  }
}

export async function fetchHomePageData(): Promise<HomePageData> {
  // In a real app, this would be an API call to your backend
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

  return {
    outbreakStatus: [
      {
        disease: "COVID-19",
        region: "Global",
        cases: "12,345",
        riskLevel: "Medium",
      },
      {
        disease: "Influenza",
        region: "North America",
        cases: "8,721",
        riskLevel: "Medium",
      },
      {
        disease: "Dengue Fever",
        region: "Southeast Asia",
        cases: "4,532",
        riskLevel: "High",
      },
      {
        disease: "Ebola",
        region: "Central Africa",
        cases: "127",
        riskLevel: "Low",
      },
    ],
    recentInsights: [
      {
        title: "AI Detects New Pattern in Respiratory Diseases",
        date: "June 15, 2024",
        description:
          "Our AI system has identified a new pattern in respiratory disease spread that could help predict future outbreaks with greater accuracy.",
        link: "#",
      },
      {
        title: "Climate Change Impact on Vector-borne Diseases",
        date: "June 10, 2024",
        description:
          "Analysis shows a strong correlation between climate change and the spread of vector-borne diseases in previously unaffected regions.",
        link: "#",
      },
    ],
  }
}

export async function fetchAlerts(): Promise<Alert[]> {
  // In a real app, this would be an API call to your backend
  await new Promise((resolve) => setTimeout(resolve, 1200)) // Simulate network delay

  return [
    {
      id: "1",
      title: "High Risk Outbreak Alert",
      description:
        "AI model predicts potential outbreak of respiratory disease in Southeast Asia within the next 14 days.",
      severity: "high",
      status: "unread",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      location: "Southeast Asia",
      type: "prediction",
    },
    {
      id: "2",
      title: "Case Numbers Stabilizing",
      description: "Trend analysis shows case numbers stabilizing in Europe after three weeks of increases.",
      severity: "medium",
      status: "unread",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      location: "Europe",
      type: "trend",
    },
    {
      id: "3",
      title: "New CDC Data Integrated",
      description: "Latest CDC data has been integrated into the prediction models, improving accuracy by 3.2%.",
      severity: "low",
      status: "read",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
      type: "data",
    },
    {
      id: "4",
      title: "Unusual Pattern Detected",
      description: "AI analysis has detected an unusual pattern in water-borne disease reports from South America.",
      severity: "medium",
      status: "read",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      location: "South America",
      type: "prediction",
    },
    {
      id: "5",
      title: "Risk Level Increased",
      description: "Global risk level has been increased to Level 4 (High) based on recent outbreak data.",
      severity: "high",
      status: "read",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
      type: "system",
    },
  ]
}

export async function fetchAnalyticsData(
  region = "global",
  timeRange = "30d",
  diseaseType = "all",
): Promise<AnalyticsData> {
  // In a real app, this would be an API call to your backend with query parameters
  await new Promise((resolve) => setTimeout(resolve, 1800)) // Simulate network delay

  // Generate AI predictions for analytics
  const predictions = await generateAIPredictions()

  return {
    stats: {
      totalCases: "124,567",
      totalCasesChange: "+12.5%",
      activeOutbreaks: "37",
      activeOutbreaksChange: "+3",
      predictionAccuracy: "92.7%",
      predictionAccuracyChange: "+1.2%",
      riskIndex: "68/100",
      riskIndexChange: "-2.3",
    },
    caseTrends: [
      { day: "Week 1", cases: 820 },
      { day: "Week 2", cases: 932 },
      { day: "Week 3", cases: 901 },
      { day: "Week 4", cases: 934 },
      { day: "Week 5", cases: 1290 },
      { day: "Week 6", cases: 1330 },
      { day: "Week 7", cases: 1520 },
    ],
    regionRisks: [
      { region: "Asia", cases: 120 },
      { region: "Europe", cases: 200 },
      { region: "N.America", cases: 150 },
      { region: "S.America", cases: 80 },
      { region: "Africa", cases: 70 },
    ],
    predictiveData: predictions,
    riskZones: [
      { id: "1", name: "Southeast Asia", level: "high", cases: 1245, lat: 12.8797, lng: 121.774 },
      { id: "2", name: "Central Africa", level: "medium", cases: 567, lat: 6.6111, lng: 20.9394 },
      { id: "3", name: "Northern Europe", level: "low", cases: 89, lat: 61.9241, lng: 25.7482 },
      { id: "4", name: "South America", level: "medium", cases: 432, lat: -8.7832, lng: -55.4915 },
      { id: "5", name: "Middle East", level: "high", cases: 876, lat: 29.2985, lng: 42.551 },
    ],
    aiInsights: [
      {
        title: "Emerging Pattern Detected",
        date: "June 15, 2024",
        description:
          "Our AI system has detected an emerging pattern in respiratory disease transmission that suggests a potential new outbreak in Southeast Asia within the next 30 days.",
        confidence: 83,
      },
      {
        title: "Correlation Analysis",
        date: "June 10, 2024",
        description:
          "Strong correlation found between climate change patterns and the spread of vector-borne diseases in previously unaffected regions. Recommend increased surveillance in northern temperate zones.",
        confidence: 91,
      },
    ],
  }
}

