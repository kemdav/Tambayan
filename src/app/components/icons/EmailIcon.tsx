import type { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

export function EmailIcon({ className, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 28 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M26.5 12.25V3.5C26.5 2.83696 26.2366 2.20107 25.7678 1.73223C25.2989 1.26339 24.663 1 24 1H4C3.33696 1 2.70107 1.26339 2.23223 1.73223C1.76339 2.20107 1.5 2.83696 1.5 3.5V18.5C1.5 19.875 2.625 21 4 21H14M26.5 4.75L15.2875 11.875C14.9016 12.1168 14.4554 12.245 14 12.245C13.5446 12.245 13.0984 12.1168 12.7125 11.875L1.5 4.75M22.75 16V23.5M19 19.75H26.5"
        stroke="#4E625A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
