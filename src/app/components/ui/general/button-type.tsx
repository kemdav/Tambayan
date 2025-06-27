import type React from "react";
import { buttonVariants } from "./button";
import { VariantProps } from "class-variance-authority";

export type ButtonConfig = VariantProps<typeof buttonVariants> & {
  id: string;
  variant?:string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
