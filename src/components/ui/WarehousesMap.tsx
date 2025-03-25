/* eslint-disable no-unused-vars */
import { get } from "@/api/axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from "react-leaflet";

// Configurar los íconos por defecto de Leaflet
import {
  default as markerIconPng,
  default as markerShadowPng,
} from "../../assets/warehouse.png";

import { default as providerIconPng } from "../../assets/provider.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIconPng,
  iconRetinaUrl: markerIconPng,
  shadowUrl: markerShadowPng,
});

// Tipos para la respuesta de la API y las rutas
interface Warehouse {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface Provider {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface RoutePoint {
  id: string;
  latitude: number;
  longitude: number;
  // Puedes incluir otros campos si lo requieres, como 'type'
}

interface WarehousesMapProps {
  location?: {
    lat: number;
    lng: number;
  };
  setLocation?: (location: { lat: number; lng: number }) => void;
  pickupRoute?: RoutePoint[];
  deliveryRoute?: RoutePoint[];
  showRoutes?: "pickup" | "delivery" | "both";
}

export default function WarehousesMap({
  location,
  setLocation,
  pickupRoute,
  deliveryRoute,
  showRoutes = "both",
}: WarehousesMapProps) {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(location ?? null); // Inicializa con `location` si está disponible
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  // Obtener la ubicación del usuario si no se pasa como prop
  useEffect(() => {
    if (!location && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setUserLocation(newLocation);
          if (setLocation) {
            setLocation(newLocation);
          }
        },
        (err) => {
          console.error("Error obteniendo la ubicación del usuario", err);
          setLoading(false);
        },
      );
    } else if (location) {
      setUserLocation(location);
    }
  }, [location, setLocation]);

  // Obtener las bodegas y proveedores
  useEffect(() => {
    if (userLocation) {
      const fetchWarehouses = async () => {
        try {
          const response = await get("/api/v1/warehouse");
          setWarehouses(response.data.warehouses);
          setProviders(response.data.providers);
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
      <Marker
        position={[userLocation.lat, userLocation.lng]}
        draggable={true}
        eventHandlers={{
          dragend: (event) => {
            const marker = event.target;
            const newLocation = marker.getLatLng();
            setUserLocation({ lat: newLocation.lat, lng: newLocation.lng });
            if (setLocation) {
              setLocation({ lat: newLocation.lat, lng: newLocation.lng });
            }
          },
        }}
      >
        <Popup>
          Ubicación actual: <br />
          Latitud: {userLocation.lat}
          <br />
          Longitud: {userLocation.lng}
        </Popup>
      </Marker>

      {/* Marcadores para las bodegas */}
      {warehouses.map((warehouse) => (
        <Marker
          key={warehouse.id}
          icon={L.icon({ iconUrl: markerIconPng, iconSize: [35, 35] })}
          position={[warehouse.latitude, warehouse.longitude]}
        >
          <Popup>
            <h1>{warehouse.name}</h1>
            <h1>{warehouse.id}</h1>
            <p>
              Distancia:{" "}
              {(
                L.latLng(userLocation.lat, userLocation.lng).distanceTo(
                  L.latLng(warehouse.latitude, warehouse.longitude),
                ) / 1000
              ).toFixed(2)}
              km
            </p>
          </Popup>
        </Marker>
      ))}

      {/* Marcadores para los proveedores */}
      {providers.map((provider) => (
        <Marker
          key={provider.id}
          icon={L.icon({ iconUrl: providerIconPng, iconSize: [35, 35] })}
          position={[provider.latitude, provider.longitude]}
        >
          <Popup>
            <h1>{provider.name}</h1>
            <p>
              Distancia:{" "}
              {(
                L.latLng(userLocation.lat, userLocation.lng).distanceTo(
                  L.latLng(provider.latitude, provider.longitude),
                ) / 1000
              ).toFixed(2)}
              km
            </p>
          </Popup>
        </Marker>
      ))}

      {/* Dibujar la ruta de recogida si se especifica */}
      {(showRoutes === "pickup" || showRoutes === "both") &&
        pickupRoute && (
          <Polyline
            positions={pickupRoute.map((point) => [
              point.latitude,
              point.longitude,
            ])}
            pathOptions={{ color: "gray" }}
          />
        )}

      {/* Dibujar la ruta de entrega si se especifica */}
      {(showRoutes === "delivery" || showRoutes === "both") &&
        deliveryRoute && (
          <Polyline
            positions={deliveryRoute.map((point) => [
              point.latitude,
              point.longitude,
            ])}
            pathOptions={{ color: "blue" }}
          />
        )}
    </MapContainer>
  );
}
