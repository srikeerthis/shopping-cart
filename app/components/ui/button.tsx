import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline" | "destructive";
  className?: string;
  disabled?: boolean; // ✅ Allow disabled as an optional prop
};

export default function Button({
  children,
  onClick,
  variant = "default",
  className = "",
  disabled = false, // ✅ Default value set to false
}: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition duration-300";
  const variants = {
    default: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-500 shadow-md",
    outline: "border border-gray-500 text-gray-700 hover:bg-gray-100 dark:border-gray-400 dark:text-gray-200 dark:hover:bg-gray-700",
    destructive: "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-pink-600 hover:to-red-500 shadow-md",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
