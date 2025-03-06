'use client';

import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || '';

const INITIAL_CENTER: [number, number] = [38.7525, 9.0192]; // Addis Ababa
const INITIAL_ZOOM = 10;

const MyMap = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [start, setStart] = useState<[number, number] | null>(null);
  const [end, setEnd] = useState<[number, number] | null>(null);
  const [eta, setEta] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const vehicleMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const routeLayerRef = useRef<string>('route-layer');

  useEffect(() => {
    if (!mapContainerRef.current || !process.env.NEXT_PUBLIC_MAPBOX_KEY) {
      console.error('Map container or API key is missing.');
      return;
    }

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      style: 'mapbox://styles/mapbox/streets-v12',
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

    const addGeocoder = (placeholder: string, onResult: (coords: [number, number]) => void) => {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken as string,
        mapboxgl: mapboxgl as any,
        marker: false,
        placeholder,
      });

      mapRef.current!.addControl(geocoder, 'top-left');

      geocoder.on('result', (event) => {
        const { result } = event;
        console.log(`${placeholder}:`, result);

        const coords: [number, number] = [result.center[0], result.center[1]];
        onResult(coords);

        new mapboxgl.Marker().setLngLat(coords).addTo(mapRef.current!);

        mapRef.current?.flyTo({
          center: coords,
          zoom: 14,
        });
      });
    };

    addGeocoder('Enter Start Location', setStart);
    addGeocoder('Enter Destination', setEnd);

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (start && end) {
      drawRoute();
    }
  }, [start, end]);

  const drawRoute = async () => {
    if (!mapRef.current || !start || !end) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      const route = data.routes[0].geometry;
      const duration = data.routes[0].duration / 60; // Convert seconds to minutes
      const dist = data.routes[0].distance / 1000; // Convert meters to kilometers

      setEta(`${duration.toFixed(1)} min`);
      setDistance(`${dist.toFixed(2)} km`);

      if (mapRef.current.getSource(routeLayerRef.current)) {
        mapRef.current.removeLayer(routeLayerRef.current);
        mapRef.current.removeSource(routeLayerRef.current);
      }

      mapRef.current.addSource(routeLayerRef.current, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: route,
        },
      });

      mapRef.current.addLayer({
        id: routeLayerRef.current,
        type: 'line',
        source: routeLayerRef.current,
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#007AFF', 'line-width': 5 },
      });

      moveVehicle(route.coordinates);
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  const moveVehicle = (coordinates: [number, number][]) => {
    if (!mapRef.current) return;