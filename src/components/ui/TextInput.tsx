import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface TextInputProps {
  label: string;
  register: UseFormRegister<any>;
  errors?: Record<string, FieldError>;
  [x: string]: any;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  register,
  errors = {},
  ...rest
}) => (
  <div className="w-full mb-4">
    <input
      {...register(label)}
      {...rest}
      className="border border-border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors[label] && (
      <span className="text-red-500">{errors[label]?.message}</span>
    )}
  </div>
);

export default TextInput;
