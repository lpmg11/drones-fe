/* eslint-disable no-unused-vars */
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

// Configurar los íconos por defecto de Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIconPng,
  iconRetinaUrl: markerIconPng,
  shadowUrl: markerShadowPng,
});

// Definición de tipos (ajústalos según tus necesidades)
interface LatLng {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  position: LatLng;
  setPosition: (pos: LatLng) => void;
  className?: string;
}

// Componente para el marcador draggable con ícono personalizado (si lo deseas)
function DraggableMarker({ position, setPosition }: MapComponentProps) {
  const markerRef = useRef<L.Marker>(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const latLng = marker.getLatLng();
        setPosition({ lat: latLng.lat, lng: latLng.lng });
      }
    },
  };

  return (
    <Marker
      position={[position.lat, position.lng]}
      draggable={true}
      eventHandlers={eventHandlers}
      ref={markerRef}
    />
  );
}

// Componente para manejar los eventos de click en el mapa y actualizar la posición
function MapClickHandler({
  setPosition,
}: {
  setPosition: (pos: LatLng) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

// Componente principal del mapa
export default function MapComponent({
  position,
  setPosition,
  className,
}: MapComponentProps) {
  useEffect(() => {
    // Si la posición es {0, 0} se utiliza la ubicación del usuario
    if (position.lat === 0 && position.lng === 0 && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("Error obteniendo la ubicación del usuario", err);
        },
      );
    }
  }, [position, setPosition]);

  // Render condicional para esperar a tener una posición válida
  if (position.lat === 0 && position.lng === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        Cargando mapa...
      </div>
    );
  }

  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={13}
      className={className ?? "h-[500px] w-full"}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker position={position} setPosition={setPosition} />
      <MapClickHandler setPosition={setPosition} />
    </MapContainer>
  );
}