import type { Metadata } from "next"
import AlertsPage from "@/components/alerts-page"

export const metadata: Metadata = {
  title: "PulseGuard - Alerts",
  description: "Real-time disease outbreak alerts and notifications",
}

export default function Alerts() {
  return <AlertsPage />
}

