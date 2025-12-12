import { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";

interface AddressMapProps {
  location: { lat: number; lng: number; address: string } | null;
  onLocationChange: (location: { lat: number; lng: number; address: string }) => void;
}

declare global {
  interface Window {
    L: typeof L;
  }
}

const AddressMap = ({ location, onLocationChange }: AddressMapProps) => {
  const [address, setAddress] = useState(location?.address || "");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const initializeMap = () => {
      if (!window.L || !mapContainerRef.current) {
        setMapError("Мапата се вчитува...");
        setTimeout(initializeMap, 100);
        return;
      }

      try {
        // Set initial center to Skopje, Macedonia
        const skopjeCenter: [number, number] = [41.9973, 21.4280];

        // Initialize map
        mapRef.current = window.L.map(mapContainerRef.current).setView(skopjeCenter, 13);

        // Add OpenStreetMap tiles
        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(mapRef.current);

        // Create initial marker
        markerRef.current = window.L.marker(skopjeCenter, {
          draggable: true,
        }).addTo(mapRef.current);

        // When marker is dragged, update location
        markerRef.current.on("dragend", () => {
          if (markerRef.current) {
            const position = markerRef.current.getLatLng();
            reverseGeocode(position.lat, position.lng);
          }
        });

        // When marker is clicked, use that location
        markerRef.current.on("click", () => {
          if (markerRef.current) {
            const position = markerRef.current.getLatLng();
            reverseGeocode(position.lat, position.lng);
          }
        });

        // When map is clicked, move marker
        mapRef.current.on("click", (e: L.LeafletMouseEvent) => {
          if (markerRef.current && e.latlng) {
            markerRef.current.setLatLng(e.latlng);
            reverseGeocode(e.latlng.lat, e.latlng.lng);
          }
        });

        setMapLoaded(true);
        setMapError(null);
      } catch (error) {
        console.error("Error initializing map:", error);
        setMapError("Грешка при креирање на мапата.");
      }
    };

    initializeMap();

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Reverse geocode: convert coordinates to address using Nominatim (OpenStreetMap)
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            "User-Agent": "NekaBleskaApp/1.0",
          },
        }
      );

      const data = await response.json();
      if (data && data.display_name) {
        const address = data.display_name;
        setAddress(address);
        onLocationChange({ lat, lng, address });
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
    }
  };

  // Geocode: convert address to coordinates using Nominatim
  const geocodeAddress = async () => {
    const addressToSearch = address.trim();
    if (!addressToSearch) {
      setMapError("Ве молиме внесете адреса.");
      return;
    }

    // Wait for map to be loaded if not ready
    if (!mapRef.current) {
      setMapError("Мапата се вчитува. Ве молиме почекајте...");
      return;
    }

    setIsGeocoding(true);
    setMapError(null);

    try {
      const searchAddress = addressToSearch.includes("Skopje") || addressToSearch.includes("Скопје")
        ? addressToSearch
        : `${addressToSearch}, Skopje, Macedonia`;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}&limit=1&addressdetails=1`,
        {
          headers: {
            "User-Agent": "NekaBleskaApp/1.0",
          },
        }
      );

      const data = await response.json();
      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);

        // Update map center
        mapRef.current.setView([lat, lng], 15);

        // Update marker position
        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else if (mapRef.current) {
          markerRef.current = window.L.marker([lat, lng], {
            draggable: true,
          }).addTo(mapRef.current);

          markerRef.current.on("dragend", () => {
            if (markerRef.current) {
              const position = markerRef.current.getLatLng();
              reverseGeocode(position.lat, position.lng);
            }
          });

          markerRef.current.on("click", () => {
            if (markerRef.current) {
              const position = markerRef.current.getLatLng();
              reverseGeocode(position.lat, position.lng);
            }
          });
        }

        const foundAddress = result.display_name || searchAddress;
        
        // Update location
        onLocationChange({
          lat,
          lng,
          address: foundAddress,
        });
        setAddress(foundAddress);
        setMapError(null);
      } else {
        setMapError("Адресата не е пронајдена. Обидете се повторно.");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setMapError("Грешка при пребарување на адресата. Обидете се повторно.");
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      geocodeAddress();
    }
  };

  return (
    <Box
      sx={{
        flex: { xs: "1", md: "1" },
        display: "flex",
        flexDirection: "column",
        gap: { xs: 1.5, sm: 2 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 0.5, sm: 1 } }}>
        <Box
          sx={{
            p: 0.75,
            borderRadius: "10px",
            background: "#2c3e50",
            mr: 1.5,
          }}
        >
          <LocationOnIcon sx={{ color: "white", fontSize: { xs: "1.25rem", sm: "1.5rem" } }} />
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "0.9375rem", sm: "1rem" },
            color: "#1a202c",
          }}
        >
          Адреса
        </Typography>
      </Box>

      <TextField
        fullWidth
        placeholder="Внесете ја вашата адреса..."
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
          setMapError(null);
        }}
        onKeyPress={handleKeyPress}
        disabled={isGeocoding}
        error={!!mapError}
        helperText={mapError || (isGeocoding ? "Пребарување..." : "")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: isGeocoding ? "#bdc3c7" : "#7f8c8d" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Box
                onClick={geocodeAddress}
                sx={{
                  cursor: isGeocoding ? "wait" : "pointer",
                  p: 0.5,
                  borderRadius: "8px",
                  "&:hover": { 
                    background: isGeocoding ? "transparent" : "#f8f9fa",
                  },
                  opacity: isGeocoding ? 0.6 : 1,
                }}
              >
                <LocationOnIcon sx={{ color: "#2c3e50", fontSize: "1.25rem" }} />
              </Box>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2c3e50",
              },
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2c3e50",
                borderWidth: "2px",
              },
            },
          },
        }}
      />

      <Box
        sx={{
          width: "100%",
          height: { xs: "200px", sm: "250px", lg: "350px" },
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #ecf0f1",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          position: "relative",
        }}
      >
        <Box
          ref={mapContainerRef}
          sx={{
            width: "100%",
            height: "100%",
            "& .leaflet-container": {
              height: "100%",
              width: "100%",
              borderRadius: "16px",
            },
          }}
        />
        {!mapLoaded && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#f8f9fa",
              zIndex: 1000,
              p: 2,
            }}
          >
            {mapError ? (
              <>
                <Typography sx={{ color: "#e74c3c", mb: 1, textAlign: "center", fontSize: "0.875rem" }}>
                  {mapError}
                </Typography>
              </>
            ) : (
              <Typography sx={{ color: "#7f8c8d" }}>
                Вчитување на мапа...
              </Typography>
            )}
          </Box>
        )}
      </Box>

      {location && (
        <Typography
          variant="body2"
          sx={{
            color: "#27ae60",
            fontSize: "0.875rem",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          ✓ Адресата е поставена
        </Typography>
      )}
    </Box>
  );
};

export default AddressMap;
