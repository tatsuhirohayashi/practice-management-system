"use client";

import { cn } from "@/lib/utils";

interface FormLabelProps {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
  htmlFor?: string;
}

export function FormLabel({
  children,
  required = false,
  className,
  htmlFor,
}: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("text-sm font-medium block mb-1", className)}
    >
      {children}
      {required && <span className="ml-2 text-red-500 font-bold">必須</span>}
    </label>
  );
}
