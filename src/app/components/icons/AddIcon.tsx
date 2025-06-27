import type { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

export function AddIcon({ className, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M25.1875 3.875H5.8125C4.74245 3.875 3.875 4.74245 3.875 5.8125V25.1875C3.875 26.2576 4.74245 27.125 5.8125 27.125H25.1875C26.2576 27.125 27.125 26.2576 27.125 25.1875V5.8125C27.125 4.74245 26.2576 3.875 25.1875 3.875Z"
        fill="#555555"
      />
      <path d="M0 0H31V31H0V0Z" fill="white" />
    </svg>
  );
}
