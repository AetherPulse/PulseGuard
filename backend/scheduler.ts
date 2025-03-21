import { runDataPipeline } from "./data-pipeline"
import { CronJob } from "cron"

// This file would be used in a real backend environment to schedule the data pipeline

/**
 * Initializes the scheduler for the data pipeline
 */
export function initializeScheduler() {
  console.log("Initializing data pipeline scheduler...")

  // Schedule the data pipeline to run every 6 hours
  const dataPipelineJob = new CronJob(
    "0 */6 * * *", // Cron expression: At minute 0 past every 6th hour
    async () => {
      console.log(`Running scheduled data pipeline at ${new Date().toISOString()}`)
      try {
        await runDataPipeline()
        console.log("Scheduled data pipeline completed successfully")
      } catch (error) {
        console.error("Scheduled data pipeline failed:", error)
      }
    },
    null, // onComplete
    false, // start
    "UTC", // timezone
  )

  // Start the job
  dataPipelineJob.start()
  console.log("Data pipeline scheduler started")

  // Also schedule a daily risk assessment report
  const riskReportJob = new CronJob(
    "0 0 * * *", // Cron expression: At 00:00 (midnight) every day
    async () => {
      console.log(`Generating daily risk assessment report at ${new Date().toISOString()}`)
      try {
        // In a real implementation, this would generate and distribute a daily report
        console.log("Daily risk assessment report generated successfully")
      } catch (error) {
        console.error("Daily risk assessment report generation failed:", error)
      }
    },
    null, // onComplete
    false, // start
    "UTC", // timezone
  )

  // Start the job
  riskReportJob.start()
  console.log("Risk assessment report scheduler started")

  return {
    dataPipelineJob,
    riskReportJob,
  }
}

// If this file is run directly, initialize the scheduler
if (require.main === module) {
  const jobs = initializeScheduler()

  // Keep the process running
  console.log("Scheduler running. Press Ctrl+C to exit.")

  // Handle graceful shutdown
  process.on("SIGINT", () => {
    console.log("Stopping schedulers...")
    jobs.dataPipelineJob.stop()
    jobs.riskReportJob.stop()
    console.log("Schedulers stopped")
    process.exit(0)
  })
}

