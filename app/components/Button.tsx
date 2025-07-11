"use client";

import { MouseEventHandler } from "react";

import { IconType } from "react-icons";

interface Props {
  disabled?: boolean;
  icon?: IconType;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  outline?: boolean;
  small?: boolean;
}

const Button = ({
  disabled,
  icon: Icon,
  onClick,
  outline,
  small,
  label,
}: Props) => {
  return (
    <button
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
        ${outline ? "bg-white" : "bg-rose-500"}
        ${outline ? "border-black" : "border-rose-500"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "py-1" : "py-3"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
