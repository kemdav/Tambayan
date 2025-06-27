import React from "react";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import { Button } from "@/app/components/ui/general/button";

interface ButtonListProps {
  buttons: ButtonConfig[];
  className?: string;
}
export const ButtonList = ({ buttons, className }: ButtonListProps) => {
  return (
    <div className={className}>
      {buttons.map((buttonProps) => {
        // Destructure our custom props from the rest of the standard button attributes.
        const {
          isSelected,
          children,
          icon,
          iconPosition = "left",
          ...restOfProps
        } = buttonProps;

        return (
          <Button
            {...restOfProps} 
          >
            {icon && iconPosition === "left" && icon}
            {children}
            {icon && iconPosition === "right" && icon}
          </Button>
        );
      })}
    </div>
  );
};
