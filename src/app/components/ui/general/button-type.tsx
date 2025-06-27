import type React from "react";

export type ButtonConfig = {
  id: string | number;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
