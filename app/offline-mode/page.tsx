import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, WifiOff, Download, Clock } from "lucide-react"

export default function OfflineModePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
          <h1 className="font-semibold">Offline Mode</h1>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-6">
          <div className="mb-6 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <WifiOff className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mb-2 text-xl font-bold">Offline Mode Active</h2>
              <p className="mb-4 text-muted-foreground">
                You're currently using cached data. Some features may be limited.
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>Last updated: Today, 10:15 AM</span>
              </div>
            </div>
          </div>

          <h2 className="mb-4 text-xl font-semibold">Saved Routes</h2>
          <div className="space-y-4">
            <OfflineRouteCard
              routeNumber="42"
              routeName="Downtown Express"
              schedule={["10:00 AM", "10:30 AM", "11:00 AM"]}
            />

            <OfflineRouteCard
              routeNumber="15"
              routeName="University Line"
              schedule={["10:15 AM", "10:45 AM", "11:15 AM"]}
            />
          </div>
        </section>

        <section className="container py-4">
          <h2 className="mb-4 text-xl font-semibold">Offline Maps</h2>
          <div className="space-y-4">
            <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Downtown Area</h3>
                  <p className="text-sm text-muted-foreground">12 MB - Downloaded</p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">University Area</h3>
                  <p className="text-sm text-muted-foreground">8 MB - Not downloaded</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function OfflineRouteCard({ routeNumber, routeName, schedule }) {
  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <span className="font-bold">{routeNumber}</span>
        </div>
        <div>
          <h3 className="font-medium">{routeName}</h3>
          <p className="text-xs text-muted-foreground">Scheduled times (not real-time)</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Today's Schedule:</p>
        <div className="flex flex-wrap gap-2">
          {schedule.map((time, index) => (
            <div key={index} className="rounded-md bg-muted px-2.5 py-1 text-xs">
              {time}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

