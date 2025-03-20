import WarehousesMap from "../../components/ui/warehousesMap";

export const Dashboard: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Bodegas Cercanas</h1>
      <WarehousesMap />
    </div>
  );
};
