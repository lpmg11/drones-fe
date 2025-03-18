import { post } from "@/api/axios";
import PasswordInput from "@/components/ui/PasswordInput";
import TextInput from "@/components/ui/TextInput";
import Toast from "@/components/ui/Toast";
import { LoginSchema } from "@/schemas/auth/requests";
import { useStore } from "@/store/store";
import { LoginType } from "@/types/auth/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const { setUsername } = useStore();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  interface loginResponse {
    username: string;
    role: string;
  }

  const onSubmit = async (data: LoginType) => {
    try {
      const response = await post("/api/v1/auth/login", data);
      if (response.status !== 200) {
        const error = response.data;
        setToastMessage(error.error ?? "Error en la petición");
        setShowToast(true);
        throw new Error(error.error);
      }
      const session: loginResponse = response.data;
      setUsername(session.username);
      navigate("/dashboard");
      console.log(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setToastMessage(errorMessage);
      setShowToast(true);
      console.error(error);
    }
  };

  console.log(errors);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-gray-100">
      <div className="w-[400px] bg-white p-8 shadow-lg rounded-lg flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4 text-primary-text">
          Inicio de sesión
        </h1>
        <Link to="/register" className="text-blue-500 mb-2 hover:underline">
          ¿No tienes cuenta? Regístrate
        </Link>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center"
        >
          <TextInput
            label="username"
            placeholder="Usuario o correo"
            register={register}
            errors={errors}
          />
          <PasswordInput
            label="password"
            placeholder="Contraseña"
            register={register}
            errors={errors}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};
