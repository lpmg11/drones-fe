import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface PasswordInputProps {
  label: string;
  register: UseFormRegister<any>;
  errors?: any;
  [x: string]: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  register,
  errors = {},
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full mb-6 relative">
      <input
        {...register(label)}
        {...rest}
        type={showPassword ? "text" : "password"}
        className="border border-border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-2 text-sm text-blue-500"
      >
        {showPassword ? "Ocultar" : "Mostrar"}
      </button>
      {errors[label] && (
        <span className="text-red-500">{errors[label]?.message}</span>
      )}
    </div>
  );
};

export default PasswordInput;
