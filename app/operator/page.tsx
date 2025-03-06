"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bus, User, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OperatorDashboard() {
  const [buses, setBuses] = useState([
    { id: "BUS-1042", route: "42", status: "Available", capacity: "Medium (50%)" },
    { id: "BUS-1015", route: "15", status: "Full", capacity: "High (90%)" },
    { id: "BUS-1008", route: "8", status: "Available", capacity: "Low (30%)" },
    { id: "BUS-1023", route: "23", status: "Almost Full", capacity: "High (80%)" },
  ])

  const updateBusStatus = (busId, newStatus) => {
    setBuses(buses.map((bus) => (bus.id === busId ? { ...bus, status: newStatus } : bus)))
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <Bus className="h-5 w-5" />
              <h1 className="font-semibold">Bus Operator Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <User className="h-4 w-4" />
              John Driver
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <section>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Update Bus Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Update the current capacity status of buses on your routes.
                </p>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bus ID</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Current Status</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {buses.map((bus) => (
                      <TableRow key={bus.id}>
                        <TableCell className="font-medium">{bus.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            {bus.route}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={bus.status} />
                        </TableCell>
                        <TableCell>{bus.capacity}</TableCell>
                        <TableCell>
                          <Select defaultValue={bus.status} onValueChange={(value) => updateBusStatus(bus.id, value)}>
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Update status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Available">Available</SelectItem>
                              <SelectItem value="Almost Full">Almost Full</SelectItem>
                              <SelectItem value="Full">Full</SelectItem>
                              <SelectItem value="Out of Service">Out of Service</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Report an Issue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Button className="gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Report Traffic Issue
                  </Button>
                  <Button className="gap-2">
                    <Bus className="h-4 w-4" />
                    Report Vehicle Problem
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}

function StatusBadge({ status }) {
  let badgeClass = ""

  switch (status) {
    case "Available":
      badgeClass = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      break
    case "Almost Full":
      badgeClass = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      break
    case "Full":
      badgeClass = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      break
    case "Out of Service":
      badgeClass = "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      break
    default:
      badgeClass = "bg-muted text-muted-foreground"
  }

  return <Badge className={badgeClass}>{status}</Badge>
}

