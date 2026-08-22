"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MapPin, Info } from "lucide-react";
import L from "leaflet";

type Location = {
  lat: number;
  lng: number;
  address: string;
};

const defaultCenter: [number, number] = [41.9973, 21.4280];

const goldIcon = new L.DivIcon({
  className: "",
  html: `<div style="width: 28px; height: 28px; background: #e8854a; border: 3px solid #ffffff; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); box-shadow: 0 2px 12px rgba(232,133,74,0.4);"><div style="width: 10px; height: 10px; background: #ffffff; border-radius: 50%; position: absolute; top: 6px; left: 6px;"></div></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

const AddressMap = ({
  location,
  onLocationChange,
}: {
  location: Location | null;
  onLocationChange: (loc: Location | null) => void;
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState(location?.address || "");
  const [searching, setSearching] = useState(false);

  const onLocationChangeRef = useRef(onLocationChange);
  useEffect(() => {
    onLocationChangeRef.current = onLocationChange;
  }, [onLocationChange]);

  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        { headers: { "Accept-Language": "mk" } }
      );
      const data = await res.json();
      const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      setSearchQuery(address);
      onLocationChangeRef.current({ lat, lng, address });
    } catch {
      setSearchQuery(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      onLocationChangeRef.current({ lat, lng, address: `${lat.toFixed(4)}, ${lng.toFixed(4)}` });
    }
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: location ? [location.lat, location.lng] : defaultCenter,
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    const marker = L.marker(
      location ? [location.lat, location.lng] : defaultCenter,
      { icon: goldIcon, draggable: true }
    ).addTo(map);

    marker.on("dragend", () => {
      const pos = marker.getLatLng();
      reverseGeocode(pos.lat, pos.lng);
    });

    map.on("click", (e: L.LeafletMouseEvent) => {
      marker.setLatLng(e.latlng);
      reverseGeocode(e.latlng.lat, e.latlng.lng);
    });

    mapRef.current = map;
    markerRef.current = marker;

    requestAnimationFrame(() => {
      map.invalidateSize();
    });

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- map initializes once; position is controlled imperatively via the marker
  }, [reverseGeocode]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(searchQuery)}&limit=1`,
        { headers: { "Accept-Language": "mk" } }
      );
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const latNum = parseFloat(lat);
        const lngNum = parseFloat(lon);
        mapRef.current?.setView([latNum, lngNum], 15);
        markerRef.current?.setLatLng([latNum, lngNum]);
        setSearchQuery(display_name);
        onLocationChange({ lat: latNum, lng: lngNum, address: display_name });
      }
    } catch {}
    setSearching(false);
  };

  return (
    <div className="rounded-2xl bg-page-800 border border-page-500/50 overflow-hidden">
      <div className="flex items-center gap-2 p-3 max-w-full">
        <div className="flex-1 flex items-center gap-2 bg-page-700 rounded-xl px-3 py-2.5 min-w-0">
          <MapPin size={15} className="text-text-500 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Внеси адреса..."
            className="flex-1 bg-transparent text-sm text-text-100 outline-none placeholder:text-text-500 min-w-0"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={searching}
          className="px-4 py-2.5 rounded-xl bg-copper-500 text-text-100 text-xs font-semibold hover:bg-copper-400 disabled:opacity-50 transition-all active:scale-95 flex-shrink-0"
        >
          {searching ? "..." : "Барај"}
        </button>
      </div>

      <div className="flex items-start gap-2 px-3 pb-2">
        <Info size={12} className="text-text-500 mt-0.5 flex-shrink-0" />
        <p className="text-[11px] text-text-500 leading-relaxed">
          Најдете ја вашата локација на картата и кликнете за да ја поставите. Не влечете го маркерот.
        </p>
      </div>

      <div
        ref={mapContainerRef}
        className="h-48 sm:h-64 w-full relative z-0"
      />

      {location && (
        <div className="px-3 pb-3 pt-1">
          <p className="text-xs text-text-500 truncate">{location.address}</p>
        </div>
      )}
    </div>
  );
};

export default AddressMap;
