import type { Metadata } from "next"
import AnalyticsPage from "@/components/analytics-page"

export const metadata: Metadata = {
  title: "PulseGuard - Analytics",
  description: "Advanced analytics and insights for disease outbreak prediction",
}

export default function Analytics() {
  return <AnalyticsPage />
}

