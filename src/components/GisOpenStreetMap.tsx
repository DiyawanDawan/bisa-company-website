'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Maximize2, Minimize2, Map, Layers, Loader2 } from 'lucide-react';
import type { GeoJSON, LayerGroup, Map as LeafletMap, TileLayer } from 'leaflet';
import {
  provinceMapData,
  levelColors,
  formatTon,
  type ProvinceSupply,
} from '@/data/gisDashboardContent';
import GisMapLegend from '@/components/GisMapLegend';
import {
  basemapLayers,
  overlayLayers,
  provinceCentroids,
  DEFAULT_BASEMAP_ID,
  FALLBACK_BASEMAP_ID,
  satelliteLabelsConfig,
} from '@/data/gisMapLayers';
import 'leaflet/dist/leaflet.css';

const PROVINCE_ALIASES: Record<string, string> = {
  'DI Yogyakarta': 'DAERAH ISTIMEWA YOGYAKARTA',
};

const DEFAULT_BASEMAP = DEFAULT_BASEMAP_ID;

function createTileLayer(
  config: { url: string; attribution: string; maxZoom?: number; subdomains?: string },
  extra?: L.TileLayerOptions,
): TileLayer {
  const options: L.TileLayerOptions = {
    attribution: config.attribution,
    maxZoom: config.maxZoom ?? 19,
    detectRetina: false,
    updateWhenIdle: false,
    updateWhenZooming: false,
    keepBuffer: 2,
    ...extra,
  };
  if (config.subdomains) {
    options.subdomains = config.subdomains;
  }
  return L.tileLayer(config.url, options);
}

function normalizeProvinceKey(name: string): string {
  return name.toUpperCase().replace(/\s+/g, '');
}

function getSupplyByGeoName(propinsi: string): ProvinceSupply | undefined {
  const geoKey = normalizeProvinceKey(propinsi);
  return provinceMapData.find((province) => {
    const alias = PROVINCE_ALIASES[province.name] ?? province.name;
    return normalizeProvinceKey(alias) === geoKey;
  });
}

function getColorForProvince(propinsi: string): string {
  const supply = getSupplyByGeoName(propinsi);
  if (!supply) return '#cbd5e1';
  return levelColors[supply.level];
}

