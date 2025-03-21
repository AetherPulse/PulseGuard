import express from "express"
import cors from "cors"
import { runDataPipeline } from "./data-pipeline"
import { initializeScheduler } from "./scheduler"
import { predictOutbreaks, generateRiskReport } from "./ai-analysis"
import path from "path"
import fs from "fs"

// This file would be used in a real backend environment to create an API server

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Routes

// Get the latest pipeline results
app.get("/api/data", (req, res) => {
  try {
    // In a real implementation, this would fetch from a database
    // For demo purposes, we're reading from a JSON file
    const resultsPath = path.join(__dirname, "pipeline-results.json")

    if (fs.existsSync(resultsPath)) {
      const results = JSON.parse(fs.readFileSync(resultsPath, "utf8"))
      res.json(results)
    } else {
      res.status(404).json({ error: "No data available yet" })
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    res.status(500).json({ error: "Failed to fetch data" })
  }
})

// Manually trigger the data pipeline
app.post("/api/run-pipeline", async (req, res) => {
  try {
    console.log("Manually triggering data pipeline...")
    const results = await runDataPipeline()
    res.json({ success: true, message: "Pipeline executed successfully", timestamp: new Date().toISOString() })
  } catch (error) {
    console.error("Error running pipeline:", error)
    res.status(500).json({ error: "Failed to run pipeline" })
  }
})

// Get predictions for a specific region
app.get("/api/predictions/:region", async (req, res) => {
  try {
    const { region } = req.params
    console.log(`Fetching predictions for region: ${region}`)

    // In a real implementation, this would fetch from a database
    // For demo purposes, we're generating mock predictions

    const mockHistoricalData = {
      region,
      outbreaks: [
        { disease: "Respiratory Infection", cases: 1245, date: "2024-05-15" },
        { disease: "Vector-borne Disease", cases: 567, date: "2024-05-20" },
      ],
    }

    const predictions = await predictOutbreaks(mockHistoricalData)

    // Filter predictions for the requested region
    const filteredPredictions = predictions.filter((p) => p.region.toLowerCase() === region.toLowerCase())

    res.json(filteredPredictions)
  } catch (error) {
    console.error(`Error fetching predictions for ${req.params.region}:`, error)
    res.status(500).json({ error: "Failed to fetch predictions" })
  }
})

// Get risk assessment for a specific region
app.get("/api/risk/:region", async (req, res) => {
  try {
    const { region } = req.params
    console.log(`Fetching risk assessment for region: ${region}`)

    // In a real implementation, this would fetch from a database
    // For demo purposes, we're generating a mock risk report

    const mockData = {
      region,
      outbreaks: [
        { disease: "Respiratory Infection", cases: 1245, date: "2024-05-15" },
        { disease: "Vector-borne Disease", cases: 567, date: "2024-05-20" },
      ],
    }

    const riskReport = await generateRiskReport(mockData)

    // Filter the report for the requested region
    const filteredReport = {
      ...riskReport,
      regionalRiskAssessments: riskReport.regionalRiskAssessments.filter(
        (r) => r.region.toLowerCase() === region.toLowerCase(),
      ),
    }

    res.json(filteredReport)
  } catch (error) {
    console.error(`Error fetching risk assessment for ${req.params.region}:`, error)
    res.status(500).json({ error: "Failed to fetch risk assessment" })
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)

  // Initialize the scheduler
  initializeScheduler()

  // Run the pipeline once at startup
  console.log("Running initial data pipeline...")
  runDataPipeline()
    .then(() => {
      console.log("Initial data pipeline completed successfully")
    })
    .catch((error) => {
      console.error("Initial data pipeline failed:", error)
    })
})

