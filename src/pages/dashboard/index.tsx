import WarehousesMap from "@/components/ui/WarehousesMap";

export const Dashboard: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl mt-4 font-normal text-blue-600 mb-4">
        Bodegas Cercanas
      </h1>
      <WarehousesMap />
    </div>
  );
};
