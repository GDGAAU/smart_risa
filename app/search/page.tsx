"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, MapPin, Bus, Bookmark } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  // Mock data for bus stations
  const busStations = [
    { id: "1", name: "Central Station", routes: ["42", "15", "8", "23"], address: "100 Main Street" },
    { id: "2", name: "University Campus", routes: ["15"], address: "200 University Ave" },
    { id: "3", name: "Business District", routes: ["42", "23"], address: "300 Commerce Blvd" },
    { id: "4", name: "Shopping Mall", routes: ["8"], address: "400 Retail Drive" },
    { id: "5", name: "Hospital", routes: ["8"], address: "500 Health Way" },
    { id: "6", name: "Airport", routes: ["23"], address: "600 Terminal Road" },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // Filter stations based on search query
    const results = busStations.filter(
      (station) =>
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.routes.some((route) => route.includes(searchQuery)),
    )

    setSearchResults(results)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
          <h1 className="font-semibold">Search</h1>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for bus stations or locations"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </section>

        <section className="container pb-4">
          <Tabs defaultValue="stations" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stations">Bus Stations</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
            </TabsList>

            <TabsContent value="stations" className="mt-4">
              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Search Results</h2>
                  {searchResults.map((station) => (
                    <StationSearchResult key={station.id} station={station} />
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">No stations found matching "{searchQuery}"</p>
                </div>
              ) : (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Popular Stations</h2>
                  <div className="space-y-4">
                    {busStations.slice(0, 3).map((station) => (
                      <StationSearchResult key={station.id} station={station} />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="locations" className="mt-4">
              <div className="py-4">
                <h2 className="text-lg font-semibold mb-4">Popular Locations</h2>
                <div className="space-y-3">
                  <LocationResult name="Downtown" address="City Center" />
                  <LocationResult name="University" address="Academic District" />
                  <LocationResult name="Shopping Mall" address="400 Retail Drive" />
                  <LocationResult name="Business Park" address="300 Commerce Blvd" />
                  <LocationResult name="Residential Area" address="500 Neighborhood St" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  )
}

function StationSearchResult({ station }) {
  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{station.name}</h3>
          <p className="text-sm text-muted-foreground">{station.address}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {station.routes.map((route, index) => (
              <Badge key={index} variant="outline" className="bg-primary/10 text-primary">
                {route}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button size="sm">
            <Bus className="h-4 w-4 mr-1" />
            Routes
          </Button>
        </div>
      </div>
    </div>
  )
}

function LocationResult({ name, address }) {
  return (
    <div className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{address}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <MapPin className="h-4 w-4 mr-1" />
            Map
          </Button>
          <Button size="sm">
            <Bus className="h-4 w-4 mr-1" />
            Find Bus
          </Button>
        </div>
      </div>
    </div>
  )
}

