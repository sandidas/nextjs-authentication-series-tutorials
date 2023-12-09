import React, { forwardRef } from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, IProps>(({ label, error, ...props }, ref) => {
  return (
    <div className="relative">
      <label htmlFor="" className="absolute left-5 -top-3 bg-slate-50 rounded-xl px-3">
        {label}
      </label>
      <input ref={ref} {...props} className="p-5 font-bold text-2xl w-full border border-slate-300 rounded-xl" />

      {error && <p className="text-base font-normal text-red-500 text-right w-full">{error}</p>}
    </div>
  );
});
Input.displayName = "Input";

export default Input;
