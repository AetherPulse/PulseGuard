export interface DashboardData {
  metrics: {
    activeAlerts: {
      value: string
      change: string
    }
    predictedCases: {
      value: string
      change: string
    }
    riskLevel: {
      value: string
      subtext: string
    }
    monitoredRegions: {
      value: string
      change: string
    }
  }
  riskZones: RiskZone[]
  caseTrends: CaseTrend[]
  regionRisks: RegionRisk[]
  predictiveData: PredictiveData[]
  recentAlerts: {
    type: "high-risk" | "trend" | "data" | "simulation"
    title: string
    description: string
    time: string
  }[]
}

export interface RiskZone {
  id: string
  name: string
  level: "high" | "medium" | "low"
  cases: number
  lat: number
  lng: number
}

export interface CaseTrend {
  day: string
  cases: number
}

export interface RegionRisk {
  region: string
  cases: number
}

export interface PredictiveData {
  date: string
  actual: number | null
  predicted: number
  confidence: number
}

export interface HomePageData {
  outbreakStatus: {
    disease: string
    region: string
    cases: string
    riskLevel: "High" | "Medium" | "Low"
  }[]
  recentInsights: {
    title: string
    date: string
    description: string
    link: string
  }[]
}

export interface Alert {
  id: string
  title: string
  description: string
  severity: "high" | "medium" | "low"
  status: "read" | "unread"
  timestamp: string
  location?: string
  type: string
}

export interface AnalyticsData {
  stats: {
    totalCases: string
    totalCasesChange: string
    activeOutbreaks: string
    activeOutbreaksChange: string
    predictionAccuracy: string
    predictionAccuracyChange: string
    riskIndex: string
    riskIndexChange: string
  }
  caseTrends: CaseTrend[]
  regionRisks: RegionRisk[]
  predictiveData: PredictiveData[]
  riskZones: RiskZone[]
  aiInsights: {
    title: string
    date: string
    description: string
    confidence?: number
  }[]
}

