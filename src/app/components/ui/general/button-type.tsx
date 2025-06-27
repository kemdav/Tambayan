import type React from "react";

export type ButtonConfig = {
  isSelected?: false;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
