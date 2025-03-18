import { post } from "@/api/axios";
import { useStore } from "@/store/store";
import React from "react";
import { useNavigate } from "react-router";

const Header: React.FC = () => {
  const { username, setUsername } = useStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    post("/api/v1/auth/logout").then(() => {
      console.log("Logged out");
      setUsername("");
      navigate("/");
    });
  };

  return (
    <header className="w-full bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Drones App</h1>
      <div className="flex items-center">
        <span className="mr-4">Hola, {username}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
