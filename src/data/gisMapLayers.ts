export type BasemapConfig = {
  id: string;
  label: string;
  url: string;
  attribution: string;
  subdomains?: string;
  maxZoom?: number;
};

export type OverlayConfig = {
  id: string;
  label: string;
  description?: string;
  defaultVisible: boolean;
};

export const DEFAULT_BASEMAP_ID = 'satellite';

export const FALLBACK_BASEMAP_ID = 'osm';

export const satelliteLabelsConfig = {
  url: 'https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
  attribution: 'Labels &copy; Esri',
  maxZoom: 19,
};

export const basemapLayers: BasemapConfig[] = [
  {
    id: 'satellite',
    label: 'Satelit (Esri)',
    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri',
    maxZoom: 19,
  },
  {
    id: 'osm',
    label: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  },
];

export const overlayLayers: OverlayConfig[] = [
  {
    id: 'supply-choropleth',
    label: 'Sebaran Supply',
    description: 'Garis batas provinsi berwarna sesuai volume supply',
    defaultVisible: true,
  },
  {
    id: 'province-borders',
    label: 'Garis Batas Putih',
    description: 'Outline putih tambahan di atas peta',
    defaultVisible: false,
  },
  {
    id: 'supply-markers',
    label: 'Titik Supply Utama',
    description: 'Marker lokasi supply hortikultura',
    defaultVisible: true,
  },
];

/** Koordinat pusat provinsi untuk marker overlay */
export const provinceCentroids: Record<string, { lat: number; lng: number }> = {
  'Jawa Barat': { lat: -6.9, lng: 107.6 },
  'Jawa Tengah': { lat: -7.15, lng: 110.0 },
  'Jawa Timur': { lat: -7.25, lng: 112.75 },
  'DI Yogyakarta': { lat: -7.8, lng: 110.37 },
  Banten: { lat: -6.4, lng: 106.1 },
  Lampung: { lat: -4.9, lng: 105.3 },
  'Sumatera Selatan': { lat: -3.3, lng: 104.0 },
  'Sulawesi Selatan': { lat: -4.4, lng: 119.9 },
  'Kalimantan Selatan': { lat: -3.3, lng: 114.6 },
  Bali: { lat: -8.4, lng: 115.2 },
  'Nusa Tenggara Barat': { lat: -8.58, lng: 117.5 },
  'Nusa Tenggara Timur': { lat: -9.7, lng: 121.0 },
};
