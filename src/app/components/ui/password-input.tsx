"use client";

import { EyeIcon, EyeOffIcon } from "@/app/components/icons";
import { Input, InputProps } from "@/app/components/ui/input";
import * as React from "react";

export interface PasswordInputProps extends InputProps {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const Icon = showPassword ? EyeOffIcon : EyeIcon;

    return (
      <Input
        type={showPassword ? "text" : "password"}
        className={className}
        ref={ref}
        
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };