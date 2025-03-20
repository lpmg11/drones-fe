import { post } from "@/api/axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// Configurar los íconos por defecto de Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIconPng,
  iconRetinaUrl: markerIconPng,
  shadowUrl: markerShadowPng,
});

// Tipos para la respuesta de la API
interface Warehouse {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  distance: number;
}

export default function WarehousesMap() {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);

  // Obtener la ubicación del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("Error obteniendo la ubicación del usuario", err);
          setLoading(false);
        },
      );
    } else {
      console.error("La geolocalización no está soportada por este navegador.");
      setLoading(false);
    }
  }, []);

  // Obtener las bodegas cercanas al usuario
  useEffect(() => {
    if (userLocation) {
      const fetchWarehouses = async () => {
        try {
          const payload = {
            radius: 5,
            latitude: userLocation.lat,
            longitude: userLocation.lng,
          };
          const response = await post("/api/v1/warehouse/proximity", payload);
          setWarehouses(response.data.warehouses);
        } catch (error) {
          console.error("Error obteniendo las bodegas cercanas:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchWarehouses();
    }
  }, [userLocation]);

  // Render condicional mientras se obtienen los datos
  if (loading || !userLocation) {
    return (
      <div className="flex items-center justify-center h-full">
        Cargando mapa...
      </div>
    );
  }

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={13}
      className="h-[500px] w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Marcador para la ubicación del usuario */}
      <Marker position={[userLocation.lat, userLocation.lng]}>
        <Popup>Tu ubicación</Popup>
      </Marker>
      {/* Marcadores para las bodegas */}
      {warehouses.map((warehouse) => (
        <Marker
          key={warehouse.id}
          position={[warehouse.latitude, warehouse.longitude]}
        >
          <Popup>
            <h1>{warehouse.name}</h1>
            <p>
              Distancia: {warehouse.distance.toFixed(2)}
              mts
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
