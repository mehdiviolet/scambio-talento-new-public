import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix per le icone di Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapComponent = ({
  address = "Via Madama Cristina 45, Torino",
  height = 200,
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Coordinate approssimative per Torino, Via Madama Cristina
    const lat = 45.0522;
    const lng = 7.6824;

    // Inizializza la mappa
    mapInstanceRef.current = L.map(mapRef.current).setView([lat, lng], 16);

    // Aggiungi tile layer (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstanceRef.current);

    // Aggiungi marker
    L.marker([lat, lng])
      .addTo(mapInstanceRef.current)
      .bindPopup(address)
      .openPopup();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [address]);

  return (
    <div
      ref={mapRef}
      style={{
        height: `${height}px`,
        width: "100%",
        borderRadius: "8px",
        border: "1px solid #ddd",
        marginTop: "8px",
      }}
    />
  );
};

export default MapComponent;
