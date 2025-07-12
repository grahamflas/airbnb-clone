"use client";

import { BiDollar } from "react-icons/bi";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  disabled?: boolean;
  errors: FieldErrors;
  formatPrice?: boolean;
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  type?: string;
}

const Input = ({
  disabled,
  errors,
  formatPrice,
  id,
  label,
  register,
  required,
  type = "text",
}: Props) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          className="text-neutral-700 absolute top-5 left-2"
          size={24}
        />
      )}

      <input
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowd
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
        disabled={disabled}
        id={id}
        type={type}
        {...register(id, { required })}
        placeholder=" "
      />

      <label
        className={`
          absolute text-md transition-500 -translate-y-3 transform  top-5 z-10 origin-[0]
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
