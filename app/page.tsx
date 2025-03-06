"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Bus, Bell, Info, Home, Search, User, Bookmark, History } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function HomePage() {
  const [bookmarkedLocations, setBookmarkedLocations] = useState([
    { id: 1, name: "Home", address: "123 Main Street" },
    { id: 2, name: "Work", address: "456 Office Plaza" },
  ])

  const [recentLocations, setRecentLocations] = useState([
    { id: 1, name: "University Campus", time: "Yesterday" },
    { id: 2, name: "Shopping Mall", time: "2 days ago" },
    { id: 3, name: "Central Station", time: "3 days ago" },
  ])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <Bus className="h-6 w-6" />
              <span className="font-bold">TransitTrack</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/search">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <div className="ml-2 flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/operator">
                  <Bus className="mr-1 h-4 w-4" />
                  Operator
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin">
                  <User className="mr-1 h-4 w-4" />
                  Admin
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search for locations or bus stations..." type="search" />
          </div>

          <Tabs defaultValue="nearby" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="nearby">Nearby</TabsTrigger>
              <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>

            <TabsContent value="nearby" className="mt-4">
              <div className="space-y-4">
                <RouteCard
                  routeNumber="42"
                  routeName="Downtown Express"
                  arrivalTime="3 min"
                  congestion="Low"
                  nextBuses={["3 min", "15 min", "28 min"]}
                />

                <RouteCard
                  routeNumber="15"
                  routeName="University Line"
                  arrivalTime="7 min"
                  congestion="Medium"
                  nextBuses={["7 min", "22 min", "37 min"]}
                />

                <RouteCard
                  routeNumber="8"
                  routeName="Central Station"
                  arrivalTime="12 min"
                  congestion="High"
                  nextBuses={["12 min", "32 min", "52 min"]}
                />
              </div>
            </TabsContent>

            <TabsContent value="bookmarked" className="mt-4">
              <div className="space-y-3">
                {bookmarkedLocations.map((location) => (
                  <BookmarkedLocationCard key={location.id} name={location.name} address={location.address} />
                ))}
                <Button variant="outline" className="w-full gap-2">
                  <Bookmark className="h-4 w-4" />
                  Add New Bookmark
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="recent" className="mt-4">
              <div className="space-y-3">
                {recentLocations.map((location) => (
                  <RecentLocationCard key={location.id} name={location.name} time={location.time} />
                ))}
                <Button variant="ghost" className="w-full text-sm text-muted-foreground">
                  Clear History
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="container py-4">
          <h2 className="mb-4 text-xl font-semibold">Service Alerts</h2>
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
                <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
              </div>
              <div>
                <h3 className="font-medium">Route 8 Delays</h3>
                <p className="text-sm text-muted-foreground">
                  Due to construction on Main Street, expect 5-10 minute delays on Route 8.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <nav className="sticky bottom-0 z-10 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-around">
          <NavButton icon={<Home className="h-5 w-5" />} label="Home" active />
          <NavButton icon={<Bus className="h-5 w-5" />} label="Routes" />
          <NavButton icon={<MapPin className="h-5 w-5" />} label="Map" />
          <NavButton icon={<Bookmark className="h-5 w-5" />} label="Saved" />
        </div>
      </nav>
    </div>
  )
}

function RouteCard({ routeNumber, routeName, arrivalTime, congestion, nextBuses }) {
  const congestionColor =
    congestion === "Low"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : congestion === "Medium"
        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"

  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="font-bold">{routeNumber}</span>
          </div>
          <div>
            <h3 className="font-medium">{routeName}</h3>
            <p className="text-sm text-muted-foreground">Next: {arrivalTime}</p>
          </div>
        </div>
        <div className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${congestionColor}`}>{congestion}</div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium">Upcoming buses:</p>
        <div className="mt-2 flex gap-2">
          {nextBuses.map((time, index) => (
            <div key={index} className="rounded-md bg-muted px-2.5 py-1 text-xs">
              {time}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <Button variant="outline" size="sm">
          Route Details
        </Button>
        <Button size="sm">Track Live</Button>
      </div>
    </div>
  )
}

function BookmarkedLocationCard({ name, address }) {
  return (
    <div className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Bookmark className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-muted-foreground">{address}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          Find Routes
        </Button>
      </div>
    </div>
  )
}

function RecentLocationCard({ name, time }) {
  return (
    <div className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-muted p-2">
            <History className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-muted-foreground">Visited: {time}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Bookmark className="h-4 w-4" />
            <span className="sr-only">Bookmark</span>
          </Button>
          <Button variant="ghost" size="sm">
            Find Routes
          </Button>
        </div>
      </div>
    </div>
  )
}

function NavButton({ icon, label, active = false }) {
  return (
    <button
      className={`flex flex-col items-center justify-center ${active ? "text-primary" : "text-muted-foreground"}`}
    >
      {icon}
      <span className="mt-1 text-xs">{label}</span>
    </button>
  )
}

