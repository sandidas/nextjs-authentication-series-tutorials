"use client";
import React from "react";

interface IButton {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  handler?: () => void;
}
const Button: React.FC<IButton> = ({ children, disabled, type, className, variant, handler }) => {
  return (
    <button
      onClick={handler}
      type={type}
      disabled={disabled}
      className={
        `px-7 py-5 text-xl font-medium uppercase rounded-xl border hover:bg-red-700 ${disabled ? "bg-white text-slate-700 hover:bg-white hover:text-slate-700" : " transition ease-in-out delay-75 duration-100 hover:text-white text-slate-600"} ${
          variant === "secondary" ? "text-slate-900 hover:text-white" : "bg-red-500"
        } ` + className
      }
    >
      {children}
    </button>
  );
};

export default Button;
