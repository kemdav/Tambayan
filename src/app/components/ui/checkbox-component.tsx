import React, { forwardRef, InputHTMLAttributes } from "react";

export interface CheckboxComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

export const CheckboxComponent = forwardRef<HTMLInputElement, CheckboxComponentProps>(
  ({ text, ...props }, ref) => (
    <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer', gap: 8 }}>
      <input
        type="checkbox"
        className="custom-checkbox"
        ref={ref}
        {...props}
      />
      <span style={{ lineHeight: 1.2 }}>{text}</span>
    </label>
  )
);

CheckboxComponent.displayName = "CheckboxComponent";

export default CheckboxComponent; 