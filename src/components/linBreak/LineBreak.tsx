import React from "react";

interface IProps {
  children: React.ReactNode;
}
const LineBreak: React.FC<IProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <hr className="h-px border border-slate-200 grow" />
      {children}
      <hr className="h-px border border-slate-200 grow" />
    </div>
  );
};

export default LineBreak;
