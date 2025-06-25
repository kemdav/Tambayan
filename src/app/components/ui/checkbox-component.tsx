import React from "react";

interface CheckboxComponentProps {
  text: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({ text, checked = false, onChange }) => {
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer', gap: 8 }}>
      <input
        type="checkbox"
        className="custom-checkbox"
        checked={checked}
        onChange={e => onChange?.(e.target.checked)}
      />
      <span style={{ lineHeight: 1.2 }}>{text}</span>
    </label>
  );
};

export default CheckboxComponent; 