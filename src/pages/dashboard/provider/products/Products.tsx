import { get } from "@/api/axios";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useEffect, useState } from "react";
import NewProductModal from "../componenst/NewProductModal";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modal, setModal] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await get("/api/v1/provider/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error obteniendo los productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [modal, setModal]);

  return (
    <div className="w-full flex gap-3 flex-col">
      <div className="w-full flex flex-row items-center">
        <h1 className="text-xl mt-4 font-normal text-blue-600 mb-4">
          Productos
        </h1>
        <button
          onClick={() => setModal(true)}
          className="ml-auto bg-primary text-nowrap text-white px-1 py-2 rounded-md"
        >
          Agregar drone
        </button>
      </div>
      <p className="text-lg mb-4 text-blue-600">Lista de productos</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <h2 className="text-sm font-semibold text-blue-600 mb-2">
                {product.name}
              </h2>
            </CardHeader>
            <CardContent>
              <p>Descripción: {product.description}</p>
              <p>Precio: {product.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <NewProductModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
};
