"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, Home, Search, Settings, WormIcon as Virus, AlertTriangle, LineChart, Database } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function AppSidebar() {
  const pathname = usePathname()
  const { state: sidebarState } = useSidebar()
  const [searchQuery, setSearchQuery] = useState("")
  const [region, setRegion] = useState("global")
  const [diseaseType, setDiseaseType] = useState("all")
  const [timeRange, setTimeRange] = useState("7d")

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center px-2 py-2">
          <Search className="mr-2 h-4 w-4 text-primary" />
          <Input
            placeholder="Search..."
            className="h-8 bg-secondary/50 border-primary/30 focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="sidebar-content">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary/80">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/home")}>
                  <Link href="/home">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/") && !isActive("/home") && !isActive("/alerts") && !isActive("/analytics")}
                >
                  <Link href="/">
                    <BarChart3 className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/alerts")}>
                  <Link href="/alerts">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Alerts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/analytics")}>
                  <Link href="/analytics">
                    <LineChart className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-primary/80">Data Filters</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-4 px-2">
              <div className="space-y-2">
                <Label htmlFor="region" className="text-foreground/80">
                  Region
                </Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger id="region" className="bg-secondary/50 border-primary/30 focus:ring-primary">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-primary/30">
                    <SelectItem value="global">Global</SelectItem>
                    <SelectItem value="north-america">North America</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                    <SelectItem value="africa">Africa</SelectItem>
                    <SelectItem value="south-america">South America</SelectItem>
                    <SelectItem value="oceania">Oceania</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="disease-type" className="text-foreground/80">
                  Disease Type
                </Label>
                <Select value={diseaseType} onValueChange={setDiseaseType}>
                  <SelectTrigger id="disease-type" className="bg-secondary/50 border-primary/30 focus:ring-primary">
                    <SelectValue placeholder="Select disease type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-primary/30">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="respiratory">Respiratory</SelectItem>
                    <SelectItem value="vector-borne">Vector-borne</SelectItem>
                    <SelectItem value="zoonotic">Zoonotic</SelectItem>
                    <SelectItem value="water-borne">Water-borne</SelectItem>
                    <SelectItem value="food-borne">Food-borne</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time-range" className="text-foreground/80">
                  Time Range
                </Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger id="time-range" className="bg-secondary/50 border-primary/30 focus:ring-primary">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-primary/30">
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 90 Days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-primary/80">Data Sources</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-3 px-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="who"
                  defaultChecked
                  className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <Label htmlFor="who" className="text-sm">
                  WHO Database
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cdc"
                  defaultChecked
                  className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <Label htmlFor="cdc" className="text-sm">
                  CDC Reports
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="local"
                  defaultChecked
                  className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <Label htmlFor="local" className="text-sm">
                  Local Health Departments
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="research"
                  defaultChecked
                  className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <Label htmlFor="research" className="text-sm">
                  Research Institutions
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="news"
                  className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <Label htmlFor="news" className="text-sm">
                  News Sources
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="social"
                  className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <Label htmlFor="social" className="text-sm">
                  Social Media Analysis
                </Label>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-primary/80">AI Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <Database className="h-4 w-4" />
                    <span>Data Analysis</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <Virus className="h-4 w-4" />
                    <span>Outbreak Prediction</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

