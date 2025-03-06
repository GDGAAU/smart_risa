"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Bus, User, Settings, Plus, MessageSquare, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboard() {
  const [buses, setBuses] = useState([
    { id: "BUS-1042", route: "42", driver: "Michael Chen", status: "Active" },
    { id: "BUS-1015", route: "15", driver: "Sarah Johnson", status: "Active" },
    { id: "BUS-1008", route: "8", driver: "David Wilson", status: "Active" },
    { id: "BUS-1023", route: "23", driver: "Lisa Rodriguez", status: "Maintenance" },
  ])

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "Road Construction",
      location: "Main Street",
      message: "Lane closure causing delays",
      status: "Active",
    },
    {
      id: 2,
      type: "Traffic Accident",
      location: "University Ave",
      message: "Minor accident, expect delays",
      status: "Active",
    },
    {
      id: 3,
      type: "Special Event",
      location: "Downtown",
      message: "Festival causing road closures",
      status: "Scheduled",
    },
  ])

  const [newBusId, setNewBusId] = useState("")
  const [newBusRoute, setNewBusRoute] = useState("")

  const addNewBus = () => {
    if (newBusId && newBusRoute) {
      setBuses([
        ...buses,
        {
          id: newBusId,
          route: newBusRoute,
          driver: "Unassigned",
          status: "Inactive",
        },
      ])
      setNewBusId("")
      setNewBusRoute("")
    }
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
              <h1 className="font-semibold">Admin Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <User className="h-4 w-4" />
              Admin User
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <section>
            <Tabs defaultValue="buses" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buses">Manage Buses</TabsTrigger>
                <TabsTrigger value="alerts">Service Alerts</TabsTrigger>
              </TabsList>

              <TabsContent value="buses" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Fleet Management</CardTitle>
                    <CardDescription>Add, edit, or remove buses from the system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-6 p-4 border rounded-lg">
                      <div className="grid gap-2 flex-1">
                        <label htmlFor="bus-id" className="text-sm font-medium">
                          Bus ID
                        </label>
                        <Input
                          id="bus-id"
                          placeholder="e.g. BUS-1050"
                          value={newBusId}
                          onChange={(e) => setNewBusId(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2 flex-1">
                        <label htmlFor="bus-route" className="text-sm font-medium">
                          Route
                        </label>
                        <Input
                          id="bus-route"
                          placeholder="e.g. 42"
                          value={newBusRoute}
                          onChange={(e) => setNewBusRoute(e.target.value)}
                        />
                      </div>
                      <Button className="mt-6" onClick={addNewBus}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Bus
                      </Button>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Bus ID</TableHead>
                          <TableHead>Route</TableHead>
                          <TableHead>Driver</TableHead>
                          <TableHead>Status</TableHead>
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
                            <TableCell>{bus.driver}</TableCell>
                            <TableCell>
                              <BusStatusBadge status={bus.status} />
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500">
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="alerts" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Service Alerts</CardTitle>
                    <CardDescription>
                      Manage real-time alerts about road conditions and service disruptions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 p-4 border rounded-lg">
                      <h3 className="text-lg font-medium mb-4">Create New Alert</h3>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <label htmlFor="alert-type" className="text-sm font-medium">
                              Alert Type
                            </label>
                            <Select>
                              <SelectTrigger id="alert-type">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="road-construction">Road Construction</SelectItem>
                                <SelectItem value="traffic-accident">Traffic Accident</SelectItem>
                                <SelectItem value="special-event">Special Event</SelectItem>
                                <SelectItem value="weather">Weather Condition</SelectItem>
                                <SelectItem value="service-change">Service Change</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="alert-location" className="text-sm font-medium">
                              Location
                            </label>
                            <Input id="alert-location" placeholder="e.g. Main Street" />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="alert-message" className="text-sm font-medium">
                            Alert Message
                          </label>
                          <Textarea id="alert-message" placeholder="Describe the alert..." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <label htmlFor="affected-routes" className="text-sm font-medium">
                              Affected Routes
                            </label>
                            <Select>
                              <SelectTrigger id="affected-routes">
                                <SelectValue placeholder="Select routes" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Routes</SelectItem>
                                <SelectItem value="42">Route 42</SelectItem>
                                <SelectItem value="15">Route 15</SelectItem>
                                <SelectItem value="8">Route 8</SelectItem>
                                <SelectItem value="23">Route 23</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="alert-duration" className="text-sm font-medium">
                              Duration
                            </label>
                            <Select>
                              <SelectTrigger id="alert-duration">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1h">1 hour</SelectItem>
                                <SelectItem value="2h">2 hours</SelectItem>
                                <SelectItem value="4h">4 hours</SelectItem>
                                <SelectItem value="8h">8 hours</SelectItem>
                                <SelectItem value="1d">1 day</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Publish Alert
                        </Button>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium mb-4">Active Alerts</h3>
                    <div className="space-y-4">
                      {alerts.map((alert) => (
                        <div key={alert.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{alert.type}</h4>
                                <AlertStatusBadge status={alert.status} />
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">Location: {alert.location}</p>
                              <p className="text-sm">{alert.message}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500">
                                End
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  )
}

function BusStatusBadge({ status }) {
  let badgeClass = ""

  switch (status) {
    case "Active":
      badgeClass = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      break
    case "Inactive":
      badgeClass = "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      break
    case "Maintenance":
      badgeClass = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      break
    default:
      badgeClass = "bg-muted text-muted-foreground"
  }

  return <Badge className={badgeClass}>{status}</Badge>
}

function AlertStatusBadge({ status }) {
  let badgeClass = ""

  switch (status) {
    case "Active":
      badgeClass = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      break
    case "Scheduled":
      badgeClass = "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      break
    case "Resolved":
      badgeClass = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      break
    default:
      badgeClass = "bg-muted text-muted-foreground"
  }

  return <Badge className={badgeClass}>{status}</Badge>
}

