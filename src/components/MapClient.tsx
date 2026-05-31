"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap, Marker } from "leaflet";
import type { Property } from "@/lib/types";
import { priceLabel, typeLabel } from "@/lib/properties";
import { whatsappLink } from "@/lib/constants";

const RIYADH_CENTER: [number, number] = [24.7136, 46.6753];

const PROVIDER = process.env.NEXT_PUBLIC_MAP_PROVIDER ?? "osm";
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
const MAPBOX_STYLE = process.env.NEXT_PUBLIC_MAPBOX_STYLE ?? "mapbox/streets-v12";

function tileConfig() {
  if (PROVIDER === "mapbox" && MAPBOX_TOKEN) {
    return {
      url: `https://api.mapbox.com/styles/v1/${MAPBOX_STYLE}/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
      attribution:
        '© <a href="https://www.mapbox.com/">Mapbox</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      tileSize: 512,
      zoomOffset: -1,
    };
  }
  return {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    tileSize: 256,
    zoomOffset: 0,
  };
}

function popupHtml(property: Property): string {
  const wa = whatsappLink(
    `مرحباً، أرغب بالاستفسار عن العقار: ${property.title}.`
  );
  const img = property.coverImage
    ? `<div style="height:130px;background:#0a1f44 url('${property.coverImage}') center/cover;"></div>`
    : "";
  return `
    <div style="font-family:inherit;direction:rtl;text-align:right;">
      ${img}
      <div style="padding:12px 14px;background:#fff;">
        <div style="color:#0a1f44;font-weight:700;font-size:15px;margin-bottom:2px;">${priceLabel(
          property
        )}</div>
        <div style="color:#13294b;font-size:13px;font-weight:600;line-height:1.4;margin-bottom:4px;">${
          property.title
        }</div>
        <div style="color:#5b6b86;font-size:12px;margin-bottom:8px;">${
          property.location.district
        } · ${typeLabel(property)} · ${property.area} م²</div>
        <div style="display:flex;gap:6px;">
          <a href="/properties/${property.slug}"
             style="flex:1;text-align:center;background:#0a1f44;color:#fff;border-radius:999px;padding:7px 10px;font-size:12px;font-weight:600;text-decoration:none;">عرض التفاصيل</a>
          <a href="${wa}" target="_blank" rel="noopener noreferrer"
             style="text-align:center;background:#25D366;color:#fff;border-radius:999px;padding:7px 12px;font-size:12px;font-weight:600;text-decoration:none;">واتساب</a>
        </div>
      </div>
    </div>`;
}

export function MapClient({
  properties,
  className = "",
}: {
  properties: Property[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Marker[]>([]);

  // Initialize map once.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: RIYADH_CENTER,
        zoom: 11,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      const cfg = tileConfig();
      L.tileLayer(cfg.url, {
        attribution: cfg.attribution,
        tileSize: cfg.tileSize,
        zoomOffset: cfg.zoomOffset,
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
      renderMarkers(L, map);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-render markers when the property list changes.
  useEffect(() => {
    (async () => {
      if (!mapRef.current) return;
      const L = (await import("leaflet")).default;
      renderMarkers(L, mapRef.current);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties]);

  function renderMarkers(
    L: typeof import("leaflet"),
    map: LeafletMap
  ) {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const icon = L.divIcon({
      className: "",
      html: `<div style="position:relative;">
        <div style="width:30px;height:30px;background:#0a1f44;border:3px solid #67d6d2;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 6px 14px rgba(10,31,68,0.4);"></div>
        <div style="position:absolute;top:9px;left:9px;width:9px;height:9px;background:#67d6d2;border-radius:50%;"></div>
      </div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    const bounds: [number, number][] = [];
    properties.forEach((p) => {
      const marker = L.marker([p.location.lat, p.location.lng], { icon })
        .addTo(map)
        .bindPopup(popupHtml(p), { closeButton: true, maxWidth: 260 });
      markersRef.current.push(marker);
      bounds.push([p.location.lat, p.location.lng]);
    });

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    } else {
      map.setView(RIYADH_CENTER, 11);
    }
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
      role="application"
      aria-label="خريطة عقارات الرياض"
    />
  );
}

export default MapClient;
