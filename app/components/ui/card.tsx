import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string; // ✅ Allow className as an optional prop
};

export function Card({ children, className = "" }: CardProps) {
    return <div className={`border rounded-lg p-4 shadow-md flex flex-col items-center justify-between ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }: CardProps) {
    return <div className={`w-full ${className}`}>{children}</div>; // ✅ Added className support
}