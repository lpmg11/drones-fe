import { post } from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import WarehousesMap from "@/components/ui/WarehousesMap";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";

interface RouteResponse {
  provider: {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    user_id: string;
    user: any;
    latitude: number;
    longitude: number;
  };
  pickup_route: {
    type: string;
    id: string;
    latitude: number;
    longitude: number;
  }[];
  delivery_route: {
    type: string;
    id: string;
    latitude: number;
    longitude: number;
  }[];
  total_distance: number;
}

export const OrderPage: React.FC = () => {
  const { productID, product, description, price, location, setLocation } =
    useStore();
  const [loading, setLoading] = useState(true);
  const [routeData, setRouteData] = useState<RouteResponse | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<
    "both" | "pickup" | "delivery"
  >("both");

  // Obtener la ubicación del usuario
  useEffect(() => {
    if (location.lat === 0 && location.lng === 0 && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setLocation(newLocation);
          setLoading(false);
        },
        (err) => {
          console.error("Error obteniendo la ubicación del usuario", err);
        },
      );
    } else {
      setLoading(false);
    }
  }, [location, setLocation]);

  // Llamada a la API para obtener la información de la ruta
  useEffect(() => {
    if (productID && location.lat && location.lng) {
      const fetchRouteData = async () => {
        try {
          const response = await post("/api/v1/store/products/product", {
            product_id: productID,
            latitude: location.lat,
            longitude: location.lng,
          });
          setRouteData(response.data);
        } catch (error) {
          console.error("Error obteniendo datos de la ruta:", error);
        }
      };
      fetchRouteData();
    }
  }, [productID, location]);

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl mt-4 font-normal text-blue-600 mb-4">New order</h1>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          Loading...
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          {/* Card con selector y resumen de la ruta */}
          {routeData && (
            <Card className="w-[450px] mb-4">
              <CardHeader>
                <CardTitle className="text-blue-500">Rutas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <label htmlFor="route-selector" className="mr-2">
                    Selecciona la ruta a ver:
                  </label>
                  <select
                    id="route-selector"
                    value={selectedRoute}
                    onChange={(e) =>
                      setSelectedRoute(
                        e.target.value as "both" | "pickup" | "delivery",
                      )
                    }
                  >
                    <option value="both">Ambas rutas</option>
                    <option value="pickup">Ruta de Recolecta</option>
                    <option value="delivery">Ruta de Entrega</option>
                  </select>
                </div>
                <div className="space-y-2">
                  {product && (
                    <div className="flex justify-between">
                      <span>Producto:</span>
                      <span className="text-blue-500">{product}</span>
                    </div>
                  )}
                  {description && (
                    <div className="flex justify-between">
                      <span>Descripción:</span>
                      <span className="text-blue-500">{description}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Total distancia:</span>
                    <span className="text-blue-500">
                      {routeData.total_distance.toFixed(2)} km
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Precio por km:</span>
                    <span className="text-blue-500">Q.5.00</span>
                  </div>
                  {price !== undefined && (
                    <div className="flex justify-between">
                      <span>Precio del producto:</span>
                      <span className="text-blue-500">
                        Q.{price.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Costo del viaje:</span>
                    <span className="text-blue-500">
                      Q.{(routeData.total_distance * 5).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Precio total:</span>
                    <span className="text-blue-500">
                      Q.
                      {(
                        (price ? price : 0) +
                        routeData.total_distance * 5
                      ).toFixed(2)}
                    </span>
                  </div>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Confirmar
                  </button>
                </div>
              </CardContent>
            </Card>
          )}
          {/* Mapa con las rutas según el selector */}
          <WarehousesMap
            location={location}
            setLocation={setLocation}
            pickupRoute={routeData?.pickup_route}
            deliveryRoute={routeData?.delivery_route}
            showRoutes={selectedRoute}
          />
        </div>
      )}
    </div>
  );
};
