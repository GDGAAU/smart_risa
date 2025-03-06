// utils/busData.ts

export interface Checkpoint {
    name: string;
    lat: number;
    lng: number;
  }
  
  export interface Bus {
    id: number;
    start: { name: string; lat: number; lng: number };
    destination: { name: string; lat: number; lng: number };
    checkpoints: Checkpoint[];
  }
  
  export const busData: Bus[] = [
    {
      id: 1,
      start: { name: "Markato", lat: 9.015, lng: 38.746 },
      destination: { name: "Shiro Meda", lat: 9.034, lng: 38.761 },
      checkpoints: [
        { name: "Checkpoint 1", lat: 9.018, lng: 38.750 },
        { name: "Checkpoint 2", lat: 9.025, lng: 38.755 }
      ]
    },
    {
      id: 2,
      start: { name: "Bole", lat: 9.034, lng: 38.746 },
      destination: { name: "Piassa", lat: 9.031, lng: 38.758 },
      checkpoints: [
        { name: "Checkpoint 1", lat: 9.038, lng: 38.751 },
        { name: "Checkpoint 2", lat: 9.027, lng: 38.759 }
      ]
    }
  ];
  