import { get, post } from "@/api/axios";
import WarehousesMap from "@/components/ui/WarehousesMap";
import { Profile as ProfileType } from "@/types/provider/profile";
import { useEffect, useState } from "react";

const Profile = () => {
  const [name, setname] = useState("");

  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (latLng.lat === 0 && latLng.lng === 0 && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setLatLng(newLocation);
          setLoading(false);
        },
        (err) => {
          console.error("Error obteniendo la ubicación del usuario", err);
        },
      );
    } else if (latLng) {
      setLatLng(latLng); // Usa la ubicación proporcionada en las props
    }
  }, [latLng, setLatLng]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await get("/api/v1/provider/profile");
        if (response.status !== 200) {
          console.error("Error obteniendo el perfil:", response.data);
          throw new Error("Error obteniendo el perfil");
        }
        setname(response.data.profile.name);
        setLatLng({
          lat: response.data.profile.latitude ?? 0,
          lng: response.data.profile.longitude ?? 0,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error obteniendo el perfil:", error);
      }
    };
    fetchProfile();
  }, []);

  const SaveProfile = async () => {
    const profile: ProfileType = {
      name,
      latitude: latLng.lat,
      longitude: latLng.lng,
    };
    const response = post("/api/v1/provider/profile", profile);
    console.log(response);
  };

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl mt-4 font-normal text-blue-600 mb-4">Perfil</h1>
      <label htmlFor="name" className="text-blue-600 mb-2">
        Nombre del proveedor
      </label>
      <input
        className="border border-border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        value={name}
        id="name"
        onChange={(e) => setname(e.target.value)}
      />
      <p className="text-blue-600 mb-2">Ubicación</p>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <WarehousesMap location={latLng} setLocation={setLatLng} />
      )}
      <pre>{JSON.stringify(latLng, null, 2)}</pre>
      <pre>{JSON.stringify(name, null, 2)}</pre>
      <button
        onClick={SaveProfile}
        className="bg-blue-600 text-white p-2 rounded-lg mt-2"
      >
        Guardar perfil
      </button>
    </div>
  );
};

export default Profile;
