import { post } from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import WarehousesMap from "@/components/ui/WarehousesMap";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export const Store: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const {
    setProductID,
    setDescription,
    setPrice,
    setProduct,
    location,
    setLocation,
  } = useStore();
  const navigate = useNavigate();

  const newOrder = (product: Product) => {
    setProductID(product.id);
    setDescription(product.description);
    setPrice(product.price);
    setProduct(product.name);
    navigate("/dashboard/store/order");
  };

  const fetchProducts = async () => {
    try {
      const response = await post("/api/v1/store/products", {
        latitude: location.lat,
        longitude: location.lng,
      });
      setProducts(response.data.products);
    } catch (error) {
      setProducts([]);
      console.error("Error obteniendo los productos:", error);
    }
  };

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
    } else if (location) {
      setLoading(false);
    }
  }, [location, setLocation]);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl mt-4 font-normal text-blue-600 mb-4">Tienda</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/** muestra los productos si existen si no muestra que esta fuera de la zona de cobertura */}

        {products.map((product) => (
          <Card key={product.id} onClick={() => newOrder(product)}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Descripción: {product.description}</p>
              <p>Precio: {product.price}</p>
            </CardContent>
          </Card>
        ))}

        {products.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>¡Fuera de la zona de cobertura!</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lo sentimos, no hay productos disponibles en tu zona.</p>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl mt-4 font-normal text-blue-600 mb-4">
          Ubicación
        </h1>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <WarehousesMap location={location} setLocation={setLocation} />
        )}
      </div>
    </div>
  );
};
