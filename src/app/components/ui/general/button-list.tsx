"use client"
import React, { useState } from "react";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import { Button, buttonVariants } from "@/app/components/ui/general/button";
import { useRouter } from "next/navigation";


interface ButtonListProps {
  buttons: ButtonConfig[];
  className?: string;
  selectedId: string | null;
  onButtonClick: (id: string) => void;
}
export const ButtonList = ({ buttons, className, selectedId, onButtonClick }: ButtonListProps) => {
const router = useRouter();
  return (
    <div className={className}>
      {buttons.map((buttonProps, index) => {
        const {
          id,
          variant,
          children,
          icon,
          href,
          iconPosition = "left",
          ...restOfProps
        } = buttonProps;

        return (
          <Button
          id={id}
          key={id}
            {...restOfProps} 
            variant={variant}
            isSelected={id===selectedId}
            onClick={()=>{onButtonClick(id); if (href){router.push(href)}}}
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
