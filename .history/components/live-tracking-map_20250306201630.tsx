'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { button, Button } from '@cui/button';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || '';

const LiveTrackingMap = ({ 
  routeNumber,
  routeName,
  isOpen,
  onClose,
  start,
  end
}: {
  routeNumber: string;
  routeName: string;
  isOpen: boolean;
  onClose: () => void;
  start: [number, number];
  end: [number, number];
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const vehicleMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const [eta, setEta] = useState<string>('--');
  const [distance, setDistance] = useState<string>('--');

  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: start,
      zoom: 13,
      style: 'mapbox://styles/mapbox/streets-v12'
    });

    // Add navigation controls
    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // Draw initial route
    drawRoute(start, end);

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, [isOpen]);

  const drawRoute = async (startCoords: [number, number], endCoords: [number, number]) => {
    if (!mapRef.current) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      
      if (data.routes[0]) {
        const route = data.routes[0].geometry;
        updateRouteDisplay(route);
        startVehicleAnimation(route.coordinates);
        updateRouteInfo(data.routes[0]);
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  const updateRouteDisplay = (route: any) => {
    if (!mapRef.current) return;

    const source = mapRef.current.getSource('route');
    if (source) {
      (source as mapboxgl.GeoJSONSource).setData({
        type: 'Feature',
        properties: {},
        geometry: route
      });
    } else {
      mapRef.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: route
        }
      });

      mapRef.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3b82f6',
          'line-width': 4
        }
      });
    }
  };

  const startVehicleAnimation = (coordinates: [number, number][]) => {
    if (!mapRef.current) return;

    // Remove existing marker
    if (vehicleMarkerRef.current) vehicleMarkerRef.current.remove();

    // Create new marker
    const el = document.createElement('div');
    el.className = 'vehicle-marker';
    vehicleMarkerRef.current = new mapboxgl.Marker(el)
      .setLngLat(coordinates[0])
      .addTo(mapRef.current);

    // Animate along the route
    let index = 0;
    const animate = () => {
      if (index < coordinates.length) {
        vehicleMarkerRef.current?.setLngLat(coordinates[index]);
        index++;
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  const updateRouteInfo = (route: any) => {
    setEta(`${Math.round(route.duration / 60)} min`);
    setDistance(`${(route.distance / 1000).toFixed(1)} km`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm">
      <div className="relative h-full w-full">
        <div ref={mapContainerRef} className="h-full w-full" />
        
        {/* Information Panel */}
        <div className="absolute left-4 top-4 rounded-lg bg-background p-4 shadow-lg">
          <h2 className="text-lg font-semibold">{routeNumber} - {routeName}</h2>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">ETA</p>
              <p className="font-medium">{eta}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Distance</p>
              <p className="font-medium">{distance}</p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="outline"
          size="sm"
          className="absolute right-4 top-4"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default LiveTrackingMap;