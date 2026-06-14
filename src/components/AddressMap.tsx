import { useEffect, useRef, useState } from "react";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Location = {
  lat: number;
  lng: number;
  address: string;
};

const defaultCenter: [number, number] = [41.9973, 21.4280];

// Fix default marker icon (Leaflet CDN paths don't work in bundlers)
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

const goldIcon = new L.DivIcon({
  className: "",
  html: `<div style="width: 28px; height: 28px; background: #d4a853; border: 3px solid #0a0a12; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); box-shadow: 0 2px 12px rgba(212,168,83,0.4);"><div style="width: 10px; height: 10px; background: #0a0a12; border-radius: 50%; position: absolute; top: 6px; left: 6px;"></div></div>`,
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
  const [expanded, setExpanded] = useState(false);

  // Invalidate map size when expanding so tiles render correctly
  useEffect(() => {
    if (expanded && mapRef.current) {
      setTimeout(() => mapRef.current?.invalidateSize(), 200);
    }
  }, [expanded]);

  // Initialize map
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: location ? [location.lat, location.lng] : defaultCenter,
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.control.attribution({ prefix: false }).addTo(map);

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
    }

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        { headers: { "Accept-Language": "mk" } }
      );
      const data = await res.json();
      const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      setSearchQuery(address);
      onLocationChange({ lat, lng, address });
    } catch {
      setSearchQuery(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      onLocationChange({ lat, lng, address: `${lat.toFixed(4)}, ${lng.toFixed(4)}` });
    }
  };

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
    <div className="rounded-2xl bg-dark-800 border border-dark-600/50 overflow-hidden">
      {/* Search bar */}
      <div className="flex items-center gap-2 p-3">
        <div className="flex-1 flex items-center gap-2 bg-dark-700 rounded-xl px-3 py-2.5">
          <MapPin size={15} className="text-slate-500 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Внеси адреса..."
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={searching}
          className="px-4 py-2.5 rounded-xl bg-gold-500 text-dark-900 text-xs font-semibold hover:bg-gold-400 disabled:opacity-50 transition-all active:scale-95"
        >
          {searching ? "..." : "Барај"}
        </button>
      </div>

      {/* Toggle expand on mobile */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full px-3 pb-2 text-xs text-slate-500"
      >
        <span>{expanded ? "Скриј ја картата" : "Покажи ја картата"}</span>
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {/* Map */}
      <div
        ref={mapContainerRef}
        className={`transition-all duration-300 ${
          expanded ? "h-48 sm:h-64" : "h-0"
        }`}
      />

      {/* Selected address */}
      {location && (
        <div className="px-3 pb-3 pt-1">
          <p className="text-xs text-slate-500 truncate">{location.address}</p>
        </div>
      )}
    </div>
  );
};

export default AddressMap;
