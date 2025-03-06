"use client"

import { useState, useEffect } from "react"
import { X, ZoomIn, ZoomOut, Locate, Navigation, Clock, MapPin, Bus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function LiveTrackingMap({
  routeNumber,
  routeName,
  isOpen,
  onClose,
}: {
  routeNumber: string
  routeName: string
  isOpen: boolean
  onClose: () => void
}) {
  const [zoom, setZoom] = useState(15)
  const [busLocation, setBusLocation] = useState({ lat: 40.7128, lng: -74.006 })
  const [nextStop, setNextStop] = useState("Market Square")
  const [eta, setEta] = useState("3 min")
  const [progress, setProgress] = useState(65)

  // Simulate bus movement
  useEffect(() => {
    if (!isOpen) return

    const interval = setInterval(() => {
      setBusLocation((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }))

      // Randomly update ETA occasionally
      if (Math.random() > 0.7) {
        const newEta = Math.max(1, Number.parseInt(eta.split(" ")[0]) - 1)
        setEta(`${newEta} min`)
        setProgress((prev) => Math.min(100, prev + 5))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isOpen, eta])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="font-bold">{routeNumber}</span>
            </div>
            <h1 className="font-semibold">Live Tracking: {routeName}</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>

      <div className="relative flex-1 bg-muted">
        {/* Map placeholder - in a real app, this would be an actual map component */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-full bg-[#e5e7eb] dark:bg-[#1f2937] relative">
            {/* Simulated map content */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Roads */}
              <div className="absolute top-1/4 left-0 right-0 h-2 bg-gray-400"></div>
              <div className="absolute top-2/3 left-0 right-0 h-2 bg-gray-400"></div>
              <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-gray-400"></div>
              <div className="absolute left-3/4 top-0 bottom-0 w-2 bg-gray-400"></div>

              {/* Route path */}
              <div className="absolute top-1/4 left-1/4 right-1/4 h-2 bg-primary/70"></div>
              <div className="absolute left-1/4 top-1/4 bottom-1/3 w-2 bg-primary/70"></div>

              {/* Bus stops */}
              <div className="absolute top-1/4 left-1/4 h-4 w-4 rounded-full bg-primary border-2 border-white -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/4 left-1/2 h-4 w-4 rounded-full bg-primary border-2 border-white -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-1/4 h-4 w-4 rounded-full bg-primary border-2 border-white -translate-x-1/2 -translate-y-1/2"></div>

              {/* Bus icon */}
              <div
                className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
                style={{
                  top: `${(busLocation.lat - 40.7) * 1000}%`,
                  left: `${(busLocation.lng + 74) * 1000}%`,
                }}
              >
                <div className="bg-primary text-primary-foreground rounded-full h-full w-full flex items-center justify-center animate-pulse">
                  <Bus className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button variant="secondary" size="icon" onClick={() => setZoom(Math.min(20, zoom + 1))}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" onClick={() => setZoom(Math.max(10, zoom - 1))}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon">
                <Locate className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t bg-background p-4">
        <div className="container space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>Updated just now</span>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">On Time</Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">Next Stop: {nextStop}</span>
              </div>
              <span className="font-medium">{eta}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="gap-2">
              <Navigation className="h-4 w-4" />
              Directions to Stop
            </Button>
            <Button className="gap-2">
              <Bus className="h-4 w-4" />
              View Full Route
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

