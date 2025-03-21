"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import type { RiskZone } from "@/types/dashboard"

interface GlobalRiskMapProps {
  riskZones?: RiskZone[]
}

export default function GlobalRiskMap({ riskZones = [] }: GlobalRiskMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)

  const defaultRiskZones: RiskZone[] = [
    { id: "1", name: "Southeast Asia", level: "high", cases: 1245, lat: 12.8797, lng: 121.774 },
    { id: "2", name: "Central Africa", level: "medium", cases: 567, lat: 6.6111, lng: 20.9394 },
    { id: "3", name: "Northern Europe", level: "low", cases: 89, lat: 61.9241, lng: 25.7482 },
    { id: "4", name: "South America", level: "medium", cases: 432, lat: -8.7832, lng: -55.4915 },
    { id: "5", name: "Middle East", level: "high", cases: 876, lat: 29.2985, lng: 42.551 },
  ]

  const displayedRiskZones = riskZones.length > 0 ? riskZones : defaultRiskZones

  useEffect(() => {
    // Simulate loading the map
    const timer = setTimeout(() => {
      setLoading(false)
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-md">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading map data...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="absolute inset-0 bg-muted/10" ref={mapRef}>
            <img
              src="/world-map.png"
              alt="Global Risk Map"
              className="h-full w-full object-cover"
              onLoad={() => setMapLoaded(true)}
              onError={() => {
                console.error("Failed to load map image")
                setMapLoaded(true) // Still mark as loaded to show fallback
              }}
            />

            {mapLoaded &&
              displayedRiskZones.map((zone) => (
                <div
                  key={zone.id}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: `${((zone.lng + 180) / 360) * 100}%`,
                    top: `${((90 - zone.lat) / 180) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className={`
                    h-4 w-4 rounded-full animate-pulse
                    ${zone.level === "high" ? "bg-red-500" : zone.level === "medium" ? "bg-yellow-500" : "bg-green-500"}
                  `}
                  />
                  <Badge
                    variant="outline"
                    className={`
                    mt-1 text-xs
                    ${
                      zone.level === "high"
                        ? "border-red-500 bg-red-500/10 text-red-500"
                        : zone.level === "medium"
                          ? "border-yellow-500 bg-yellow-500/10 text-yellow-500"
                          : "border-green-500 bg-green-500/10 text-green-500"
                    }
                  `}
                  >
                    {zone.name}
                  </Badge>
                </div>
              ))}
          </div>

          <div className="absolute bottom-4 left-4 z-10 flex flex-col space-y-2">
            <div className="rounded-md bg-background/80 p-2 backdrop-blur-sm">
              <div className="text-xs font-medium mb-1">Risk Levels</div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
                  <span className="text-xs">High</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></div>
                  <span className="text-xs">Medium</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
                  <span className="text-xs">Low</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

