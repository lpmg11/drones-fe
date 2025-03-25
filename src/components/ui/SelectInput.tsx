import React from "react";
import { UseFormRegister } from "react-hook-form";

interface SelectInputProps {
  label: string;
  register: UseFormRegister<any>;
  options: { value: string; label: string }[]; // Opciones del select
  errors?: any;
  [x: string]: any;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  register,
  options,
  errors = {},
  ...rest
}) => (
  <div className="w-full mb-4">
    <select
      {...register(label)}
      {...rest}
      className="border border-border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="" disabled>
        Selecciona una opción
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {errors[label] && (
      <span className="text-red-500">{errors[label]?.message}</span>
    )}
  </div>
);

export default SelectInput;
