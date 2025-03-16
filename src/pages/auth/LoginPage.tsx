import PasswordInput from "@/components/ui/PasswordInput";
import TextInput from "@/components/ui/TextInput";
import { LoginSchema } from "@/schemas/auth/requests";
import { LoginType } from "@/types/auth/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginType) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-gray-100">
      <div className="w-[400px] bg-white p-8 shadow-lg rounded-lg flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-6 text-primary-text">
          Inicio de sesión
        </h1>
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
    </div>
  );
};
