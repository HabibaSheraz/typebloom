import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button className={clsx("button", variant === "secondary" && "secondary", className)} {...props}>
      {children}
    </button>
  );
}
