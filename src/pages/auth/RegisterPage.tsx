import { post } from "@/api/axios";
import PasswordInput from "@/components/ui/PasswordInput";
import TextInput from "@/components/ui/TextInput";
import Toast from "@/components/ui/Toast";
import { RegisterSchema } from "@/schemas/auth/requests";
import { RegisterType } from "@/types/auth/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
  });

  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const onSubmit = async (data: RegisterType) => {
    try {
      const request = {
        username: data.username,
        password: data.password,
      };

      const response = await post("/api/v1/auth/register", request);

      if (response.status !== 200) {
        const error = response.data;
        setToastMessage(error.error ?? "Error en la petición");
        setShowToast(true);
        throw new Error(error.error);
      }

      navigate("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setToastMessage(errorMessage);
      setShowToast(true);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-gray-100">
      <div className="w-[400px] bg-white p-8 shadow-lg rounded-lg flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-6 text-primary-text">Registro</h1>
        <Link to="/" className="text-blue-500 mb-2 hover:underline">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center"
        >
          <TextInput
            label="username"
            placeholder="Usuario"
            register={register}
            errors={errors}
          />
          <PasswordInput
            label="password"
            placeholder="Contraseña"
            register={register}
            errors={errors}
          />
          <PasswordInput
            label="confirmPassword"
            placeholder="Confirmar contraseña"
            register={register}
            errors={errors}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Registrarse
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
