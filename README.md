# PulseGuard: AI-Powered Disease Outbreak Prediction Platform

![PulseGuard Dashboard](frontend/public/screenshot.png)

## 📋 Overview

PulseGuard is an advanced AI-powered disease outbreak prediction and monitoring platform designed to help health organizations, governments, and researchers anticipate, track, and respond to potential disease outbreaks globally. By leveraging artificial intelligence, real-time data scraping, and predictive analytics, PulseGuard provides timely insights and alerts to help mitigate public health risks.

## 🌟 Key Features

### Dashboard & Visualization
- **Global Risk Map**: Interactive map displaying current disease outbreak risk zones worldwide
- **Real-time Metrics**: Live monitoring of active alerts, predicted cases, risk levels, and monitored regions
- **Predictive Visualization**: AI-generated forecasts of potential disease spread patterns
- **Data Charts**: Intuitive charts for case trends and regional risk assessment

### AI Capabilities
- **Outbreak Prediction**: Advanced AI algorithms to predict potential outbreaks before they occur
- **Pattern Recognition**: Identifies patterns in disease spread for early warning
- **Risk Assessment**: AI-generated risk reports with confidence levels and recommendations
- **Data Analysis**: Automated analysis of health data from multiple sources

### Alert System
- **Real-time Alerts**: Immediate notifications of high-risk situations
- **Customizable Filters**: Filter alerts by severity, status, time period, and alert type
- **Alert Management**: Mark alerts as read, delete, or get detailed information

### Analytics
- **Trend Analysis**: Deep insights into disease case trends over time
- **Regional Analysis**: Comparative analysis of risk levels across regions
- **AI Insights**: AI-generated insights with confidence levels
- **Data Export**: Export capabilities for PDF, CSV, and image formats

### Data Integration
- **Multi-source Data**: Integration with WHO, CDC, local health departments, and research institutions
- **Real-time Scraping**: Automated data collection from authoritative health sources
- **Data Pipeline**: Structured workflow for data collection, analysis, and visualization

## Project Structure

This project is organized into two main directories:

- `frontend/`: Contains the Next.js application for the user interface
- `backend/`: Contains the Node.js/Express API server and AI services

## 🔧 Technical Architecture

PulseGuard is built using a modern tech stack with a clear separation between frontend and backend:

### Project Structure
\`\`\`
pulseguard/
├── frontend/             # Frontend application
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/              # Utility functions
│   ├── types/              # TypeScript type definitions
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│   └── tailwind.config.ts # Tailwind CSS configuration
│
├── backend/              # Backend application
│   ├── src/              # Source code
│   │   ├── ai-analysis.ts # AI analysis functions
│   │   ├── ai-service.ts  # AI service using AI SDK
│   │   ├── data-pipeline.ts # Data pipeline orchestration
│   │   ├── data-scraper.ts # Data scraping functions
│   │   ├── scheduler.ts   # Scheduled tasks
│   │   ├── server.ts      # Express server
│   │   └── types/         # TypeScript type definitions
│   ├── package.json      # Backend dependencies
│   └── tsconfig.json     # TypeScript configuration
│
└── README.md             # Project documentation
\`\`\`

### Frontend
- **Next.js**: React framework for building the user interface
- **Tailwind CSS**: For styling and responsive design
- **shadcn/ui**: Component library for UI elements
- **Recharts**: For interactive data visualization

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express**: Web application framework
- **AI SDK**: Integration with AI models for predictive analytics
- **Data Scraping Tools**: For collecting data from various sources

### AI Implementation
- **Predictive Models**: For forecasting disease outbreaks
- **Pattern Recognition**: To identify trends in disease spread
- **Risk Assessment**: To evaluate threat levels across regions
- **Insight Generation**: To provide actionable recommendations

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 📦 Installation & Setup

### Environment Variables

#### Frontend (.env.local)
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_ENABLE_SIMULATIONS=true
NEXT_PUBLIC_ENABLE_EXPORT=true
NEXT_PUBLIC_MAP_PROVIDER=default
\`\`\`

#### Backend (.env)
\`\`\`
PORT=3001
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key_here
WHO_API_KEY=your_who_api_key_here
CDC_API_KEY=your_cdc_api_key_here
DATABASE_URL=your_database_connection_string_here
\`\`\`

### Installation Steps

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/pulseguard.git
   cd pulseguard
   \`\`\`

2. Install frontend dependencies:
   \`\`\`bash
   cd frontend
   npm install
   # or
   yarn install
   \`\`\`

3. Install backend dependencies:
   \`\`\`bash
   cd ../backend
   npm install
   # or
   yarn install
   \`\`\`

4. Start the backend server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. In a new terminal, start the frontend:
   \`\`\`bash
   cd ../frontend
   npm run dev
   # or
   yarn dev
   \`\`\`

6. Open your browser and navigate to `http://localhost:3000`

## 🚀 Usage Guide

### Navigation
- **Dashboard**: Access the main dashboard with global risk map and metrics
- **Home**: Overview of the platform with current outbreak status
- **Alerts**: View and manage all alerts with filtering options
- **Analytics**: Access advanced analytics and AI-driven insights

### Simulating Outbreaks
Use the "Simulate Outbreak" button to test the system's response to a new outbreak scenario. This will generate new alerts and update the risk map and metrics.

### Filtering Data
Use the sidebar filters to narrow down the displayed data by:
- Region
- Disease Type
- Time Range
- Data Sources

### Exporting Data
Click the Export button on any chart or map to export the data as:
- PDF
- CSV
- Image

## 🧠 AI Implementation Details

PulseGuard utilizes advanced AI techniques for disease outbreak prediction:

### Data Collection & Processing
- Automated scraping of health data from WHO, CDC, and local health departments
- Data cleaning and normalization for consistent analysis
- Integration of multiple data sources for comprehensive coverage

### Predictive Analytics
- Time series analysis for forecasting disease spread
- Pattern recognition for identifying potential outbreak triggers
- Confidence scoring for reliability assessment

### Risk Assessment
- Geographic risk mapping based on historical and current data
- Vulnerability analysis of different regions
- Recommendations for preparedness and response

### Scheduled Analysis
- Regular data pipeline execution for up-to-date insights
- Daily risk assessment reports
- Real-time alert generation based on new data

## 🔮 Future Enhancements

Planned improvements for PulseGuard include:

- **User Authentication**: Role-based access control for different user types
- **Mobile App**: Dedicated mobile application for on-the-go alerts
- **Advanced Visualization**: 3D mapping and temporal visualization of disease spread
- **Expanded AI Capabilities**: More sophisticated prediction models and scenarios
- **API Access**: Public API for researchers and developers
- **Multi-language Support**: Internationalization for global usage
- **SMS/Email Alerts**: Direct notifications for critical situations

## 👥 Credits & Acknowledgments

PulseGuard was developed as a prototype for disease outbreak prediction and monitoring. It incorporates design elements and concepts from various public health monitoring systems.

The platform was built with:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [AI SDK](https://sdk.vercel.ai)

---

© 2024 PulseGuard. All rights reserved.

