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
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Info } from "lucide-react"
import type { PredictiveData } from "@/types/dashboard"

interface PredictiveAnalyticsChartProps {
  data?: PredictiveData[]
}

export default function PredictiveAnalyticsChart({ data }: PredictiveAnalyticsChartProps) {
  const defaultData: PredictiveData[] = [
    { date: "Jan", actual: 1000, predicted: 1050, confidence: 0.9 },
    { date: "Feb", actual: 1200, predicted: 1250, confidence: 0.9 },
    { date: "Mar", actual: 1100, predicted: 1150, confidence: 0.85 },
    { date: "Apr", actual: 1300, predicted: 1350, confidence: 0.85 },
    { date: "May", actual: 1700, predicted: 1750, confidence: 0.8 },
    { date: "Jun", actual: 1900, predicted: 1950, confidence: 0.8 },
    { date: "Jul", actual: null, predicted: 2200, confidence: 0.75 },
    { date: "Aug", actual: null, predicted: 2500, confidence: 0.7 },
    { date: "Sep", actual: null, predicted: 2800, confidence: 0.65 },
  ]

  const chartData = data && data.length > 0 ? data : defaultData

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Predictive Disease Spread Model</h3>
          <p className="text-sm text-muted-foreground">Showing actual data and AI-predicted future trends</p>
        </div>
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500">
          <AlertCircle className="mr-1 h-3 w-3" />
          Prediction Confidence: 75%
        </Badge>
      </div>

      <div className="h-[400px] w-full">
        <ChartContainer className="h-full w-full" data={chartData} xAxisKey="date" yAxisKey="cases">
          <Chart>
            <XAxis />
            <YAxis />
            <Line
              dataKey="actual"
              stroke="#0ea5e9"
              strokeWidth={2}
              name="Actual Cases"
              activeDot={{ r: 6, fill: "#0ea5e9" }}
            />
            <Line
              dataKey="predicted"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Predicted Cases"
              activeDot={{ r: 6, fill: "#f59e0b" }}
            >
              <LinearGradient id="predictedGradient" gradientUnits="userSpaceOnUse">
                <LinearGradientStop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                <LinearGradientStop offset="100%" stopColor="#f59e0b" stopOpacity={0.05} />
              </LinearGradient>
            </Line>
            <ChartTooltip>
              <ChartTooltipContent
                className="border-primary"
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="p-2">
                        <p className="text-sm font-medium">{data.date}</p>
                        {data.actual !== null && (
                          <p className="text-sm text-muted-foreground">
                            Actual: <span className="font-medium text-blue-500">{data.actual}</span>
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          Predicted: <span className="font-medium text-yellow-500">{data.predicted}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Confidence: <span className="font-medium">{Math.round(data.confidence * 100)}%</span>
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

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
            <span>Actual Data</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></div>
            <span>Predicted Trend</span>
          </div>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Info className="mr-1 h-4 w-4" />
          <span>Prediction based on historical data and current trends</span>
        </div>
      </div>
    </div>
  )
}

