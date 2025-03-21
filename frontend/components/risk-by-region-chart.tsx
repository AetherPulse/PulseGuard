"use client"
import { Bar, Chart, ChartContainer, ChartTooltip, ChartTooltipContent, XAxis, YAxis } from "@/components/ui/chart"
import type { RegionRisk } from "@/types/dashboard"

interface RiskByRegionChartProps {
  data?: RegionRisk[]
}

export default function RiskByRegionChart({ data }: RiskByRegionChartProps) {
  const defaultData: RegionRisk[] = [
    { region: "Asia", cases: 120 },
    { region: "Europe", cases: 200 },
    { region: "N.America", cases: 150 },
    { region: "S.America", cases: 80 },
    { region: "Africa", cases: 70 },
  ]

  const chartData = data && data.length > 0 ? data : defaultData

  return (
    <div className="h-[300px] w-full">
      <ChartContainer className="h-full w-full" data={chartData} xAxisKey="region" yAxisKey="cases">
        <Chart>
          <XAxis />
          <YAxis />
          <Bar dataKey="cases" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
          <ChartTooltip>
            <ChartTooltipContent
              className="border-primary"
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="p-2">
                      <p className="text-sm font-medium">{payload[0].payload.region}</p>
                      <p className="text-sm text-muted-foreground">
                        Cases: <span className="font-medium text-primary">{payload[0].value}</span>
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
          </ChartTooltip>
        </Chart>
      </ChartContainer>
    </div>
  )
}

