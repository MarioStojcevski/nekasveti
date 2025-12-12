import type { Map, Marker } from "leaflet";

declare global {
  interface Window {
    L: {
      map: (element: HTMLElement) => Map;
      tileLayer: (urlTemplate: string, options?: any) => any;
      marker: (latlng: [number, number], options?: any) => Marker;
    };
  }
}

export {};

