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
  
  // Dummy bus data
  export const busData: Bus[] = [
    {
      id: 1,
      start: { name: "Markato", lat: 9.015, lng: 38.746 },
      destination: { name: "Shiro Meda", lat: 9.034, lng: 38.761 },
      checkpoints: [
        { name: "Checkpoint 1", lat: 9.018, lng: 38.750 },
        { name: "Checkpoint 2", lat: 9.025, lng: 38.755 },
        { name: "Checkpoint 3", lat: 9.030, lng: 38.760 },
      ]
    },
    {
      id: 2,
      start: { name: "Bole", lat: 9.034, lng: 38.746 },
      destination: { name: "Piassa", lat: 9.031, lng: 38.758 },
      checkpoints: [
        { name: "Checkpoint A", lat: 9.038, lng: 38.751 },
        { name: "Checkpoint B", lat: 9.027, lng: 38.759 },
        { name: "Checkpoint C", lat: 9.035, lng: 38.764 },
      ]
    },
    {
      id: 3,
      start: { name: "Megenagna", lat: 9.022, lng: 38.741 },
      destination: { name: "Addis Ketema", lat: 9.045, lng: 38.770 },
      checkpoints: [
        { name: "Checkpoint X", lat: 9.030, lng: 38.750 },
        { name: "Checkpoint Y", lat: 9.033, lng: 38.758 },
        { name: "Checkpoint Z", lat: 9.040, lng: 38.762 },
      ]
    }
  ];
  