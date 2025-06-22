"use client";

import { EyeIcon, EyeOffIcon } from "@/app/components/icons";
import { Button } from "@/app/components/ui/button";
import { Input, InputProps } from "@/app/components/ui/input";
import { cn } from "@/lib/utils";
import * as React from "react";

export interface PasswordInputProps extends InputProps {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(
      props.defaultValue || props.value || ""
    );
    const Icon = showPassword ? EyeOffIcon : EyeIcon;

    React.useEffect(() => {
      if (props.value !== undefined) {
        setInternalValue(props.value);
      }
    }, [props.value]);

    const { onChange, value, defaultValue, ...restProps } = props;

    return (
      <Input
        type={showPassword ? "text" : "password"}
        className={cn(className)}
        ref={ref}
        rightIcon={
          internalValue ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              <Icon className="h-4 w-4" />
            </Button>
          ) : null
        }
        {...restProps}
        value={internalValue}
        onChange={(e) => {
          setInternalValue(e.target.value);
          if (onChange) {
            onChange(e);
          }
        }}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput }; 