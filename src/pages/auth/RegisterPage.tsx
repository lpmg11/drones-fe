import PasswordInput from "@/components/ui/PasswordInput";
import TextInput from "@/components/ui/TextInput";
import { RegisterSchema } from "@/schemas/auth/requests";
import { RegisterType } from "@/types/auth/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

// Definición del esquema de validación para el registro

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterType) => {
    console.log(data);
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
    </div>
  );
};
