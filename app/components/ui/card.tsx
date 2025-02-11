import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; // ✅ Allow onClick as an optional prop
};

export function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div
      className={`border rounded-lg p-4 shadow-md flex flex-col items-center justify-between cursor-pointer hover:shadow-xl transition-transform transform hover:scale-105 ${className}`}
      onClick={onClick} // ✅ Attach onClick here
      role="button" // Improves accessibility
      tabIndex={0} // Allows keyboard interaction
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`w-full ${className}`}>{children}</div>;
}
