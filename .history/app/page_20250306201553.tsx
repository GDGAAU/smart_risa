import React, { useState, useEffect } from "react";
import LiveTrackingMap from "./LiveTrackingMap";
import RouteCard from "./RouteCard";

const HomePage = () => {
  const [bookmarkedLocations, setBookmarkedLocations] = useState([]);
  const [recentLocations, setRecentLocations] = useState([]);
  const [busRoutes, setBusRoutes] = useState([]);
  const [trackingRoute, setTrackingRoute] = useState(null);

  useEffect(() => {
    fetch("/api/user-locations")
      .then((res) => res.json())
      .then((data) => {
        setBookmarkedLocations(data.bookmarked);
        setRecentLocations(data.recent);
      })
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  useEffect(() => {
    fetch("/api/bus-routes")
      .then((res) => res.json())
      .then((data) => setBusRoutes(data.routes))
      .catch((error) => console.error("Error fetching routes:", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      
      {/* Bookmarked Locations */}
      <h2 className="text-lg font-semibold">Bookmarked Locations</h2>
      <ul>
        {bookmarkedLocations.map((location) => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
      
      {/* Recent Locations */}
      <h2 className="text-lg font-semibold mt-4">Recent Locations</h2>
      <ul>
        {recentLocations.map((location) => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>

      {/* Bus Routes */}
      <h2 className="text-lg font-semibold mt-4">Live Bus Tracking</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {busRoutes.map((route) => (
          <RouteCard
            key={route.routeNumber}
            routeNumber={route.routeNumber}
            routeName={route.routeName}
            arrivalTime={route.arrivalTime}
            congestion={route.congestion}
            nextBuses={route.nextBuses}
            onTrackLive={() => setTrackingRoute(route)}
          />
        ))}
      </div>
      
      {/* Live Tracking Map */}
      {trackingRoute && <LiveTrackingMap route={trackingRoute} />}
    </div>
  );
};

export default HomePage;
