import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Clock, Bell, AlertTriangle } from "lucide-react"

export default function RouteDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch route details based on the ID
  const routeId = params.id
  const routeDetails = {
    number: "42",
    name: "Downtown Express",
    stops: [
      { name: "Central Station", time: "10:00 AM", status: "departed" },
      { name: "City Hall", time: "10:07 AM", status: "departed" },
      { name: "Market Square", time: "10:15 AM", status: "current" },
      { name: "Business District", time: "10:22 AM", status: "upcoming" },
      { name: "Tech Park", time: "10:30 AM", status: "upcoming" },
      { name: "University", time: "10:40 AM", status: "upcoming" },
    ],
    alerts: [{ type: "delay", message: "Slight delay due to traffic at Market Square" }],
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground mr-2">
              <span className="font-bold">{routeDetails.number}</span>
            </div>
            <h1 className="font-semibold">{routeDetails.name}</h1>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Live Tracking</h2>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>Updated 1 min ago</span>
            </div>
          </div>

          <div className="mb-6 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <div className="h-48 bg-muted rounded-md flex items-center justify-center">
              <MapPin className="h-8 w-8 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Map view would appear here</span>
            </div>
          </div>

          {routeDetails.alerts.length > 0 && (
            <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-medium">Service Alert</h3>
                  <p className="text-sm text-muted-foreground">{routeDetails.alerts[0].message}</p>
                </div>
              </div>
            </div>
          )}

          <h2 className="mb-4 text-xl font-semibold">Route Stops</h2>
          <div className="space-y-1">
            {routeDetails.stops.map((stop, index) => (
              <div key={index} className="relative">
                {index < routeDetails.stops.length - 1 && (
                  <div
                    className={`absolute left-4 top-8 h-10 w-0.5 ${
                      stop.status === "departed" ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
                <div className="flex items-center p-2">
                  <div
                    className={`mr-4 h-8 w-8 rounded-full flex items-center justify-center ${
                      stop.status === "current"
                        ? "bg-primary text-primary-foreground"
                        : stop.status === "departed"
                          ? "bg-primary/20"
                          : "bg-muted"
                    }`}
                  >
                    {stop.status === "current" && <div className="h-2 w-2 rounded-full bg-primary-foreground" />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${stop.status === "current" ? "text-primary" : ""}`}>{stop.name}</p>
                    <p className="text-sm text-muted-foreground">{stop.time}</p>
                  </div>
                  {stop.status === "current" && (
                    <div className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      Current Stop
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container py-4">
          <div className="flex gap-4">
            <Button className="flex-1" variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Set Arrival Alert
            </Button>
            <Button className="flex-1">View Alternative Routes</Button>
          </div>
        </section>
      </main>
    </div>
  )
}

