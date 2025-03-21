"use client"

import type React from "react"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Bell, Settings, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import { useToast } from "@/hooks/use-toast"
import { useSidebar } from "@/components/ui/sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const { state: sidebarState } = useSidebar()
  const [simulationActive, setSimulationActive] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)

  const handleSimulateOutbreak = () => {
    setSimulationActive(true)

    toast({
      title: "Simulation Started",
      description: "Outbreak simulation is now running...",
      variant: "destructive",
    })

    // In a real app, this would trigger the simulation logic
    setTimeout(() => {
      setSimulationActive(false)
      setNotificationCount((prev) => prev + 1)

      toast({
        title: "Simulation Complete",
        description: "New outbreak data has been generated and analyzed.",
      })
    }, 3000)
  }

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <SidebarTrigger className="text-primary hover:bg-primary/20" />
            <Link href="/" className="text-xl font-bold text-primary glow-text">
              PulseGuard
            </Link>

            <nav className="hidden md:flex items-center space-x-4">
              <Link
                href="/home"
                className={`text-sm font-medium transition-colors ${isActive("/home") ? "text-primary glow-text" : "text-muted-foreground hover:text-primary"}`}
              >
                Home
              </Link>
              <Link
                href="/"
                className={`text-sm font-medium transition-colors ${isActive("/") && !isActive("/home") && !isActive("/alerts") && !isActive("/analytics") ? "text-primary glow-text" : "text-muted-foreground hover:text-primary"}`}
              >
                Dashboard
              </Link>
              <Link
                href="/alerts"
                className={`text-sm font-medium transition-colors ${isActive("/alerts") ? "text-primary glow-text" : "text-muted-foreground hover:text-primary"}`}
              >
                Alerts
              </Link>
              <Link
                href="/analytics"
                className={`text-sm font-medium transition-colors ${isActive("/analytics") ? "text-primary glow-text" : "text-muted-foreground hover:text-primary"}`}
              >
                Analytics
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="destructive"
              onClick={handleSimulateOutbreak}
              disabled={simulationActive}
              className="hidden sm:flex btn-futuristic"
            >
              <TriangleAlert className="mr-2 h-4 w-4" />
              {simulationActive ? "Simulating..." : "Simulate Outbreak"}
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/alerts")}
                className="text-primary hover:bg-primary/20"
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </div>

            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/20">
              <Settings className="h-5 w-5" />
            </Button>

            <Avatar className="border border-primary/30">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback className="bg-secondary text-primary">MD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <AppSidebar />

        <main
          className={`flex-1 overflow-x-hidden transition-all duration-300 ${sidebarState === "expanded" ? "md:ml-64" : "md:ml-12"}`}
        >
          {children}
        </main>
      </div>

      <footer className="border-t border-border/40 py-4 bg-background/80 backdrop-blur">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start">
            <p className="text-sm text-muted-foreground">© 2024 PulseGuard. All rights reserved.</p>
            <p className="text-sm font-semibold text-primary mt-1 glow-text">DEVELOPED BY TEAM AETHERPULSE</p>
          </div>
          <div className="flex items-center space-x-6">
            <img src="data:image/png;base64,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" alt="WHO" className="h-6" />
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAaVBMVEX///8AYKkAW6cAWaYAXKcAXqgAVqUAUaMAVKQAT6KBn8gATKF+nMaEosqlutff5vC2xt309/qSq84ASJ9xlMKftdRojr9gibxLfLaMp8w6crEfZaswba9Xg7nn7PS9yt/O2OgAP5zV4O25RMKHAAAEDklEQVRIiX1W63qkKhAUGhpEcBwGxQuO7rz/Q55unCS7m+zhR5JPi6KqumnTNN/W8xgXN47jcfv+7u817F1qQVpnAI2Ow/9h76NBhUEKvXklBCwW7XL/F3rZNy30vCuhvNBCrEkJDSb+CL5txoEQMqAQuEgmp79otf4HE0OnpWMQaVF5JvJC5LT0PD2+WRirBFK9ZkVb4IscIoruL0EsW+3EKQmpmVevUyWHQIZE+wd+eAQrpNeXFhm+lJMU3gX78ZvLTpKOKr1Mqm7Rc1YfUoRQc3o8P+GbZjhWYhBqKp/k4FiK3hZU5QN9YmWuxPSbjb7JSQqdKHDkcMd3LRPlkJRKomqpHvEixyoFFy6aMFd9nQeOjw+QVHuuUy3tRyoyzdWGudLvvFTTZh+pQ+sArDfYhpYQek2SbU7GtMaYNNcQjZeY0vGkznWTHc9jGI4z7i1UKdRtYnzd768jdRxmRt9mknXE/t4oQ/3xPO/VkmcpuJCGVwy35jQTPTaQHEdPGrqnYPi4rjWGoSV0oLxdZ6Z1PhAJZyy/0uCl3pI2L4IH0IYomknKTNuPDtIu1abNszmwYyJLRVJ0OnIdVhLBVXx2M/fKioQmFwKPZkQ2nICjDCATsR+W3pWTgZ6E339VNAfbN4utBOCVFl6BJ3hfL0jmQ3+R6TO/0cL0javpb1R9lTaVywUHv+302Bv68ZzhQkMY3/BCcEk1Co8bw6lA+Ak/TQWrLarQLPXqztSS1AUltRVOBZKJa9KRmFtbqfeAEJvR8vNlKjJt0ikOsjccUU+PoWXDDMeUka0eJhHDK2HVIjvKry/UK8x7dHms8dMtWckuBXnrEtc2WnCYNsgEHxer6uXXeXrQac9HiVJrFFSmpvUdnzvvW+fjzEG+WswvTnef6KIQ5EwPbEtvuYa7xzTRyfeBdJ72cwQditFCI59zDvQc2eWQ0Jsp97fzNhZvfTiWZewn6DKjhZbLuhzneXis0+xOENqwl863nAgZsIuRkPlOClWiUoDWdFOw9VTKzToM1m8qSL5BGGk87RUN2ddLK0tc37P1TpNiooG+IJNHBL9quNDo9noEuITavkf3UdK2z/NO00v6IvcsL26tYuErC/uyyc/BQQ3mbWiDcXyZoTi40HKNlVovO2rxNZaaW7JOehpH3CvRXui3bEwBeG60X0OvGcpMZhVJsfFSom3YrxPW2r7dbyOVyvArUM+syfgCM6NF3NTbYv2CjM0fa9icwmhyxpk0yHWBD4vste2bv9YwWV9WbxmNU0KhRLVIgkT64et3myeIhtAaA103TA5qisWH53c0N3FgtCLZ8m1Rw+ry+COY6xupU+eIb4uKfOR/f4Z5Hcv0MHPQCNDO7v8/8td6nucSQux/+g/iP3QqRfO6CtRnAAAAAElFTkSuQmCC" alt="CDC" className="h-6" />
          </div>
        </div>
      </footer>
    </div>
  )
}

