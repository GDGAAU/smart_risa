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
        { name: "Checkpoint 2", lat: 9.025, lng: 38.755 },
        { name: "Current Location", lat: 9.0423171, lng: 38.7682187 }, // Adding your current location as a checkpoint
        { name: "Nearby Location 1", lat: 9.045, lng: 38.770 }, // A nearby location slightly away
        { name: "Nearby Location 2", lat: 9.040, lng: 38.765 }  // Another nearby location
      ]
    },
    {
      id: 2,
      start: { name: "Bole", lat: 9.034, lng: 38.746 },
      destination: { name: "Piassa", lat: 9.031, lng: 38.758 },
      checkpoints: [
        { name: "Checkpoint 1", lat: 9.038, lng: 38.751 },
        { name: "Checkpoint 2", lat: 9.027, lng: 38.759 },
        { name: "Current Location", lat: 9.0423171, lng: 38.7682187 }, // Adding your current location as a checkpoint
        { name: "Nearby Location 1", lat: 9.045, lng: 38.770 }, // A nearby location slightly away
        { name: "Nearby Location 2", lat: 9.040, lng: 38.765 }  // Another nearby location
      ]
    }
  ];
  