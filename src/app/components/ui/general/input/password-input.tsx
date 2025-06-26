"use client";

import { EyeIcon, EyeOffIcon } from "@/app/components/icons";
import { Input, InputProps } from "@/app/components/ui/general/input/input";
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
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="flex items-center justify-center"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon className="h-7 w-7 text-gray-500" />
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };