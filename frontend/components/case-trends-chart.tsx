"use client"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Line,
  LinearGradient,
  LinearGradientStop,
  XAxis,
  YAxis,
} from "@/components/ui/chart"
import type { CaseTrend } from "@/types/dashboard"

interface CaseTrendsChartProps {
  data?: CaseTrend[]
}

export default function CaseTrendsChart({ data }: CaseTrendsChartProps) {
  const defaultData: CaseTrend[] = [
    { day: "Mon", cases: 820 },
    { day: "Tue", cases: 932 },
    { day: "Wed", cases: 901 },
    { day: "Thu", cases: 934 },
    { day: "Fri", cases: 1290 },
    { day: "Sat", cases: 1330 },
    { day: "Sun", cases: 1520 },
  ]

  const chartData = data && data.length > 0 ? data : defaultData

  return (
    <div className="h-[300px] w-full">
      <ChartContainer className="h-full w-full" data={chartData} xAxisKey="day" yAxisKey="cases">
        <Chart>
          <XAxis />
          <YAxis />
          <Line dataKey="cases" stroke="#0ea5e9" strokeWidth={2} activeDot={{ r: 6, fill: "#0ea5e9" }}>
            <LinearGradient id="gradient" gradientUnits="userSpaceOnUse">
              <LinearGradientStop offset="0%" stopColor="#0ea5e9" stopOpacity={0.3} />
              <LinearGradientStop offset="100%" stopColor="#0ea5e9" stopOpacity={0.05} />
            </LinearGradient>
          </Line>
          <ChartTooltip>
            <ChartTooltipContent
              className="border-primary"
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="p-2">
                      <p className="text-sm font-medium">{payload[0].payload.day}</p>
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

