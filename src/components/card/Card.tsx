import React from "react";

interface IProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}
const Card: React.FC<IProps> = ({ children, title }) => {
  return (
    <div className="p-10 bg-white flex flex-col gap-10 shadow-xl rounded-xl">
      <h1 className="text-4xl lg:text-5xl xl:text-6xl text-slate-600 font-black text-center py-5">{title}</h1>

      {children}
    </div>
  );
};

export default Card;
