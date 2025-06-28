import type { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

export function NewsfeedIcon({ className, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M4 13.3337C4 8.30566 4 5.79099 5.56267 4.22966C7.12533 2.66833 9.63867 2.66699 14.6667 2.66699H17.3333C22.3613 2.66699 24.876 2.66699 26.4373 4.22966C27.9987 5.79233 28 8.30566 28 13.3337V18.667C28 23.695 28 26.2097 26.4373 27.771C24.8747 29.3323 22.3613 29.3337 17.3333 29.3337H14.6667C9.63867 29.3337 7.124 29.3337 5.56267 27.771C4.00133 26.2083 4 23.695 4 18.667V13.3337Z"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M8 16C8 14.1147 8 13.172 8.58667 12.5867C9.17067 12 10.1133 12 12 12H20C21.8853 12 22.828 12 23.4133 12.5867C24 13.172 24 14.1147 24 16V21.3333C24 23.2187 24 24.1613 23.4133 24.7467C22.828 25.3333 21.8853 25.3333 20 25.3333H12C10.1147 25.3333 9.172 25.3333 8.58667 24.7467C8 24.1627 8 23.22 8 21.3333V16Z"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M9.33337 8H16"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
