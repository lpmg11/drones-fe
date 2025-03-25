export interface Warehouse {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  drones: drone[];
}

interface drone {
  id: string;
  name: string;
  warehouse_id: string;
  model_id: string;
  model: model;
}

interface model {
  id: string;
  name: string;
  charge_km: number;
  speed: number;
}