function formatGeoProvinceName(propinsi: string): string {
  return propinsi
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function markerRadius(production: number): number {
  if (production >= 2_000_000) return 12;
  if (production >= 1_000_000) return 10;
  if (production >= 500_000) return 8;
  return 6;
}

export default function GisOpenStreetMap({
  size = 'default',
  mapLegendTitle = 'Legenda Supply (ton)',
}: {
  size?: 'default' | 'full';
  mapLegendTitle?: string;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const basemapRefs = useRef<Record<string, TileLayer>>({});
  const overlayRefs = useRef<Record<string, GeoJSON | LayerGroup>>({});
  const activeBasemapRef = useRef<string>(DEFAULT_BASEMAP);
  const mountIdRef = useRef(0);

  const [overlayReady, setOverlayReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeBasemap, setActiveBasemap] = useState(DEFAULT_BASEMAP);
  const [overlayVisible, setOverlayVisible] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(overlayLayers.map((layer) => [layer.id, layer.defaultVisible])),
  );
  const [layersOpen, setLayersOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);
  const [fullscreenMapHeight, setFullscreenMapHeight] = useState<number | null>(null);

  const attachBasemap = useCallback((map: LeafletMap, basemapId: string) => {
    basemapRefs.current['satellite-labels']?.remove();
    Object.values(basemapRefs.current).forEach((layer) => {
      if (map.hasLayer(layer)) layer.remove();
    });

    const base = basemapRefs.current[basemapId];
    if (!base) return;

    base.addTo(map);
    if (basemapId === 'satellite') {
      basemapRefs.current['satellite-labels']?.addTo(map);
    }
  }, []);

  const refreshMap = useCallback((reattachBasemap = false) => {
    const map = mapRef.current;
    if (!map) return;

    if (reattachBasemap) {
      attachBasemap(map, activeBasemapRef.current);
    }

    map.invalidateSize(true);
    const center = map.getCenter();
    const zoom = map.getZoom();
    map.setView(center, zoom, { animate: false });

    const activeId = activeBasemapRef.current;
    basemapRefs.current[activeId]?.redraw();
    if (activeId === 'satellite') {
      basemapRefs.current['satellite-labels']?.redraw();
    }
  }, [attachBasemap]);

  const invalidateMapSize = useCallback(() => {
    refreshMap(false);
    window.requestAnimationFrame(() => refreshMap(false));
    window.setTimeout(() => refreshMap(false), 120);
    window.setTimeout(() => refreshMap(false), 400);
  }, [refreshMap]);

  const refreshMapAfterFullscreen = useCallback(() => {
    refreshMap(true);
    window.requestAnimationFrame(() => refreshMap(true));
    window.setTimeout(() => refreshMap(true), 150);
    window.setTimeout(() => refreshMap(true), 450);
  }, [refreshMap]);

  const toggleFullscreen = useCallback(async () => {
    const shell = shellRef.current;
    if (!shell) return;

    try {
      if (document.fullscreenElement === shell) {
        await document.exitFullscreen();
        return;
      }

      if (isFullscreen && !isNativeFullscreen) {
        setIsFullscreen(false);
        refreshMapAfterFullscreen();
        return;
      }

      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }

      if (shell.requestFullscreen) {
        await shell.requestFullscreen();
      } else {
        setIsNativeFullscreen(false);
        setIsFullscreen(true);
        refreshMapAfterFullscreen();
      }
    } catch {
      setIsNativeFullscreen(false);
      setIsFullscreen((prev) => !prev);
      refreshMapAfterFullscreen();
    }
  }, [refreshMapAfterFullscreen, isFullscreen, isNativeFullscreen]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const onFullscreenChange = () => {
      const active = document.fullscreenElement === shell;
      setIsNativeFullscreen(active);
      setIsFullscreen(active);
      refreshMapAfterFullscreen();
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, [refreshMapAfterFullscreen]);

  useEffect(() => {
    if (!isFullscreen || isNativeFullscreen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFullscreen(false);
        refreshMapAfterFullscreen();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isFullscreen, isNativeFullscreen, refreshMapAfterFullscreen]);

  useLayoutEffect(() => {
    if (!isFullscreen) {
      setFullscreenMapHeight(null);
      invalidateMapSize();
      return;
    }

    const updateHeight = () => {
      const legendHeight = 44;
      setFullscreenMapHeight(Math.max(window.innerHeight - legendHeight, 320));
      refreshMapAfterFullscreen();
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [isFullscreen, invalidateMapSize, refreshMapAfterFullscreen]);

  const switchBasemap = useCallback((id: string) => {
    const map = mapRef.current;
    if (!map || id === activeBasemapRef.current) return;

    attachBasemap(map, id);
    activeBasemapRef.current = id;
    setActiveBasemap(id);
    invalidateMapSize();
  }, [attachBasemap, invalidateMapSize]);

  const toggleOverlay = useCallback((id: string) => {
    const map = mapRef.current;
    const layer = overlayRefs.current[id];
    if (!map || !layer) return;

    setOverlayVisible((prev) => {
      const nextVisible = !prev[id];
      if (nextVisible) {
        layer.addTo(map);
      } else {
        layer.remove();
      }
      return { ...prev, [id]: nextVisible };
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mountId = ++mountIdRef.current;
    let resizeObserver: ResizeObserver | null = null;

    const loadOverlays = async () => {
      try {
        const response = await fetch('/data/indonesia-provinces.geojson');
        if (!response.ok) throw new Error('GeoJSON tidak ditemukan');
        const geojson = await response.json();

        if (mountIdRef.current !== mountId || !mapRef.current) return;

        const supplyLayer = L.geoJSON(geojson, {
          style: (feature) => {
            const propinsi = (feature?.properties?.Propinsi as string) ?? '';
            return {
              fillColor: 'transparent',
              fillOpacity: 0,
              color: getColorForProvince(propinsi),
              weight: 2,
              opacity: 0.95,
            };
          },
          onEachFeature: (feature, layer) => {
            const propinsi = (feature?.properties?.Propinsi as string) ?? '';
            const supply = getSupplyByGeoName(propinsi);
            const label = supply?.name ?? formatGeoProvinceName(propinsi);

            layer.bindPopup(
              supply
                ? `<div class="gis-popup"><strong>${label}</strong><span>Supply: ${formatTon(supply.production)} ton</span></div>`
                : `<div class="gis-popup"><strong>${label}</strong><span>Data belum tersedia</span></div>`,
            );
          },
        });

        const borderLayer = L.geoJSON(geojson, {
          style: {
            fillColor: 'transparent',
            fillOpacity: 0,
            weight: 1.5,
            opacity: 0.85,
            color: '#ffffff',
          },
          interactive: false,
        });

        const markerLayer = L.layerGroup(
          provinceMapData
            .filter((province) => provinceCentroids[province.name])
            .map((province) => {
              const coords = provinceCentroids[province.name]!;
              return L.circleMarker([coords.lat, coords.lng], {
                radius: markerRadius(province.production),
                fillColor: levelColors[province.level],
                color: '#ffffff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.85,
              }).bindPopup(
                `<div class="gis-popup"><strong>${province.name}</strong><span>Supply: ${formatTon(province.production)} ton</span></div>`,
              );
            }),
        );

        overlayRefs.current['supply-choropleth'] = supplyLayer;
        overlayRefs.current['province-borders'] = borderLayer;
        overlayRefs.current['supply-markers'] = markerLayer;

        overlayLayers.forEach((config) => {
          if (config.defaultVisible) {
            overlayRefs.current[config.id]?.addTo(mapRef.current!);
          }
        });

        const bounds = supplyLayer.getBounds();
        if (bounds.isValid()) {
          mapRef.current?.fitBounds(bounds, { padding: [16, 16] });
        }

        if (mountIdRef.current === mountId) {
          setOverlayReady(true);
        }
      } catch {
        if (mountIdRef.current === mountId) {
          setError('Gagal memuat layer provinsi.');
        }
      }
    };

    try {
      if ((container as HTMLDivElement & { _leaflet_id?: number })._leaflet_id) {
        delete (container as HTMLDivElement & { _leaflet_id?: number })._leaflet_id;
      }

      const map = L.map(container, {
        center: [-2.5, 118],
        zoom: 5,
        minZoom: 4,
        maxZoom: 18,
        zoomControl: false,
        scrollWheelZoom: true,
        touchZoom: true,
        dragging: true,
        maxBounds: [
          [-12, 94],
          [7, 142],
        ],
        maxBoundsViscosity: 0.85,
      });

      L.control.zoom({ position: 'topleft' }).addTo(map);
      mapRef.current = map;

      basemapLayers.forEach((config) => {
        const layer = createTileLayer(config);
        let tileErrors = 0;
        layer.on('tileerror', () => {
          tileErrors += 1;
          if (tileErrors < 4 || !mapRef.current) return;
          if (activeBasemapRef.current !== config.id) return;

          const fallbackId = FALLBACK_BASEMAP_ID;
          if (config.id === fallbackId) return;

          activeBasemapRef.current = fallbackId;
          setActiveBasemap(fallbackId);
          attachBasemap(mapRef.current, fallbackId);
        });
        basemapRefs.current[config.id] = layer;
      });

      basemapRefs.current['satellite-labels'] = createTileLayer(satelliteLabelsConfig, {
        opacity: 0.9,
      });

      attachBasemap(map, DEFAULT_BASEMAP);

      map.whenReady(() => {
        map.invalidateSize(true);
        window.setTimeout(() => map.invalidateSize(true), 250);
      });

      resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
      });
      resizeObserver.observe(container);
      if (shellRef.current) {
        resizeObserver.observe(shellRef.current);
      }

      window.requestAnimationFrame(() => {
        map.invalidateSize();
      });

      void loadOverlays();
    } catch {
      setError('Gagal memuat peta.');
    }

    return () => {
      mountIdRef.current += 1;
      resizeObserver?.disconnect();
      Object.values(overlayRefs.current).forEach((layer) => layer.remove());
      overlayRefs.current = {};
      Object.values(basemapRefs.current).forEach((layer) => layer.remove());
      basemapRefs.current = {};
      mapRef.current?.remove();
      mapRef.current = null;
      setOverlayReady(false);
    };
  }, []);

  return (
    <div className={`gis-map-root ${isFullscreen && !isNativeFullscreen ? 'gis-map-pseudo-fullscreen-wrap' : ''}`}>
      {!isFullscreen && (
        <div className="gis-map-toolbar mb-2 sm:mb-3">
          <div className="gis-map-toolbar-section">
            <span className="gis-map-toolbar-label">
              <Map className="w-3.5 h-3.5" />
              Basemap
            </span>
            <div className="gis-segment" role="group" aria-label="Pilih basemap">
              {basemapLayers.map((layer) => (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => switchBasemap(layer.id)}
                  className={`gis-segment-btn ${activeBasemap === layer.id ? 'gis-segment-btn-active' : ''}`}
                >
                  {layer.label}
                </button>
              ))}
            </div>
          </div>

          <div className="gis-map-toolbar-divider hidden sm:block" />

          <div className="gis-map-toolbar-section gis-map-toolbar-overlays">
            <span className="gis-map-toolbar-label">
              <Layers className="w-3.5 h-3.5" />
              Overlay
            </span>
            <div className="hidden md:flex flex-wrap gap-1.5">
              {overlayLayers.map((layer) => {
                const on = overlayVisible[layer.id] ?? false;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => toggleOverlay(layer.id)}
                    className={`gis-overlay-pill ${on ? 'gis-overlay-pill-active' : ''}`}
                    aria-pressed={on}
                  >
                    <span className={`gis-overlay-dot ${on ? 'gis-overlay-dot-active' : ''}`} />
                    {layer.label}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setLayersOpen((open) => !open)}
              className="md:hidden gis-overlay-pill gis-overlay-pill-active"
              aria-expanded={layersOpen}
            >
              <Layers className="w-3.5 h-3.5" />
              Layer
            </button>
          </div>

          <div className="gis-map-toolbar-spacer" />

          <button
            type="button"
            onClick={() => void toggleFullscreen()}
            className="gis-toolbar-fullscreen-btn"
            aria-label="Fullscreen peta"
            title="Fullscreen peta"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>
        </div>
      )}

      {layersOpen && !isFullscreen && (
        <div className="md:hidden mb-2 flex flex-wrap gap-1.5 p-2.5 rounded-lg border border-slate-200 bg-slate-50">
          {overlayLayers.map((layer) => {
            const on = overlayVisible[layer.id] ?? false;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => toggleOverlay(layer.id)}
                className={`gis-overlay-pill ${on ? 'gis-overlay-pill-active' : ''}`}
                aria-pressed={on}
              >
                <span className={`gis-overlay-dot ${on ? 'gis-overlay-dot-active' : ''}`} />
                {layer.label}
              </button>
            );
          })}
        </div>
      )}

      <div
        ref={shellRef}
        className={`relative overflow-hidden gis-map-shell flex flex-col rounded-xl border border-slate-200/80 shadow-sm isolate ${
          isFullscreen && !isNativeFullscreen ? 'gis-map-pseudo-fullscreen' : ''
        }`}
      >
        {isFullscreen && (
          <div className="gis-map-toolbar gis-map-toolbar-fullscreen">
            <div className="gis-map-toolbar-section">
              <span className="gis-map-toolbar-label">
                <Map className="w-3.5 h-3.5" />
                Basemap
              </span>
              <div className="gis-segment" role="group" aria-label="Pilih basemap">
                {basemapLayers.map((layer) => (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => switchBasemap(layer.id)}
                    className={`gis-segment-btn ${activeBasemap === layer.id ? 'gis-segment-btn-active' : ''}`}
                  >
                    {layer.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="gis-map-toolbar-spacer" />
            <button
              type="button"
              onClick={() => void toggleFullscreen()}
              className="gis-toolbar-fullscreen-btn"
              aria-label="Keluar fullscreen"
            >
              <Minimize2 className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        )}

        {!overlayReady && !error && (
          <div className="pointer-events-none absolute inset-0 z-[20] flex items-center justify-center bg-slate-900/10 backdrop-blur-[1px]">
            <span className="gis-loading-badge">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Memuat layer provinsi...
            </span>
          </div>
        )}
        {error && (
          <div className="absolute bottom-16 left-1/2 z-[30] -translate-x-1/2 max-w-[90%]">
            <span className="block rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700 text-center shadow-sm">
              {error}
            </span>
          </div>
        )}

        <div
          ref={containerRef}
          className={`gis-map-canvas w-full z-0 ${
            isFullscreen
              ? 'min-h-0 flex-1'
              : size === 'full'
                ? 'h-[min(50vh,560px)] min-h-[280px] sm:min-h-[380px] md:min-h-[480px] lg:min-h-[520px]'
                : 'h-[min(56vw,380px)] min-h-[240px] sm:min-h-[300px] md:min-h-[340px]'
          }`}
          style={fullscreenMapHeight ? { height: fullscreenMapHeight } : undefined}
          aria-label="Peta sebaran supply hortikultura Indonesia"
        />

        <div className={`absolute z-[10] pointer-events-none ${isFullscreen ? 'bottom-14 left-3 right-3' : 'bottom-3 left-3 right-14'}`}>
          <GisMapLegend compact={isFullscreen} title={mapLegendTitle} />
        </div>

        {isFullscreen && (
          <div className="shrink-0 border-t border-slate-200/80 bg-white/95 backdrop-blur-sm px-4 py-2.5 flex items-center justify-between gap-2 text-[11px] text-slate-500">
            <span>GIS Supply Demand — BISA</span>
            <span className="hidden sm:inline">Tekan Esc untuk keluar</span>
          </div>
        )}
      </div>
    </div>
  );
}
