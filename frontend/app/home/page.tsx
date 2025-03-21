import type { Metadata } from "next"
import HomePage from "@/components/home-page"

export const metadata: Metadata = {
  title: "PulseGuard - Home",
  description: "AI-powered disease outbreak prediction and monitoring platform",
}

export default function Home() {
  return <HomePage />
}

