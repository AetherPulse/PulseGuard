import type { Metadata } from "next"
import Dashboard from "@/components/dashboard"

export const metadata: Metadata = {
  title: "PulseGuard - Disease Outbreak Prediction Platform",
  description: "AI-powered disease outbreak prediction and monitoring dashboard",
}

export default function Home() {
  return <Dashboard />
}

